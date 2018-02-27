import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputTrigger extends Component {
  constructor(args) {
    super(args);

    this.handleTrigger = this.handleTrigger.bind(this);
  }

  handleTrigger(event) {
    const { trigger } = this.props;
    const { which } = event;

    if (which === trigger.keyCode) {
      console.log('Triggered!');
    }
  }

  render() {
    return (
      <div
        role="button"
        tabIndex={-1}
        onKeyDown={this.handleTrigger}
      >
        { this.props.children }
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
  children: PropTypes.element.isRequired,
};

InputTrigger.defaultProps = {
  trigger: {
    keyCode: null,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
  },
};

export default InputTrigger;
