'use strict';

/**
 * @typedef {Object} userObj
 * @property {number} id
 * unique identifier
 * @property {string} login
 * user login
 * @property {string} url
 * user profile URL
 * @property {string} avatar_url
 * user profile picture URL
 */

// Libs

import Rx from 'rxjs';

const Observable  = Rx.Observable;
const { ajax }    = Observable;

// Constants

/**
 * constant
 * @type {string}
 */
export const FETCH_USERS          = 'FETCH_USERS';
/**
 * constant
 * @type {string}
 */
export const FETCH_USERS_SUCCESS  = 'FETCH_USERS_SUCCESS';
/**
 * constant
 * @type {string}
 */
export const FETCH_USERS_ERROR    = 'FETCH_USERS_ERROR';

/**
 * list of request states
 * @type {Object}
 * @property {string} PENDING
 * user query is pending response
 * @property {string} FULFILLED
 * user query is fulfilled
 * @property {string} REJECTED
 * user query is rejected
 */
export const requestState = {
  PENDING     : 'PENDING',
  FULFILLED   : 'FULFILLED',
  REJECTED    : 'REJECTED'
};

// Actions

/**
 * action to fetch user
 * @param {?number} [since=RANDOM]
 * id from where to get users, default is a random number
 * @param {?number} [perPage=10]
 * number of user to get, default is 10
 * @return {Object}
 * @property {string} type
 * action type
 * @property {number} since
 * id from where to get users
 * @property {number} perPage
 * number of user to get
 */
export const fetchUsers = (
  since   = Math.floor(Math.random()*500),
  perPage = 10
) => {
  return { type : FETCH_USERS, since, perPage };
};

/**
 * action to provide users data to the state
 * @param {Array<userObj>} data
 * user list from API
 * @return {Object}
 * @property {type}
 * action type
 * @property {Array<userObj>} data
 * user list from API
 */
export const fetchUsersSuccess = ( data ) => {
  return { type : FETCH_USERS_SUCCESS, data };
};

/**
 * action to provide users error logs to state
 * @param error
 * error from failed API request
 * @return {Object}
 * @property {type}
 * action type
 * @property {Object} error
 * error from failed API request
 */
export const fetchUsersError = ( error ) => {
  return { type : FETCH_USERS_ERROR, error };
};

// Epic

/**
 * Epic observer that query user API
 * @param {Object} action$
 * action object that trigger the user API request
 * @param {string} action$.type
 * action type
 * @return {(Array<userObj>|Object)}
 */
export const fetchUsersEpic = ( action$ ) => {
  return action$.ofType(FETCH_USERS)
    .mergeMap(action =>
      ajax(`https://api.github.com/users?per_page=${action.perPage}&since=${action.since}`)
        .map(xhr => fetchUsersSuccess(xhr.response))
        .catch(error => Observable.of(fetchUsersError(error)))
    );
};

// Reducer

/**
 * reducer for users actions
 * @param {Object} state
 * current state value
 * @param {string} state.requestState
 * user request state
 * @param {Array<userObj>} state.data
 * data gotten from user request
 * @param {?Object} state.error
 * error object from failed user request
 * @param {string} state.error.message
 * error object if an error occurred
 * @param {Object} action
 * action to perform on the state
 * @param {string} action.type
 * describe the action type
 * @return {Object}
 * @property {string} state.requestState
 * user request state
 * @property {Array<userObj>} state.data
 * data gotten from user request
 * @property {?Object} state.error
 * error object from failed user request
 */
const usersReducer = (
  state = {
    requestState : requestState.FULFILLED,
    data         : [],
    error        : null
  },
  action
) => {
  switch ( action.type ) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        requestState : requestState.PENDING,
        data         : [],
        error        : null
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        requestState : requestState.FULFILLED,
        data         : action.data,
        error        : null
      });
    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        requestState : requestState.REJECTED,
        data         : [],
        error        : action.error
      });
    default:
      return state;
  }
};

export default usersReducer;