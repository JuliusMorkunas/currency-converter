import React from 'react';
import { render } from '@testing-library/react';
import ExchangeRate from './ExchangeRate';

it('ExchangeRate should match snapshot', () => {
  const { asFragment } = render(<ExchangeRate />);
  expect(asFragment()).toMatchSnapshot();
});
