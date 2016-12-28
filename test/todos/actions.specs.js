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
describe('actions', function () {

  /** @test {addTodo} */
  describe('addTodo()', function () {
    it('should create an action to add a todo', function () {
      const label = 'write tests';
      const expectedAction = {
        type : ADD_TODO,
        label
      };
      const addTodoSpy = createSpy().andCall(addTodo);


      expect(addTodoSpy(label)).toEqual(expectedAction);
      expect(addTodoSpy).toHaveBeenCalledWith('write tests');
    });
  });

  /** @test {removeTodo} */
  describe('removeTodo()', function () {
    it('should create an action to remove a todo', function () {
      const id = 42;
      const expectedAction = {
        type : REMOVE_TODO,
        id
      };
      const removeTodoSpy = createSpy().andCall(removeTodo);

      expect(removeTodoSpy(id)).toEqual(expectedAction);
      expect(removeTodoSpy).toHaveBeenCalledWith(42);
    });
  });

  /** @test {toggleTodo} */
  describe('toggleTodo()', function () {
    it('should create an action to toggle a todo', function () {
      const id = 42;
      const expectedAction = {
        type : TOGGLE_TODO,
        id
      };
      const toggleTodoSpy = createSpy().andCall(toggleTodo);

      expect(toggleTodoSpy(id)).toEqual(expectedAction);
      expect(toggleTodoSpy).toHaveBeenCalledWith(42);
    });
  });

  /** @test {clearTodo} */
  describe('clearTodo()', function () {
    it('should create an action to clear completed todo', function () {
      const expectedAction = {
        type : CLEAR_TODO
      };
      const clearTodoSpy = createSpy().andCall(clearTodo);

      expect(clearTodoSpy()).toEqual(expectedAction);
      expect(clearTodoSpy).toHaveBeenCalled();
    });
  });

  /** @test {setTodoFilter} */
  describe('setTodoFilter()', function () {
    it('should create an action to set the todo filter', function () {
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