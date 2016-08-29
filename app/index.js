"use strict";

import React          from 'react';
import ReactDOM       from 'react-dom';
import {
  createStore,
  combineReducers
}                     from 'redux';
import {
  counter,
  INCREMENT_COUNT,
  DECREMENT_COUNT
}                     from './reducers/counter.reducer';
import {
  todoFilter
}                     from './reducers/todoFilter.reducer';
import {
  todos,
  ADD_TODO,
  TOGGLE_TODO
}                     from './reducers/todos.reducer';

const initialState = {
  counter     : 0,
  todos       : [],
  todoFilter  : 'SHOW_ALL'
};

const mainReducer = combineReducers({
  counter,
  todos,
  todoFilter
});

const store = createStore(mainReducer, initialState);

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input ref={input => this._label = input}/>
        <button onClick={() => {
          store.dispatch({
            type  : ADD_TODO,
            label : this._label.value
          });
          this._label.value = '';
        }}>Add Todo</button>
        <ul>
          {
            this.props.todos.map(todo =>
                <li key={todo.id}
                    onClick={() => {
                      store.dispatch({
                        type  : TOGGLE_TODO,
                        id    : todo.id
                      });
                    }}
                    style={{
                      textDecoration : todo.completed ? 'line-through' : 'none'
                    }}
                >{todo.label}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

const renderApp = () => {
  console.log('store:',store.getState());

  return ReactDOM.render(
    <TodoApp todos={store.getState().todos}/>,
    document.getElementById('app')
  );
};

store.subscribe(renderApp);
renderApp();