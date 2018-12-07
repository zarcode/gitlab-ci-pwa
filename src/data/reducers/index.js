import auth from './auth';
import pipelines from './pipelines';
import projects from './projects';
import user from './user';

import execWith from 'crocks/State/execWith'

import { combineReducers } from '../helpers'

// Action a :: { type: String, payload: a }
// Reducer :: Action a -> Maybe (State AppState ())

// reducers :: Reducer
const reducers = combineReducers([
    // auth,
    projects,
    // pipelines,
    // user,
]);

// reducer :: (AppState, Action) -> AppState
const reducer = (prevState, action) =>
  reducers(action)
    .map(execWith(prevState))
    .option(prevState)

export default reducer