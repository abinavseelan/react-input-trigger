import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getHookObject, safeElement } from './utils';

class InputTrigger extends Component {
  constructor(args) {
    super(args);

    this.state = {
      triggered: false,
      triggerStartPosition: null,
    };

    this.handleTrigger = this.handleTrigger.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getElement = this.getElement.bind(this);
  }

  componentDidMount() {
    this.props.endTrigger(this.resetState);
  }

  getElement() {
    return safeElement(this.props.inputRef());
  }

  handleTrigger(event) {
    const {
      trigger,
      onStart,
      onCancel,
      onType,
    } = this.props;

    const {
      which,
      shiftKey,
      metaKey,
      ctrlKey,
    } = event;

    const { selectionStart } = event.target;
    const { triggered, triggerStartPosition } = this.state;

    if (!triggered) {
      if (
        which === trigger.keyCode &&
        shiftKey === !!trigger.shiftKey &&
        ctrlKey === !!trigger.ctrlKey &&
        metaKey === !!trigger.metaKey
      ) {
        this.setState({
          triggered: true,
          triggerStartPosition: selectionStart + 1,
        }, () => {
          setTimeout(() => {
            onStart(getHookObject('start', this.getElement()));
          }, 0);
        });
        return null;
      }
    } else {
      if (which === 8 && selectionStart <= triggerStartPosition) {
        this.setState({
          triggered: false,
          triggerStartPosition: null,
        }, () => {
          setTimeout(() => {
            onCancel(getHookObject('cancel', this.getElement()));
          }, 0);
        });

        return null;
      }

      setTimeout(() => {
        onType(getHookObject('typing', this.getElement(), triggerStartPosition));
      }, 0);
    }

    return null;
  }

  resetState() {
    this.setState({
      triggered: false,
      triggerStartPosition: null,
    });
  }

  render() {
    const {
      children,
      endTrigger,
      onCancel,
      onStart,
      onType,
      trigger,
      inputRef,
      ...rest
    } = this.props;

    return (
      <div
        role="textbox"
        tabIndex={-1}
        onKeyDown={this.handleTrigger}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

InputTrigger.propTypes = {
  trigger: PropTypes.shape({
    keyCode: PropTypes.number,
    shiftKey: PropTypes.bool,
    ctrlKey: PropTypes.bool,
    metaKey: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,

  // handlers
  onStart: PropTypes.func,
  onCancel: PropTypes.func,
  onType: PropTypes.func,
  endTrigger: PropTypes.func,
  inputRef: PropTypes.func.isRequired,
};

InputTrigger.defaultProps = {
  trigger: {
    keyCode: null,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
  },
  onStart: () => { },
  onCancel: () => { },
  onType: () => { },
  endTrigger: () => { },
};

export default InputTrigger;
