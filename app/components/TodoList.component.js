import React          from 'react';
import store          from '../app';

import {
  ADD_TODO,
  TOGGLE_TODO
}                     from '../reducers/todos.reducer';
import {
  todoFilters
}                     from '../reducers/todoFilter.reducer';

let { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } = todoFilters;

export default class TodoList extends React.Component {
  render() {
    let todos = this._getFilteredTodos(this.props.todos, this.props.filter);

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
            todos.map(todo =>
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

  _getFilteredTodos (todos, filter = SHOW_ALL) {
    switch ( filter ) {
      case SHOW_PENDING:
        return todos.filter(t => !t.completed);
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }
}