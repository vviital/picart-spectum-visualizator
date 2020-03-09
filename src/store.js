import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

store.dispatch({ type: 'APP_INIT' });

sagaMiddleware.run(rootSaga);

export default store;
