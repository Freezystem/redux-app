import { Component } from 'react';

export default class Counter extends Component {
  render({
    value,
    onIncrement,
    onDecrement
  }) {
    return (<div>
      <p>counter: {value}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>);
  }
}

{/*<Counter value={store.getState().counter}*/}
         // onIncrement={() => store.dispatch({type:INCREMENT_COUNT})}
         // onDecrement={() => store.dispatch({type:DECREMENT_COUNT})}/>;