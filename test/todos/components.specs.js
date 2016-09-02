'use strict';

import React        from 'react';
import expect       from 'expect';
import jsDOM        from 'jsdom';
import { mount }    from 'enzyme';

import {
  TodoList,
  Todo
}                   from '../../app/modules/todos/TodoApp.component';

import {
  todoFilters
}                   from '../../app/modules/todos/reducers/todoFilter.reducer';

global.document = jsDOM.jsdom('<body/>');
global.window   = document.defaultView;
global.navigator= window.navigator;

describe('components', () => {
  describe('<TodoList />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        filteredTodos       : [
          {label: 'todo1', id: 111, complete: false},
          {label: 'todo2', id: 222, complete: false},
          {label: 'todo3', id: 333, complete: false},
        ],
        onTodoClick         : expect.createSpy(),
        onTodoButtonClick   : expect.createSpy()
      };

      wrapper = mount(<TodoList {...attrs} />);
    });

    it('should have rendered filtered todos', () => {
      expect(wrapper.find('.todoList_item').at(0).find('.todoList_itemLabel').text()).toBe('todo1');
      expect(wrapper.find('.todoList_item').at(1).find('.todoList_itemLabel').text()).toBe('todo2');
      expect(wrapper.find('.todoList_item').at(2).find('.todoList_itemLabel').text()).toBe('todo3');
    });
  });

  describe('<Todo />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        completed      : true,
        label          : 'todo',
        onClick        : expect.createSpy(),
        onButtonClick  : expect.createSpy()
      };

      wrapper = mount(<Todo {...attrs} />);
    });

    it('should have rendered a todo', () => {
      expect(wrapper.find('.todoList_itemLabel').text()).toBe('todo');
      expect(wrapper.find('.todoList_itemButton').text()).toExist();
    });

    it('should call onClick() when label is clicked', () => {
      wrapper.find('.todoList_itemLabel').simulate('click');

      expect(attrs.onClick.calls.length).toBe(1);
    });

    it('should call onButtonClick() when button is clicked', () => {
      wrapper.find('.todoList_itemButton').simulate('click');

      expect(attrs.onButtonClick.calls.length).toBe(1);
    });
  });
});