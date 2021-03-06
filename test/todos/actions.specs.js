'use strict';

import expect, {
  createSpy
}                 from 'expect';
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  CLEAR_TODO,
  addTodo,
  removeTodo,
  toggleTodo,
  clearTodo
}                 from '../../app/modules/todos/reducers/todos.reducer';
import {
  SET_TODO_FILTER,
  setTodoFilter,
  todoFilters
}                 from '../../app/modules/todos/reducers/todoFilter.reducer';

/** @test */
describe('actions', () => {

  /** @test {addTodo} */
  describe('addTodo()', () => {
    it('should create an action to add a todo', () => {
      const label = 'write tests';
      const expectedAction = {
        type : ADD_TODO,
        label
      };
      const addTodoSpy = createSpy().andCall(addTodo);

      expect(addTodoSpy(label)).toEqual(expectedAction);
      expect(addTodoSpy).toHaveBeenCalledWith(label);
    });
  });

  /** @test {removeTodo} */
  describe('removeTodo()', () => {
    it('should create an action to remove a todo', () => {
      const id = '109156be-c4fb-41ea-b1b4-efe1671c5836';
      const expectedAction = {
        type : REMOVE_TODO,
        id
      };
      const removeTodoSpy = createSpy().andCall(removeTodo);

      expect(removeTodoSpy(id)).toEqual(expectedAction);
      expect(removeTodoSpy).toHaveBeenCalledWith(id);
    });
  });

  /** @test {toggleTodo} */
  describe('toggleTodo()', () => {
    it('should create an action to toggle a todo', () => {
      const id = '109156be-c4fb-41ea-b1b4-efe1671c5836';
      const expectedAction = {
        type : TOGGLE_TODO,
        id
      };
      const toggleTodoSpy = createSpy().andCall(toggleTodo);

      expect(toggleTodoSpy(id)).toEqual(expectedAction);
      expect(toggleTodoSpy).toHaveBeenCalledWith(id);
    });
  });

  /** @test {clearTodo} */
  describe('clearTodo()', () => {
    it('should create an action to clear completed todo', () => {
      const expectedAction = {
        type : CLEAR_TODO
      };
      const clearTodoSpy = createSpy().andCall(clearTodo);

      expect(clearTodoSpy()).toEqual(expectedAction);
      expect(clearTodoSpy).toHaveBeenCalled();
    });
  });

  /** @test {setTodoFilter} */
  describe('setTodoFilter()', () => {
    it('should create an action to set the todo filter', () => {
      const filter = todoFilters.SHOW_ALL;
      const expectedAction = {
        type : SET_TODO_FILTER,
        filter
      };
      const setTodoFilterSpy = createSpy().andCall(setTodoFilter);

      expect(setTodoFilterSpy(filter)).toEqual(expectedAction);
      expect(setTodoFilterSpy).toHaveBeenCalledWith(todoFilters.SHOW_ALL);
    });
  });
});