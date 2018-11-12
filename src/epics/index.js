import { combineEpics } from 'redux-observable';
import { login, logout } from './auth';
import { loadProjects } from './projects';
import { loadPipelines } from './pipelines';

export default combineEpics(
    login, logout,
    loadProjects,
    loadPipelines,
);