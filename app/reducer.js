'use strict';

// Dependencies
import { combineReducers }  from 'redux';

// Reducers
import {
  routerReducer
}                           from 'react-router-redux';
import todos                from './modules/todos/reducers/todos.reducer';
import todoFilter           from './modules/todos/reducers/todoFilter.reducer';

/**
 * Represent the initial state of the redux application
 * @type {Object}
 * @property {Object} routing
 * @property {Array<Object>} todos
 * @property {string} todoFilter
 */
export const initialState = {
  routing     : { locationBeforeTransitions : null },
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

/**
 * Return the all the reducers combined
 * @type {function}
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
  todoFilter
});