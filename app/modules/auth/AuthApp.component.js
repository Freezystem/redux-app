'use strict';

import './AuthApp.scss';

import React          from 'react';
import { connect }    from 'react-redux';

import { logIn }      from './reducers/auth.reducer';

// Presentational Components

/**
 * Generate a form
 * @param {!Object} props
 * react props object
 * @param {!function} props.onSubmit
 * the function to perform when the form is submitted, here {@link logIn}
 * @return {ReactDOM}
 * generate `<form class="authForm"/>` markup
 */
export const AuthForm = ({ onSubmit }) => {
  let _login  = '',
    _password = '';

  return (
    <form className="authForm"
          onSubmit={
            event => {
              event.preventDefault();
              _login.value.trim()
              && _password.value
              && onSubmit(_login.value.trim(), _password.value);
              _login.value = _password.value = '';
            }
          }>
      <input className="authForm_login"
             type="text"
             placeholder="login"
             required
             ref={input => _login = input}/>
      <input className="authForm_password"
             type="password"
             placeholder="password"
             required
             ref={input => _password = input}/>
      <button className="authForm_submit">log in</button>
    </form>
  );
};

/**
 * Generate an user log in component
 * @param {!Object} props
 * react props object
 * @param {!function} props.onLoginFormSubmit
 * the function to perform when the auth form is submitted, here {@link logIn}
 * @return {ReactDOM}
 * generate `<section class="authApp"/>` markup
 */
export const AuthApp = ({ onLoginFormSubmit }) =>
    <section className="authApp">
      <AuthForm onSubmit={onLoginFormSubmit}/>
    </section>;

const MapStateToProps = ( state ) => {
  return {
    auth  : state.auth
  };
};

const MapDispatchToProps = ( dispatch ) => {
  return {
    onLoginFormSubmit  : ( login, password ) => dispatch(logIn(login, password))
  };
};

/**
 * connect react component to redux state
 * @return {ReactDOM}
 * generate connected `<section class="authApp" />` markup
 */
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(AuthApp);