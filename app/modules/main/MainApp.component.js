'use strict';

import './MainApp.scss';

import React  from 'react';
import {
  Link
}             from 'react-router';

/**
 * Generate site navigation
 * @return {ReactElement} <nav/> Markup
 */
export const Menu = () => (
  <nav className="appMenu">
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'} to="/">Home</Link>
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'} to="todo">Todo</Link>
  </nav>
);

/**
 * Temporary home page
 * @return {ReactElement} <div class="homePage"/> Markup
 */
export const HomePage = () => (
  <div className="homePage">
    <h1>Hello Redux!</h1>
  </div>
);

/**
 * Error 404 fallback page
 * @return {ReactElement} <div class="notFound"/> Markup
 */
export const NotFound = () => (
  <div className="notFound">
    <h1>Error 404 : Page Not Found</h1>
  </div>
);

/**
 * Main wrapper
 * @params {ReactElement} children - all components called from router
 * @return {ReactElement} <div class="notFound"/> Markup
 */
const MainApp = ({
  children
}) => (
  <div class="mainApp">
    <Menu/>
    {children}
  </div>
);

export default MainApp;