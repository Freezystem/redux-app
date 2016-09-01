'use strict';

import expect     from 'expect';
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  addTodo,
  removeTodo,
  toggleTodo
}                 from '../../app/modules/todos/reducers/todos.reducer';
import {
  SET_TODO_FILTER,
  setTodoFilter,
  todoFilters
}                 from '../../app/modules/todos/reducers/todoFilter.reducer';

describe('actions', () => {
  describe('addTodo()', () => {
    it('should create an action to add a todo', () => {
      const label = 'Write Tests';
      const expectedAction = {
        type : ADD_TODO,
        label
      };

      expect(addTodo(label)).toEqual(expectedAction);
    });
  });

  describe('removeTodo()', () => {
    it('should create an action to remove a todo', () => {
      const id = 42;
      const expectedAction = {
        type : REMOVE_TODO,
        id
      };

      expect(removeTodo(id)).toEqual(expectedAction);
    });
  });

  describe('toggleTodo()', () => {
    it('should create an action to toggle a todo', () => {
      const id = 42;
      const expectedAction = {
        type : TOGGLE_TODO,
        id
      };

      expect(toggleTodo(id)).toEqual(expectedAction);
    });
  });

  describe('setTodoFilter()', () => {
    it('should create an action to set the todo filter', () => {
      const filter = todoFilters.SHOW_ALL;
      const expectedAction = {
        type : SET_TODO_FILTER,
        filter
      };

      expect(setTodoFilter(filter)).toEqual(expectedAction);
    });
  });
});