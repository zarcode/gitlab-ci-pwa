/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import type { Middleware } from 'redux';

// import rootEpic from './epics/';
// import appReducer from './reducers';

const rootEpic = x => x;
const appReducer = x => x;

export default () => {
    const epicMiddleware = createEpicMiddleware();

  const middleWares: Array<Middleware> = [
    epicMiddleware,
  ];
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
      applyMiddleware(...middleWares)
      ));
    
    epicMiddleware.run(rootEpic);

    return store;
};