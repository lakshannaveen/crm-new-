import toast from "react-hot-toast";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../constants/authActionTypes";
import { authService } from "../services/authService";

// Login with phone number
export const login = (phoneNumber) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error("Please enter a valid phone number");
    }

    // Call remote backend for OTP (API-only flow)
   
    const tried = [];
    const tryNumbers = [phoneNumber];
    if (phoneNumber.startsWith('+94')) {
      tryNumbers.push('0' + phoneNumber.slice(3));
    } else if (phoneNumber.startsWith('0')) {
      tryNumbers.push('+94' + phoneNumber.slice(1));
    }

    let response = null;
    for (const num of tryNumbers) {
      tried.push(num);
      try {
        response = await authService.requestOTPBackend(num);
        // attach which number succeeded for debug
        response._requestedPhone = num;
        break;
      } catch (err) {
        console.warn('requestOTPBackend failed for', num, err.message || err);
        response = null;
      }
    }

    if (response && response.StatusCode === 200) {
      // Save backend token and user details temporarily for verification
      if (response.Token) localStorage.setItem("backendToken", response.Token);
      if (response.UserDetails) localStorage.setItem("backendUser", JSON.stringify(response.UserDetails));
      // Save backend OTP (if provided) for client-side verification when backend has no verify endpoint
      if (response.OTP) {
        const rawOtp = String(response.OTP).replace(/"/g, "").trim();
        localStorage.setItem("backendOTP", rawOtp);
      }

      const requestedPhone = response._requestedPhone || phoneNumber;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { phoneNumber: requestedPhone, token: response.Token, userDetails: response.UserDetails },
      });

      // Show OTP if backend returned it (development only)
      const otpShown = response.OTP ? ` (dev-OTP: ${String(response.OTP).replace(/\"/g, '')})` : "";
      toast.success(`OTP sent to ${response._requestedPhone || phoneNumber}${otpShown}`);
    } else {
      const msg = (response && response.Message) || 'Failed to request OTP from backend';
      const triedMsg = tried.length ? ` Tried: ${tried.join(',')}` : '';
      throw new Error(msg + triedMsg);
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    console.error('Login action error:', error);
    toast.error(error.message || 'Failed to request OTP from backend');
  }
};

// Verify OTP
export const verifyOTP = (otp, phoneNumber) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_OTP_REQUEST });

    if (!otp || otp.length !== 5) {
      throw new Error("Please enter a valid 5-digit OTP");
    }
    // Try backend verification first (POST P_PHONE_NO and P_OTP)
    try {
      // First, if backendOTP was stored at login, verify locally against it
      const storedBackendOtp = localStorage.getItem("backendOTP");
      const storedBackendToken = localStorage.getItem("backendToken");
      const storedBackendUser = localStorage.getItem("backendUser");

      if (storedBackendOtp) {
        if (storedBackendOtp === otp) {
          // Success: use stored token/user
          localStorage.removeItem("backendOTP");
          localStorage.removeItem("backendToken");
          localStorage.removeItem("backendUser");

          dispatch({
            type: VERIFY_OTP_SUCCESS,
            payload: {
              token: storedBackendToken,
              user: storedBackendUser ? JSON.parse(storedBackendUser) : null,
            },
          });

          toast.success("Login successful!");
          return;
        }

        throw new Error("Invalid OTP");
      }

      // Otherwise, call backend verify endpoint (API-only)
      const resp = await authService.verifyOTPBackend(phoneNumber, otp);

      if (resp && resp.StatusCode === 200 && resp.Token) {
        // Clear any temporary storage
        localStorage.removeItem("backendToken");
        localStorage.removeItem("backendUser");

        dispatch({
          type: VERIFY_OTP_SUCCESS,
          payload: {
            token: resp.Token,
            user: resp.UserDetails || null,
          },
        });

        toast.success("Login successful!");
        return;
      }

      const msg = (resp && resp.Message) || "Invalid OTP";
      throw new Error(msg);
    } catch (backendErr) {
      // API-only flow: surface backend error (no mock fallback)
      throw backendErr instanceof Error ? backendErr : new Error('Invalid OTP');
    }
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAILURE,
      payload: error.message,
    });
    toast.error(error.message);
  }
};

// Register new user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    // Validate user data
    if (!userData.name || !userData.phone) {
      throw new Error("Please fill all required fields");
    }

    // Mock registration (in real app, this would be API call)
    const response = await authService.register(userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response,
    });

    toast.success("Registration request sent successfully!");
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.message,
    });
    toast.error(error.message);
  }
};

// Load user from token
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    // Mock API call to get user data
    const user = await authService.getCurrentUser(token);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.message,
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  toast.success("Logged out successfully");
};
