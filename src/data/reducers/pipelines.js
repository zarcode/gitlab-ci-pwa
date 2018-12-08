import { createSelector } from 'reselect';

import { normalize } from 'normalizr';
import * as schema from '../schema';

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_PIPELINES':
//       return {
//         ...state,
//         loading: true,
//       }
//     case 'FETCH_PIPELINES_SUCCESS':
//       return {
//         byId: {
//           ...state.byId,
//           ...action.response.entities.pipeline,
//         },
//         ids: [
//           ...state.ids,
//           ...action.response.result,
//         ],
//         loading: false,
//       };
//     case 'FETCH_PIPELINES_FAIL':
//       return {
//         ...state,
//         loading: false,
//       }
//     default:
//       return state;
//   }
// };

import compose from 'crocks/helpers/compose';
import flip from 'crocks/combinators/flip';

import { createAction, createReducer, lensProp, over } from '../helpers'
import { startLoading, saveResults, logError } from '../models/pipelines'

export const initialState = {
  byId: {},
  ids: [],
  lastLoadedPage: 0,
  loading: false,
}

const FETCH_PIPELINES = 'FETCH_PIPELINES'
const FETCH_PIPELINES_SUCCESS = 'FETCH_PIPELINES_SUCCESS'
const FETCH_PIPELINES_FAIL = 'FETCH_PIPELINES_FAIL'
const FETCH_PIPELINE = 'FETCH_PIPELINE'
const FETCH_PIPELINE_SUCCESS = 'FETCH_PIPELINE_SUCCESS'
const FETCH_PIPELINE_FAIL = 'FETCH_PIPELINE_FAIL'

export const fetchPipelines = 
  createAction(FETCH_PIPELINES)

// export const pipelinesSuccess =
//   compose(
//     createAction(FETCH_PIPELINES_SUCCESS),
//     flip(normalize)(schema.pipelines)
//   )

export const pipelinesSuccess =
  compose(
    createAction(FETCH_PIPELINES_SUCCESS),
    over(lensProp('data'), flip(normalize)(schema.pipelines))
  )

export const pipelinesFail =
  createAction(FETCH_PIPELINES_FAIL)

export const fetchPipeline =
  createAction(FETCH_PIPELINE)

export const pipelineSuccess =
  createAction(FETCH_PIPELINE_SUCCESS)

export const pipelineFail =
  createAction(FETCH_PIPELINE_FAIL)

const reducer = createReducer({
  [FETCH_PIPELINES]: startLoading,
  [FETCH_PIPELINES_SUCCESS]: saveResults,
  [FETCH_PIPELINES_FAIL]: logError,
})

export default reducer;

export const getById = state => state.pipelines.byId;
export const getIds = state => state.pipelines.ids;
export const getLoadingState = state => state.pipelines.loading;
export const getLastLoadedPage = state => state.pipelines.lastLoadedPage;
export const getPipelines = createSelector([getIds, getById], (allIds, allById) =>
allIds.map(id => allById[id]));
  