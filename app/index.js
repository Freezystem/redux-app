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
import {
  syncHistoryWithStore
}                     from 'react-router-redux'

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

const devTool  = window.devToolsExtension && window.devToolsExtension();
const store    = createStore(rootReducer, initialState, devTool);
const history  = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={MainApp}>
        <Route path="/" component={HomePage}/>
        <Route path="todo" component={TodoApp}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
