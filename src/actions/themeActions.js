import { TOGGLE_THEME, SET_THEME } from "../constants/themeActionTypes";

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
