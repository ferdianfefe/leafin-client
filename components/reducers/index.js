import { combineReducers } from '@reduxjs/toolkit';
import user from './user';
import userPlant from './userPlant';
import message from './message';
import feed from './feed';

export default combineReducers({
  user,
  userPlant,
  message,
  feed,
});
