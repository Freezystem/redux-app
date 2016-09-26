'use strict';

import expect         from 'expect';
import deepFreeze     from 'deep-freeze';

import users,
{
  fetchUsers,
  fetchUsersError,
  fetchUsersSuccess,
  requestState
}                     from '../../app/modules/users/reducers/users.reducer';

/** @test */
describe('reducers', () => {

  /** @test {usersReducer} */
  describe('usersReducer()', () => {
    it('should handle FETCH_USERS', () => {
      const stateBefore = deepFreeze({
        requestState  : requestState.FULFILLED,
        data          : [],
        error         : null
      });
      const stateAfter  = {
        requestState  : requestState.PENDING,
        data          : [],
        error         : null
      };

      expect(users(stateBefore, fetchUsers())).toEqual(stateAfter);
    });

    it('should handle FETCH_USERS_SUCCESS', () => {
      const data        = [
        {id: 42, login: 'foo'},
        {id: 43, login: 'bar'},
        {id: 44, login: 'baz'}
      ];
      const stateBefore = deepFreeze({
        requestState  : requestState.PENDING,
        data          : [],
        error         : null
      });
      const stateAfter  = {
        requestState  : requestState.FULFILLED,
        data,
        error         : null
      };

      expect(users(stateBefore, fetchUsersSuccess(data))).toEqual(stateAfter);
    });

    it('should handle FETCH_USERS_ERROR', () => {
      const error       = {
        message : 'error retrieving users'
      };
      const stateBefore = deepFreeze({
        requestState  : requestState.PENDING,
        data          : [],
        error         : null
      });
      const stateAfter  = {
        requestState  : requestState.REJECTED,
        data          : [],
        error
      };

      expect(users(stateBefore, fetchUsersError(error))).toEqual(stateAfter);
    });
  });
});