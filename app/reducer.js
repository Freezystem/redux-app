'use strict';

// Dependencies
import { combineReducers }  from 'redux';

// Reducers
import todos                from './modules/todos/reducers/todos.reducer';
import todoFilter           from './modules/todos/reducers/todoFilter.reducer';

export const initialState = {
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

export const rootReducer = combineReducers({
  todos,
  todoFilter
});
