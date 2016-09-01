'use strict';

// Libs
import React          from 'react';
import ReactDOM       from 'react-dom';
import {
  createStore
}                     from 'redux';
import {
  Provider
}                     from 'react-redux';

// Components
import TodoApp        from './modules/todos/TodoApp.component';

// Reducer
import {
  rootReducer,
  initialState
}                     from './reducer';

ReactDOM.render(
  <Provider store={createStore(rootReducer, initialState)}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
