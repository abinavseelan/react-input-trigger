import React, { Component } from 'react';
import { render } from 'react-dom';

import InputHandler from '../src';

function handleInput(obj) {
  console.log(obj);
}
class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <InputHandler
        trigger={{
          keyCode: 65,
        }}
        onStartHook={handleInput}
      >
        <textarea />
      </InputHandler>
    );
  }
}

render(<App />, document.getElementById('app'));
