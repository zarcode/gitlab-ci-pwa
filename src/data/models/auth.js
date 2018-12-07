import State from 'crocks/State'

import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'

import { lensPath, over } from '../helpers'

const { modify } = State

// lnsLoading :: Object -> Lens
const lnsIsAuthenticated =
  lensPath([ 'auth', 'isAuthenticated' ])

// lnsError :: Object -> Lens
const lnsToken =
  lensPath([ 'auth', 'token' ])

// saveToken :: () -> State AppState ()
export const saveToken = (token) => 
    modify(
        compose(
            over(lnsIsAuthenticated, constant(true)),
            over(lnsToken, constant(token))
        )
    )

// resetState :: a -> State AppState ()
export const resetState = () => 
    modify(
        compose(
            over(lnsIsAuthenticated, constant(false)),
            over(lnsToken, constant(undefined))
        )
    )