import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';

function getHookObject(type, element, startPoint) {
  const caret = getCaretCoordinates(element, element.selectionEnd);

  const result = {
    hookType: type,
    cursor: {
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
      top: caret.top,
      left: caret.left,
      height: caret.height,
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
    this.findInput = this.findInput.bind(this);
  }


  componentDidMount() {
    this.props.endTrigger(this.resetState);
    this.element = this.findInput();
  }

  findInput() {
    if (this.props.getElement) {
      return this.props.getElement(this);
    }
    if (this.childElemnt instanceof Element && ['INPUT', 'TEXTAREA'].find(tag => tag === this.childElemnt.tagName)) {
      return this.childElemnt;
    }
    const inputs = this.div.getElementsByTagName('input');
    if (inputs.length) {
      return inputs[0];
    }
    const textareas = this.div.getElementsByTagName('textarea');
    if (textareas.length) {
      return textareas[0];
    }
    return null;// Would like to warn, but lint disallowed console logs.
    // console.warn('Multiple or no inputs detected', inputs);
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
            onStart(getHookObject('start', this.element));
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
            onCancel(getHookObject('cancel', this.element));
          }, 0);
        });

        return null;
      }

      setTimeout(() => {
        onType(getHookObject('typing', this.element, triggerStartPosition));
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
      getElement,
      children,
      trigger,
      onStart,
      onCancel,
      onType,
      endTrigger,
      ...rest
    } = this.props;

    return (
      <div
        role="textbox"
        tabIndex={-1}
        onKeyDown={this.handleTrigger}
        ref={(el) => {
          this.div = el;
        }}
        {...rest}
      >
        {
          !getElement
            ? (
              React.Children.map(this.props.children, child => (
                React.cloneElement(child, {
                  ref: (element) => {
                    this.childElemnt = element;
                    if (typeof child.ref === 'function') {
                      child.ref(element);
                    }
                  },
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
  onStart: PropTypes.func,
  onCancel: PropTypes.func,
  onType: PropTypes.func,
  endTrigger: PropTypes.func,
  children: PropTypes.element.isRequired,
  getElement: PropTypes.func,
};

InputTrigger.defaultProps = {
  trigger: {
    keyCode: null,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
  },
  onStart: () => {},
  onCancel: () => {},
  onType: () => {},
  endTrigger: () => {},
  getElement: undefined,
};

export default InputTrigger;
