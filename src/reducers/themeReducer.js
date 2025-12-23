import { TOGGLE_THEME, SET_THEME } from "../constants/themeActionTypes";

const initialState = {
  mode: localStorage.getItem("theme") || "light",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return {
        ...state,
        mode: newMode,
      };

    case SET_THEME:
      localStorage.setItem("theme", action.payload);
      return {
        ...state,
        mode: action.payload,
      };

    default:
      return state;
  }
};

export default themeReducer;
