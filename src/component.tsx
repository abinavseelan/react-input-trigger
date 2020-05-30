import React from 'react';
import PropTypes from 'prop-types';

import { TriggerConfiguration, TriggerEvent } from './types';
import { noop } from './util';
import { checkActiveTrigger, generateTriggers, endActiveTrigger } from './trigger';

interface InputTriggerOwnProps {
  triggers: TriggerConfiguration[];
  onInputTrigger?: (data: TriggerEvent) => void;
  endTrigger?: (callback: (id: string) => void) => void;
  escToCancel?: boolean;
}

export type InputTriggerProps = React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> &
  React.PropsWithChildren<InputTriggerOwnProps>;
export type TriggersState = ReturnType<typeof generateTriggers>;

class ReactInputTrigger extends React.Component<InputTriggerProps> {
  static defaultProps = {
    triggers: [
      {
        key: '@',
        id: 'mention',
      },
    ],
    onInputTrigger: noop,
    endTrigger: noop,
    escToCancel: false,
  };

  static propTypes = {
    triggers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    onInputTrigger: PropTypes.func,
    endTrigger: PropTypes.func,
    escToCancel: PropTypes.bool,
  };

  triggers: TriggersState;

  constructor(props: InputTriggerProps) {
    super(props);
    this.triggers = generateTriggers(props.triggers);
  }

  componentDidMount() {
    if (typeof this.props.endTrigger === 'function') {
      this.props.endTrigger(this.endTrigger);
    }
  }

  endTrigger = () => {
    const ended = endActiveTrigger(this.triggers);

    if (typeof this.props.onInputTrigger === 'function' && ended) {
      this.props.onInputTrigger({
        id: ended.getId(),
        hookType: 'cancel',
      });
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const activeTrigger = checkActiveTrigger(event, this.triggers);

    const { onInputTrigger, escToCancel } = this.props;

    if (activeTrigger !== null && onInputTrigger) {
      if (event.key === 'Escape' && escToCancel) {
        const ended = endActiveTrigger(this.triggers);

        if (ended) {
          onInputTrigger({
            id: ended.getId(),
            hookType: 'cancel',
          });
        }

        return;
      }

      onInputTrigger(activeTrigger);
    }
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, triggers, onInputTrigger, endTrigger, ...rest } = this.props;

    return (
      <span {...rest} onKeyDownCapture={this.handleKeyDown}>
        {children}
      </span>
    );
  }
}

export default ReactInputTrigger;
