import toast from 'react-hot-toast';
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
import { userService } from '../services/userService';

// Get user requests
export const getUserRequests = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUESTS_REQUEST });

    const response = await userService.getUserRequests();

    dispatch({
      type: GET_USER_REQUESTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_REQUESTS_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to load user requests');
  }
};

// Fetch user by service number (real API)
export const getUserByServiceNo = (serviceNo) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_BY_SERVICE_NO_REQUEST });

    if (!serviceNo) {
      throw new Error('Service number is required');
    }

    const response = await userService.getUserByServiceNo(serviceNo);

    dispatch({
      type: GET_USER_BY_SERVICE_NO_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const message = error?.response?.data?.message || error.message || 'Failed to fetch user';
    dispatch({
      type: GET_USER_BY_SERVICE_NO_FAILURE,
      payload: message,
    });
    toast.error(message);
  }
};

// Approve user
export const approveUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_USER_REQUEST });

    const user = await userService.approveUser(userId);

    dispatch({
      type: APPROVE_USER_SUCCESS,
      payload: { id: userId, user },
    });

    toast.success('User approved successfully');
  } catch (error) {
    dispatch({
      type: APPROVE_USER_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to approve user');
  }
};

// Reject user
export const rejectUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: REJECT_USER_REQUEST });

    await userService.rejectUser(userId);

    dispatch({
      type: REJECT_USER_SUCCESS,
      payload: userId,
    });

    toast.success('User request rejected');
  } catch (error) {
    dispatch({
      type: REJECT_USER_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to reject user');
  }
};