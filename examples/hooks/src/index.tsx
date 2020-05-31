import * as React from 'react';
import { render } from 'react-dom';
import { useInputTrigger } from 'react-input-trigger';

/** Using the hook `useInputTrigger()` in a function component. */
const Example = () => {
  const { triggerState, inputTriggerHandler, endTrigger } = useInputTrigger([
    {
      key: '@',
      id: 'mention',
    },
    {
      key: '/',
      id: 'slash-command',
    },
  ]);

  return (
    <div>
      <h1>react-input-trigger - useInputTrigger()</h1>
      <p>
        Start a trigger with {`'@'`} or {`'/'`}!
      </p>
      <textarea style={{ minWidth: '350px' }} rows={3} onKeyDown={inputTriggerHandler}/>
      <div>
        <div>
          <button onClick={() => endTrigger()} disabled={!Boolean(triggerState)}>
            End Trigger Manually
          </button>
        </div>
        <br /><br />
        <h3>trigger:</h3>
        <pre>{triggerState ? JSON.stringify(triggerState, null, 2) : 'none'}</pre>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
render(<Example />, rootElement);
