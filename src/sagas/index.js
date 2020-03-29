import {
  all, call, put, takeEvery, select
} from 'redux-saga/effects';
import jwt from 'jwt-decode';
import API from '../api/API';
import ls from './wrappers/localstorage';
import * as _ from 'lodash';

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
  try {
    const { payload } = action;
    const profile = yield call(api.getProfile.bind(api), payload);
    yield put({
      type: 'SET_PROFILE',
      payload: profile,
    });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getProfiles(action = {}) {
  try {
    const query = yield select((state) => state.profiles.query);
    const res = yield call(api.getProfiles.bind(api), {query});
    yield put({
      type: 'SET_PROFILES',
      payload: res,
    });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
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
    console.error(e);
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
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* updatePassword(action) {
  const { payload } = action;
  try {
    const res = yield call(api.updatePassword.bind(api), payload);
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
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getResearches(action) {
  try {
    const options = _.get(action, 'payload.options') || {};
    const query = yield select((state) => state.researches.query);
    const res = yield call(api.getResearches.bind(api), {...options, query});
    yield put({
      type: 'SET_RESEARCHES',
      payload: res,
    });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getResearch(action) {
  try {
    const id = action.payload;
    const res = yield call(api.getResearch.bind(api), id);
    yield put({
      type: 'SET_RESEARCH',
      payload: res,
    });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* createResearch(action) {
  try {
    const {payload} = action;
    yield call(api.createResearch.bind(api), payload);
    yield put({ type: 'RESEARCHES_QUERY_CHANGE', payload: {value: ''}});
    yield call(getResearches)
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* deleteResearch(action) {
  try {
    const {id} = action.payload;
    yield call(api.deleteResearch.bind(api), id);
    yield put({ type: 'RESEARCHES_QUERY_CHANGE', payload: {value: ''}});
    yield call(getResearches);
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* editResearch() {
  try {
    const research = yield select((state) => state.research);
    yield call(api.editResearch.bind(api), research.id, research);
  } catch(e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* uploadResearchFile(action) {
  try {
    const {file, meta} = action.payload;
    const fileDescriptor = yield call(api.uploadFile.bind(api), file, meta);

    // Update research info
    const research = yield select((state) => state.research);
    const files = [{
      id: fileDescriptor.id,
      description: fileDescriptor.description,
      title: fileDescriptor.title,
      type: 'file'
    }, ...research.files];
    yield put({ type: 'EDIT_RESEARCH', payload: { key: 'files', value: files }});
    yield editResearch();
    yield getResearch({ payload: research.id });
  } catch(e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getFileContent(action) {
  try {
    const {fileID} = action.payload;
    yield put({type: 'SET_CURRENT_FILE', payload: fileID});

    const payload = yield call(api.getFileContent.bind(api), fileID);
    yield put({ type: 'SET_FILE_CONTENT', payload });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* createExperiment(action) {
  try {
    const {payload} = action;
    const research = yield select((state) => state.research);
    const result = yield call(api.createExperiment.bind(api), {
      ...payload,
      researchID: research.id,
    });
    yield put({ type: 'SET_EXPERIMENT', payload: result });
    yield getExperiments();
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getExperiments(action) {
  try {
    let researchID = _.get(action, 'payload.id');
    if (!researchID) {
      const research = yield select((state) => state.research);
      researchID = research.id;
    }

    const experiments = yield call(api.getExperiments.bind(api), [researchID]);
    yield put({ type: 'SET_EXPERIMENTS', payload: experiments });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getExperiment(action) {
  try {
    const id = action.payload;
    const experiment = yield call(api.getExperiment.bind(api), id);
    yield put({ type: 'SET_EXPERIMENT', payload: experiment });
    yield getFileContent({payload: {fileID: experiment.fileID}});
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* editExperiment(action) {
  try {
    const {fields} = action.payload || {};

    let experiment = yield select((state) => state.experiment);
    if (_.isArray(fields)) {
      experiment = _.pick(experiment, ['id', ...fields]);
    }

    const result = yield call(api.editExperiment.bind(api), experiment.id, experiment);
    yield put({ type: 'SET_EXPERIMENT', payload: result });
    yield getExperiments();
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* createComparison(action) {
  try {
    const {payload} = action;
    const comparison = yield call(api.createComparison.bind(api), payload);
    yield put({ type: 'SET_COMPARISON', payload: comparison });

    yield getResearch({ payload: comparison.researchID });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
}

function* getComparison(action) {
  try {
    const id = action.payload;
    const comparison = yield call(api.getComparison.bind(api), id);
    yield put({ type: 'SET_COMPARISON', payload: comparison });
  } catch (e) {
    console.error(e);
    yield call(showSnack, 'error', 'Service is unreachable');
  }
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
  yield takeEvery('CREATE_RESEARCH', createResearch);
  yield takeEvery('DELETE_RESEARCH', deleteResearch);
  yield takeEvery('COMMIT_RESEARCH_EDIT', editResearch);
  yield takeEvery('UPLOAD_RESEARCH_FILE', uploadResearchFile);
  yield takeEvery('GET_FILE_CONTENT', getFileContent);
  yield takeEvery('CREATE_EXPERIMENT', createExperiment);
  yield takeEvery('GET_EXPERIMENTS', getExperiments);
  yield takeEvery('GET_EXPERIMENT', getExperiment);
  yield takeEvery('COMMIT_EXPERIMENT', editExperiment);
  yield takeEvery('CREATE_COMPARISON', createComparison);
  yield takeEvery('GET_COMPARISON', getComparison);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
