import React from 'react';
import { render } from '@testing-library/react';
import Disclaimer from './Disclaimer';

it('Disclaimer should match snapshot', () => {
  const { asFragment } = render(<Disclaimer />);
  expect(asFragment()).toMatchSnapshot();
});
