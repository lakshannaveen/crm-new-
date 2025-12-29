import {
  GET_FEEDBACK_DATES_REQUEST,
  GET_FEEDBACK_DATES_SUCCESS,
  GET_FEEDBACK_DATES_FAILURE,
  SUBMIT_FEEDBACK_REQUEST,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAILURE,
  CLEAR_FEEDBACK_ERROR,
} from "../constants/feedbackActionTypes";

const initialState = {
  dates: {
    startingDate: "",
    endingDate: "",
  },
  loading: false,
  submitting: false,
  error: null,
  submitSuccess: false,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEEDBACK_DATES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_FEEDBACK_DATES_SUCCESS:
      console.log("API Response:", action.payload); // Debug log

      // Helper function to format date to YYYY-MM-DD
      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return "";
          return date.toISOString().split("T")[0];
        } catch {
          return "";
        }
      };

      // Handle different possible response structures
      const resultData =
        action.payload.ResultSet?.[0] || action.payload[0] || action.payload;

      const startDate =
        resultData.FEEDBACK_START_DATE ||
        resultData.FEEDBACK_START_DT ||
        resultData.startingDate ||
        resultData.START_DATE ||
        resultData.startDate ||
        resultData.STARTING_DATE ||
        action.payload.startingDate ||
        action.payload.START_DATE ||
        "";

      const endDate =
        resultData.FEEDBACK_END_DATE ||
        resultData.FEEDBACK_END_DT ||
        resultData.endingDate ||
        resultData.END_DATE ||
        resultData.endDate ||
        resultData.ENDING_DATE ||
        action.payload.endingDate ||
        action.payload.END_DATE ||
        "";

      console.log("Formatted dates:", { startDate, endDate }); // Debug log

      return {
        ...state,
        loading: false,
        dates: {
          startingDate: formatDate(startDate),
          endingDate: formatDate(endDate),
        },
        error: null,
      };

    case GET_FEEDBACK_DATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SUBMIT_FEEDBACK_REQUEST:
      return {
        ...state,
        submitting: true,
        submitSuccess: false,
        error: null,
      };

    case SUBMIT_FEEDBACK_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitSuccess: true,
        error: null,
      };

    case SUBMIT_FEEDBACK_FAILURE:
      return {
        ...state,
        submitting: false,
        submitSuccess: false,
        error: action.payload,
      };

    case CLEAR_FEEDBACK_ERROR:
      return {
        ...state,
        error: null,
        submitSuccess: false,
      };

    default:
      return state;
  }
};

export default feedbackReducer;
