import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import message from "./message";

export default combineReducers({
  user,
  message,
});
