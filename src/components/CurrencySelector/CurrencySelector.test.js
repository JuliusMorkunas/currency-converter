import React from 'react';
import { render } from '@testing-library/react';
import CurrencySelector from './CurrencySelector';

it('CurrencySelector should match snapshot', () => {
  const { asFragment } = render(<CurrencySelector />);
  expect(asFragment()).toMatchSnapshot();
});
