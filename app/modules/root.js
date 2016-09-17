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
 */
export const initialState = {
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
 * Return the all the reducers combined
 * @type {function}
 * react props object
 * @return {Object}
 * @property {function} routing
 * @property {function} todos
 * see {@link todos}
 * @property {function} todoFilter
 * see {@link todoFilter}
 */
export const rootReducer = combineReducers({
  routing : routerReducer,
  todos,
  todoFilter,
  users
});

export const rootEpic = combineEpics(fetchUsersEpic);