'use strict';

import React        from 'react';
import expect       from 'expect';
import jsDOM        from 'jsdom';
import { mount }    from 'enzyme';

import {
  TodoForm,
  TodoList,
  Todo
}                   from '../../app/modules/todos/TodoApp.component';

global.document   = jsDOM.jsdom('<!doctype html><html><body></body></html>');
global.window     = document.defaultView;
global.navigator  = window.navigator;

describe('components', () => {
  describe('<TodoForm />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        onTodoFormSubmit : expect.createSpy()
      };

      wrapper = mount(<TodoForm {...attrs} />);
    });

    it('should render a form to add a todo', () => {
      const form    = wrapper.find('.todoForm');
      const input   = form.find('.todoForm_label');
      const button  = form.find('.todoForm_submit');

      expect(form.type()).toBe('form');
      expect(form.props().onSubmit).toBeA('function');

      expect(input.length).toBe(1);
      expect(input.type()).toBe('input');
      expect(input.props().type).toBe('text');

      expect(button.length).toBe(1);
      expect(button.type()).toBe('button');
    });

    it('should not submit form with an empty label', () => {
      const form    = wrapper.find('.todoForm');

      form.simulate('submit');

      expect(attrs.onTodoFormSubmit).toNotHaveBeenCalled();
    });

    it('should submit form when a label is given', () => {
      attrs.defaultValue = 'write test';
      wrapper = mount(<TodoForm {...attrs} />);

      const form = wrapper.find('.todoForm');

      form.simulate('submit');

      expect(attrs.onTodoFormSubmit).toHaveBeenCalledWith('write test');
    });
  });

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

    it('should render filtered todos', () => {
      const firstTodo = wrapper.find(Todo).at(0);
      const secondTodo = wrapper.find(Todo).at(1);
      const thirdTodo = wrapper.find(Todo).at(2);

      expect(wrapper.find('.todoList').children().length).toBe(3);

      expect(firstTodo.key()).toBe('111');
      expect(secondTodo.key()).toBe('222');
      expect(thirdTodo.key()).toBe('333');

      expect(firstTodo.find('.todoList_itemLabel').text()).toBe('todo1');
      expect(secondTodo.find('.todoList_itemLabel').text()).toBe('todo2');
      expect(thirdTodo.find('.todoList_itemLabel').text()).toBe('todo3');
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

    it('should render a todo', () => {
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