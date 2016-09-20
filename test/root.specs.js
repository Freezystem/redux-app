'use strict';

import expect       from 'expect';

import {
  initialState,
  rootReducer
}                   from '../app/modules/root';

/** @test */
describe('App', () => {

  /** @test {rootReducer} */
  describe('rootReducer()', () => {
    it('should return the initial state', () => {
      expect(rootReducer(undefined, {})).toEqual(initialState);
    });
  });

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
  Array.isArray(tests) && describe(name, () => {
    tests.map(test => {
      require(test);
    });
  });
}