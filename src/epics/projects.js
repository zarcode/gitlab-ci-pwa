import { from, of } from 'rxjs';
import {
  switchMap,
  map,
  filter,
  catchError,
  takeUntil,
} from 'rxjs/operators';

import * as projectsActions from '../actions/projects';
import * as api from '../api';

export const loadProjects = (action, state) =>
  action.ofType('FETCH_PROJECTS').pipe(
    switchMap(() => {
      console.log("user", state.value.user)
      const requestAction = from(api.fetchProjects({
        token: state.value.auth.token,
        userId: state.value.user.id,
      })).pipe(
        map(data => projectsActions.projectsSuccess(data)),
        catchError(e => of(projectsActions.projectsFail(e.message)))
      );
      return requestAction;
        // .takeUntil(action
        //   .filter(futureAction => futureAction.type === 'FETCH_PROJECTS'));
    })
  );