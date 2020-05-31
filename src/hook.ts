import React, { useState, useCallback, useRef } from 'react';

import { checkActiveTrigger, generateTriggers, endActiveTrigger } from './trigger';
import { TriggerConfiguration, TriggerEvent, EndTriggerMethod } from './types';

interface Options {
  escToCancel?: boolean;
}

const useInputTrigger = (triggers: TriggerConfiguration[], options?: Options) => {
  const [state, updateState] = useState<TriggerEvent | null>(null);

  const triggersList = useRef(generateTriggers(triggers));

  const inputTriggerHandler = useCallback(<T = HTMLElement>(event: React.KeyboardEvent<T>) => {
    const activeTrigger = checkActiveTrigger<T>(event, triggersList.current);

    if (activeTrigger) {
      if (event.key === 'Escape' && options?.escToCancel) {
        endActiveTrigger(triggersList.current);
        updateState(null);

        return;
      }
      updateState(activeTrigger);
    }
  }, []);

  const endTrigger: EndTriggerMethod = useCallback(() => {
    endActiveTrigger(triggersList.current);
    updateState(null);
  }, []);

  return {
    triggerState: state,
    inputTriggerHandler,
    endTrigger,
  };
};

export default useInputTrigger;
