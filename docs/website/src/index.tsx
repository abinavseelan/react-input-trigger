import * as React from 'react';
import { render } from 'react-dom';
import { Tab, Menu, Responsive, Header } from 'semantic-ui-react';

import { ExampleHooks } from './ExampleHooks';
import { ExampleComponent } from './ExampleComponent';
import { PageHeader } from './PageHeader';

const panes = [
  {
    menuItem: (
      <Menu.Item name='useInputTrigger'>
        <Header as='h4'>useInputTrigger</Header>
        <p>Requires hooks (React {'>='} 16.8)</p>
      </Menu.Item>
    ),
    render: () => <ExampleHooks />,
  },
  {
    menuItem: (
      <Menu.Item name='InputTrigger'>
        <Header as='h4'>{`<InputTrigger />`}</Header>
        <p>Works with React {'>='} 15</p>
      </Menu.Item>
    ),
    render: () => <ExampleComponent />,
  },
];

export const Examples = () => {
  return (
    <>
      <PageHeader />
      <Responsive minWidth={600}>
        <Tab panes={panes} menu={{ fluid: true, vertical: true }} defaultActiveIndex={0} />
      </Responsive>
      <Responsive maxWidth={599}>
        <ExampleHooks />
        <ExampleComponent />,
      </Responsive>
    </>
  );
};

const rootElement = document.getElementById('root');
render(<Examples />, rootElement);
