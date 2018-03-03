import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getHookObject(element, startPoint) {
  const result = {
    cursor: {
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
    },
  };

  if (!startPoint) {
    return result;
  }

  result.text = element.value.substr(startPoint, element.selectionStart);

  return result;
}

class InputTrigger extends Component {
  constructor(args) {
    super(args);

    this.state = {
      triggered: false,
      triggerStartPosition: null,
    };

    this.handleTrigger = this.handleTrigger.bind(this);
    this.resetState = this.resetState.bind(this);
    this.element = this.props.elementRef;
  }

  componentWillMount() {
    this.props.endTrigger(this.resetState);
  }

  handleTrigger(event) {
    const {
      trigger,
      onStartHook,
      onCancelHook,
      onTypeHook,
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
            onStartHook(getHookObject(this.element));
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
            onCancelHook(getHookObject(this.element));
          }, 0);
        });

        return null;
      }

      setTimeout(() => {
        onTypeHook(getHookObject(this.element, triggerStartPosition));
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
    const { elementRef, children } = this.props;

    return (
      <div
        role="button"
        tabIndex={-1}
        onKeyDown={this.handleTrigger}
      >
        {
          !elementRef
            ? (
              React.Children.map(this.props.children, child => (
                React.cloneElement(child, {
                  ref: (element) => { this.element = element; },
                })
              ))
            )
            : (
              children
            )
        }
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
  onStartHook: PropTypes.func,
  onCancelHook: PropTypes.func,
  onTypeHook: PropTypes.func,
  endTrigger: PropTypes.func,
  children: PropTypes.element.isRequired,
  elementRef: PropTypes.element,
};

InputTrigger.defaultProps = {
  trigger: {
    keyCode: null,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
  },
  onStartHook: () => {},
  onCancelHook: () => {},
  onTypeHook: () => {},
  endTrigger: () => {},
  elementRef: null,
};

export default InputTrigger;
