'use strict';

import React          from 'react';
import store          from '../app';

import {
  ADD_TODO,
  TOGGLE_TODO
}                     from '../reducers/todos.reducer';
import {
  todoFilters
}                     from '../reducers/todoFilter.reducer';

const { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } = todoFilters;

export const Todo = (
  { completed, label, onClick }
) => (
  <li className="todoList_item"
      onClick={onClick}
      style={{
        textDecoration : completed ? 'line-through' : 'none'
      }}>{label}</li>
);

export const TodoList = (
  { todos, onTodoClick }
) => (
  <ul className="todoList">
    {
      todos.map(todo =>
        <Todo key={todo.id}
              {...todo}
              onClick={() => onTodoClick(todo.id)}/>
      )
    }
  </ul>
);

export const TodoForm = (
  { onSubmit }
) => {
  let _label;

  return (
    <form className="todoForm"
          onSubmit={(e) => {
            e.preventDefault();
            _label.value.trim() && onSubmit(_label.value.trim());
            _label.value = '';
          }}>
      <input className="todoForm_label"
             ref={input => _label = input}/>
      <button className="todoForm_submit">Add Todo</button>
    </form>
  )
};

export const Link = (
  { href, label, onClick }
) => (
  <a className="filterList_item filterList_item-inactive"
     href={href}
     onClick={onClick}>{label}</a>
);

export const FilterLink = (
  { active, filter }
) => {
  return active ?
    (<a className="filterList_item filterList_item-active">{filter.replace(/SHOW_/, '')}</a>)
    :
    (<Link href={`#${filter}`}
           label={filter.replace(/SHOW_/, '')}
           onClick={
             (e) => {
               e.preventDefault();
               store.dispatch({
                 type   : 'SET_TODO_FILTER',
                 filter : filter
               });
             }
           }/>);
};

export const TodoFilterLink = (
  { filterList, currentFilter }
) => (
  <div className="filterList">
    {
      filterList.map((filter, index) => (
        <FilterLink key={index}
                    filter={filter}
                    active={filter === currentFilter}/>
      ))
    }
  </div>
);

//main component
const TodoApp = (
  { todos, filter }
) => (
  <section id="todoApp">
    <TodoForm onSubmit={label => store.dispatch({ type : ADD_TODO, label })}/>
    <TodoList todos={_getFilteredTodos(todos, filter)}
              onTodoClick={id => store.dispatch({ type : TOGGLE_TODO, id })}/>
    <TodoFilterLink filterList={Object.keys(todoFilters)} currentFilter={filter}/>
  </section>
);

//private functions
function _getFilteredTodos ( todos = [], filter = SHOW_ALL ) {
  switch ( filter ) {
    case SHOW_PENDING:
      return todos.filter(t => !t.completed);
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
}

export default TodoApp;