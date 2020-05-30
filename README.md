# React Input Trigger

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]
[![downloads][downloads-badge]][downloads-url]
[![size][size-badge]][size-url]

[![deps][deps-badge]][deps-url]
[![peer-deps][peer-deps-badge]][peer-deps-url]

> React component for handling character triggers inside any textarea or input field. 🐼

## Description

Useful for building applications that need to listen on keyboard triggers in text fields, for example Slack-like emoji suggestions (triggered by typing `:`) or Github-like user mentions (triggered by typing `@`). This component is a **drop-in solution** and can be used with existing input fields / textareas.


_v2.x has some significant changes from v1. The v1 documentation can be found [here](https://github.com/abinavseelan/react-input-trigger/blob/master/README-v1.md)._

## Getting Started

- Install the component

```bash
$ npm install react-input-trigger --save
```

There are two exports from the package:

1. `import useInputTriggerHook from 'react-input-trigger/hook';`: Exports a React hook. (Recommended for React >= 16.8)
2. `import InputTrigger from 'react-input-trigger/component'`: Exports a component to wrap your textarea / input field. (Recommended for React < 16.8 or if you'd prefer a component)

## `react-input-trigger/hook`

```jsx
import useInputTriggerHook from 'react-input-trigger/hook';

const ExampleWithHooks = () => {
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
    <>
      <textarea onKeyDown={inputTriggerHandler} />
      <pre>{triggerState}</pre>
      <button onClick={() => endTrigger}>
        Manually stop trigger
      </button>
    </pre>
  )
```

### Hook Values

The following keys are available on the return value of the Hook.

| Value                   | Type                                                    | Default value  | Description                                                                            |
| --------------------------- | ------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| triggerState                       |    [triggerState]('#triggerState') or `null`     | null           | An object containing meta data about the _trigger_ that was dispatched in the input field / textarea.
| inputTriggerHandler                       |    Function    |  -           | Handler to listening on _triggers_. Pass this to the `onKeyDown` handler of your input field / text area.
| endTrigger                       |    Function    |  -           | Call this method if you need to manually end (cancel) a _trigger_.

### Hook Configuration

```jsx
useInputTrigger(<triggerConfigurations>, <options>);
```

**triggerConfiguration**

This parameter expects an array of [TriggerConfigurations]('#triggerConfiguration')

**options (optional)**

The hook can take a set of configuration options


| Option                   | Type                                                    | Default value  | Description                                                                            |
| --------------------------- | ------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| escToCancel                       | boolean                                                  | false           | Set this as `true` if you'd like the trigger to be automatically cancelled if the user presses the `Esacape` key.

eg

```jsx
useInputTrigger(<triggerConfigurations>, {
  escToCancel: true,
});
```

## `react-input-trigger/component`

```jsx
import InputTrigger from 'react-input-trigger/component';

class Example extends React.Component {
  constructor() {
    super();
    this.state = { trigger: null };
  }
  render() {
    return (
      <div>
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
```

### Props

The following keys are available on the return value of the Hook.

| Value                   | Type                                                    | Default value  | Description                                                                            |
| --------------------------- | ------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| triggers                       |    Array of [TriggerConfigurations]('#triggerConfiguration')     | `[ { key: '@', id: 'mention' } ]` | List of triggers the wrapper component should listen for.
| onInputTrigger                       |    Function     | - | Function that returns a `triggerState` when a _trigger_ occurs.
| endTrigger                       |    Function     | - | Function that returns a callback that you can store and execute whenever you want to manually end an active _trigger_


## Deep Dive

### TriggerConfiguration

<a id="triggerConfiguration"></a>

A TriggerConfiguration is an object to defines a _trigger_. React Input Trigger will use this object's definition to listen to keyboard events for _triggers_.

```js
{
  id: string // a unique identifier for this trigger. Default: Date.now()
  key: string // the event.key value you want to listen on. Use this tool to find out the `event.key` value: https://keycode.info/
  shiftKey: boolean // <Optional> Set this as true if you want the shift key to be pressed for the trigger to fire
  altKey: boolean // <Optional> Set this as true if you want the alt key to be pressed for the trigger to fire
  metaKey: boolean // <Optional> Set this as true if you want the windows key / cmd key to be pressed for the trigger to fire
  ctrlKey: boolean // <Optional> Set this as true if you want the ctrl key to be pressed for the trigger to fire
}
```

### triggerState

<a id="triggerState"></a>

The `triggerState` is an object that is returned when a particular _trigger_ fires. It's value can be one of the following:

```ts
// First occurrence of the trigger
{
  id: string // id configured
  hookType: 'start'
  cursor: {
    top: number // css top value for the trigger
    left: number // css left value for the trigger
    height: number // css height value for the cursor
  }
}

// On typing after the trigger has started
{
  id: string // id configured
  hookType: 'typing'
  cursor: {
    top: number // css top value for the trigger
    left: number // css left value for the trigger
    height: number // css height value for the cursor
  }
  text: {
    value: string; // string including the trigger key
    content: string; // string without the trigger key
  };
}

// On cancelling the trigger
{
  id: string // id configured
  hookType: 'cancel'
}
```

## Contributing

Want to fix something, add a new feature or raise an issue? Please read the [contributing guide](https://github.com/abinavseelan/react-input-trigger/blob/master/CONTRIBUTING.md) to get started. :smile:

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/6417910?s=200&v=4" width="100px;"/><br /><sub><b>Abinav Seelan</b></sub>](https://abinavseelan.com)<br />[💻](https://github.com/abinavseelan/react-input-trigger/commits?author=abinavseelan "Code") [📖](https://github.com/abinavseelan/react-input-trigger/commits?author=abinavseelan "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/6426069?s=200&v=4" width="100px;"/><br /><sub><b>Aditi Mohanty</b></sub>](https://github.com/rheaditi)<br />[💻](https://github.com/abinavseelan/react-input-trigger/commits?author=rheaditi "Code") [📖](https://github.com/abinavseelan/react-input-trigger/commits?author=rheaditi "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/6963212?s=200&v=4" width="100px;"/><br /><sub><b>Adam Goldman</b></sub>](https://github.com/goldylucks)<br />[💻](https://github.com/abinavseelan/react-input-trigger/commits?author=goldylucks "Code") |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

[npm-badge]: https://img.shields.io/npm/v/react-input-trigger.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-input-trigger
[license-badge]: https://img.shields.io/npm/l/react-input-trigger.svg?style=flat-square&color=blue
[license-url]: https://github.com/abinavseelan/react-input-trigger/blob/master/LICENSE
[downloads-badge]: https://img.shields.io/npm/dt/react-input-trigger.svg?style=flat-square&color=blue
[downloads-url]: https://www.npmjs.com/package/react-input-trigger
[deps-badge]: https://img.shields.io/david/abinavseelan/react-input-trigger.svg?style=flat-square
[deps-url]: https://david-dm.org/abinavseelan/react-input-trigger
[peer-deps-badge]: https://img.shields.io/david/peer/abinavseelan/react-input-trigger.svg?style=flat-square
[peer-deps-url]: https://david-dm.org/abinavseelan/react-input-trigger/peer-status
[size-badge]: https://img.shields.io/bundlephobia/minzip/react-input-trigger.svg?style=flat-square&label=gzipped
[size-url]: https://bundlephobia.com/result?p=react-input-trigger
