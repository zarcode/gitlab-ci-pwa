import { propOr, identity, prop } from 'ramda';

export const createReducer = (initialState, handlers) => (state = initialState, action) =>
  propOr(identity, prop("type", action), handlers)(state, action);