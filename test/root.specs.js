'use strict';

import expect       from 'expect';

import {
  initialState,
  rootReducer
}                   from '../app/modules/root';

/** @test */
describe('App', function () {

  /** @test {rootReducer} */
  describe('rootReducer()', function () {
    it('should return the initial state', function () {
      expect(rootReducer(undefined, {})).toEqual(initialState);
    });
  });

  importTest('Auth Module', [
    './auth/actions.specs',
    './auth/components.specs',
    './auth/reducers.specs'
  ]);

  importTest('Todos Module', [
    './todos/actions.specs',
    './todos/components.specs',
    './todos/reducers.specs'
  ]);

  importTest('Users Module', [
    './users/actions.specs',
    './users/components.specs',
    './users/reducers.specs'
  ]);
});

function importTest ( name, tests ) {
  Array.isArray(tests) && describe(name, function () {
    tests.map(test => {
      require(test);
    });
  });
}