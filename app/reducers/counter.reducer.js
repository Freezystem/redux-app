"use strict";

export const INCREMENT_COUNT  = 'INCREMENT_COUNT';
export const DECREMENT_COUNT  = 'DECREMENT_COUNT';

const counter = ( state = 0, action ) => {
  switch ( action.type ) {
    case INCREMENT_COUNT:
      return parseInt(state, 10) + 1;
    case DECREMENT_COUNT:
      return parseInt(state, 10) - 1;
    default:
      return state;
  }
};

export default counter;