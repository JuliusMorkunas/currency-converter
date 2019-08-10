import React from 'react';
import { render } from '@testing-library/react';
import Switch from './Switch';

it('Switch should match snapshot', () => {
  const { asFragment } = render(<Switch onClick={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});
