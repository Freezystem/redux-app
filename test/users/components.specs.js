'use strict';

import React      from 'react';
import expect, {
  createSpy
}                 from 'expect';
import { mount }  from 'enzyme';

import {
  User,
  UserList,
  UserError,
  UserHeader,
  UserApp
}                 from '../../app/modules/users/UserApp.component';

import {
  requestState
}                 from '../../app/modules/users/reducers/users.reducer';

/** @test */
describe('components', function () {

  /** @test {User} */
  describe('<User />', function () {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        login       : 'foo',
        url         : '/details/foo',
        avatar_url  : '/img/foo.jpg'
      };

      wrapper = mount(<User {...attrs} />);
    });

    it('should render a user', function () {
      expect(wrapper.find('.userList_itemLink').props().href).toBe('/details/foo');
      expect(wrapper.find('.userList_itemLink span').text()).toBe('foo');
      expect(wrapper.find('.userList_itemLink img').props().src).toBe('/img/foo.jpg');
      expect(wrapper.find('.userList_itemLink img').props().alt).toBe(`${attrs.login} avatar`);
    });
  });

  /** @test {UserList} */
  describe('<UserList />', function () {
    let users = [
        {id: 111, login: 'foo', url: '/details/foo', avatar_url: '/img/foo.jpg'},
        {id: 222, login: 'bar', url: '/details/bar', avatar_url: '/img/bar.jpg'},
        {id: 333, login: 'baz', url: '/details/baz', avatar_url: '/img/baz.jpg'},
      ],
      wrapper = null;

    beforeEach(() => {
      wrapper = mount(<UserList users={users} />);
    });

    it('should render a user list', function () {
      expect(wrapper.find('.userList').children().length).toBe(3);
      expect(wrapper.find(User).at(0).key()).toBe('111');
      expect(wrapper.find(User).at(1).key()).toBe('222');
      expect(wrapper.find(User).at(2).key()).toBe('333');
    });
  });

  /** @test {UserError} */
  describe('<UserError />', function () {
    let error = {message : 'error: enable to retrieve users'},
      wrapper = null;

    beforeEach(() => {
      wrapper = mount(<UserError error={error} />);
    });

    it('should render an error', function () {
      expect(wrapper.find('.userError_message').text()).toBe(error.message);
    });
  });

  /** @test {UserHeader} */
  describe('<UserHeader />', function () {
    let onClick = createSpy(),
      wrapper   = null;

    beforeEach(() => {
      wrapper = mount(<UserHeader onClick={onClick} />);
    });

    it('should call a function on refresh button click', function () {
      wrapper.find('.userHeader_refresh').simulate('click');

      expect(onClick).toHaveBeenCalled();
    });
  });
});