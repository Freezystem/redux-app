'use strict';

// Libs
import React          from 'react';
import ReactDOM       from 'react-dom';
import {
  createStore,
  combineReducers
}                     from 'redux';

// Reducers
import todoFilter     from './reducers/todoFilter.reducer';
import todos          from './reducers/todos.reducer';

// Components
import TodoApp        from './components/TodoApp.component';

const initialState = {
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

const rootReducer = combineReducers({
  todos,
  todoFilter
});

const store = createStore(rootReducer, initialState);

const renderApp = () => {
  console.log('store:',store.getState());

  return ReactDOM.render(
    <TodoApp todos={store.getState().todos} filter={store.getState().todoFilter}/>,
    document.getElementById('app')
  );
};

store.subscribe(renderApp);
renderApp();

export default store;