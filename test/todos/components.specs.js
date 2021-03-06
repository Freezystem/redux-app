'use strict';

import React        from 'react';
import expect, {
  createSpy
}                   from 'expect';
import {
  mount,
  shallow
}                   from 'enzyme';

import {
  Todo,
  TodoList,
  TodoForm,
  TodoFooter,
  FilterLink,
  TodoFilterLinks,
  TodoApp
}                   from '../../app/modules/todos/TodoApp.component';

import {
  todoFilters
}                   from '../../app/modules/todos/reducers/todoFilter.reducer';

/** @test */
describe('components', () => {

  /** @test {Todo} */
  describe('<Todo />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        completed      : true,
        label          : 'todo',
        id             : '109156be-c4fb-41ea-b1b4-efe1671c5836',
        onClick        : createSpy(),
        onButtonClick  : createSpy()
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

  /** @test {TodoList} */
  describe('<TodoList />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        filteredTodos       : [
          {label: 'todo1', id: '109156be-c4fb-41ea-b1b4-efe1671c5836', completed: false},
          {label: 'todo2', id: '6790ac7c-24ac-4f98-8464-42f6d98a53ae', completed: false},
          {label: 'todo3', id: '3a91f950-dec8-4688-ba14-5b7b5ec7a563', completed: true}
        ],
        onTodoClick         : createSpy(),
        onTodoButtonClick   : createSpy()
      };

      wrapper = mount(<TodoList {...attrs} />);
    });

    it('should render filtered todos', () => {
      const firstTodo = wrapper.find(Todo).at(0);
      const secondTodo = wrapper.find(Todo).at(1);
      const thirdTodo = wrapper.find(Todo).at(2);

      expect(wrapper.find('.todoList').children().length).toBe(3);

      expect(firstTodo.key()).toBe('109156be-c4fb-41ea-b1b4-efe1671c5836');
      expect(secondTodo.key()).toBe('6790ac7c-24ac-4f98-8464-42f6d98a53ae');
      expect(thirdTodo.key()).toBe('3a91f950-dec8-4688-ba14-5b7b5ec7a563');
    });
  });

  /** @test {TodoForm} */
  describe('<TodoForm />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        onSubmit : createSpy()
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
      wrapper.find('.todoForm').simulate('submit');

      expect(attrs.onSubmit).toNotHaveBeenCalled();
    });

    it('should submit form when a label is given', () => {
      wrapper.find('.todoForm_label').get(0).value = 'write test';
      wrapper.find('.todoForm').simulate('submit');

      expect(attrs.onSubmit).toHaveBeenCalledWith('write test');
    });
  });

  /** @test {FilterLink} */
  describe('<FilterLink />', () => {
    let attrs = {},
    wrapper = null;

    beforeEach(() => {
      attrs = {
        active  : false,
        filter  : todoFilters.SHOW_ALL,
        onClick : createSpy()
      };

      wrapper = mount(<FilterLink {...attrs} />);
    });

    it('should generate a clickable link to filter todos', () => {
      const link  = wrapper.find('.filterList_item').first();

      expect(link.props().href).toBe(`#${todoFilters.SHOW_ALL}`);
      expect(link.hasClass('filterList_item-active')).toBeFalsy();

      link.simulate('click');

      expect(attrs.onClick).toHaveBeenCalledWith(todoFilters.SHOW_ALL);
    });

    it('should not be clickable if filter is already active', () => {
      wrapper.setProps({ active : true });
      const link  = wrapper.find('.filterList_item').first();

      expect(link.props().href).toBe(`#${todoFilters.SHOW_ALL}`);
      expect(link.hasClass('filterList_item-active')).toBeTruthy();

      link.simulate('click');

      expect(attrs.onClick).toNotHaveBeenCalled();
    });

    it('should display the filter name properly', () => {
      const link = wrapper.find('.filterList_item').first();

      expect(link.text()).toBe('ALL');
    });
  });

  /** @test {TodoFilterLinks} */
  describe('<TodoFilterLinks />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        filterList    : Object.keys(todoFilters),
        currentFilter : todoFilters.SHOW_ALL,
        onLinkClick   : createSpy()
      };

      wrapper = mount(<TodoFilterLinks {...attrs} />);
    });

    it('should render all filter links', () => {
      expect(wrapper.find('.filterList_item').length).toBe(attrs.filterList.length);
    });

    it('should set proper filter as active', () => {
      expect(wrapper.find('.filterList_item-active').length).toBe(1);
      expect(wrapper.find('.filterList_item').not('.filterList_item-active').length).toBe(attrs.filterList.length - 1);
      expect(wrapper.find('.filterList_item-active').text()).toBe('ALL');
    });

    it('should pass a fonction as onClick property', () => {
      wrapper.find('.filterList_item').not('.filterList_item-active').first().simulate('click');

      expect(attrs.onLinkClick).toHaveBeenCalled();
    });
  });

  /** @test {TodoFooter} */
  describe('<TodoFooter />', () => {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        todos : [
          {label: 'todo1', id: '109156be-c4fb-41ea-b1b4-efe1671c5836', completed: false},
          {label: 'todo2', id: '6790ac7c-24ac-4f98-8464-42f6d98a53ae', completed: true},
          {label: 'todo3', id: '3a91f950-dec8-4688-ba14-5b7b5ec7a563', completed: false}
        ],
        onTodoClearClick : createSpy()
      };

      wrapper = mount(<TodoFooter {...attrs} />);
    });

    it('should not display clear link if there isn\'t completed todo', () => {
      wrapper.setProps({
        todos : [
          {label: 'todo1', id: '109156be-c4fb-41ea-b1b4-efe1671c5836', completed: false},
          {label: 'todo2', id: '6790ac7c-24ac-4f98-8464-42f6d98a53ae', completed: false},
          {label: 'todo3', id: '3a91f950-dec8-4688-ba14-5b7b5ec7a563', completed: false}
        ]
      });

      expect(wrapper.find('.todoFooter_clear').hasClass('todoFooter_clear-hide')).toBeTruthy();
    });

    it('should display clear link if there is completed todo', () => {
      expect(wrapper.find('.todoFooter_clear').hasClass('todoFooter_clear-hide')).toBeFalsy();
    });

    it('should call onTodoClearClick on clear link click', () => {
      wrapper.find('.todoFooter_clear').first().simulate('click');

      expect(attrs.onTodoClearClick).toHaveBeenCalled();
    });
  });

  /** @test {TodoApp} */
  describe('<TodoApp />', () => {
    let wrapper = null;

    beforeEach(() => {
      wrapper = shallow(<TodoApp />);
    });

    it('should contain <TodoForm /> component', () => {
      expect(wrapper.find(TodoForm).length).toBe(1);
    });

    it('should contain <TodoFilterLinks /> component', () => {
      expect(wrapper.find(TodoFilterLinks).length).toBe(1);
    });

    it('should contain <TodoList /> component', () => {
      expect(wrapper.find(TodoList).length).toBe(1);
    });

    it('should contain <TodoFooter /> component', () => {
      expect(wrapper.find(TodoFooter).length).toBe(1);
    });
  });
});