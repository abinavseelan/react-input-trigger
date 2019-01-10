/// <reference types="react" />

declare module 'react-input-trigger' {
  interface Trigger {
    keyCode?: number | null;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
  }

  type hookType = 'start' | 'cancel' | 'typing';

  export interface Result {
    hookType: hookType;
    cursor: {
      selectionStart: number;
      selectionEnd: number;
      top: number;
      left: number;
      height: number;
    };
    text?: string;
  }

  declare class InputTrigger extends React.Component<InputTrigger.Props> {}

  declare namespace InputTrigger {
    function handleTrigger(
      event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ): null;

    interface Props {
      trigger?: Trigger;
      onStart?(obj: Result): void;
      onCancel?(obj: Result): void;
      onType?(obj: Result): void;
      endTrigger?(resetState: () => void): void;
      elementRef?: HTMLTextAreaElement | HTMLInputElement | null;
    }
  }

  export default InputTrigger;
}
