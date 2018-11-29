import { propOr, identity, prop, assoc, concat } from 'ramda';
// import { compose } from 'redux';

const initialState = {
  list: [],
  loading: false,
}

// export default (state = initialState, action) => {
//     switch (action.type) {
//       case 'FETCH_PROJECTS':
//         return {
//           ...state,
//           loading: true,
//         };
//       case 'FETCH_PROJECTS_SUCCESS':
//         return {
//           loading: false,
//           list: [
//             ...state.list,
//             ...action.response,
//           ]
//         }
//       case 'FETCH_PROJECTS_FAIL':
//         return {
//           ...state,
//           loading: false,
//         };
//       default:
//         return state;
//     }
//   };

export const createReducer = (initialState, handlers) => (state = initialState, action) =>
  propOr(identity, prop("type", action), handlers)(state, action);

const handlers = {
  'FETCH_PROJECTS': (state, action) => assoc("loading", true, state),
  'FETCH_PROJECTS_SUCCESS': (state, action) =>
  ({
      loading: false,
      list: concat(state.list, action.response)
  }),
  'FETCH_PROJECTS_FAIL': (state, action) => assoc("loading", false, state),
};

export default createReducer(initialState, handlers);
  

  