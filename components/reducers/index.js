import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import userPlant from "./userplant"

export default combineReducers({
  user,
  userPlant
});
