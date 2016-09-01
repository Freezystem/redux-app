'use strict';

// Constants
export const ADD_TODO     = 'ADD_TODO';
export const REMOVE_TODO  = 'REMOVE_TODO';
export const TOGGLE_TODO  = 'TOGGLE_TODO';

// Actions
export const addTodo = ( label ) => {
  return { type : ADD_TODO, label };
};

export const removeTodo = ( id ) => {
  return { type : REMOVE_TODO, id };
};

export const toggleTodo = ( id ) => {
  return { type : TOGGLE_TODO, id };
};

// Reducer
const todos = ( state = [], action ) => {
  switch ( action.type ) {
    case ADD_TODO:
      return [
        ...state,
        {
          id        : state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          label     : action.label,
          completed : false
        }
      ];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => {
        return action.id === todo.id ? Object.assign({}, todo, { completed : !todo.completed}) : todo;
      });
    default:
      return state;
  }
};

export default todos;