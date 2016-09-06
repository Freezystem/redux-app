'use strict';

// Styles
import './TodoApp.scss';

// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';

import {
  addTodo,
  removeTodo,
  toggleTodo
}                     from './reducers/todos.reducer';
import {
  todoFilters,
  setTodoFilter
}                     from './reducers/todoFilter.reducer';

const { SHOW_ALL, SHOW_COMPLETED, SHOW_PENDING } = todoFilters;

// Presentational Components
export const Todo = (
  { completed, label, onClick, onButtonClick }
) => (
  <li className={`todoList_item todoList_item-${completed ? 'completed' : 'pending'}`}>
    <span className="todoList_itemLabel"
          onClick={onClick}>{label}</span>
    <button className="todoList_itemButton"
            onClick={onButtonClick}>X</button>
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
              onButtonClick={() => onTodoButtonClick(todo.id)}/>
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
             type="text"
             placeholder="What's need to be done today ?"
             ref={input => _label = input}/>
      <button className="todoForm_submit">add</button>
    </form>
  )
};

export const FilterLink = (
  { active, filter, onClick }
) => (
  <a className={`filterList_item filterList_item-${active ? 'active' : 'inactive'}`}
     href={`#${filter}`}
     onClick={e => {
       e.preventDefault();
       !active && onClick(filter);
     }}>{filter.replace(/SHOW_/, '')}</a>
);

export const TodoFilterLinks = (
  { filterList, currentFilter, onLinkClick }
) => (
  <div className="filterList">
    <span class="filterList_label">see:</span>
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

// Container Components
export const TodoApp = ({
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
    <TodoFilterLinks filterList={filterList}
                     currentFilter={filter}
                     onLinkClick={onLinkClick}/>
    <TodoList filteredTodos={filteredTodos}
              onTodoClick={onTodoClick}
              onTodoButtonClick={onTodoButtonClick}/>
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
    onTodoFormSubmit  : label => dispatch(addTodo(label)),
    onTodoClick       : id => dispatch(toggleTodo(id)),
    onTodoButtonClick : id => dispatch(removeTodo(id)),
    onLinkClick       : filter => dispatch(setTodoFilter(filter))
  };
};

export default connect(
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