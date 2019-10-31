import {all, call, put, takeEvery} from 'redux-saga/effects';
import jwt from 'jwt-decode';
import API from '../api/API';
import ls from './wrappers/localstorage';

const api = new API();
//const ls = window.localStorage;

function* appInit() {
    yield call(getUser);
}

function* getToken(action) {
    const { payload } = action;
    try {
        const res = yield call(api.getToken, payload);
        //ls.setItem('token', res);
        // yield call(ls.setItem.bind(ls), 'token', res);
        yield call(ls.setItem, 'token', res);

        yield call(getUser, res);
    } catch (err) {
        console.error(err);
    }
}

function *logout() {
    yield call(ls.clear);
    yield call(clearUser);
}

function* getUser() {
    let user = {
        id: '',
    };
    if (yield call(ls.getItem, 'token')) {
       user = jwt(yield call(ls.getItem, 'token'));
    }
    yield put({
        type: "SET_USER", payload: user,
    });
}

function* getProfile(action) {
    const { payload } = action;
    const profile = yield call(api.getProfile, payload);
    yield put({
        type: 'SET_PROFILE',
        payload: profile,
    });
}

function* clearUser() {
    yield put({
        type: "SET_USER",
        payload: {
            id: '',
        }
    });
}

function* actionWatcher() {
    yield takeEvery('GET_TOKEN_ASYNC', getToken);
    yield takeEvery('CLEAR_LOCAL_STORAGE', logout);
    yield takeEvery('APP_INIT', appInit);
    yield takeEvery('GET_USER', getUser);
    yield takeEvery('GET_PROFILE', getProfile);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
