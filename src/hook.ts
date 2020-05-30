import React, { useState, useCallback, useRef } from 'react';

import { checkActiveTrigger, generateTriggers, endActiveTrigger } from './trigger';
import { TriggerConfiguration, TriggerEvent } from './types';

interface Options {
  escToCancel?: boolean;
}

const useInputTrigger = (triggers: TriggerConfiguration[], options?: Options) => {
  const [state, updateState] = useState<TriggerEvent | null>(null);

  const triggersList = useRef(generateTriggers(triggers));

  const inputTriggerHandler = useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    const activeTrigger = checkActiveTrigger(event, triggersList.current);

    if (activeTrigger) {
      if (event.key === 'Escape' && options?.escToCancel) {
        endActiveTrigger(activeTrigger.id, this.triggers);
        updateState(null);

        return;
      }
      updateState(activeTrigger);
    }
  }, []);

  const endTrigger = useCallback((id) => {
    endActiveTrigger(id, triggersList.current);
    updateState(null);
  }, []);

  return {
    triggerState: state,
    inputTriggerHandler,
    endTrigger,
  };
};

export default useInputTrigger;
