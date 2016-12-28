'use strict';

import './AuthApp.scss';

import React          from 'react';
import { connect }    from 'react-redux';

import { logIn }      from './reducers/auth.reducer';

// Presentational Components

/**
 * Generate an user log in form
 * @param {!Object} props
 * react props object
 * @param {!function} props.onLoginFormSubmit
 * the function to perform when the form is submitted, here {@link logIn}
 * @return {ReactDOM}
 * generate `<section class="authApp"/>` markup
 */
export const AuthApp = ({ onLoginFormSubmit }) => {
  let _login  = '',
    _password = '';

  return (
    <section className="authApp">
      <form className="authForm"
            onSubmit={
              event => {
                event.preventDefault();
                _login.value.trim() && onLoginFormSubmit(_login.value.trim(), _password.value);
                _login.value = _password.value = '';
              }
            }>
        <input className="authForm_login"
               type="text"
               placeholder="login"
               ref={input => _login = input}/>
        <input className="authForm_login"
               type="password"
               placeholder="password"
               ref={input => _password = input}/>
        <button className="todoForm_submit">log in</button>
      </form>
    </section>
  );
};

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