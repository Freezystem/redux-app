'use strict';

import React      from 'react';
import expect, {
  createSpy
}                 from 'expect';
import {
  mount,
  shallow
}                 from 'enzyme';

import {
  AuthForm,
  AuthApp
}                 from '../../app/modules/auth/AuthApp.component';

/** @test */
describe('components', function () {

  /** @test {AuthForm} */
  describe('<AuthForm />', function () {
    let attrs = {},
      wrapper = null;

    beforeEach(() => {
      attrs = {
        onSubmit : createSpy()
      };

      wrapper = mount(<AuthForm {...attrs} />);
    });

    it('should render login form', function () {
      const form      = wrapper.find('.authForm');
      const login     = form.find('.authForm_login');
      const password  = form.find('.authForm_password');
      const button    = form.find('.authForm_submit');

      expect(form.type()).toBe('form');
      expect(form.props().onSubmit).toBeA('function');

      expect(login.length).toBe(1);
      expect(login.type()).toBe('input');
      expect(login.props().type).toBe('text');

      expect(password.length).toBe(1);
      expect(password.type()).toBe('input');
      expect(password.props().type).toBe('password');

      expect(button.length).toBe(1);
      expect(button.type()).toBe('button');
    });

    it('should not submit form with empty credentials', function () {
      const form      = wrapper.find('.authForm');
      const login     = form.find('.authForm_login').get(0);
      const password  = form.find('.authForm_password').get(0);

      form.simulate('submit');
      expect(attrs.onSubmit).toNotHaveBeenCalled();

      login.value = 'johndoe';
      password.value = '';
      form.simulate('submit');
      expect(attrs.onSubmit).toNotHaveBeenCalled();

      login.value = '';
      password.value = 'azerty';
      form.simulate('submit');
      expect(attrs.onSubmit).toNotHaveBeenCalled();
    });

    it('should call onSubmit() when form is properly submitted', function () {
      wrapper.find('.authForm_login').get(0).value = 'johndoe';
      wrapper.find('.authForm_password').get(0).value = 'azerty';
      wrapper.find('.authForm').simulate('submit');

      expect(attrs.onSubmit).toHaveBeenCalledWith('johndoe', 'azerty');
    });
  });

  /** @test {AuthApp} */
  describe('<AuthApp />', function () {
    let wrapper = null;

    beforeEach(() => {
      wrapper = shallow(<AuthApp />);
    });

    it('should contain <AuthForm /> component', function () {
      expect(wrapper.find(AuthForm).length).toBe(1);
    });
  });
});