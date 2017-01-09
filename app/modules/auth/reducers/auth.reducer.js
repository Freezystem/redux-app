'use strict';

// Libs

import Rx from 'rxjs';

const Observable  = Rx.Observable;
const { ajax }    = Observable;

// Constants

/**
 * constant
 * @type {string}
 */
export const LOGIN_REQUEST  = 'LOGIN_REQUEST';

/**
 * constant
 * @type {string}
 */
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS';

/**
 * constant
 * @type {string}
 */
export const LOGIN_FAILURE  = 'LOGIN_FAILURE';

/**
 * constant
 * @type {string}
 */
export const LOGGED_OUT     = 'LOGGED_OUT';

// Actions

/**
 * action to log user in
 * @param {!string} login
 * user login
 * @param {!string} password
 * user password
 * @return {Object}
 * @property {string} type
 * action type
 * @property {string} login
 * user login
 * @property {string} password
 * user password
 */
export const logIn = ( login, password ) => ({ type : LOGIN_REQUEST, login, password });

/**
 * action to notify user log in success
 * @param {!Object} user
 * data to associate to the current user
 * @return {Object}
 * @property {string} type
 * action type
 * @property {string} user
 * user data
 */
export const logInSuccess = user => ({ type : LOGIN_SUCCESS, user });

/**
 * action to notify user log in failure
 * @param {!Object} error
 * error object related to the failure
 * @return {Object}
 * @property {string} type
 * action type
 * @property {string} error
 * error data
 */
export const logInFailure = error => ({ type : LOGIN_FAILURE, error });

/**
 * action to log user out
 * @return {Object}
 * @property {string} type
 * action type
 */
export const logOut = () => ({ type : LOGGED_OUT });

// Epic

/**
 * Epic observer that query auth API when triggered
 * @param {Object} action$
 * action object that trigger the auth API request
 * @param {string} action$.type
 * action type
 * @return {Object}
 */
export const logInEpic = action$ =>
  action$.ofType(LOGIN_REQUEST)
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

// Reducer

/**
 * reducer for auth actions
 * @param {Object} state
 * current state value
 * @param {boolean} state.isFetching
 * whether auth process is pending or not
 * @param {boolean} state.isAuthenticated
 * whether user is authenticated or not
 * @param {Object} state.user
 * user data
 * @param {Object} state.error
 * error data
 * @param {Object} action
 * action to perform on the state
 * @param {string} action.type
 * describe the action type
 * @return {Object}
 * @property {boolean} state.isFetching
 * whether auth process is pending or not
 * @property {boolean} state.isAuthenticated
 * whether user is authenticated or not
 * @property {Object} state.user
 * user data
 * @property {Object} state.error
 * error data
 */
const authReducer = (
  state = {
    isFetching      : false,
    isAuthenticated : false,
    user            : {},
    error           : {}
  },
  action
) => {
  switch ( action.type ) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching      : true,
        isAuthenticated : false,
        user            : {},
        error           : {}
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching      : false,
        isAuthenticated : true,
        user            : action.user,
        error           : {}
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
        error           : {}
      });
    default:
      return state;
  }
};

export default authReducer;