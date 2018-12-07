import { createAction, createReducer } from '../helpers'
import { addUser, logError } from '../models/user'

const initialState = {}

const FETCH_USER = 'FETCH_USER'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAIL = 'FETCH_USER_FAIL'

export const fetchUser =
  createAction(FETCH_USER)

export const userSuccess =
  createAction(FETCH_USER_SUCCESS)

export const userFail =
  createAction(FETCH_USER_FAIL)

const reducer = createReducer({
  [FETCH_USER_SUCCESS]: addUser,
  // [FETCH_USER_FAIL]: logError
})

export default reducer