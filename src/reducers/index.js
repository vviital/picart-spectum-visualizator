import { combineReducers } from 'redux';

import user from './user';
import profile from './profile';
import profiles from './profiles';

export default combineReducers({
    user,
    profile,
    profiles,
});
