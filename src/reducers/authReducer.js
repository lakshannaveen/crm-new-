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
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
} from "../constants/authActionTypes";
import { CLEAR_AUTH_ERRORS } from "../constants/uiActionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  otpSent: false,
  phoneNumber: "",
  otpResent: false,
  registrationSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case VERIFY_OTP_REQUEST:
    case LOAD_USER_REQUEST:
    case RESEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSent: true,
        phoneNumber: action.payload.phoneNumber,
        error: null,
        otpResent: false,
      };

    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSent: true,
        otpResent: true,
        error: null,
      };

    case VERIFY_OTP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        otpSent: false,
        phoneNumber: "",
        error: null,
        registrationSuccess: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        registrationSuccess: true,
        phoneNumber: action.payload.phone,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case VERIFY_OTP_FAILURE:
    case LOAD_USER_FAILURE:
    case RESEND_OTP_FAILURE:
      // Don't clear token for load user failures to allow retry
      if (action.type !== LOAD_USER_FAILURE) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return {
        ...state,
        token: action.type === LOAD_USER_FAILURE ? state.token : null,
        isAuthenticated:
          action.type === LOAD_USER_FAILURE ? state.isAuthenticated : false,
        loading: false,
        user: action.type === LOAD_USER_FAILURE ? state.user : null,
        error: action.payload,
        otpSent: false,
        phoneNumber: "",
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        otpSent: false,
        phoneNumber: "",
        registrationSuccess: false,
      };

    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
