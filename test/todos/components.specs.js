'use strict';

import React        from 'react';
import expect       from 'expect';
import { mount }    from 'enzyme';

import {
  Todo,
  TodoList,
  TodoForm,
  FilterLink,
  TodoFilterLinks
}                   from '../../app/modules/todos/TodoApp.component';

import {
  todoFilters
}                   from '../../app/modules/todos/reducers/todoFilter.reducer';

describe('components', () => {
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
      wrapper.setProps({defaultValue : 'write test'})
        .find('.todoForm').simulate('submit');

      expect(attrs.onTodoFormSubmit).toHaveBeenCalledWith('write test');
    });
  });

  describe('<FilterLink />', () => {
    let attrs = {},
    wrapper = null;

    beforeEach(() => {
      attrs = {
        active  : false,
        filter  : todoFilters.SHOW_ALL,
        onClick : expect.createSpy()
      };

      wrapper = mount(<FilterLink {...attrs} />);
    });

    it('should generate a clickable link to filter todos', () => {
      const link  = wrapper.find('.filterList_item').first(),
        linkProps = link.props();

      expect(linkProps.href).toBe(`#${todoFilters.SHOW_ALL}`);
      expect(~linkProps.className.split(' ').indexOf('filterList_item-inactive')).toBeTruthy();
      expect(~linkProps.className.split(' ').indexOf('filterList_item-active')).toBeFalsy();

      link.simulate('click');

      expect(attrs.onClick).toHaveBeenCalledWith(todoFilters.SHOW_ALL);
    });

    it('should not be clickable if filter is already active', () => {
      wrapper.setProps({ active : true });
      const link  = wrapper.find('.filterList_item').first(),
        linkProps = link.props();

      expect(linkProps.href).toBe(`#${todoFilters.SHOW_ALL}`);
      expect(~linkProps.className.split(' ').indexOf('filterList_item-active')).toBeTruthy();
      expect(~linkProps.className.split(' ').indexOf('filterList_item-inactive')).toBeFalsy();

      link.simulate('click');

      expect(attrs.onClick).toNotHaveBeenCalled();
    });

    it('should display the filter name properly', () => {
      const link = wrapper.find('.filterList_item').first();

      expect(link.text()).toBe('ALL');
    });
  });

  describe('<TodoFilterLinks />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        filterList    : Object.keys(todoFilters),
        currentFilter : todoFilters.SHOW_ALL,
        onLinkClick   : expect.createSpy()
      };

      wrapper = mount(<TodoFilterLinks {...attrs} />);
    });

    it('should render all filter links', () => {
      expect(wrapper.find('.filterList_item').length).toBe(attrs.filterList.length);
    });

    it('should set proper filter as active', () => {
      expect(wrapper.find('.filterList_item-active').length).toBe(1);
      expect(wrapper.find('.filterList_item-inactive').length).toBe(attrs.filterList.length - 1);
      expect(wrapper.find('.filterList_item-active').first().text()).toBe('ALL');
    });

    it('should pass a fonction as onClick property', () => {
      wrapper.find('.filterList_item-inactive').first().simulate('click');

      expect(attrs.onLinkClick).toHaveBeenCalled();
    });
  });
});