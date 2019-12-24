import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import twitsRecucer from "./twitsReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  twits: twitsRecucer
});