import { TriggerConfiguration } from '@src/types';

const compare = ['key', 'shiftKey', 'ctrlKey', 'metaKey', 'altKey'];

export const createTrigger = (inputTrigger: TriggerConfiguration) => {
  let triggered = false;
  let selectionStart: number | null = null;
  const trigger: TriggerConfiguration = {
    shiftKey: false,
    metaKey: false,
    ctrlKey: false,
    altKey: false,
    ...inputTrigger,
  }

  const startTrigger = (currentSelectionStart: number) => {
    triggered = true; selectionStart = currentSelectionStart;
  };

  const endTrigger = () => { triggered = false; selectionStart = null; };
  const isStartOfTrigger = (event: React.KeyboardEvent) => compare.every(key => event[key] === trigger[key]);

  const isTriggered = () => triggered === true;
  const getCurrentSelectionStart = () => selectionStart;

  return { endTrigger, startTrigger, isTriggered, getCurrentSelectionStart, isStartOfTrigger };
};
