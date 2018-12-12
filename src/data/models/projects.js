import State from 'crocks/State'

import compose from 'crocks/helpers/compose'
import concat from 'crocks/pointfree/concat'
import constant from 'crocks/combinators/constant'

import { lensPath, over, set } from '../helpers'

const { modify } = State
const parent = 'projects'

// lnsLoading :: Object -> Lens
const lnsLoading =
  lensPath([ parent, 'loading' ])

// lnsLastLoadedPage :: Object -> Lens
const lnsLastLoadedPage =
lensPath([ parent, 'lastLoadedPage' ])

// lnsError :: Object -> Lens
const lnsError =
  lensPath([ parent, 'error' ])

// lnsList :: Object -> Lens
const lnsList =
  lensPath([ parent, 'list' ])

// startLoading :: () -> State AppState ()
export const startLoading = () => 
    modify(set(lnsLoading, constant(true)))

// logError :: a -> State AppState ()
export const logError = (payload) => 
    modify(
        compose(
            set(lnsLoading, false),
            set(lnsError, payload)
        )
    )

// addToList :: [a] -> State AppState ()
export const addToList = ({ data, page }) => 
    modify(
        compose(
            set(lnsLoading, false),
            set(lnsLastLoadedPage, page),
            over(lnsList, concat(data))
        )
    )

    