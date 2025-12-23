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

    // Send OTP (mock API call)
    const response = await authService.sendOTP(phoneNumber);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { phoneNumber },
    });

    toast.success(`OTP sent to ${phoneNumber}`);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    toast.error(error.message);
  }
};

// Verify OTP
export const verifyOTP = (otp, phoneNumber) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_OTP_REQUEST });

    if (!otp || otp.length !== 6) {
      throw new Error("Please enter a valid 6-digit OTP");
    }

    // Mock OTP verification (in real app, this would be API call)
    const response = await authService.verifyOTP(phoneNumber, otp);

    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: {
        token: response.token,
        user: response.user,
      },
    });

    toast.success("Login successful!");
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
