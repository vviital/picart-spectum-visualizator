import { put, all, call, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import jwt from 'jwt-decode';

const ls = window.localStorage;

function* getToken(action) {
    const { payload } = action;
    try {
        const res = yield call(axios.post.bind(axios), 'http://127.0.0.1:3000/tokens', payload);
        const user = jwt(res.data.token);
        yield put({
            type: "SET_TOKEN", payload: {
                id: user.id,
                email: user.email,
                login: user.login,
                authorized: true
            }
        });
        yield setLocalStorage(user);
    } catch (err) {
        console.log(err.message);
    }
}

function *logout() {
    yield ls.clear();
    yield syncToStore();
}

function* syncToStore() {
    let user = {};
    if (ls.getItem('id')) {
        user.id = ls.getItem('id');
    }
    if (ls.getItem('email')) {
        user.email = ls.getItem('email');
    }
    if (ls.getItem('id')) {
        user.login = ls.getItem('login');
    }
    if (ls.getItem('authorized')) {
        user.authorized  = ls.getItem('authorized');
    }
    yield put({type: 'SYNC_STORAGE', payload: user});
}

function setLocalStorage(user) {
    ls.setItem('id', user.id);
    ls.setItem('email', user.email);
    ls.setItem('login', user.login);
    ls.setItem('authorized', 'true');
}

function* actionWatcher() {
    yield takeEvery('GET_TOKEN_ASYNC', getToken);
    yield takeEvery('GET_STORAGE', syncToStore);
    yield takeEvery('CLEAR_LOCAL_STORAGE', logout);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
