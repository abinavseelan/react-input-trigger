import type React from 'react';
import getCaretCoordinates from 'textarea-caret';

import { TriggerConfiguration, TriggerEvent } from './types';

const compare = ['key', 'shiftKey', 'ctrlKey', 'metaKey', 'altKey'];

const getNow = Date.now;

const getTriggerConfiguration = (inputTrigger: TriggerConfiguration) => {
  const trigger: TriggerConfiguration = {
    shiftKey: undefined,
    metaKey: undefined,
    ctrlKey: undefined,
    altKey: undefined,
    ...inputTrigger,
  };

  if (typeof trigger.id === 'undefined') {
    trigger.id = getNow().toString();
  }

  return trigger;
};

export const createTrigger = (inputTrigger: TriggerConfiguration) => {
  let triggered = false;
  let selectionStart: number | null = null;
  const trigger: TriggerConfiguration = getTriggerConfiguration(inputTrigger);

  const startTrigger = (currentSelectionStart: number) => {
    triggered = true;
    selectionStart = currentSelectionStart;
  };

  const endTrigger = () => {
    triggered = false;
    selectionStart = null;
  };
  const isStartOfTrigger = (event: React.KeyboardEvent) =>
    compare.every((key) => {
      if (trigger[key] === undefined) {
        return true;
      }
      return event[key] === trigger[key];
    });

  const isTriggered = () => triggered === true;
  const getCurrentSelectionStart = () => selectionStart;
  const getId = () => trigger.id;

  return { endTrigger, startTrigger, isTriggered, getCurrentSelectionStart, isStartOfTrigger, getId };
};

export const generateTriggers = (inputTriggers: TriggerConfiguration[]) => inputTriggers.map(createTrigger);

export type TriggersState = ReturnType<typeof generateTriggers>;

export const checkActiveTrigger = (
  event: React.KeyboardEvent<HTMLSpanElement>,
  triggers: TriggersState
): TriggerEvent | null => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  const { value, selectionEnd } = target;

  if (typeof selectionEnd === 'number') {
    const triggered = triggers.find((trigger) => trigger.isTriggered());
    const triggerObject = getCaretCoordinates(target, selectionEnd);

    if (!triggered) {
      const possibleTrigger = triggers.find((trigger) => trigger.isStartOfTrigger(event));

      if (typeof possibleTrigger !== 'undefined') {
        possibleTrigger.startTrigger(selectionEnd as number);

        return {
          id: possibleTrigger.getId(),
          hookType: 'start',
          cursor: {
            ...triggerObject,
          },
        };
      }
    } else if (triggered) {
      return {
        id: triggered.getId(),
        hookType: 'typing',
        cursor: triggerObject,
        text: {
          value: value.substring(triggered.getCurrentSelectionStart() as number),
          content: value.substring((triggered.getCurrentSelectionStart() as number) + 1),
        },
      };
    }
  }

  return null;
};

export const endActiveTrigger = (triggersList: TriggersState) => {
  const triggerToEnd = triggersList.find((trigger) => trigger.isTriggered());
  if (typeof triggerToEnd !== 'undefined') {
    triggerToEnd.endTrigger();
    return triggerToEnd;
  }

  return;
};
