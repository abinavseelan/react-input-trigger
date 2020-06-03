import React from 'react';
import { InputTrigger } from 'react-input-trigger';
import {
  Header,
  Container,
  Segment,
  Button,
  Grid,
  Divider,
} from 'semantic-ui-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SimplifiedComponentExample = `/** A React function component with hooks */
class Example extends React.Component {
  constructor() {
    super();
    this.state = { trigger: null };
  }
  render() {
    return (
      <div>
        <InputTrigger
          triggers={triggers}
          endTrigger={endHandler => { this.endTrigger = endHandler; }}
          onInputTrigger={trigger => this.setState({ trigger })}
        >
          <textarea />
        </InputTrigger>
        <button onClick={() => this.endTrigger()}>End Trigger Manually</button>
      </div>
    );
  }
}
`.trim();

const triggers = [
  {
    key: '@',
    id: 'mention',
  },
  {
    key: '/',
    id: 'slash-command',
  },
];

export class ExampleComponent extends React.Component {
  endTrigger = () => {};
  state = {
    trigger: null,
  };

  render() {
    const { trigger } = this.state;

    return (
      <Container>
        <Header as="h4" content="Example <InputTrigger />" attached="top" />
        <Segment attached>
          <Header as="h5" content="Code" />
          <SyntaxHighlighter
            language="jsx"
            style={theme}
            showLineNumbers={true}
          >
            {SimplifiedComponentExample}
          </SyntaxHighlighter>
          <Divider section />
          <Header as="h5" content="Demo" />
          <p>Start a trigger with '@' or '/'</p>
          <Grid columns={2} verticalAlign="middle">
            <Grid.Column>
              <InputTrigger
                triggers={triggers}
                endTrigger={endHandler => {
                  this.endTrigger = endHandler;
                }}
                onInputTrigger={trigger => this.setState({ trigger })}
              >
                <textarea style={{ width: '100%' }} rows={5} />
              </InputTrigger>
            </Grid.Column>
            <Grid.Column>
              <Header
                as="h5"
                content={`triggered: ${trigger === null ? 'none' : trigger.id}`}
              />
              <Button
                color="red"
                disabled={!Boolean(this.state.trigger)}
                onClick={() => {
                  this.endTrigger();
                }}
              >
                End Trigger Manually
              </Button>
            </Grid.Column>
          </Grid>

          <Header as="h5" content="Trigger Event Data" />
          <pre>{JSON.stringify(this.state.trigger, null, 2)}</pre>
        </Segment>
      </Container>
    );
  }
}
