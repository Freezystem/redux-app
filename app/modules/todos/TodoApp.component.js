'use strict';

// Styles
import './TodoApp.scss';

// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';
import classNames     from 'classnames';

// Actions
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

/**
 * Generate a clickable todo item with a label and an delete button
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {boolean} props.completed
 * whether the todo is completed or not
 * @param {string} props.label
 * the todo label
 * @param {function} props.onClick
 * the function to perform when the todo label is clicked, here {@link toggleTodo}
 * @param {function} props.onButtonClick
 * the function to perform when the todo button is clicked, here {@link removeTodo}
 * @return {ReactDOM}
 * generate `<li class="todoList_item"/>` markup
 */
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

/**
 * Generate a list of todos
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {Array<todoObj>} props.filteredTodos
 * pre-filtered list of todos depending on the actual selected filter
 * @param {function(id:number)} props.onTodoClick
 * function to perform when a todo label is clicked, here {@link toggleTodo}
 * @param {function(id:number)} props.onTodoButtonClick
 * function to perform when a todo button is clicked, here {@link removeTodo}
 * @return {ReactDOM}
 * generate `<ul class="todoList"/>` markup
 */
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

/**
 * Generate a form to submit a new todo
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {function(label:string)} props.onTodoFormSubmit
 * function to perform on form submit
 * @return {ReactDOM}
 * generate `<form class="todoForm"/>` markup
 */
export const TodoForm = (
  { onTodoFormSubmit }
) => {
  let _label = '';

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
  );
};

/**
 * Generate a link to change filter value
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {boolean} props.active
 * whether the link is already active or not
 * @param {string} props.filter
 * constant representing the filter value
 * @param {function(filter:string)} props.onClick
 * function to perform when link is clicked, here {@link setTodoFilter}
 * @return {ReactDOM}
 * generate `<a class="filterList_item">` markup
 */
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

/**
 * Generate a list of todo filter links
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {Array<string>} props.filterList
 * list of all available filters
 * @param {string} props.currentFilter
 * constant representing the currently active filter in the list
 * @param {function()} props.onLinkClick
 * function to perform when a filter link is clicked
 * @return {ReactDOM}
 * generate `<div class="filterList" />` markup
 */
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

/**
 * Generate a footer for the todo list
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {Array<todoObj>} props.todos
 * list of all todos
 * @param {function()} props.onTodoClearClick
 * function to perform when the clear button is clicked
 * @return {ReactDOM}
 * generate `<p class="todoFooter" />` markup
 */
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

/**
 * Generate the whole todo application
 * @type {function}
 * @param {Object} props
 * react props object
 * @param {Array<todoObj>} props.todos
 * list of all available todos
 * @param {string} props.filter
 * current active filter
 * @param {Array<string>} props.filterList
 * list of all todo filters
 * @param {function} props.onTodoFormSubmit
 * function to perform when the todo form is submitted
 * @param {function} props.onTodoClick
 * function to perform when the todo label is clicked
 * @param {function} props.onTodoButtonClick
 * function to perform when the todo button is clicked
 * @param {function} props.onTodoClearClick
 * function to perform when the clear button is clicked
 * @param {function} props.onLinkClick
 * function to perform when a filter link is clicked
 * @return {ReactDOM}
 * generate `<section class="todoApp" />` markup
 */
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

/**
 * Map the application state to the component properties
 * @param {Object} state
 * @return {object}
 * @property {Array<todoObj>} todos
 * @property {string} filter
 * @property {Array<string>} filterList
 * a mapped state to props object
 */
const MapStateToProps = ( state ) => {
  return {
    todos         : state.todos,
    filter        : state.todoFilter,
    filterList    : Object.keys(todoFilters)
  };
};

/**
 * Map dispatch action to the component properties
 * @param {function} dispatch
 * the store dispatch function
 * @return {Object}
 * @property {function(label:string)} onTodoFormSubmit
 * @property {function(id:number)} onTodoClick
 * @property {function(id:number)} onTodoButtonClick
 * @property {function} onTodoClearClick
 * @property {function(filter:string)} onLinkClick
 */
const MapDispatchToProps = ( dispatch ) => {
  return {
    onTodoFormSubmit  : label => dispatch(addTodo(label)),
    onTodoClick       : id => dispatch(toggleTodo(id)),
    onTodoButtonClick : id => dispatch(removeTodo(id)),
    onTodoClearClick  : () => dispatch(clearTodo()),
    onLinkClick       : filter => dispatch(setTodoFilter(filter))
  };
};

/**
 * connect react component to redux state
 * @return {ReactDOM}
 * generate connected `<section class="todoApp" />` markup
 */
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(TodoApp);