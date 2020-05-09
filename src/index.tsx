/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';

import { TriggerConfiguration, TriggerEvent } from '@src/types';
import { createTrigger } from '@src/trigger';

interface InputTriggerOwnProps {
  trigger: TriggerConfiguration;
  onInputTrigger?: (data: TriggerEvent) => void;
  endTrigger?: (callback: () => void) => void;
}

export type InputTriggerProps = React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & PropsWithChildren<InputTriggerOwnProps>;

const InputTrigger: React.FC<InputTriggerProps> = (props: React.PropsWithChildren<InputTriggerProps>) => {
  const { children, trigger, onInputTrigger, ...rest } = props;
  const triggerRef = React.useRef(createTrigger(trigger)).current;

  useEffect(() => {
    if (typeof props.endTrigger === 'function') {
      props.endTrigger(() => { triggerRef.endTrigger(); });
    }
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    const { value, selectionEnd } = target;

    if (typeof selectionEnd === 'number') {
      const triggered = triggerRef.isTriggered();
      const triggerObject = getCaretCoordinates(target, selectionEnd);
      if (!triggered && triggerRef.isStartOfTrigger(event)) {
        triggerRef.startTrigger(selectionEnd as number);
        if (typeof onInputTrigger === 'function') {
          onInputTrigger({
            hookType: 'start',
            cursor: triggerObject,
          });
        }
      } else if (triggered) {
        if (typeof onInputTrigger === 'function') {
          onInputTrigger({
            hookType: 'typing',
            cursor: triggerObject,
            text: {
              value: value.substring(triggerRef.getCurrentSelectionStart() as number),
              content: value.substring(triggerRef.getCurrentSelectionStart() as number + 1),
            },
          });
        }

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

InputTrigger.propTypes = {
  trigger: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  onInputTrigger: PropTypes.func,
  endTrigger: PropTypes.func,
};

export default InputTrigger;
