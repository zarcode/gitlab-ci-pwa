import { of } from 'rxjs';
import {
  filter,
  map,
} from 'rxjs/operators';
import { saveState } from '../localStorage';

export const saveAuthState = (action$, state) => 
{
  return action$.pipe(
    filter((a: Action) =>
      a.type === 'LOGIN' || a.type === 'LOGOUT'),
    map(a => {
      try {
        saveState({
          auth: state.value.auth,
        });
      } catch {
        return {
          type: 'NOT_SAVED'
        }
      }
      return {
        type: 'SAVED'
      }
    })
  )
}