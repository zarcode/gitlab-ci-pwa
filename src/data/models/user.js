import State from 'crocks/State'

import assoc from 'crocks/helpers/assoc'

const { modify } = State

// addUser :: Object -> State AppState Object
export const addUser = (user) => 
    modify(assoc('user', user))

    