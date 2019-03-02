import { of, from } from 'rxjs';
import {
  filter,
  map,
  concat,
  switchMap,
  catchError,
  // tap,
} from 'rxjs/operators';

import * as api from '../api';
import { saveState } from '../localStorage';

import * as authActions from '../reducers/auth';
import * as userActions from '../reducers/user';
// import { fetchProjects } from '../reducers/projects';

import constant from 'crocks/combinators/constant'
import compose from 'crocks/core/compose'
import either from 'crocks/pointfree/either'

const saveResult = either(
  constant({ type: 'NOT_SAVED' }),
  constant({ type: 'SAVED' })
);

const save = compose(
  saveResult,
  saveState
)

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
            // of(fetchProjects()),
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
      user: {},
    }))
  )
}