import React      from 'react';
import store      from '../app';
import {
  todoFilters
}                 from '../reducers/todoFilter.reducer';

export default class TodoFilterLinks extends React.Component {
  render() {
    let linkStyle = { marginRight : 10 };

    return (
      <div>
        {
          Object.keys(todoFilters).map((filter, i) => {
            if (this.props.filter !== todoFilters[filter]) {
              return (<a key={i} style={linkStyle}
                 href={`#${todoFilters[filter]}`}
                 onClick={
                   (e) => {
                     e.preventDefault();
                     store.dispatch({
                       type   : 'SET_TODO_FILTER',
                       filter : todoFilters[filter]
                     })
                   }
                 }>{todoFilters[filter].replace(/SHOW\_/, '')}</a>);
            }
            else {
              return (<span key={i} style={linkStyle}>{todoFilters[filter].replace(/SHOW\_/, '')}</span>);
            }
          })
        }
      </div>
    );
  }
}