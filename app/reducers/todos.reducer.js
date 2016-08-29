"use strict";

// Actions
export const ADD_TODO     = 'ADD_TODO';
export const REMOVE_TODO  = 'REMOVE_TODO';
export const TOGGLE_TODO  = 'TOGGLE_TODO';

// Reducer
let nextTodoId = -1;

const todos = ( state = [], action ) => {
  switch ( action.type ) {
    case ADD_TODO:
      return [
        ...state,
        {
          id        : nextTodoId++,
          label     : action.label,
          completed : false
        }
      ];
    case REMOVE_TODO:
      return [
        ...state.slice(action.id, 1),
        ...state.slice(action.id + 1)
      ];
    case TOGGLE_TODO:
      return state.map(todo => {
        return action.id === todo.id ? Object.assign({}, todo, { completed : !todo.completed}) : todo;
      });
    default:
      return state;
  }
};

export default todos;