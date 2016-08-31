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
import TodoApp        from './components/todo-app/TodoApp.component';

const initialState = {
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

const rootReducer = combineReducers({
  todos,
  todoFilter
});

class Provider extends React.Component {
  getChildContext () {
    return {
      store : this.props.store
    }
  }

  render () {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store : React.PropTypes.object
};

ReactDOM.render(
  <Provider store={createStore(rootReducer, initialState)}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
