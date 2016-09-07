'use strict';

// Dependencies
import { combineReducers }  from 'redux';

// Reducers
import {
  routerReducer
}                           from 'react-router-redux';
import todos                from './modules/todos/reducers/todos.reducer';
import todoFilter           from './modules/todos/reducers/todoFilter.reducer';

export const initialState = {
  routing     : { locationBeforeTransitions : null },
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

export const rootReducer = combineReducers({
  routing : routerReducer,
  todos,
  todoFilter
});