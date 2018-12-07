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
import * as authActions from '../reducers/auth';
import * as userActions from '../reducers/user';
import { fetchProjects } from '../reducers/projects';
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
      a.type === 'LOGIN_REQUESTED'),
    switchMap(a => {
      return from(api.fetchUser({
        token: a.payload
      })).pipe(
        switchMap(user => {
          return of(userActions.userSuccess(user)).pipe(concat(
            of(save({
                auth: {
                  isAuthenticated: true,
                  token: a.payload,
                },
                user,
            })),
            of(authActions.loginSuccess(a.payload)),
            of(fetchProjects()),
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