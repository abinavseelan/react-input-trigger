import React from 'react';
import InputTrigger from '@src/index';
import { render, fireEvent } from '@testing-library/react';

const Example = ({ onInputTrigger, endTrigger }) => {
  return (
    <InputTrigger
      trigger={{
        key: '@',
      }}
      onInputTrigger={onInputTrigger}
      endTrigger={endTrigger}
    >
      <textarea id='input-textarea' data-testid='input-textarea' />
    </InputTrigger>
  );
};

it('works with textarea', () => {
  const onInputTrigger = jest.fn();
  const endTrigger = jest.fn();

  const { getByTestId } = render(<Example onInputTrigger={onInputTrigger} endTrigger={endTrigger} />);
  const textArea = getByTestId('input-textarea');

  fireEvent.keyPress(textArea as HTMLTextAreaElement, { key: '@', code: 'Digit2' });

  expect(onInputTrigger).toBeCalledWith(null);
});
