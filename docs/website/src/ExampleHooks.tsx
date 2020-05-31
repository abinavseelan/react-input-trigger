import * as React from 'react';
import { useInputTrigger } from 'react-input-trigger';
import { Header, Container, Segment, Button, Grid } from 'semantic-ui-react';
import { Code } from './Highlighter';

const SimplifiedHookExample = `/** A React function component with hooks */
const WithHooks = () => {
  const { triggerState, inputTriggerHandler, endTrigger } = useInputTrigger([{
    key: '@',
    id: 'mention',
  }, {
    key: '/',
    id: 'slash-command',
  }]);

  return (
\t<div>
\t\t\t<button onClick={() => endTrigger()}>end trigger manually</button>
\t\t\t<textarea onKeyDown={inputTriggerHandler} />
\t\t</div>
  );
};`;

export const ExampleHooks: React.FC = () => {
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
    <React.Fragment>
      <Container className='input-trigger-hooks'>
        <Header as='h4' content='Example useInputTrigger()' attached='top' />
        <Segment attached>
          <Header as='h5' content='Code' />
          <Code>{SimplifiedHookExample}</Code>
        </Segment>
        <Header as='h4' content='Demo with useInputTrigger()' attached='top' />
        <Segment attached>
          <p>Start a trigger with '@' or '/'</p>
          <Grid columns={2} verticalAlign='middle'>
            <Grid.Column>
              <textarea onKeyPress={inputTriggerHandler} style={{ width: '100%' }} rows={5} />
            </Grid.Column>
            <Grid.Column>
              <Header as='h5' content={`triggered: ${triggerState === null ? 'none' : triggerState.id}`} />
              <Button
                color='red'
                disabled={!triggerState}
                onClick={() => {
                  endTrigger();
                }}
              >
                End Trigger
              </Button>
            </Grid.Column>
          </Grid>
          <Header as='h5' content='Trigger Event Data' />
          <pre>{JSON.stringify(triggerState, null, 2)}</pre>
        </Segment>
      </Container>
    </React.Fragment>
  );
};
