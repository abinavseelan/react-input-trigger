import React, { Component } from 'react';
import { render } from 'react-dom';

import InputHandler from '../src';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isTriggered: false,
    };
  }

  render() {
    return (
      <div>
        <h2>
          {`Is Triggered: ${this.state.isTriggered}`}
        </h2>

        <InputHandler
          trigger={{
            keyCode: 50,
            shiftKey: true,
          }}
          onStartHook={(obj) => { this.setState({ isTriggered: true, obj }); }}
          onTypeHook={(obj) => { this.setState({ isTriggered: true, obj }); }}
          onCancelHook={(obj) => { this.setState({ isTriggered: false, obj }); }}
          endTrigger={(endHandler) => { this.endHandler = endHandler; }}
        >
          <textarea placeholder="Type @ to trigger!" />
        </InputHandler>

        {
          this.state.obj
            ? (
              <pre>
                {
                  JSON.stringify(this.state.obj, null, 2)
                }
              </pre>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
