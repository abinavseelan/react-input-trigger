import * as React from 'react';
import { render } from 'react-dom';
import { InputTrigger } from 'react-input-trigger';

/** Using the component `<InputTrigger />` in a class component. */
class Example extends React.Component {
  endTrigger: any; /* TODO: fix the types for endTrigger */
  state = { triggerState: null };

  render() {
    const { triggerState } = this.state;
    return (
      <div>
        <h1>react-input-trigger - {`<InputTrigger />`}</h1>
        <p>
          Start a trigger with {`'@'`} or {`'/'`}!
        </p>
        <InputTrigger
          triggers={[
            {
              key: '@',
              id: 'mention',
            },
            {
              key: '/',
              id: 'slash-command',
            },
          ]}
          endTrigger={(endHandler) => {
            this.endTrigger = endHandler;
          }}
          onInputTrigger={(triggerState) => this.setState({ triggerState })}
        >
          <textarea style={{ minWidth: '350px' }} rows={3} />
        </InputTrigger>
        <div>
          <div>
            <button onClick={() => this.endTrigger()}>End Trigger Manually</button>
          </div>
          <br />
          <br />
          <h3>trigger:</h3>
          <pre>{triggerState ? JSON.stringify(triggerState, null, 2) : 'none'}</pre>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
render(<Example />, rootElement);
