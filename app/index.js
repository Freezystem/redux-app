'use strict';

// Libs

import React              from 'react';
import ReactDOM           from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
}                         from 'redux';
import { Provider }       from 'react-redux';
import { browserHistory } from 'react-router';
import {
  syncHistoryWithStore,
  routerActions,
  routerMiddleware
}                         from 'react-router-redux';
import {
  createEpicMiddleware
}                         from 'redux-observable';
import {
  UserAuthWrapper
}                         from 'redux-auth-wrapper';
import throttle           from 'lodash/throttle';
import { saveState }      from './helpers/localStorage';

// Components

import {
  Router,
  Route
}                         from 'react-router';
import TodoApp            from './modules/todos/TodoApp.component';
import UserApp            from './modules/users/UserApp.component';
import AuthApp            from './modules/auth/AuthApp.component';
import MainApp,
{
  HomePage,
  NotFound
}                         from './modules/main/MainApp.component';

// Reducer

import {
  rootReducer,
  initialState,
  rootEpic
}                         from './modules/root';

//Auth wrappers

const isAuthenticated = UserAuthWrapper({
  authSelector        : state => state.auth.user,
  redirectAction      : routerActions.replace,
  predicate           : user => 'token' in user && user.token !== '',
  wrapperDisplayName  : 'isAuthenticated'
});

const unAuthenticated = UserAuthWrapper({
  authSelector        : state => state.auth.user,
  redirectAction      : routerActions.replace,
  predicate           : user => !user.token,
  failureRedirectPath : (state, ownProps) => ownProps.location.query.redirect || '/home',
  allowRedirectBack   : false,
  wrapperDisplayName  : 'unAuthenticated'
});

// Redux App Bootstrapping

const routingMiddleware = routerMiddleware(browserHistory);
const composer          = process.env.NODE_ENV !== 'production'
                          && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                          || compose;
const epicMiddleware    = createEpicMiddleware(rootEpic);
const middlewares       = composer(applyMiddleware(routingMiddleware, epicMiddleware));
const store             = createStore(rootReducer, initialState, middlewares);
const history           = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={MainApp}>
        <Route path="/" component={HomePage}/>
        <Route path="todos" component={TodoApp}/>
        <Route path="users" component={isAuthenticated(UserApp)}/>
        <Route path="login" component={unAuthenticated(AuthApp)}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);

// Save todos to localStorage

store.subscribe(throttle(() => {
  saveState({
    todos : store.getState().todos
  });
}, 1000));