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
  } catch (err) {
    console.error(err);
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
  const res = yield call(api.updateProfile.bind(api), payload);
  if (res.status) {
    switch (res.status) {
      case 200: console.log('Ok, show snack'); break;
      case 401: console.log('Auth err'); break;
      case 404: console.log('No profile'); break;
      default: break;
    }
  }
}

function* actionWatcher() {
  yield takeEvery('GET_TOKEN_ASYNC', getToken);
  yield takeEvery('CLEAR_LOCAL_STORAGE', logout);
  yield takeEvery('APP_INIT', appInit);
  yield takeEvery('GET_USER', getUser);
  yield takeEvery('GET_PROFILE', getProfile);
  yield takeEvery('GET_PROFILES', getProfiles);
  yield takeEvery('UPDATE_PROFILE', updateProfile);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
