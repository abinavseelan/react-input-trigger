import React from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';

import { TriggerConfiguration, TriggerEvent } from '@src/types';
import { noop } from './util';
import { generateTriggers } from './trigger';

interface InputTriggerOwnProps {
  triggers: TriggerConfiguration[];
  onInputTrigger?: (data: TriggerEvent) => void;
  endTrigger?: (callback: (id: string) => void) => void;
}

export type InputTriggerProps = React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & React.PropsWithChildren<InputTriggerOwnProps>;
export type TriggersState = ReturnType<typeof generateTriggers>;

class ReactInputTrigger extends React.Component<InputTriggerProps> {
  static defaultProps = {
    triggers: [{
      key: '@',
      id: 'mention',
    }],
    onInputTrigger: noop,
    endTrigger: noop,
  }

  static propTypes = {
    triggers: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onInputTrigger: PropTypes.func,
    endTrigger: PropTypes.func,
  }

  triggers: TriggersState;

  constructor(props: InputTriggerProps) {
    super(props);
    this.triggers = generateTriggers(props.triggers);
  }

  componentDidMount() {
    if (typeof this.props.endTrigger === 'function') {
      this.props.endTrigger(id => {
        const triggerToEnd = this.triggers.find(trigger => trigger.getId() === id);
        if (typeof triggerToEnd !== 'undefined') {
          triggerToEnd.endTrigger();
        }
      })
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    const { value, selectionEnd } = target;
    const { onInputTrigger } = this.props;
    if (typeof selectionEnd === 'number') {
      const triggered = this.triggers.find(trigger => trigger.isTriggered());
      const triggerObject = getCaretCoordinates(target, selectionEnd);

      if (!triggered) {
        const possibleTrigger = this.triggers.find(trigger => trigger.isStartOfTrigger(event));

        if (typeof possibleTrigger !=='undefined') {
          possibleTrigger.startTrigger(selectionEnd as number);
          if (typeof onInputTrigger === 'function') {
            onInputTrigger({
              id: possibleTrigger.getId(),
              hookType: 'start',
              cursor: {
                ...triggerObject
              },
            });
          }
        }
      } else if (triggered && typeof onInputTrigger === 'function') {
        onInputTrigger({
          id: triggered.getId(),
          hookType: 'typing',
          cursor: triggerObject,
          text: {
            value: value.substring(triggered.getCurrentSelectionStart() as number),
            content: value.substring(triggered.getCurrentSelectionStart() as number + 1),
          },
        });
      }
    }
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, triggers, onInputTrigger, endTrigger, ...rest } = this.props;

    return (
      <span
        {...rest}
        onKeyDownCapture={this.handleKeyDown}
      >
        {children}
      </span>
    );
  }
}

export default ReactInputTrigger;
