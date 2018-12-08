import { createAction, createReducer } from '../helpers'
import { saveToken, resetState } from '../models/auth'

export const initialState = {
    isAuthenticated: false,
    token: undefined,
}

const LOGIN_REQUESTED = 'LOGIN_REQUESTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

export const login =
  createAction(LOGIN_REQUESTED)

export const loginSuccess =
  createAction(LOGIN_SUCCESS)

export const logout =
  createAction(LOGOUT)

const reducer = createReducer({
  [LOGIN_SUCCESS]: saveToken,
  [LOGOUT]: resetState
})

export default reducer
  