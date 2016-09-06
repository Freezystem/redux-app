'use strict';

// Dependencies
import { combineReducers }  from 'redux';

// Reducers
import {
  routerStateReducer
}                           from 'redux-router';
import todos                from './modules/todos/reducers/todos.reducer';
import todoFilter           from './modules/todos/reducers/todoFilter.reducer';

export const initialState = {
  router      : null,
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

export const rootReducer = combineReducers({
  router: routerStateReducer,
  todos,
  todoFilter
});
