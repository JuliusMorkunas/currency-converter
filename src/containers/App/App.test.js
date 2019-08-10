import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { App } from './App';

const props = {
  currencies: ['eur', 'gbp'],
  currencyFrom: 'eur',
  currencyTo: 'gbp',
  isOpenFrom: false,
  isOpenTo: false,
  isInitialized: false,
  amountFrom: '0',
  amountTo: '0',
  rate: '1',
  initialize: () => {},
  onChangeAmountFrom: () => {},
  onChangeAmountTo: () => {},
  toggleCurrencyFrom: () => {},
  toggleCurrencyTo: () => {},
  switchCurrencies: () => {},
  selectCurrencyFrom: () => {},
  selectCurrencyTo: () => {},
  getRate: () => {},
};

describe('Uninitialized App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render correctly', () => {
    const { asFragment } = render(<App {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Uninitialized App', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<App {...props} isInitialized={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
