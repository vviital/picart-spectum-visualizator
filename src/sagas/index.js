import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios from "axios";
import jwt from 'jwt-decode';

const ls = window.localStorage;

// // HTTPClient.js
//
// class HTTPClient {
//     constructor() {
//     }
//
//     post() {
//     }
//
//     postWithAuth(url, body, headers = {}) {
//         const token = localStorage.getItem('token');
//
//         return this.post(url, body, { ...headers, Authorization: `Bearer ${token}` })
//     }
// }
//
//
// // api.js
//
// class API {
//     getToken() {
//         return axios.post.bind(axios);
//     }
// }
//
//
// import API from './api';

function* getToken(action) {
    const { payload } = action;
    try {
        const res = yield call(axios.post.bind(axios), 'http://127.0.0.1:3000/tokens', payload);
        const user = jwt(res.data.token);
        user.token = res.data.token;
        yield put({
            type: "SET_USER", payload: {
                id: user.id,
                email: user.email,
                login: user.login,
                token: res.data.token,
            }
        });
        yield call(setLocalStorage, user);
    } catch (err) {
        console.error(err);
    }
}

function *logout() {
    yield ls.clear();
    yield call(syncToStore);
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
    if (ls.getItem('token')) {
        user.token  = ls.getItem('token');
    }
    yield put({type: 'SYNC_STORAGE', payload: user});
}

function setLocalStorage(user) {
    ls.setItem('id', user.id);
    ls.setItem('email', user.email);
    ls.setItem('login', user.login);
    ls.setItem('token', user.token);
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
