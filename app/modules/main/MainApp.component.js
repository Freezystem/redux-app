import React  from 'react';

export const Menu = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="todo">Todo</Link>
  </nav>
);

export const Home = () => (
  <h1>Hello Redux!</h1>
);

export const FallBack = () => (
  <h1>Error 404 : Page Not Found</h1>
);

const MainApp = ({
  children
}) => (
  <div id="App">
    <Menu/>
    {children}
  </div>
);

export default MainApp;