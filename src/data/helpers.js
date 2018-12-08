import First from 'crocks/First'
import State from 'crocks/State'

//ramda imports
import lensPath from 'ramda/src/lensPath'
import lensProp from 'ramda/src/lensProp'
import over from 'ramda/src/over'
import set from 'ramda/src/set'

import applyTo from 'crocks/combinators/applyTo'
import flip from 'crocks/combinators/flip'
import isSameType from 'crocks/predicates/isSameType'
// import merge from 'crocks/pointfree'
import mreduceMap from 'crocks/helpers/mreduceMap'
import prop from 'crocks/Maybe/prop'
import safe from 'crocks/Maybe/safe'

export {
  lensPath, over, set, lensProp
}

// combineReducers :: [ Reducer ] -> Reducer
export const combineReducers = flip(action =>
  mreduceMap(First, applyTo(action))
)

// createAction :: String -> a -> Action a
export const createAction =
  type => payload => ({ type, payload })

// createReducer :: Object -> Reducer
export const createReducer =
  strats => ({ type, payload }) =>
    prop(type, strats)
      .map(applyTo(payload))
      .chain(safe(isSameType(State)))