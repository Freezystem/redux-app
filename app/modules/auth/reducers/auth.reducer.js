'use strict';

// Libs

import Rx from 'rxjs';

const Observable  = Rx.Observable;
const { ajax }    = Observable;

// Constants

export const LOGIN_REQUEST  = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE  = 'LOGIN_FAILURE';
export const LOGGED_OUT     = 'LOGGED_OUT';

// Actions

export const logIn = ( login, password ) => {
  return { type : LOGIN_REQUEST, login, password };
};

export const logInSuccess = ( user ) => {
  return { type : LOGIN_SUCCESS, user };
};

export const logInFailure = ( error ) => {
  return { type : LOGIN_FAILURE, error };
};

export const logOut = () => {
  return { type : LOGGED_OUT };
};

// Epic

export const logInEpic = ( action$ ) => {
  return action$.ofType(LOGIN_REQUEST)
    .mergeMap(action =>
      ajax({
        method      : 'POST',
        url         : 'https://reqres.in/api/login',
        body        : { email : action.login, password : action.password },
        crossDomain : true
      })
        .map(xhr => logInSuccess(xhr.response))
        .catch(error => Observable.of(logInFailure(error)))
    );
};

// Reducer

const authReducer = (
  state = {
    isFetching      : false,
    isAuthenticated : false,
    user            : {},
    error           : null
  },
  action
) => {
  switch ( action.type ) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching      : true,
        isAuthenticated : false,
        user            : {},
        error           : null
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching      : false,
        isAuthenticated : true,
        user            : action.user,
        error           : null
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching      : false,
        isAuthenticated : false,
        user            : {},
        error           : action.error
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        isFetching      : false,
        isAuthenticated : false,
        user            : {},
        error           : null
      });
    default:
      return state;
  }
};

export default authReducer;