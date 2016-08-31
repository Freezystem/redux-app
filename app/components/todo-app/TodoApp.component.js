'use strict';

//styles
import './TodoApp.scss';

//dependencies
import React          from 'react';

import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO
}                     from '../../reducers/todos.reducer';
import {
  todoFilters,
  SET_TODO_FILTER
}                     from '../../reducers/todoFilter.reducer';

const { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } = todoFilters;


//components
export const TodoButton = (
  { onClick }
) => (
  <button onClick={onClick}>X</button>
);

export const Todo = (
  { completed, label, onClick, onTodoButtonClick }
) => (
  <li className={`todoList_item todoList_item-${completed ? 'completed' : 'pending'}`}>
    <span onClick={onClick}>{label}</span>
    <TodoButton onClick={onTodoButtonClick}/>
  </li>
);

export const TodoList = (
  { todos, onTodoClick, onTodoButtonClick }
) => (
  <ul className="todoList">
    {
      todos.map(todo =>
        <Todo key={todo.id}
              {...todo}
              onClick={() => onTodoClick(todo.id)}
              onTodoButtonClick={() => onTodoButtonClick(todo.id)}/>
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
  { to, label, onClick }
) => (
  <a className="filterList_item filterList_item-inactive"
     href={to}
     onClick={onClick}>{label}</a>
);

export const FilterLink = (
  { active, filter, onLinkClick }
) => {
  return active ?
    (<a className="filterList_item filterList_item-active">{filter.replace(/SHOW_/, '')}</a>)
    :
    (<Link to={`#${filter}`}
           label={filter.replace(/SHOW_/, '')}
           onClick={e => {
             e.preventDefault();
             onLinkClick(filter);
           }}/>);
};

export const TodoFilterLinks = (
  { filterList, currentFilter, onLinkClick }
) => (
  <div className="filterList">
    {
      filterList.map((filter, index) => (
        <FilterLink key={index}
                    filter={filter}
                    active={filter === currentFilter}
                    onLinkClick={onLinkClick}/>
      ))
    }
  </div>
);

//main component
const TodoApp = (
  { store, todos, filter }
) => (
  <section className="todoApp">
    <TodoForm onSubmit={label => store.dispatch({ type : ADD_TODO, label })}/>
    <TodoList todos={_getFilteredTodos(todos, filter)}
              onTodoClick={id => store.dispatch({ type : TOGGLE_TODO, id })}
              onTodoButtonClick={id => store.dispatch({ type : REMOVE_TODO, id })}/>
    <TodoFilterLinks filterList={Object.keys(todoFilters)}
                     currentFilter={filter}
                     onLinkClick={
                       filter => store.dispatch({ type : SET_TODO_FILTER, filter })
                     }/>
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