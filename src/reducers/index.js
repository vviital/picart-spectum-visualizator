import { combineReducers } from 'redux';
import files from './files';
import profile from './profile';
import profiles from './profiles';
import research from './research';
import researches from './researches';
import snack from './snack';
import user from './user';

export default combineReducers({
  files,
  profile,
  profiles,
  research,
  researches,
  snack,
  user,
});
