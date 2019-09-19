import axios from 'axios';
import {put,call,takeLatest} from 'redux-saga/effects'
import {actions,dataUser} from "./actions";

const baseURl = 'https://9bh21qott4.execute-api.us-east-1.amazonaws.com/dev/user/token';

function*  loadUserData(action){
    const response = call(axios.post('${baseURl}\${action.name}'));
    yield put(actions.loadUserDataSuccess(response.data))
}

export function* watchLoadUserData() {
    yield takeLatest(dataUser.LOAD_USER_DATA,loadUserData())
}