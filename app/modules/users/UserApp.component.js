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

// Container Components
export const UserApp = ({
  users,
  onLoadClick
}) => (
  <section className="userApp">
    <p>User list:</p>
    <button onClick={onLoadClick}>Load</button>
    <ul>
      {
        users.map(user => (<li key={user.id}>{user.login}</li>))
      }
    </ul>
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