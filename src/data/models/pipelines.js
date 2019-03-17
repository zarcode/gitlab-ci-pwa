import State from 'crocks/State'

import assign from 'crocks/helpers/assign'
import compose from 'crocks/helpers/compose'
import concat from 'crocks/pointfree/concat'

import { lensPath, over, set } from '../helpers'

const { modify } = State
const parent = 'pipelines'

// lnsLoading :: Object -> Lens
const lnsLoading =
  lensPath([ parent, 'loading' ])

// lnsError :: Object -> Lens
const lnsError =
  lensPath([ parent, 'error' ])

// lnsLastLoadedPage :: Object -> Lens
const lnsLastLoadedPage =
  lensPath([ parent, 'lastLoadedPage' ])

// lnsIds :: Object -> Lens
const lnsIds =
  lensPath([ parent, 'ids' ])

// lnsById :: Object -> Lens
const lnsById =
  lensPath([ parent, 'byId' ])

// lnsById :: Object -> Lens
const lnsPipelineById = id =>
  lensPath([ parent, 'byId', id ])

// startLoading :: () -> State AppState ()
export const startLoading = () => 
    modify(set(lnsLoading, true))

// saveResults :: Object -> State AppState ()
export const saveResults = ({ data, page }) => 
    modify(
        compose(
            // todo: use set instead over
            set(lnsLoading, false),
            set(lnsLastLoadedPage, page),
            over(lnsById, assign(data.entities.pipeline)),
            over(lnsIds, concat(data.result))
        )
    )

// logError :: a -> State AppState ()
export const logError = (payload) => 
    modify(
        compose(
            set(lnsLoading, false),
            set(lnsError, payload)
        )
    )

// updatePipeline :: Object -> State AppState ()
export const updatePipeline = (payload) =>
    modify(
        set(
            lnsPipelineById(payload.id),
            payload
        )
    )

// export const updatePipeline = (payload) =>
//     modify(
//         assocPath([ parent, 'byId', payload.id ], payload)
//     )

