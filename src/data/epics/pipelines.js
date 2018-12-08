import { from, of } from 'rxjs';
import {
  switchMap,
  map,
  filter,
  catchError,
  takeUntil,
  concat,
} from 'rxjs/operators';

import * as pipelinesActions from '../reducers/pipelines';
// import asObservable from './rxUtils';
import * as api from '../api';

export const loadPipelines = (action$, state) =>
  action$.ofType('FETCH_PIPELINES').pipe(
    switchMap((a) => {
      const requestAction = from(api.fetchPipelines({
        token: state.value.auth.token,
        projectId: a.projectId,
      })).pipe(
        switchMap(data => {
          const page = state.value.pipelines.lastLoadedPage + 1;
          return of(pipelinesActions.pipelinesSuccess({ data, page }))
          .pipe(
            concat(
              ...data.map(pipeline => of({ 
                type: 'FETCH_PIPELINE',  
                pipelineId: pipeline.id,
                projectId: a.projectId,
              }))
            )
          )
        }),
        // map(data => pipelinesActions.pipelinesSuccess(data)),
        catchError(e => of(pipelinesActions.pipelinesFail(e.message)))
      );
      return requestAction;
        // .takeUntil(action
        //   .filter(futureAction => futureAction.type === 'FETCH_PIPELINES'));
    })
  );

export const loadPipeline = (action$, state) =>
  action$.ofType('FETCH_PIPELINE').pipe(
    switchMap((a) => {
      const requestAction = from(api.fetchPipeline({
        token: state.value.auth.token,
        pipelineId: a.pipelineId,
        projectId: a.projectId,
      })).pipe(
        map(data => pipelinesActions.pipelineSuccess(data)),
        catchError(e => of(pipelinesActions.pipelineFail(e.message)))
      );
      return requestAction;
        // .takeUntil(action
        //   .filter(futureAction => futureAction.type === 'FETCH_PIPELINES'));
    })
  );