'use strict';

import expect, {
  createSpy
}                     from 'expect';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGGED_OUT,
  logIn,
  logInSuccess,
  logInFailure,
  logOut
}                     from '../../app/modules/auth/reducers/auth.reducer';

/** @test */
describe('actions', () => {

  /** @test {logIn} */
  describe('logIn()', () => {
    it('should create an action to log user in', () => {
      const login           = 'johndoe';
      const password        = 'azerty';
      const expectedAction  = {
        type : LOGIN_REQUEST,
        login,
        password
      };
      const logInSpy        = createSpy().andCall(logIn);

      expect(logInSpy(login, password)).toEqual(expectedAction);
      expect(logInSpy).toHaveBeenCalledWith(login, password);
    });
  });

  /** @test {logInSuccess} */
  describe('logInSuccess()', () => {
    it('should create an action to notify user log in success', () => {
      const user              = {
        token : 'flzudp283HSD9Hdkjdfod29',
        login : 'johndoe'
      };
      const expectedAction    = {
        type : LOGIN_SUCCESS,
        user
      };
      const loginInSuccessSpy = createSpy().andCall(logInSuccess);

      expect(loginInSuccessSpy(user)).toEqual(expectedAction);
      expect(loginInSuccessSpy).toHaveBeenCalledWith(user);
    });
  });

  /** @test {logInFailure} */
  describe('logInFailure()', () => {
    it('should create an action to notify user log in failure', () => {
      const error           = { message: 'wrong credentials' };
      const expectedAction  = {
        type : LOGIN_FAILURE,
        error
      };
      const logInFailureSpy = createSpy().andCall(logInFailure);

      expect(logInFailureSpy(error)).toEqual(expectedAction);
      expect(logInFailureSpy).toHaveBeenCalledWith(error);
    });
  });

  /** @test {logOut} */
  describe('logOut()', () => {
    it('should create an action to log user out', () => {
      const expectedAction  = {
        type : LOGGED_OUT
      };
      const logOutSpy       = createSpy().andCall(logOut);

      expect(logOutSpy()).toEqual(expectedAction);
      expect(logOutSpy).toHaveBeenCalled();
    });
  });
});