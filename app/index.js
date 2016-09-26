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
}                     from 'react-router-redux';
import {
  createEpicMiddleware
}                     from 'redux-observable';

// Components
import {
  Router,
  Route
}                     from 'react-router';
import TodoApp        from './modules/todos/TodoApp.component';
import UserApp        from './modules/users/UserApp.component';
import MainApp,
{
  HomePage,
  NotFound
}                     from './modules/main/MainApp.component';

// Reducer
import {
  rootReducer,
  initialState,
  rootEpic
}                     from './modules/root';


const devTool         = typeof window.devToolsExtension === 'function' ? window.devToolsExtension() : f => f;
const epicMiddleware  = createEpicMiddleware(rootEpic);
const composed        = compose(
  applyMiddleware(epicMiddleware),
  devTool
);
const store           = createStore(rootReducer, initialState, composed);
const history         = syncHistoryWithStore(browserHistory, store);

window.devToolsExtension && window.devToolsExtension.updateStore(store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={MainApp}>
        <Route path="/" component={HomePage}/>
        <Route path="todos" component={TodoApp}/>
        <Route path="users" component={UserApp}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
