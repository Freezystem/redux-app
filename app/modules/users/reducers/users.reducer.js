'use strict';

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
 */
export const requestState = {
  PENDING     : 'PENDING',
  FULFILLED   : 'FULFILLED',
  REJECTED    : 'REJECTED'
};

// Actions

/**
 * action to fetch user
 * @type {function}
 * @param since
 * id from where to get users
 * @param perPage
 * number of user to get
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

export const fetchUsersSuccess = ( data ) => {
  return { type : FETCH_USERS_SUCCESS, data };
};

export const fetchUsersError = ( error ) => {
  return { type : FETCH_USERS_ERROR, error };
};

const users = (
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

export default users;