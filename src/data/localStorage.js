import compose from 'crocks/core/compose'
import bimap from 'crocks/pointfree/bimap'
import identity from 'crocks/combinators/identity'
import tryCatch from 'crocks/Result/tryCatch'
import Pair from 'crocks/Pair'

export const saveAny = (key, state) => compose(
  tryCatch(
    val => localStorage.setItem(...val.toArray())
  ),
  bimap(identity, JSON.stringify),
)(Pair(key, state))

export const loadAny = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => saveAny('state', state);

export const loadState = () => loadAny('state');
