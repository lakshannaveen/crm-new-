import {
  GET_FEEDBACK_DATES_REQUEST,
  GET_FEEDBACK_DATES_SUCCESS,
  GET_FEEDBACK_DATES_FAILURE,
  GET_JMAIN_REQUEST,
  GET_JMAIN_SUCCESS,
  GET_JMAIN_FAILURE,
  GET_UNITS_DESCRIPTIONS_REQUEST,
  GET_UNITS_DESCRIPTIONS_SUCCESS,
  GET_UNITS_DESCRIPTIONS_FAILURE,
  SUBMIT_FEEDBACK_REQUEST,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAILURE,
  SUBMIT_MILESTONE_REQUEST,
  SUBMIT_MILESTONE_SUCCESS,
  SUBMIT_MILESTONE_FAILURE,
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

// Get JMain (project numbers) by job category
export const getJmain = (jobCategory) => async (dispatch) => {
  try {
    dispatch({ type: GET_JMAIN_REQUEST });

    const data = await feedbackService.getJmain(jobCategory);

    dispatch({
      type: GET_JMAIN_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: GET_JMAIN_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch project numbers",
    });
    throw error;
  }
};

// Get Units and Descriptions
export const getUnitsDescriptions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_UNITS_DESCRIPTIONS_REQUEST });

    const data = await feedbackService.getUnitsDescriptions();

    dispatch({
      type: GET_UNITS_DESCRIPTIONS_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: GET_UNITS_DESCRIPTIONS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch units descriptions",
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

// Submit milestone
export const submitMilestone = (milestoneData) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_MILESTONE_REQUEST });

    const data = await feedbackService.addMilestone(milestoneData);

    dispatch({
      type: SUBMIT_MILESTONE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: SUBMIT_MILESTONE_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to submit milestone",
    });
    throw error;
  }
};

// Clear feedback error
export const clearFeedbackError = () => ({
  type: CLEAR_FEEDBACK_ERROR,
});
