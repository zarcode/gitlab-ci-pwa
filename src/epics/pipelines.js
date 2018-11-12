import { from, of } from 'rxjs';
import {
  switchMap,
  map,
  filter,
  catchError,
  takeUntil,
} from 'rxjs/operators';

import * as pipelinesActions from '../actions/pipelines';
// import asObservable from './rxUtils';
import * as api from '../api';

export const loadPipelines = (action, state) =>
  action.ofType('FETCH_PIPELINES').pipe(
    switchMap(() => {
      const requestAction = from(api.fetchPipelines({
        token: state.value.auth.token
      })).pipe(
        map(data => pipelinesActions.pipelinesSuccess(data)),
        catchError(e => of(pipelinesActions.pipelinesFail(e.message)))
      );
      return requestAction;
        // .takeUntil(action
        //   .filter(futureAction => futureAction.type === 'FETCH_PIPELINES'));
    })
  );