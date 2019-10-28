import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios from "axios";
import jwt from "jwt-decode";

const ls = window.localStorage;

function* appInit() {
    if (ls.getItem('token')) {
        yield call(getUser);
    }
}

function* getToken(action) {
    const { payload } = action;
    try {
        const res = yield call(axios.post.bind(axios), 'http://127.0.0.1:3000/tokens', payload);
        yield call(setLocalStorage, {token: res.data.token});
        yield call(getUser);
    } catch (err) {
        console.error(err);
    }
}

function *logout() {
    yield ls.clear();
    yield call(clearUser);
}

function setLocalStorage(payload) {
    ls.setItem('token', payload.token);
}

function* getUser() {
    const user = jwt(ls.getItem('token'));
    yield put({
        type: "SET_USER", payload: {
            id: user.id,
            email: user.email,
            login: user.login,
        }
    });
}
function* clearUser() {
    yield put({
        type: "SET_USER", payload: {}
    });
}

function* actionWatcher() {
    yield takeEvery('GET_TOKEN_ASYNC', getToken);
    yield takeEvery('CLEAR_LOCAL_STORAGE', logout);
    yield takeEvery('APP_INIT', appInit);
    yield takeEvery('GET_USER', getUser);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
