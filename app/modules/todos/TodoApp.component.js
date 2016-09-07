'use strict';

// Styles
import './TodoApp.scss';

// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';
import classNames     from 'classnames';

import {
  addTodo,
  removeTodo,
  toggleTodo,
  clearTodo
}                     from './reducers/todos.reducer';
import {
  todoFilters,
  setTodoFilter,
  getFilteredTodos
}                     from './reducers/todoFilter.reducer';

// Presentational Components
export const Todo = (
  { completed, label, onClick, onButtonClick }
) => (
  <li className={`todoList_item todoList_item-${completed ? 'completed' : 'pending'}`}>
    <span className="todoList_itemLabel"
          onClick={onClick}>{label}</span>
    <button className="todoList_itemButton"
            onClick={onButtonClick}>+</button>
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
  <a className={classNames('filterList_item', { 'filterList_item-active' : active})}
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

export const TodoFooter = (
  { todos, onTodoClearClick }
) => {
  let completed = todos.filter(todo => todo.completed).length,
    total       = todos.length,
    text        = total ? (total === completed ? 'all done, good job!' : `${completed}/${total} done`) : 'no todo yet';

  return (
    <p className="todoFooter">
      <span className="todoFooter_count">{text}</span>
      <a className={classNames('todoFooter_clear', { 'todoFooter_clear-hide' : !completed })}
         onClick={(e) => {
           e.preventDefault();
           completed && onTodoClearClick();
         }}>clear completed</a>
    </p>
  );
};

// Container Components
export const TodoApp = ({
  todos,
  filter,
  filterList,
  onTodoFormSubmit,
  onTodoClick,
  onTodoButtonClick,
  onTodoClearClick,
  onLinkClick
}) => (
  <section className="todoApp">
    <TodoForm onTodoFormSubmit={onTodoFormSubmit}/>
    <TodoFilterLinks filterList={filterList}
                     currentFilter={filter}
                     onLinkClick={onLinkClick}/>
    <TodoList filteredTodos={getFilteredTodos(todos, filter)}
              onTodoClick={onTodoClick}
              onTodoButtonClick={onTodoButtonClick}/>
    <TodoFooter todos={todos} onTodoClearClick={onTodoClearClick}/>
  </section>
);

const MapStateToProps = ( state ) => {
  return {
    todos         : state.todos,
    filter        : state.todoFilter,
    filterList    : Object.keys(todoFilters)
  };
};

const MapDispatchToProps = ( dispatch ) => {
  return {
    onTodoFormSubmit  : label => dispatch(addTodo(label)),
    onTodoClick       : id => dispatch(toggleTodo(id)),
    onTodoButtonClick : id => dispatch(removeTodo(id)),
    onTodoClearClick  : () => dispatch(clearTodo()),
    onLinkClick       : filter => dispatch(setTodoFilter(filter))
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(TodoApp);