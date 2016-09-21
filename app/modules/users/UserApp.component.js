'use strict';

// Styles
import './UserApp.scss';

// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';

// Actions
import {
  fetchUsers
}                     from './reducers/users.reducer';

// Presentational Components

/**
 * Generate user item with a picture and a link to the profile
 * @param {!userObj} props
 * user object
 * @return {ReactDOM}
 * generate `<li class="userList_item"/>` markup
 */
export function User ({
  login,
  url,
  avatar_url
}) {
  return (
    <li className="userList_item">
      <a className="userList_itemLink"
         href={url}
         target="_blank">
        <img src={avatar_url}
             alt={`${login} avatar`} />
        <span>{login}</span>
      </a>
    </li>
  );
}

/**
 * Generate a list of users
 * @param {!Object} props
 * react props object
 * @param {!Array<userObj>} props.users
 * list of user object
 * @return {ReactDOM}
 * generate `<ul class="userList"/>` markup
 */
export function UserList ({
  users
}) {
  return (
    <ul className="userList">
      {
        users.map(user => <User key={user.id} {...user}/>)
      }
    </ul>
  );
}

/**
 * Generate a visual error when request fails
 * @param {!Object} props
 * react props object
 * @param {!Object} props.error
 * error object to display
 * @param {!string} props.error.message
 * error message
 * @return {ReactDOM}
 * generate `<p class="userError"/>` markup
 */
export function UserError ({
  error
}) {
  return (
    <p className="userError">
      <span className="userError_title">unable to get user list</span>
      <span className="userError_message">{error.message}</span>
    </p>
  );
}

/**
 * Generate a header to display list title and button to launch user query
 * @param {!Object} props
 * react props object
 * @param {!Object} props.onClick
 * function to run when refresh button is clicked
 * @return {ReactDOM}
 * generate `<div class="userHeader"/>` markup
 */
export function UserHeader ({
  onClick
}) {
  return (
    <div className="userHeader">
      <p className="userHeader_title">user list</p>
      <button className="userHeader_refresh"
              onClick={onClick}>refresh
      </button>
    </div>
  );
}

// Container Components

/**
 * Generate a header to display list title and button to launch user query
 * @param {!Object} props
 * react props object
 * @param {!Array<userObj>} props.users
 * list of user object
 * @param {!Object} props.error
 * error object to display
 * @param {!string} props.error.message
 * error message
 * @param {!Object} props.onRefreshButtonClick
 * function to run when refresh button is clicked
 * @return {ReactDOM}
 * generate `<section class="userApp"/>` markup
 */
export function UserApp ({
  users,
  error,
  onRefreshButtonClick
}) {
  return (
    <section className="userApp">
      <UserHeader onClick={onRefreshButtonClick}/>
      {
        error ? <UserError error={error}/> : <UserList users={users}/>
      }
    </section>
  );
}

const MapStateToProps = ( state ) => {
  return {
    users : state.users.data,
    error : state.users.error
  };
};

const MapDispatchToProps = ( dispatch ) => {
  return {
    onRefreshButtonClick : () => dispatch(fetchUsers())
  };
};

/**
 * connect react component to redux state
 * @return {ReactDOM}
 * generate connected `<section class="userApp"/>` markup
 */
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(UserApp);