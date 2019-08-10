import React from 'react';
import { render } from '@testing-library/react';
import AmountInput from './AmountInput';

it('AmountInput should match snapshot', () => {
  const { asFragment } = render(<AmountInput />);
  expect(asFragment()).toMatchSnapshot();
});
