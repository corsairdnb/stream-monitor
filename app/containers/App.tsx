import * as React from 'react';

export default class App extends React.Component {
  public render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}
