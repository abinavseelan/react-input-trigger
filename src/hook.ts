import React, { useState, useCallback, useRef } from 'react';

import { checkActiveTrigger, generateTriggers, endActiveTrigger } from './trigger';
import { TriggerConfiguration, TriggerEvent } from './types';

const useInputTrigger = (triggers: TriggerConfiguration[]) => {
  const [state, updateState] = useState<TriggerEvent | null>(null);

  const triggersList = useRef(generateTriggers(triggers));

  const inputTriggerHandler = useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    const activeTrigger = checkActiveTrigger(event, triggersList.current);

    if (activeTrigger) {
      updateState(activeTrigger);
    }
  }, []);

  const endTrigger = useCallback((id) => {
    endActiveTrigger(id, triggersList.current);
  }, []);

  return {
    triggerState: state,
    inputTriggerHandler,
    endTrigger,
  };
}

export default useInputTrigger;
