import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getHookObject(element) {
  return {
    cursor: {
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
    },
  };
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
    const { trigger, onStartHook } = this.props;
    const { which } = event;
    const { selectionStart } = event.target;

    if (which === trigger.keyCode) {
      this.setState({
        triggered: true,
        triggerStartPosition: selectionStart,
      }, () => {
        onStartHook(getHookObject(this.element));
      });

      return null;
    }
  }

  resetState() {
    this.setState({
      triggered: false,
      triggerStartPosition: null
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
  onStartHook: () => { },
  endTrigger: () => {},
  elementRef: null,
};

export default InputTrigger;
