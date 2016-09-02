'use strict';

import expect               from 'expect';
import deepFreeze           from 'deep-freeze';

import {
  initialState,
  rootReducer
}                           from '../../app/reducer.js';

import todos,
{
  addTodo,
  removeTodo,
  toggleTodo
}                           from '../../app/modules/todos/reducers/todos.reducer';

import todoFilter,
{
  setTodoFilter,
  todoFilters
}                           from '../../app/modules/todos/reducers/todoFilter.reducer';

describe('reducers', () => {
  describe('rootReducer()', () => {
    it('should return the initial state', () => {
      expect(rootReducer(undefined, {})).toEqual(initialState);
    });
  });

  describe('todos()', () => {
    it('should handle ADD_TODO', () => {
      const label       = 'Write Tests';
      const stateBefore = deepFreeze([]);
      const stateAfter  = [
        {
          id        : 0,
          label,
          completed : false
        }
      ];

      expect(todos(stateBefore, addTodo(label))).toEqual(stateAfter);
    });

    it('should handle REMOVE_TODO', () => {
      const id          = 0;
      const stateBefore = deepFreeze([
        {
          id,
          label     : 'Write Tests',
          completed : false
        }
      ]);
      const stateAfter  = [];

      expect(todos(stateBefore, removeTodo(id))).toEqual(stateAfter);
    });

    it('should handle TOGGLE_TODO', () => {
      const id          = 0;
      const stateBefore = deepFreeze([
        {
          id,
          label     : 'Write Tests',
          completed : false
        }
      ]);
      const stateAfter  = [
        {
          id,
          label     : 'Write Tests',
          completed : true
        }
      ];

      expect(todos(stateBefore, toggleTodo(id))).toEqual(stateAfter);
    });
  });

  describe('todoFilter()', () => {
    it('should handle SET_TODO_FILTER', () => {
      const stateBefore = deepFreeze(todoFilters.SHOW_ALL);
      const stateAfter  = todoFilters.SHOW_COMPLETED;

      expect(todoFilter(stateBefore, setTodoFilter(todoFilters.SHOW_COMPLETED))).toEqual(stateAfter);
    });
  });
});