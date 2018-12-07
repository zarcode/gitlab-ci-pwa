
import { createAction, createReducer } from '../helpers'
import { addToList, logError, startLoading } from '../models/projects'


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

// export const createReducer = (initialState, handlers) => (state = initialState, action) =>
//   propOr(identity, prop("type", action), handlers)(state, action);

// const handlers = {
//   'FETCH_PROJECTS': (state, action) => assoc("loading", true, state),
//   'FETCH_PROJECTS_SUCCESS': (state, action) =>
//   ({
//       loading: false,
//       list: concat(state.list, action.response)
//   }),
//   'FETCH_PROJECTS_FAIL': (state, action) => assoc("loading", false, state),
// };

// export default createReducer(initialState, handlers);

const FETCH_PROJECTS = 'FETCH_PROJECTS'
const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
const FETCH_PROJECTS_FAIL = 'FETCH_PROJECTS_FAIL'

export const fetchProjects =
  createAction(FETCH_PROJECTS)

export const projectsSuccess =
  createAction(FETCH_PROJECTS_SUCCESS)

export const projectsFail =
  createAction(FETCH_PROJECTS_FAIL)

const reducer = createReducer({
  [FETCH_PROJECTS]: startLoading,
  [FETCH_PROJECTS_SUCCESS]: addToList,
  [FETCH_PROJECTS_FAIL]: logError
})

export default reducer
  

  