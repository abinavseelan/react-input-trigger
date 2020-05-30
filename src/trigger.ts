import type React from 'react';
import { TriggerConfiguration } from '@src/types';

const compare = ['key', 'shiftKey', 'ctrlKey', 'metaKey', 'altKey'];

const getTriggerConfiguration = (inputTrigger: TriggerConfiguration) => {
  const trigger: TriggerConfiguration = {
    shiftKey: undefined,
    metaKey: undefined,
    ctrlKey: undefined,
    altKey: undefined,
    ...inputTrigger,
  }
  return trigger;
};

export const createTrigger = (inputTrigger: TriggerConfiguration) => {
  let triggered = false;
  let selectionStart: number | null = null;
  const trigger: TriggerConfiguration = getTriggerConfiguration(inputTrigger);

  const startTrigger = (currentSelectionStart: number) => {
    triggered = true; selectionStart = currentSelectionStart;
  };

  const endTrigger = () => { triggered = false; selectionStart = null; };
  const isStartOfTrigger = (event: React.KeyboardEvent) => compare.every(key => {
    if (trigger[key] === undefined) {
      return true;
    }
    return event[key] === trigger[key]
  });

  const isTriggered = () => triggered === true;
  const getCurrentSelectionStart = () => selectionStart;

  return { endTrigger, startTrigger, isTriggered, getCurrentSelectionStart, isStartOfTrigger };
};
