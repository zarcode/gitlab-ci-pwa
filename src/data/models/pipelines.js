import State from 'crocks/State'

import assign from 'crocks/helpers/assign'
import compose from 'crocks/helpers/compose'
import concat from 'crocks/pointfree/concat'
import constant from 'crocks/combinators/constant'

import { lensPath, over } from '../helpers'

const { modify } = State

// lnsLoading :: Object -> Lens
const lnsLoading =
  lensPath([ 'pipelines', 'loading' ])

// lnsError :: Object -> Lens
const lnsError =
  lensPath([ 'pipelines', 'error' ])

// lnsList :: Object -> Lens
const lnsIds =
  lensPath([ 'pipelines', 'ids' ])

// lnsById :: Object -> Lens
const lnsById =
  lensPath([ 'pipelines', 'byId' ])

// startLoading :: () -> State AppState ()
export const startLoading = () => 
    modify(over(lnsLoading, constant(true)))

// saveResults :: Object -> State AppState ()
export const saveResults = (payload) => 
    modify(
        compose(
            over(lnsLoading, constant(false)),
            over(lnsById, assign(payload.entities.pipeline)),
            over(lnsIds, concat(payload.result))
        )
    )

// logError :: a -> State AppState ()
export const logError = (payload) => 
    modify(
        compose(
            over(lnsLoading, constant(false)),
            over(lnsError, constant(payload))
        )
    )

