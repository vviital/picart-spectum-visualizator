import { put, all, call, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import jwt from 'jwt-decode';

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
            }
        });
        yield setLocalStorage(user);
    } catch (err) {
        console.log(err.message);
    }
}

function setLocalStorage(user) {
    const localStorage = window.localStorage;
    localStorage.setItem('id', user.id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('login', user.login);
}

function* actionWatcher() {
    yield takeEvery('GET_TOKEN_ASYNC', getToken);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
