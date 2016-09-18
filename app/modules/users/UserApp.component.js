'use strict';

// Styles
import './UserApp.scss';

// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';
import classNames     from 'classnames';

// Actions
import {
  fetchUsers
}                     from './reducers/users.reducer';

// Presentational Components

export const User = ({
  login,
  url,
  avatar_url
}) => (
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

export const UserList = ({
  users
}) => (
  <ul className="userList">
    {
      users.map(user => <User key={user.id} {...user}/>)
    }
  </ul>
);

export const UserError = ({
  error
}) => (
  <p className="userError">
    <span className="userError_title">unable to get user list</span>
    <span className="userError_message">{error.message}</span>
  </p>
);

export const UserHeader = ({
  onClick
}) => (
  <div className="userHeader">
    <p className="userHeader_title">user list</p>
    <button className="userHeader_refresh"
            onClick={onClick}>refresh</button>
  </div>
);

// Container Components

export const UserApp = ({
  users,
  error,
  onRefreshButtonClick
}) => (
  <section className="userApp">
    <UserHeader onClick={onRefreshButtonClick}/>
    {
      error ? <UserError error={error}/> : <UserList users={users}/>
    }
  </section>
);

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

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(UserApp);