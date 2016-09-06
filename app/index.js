'use strict';

// Libs
import React          from 'react';
import ReactDOM       from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
}                     from 'redux';
import {
  Provider
}                     from 'react-redux';
import {
  browserHistory
}                     from 'react-router';

// Components
import {
  Router,
  Route
}                     from 'react-router';
import TodoApp        from './modules/todos/TodoApp.component';
import MainApp,
{
  HomePage,
  NotFound
}                     from './modules/main/MainApp.component';

// Reducer
import {
  rootReducer,
  initialState
}                     from './reducer';

ReactDOM.render(
  <Provider store={createStore(rootReducer, initialState)}>
    <Router history={browserHistory}>
      <Route component={MainApp}>
        <Route path="/" component={HomePage}/>
        <Route path="todo" component={TodoApp}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
