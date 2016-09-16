'use strict';

/**
 * @typedef {Object} todoObj
 * @property {number} id
 * unique identifier
 * @property {string} label
 * short sentence describing the task to perform
 * @property {boolean} completed
 * wheter the todo is completed or not
 */

// Constants

/**
 * constant
 * @type {string}
 */
export const ADD_TODO     = 'ADD_TODO';
/**
 * constant
 * @type {string}
 */
export const REMOVE_TODO  = 'REMOVE_TODO';
/**
 * constant
 * @type {string}
 */
export const TOGGLE_TODO  = 'TOGGLE_TODO';
/**
 * constant
 * @type {string}
 */
export const CLEAR_TODO   = 'CLEAR_TODO';

// Actions

/**
 * action to add a todo
 * @type {function}
 * @param label
 * @return {Object}
 * @property {string} type
 * action type
 * @property {string} label
 * label of the todo to create
 */
export const addTodo = ( label ) => {
  return { type : ADD_TODO, label };
};

/**
 * action to remove a todo
 * @type {function}
 * @param id
 * @return {Object}
 * @property {string} type
 * action type
 * @property {number} id
 * id of the todo to remove
 */
export const removeTodo = ( id ) => {
  return { type : REMOVE_TODO, id };
};

/**
 * action to toggle a todo
 * @type {function}
 * @param id
 * @return {Object}
 * @property {string} type
 * action type
 * @property {number} id
 * id of the todo to toggle
 */
export const toggleTodo = ( id ) => {
  return { type : TOGGLE_TODO, id };
};

/**
 * action to clear completed todos
 * @type {function}
 * @return {Object}
 * @property {string} type
 * action type
 */
export const clearTodo = () => {
  return { type : CLEAR_TODO };
};

// Reducer

/**
 * reducer for todo actions
 * @type {function}
 * @param {Array<todoObj>} state
 * current state value
 * @param {Object} action
 * action to perform on the state
 * @param {string} action.type
 * action type constant
 * @param {string} action.label
 * todo label
 * @param {number} action.id
 * todo id
 * @return {Array<todoObj>}
 * new state value after performing action
 */
const todos = ( state = [], action ) => {
  switch ( action.type ) {
    case ADD_TODO:
      return state.concat(
        {
          id        : state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          label     : action.label,
          completed : false
        }
      );
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => {
        return action.id === todo.id ? Object.assign({}, todo, { completed : !todo.completed}) : todo;
      });
    case CLEAR_TODO:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

export default todos;