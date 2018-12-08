import auth, { initialState as initialAuth } from './auth';
import pipelines, { initialState as initialPipelines } from './pipelines';
import projects, { initialState as initialProjects } from './projects';
import user, { initialState as initialUser } from './user';

import execWith from 'crocks/State/execWith'

import { combineReducers } from '../helpers'

export const initialState = {
    pipelines: initialPipelines,
    projects: initialProjects,
    auth: initialAuth,
    user: initialUser,
}
// Action a :: { type: String, payload: a }
// Reducer :: Action a -> Maybe (State AppState ())

// reducers :: Reducer
const reducers = combineReducers([
    auth,
    projects,
    user,
    pipelines,
]);

// reducer :: (AppState, Action) -> AppState
const reducer = (prevState, action) =>
  reducers(action)
    .map(execWith(prevState))
    .option(prevState)

export default reducer