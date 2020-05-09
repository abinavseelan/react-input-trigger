import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';


function getHookObject(type, element, startPoint) {
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
}

// class InputTrigger extends Component {
//   constructor(args) {
//     super(args);

//     this.state = {
//       triggered: false,
//       triggerStartPosition: null,
//     };

//     this.handleTrigger = this.handleTrigger.bind(this);
//     this.resetState = this.resetState.bind(this);
//     this.element = this.props.elementRef;
//   }

//   componentDidMount() {
//     this.props.endTrigger(this.resetState);
//   }

//   handleTrigger(event) {
//     const {
//       trigger,
//       onStart,
//       onCancel,
//       onType,
//     } = this.props;

//     const {
//       which,
//       shiftKey,
//       metaKey,
//       ctrlKey,
//     } = event;

//     const { selectionStart } = event.target;
//     const { triggered, triggerStartPosition } = this.state;

//     if (!triggered) {
//       if (
//         which === trigger.keyCode &&
//         shiftKey === !!trigger.shiftKey &&
//         ctrlKey === !!trigger.ctrlKey &&
//         metaKey === !!trigger.metaKey
//       ) {
//         this.setState({
//           triggered: true,
//           triggerStartPosition: selectionStart + 1,
//         }, () => {
//           setTimeout(() => {
//             onStart(getHookObject('start', this.element));
//           }, 0);
//         });
//         return null;
//       }
//     } else {
//       if (which === 8 && selectionStart <= triggerStartPosition) {
//         this.setState({
//           triggered: false,
//           triggerStartPosition: null,
//         }, () => {
//           setTimeout(() => {
//             onCancel(getHookObject('cancel', this.element));
//           }, 0);
//         });

//         return null;
//       }

//       setTimeout(() => {
//         onType(getHookObject('typing', this.element, triggerStartPosition));
//       }, 0);
//     }

//     return null;
//   }

//   resetState() {
//     this.setState({
//       triggered: false,
//       triggerStartPosition: null,
//     });
//   }

//   render() {
//     const {
//       elementRef,
//       children,
//       trigger,
//       onStart,
//       onCancel,
//       onType,
//       endTrigger,
//       ...rest
//     } = this.props;

//     return (
//       <div
//         role="textbox"
//         tabIndex={-1}
//         onKeyDown={this.handleTrigger}
//         {...rest}
//       >
//         {
//           !elementRef
//             ? (
//               React.Children.map(this.props.children, child => (
//                 React.cloneElement(child, {
//                   ref: (element) => {
//                     this.element = element;
//                     if (typeof child.ref === 'function') {
//                       child.ref(element);
//                     }
//                   },
//                 })
//               ))
//             )
//             : (
//               children
//             )
//         }
//       </div>
//     );
//   }
// }

// InputTrigger.propTypes = {
//   trigger: PropTypes.shape({
//     keyCode: PropTypes.number,
//     shiftKey: PropTypes.bool,
//     ctrlKey: PropTypes.bool,
//     metaKey: PropTypes.bool,
//   }),
//   onStart: PropTypes.func,
//   onCancel: PropTypes.func,
//   onType: PropTypes.func,
//   endTrigger: PropTypes.func,
//   children: PropTypes.element.isRequired,
//   elementRef: PropTypes.element,
// };

// InputTrigger.defaultProps = {
//   trigger: {
//     keyCode: null,
//     shiftKey: false,
//     ctrlKey: false,
//     metaKey: false,
//   },
//   onStart: () => {},
//   onCancel: () => {},
//   onType: () => {},
//   endTrigger: () => {},
//   elementRef: null,
// };

interface TriggerConfiguration {
  id: string;
  key: string;
  shiftKey: string;
  ctrlKey: string;
  metaKey: string;
}

interface CursorMeta {
  selectionStart: number;
  selectionEnd: number;
  top: number;
  left: number;
  height: number;
}

interface TriggerStartEvent {
  hookType: 'start';
  cursor: CursorMeta;
}

interface TriggerKeyboardEvent {
  hookType: 'typing';
  cursor: CursorMeta;
  text: {
    value: string;
    content: string;
  }
}

interface TriggerCancelEvent {
  hookType: 'cancel';
  cursor: CursorMeta;
  text: {
    value: string;
    content: string;
  }
}

type TriggerEvent = TriggerStartEvent | TriggerKeyboardEvent | TriggerCancelEvent;

interface InputTriggerProps {
  trigger: TriggerConfiguration;
  onInputTrigger: (data: TriggerEvent) => void;
  endTrigger: (callback: () => void) => void;
}


const createTrigger = () => {
  let triggered: boolean = false;
  let selectionStart: number | null = null;

  const startTrigger = (currentSelectionStart: number) => {
    triggered = true; selectionStart = currentSelectionStart;
    console.log("startTrigger -> currentSelectionStart", currentSelectionStart);
  };

  const endTrigger = () => { triggered = false; selectionStart = null; };

  const isTriggered = () => triggered === true;
  const getCurrentSelectionStart = () => selectionStart;

  return { endTrigger, startTrigger, isTriggered, getCurrentSelectionStart };
}

const InputTrigger: React.FC<InputTriggerProps> = (props: React.PropsWithChildren<InputTriggerProps>) => {
  const { children, trigger, onInputTrigger } = props;
  const triggerRef = React.useRef(createTrigger()).current;

  useEffect(() => {
    if (typeof props.endTrigger === 'function') {
      props.endTrigger(() => { triggerRef.endTrigger(); });
    }
  }, []);

  const handleKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    const {
      key,
    } = event;
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    const {
      value,
      selectionEnd,
    } = target;
    const triggered = triggerRef.isTriggered();

    if (!triggered && key === trigger.key) {
      const triggerObject = getCaretCoordinates(target, selectionEnd);
      triggerRef.startTrigger(selectionEnd as number);
      onInputTrigger({
        hookType: 'start',
        cursor: triggerObject,
      });
    } else if (triggered) {
      const triggerObject = getCaretCoordinates(target, selectionEnd);

      onInputTrigger({
        hookType: 'typing',
        cursor: triggerObject,
        text: {
          value: value.substring(triggerRef.getCurrentSelectionStart() as number),
          content: value.substring(triggerRef.getCurrentSelectionStart() as number + 1),
        },
      });
    }
  },[]);

  return (
    <span
      onKeyPressCapture={handleKeyPress}
    >
      {children}
    </span>
  );
};

export default InputTrigger;
