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
      const label = 'write tests';
      const expectedAction = {
        type : ADD_TODO,
        label
      };
      const addTodoSpy = expect.createSpy().andCall(addTodo);


      expect(addTodoSpy(label)).toEqual(expectedAction);
      expect(addTodoSpy).toHaveBeenCalledWith('write tests');
    });
  });

  describe('removeTodo()', () => {
    it('should create an action to remove a todo', () => {
      const id = 42;
      const expectedAction = {
        type : REMOVE_TODO,
        id
      };
      const removeTodoSpy = expect.createSpy().andCall(removeTodo);

      expect(removeTodoSpy(id)).toEqual(expectedAction);
      expect(removeTodoSpy).toHaveBeenCalledWith(42);
    });
  });

  describe('toggleTodo()', () => {
    it('should create an action to toggle a todo', () => {
      const id = 42;
      const expectedAction = {
        type : TOGGLE_TODO,
        id
      };
      const toggleTodoSpy = expect.createSpy().andCall(toggleTodo);

      expect(toggleTodoSpy(id)).toEqual(expectedAction);
      expect(toggleTodoSpy).toHaveBeenCalledWith(42);
    });
  });

  describe('setTodoFilter()', () => {
    it('should create an action to set the todo filter', () => {
      const filter = todoFilters.SHOW_ALL;
      const expectedAction = {
        type : SET_TODO_FILTER,
        filter
      };
      const setTodoFilterSpy = expect.createSpy().andCall(setTodoFilter);

      expect(setTodoFilterSpy(filter)).toEqual(expectedAction);
      expect(setTodoFilterSpy).toHaveBeenCalledWith(todoFilters.SHOW_ALL);
    });
  });
});