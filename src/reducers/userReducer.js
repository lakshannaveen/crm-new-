import {
  GET_USER_REQUESTS_REQUEST,
  GET_USER_REQUESTS_SUCCESS,
  GET_USER_REQUESTS_FAILURE,
  APPROVE_USER_REQUEST,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_FAILURE,
  REJECT_USER_REQUEST,
  REJECT_USER_SUCCESS,
  REJECT_USER_FAILURE,
  GET_USER_BY_SERVICE_NO_REQUEST,
  GET_USER_BY_SERVICE_NO_SUCCESS,
  GET_USER_BY_SERVICE_NO_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  userRequests: [],
  approvedUsers: [],
  loading: false,
  error: null,
  serviceUser: null,
  serviceUserLoading: false,
  serviceUserError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUESTS_REQUEST:
    case APPROVE_USER_REQUEST:
    case REJECT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userRequests: action.payload.pending,
        approvedUsers: action.payload.approved,
      };

    case APPROVE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userRequests: state.userRequests.filter(user => user.id !== action.payload),
        approvedUsers: [...state.approvedUsers, action.payload.user],
      };

    case REJECT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userRequests: state.userRequests.filter(user => user.id !== action.payload),
      };

    case GET_USER_REQUESTS_FAILURE:
    case APPROVE_USER_FAILURE:
    case REJECT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_USER_BY_SERVICE_NO_REQUEST:
      return {
        ...state,
        serviceUserLoading: true,
        serviceUserError: null,
      };

    case GET_USER_BY_SERVICE_NO_SUCCESS:
      return {
        ...state,
        serviceUserLoading: false,
        serviceUser: action.payload,
        serviceUserError: null,
      };

    case GET_USER_BY_SERVICE_NO_FAILURE:
      return {
        ...state,
        serviceUserLoading: false,
        serviceUserError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;