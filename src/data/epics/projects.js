import { from, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';

import * as api from '../api';
import * as projectsActions from '../reducers/projects';

export const loadProjects = (action, state) =>
  action.ofType('FETCH_PROJECTS').pipe(
    switchMap(() => {
      const requestAction = from(api.fetchProjects({
        token: state.value.auth.token,
        userId: state.value.user.id,
      })).pipe(
        map(data => {
          const page = state.value.pipelines.lastLoadedPage + 1;
          return projectsActions.projectsSuccess({ data, page })
        }),
        catchError(e => of(projectsActions.projectsFail(e.message)))
      );
      
      return requestAction;
        // .takeUntil(action
        //   .filter(futureAction => futureAction.type === 'FETCH_PROJECTS'));
    })
  );