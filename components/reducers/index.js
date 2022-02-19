import { combineReducers } from '@reduxjs/toolkit';
import user from './user';
import userPlant from './userplant';
import message from './message';

export default combineReducers({
  user,
  userPlant,
  message,
});
