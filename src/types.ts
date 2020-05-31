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
  id: string;
}

export interface TriggerStartEvent extends TriggerBaseEvent {
  hookType: 'start';
  cursor: Caret;
}

export interface TriggerKeyboardEvent extends TriggerBaseEvent {
  hookType: 'typing';
  cursor: Caret;
  text: {
    value: string;
    content: string;
  };
}

export interface TriggerCancelEvent extends TriggerBaseEvent {
  hookType: 'cancel';
}

export type TriggerEvent = TriggerStartEvent | TriggerKeyboardEvent | TriggerCancelEvent;

export interface EndTriggerMethod {
  (): void;
}
