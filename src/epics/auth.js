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
import * as projectsActions from '../actions/projects';
import * as api from '../api';

const save = (state) => {
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
}

export const login = (action$, state) => 
{
  return action$.pipe(
    filter((a: Action) =>
      a.type === 'LOGIN'),
    switchMap(a => {

      // const requestProjectsAction = (user) => from(api.fetchProjects({
      //   token: state.value.auth.token,
      //   userId: user.id,
      // })).pipe(
      //   switchMap(data => { 
      //     return of(userActions.userSuccess(user)).pipe(concat(
      //         of(projectsActions.projectsSuccess(data))
      //       ))
      //   }),
      //   catchError(e => of(projectsActions.projectsFail(e.message)))
      // );
      
      // const requestUserAction = from(api.fetchUser({
      //   token: state.value.auth.token
      // })).pipe(
      //   switchMap(user => {
      //     return requestProjectsAction(user)
      //   }),
      //   catchError(e => of(userActions.userFail(e.message)))
      // );

      const requestUserAction = from(api.fetchUser({
        token: state.value.auth.token
      })).pipe(
        switchMap(data => {
          return of(userActions.userSuccess(data)).pipe(concat(
            of({ type: 'FETCH_PROJECTS' })
          ))
        }),
        catchError(e => of(userActions.userFail(e.message)))
      );

      return requestUserAction
        .pipe(concat(
          save(state),
        ))
    })
  )
}

export const logout = (action$, state) => 
{
  return action$.pipe(
    filter((a: Action) =>
      a.type === 'LOGOUT'),
    map(a => save(state))
  )
}