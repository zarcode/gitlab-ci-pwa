import { of, from } from 'rxjs';
import {
  filter,
  map,
  concat,
  switchMap,
  catchError,
  tap,
} from 'rxjs/operators';
import { saveState } from '../localStorage';
import * as userActions from '../actions/auth';
import { fetchProjects } from '../actions/projects';
import * as api from '../api';

const save = (value) => {
  try {
    saveState(value);
  } catch {
    return {
      type: 'NOT_SAVED'
    }
  }
  return {
    type: 'SAVED'
  }
}

export const login = (action$, state) => 
{
  return action$.pipe(
    filter((a: Action) =>
      a.type === 'LOGIN'),
    switchMap(a => {
      return from(api.fetchUser({
        token: state.value.auth.token
      })).pipe(
        switchMap(user => {
          return of(userActions.userSuccess(user)).pipe(concat(
            of(save({
                auth: state.value.auth,
                user,
            })),
            of(fetchProjects),
          ))
        }),
        catchError(e => of(userActions.userFail(e.message)))
      );
    })
  )
}

export const logout = (action$, state) => 
{
  return action$.pipe(
    filter((a: Action) =>
      a.type === 'LOGOUT'),
    map(a => save({
      auth: state.value.auth,
      user: {}
    }))
  )
}