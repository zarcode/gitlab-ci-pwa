/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { loadState, saveState } from './localStorage';

import rootEpic from './epics/';
import appReducer from './reducers';

const persistedState = loadState();

export default () => {
  const epicMiddleware = createEpicMiddleware();

  const middleWares = [
    epicMiddleware,
  ];
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(appReducer, persistedState, composeEnhancers(
    applyMiddleware(...middleWares)
  ));

  // store.subscribe(() => {
  //   saveState({
  //     auth: store.getState().auth,
  //   });
  // });
    
  epicMiddleware.run(rootEpic);

  return store;
};