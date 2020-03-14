import { combineReducers } from 'redux';

import experiment from './experiment';
import experiments from './experiments';
import files from './files';
import profile from './profile';
import profiles from './profiles';
import research from './research';
import researches from './researches';
import snack from './snack';
import user from './user';

export default combineReducers({
  experiment,
  experiments,
  files,
  profile,
  profiles,
  research,
  researches,
  snack,
  user,
});
