'use strict';

import expect         from 'expect';
import deepFreeze     from 'deep-freeze';

import authReducer,
{
  logIn,
  logInSuccess,
  logInFailure,
  logOut,
  authState
}                     from '../../app/modules/auth/reducers/auth.reducer';

/** @test */
describe('reducers', function () {

  /** @test {authReducer} */
  describe('authReducer()', function () {
    it('should handle unknown or missing actions', function () {
      const stateBefore = deepFreeze({
        isFetching      : false,
        isAuthenticated : false,
        user            : {},
        error           : {}
      });

      expect(authReducer(stateBefore, {})).toEqual(stateBefore);
    });

    it('should handle LOGIN_REQUEST', function () {
      const login       = 'johndoe';
      const password    = 'azerty';
      const stateBefore = deepFreeze({
        authState : authState.UNAUTHENTICATED,
        user      : {},
        error     : {}
      });
      const stateAfter  = {
        authState : authState.AUTHENTICATING,
        user      : {},
        error     : {}
      };

      expect(authReducer(stateBefore, logIn(login, password))).toEqual(stateAfter);
    });

    it('should handle LOGIN_SUCCESS', function () {
      const user        = {
        token : 'flzudp283HSD9Hdkjdfod29',
        login : 'johndoe'
      };
      const stateBefore = deepFreeze({
        authState : authState.AUTHENTICATING,
        user      : {},
        error     : {}
      });
      const stateAfter  = {
        authState : authState.AUTHENTICATED,
        user,
        error     : {}
      };

      expect(authReducer(stateBefore, logInSuccess(user))).toEqual(stateAfter);
    });

    it('should handle LOGIN_FAILURE', function () {
      const error       = {
        message : 'wrong credentials'
      };
      const stateBefore = deepFreeze({
        authState : authState.AUTHENTICATING,
        user      : {},
        error     : {}
      });
      const stateAfter  = {
        authState : authState.UNAUTHENTICATED,
        user      : {},
        error
      };

      expect(authReducer(stateBefore, logInFailure(error))).toEqual(stateAfter);
    });

    it('should handle LOGOUT', function () {
      const user        = {
        token : 'flzudp283HSD9Hdkjdfod29',
        login : 'johndoe'
      };
      const stateBefore = deepFreeze({
        authState : authState.AUTHENTICATED,
        user,
        error     : {}
      });
      const stateAfter  = {
        authState : authState.UNAUTHENTICATED,
        user      : {},
        error     : {}
      };

      expect(authReducer(stateBefore, logOut())).toEqual(stateAfter);
    });
  });
});