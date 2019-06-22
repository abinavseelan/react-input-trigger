import getCaretCoordinates from 'textarea-caret';

/**
 * Runs some soft-validations & triggers warnings accordingly.
 * @returns {Object} the input/textarea element
 * @param {Object} element The ref returned via `props.inputRef`
 */
export const safeElement = (element) => {
  if (!element || typeof element !== 'object') {
    console.warn(`
      react-input-trigger: element ref not set correctly. Did you forget to return the ref in your 'inputRef' function?
    `);
  }

  if (typeof element.selectionEnd === 'undefined' || typeof element.selectionStart === 'undefined') {
    console.warn(`
      react-input-trigger: selectionStart/selectionEnd is missing in element ref. Please ensure the ref returned from
      'inputRef' is a valid input or textarea element
    `);
  }

  if (element && Object.hasOwnProperty.call(element, 'current')) {
    return element.current;
  }

  return element;
};

/**
 * Returns the hook object with meta-information regarding the hook.
 * @param {String} type hook-type
 * @param {Object} element the input/textarea element
 * @param {Number} startPoint start of the hook
 */
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
