import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

it('Button should match snapshot', () => {
  const { asFragment } = render(<Button />);
  expect(asFragment()).toMatchSnapshot();
});
