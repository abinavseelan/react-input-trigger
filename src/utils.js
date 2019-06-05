/* eslint-disable import/prefer-default-export */
import getCaretCoordinates from 'textarea-caret';

export const safeElement = (element) => {
  if (!element) {
    console.warn('Element ref not set correctly. Have you forgotten to apply setRef to the element?');
    return;
  }

  if (typeof element.selectionEnd === 'undefined' || typeof element.selectionStart === 'undefined') {
    console.warn('selectionStart and / or selectionEnd is missing in element ref. Please ensure that the setRef method is applied to a valid input or textarea element.');
  }
};

export const getHookObject = (type, element, startPoint) => {
  const caret = getCaretCoordinates(element, element.selectionEnd);

  const result = {
    hookType: type,
    cursor: {
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
      top: caret.top,
      left: caret.left,
      height: caret.height,
    },
  };

  if (!startPoint) {
    return result;
  }

  result.text = element.value.substr(startPoint, element.selectionStart);

  return result;
};
