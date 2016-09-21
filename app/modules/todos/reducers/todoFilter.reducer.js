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
 * @property {string} SHOW_ALL
 * show all todos
 * @property {string} SHOW_COMPLETED
 * show completed todos
 * @property {string} SHOW_PENDING
 * show pending todos
 */
export const todoFilters = {
  SHOW_ALL        : 'SHOW_ALL',
  SHOW_COMPLETED  : 'SHOW_COMPLETED',
  SHOW_PENDING    : 'SHOW_PENDING'
};

// Actions

/**
 * action to set a filter
 * @param {string} filter
 * label of the filter to set
 * @return {Object}
 * @property {string} type
 * action type
 * @property {string} filter
 * label of the filter to set
 */
export function setTodoFilter ( filter ) {
  return { type : SET_TODO_FILTER, filter };
}

/**
 * filter a list of given todos
 * @param {Array<todoObj>} todos
 * list of todos to filter
 * @param {string} filter
 * filter value
 * @return {Array<todoObj>}
 * a list of filtered todos
 */
export function getFilteredTodos (
  todos = [],
  filter = todoFilters.SHOW_ALL
) {
  switch ( filter ) {
    case todoFilters.SHOW_PENDING:
      return todos.filter(todo => !todo.completed);
    case todoFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

// Reducer

/**
 * reducer for filter actions
 * @param {string} state
 * current state value
 * @param {string} action
 * action to perform on the state
 * @param {string} action.type
 * describe the action type
 * @return {string}
 * new state value after performing the action
 */
export default function todoFilter (
  state = todoFilters.SHOW_ALL,
  action
) {
  switch ( action.type ) {
    case SET_TODO_FILTER:
      return action.filter in todoFilters ? action.filter : state;
    default:
      return state;
  }
}