'use strict';

// Constants

/**
 * constant
 * @type {string}
 */
export const SET_TODO_FILTER = 'SET_TODO_FILTER';

/**
 * list of todo filters
 * @type {Object}
 */
export const todoFilters = {
  SHOW_ALL        : 'SHOW_ALL',
  SHOW_COMPLETED  : 'SHOW_COMPLETED',
  SHOW_PENDING    : 'SHOW_PENDING'
};

// Actions

/**
 * action to set a filter
 * @type {function}
 * @param {string} filter
 * label of the filter to set
 * @return {Object}
 * @property {string} type
 * action type
 * @property {string} filter
 * label of the filter to set
 */
export const setTodoFilter = ( filter ) => {
  return { type : SET_TODO_FILTER, filter };
};

/**
 * filter a list of given todos
 * @type {function}
 * @param {Array<todoObj>} todos
 * list of todos to filter
 * @param {string} filter
 * filter value
 * @returns {Array<todoObj>}
 * a list of filtered todos
 */
export const getFilteredTodos = ( todos = [], filter = todoFilters.SHOW_ALL ) => {
  switch ( filter ) {
    case todoFilters.SHOW_PENDING:
      return todos.filter(todo => !todo.completed);
    case todoFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

// Reducer

/**
 * reducer for filter actions
 * @type {function}
 * @param {string} state
 * current state value
 * @param {string} action
 * action to perform on the state
 * @return {string}
 * new state value after performing the action
 */
const todoFilter = ( state = todoFilters.SHOW_ALL, action ) => {
  switch ( action.type ) {
    case SET_TODO_FILTER:
      return action.filter in todoFilters ? action.filter : state;
    default:
      return state;
  }
};

export default todoFilter;