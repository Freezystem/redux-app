'use strict';

//styles
import './TodoApp.scss';

//dependencies
import React          from 'react';
import { connect }    from 'react-redux';

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
  { filteredTodos, onTodoClick, onTodoButtonClick }
) => (
  <ul className="todoList">
    {
      filteredTodos.map(todo =>
        <Todo key={todo.id}
              {...todo}
              onClick={() => onTodoClick(todo.id)}
              onTodoButtonClick={() => onTodoButtonClick(todo.id)}/>
      )
    }
  </ul>
);

export const TodoForm = (
  { onTodoFormSubmit }
) => {
  let _label;

  return (
    <form className="todoForm"
          onSubmit={(e) => {
            e.preventDefault();
            _label.value.trim() && onTodoFormSubmit(_label.value.trim());
            _label.value = '';
          }}>
      <input className="todoForm_label"
             ref={input => _label = input}/>
      <button className="todoForm_submit">Add Todo</button>
    </form>
  )
};

export const FilterLink = (
  { active, filter, onClick }
) => (
  <a className={`filterList_item filterList_item-${active ? 'active' : 'inactive'}`}
     href={`${filter}`}
     onClick={e => {
       e.preventDefault();
       !active && onClick(filter);
     }}>{filter.replace(/SHOW_/, '')}</a>
);

export const TodoFilterLinks = (
  { filterList, currentFilter, onLinkClick }
) => (
  <div className="filterList">
    {
      filterList.map((filter, index) => (
        <FilterLink key={index}
                    filter={filter}
                    active={filter === currentFilter}
                    onClick={onLinkClick}/>
      ))
    }
  </div>
);

//main component
let TodoApp = ({
  filter,
  filterList,
  filteredTodos,
  onTodoFormSubmit,
  onTodoClick,
  onTodoButtonClick,
  onLinkClick
}) => (
  <section className="todoApp">
    <TodoForm onTodoFormSubmit={onTodoFormSubmit}/>
    <TodoList filteredTodos={filteredTodos}
              onTodoClick={onTodoClick}
              onTodoButtonClick={onTodoButtonClick}/>
    <TodoFilterLinks filterList={filterList}
                     currentFilter={filter}
                     onLinkClick={onLinkClick}/>
  </section>
);

const MapStateToProps = ( state ) => {
  return {
    filter        : state.todoFilter,
    filterList    : Object.keys(todoFilters),
    filteredTodos : _getFilteredTodos(state.todos, state.todoFilter)
  };
};

const MapDispatchToProps = ( dispatch ) => {
  return {
    onTodoFormSubmit  : label => dispatch({ type : ADD_TODO, label }),
    onTodoClick       : id => dispatch({ type : TOGGLE_TODO, id }),
    onTodoButtonClick : id => dispatch({ type : REMOVE_TODO, id }),
    onLinkClick       : filter => dispatch({ type : SET_TODO_FILTER, filter })
  };
};

TodoApp = connect(
  MapStateToProps,
  MapDispatchToProps
)(TodoApp);

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