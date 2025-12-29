import {
  GET_FEEDBACK_DATES_REQUEST,
  GET_FEEDBACK_DATES_SUCCESS,
  GET_FEEDBACK_DATES_FAILURE,
  SUBMIT_FEEDBACK_REQUEST,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAILURE,
  CLEAR_FEEDBACK_ERROR,
} from "../constants/feedbackActionTypes";
import * as feedbackService from "../services/feedbackService";

// Get feedback dates
export const getFeedbackDates =
  (jobCategory, projectNumber) => async (dispatch) => {
    try {
      dispatch({ type: GET_FEEDBACK_DATES_REQUEST });

      const data = await feedbackService.getFeedbackDates(
        jobCategory,
        projectNumber
      );

      dispatch({
        type: GET_FEEDBACK_DATES_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: GET_FEEDBACK_DATES_FAILURE,
        payload:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch feedback dates",
      });
      throw error;
    }
  };

// Submit feedback
// export const submitFeedback = (feedbackData) => async (dispatch) => {
//   try {
//     dispatch({ type: SUBMIT_FEEDBACK_REQUEST });

//     const data = await feedbackService.submitFeedback(feedbackData);

//     dispatch({
//       type: SUBMIT_FEEDBACK_SUCCESS,
//       payload: data,
//     });

//     return data;
//   } catch (error) {
//     dispatch({
//       type: SUBMIT_FEEDBACK_FAILURE,
//       payload: error.response?.data?.message || error.message || "Failed to submit feedback",
//     });
//     throw error;
//   }
// };

// Clear feedback error
export const clearFeedbackError = () => ({
  type: CLEAR_FEEDBACK_ERROR,
});
