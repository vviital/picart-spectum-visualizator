import { combineReducers } from 'redux';
import user from './user';
import profile from './profile';
import profiles from './profiles';
import snack from './snack';
import researches from './researches';

export default combineReducers({
  user,
  profile,
  profiles,
  snack,
  researches,
});
