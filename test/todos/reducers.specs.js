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
      const stateAfter  = todosReducer(stateBefore, addTodo(label));

      expect(stateAfter[0]).toMatch({
        id        : /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        completed : false,
        label
      });
    });

    it('should handle REMOVE_TODO', () => {
      const id          = '109156be-c4fb-41ea-b1b4-efe1671c5836';
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
      const id          = '109156be-c4fb-41ea-b1b4-efe1671c5836';
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
          id        : '109156be-c4fb-41ea-b1b4-efe1671c5836',
          label     : 'Write Tests',
          completed : true
        },
        {
          id        : '6790ac7c-24ac-4f98-8464-42f6d98a53ae',
          label     : 'Do Things',
          completed : false
        },
        {
          id        : '3a91f950-dec8-4688-ba14-5b7b5ec7a563',
          label     : 'Make Stuff',
          completed : true
        },
      ]);
      const stateAfter  = [
        {
          id        : '6790ac7c-24ac-4f98-8464-42f6d98a53ae',
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