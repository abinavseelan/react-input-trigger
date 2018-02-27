import React, { Component } from 'react';
import { render } from 'react-dom';

import InputHandler from '../src';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <InputHandler
        trigger={{
          keyCode: 50,
        }}
      >
        <textarea />
      </InputHandler>
    );
  }
}

render(<App />, document.getElementById('app'));
