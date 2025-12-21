import {
  GET_SHIPS_REQUEST,
  GET_SHIPS_SUCCESS,
  GET_SHIPS_FAILURE,
  GET_SHIP_DETAILS_REQUEST,
  GET_SHIP_DETAILS_SUCCESS,
  GET_SHIP_DETAILS_FAILURE,
  ADD_SHIP_REQUEST,
  ADD_SHIP_SUCCESS,
  ADD_SHIP_FAILURE,
  UPDATE_SHIP_REQUEST,
  UPDATE_SHIP_SUCCESS,
  UPDATE_SHIP_FAILURE,
  FETCH_SHIPS_REQUEST,
  FETCH_SHIPS_SUCCESS,
  FETCH_SHIPS_FAILURE,
} from "../constants/actionTypes";

const initialState = {
  ships: [],
  currentShip: null,
  loading: false,
  error: null,
};

const shipReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPS_REQUEST:
    case GET_SHIP_DETAILS_REQUEST:
    case ADD_SHIP_REQUEST:
    case UPDATE_SHIP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

      case FETCH_SHIPS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_SHIPS_SUCCESS:
      return { ...state, loading: false, ships: action.payload };

    case FETCH_SHIPS_FAILURE:
      return { ...state, loading: false, error: action.payload };


    case GET_SHIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        ships: Array.isArray(action.payload) ? action.payload : [],
      };

    case GET_SHIP_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentShip: action.payload,
      };

    case ADD_SHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        ships: [...state.ships, action.payload],
      };

    case UPDATE_SHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        ships: state.ships.map((ship) =>
          ship.id === action.payload.id ? action.payload : ship
        ),
        currentShip: action.payload,
      };

    case GET_SHIPS_FAILURE:
    case GET_SHIP_DETAILS_FAILURE:
    case ADD_SHIP_FAILURE:
    case UPDATE_SHIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default shipReducer;
