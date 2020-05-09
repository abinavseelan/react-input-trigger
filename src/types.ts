export interface Caret {
  top: number;
  left: number;
  height: number;
}

export interface TriggerConfiguration {
  key: string;
}

export interface TriggerStartEvent {
  hookType: 'start';
  cursor: Caret;
}

export interface TriggerKeyboardEvent {
  hookType: 'typing';
  cursor: Caret;
  text: {
    value: string;
    content: string;
  };
}

export interface TriggerCancelEvent {
  hookType: 'cancel';
  cursor: Caret;
  text: {
    value: string;
    content: string;
  };
}

export type TriggerEvent = TriggerStartEvent | TriggerKeyboardEvent | TriggerCancelEvent;
