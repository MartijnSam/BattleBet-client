import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import tournaments from "./tournaments/reducer";

export default combineReducers({
  appState,
  user,
  tournaments,
});
