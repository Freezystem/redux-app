import React      from 'react';
import store      from '../app';
import {
  ADD_TODO,
  TOGGLE_TODO
}                 from '../reducers/todos.reducer';

export default class TodoApp extends React.Component {
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