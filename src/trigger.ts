export const createTrigger = () => {
  let triggered = false;
  let selectionStart: number | null = null;

  const startTrigger = (currentSelectionStart: number) => {
    triggered = true; selectionStart = currentSelectionStart;
  };

  const endTrigger = () => { triggered = false; selectionStart = null; };

  const isTriggered = () => triggered === true;
  const getCurrentSelectionStart = () => selectionStart;

  return { endTrigger, startTrigger, isTriggered, getCurrentSelectionStart };
};
