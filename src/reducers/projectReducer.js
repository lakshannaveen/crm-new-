import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT_DETAILS_REQUEST,
  GET_PROJECT_DETAILS_SUCCESS,
  GET_PROJECT_DETAILS_FAILURE,
  UPDATE_PROJECT_PROGRESS_REQUEST,
  UPDATE_PROJECT_PROGRESS_SUCCESS,
  UPDATE_PROJECT_PROGRESS_FAILURE,
} from "../constants/projectActionTypes";

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
    case GET_PROJECT_DETAILS_REQUEST:
    case UPDATE_PROJECT_PROGRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };

    case GET_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProject: action.payload,
      };

    case UPDATE_PROJECT_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
        currentProject: action.payload,
      };

    case GET_PROJECTS_FAILURE:
    case GET_PROJECT_DETAILS_FAILURE:
    case UPDATE_PROJECT_PROGRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default projectReducer;
