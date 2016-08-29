"use strict";

import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { createStore }                  from 'redux';
import { counter }                      from './reducers/counter.reducer';

// const mainReducer = combineReducers({ counter });
const store = createStore(counter, { count : 0 });

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => {
  return (<div>
    <p>{value}</p>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>);
};

const renderApp = () => {
  return ReactDOM.render(
    <Counter value={store.getState().count}
             onIncrement={() => store.dispatch({type:"INCREMENT"})}
             onDecrement={() => store.dispatch({type:"DECREMENT"})}/>,
    document.getElementById('app')
  );
};

store.subscribe(renderApp);
renderApp();