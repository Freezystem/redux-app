import React          from 'react';
import store          from '../app';

import TodoList       from './TodoList.component';
import TodoFilterLink from './TodoFilterLinks.component';

export default class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <TodoList todos={this.props.todos} filter={this.props.filter}/>
        <TodoFilterLink filter={this.props.filter}/>
      </div>
    );
  }
}