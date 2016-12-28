'use strict';

import expect, {
  createSpy
}                     from 'expect';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError
}                     from '../../app/modules/users/reducers/users.reducer';

/** @test */
describe('actions', function () {

  /** @test {fetchUsers} */
  describe('fetchUsers()', function () {
    it('should create an action to fetch users', function () {
      const since   = 42;
      const perPage = 3;
      const expectedAction = {
        type : FETCH_USERS,
        perPage,
        since
      };
      const fetchUsersSpy = createSpy().andCall(fetchUsers);

      expect(fetchUsersSpy(since, perPage)).toEqual(expectedAction);
      expect(fetchUsersSpy).toHaveBeenCalledWith(42, 3);
    });
  });

  /** @test {fetchUsersSuccess} */
  describe('fetchUsersSuccess()', function () {
    it('should create an action to notify user fetch success', function () {
      const data = [
        {id: 42, login: 'foo'},
        {id: 43, login: 'bar'},
        {id: 44, login: 'baz'}
      ];
      const expectedAction = {
        type : FETCH_USERS_SUCCESS,
        data
      };
      const fetchUsersSuccessSpy = createSpy().andCall(fetchUsersSuccess);

      expect(fetchUsersSuccessSpy(data)).toEqual(expectedAction);
      expect(fetchUsersSuccessSpy).toHaveBeenCalledWith(data);
    });
  });

  /** @test {fetchUsersError} */
  describe('fetchUsersError()', function () {
    it('should create an action to notify user fetch error', function () {
      const error = {message: 'error retrieving users'};
      const expectedAction = {
        type : FETCH_USERS_ERROR,
        error
      };
      const fetchUsersErrorSpy = createSpy().andCall(fetchUsersError);

      expect(fetchUsersErrorSpy(error)).toEqual(expectedAction);
      expect(fetchUsersErrorSpy).toHaveBeenCalledWith(error);
    });
  });
});