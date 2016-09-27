'use strict';

import expect               from 'expect';
import deepFreeze           from 'deep-freeze';

import todosReducer,
{
  addTodo,
  removeTodo,
  toggleTodo,
  clearTodo
}                           from '../../app/modules/todos/reducers/todos.reducer';

import todoFiltersReducer,
{
  setTodoFilter,
  todoFilters
}                           from '../../app/modules/todos/reducers/todoFilter.reducer';

/** @test */
describe('reducers', () => {

  /** @test {todosReducer} */
  describe('todosReducer()', () => {
    it('should handle unknown or missing actions', () => {
      const stateBefore = deepFreeze([]);

      expect(todosReducer(stateBefore, {})).toEqual(stateBefore);
    });

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

      expect(todosReducer(stateBefore, addTodo(label))).toEqual(stateAfter);
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

      expect(todosReducer(stateBefore, removeTodo(id))).toEqual(stateAfter);
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

      expect(todosReducer(stateBefore, toggleTodo(id))).toEqual(stateAfter);
    });

    it('should handle CLEAR_TODO', () => {
      const stateBefore = deepFreeze([
        {
          id        : 33,
          label     : 'Write Tests',
          completed : true
        },
        {
          id        : 42,
          label     : 'Do Things',
          completed : false
        },
        {
          id        : 53,
          label     : 'Make Stuff',
          completed : true
        },
      ]);
      const stateAfter  = [
        {
          id        : 42,
          label     : 'Do Things',
          completed : false
        }
      ];

      expect(todosReducer(stateBefore, clearTodo())).toEqual(stateAfter);
    });
  });

  /** @test {todoFiltersReducer} */
  describe('todoFiltersReducer()', () => {
    it('should handle unknown or missing actions', () => {
      const stateBefore = deepFreeze(todoFilters.SHOW_ALL);

      expect(todoFiltersReducer(stateBefore, {})).toEqual(stateBefore);
    });

    it('should handle SET_TODO_FILTER', () => {
      const stateBefore = deepFreeze(todoFilters.SHOW_ALL);
      const stateAfter  = todoFilters.SHOW_COMPLETED;

      expect(todoFiltersReducer(stateBefore, setTodoFilter(todoFilters.SHOW_COMPLETED))).toEqual(stateAfter);
    });
  });
});