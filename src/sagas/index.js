import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import jwt from 'jwt-decode';
import API from '../api/API';
import ls from './wrappers/localstorage';

const api = new API();

function* getUser() {
  let user = {
    id: '',
  };
  if (yield call(ls.getItem, 'token')) {
    user = jwt(yield call(ls.getItem, 'token'));
  }
  yield put({
    type: 'SET_USER', payload: user,
  });
}

function* appInit() {
  yield call(getUser);
}

function* getToken(action) {
  const { payload } = action;
  try {
    const res = yield call(api.getToken.bind(api), payload);
    yield call(ls.setItem, 'token', res);
    yield call(getUser, res);
    yield call(showSnack, 'success', 'Successfully logged in! Welcome back!');
  } catch (err) {
    yield call(showSnack, 'error', 'Incorrect login/password!');
  }
}

function* clearUser() {
  yield put({
    type: 'SET_USER',
    payload: {
      id: '',
    },
  });
}

function* logout() {
  yield call(ls.clear);
  yield call(clearUser);
  yield call(showSnack, 'success', 'Successfully logged out! Bye!');
}

function* getProfile(action) {
  const { payload } = action;
  const profile = yield call(api.getProfile.bind(api), payload);
  yield put({
    type: 'SET_PROFILE',
    payload: profile,
  });
}

function* getProfiles() {
  const res = yield call(api.getProfiles.bind(api));
  yield put({
    type: 'SET_PROFILES',
    payload: res,
  });
}

function* updateProfile(action) {
  const { payload } = action;
  try {
    const res = yield call(api.updateProfile.bind(api), payload);
    if (res.status) {
      const { status } = res;
      if (status === 200) {
        yield call(showSnack, 'success', 'Profile has been updated!');
      } else if (status === 404) {
        yield call(showSnack, 'error', 'Profile not found!');
      } else {
        yield call(showSnack, 'error', 'Unknown error');
      }
    }
  } catch (e) {
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* updateEmail(action) {
  const { payload } = action;
  try {
    const res = yield call(api.updateEmail.bind(api), payload);
    if (res.status) {
      const { status } = res;
      if (status === 200) {
        yield call(showSnack, 'success', 'Email has been updated!');
      } else if (status === 403 || status === 401) {
        yield call(showSnack, 'error', 'Wrong password!');
      } else {
        yield call(showSnack, 'error', 'Unknown error');
      }
    }
  } catch (e) {
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* updatePassword(action) {
  const { payload } = action;
  try {
    const res = yield call(api.updatePassword.bind(api), payload);
    console.log(res);
    if (res.status) {
      const { status } = res;
      if (status === 204) {
        yield call(showSnack, 'success', 'Password has been updated!');
      } else if (status === 403 || status === 401) {
        yield call(showSnack, 'error', 'Wrong password!');
      } else {
        yield call(showSnack, 'error', 'Unknown error');
      }
    }
  } catch (e) {
    console.log(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getResearches() {
  const res = yield call(api.getResearches.bind(api));
  yield put({
    type: 'SET_RESEARCHES',
    payload: res,
  });
}

function* getResearch(action) {
  const id = action.payload;
  const res = yield call(api.getResearch.bind(api), id);
  yield put({
    type: 'SET_RESEARCH',
    payload: res,
  });
}

function* showSnack(type, message) {
  yield put({
    type: 'SHOW_SNACK',
    payload: {
      open: true,
      type,
      message,
    },
  });
}

function* actionWatcher() {
  yield takeEvery('GET_TOKEN_ASYNC', getToken);
  yield takeEvery('CLEAR_LOCAL_STORAGE', logout);
  yield takeEvery('APP_INIT', appInit);
  yield takeEvery('GET_USER', getUser);
  yield takeEvery('GET_PROFILE', getProfile);
  yield takeEvery('GET_PROFILES', getProfiles);
  yield takeEvery('UPDATE_PROFILE_INFO', updateProfile);
  yield takeEvery('UPDATE_EMAIL', updateEmail);
  yield takeEvery('UPDATE_PASSWORD', updatePassword);
  yield takeEvery('GET_RESEARCHES', getResearches);
  yield takeEvery('GET_RESEARCH', getResearch);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
