'use strict';

// Dependencies

import { combineReducers }  from 'redux';
import { combineEpics }  from 'redux-observable';

// Reducers & Epics

import {
  routerReducer
}                           from 'react-router-redux';
import todos                from './todos/reducers/todos.reducer';
import todoFilter, {
  todoFilters
}                           from './todos/reducers/todoFilter.reducer';
import auth, {
  logInEpic
}                           from './auth/reducers/auth.reducer';
import users, {
  requestState,
  fetchUsersEpic
}                           from './users/reducers/users.reducer';

/**
 * Represent the initial state of the redux application
 * @type {Object}
 * @property {Object} routing
 * @property {Array<todoObj>} todos
 * @property {string} todoFilter
 * @property {Object} users
 */
export const initialState = {
  auth        : {
    isFetching      : false,
    isAuthenticated : false,
    user            : {},
    error           : {}
  },
  routing     : { locationBeforeTransitions : null },
  todos       : [],
  todoFilter  : todoFilters.SHOW_ALL,
  users       : {
    requestState : requestState.FULFILLED,
    data         : [],
    error        : null
  }
};

/**
 * Return all the reducers combined
 * @return {Object}
 * @property {function} routing
 * @property {function} todos
 * see {@link todos}
 * @property {function} todoFilter
 * see {@link todoFilter}
 * @property {function} users
 * see {@link users}
 */
export const rootReducer = combineReducers({
  auth,
  routing : routerReducer,
  todos,
  todoFilter,
  users
});

/**
 * array containing all epics
 * @type {Array}
 */
export const rootEpic = combineEpics(
  fetchUsersEpic,
  logInEpic
);