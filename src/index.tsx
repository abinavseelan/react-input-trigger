/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';

import { TriggerConfiguration, TriggerEvent } from '@src/types';
import { generateTriggers } from '@src/trigger';

interface InputTriggerOwnProps {
  triggers: TriggerConfiguration[];
  onInputTrigger?: (data: TriggerEvent) => void;
  endTrigger?: (callback: (id: string) => void) => void;
}

const noop = () => {};

export type InputTriggerProps = React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & PropsWithChildren<InputTriggerOwnProps>;

const InputTrigger: React.FC<InputTriggerProps> = (props: React.PropsWithChildren<InputTriggerProps>) => {
  const { children, triggers, onInputTrigger, endTrigger, ...rest } = props;
  const triggersRef = React.useRef(generateTriggers(triggers)).current;

  useEffect(() => {
    if (typeof endTrigger === 'function') {
      endTrigger((id) => {
        const triggerToEnd = triggersRef.find(trigger => trigger.getId() === id);
        if (typeof triggerToEnd !== 'undefined') {
          triggerToEnd.endTrigger();
        }
      });
    }
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    const { value, selectionEnd } = target;

    if (typeof selectionEnd === 'number') {
      const triggered = triggersRef.find(trigger => trigger.isTriggered());
      const triggerObject = getCaretCoordinates(target, selectionEnd);

      if (!triggered) {
        const possibleTrigger = triggersRef.find(trigger => trigger.isStartOfTrigger(event));
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
  },[]);

  return (
    <span
      {...rest}
      onKeyDownCapture={handleKeyDown}
    >
      {children}
    </span>
  );
};


InputTrigger.defaultProps = {
  triggers: [{
    key: '@',
    id: 'mention',
  }],
  onInputTrigger: noop,
  endTrigger: noop,
};

InputTrigger.propTypes = {
  triggers: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onInputTrigger: PropTypes.func,
  endTrigger: PropTypes.func,
};

export default InputTrigger;
