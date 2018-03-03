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
          shiftKey: true,
        }}
        onStartHook={() => { console.log('triggered'); }}
        onCancelHook={() => { console.log('de-triggered'); }}
        endTrigger={(endHandler) => { this.endHandler = endHandler; }}
      >
        <textarea />
      </InputHandler>
    );
  }
}

render(<App />, document.getElementById('app'));
