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
  CLEAR_FEEDBACK_ERROR,
} from "../constants/feedbackActionTypes";

const initialState = {
  dates: {
    startingDate: "",
    endingDate: "",
  },
  jmainList: [],
  jmainLoading: false,
  unitsDescriptions: [],
  unitsDescriptionsLoading: false,
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

    case GET_JMAIN_REQUEST:
      return {
        ...state,
        jmainLoading: true,
        error: null,
      };

    case GET_JMAIN_SUCCESS:
      console.log("JMain API Response (Full):", action.payload);
      console.log("JMain API Response (Type):", typeof action.payload);

      // Handle different possible response structures
      let jmainData = [];

      if (action.payload) {
        if (
          action.payload.ResultSet &&
          Array.isArray(action.payload.ResultSet)
        ) {
          jmainData = action.payload.ResultSet;
        } else if (Array.isArray(action.payload)) {
          jmainData = action.payload;
        } else if (typeof action.payload === "object") {
          // If it's an object with data property or similar
          jmainData =
            action.payload.data ||
            action.payload.result ||
            action.payload.items ||
            [];
        }
      }

      console.log("JMain Parsed Data:", jmainData);
      console.log("JMain Data Length:", jmainData.length);

      return {
        ...state,
        jmainLoading: false,
        jmainList: Array.isArray(jmainData) ? jmainData : [],
        error: null,
      };

    case GET_JMAIN_FAILURE:
      return {
        ...state,
        jmainLoading: false,
        jmainList: [],
        error: action.payload,
      };

    case GET_UNITS_DESCRIPTIONS_REQUEST:
      return {
        ...state,
        unitsDescriptionsLoading: true,
        error: null,
      };

    case GET_UNITS_DESCRIPTIONS_SUCCESS:
      console.log("Units Descriptions API Response:", action.payload);

      // Handle different possible response structures
      let unitsData = [];

      if (action.payload) {
        if (
          action.payload.ResultSet &&
          Array.isArray(action.payload.ResultSet)
        ) {
          unitsData = action.payload.ResultSet;
        } else if (Array.isArray(action.payload)) {
          unitsData = action.payload;
        } else if (typeof action.payload === "object") {
          unitsData =
            action.payload.data ||
            action.payload.result ||
            action.payload.items ||
            [];
        }
      }

      console.log("Units Descriptions Parsed Data:", unitsData);

      return {
        ...state,
        unitsDescriptionsLoading: false,
        unitsDescriptions: Array.isArray(unitsData) ? unitsData : [],
        error: null,
      };

    case GET_UNITS_DESCRIPTIONS_FAILURE:
      return {
        ...state,
        unitsDescriptionsLoading: false,
        unitsDescriptions: [],
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
