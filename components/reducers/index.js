import { combineReducers } from '@reduxjs/toolkit';
import user from './user';
import userPlant from './userPlant';
import message from './message';
import feed from './feed';
import log from './log';
import marketplace from './marketplace';

export default combineReducers({
  user,
  userPlant,
  message,
  feed,
  log,
  marketplace,
});
