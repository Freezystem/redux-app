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

function importTest ( name, ...tests ) {
  const flatten = array => array.reduce((fa, v) => fa.concat(Array.isArray(v) ? flatten(v) : v.toString()), []);
  tests = flatten(tests);

  Array.isArray(tests) && describe(name, () => {
    tests.map(test => {
      if ( typeof test === 'string' ) {
        try {
          require(test);
        }
        catch ( err ) {
          console.error(err);
        }
      }
    });
  });
}