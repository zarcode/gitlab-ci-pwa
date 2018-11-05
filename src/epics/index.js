import { combineEpics } from 'redux-observable';
import { saveAuthState } from './auth';

export default combineEpics(saveAuthState);