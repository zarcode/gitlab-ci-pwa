import { createSelector } from 'reselect';
const initialState = {
  byId: {},
  ids: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PIPELINES':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_PIPELINES_SUCCESS':
      return {
        byId: {
          ...state.byId,
          ...action.response.entities.pipeline,
        },
        ids: [
          ...state.ids,
          ...action.response.result,
        ],
        loading: false,
      };
    case 'FETCH_PIPELINES_FAIL':
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
};

export const getById = (state: any) => state.pipelines.byId;
export const getIds = (state: any) => state.pipelines.ids;
export const getLoadingState = (state: any) => state.pipelines.loading;
export const getPipelines = createSelector([getIds, getById], (allIds, allById) =>
allIds.map(id => allById[id]));
  