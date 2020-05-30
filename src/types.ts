export interface Caret {
  top: number;
  left: number;
  height: number;
}

export interface TriggerConfiguration {
  /** Unique identifier for the trigger */
  id: string;
  key: string;
  shiftKey?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
}

export interface TriggerBaseEvent {
  cursor: Caret;
  id: string;
}

export interface TriggerStartEvent extends TriggerBaseEvent {
  hookType: 'start';
}

export interface TriggerKeyboardEvent extends TriggerBaseEvent {
  hookType: 'typing';
  text: {
    value: string;
    content: string;
  };
}

export interface TriggerCancelEvent extends TriggerBaseEvent {
  hookType: 'cancel';
}

export type TriggerEvent = TriggerStartEvent | TriggerKeyboardEvent | TriggerCancelEvent;
