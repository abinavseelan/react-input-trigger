# React Input Trigger

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]
[![downloads][downloads-badge]][downloads-url]
[![size][size-badge]][size-url]

[![deps][deps-badge]][deps-url]
[![peer-deps][peer-deps-badge]][peer-deps-url]

> React component for handling character triggers inside textareas and input fields. 🐼

## Description

Useful for building applications that need Slack-like emoji suggestions (triggered by typing `:`) or Github-like user mentions (triggered by typing `@`).

The component provides the following hooks:

* `onStart`: whenever the trigger is first activated (eg. when `@` is first typed).
* `onType`: when something is being typed after it's been triggered.
* `onCancel`: when the trigger is canceled.

The hooks pass some meta-data such as the cursor position and/or the text that has been typed since the trigger has been activated.

![reactinputtrigger](https://user-images.githubusercontent.com/6417910/36937827-0e615e4e-1f3f-11e8-9623-c4141bda3d2e.gif)

## Demo

A live demo of this component can be found [here](https://abinavseelan.com/react-input-trigger).

A detailed guide on using this component to build a Github-style user mentions component [can be found on CampVanilla](https://blog.campvanilla.com/reactjs-input-trigger-github-twitter-mentions-8ad1d878110d).

## Usage

### Getting Started

* Install the component

```bash
$ npm install react-input-trigger
```

* Use `InputTrigger` in a regular class Component:

```jsx
import React from 'react';
import InputTrigger from 'react-input-trigger';

class Example extends React.Component {
  constructor() {
    super();
    this.inputElement = React.createRef();
  }

  render() {
    return (
      <InputTrigger
        inputRef={() => this.inputElement}
      >
        <textarea ref={this.inputElement} />
      </InputTrigger>
    );
  }
}
```

View the <a href="#other-examples">examples</a> for more.

---

Or get it in the browser directly via [unpkg](https://unpkg.com/react-input-trigger@latest/build/lib/react-input-trigger.js):

```html
<script
  src="https://unpkg.com/react-input-trigger@latest/build/lib/react-input-trigger.js"
  type="text/javascript">
</script>
```

## Component Props

`<InputTrigger>` can take in the following props:

### trigger

This prop takes an object that defines the trigger. The object can have the following properties

* `keyCode`: This is the character code that will fire the trigger.
* `shiftKey`: (Optional) Set this to `true` if you need the shift key to be pressed along with the `keyCode` to start the trigger. Ignore this property if it's not required.
* `ctrlKey`: (Optional) Set this to `true` if you need the ctrl key to be pressed along with the `keyCode` to start the trigger. Ignore this property if it's not required.
* `metaKey`: (Optional) Set this to `true` if you need the cmd key to be pressed along with the `keyCode` to start the trigger. Ignore this property if it's not required.

```jsx
<InputTrigger
  trigger={{
    keyCode: 50,
    shiftKey: true,
  }}
>
```

### onStart

This prop takes a function that will fire whenever trigger is activated. The function is passed some meta information about the cursor's position that you can use.

```jsx
<InputTrigger
  trigger={{
    keyCode: 50,
    shiftKey: true,
  }}
  onStart={(obj) => { console.log(obj); }}
>
```

The parameter `obj` contains the following meta information

```js
{
  "hookType": "start",
  "cursor": {
    "selectionStart",
    "selectionEnd",
    "top",
    "left",
    "height"
  }
}
```

### onCancel

This prop takes a function that will fire everytime the user presses backspace and removes the trigger from the input section. The function is passed some meta information about the cursor's position that you can use.

```jsx
<InputTrigger
  trigger={{
    keyCode: 50,
    shiftKey: true,
  }}
  onCancel={(obj) => { console.log(obj); }}
>
```

The parameter `obj` contains the following meta information

```js
{
  "hookType": "cancel",
  "cursor": {
    "selectionStart",
    "selectionEnd",
    "top",
    "left",
    "height"
  }
}
```

### onType

This prop takes a function that will trigger everytime the user continues typing after starting the trigger. The function is passed some meta information about the cursor's position, as well as the text that the user has typed after triggering that you can use.

```jsx
<InputTrigger
  trigger={{
    keyCode: 50,
    shiftKey: true,
  }}
  onType={(obj) => { console.log(obj); }}
>
```

The parameter `obj` contains the following meta information

```js
{
  "hookType": "typing",
  "cursor": {
    "selectionStart",
    "selectionEnd",
    "top",
    "left",
    "height"
  },
  "text"
}
```

### endTrigger

This prop takes a function that returns a function that you need to keep in your parent component. This returned method needs to be called manually by the parent component whenever you are done using the trigger and want to end the trigger.

```jsx
<InputTrigger
  endTrigger={
    endTriggerHandler => {
      this.endTriggerHandler = endTriggerHandler;

      /*
        Now you can call `this.endTriggerHandler`
        anywhere inside the parent component
        whenever you want to stop the trigger!
      */
    }
  }
>
```

## Other Examples

<details>
 <summary>Setting the inputRef in a React 15+ class Component</summary>

```jsx
import React from 'react';
import InputTrigger from 'react-input-trigger';

class Example extends React.Component {
  constructor() {
    super();
    this.inputElement = null;
  }

  render() {
    return (
      <InputTrigger
        inputRef={() => this.inputElement}
      >
        <textarea ref={(node) => this.inputElement = node;} />
      </InputTrigger>
    );
  }
}
```
</details>

<details>
 <summary>Setting the inputRef in a React 16+ class Component</summary>

```jsx
import React from 'react';
import InputTrigger from 'react-input-trigger';

class Example extends React.Component {
  constructor() {
    super();
    this.inputElement = React.createRef();
  }

  render() {
    return (
      <InputTrigger
        inputRef={() => this.inputElement}
      >
        <textarea ref={this.inputElement} />
      </InputTrigger>
    );
  }
}
```
</details>

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
