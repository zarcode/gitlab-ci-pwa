import State from 'crocks/State'

import assoc from 'crocks/helpers/assoc'
import constant from 'crocks/combinators/constant'
import propOr from 'crocks/helpers/propOr'

const { get, modify } = State

// newUser :: Object -> State AppState Object
const newUser = user =>
    modify(assoc('user', user))
    .map(constant(user))

// addUser :: () -> State AppState Object
export const addUser = (user) =>
    get(propOr({}, 'user'))
    .chain(newUser)

    