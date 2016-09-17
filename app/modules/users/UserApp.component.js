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
  <li className="ghUserList_item">
    <a className="ghUserList_itemLink"
       href={url}
       target="_blank">
      <img src={avatar_url}
           alt={`${login} avatar`} />
      <span>{login}</span>
    </a>
  </li>
);

// Container Components

export const UserApp = ({
  users,
  onLoadClick
}) => (
  <section className="userApp">
    <p>User list:</p>
    <ul className="ghUserList">
      {
        users.map(user => <User key={user.id} {...user} />)
      }
    </ul>
    <button onClick={onLoadClick}>Refresh</button>
  </section>
);

const MapStateToProps = ( state ) => {
  return {
    users : state.users.data
  };
};

const MapDispatchToProps = ( dispatch ) => {
  return {
    onLoadClick  : () => dispatch(fetchUsers())
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(UserApp);