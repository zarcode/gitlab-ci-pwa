
import { createAction, createReducer } from '../helpers'
import { addToList, logError, startLoading } from '../models/projects'

export const initialState = {
  list: [],
  loading: false,
  error: undefined,
}

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
  

  