# React Input Trigger

React component for handling character triggers inside textareas and input fields. 🐼

Useful for building applications that need Slack-like emoji suggestions (triggered by typing `:`) or Github-like user mentions (triggered by typing `@`).

The component provides the following hooks:

* `onStart`: whenever the trigger is first activated (eg. when `@` is first typed).
* `onType`: when something is being typed after it's been triggered.
* `onCancel`: when the trigger is canceled.

The hooks pass some meta-data such as the cursor position and/or the text that has been typed since the trigger has been activated.

![reactinputtrigger](https://user-images.githubusercontent.com/6417910/36937827-0e615e4e-1f3f-11e8-9623-c4141bda3d2e.gif)

## Demo

A live demo of this component can be found [here](https://abinavseelan.com/react-input-trigger)

## Usage

### Getting Started

* Import the component from the package.

```js
import InputTrigger from 'react-input-trigger';
```

* Wrap your existing `<textarea />` or `<input />` element with `<InputTrigger />`

```jsx
<InputTrigger>
  <textarea />
</InputTrigger>
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
