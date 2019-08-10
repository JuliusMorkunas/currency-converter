import React from 'react';
import { render } from '@testing-library/react';
import Label from './Label';

it('Label should match snapshot', () => {
  const { asFragment } = render(<Label />);
  expect(asFragment()).toMatchSnapshot();
});
