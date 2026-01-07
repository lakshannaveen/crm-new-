import {
  GET_FEEDBACK_DATES_REQUEST,
  GET_FEEDBACK_DATES_SUCCESS,
  GET_FEEDBACK_DATES_FAILURE,
  GET_DURATION_REQUEST,
  GET_DURATION_SUCCESS,
  GET_DURATION_FAILURE,
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
  GET_MILESTONE_TYPES_REQUEST,
  GET_MILESTONE_TYPES_SUCCESS,
  GET_MILESTONE_TYPES_FAILURE,
  GET_ALL_FEEDBACKS_REQUEST,
  GET_ALL_FEEDBACKS_SUCCESS,
  GET_ALL_FEEDBACKS_FAILURE,
  CLEAR_FEEDBACK_ERROR,
  CLEAR_FEEDBACK_DATES,
} from "../constants/feedbackActionTypes";

const initialState = {
  dates: {
    startingDate: "",
    endingDate: "",
  },
  duration: {
    afloatDays: 0,
    indockDays: 0,
  },
  durationLoading: false,
  jmainList: [],
  jmainLoading: false,
  unitsDescriptions: [],
  unitsDescriptionsLoading: false,
  milestoneTypes: [],
  milestoneTypesLoading: false,
  allFeedbacks: [],
  allFeedbacksLoading: false,
  loading: false,
  submitting: false,
  milestoneSubmitting: false,
  milestoneSubmitSuccess: false,
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

    case GET_DURATION_REQUEST:
      return {
        ...state,
        durationLoading: true,
        error: null,
      };

    case GET_DURATION_SUCCESS:
      // Handle different possible response structures
      let durationData = {};

      if (action.payload) {
        if (
          action.payload.ResultSet &&
          Array.isArray(action.payload.ResultSet)
        ) {
          durationData = action.payload.ResultSet[0] || {};
        } else if (Array.isArray(action.payload)) {
          durationData = action.payload[0] || {};
        } else if (typeof action.payload === "object") {
          durationData = action.payload;
        }
      }

      console.log("Duration API Response:", action.payload);
      console.log("Extracted durationData:", durationData);

      const afloatDays =
        durationData.FEEDBACK_AFLOT_DURATION ||
        durationData.FEEDBACK_AFLOAT_DURATION ||
        durationData.AFLOAT_DAYS ||
        durationData.P_AFLOAT_DAYS ||
        durationData.afloatDays ||
        durationData.afloat_days ||
        durationData.AFLOAT_DURATION ||
        durationData.P_AFLOAT_DURATION ||
        durationData.afloatDuration ||
        0;

      const indockDays =
        durationData.FEEDBACK_INDOCK_DURATION ||
        durationData.INDOCK_DAYS ||
        durationData.P_INDOCK_DAYS ||
        durationData.indockDays ||
        durationData.indock_days ||
        durationData.INDOCK_DURATION ||
        durationData.P_INDOCK_DURATION ||
        durationData.indockDuration ||
        0;

      console.log(
        "Parsed durations - Afloat:",
        afloatDays,
        "Indock:",
        indockDays
      );

      return {
        ...state,
        durationLoading: false,
        duration: {
          afloatDays: parseInt(afloatDays) || 0,
          indockDays: parseInt(indockDays) || 0,
        },
        error: null,
      };

    case GET_DURATION_FAILURE:
      return {
        ...state,
        durationLoading: false,
        error: action.payload,
      };

    case GET_JMAIN_REQUEST:
      return {
        ...state,
        jmainLoading: true,
        error: null,
      };

    case GET_JMAIN_SUCCESS:
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

    case GET_MILESTONE_TYPES_REQUEST:
      return {
        ...state,
        milestoneTypesLoading: true,
        error: null,
      };

    case GET_MILESTONE_TYPES_SUCCESS:
      let milestoneTypesData = [];
      if (action.payload) {
        if (
          action.payload.ResultSet &&
          Array.isArray(action.payload.ResultSet)
        ) {
          milestoneTypesData = action.payload.ResultSet;
        } else if (Array.isArray(action.payload)) {
          milestoneTypesData = action.payload;
        } else if (typeof action.payload === "object") {
          milestoneTypesData =
            action.payload.data ||
            action.payload.result ||
            action.payload.items ||
            [];
        }
      }

      return {
        ...state,
        milestoneTypesLoading: false,
        milestoneTypes: Array.isArray(milestoneTypesData)
          ? milestoneTypesData
          : [],
        error: null,
      };

    case GET_MILESTONE_TYPES_FAILURE:
      return {
        ...state,
        milestoneTypesLoading: false,
        milestoneTypes: [],
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

    case SUBMIT_MILESTONE_REQUEST:
      return {
        ...state,
        milestoneSubmitting: true,
        milestoneSubmitSuccess: false,
        error: null,
      };

    case SUBMIT_MILESTONE_SUCCESS:
      return {
        ...state,
        milestoneSubmitting: false,
        milestoneSubmitSuccess: true,
        error: null,
      };

    case SUBMIT_MILESTONE_FAILURE:
      return {
        ...state,
        milestoneSubmitting: false,
        milestoneSubmitSuccess: false,
        error: action.payload,
      };

    case GET_ALL_FEEDBACKS_REQUEST:
      return {
        ...state,
        allFeedbacksLoading: true,
        error: null,
      };

    case GET_ALL_FEEDBACKS_SUCCESS:
      return {
        ...state,
        allFeedbacksLoading: false,
        allFeedbacks: action.payload,
        error: null,
      };

    case GET_ALL_FEEDBACKS_FAILURE:
      return {
        ...state,
        allFeedbacksLoading: false,
        error: action.payload,
      };

    case CLEAR_FEEDBACK_ERROR:
      return {
        ...state,
        error: null,
        submitSuccess: false,
        milestoneSubmitSuccess: false,
      };

    case CLEAR_FEEDBACK_DATES:
      return {
        ...state,
        dates: {
          startingDate: "",
          endingDate: "",
        },
      };

    default:
      return state;
  }
};

export default feedbackReducer;
