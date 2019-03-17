import constant from 'crocks/combinators/constant'
import compose from 'crocks/core/compose'
import composeK from 'crocks/helpers/composeK'
import either from 'crocks/pointfree/either'
import bimap from 'crocks/pointfree/bimap'
import merge from 'crocks/pointfree/merge'
import identity from 'crocks/combinators/identity'
import tryCatch from 'crocks/Result/tryCatch'
import unary from 'crocks/helpers/unary'
import Pair from 'crocks/Pair'

export const saveAny = (key, state) => compose(
  tryCatch(merge(localStorage.setItem.bind(localStorage))),
  bimap(identity, JSON.stringify),
)(Pair(key, state));

export const loadAny = 
compose(
  either(constant(undefined), identity),
  composeK(
    tryCatch(unary(JSON.parse)),
    tryCatch(localStorage.getItem.bind(localStorage))
  )
)

export const saveState = (state) => saveAny('state', state);

export const loadState = () => loadAny('state');
