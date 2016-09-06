'use strict';

import './MainApp.scss';

import React  from 'react';
import {
  Link
}             from 'react-router';

export const Menu = () => (
  <nav className="appMenu">
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'} to="/">Home</Link>
    <Link className="appMenu_item" activeClassName={'appMenu_item-active'} to="todo">Todo</Link>
  </nav>
);

export const HomePage = () => (
  <div class="homePage">
    <h1>Hello Redux!</h1>
  </div>
);

export const NotFound = () => (
  <div class="notFound">
    <h1>Error 404 : Page Not Found</h1>
  </div>
);

const MainApp = ({
  children
}) => (
  <div class="mainApp">
    <Menu/>
    {children}
  </div>
);

export default MainApp;