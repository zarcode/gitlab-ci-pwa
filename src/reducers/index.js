import { combineReducers } from 'redux';
import auth from './auth';
import pipelines from './pipelines';
import projects from './projects';
import user from './user';

export default combineReducers({
    auth,
    projects,
    pipelines,
    user,
});