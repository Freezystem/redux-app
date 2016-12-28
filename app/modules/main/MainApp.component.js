'use strict';

import './MainApp.scss';

import React  from 'react';
import {
  Link
}             from 'react-router';

/**
 * @external {XML} https://developer.mozilla.org/en-US/docs/Glossary/XML
 */

/**
 * @typedef {XML} ReactDOM
 */

/**
 * Generate site navigation
 * @return {ReactDOM}
 * generate `<nav class="appMenu"/>` markup
 */
export const Menu = () =>
  <nav className="appMenu">
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'}
          to="/">Home</Link>
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'}
          to="todos">Todos</Link>
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'}
          to="users">Users</Link>
  </nav>;

/**
 * Temporary home page
 * @return {ReactDOM}
 * generate `<div class="homePage"/>` markup
 */
export const HomePage = () =>
  <div className="homePage">
    <h1>Hello Redux!</h1>
  </div>;

/**
 * Error 404 fallback page
 * @return {ReactDOM}
 * generate `<div class="notFound"/>` markup
 */
export const NotFound = () =>
  <div className="notFound">
    <h1>Error 404 : Page Not Found</h1>
  </div>;

/**
 * Main wrapper
 * @param {Object} props
 * react props object
 * @param {ReactDOM} props.children
 * all components called from router
 * @return {ReactDOM}
 * generate `<div class="notFound"/>` markup
 */
const MainApp = ({ children }) =>
  <div className="mainApp">
    <Menu/>
    {children}
  </div>;

export default MainApp;