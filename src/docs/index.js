import React, { Component } from 'react';
import { render } from 'react-dom';

import InputHandler from '../component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      trigger: null,
    };
  }

  render() {
    const { trigger } = this.state;

    return (
      <div>
        <h2>
          {`Is Triggered: ${trigger ? trigger.id : 'none'}`}
          <br />
          {trigger ? (
            <button
              onClick={() => {
                const { id } = trigger;
                this.setState(
                  {
                    trigger: null,
                  },
                  () => {
                    this.endHandler(id);
                  }
                );
              }}
            >
              End Trigger
            </button>
          ) : null}
        </h2>

        <InputHandler
          triggers={[
            {
              id: 'm-key',
              key: 'm',
              shiftKey: true,
              metaKey: true,
            },
            {
              id: 'mention',
              key: '@',
            },
            {
              id: 'slash-command',
              key: '/',
            },
          ]}
          onInputTrigger={(trigger) => {
            this.setState({ trigger });
          }}
          endTrigger={(endHandler) => {
            this.endHandler = endHandler;
          }}
        >
          <textarea placeholder='Type @ to trigger!' />
        </InputHandler>

        {trigger ? <pre>{JSON.stringify(trigger, null, 2)}</pre> : null}
        <h4>
          View on <a href='https://github.com/abinavseelan/react-input-trigger'>Github!</a>
        </h4>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
