'use strict';

import React        from 'react';
import expect       from 'expect';
import { mount }    from 'enzyme';

import {
  User,
  UserList,
  UserError,
  UserHeader,
  UserApp
}                   from '../../app/modules/users/UserApp.component';

import {
  requestState
}                   from '../../app/modules/users/reducers/users.reducer';

/** @test */
describe('components', () => {

  /** @test {User} */
  describe('<User />', () => {
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

    it('should render a user', () => {
      expect(wrapper.find('.userList_itemLink').props().href).toBe('/details/foo');
      expect(wrapper.find('.userList_itemLink span').text()).toBe('foo');
      expect(wrapper.find('.userList_itemLink img').props().src).toBe('/img/foo.jpg');
      expect(wrapper.find('.userList_itemLink img').props().alt).toBe(`${attrs.login} avatar`);
    });
  });
});