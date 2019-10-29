import { combineReducers } from 'redux';

import user from './user';
import profile from './profile'

export default combineReducers({
    user,
    profile,
});
