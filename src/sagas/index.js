import { put, all, call } from 'redux-saga/effects';
import axios from "axios";

function* getToken(action = {}) {
    const { payload } = action;

    try {
        const res = yield call(axios.post.bind(axios), 'http://127.0.0.1:3000/tokens', payload);
        yield put({type: "SET_TOKEN", payload: { token: res.data.token } });
    } catch (err) {

    }
}
function* actionWatcher() {
    yield getToken('GET_TOKEN_ASYNC', getToken);
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}