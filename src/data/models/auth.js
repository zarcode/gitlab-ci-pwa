import State from 'crocks/State'

import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'

import { lensPath, set } from '../helpers'

const { modify } = State
const parent = 'auth'

// lnsLoading :: Object -> Lens
const lnsIsAuthenticated =
  lensPath([ parent, 'isAuthenticated' ])

// lnsError :: Object -> Lens
const lnsToken =
  lensPath([ parent, 'token' ])

// saveToken :: () -> State AppState ()
export const saveToken = (token) => 
    modify(
        compose(
            set(lnsIsAuthenticated, true),
            set(lnsToken, token)
        )
    )

// resetState :: a -> State AppState ()
export const resetState = () => 
    modify(
        compose(
            set(lnsIsAuthenticated, false),
            set(lnsToken, undefined)
        )
    )