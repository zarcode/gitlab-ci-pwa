import State from 'crocks/State'

import compose from 'crocks/helpers/compose'
import concat from 'crocks/pointfree/concat'
import constant from 'crocks/combinators/constant'

import { lensPath, over } from '../helpers'

const { modify } = State

// lnsLoading :: Object -> Lens
const lnsLoading =
  lensPath([ 'projects', 'loading' ])

// lnsError :: Object -> Lens
const lnsError =
  lensPath([ 'projects', 'error' ])

// lnsList :: Object -> Lens
const lnsList =
  lensPath([ 'projects', 'list' ])

// startLoading :: () -> State AppState ()
export const startLoading = () => 
    modify(over(lnsLoading, constant(true)))

// logError :: a -> State AppState ()
export const logError = (payload) => 
    modify(
        compose(
            over(lnsLoading, constant(false)),
            over(lnsError, constant(payload))
        )
    )

// addToList :: [a] -> State AppState ()
export const addToList = (payload) => 
    modify(
        compose(
            over(lnsLoading, constant(false)),
            over(lnsList, concat(payload))
        )
    )

    