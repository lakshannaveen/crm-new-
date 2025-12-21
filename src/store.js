import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import shipReducer from './reducers/shipReducer';
import projectReducer from './reducers/projectReducer';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ships: shipReducer,
  projects: projectReducer,
  theme: themeReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
  
);

export default store;