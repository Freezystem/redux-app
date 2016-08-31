'use strict';

// Constants
export const SET_TODO_FILTER = 'SET_TODO_FILTER';
export const todoFilters = {
  SHOW_ALL        : 'SHOW_ALL',
  SHOW_COMPLETED  : 'SHOW_COMPLETED',
  SHOW_PENDING    : 'SHOW_PENDING'
};

// Actions
export const setTodoFilter = ( filter ) => {
  return { type : SET_TODO_FILTER, filter };
};

// Reducer
const todoFilter = ( state = 'SHOW_ALL', action ) => {
  switch ( action.type ) {
    case SET_TODO_FILTER:
      return action.filter in todoFilters ? action.filter : state;
    default:
      return state;
  }
};

export default todoFilter;