import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import ships from './shipReducer';
import projects from './projectReducer';
import theme from './themeReducer';

export default combineReducers({
  auth,
  user,
  ships,
  projects,
  theme,
});