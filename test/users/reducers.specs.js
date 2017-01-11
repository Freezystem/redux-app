'use strict';

import expect         from 'expect';
import deepFreeze     from 'deep-freeze';

import usersReducer,
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
    it('should handle unknown or missing actions', () => {
      const stateBefore = deepFreeze({
        requestState  : requestState.FULFILLED,
        data          : [],
        error         : null
      });

      expect(usersReducer(stateBefore, {})).toEqual(stateBefore);
    });

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

      expect(usersReducer(stateBefore, fetchUsers())).toEqual(stateAfter);
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

      expect(usersReducer(stateBefore, fetchUsersSuccess(data))).toEqual(stateAfter);
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

      expect(usersReducer(stateBefore, fetchUsersError(error))).toEqual(stateAfter);
    });
  });
});