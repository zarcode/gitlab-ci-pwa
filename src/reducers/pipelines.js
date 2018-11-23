import { createSelector } from 'reselect';
const initialState = {
  byId: {},
  ids: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PIPELINES_SUCCESS':
      return {
        byId: {
          ...state.byId,
          ...action.response.entities.pipeline,
        },
        ids: [
          ...state.ids,
          ...action.response.result,
        ]
      };
    case 'FETCH_PIPELINES_FAIL':
      return state;
    default:
      return state;
  }
};

export const getById = (state: any) => state.pipelines.byId;
export const getIds = (state: any) => state.pipelines.ids;
export const getPipelines = createSelector([getIds, getById], (allIds, allById) =>
allIds.map(id => allById[id]));
  