import { normalize } from 'normalizr';
import { createSelector } from 'reselect';
import * as schema from '../schema';

import compose from 'crocks/helpers/compose';
import flip from 'crocks/combinators/flip';

import { createAction, createReducer, lensProp, over } from '../helpers';
import { logError, saveResults, startLoading, updatePipeline } from '../models/pipelines';

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
  [FETCH_PIPELINE_SUCCESS]: updatePipeline,
})

export default reducer;

export const getById = state => state.pipelines.byId;
export const getIds = state => state.pipelines.ids;
export const getLoadingState = state => state.pipelines.loading;
export const getLastLoadedPage = state => state.pipelines.lastLoadedPage;
export const getError = state => state.pipelines.error;
export const getPipelines = createSelector([getIds, getById], (allIds, allById) =>
allIds.map(id => allById[id]));
  