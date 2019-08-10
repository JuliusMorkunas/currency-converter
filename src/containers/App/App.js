import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import s from './App.module.scss';
import {
  initialize,
  onChangeAmountFrom,
  onChangeAmountTo,
  toggleCurrencyFrom,
  toggleCurrencyTo,
  switchCurrencies,
  selectCurrencyFrom,
  selectCurrencyTo,
  getRate,
} from '../../redux/modules/converter';
import CurrencySelector from '../../components/CurrencySelector';
import Switch from '../../components/Switch';
import AmountInput from '../../components/AmountInput';
import Disclaimer from '../../components/Disclaimer';
import ExchangeRate from '../../components/ExchangeRate';
import Button from '../../components/Button';
import { formatToCurrency } from '../../utils/helpers';

const LABELS = {
  from: 'From',
  to: 'To',
  amount: 'Amount',
  converted: 'Converted to',
};
const INPUT_DEBOUNCE_MS = 500;
const ENTER_KEY_CODE = 13;

export function App({
  currencies,
  currencyFrom,
  currencyTo,
  isOpenFrom,
  isOpenTo,
  isInitialized,
  amountFrom,
  amountTo,
  rate,
  initialize,
  onChangeAmountFrom,
  onChangeAmountTo,
  toggleCurrencyFrom,
  toggleCurrencyTo,
  switchCurrencies,
  selectCurrencyFrom,
  selectCurrencyTo,
  getRate,
}) {
  // TODO: Might want to use exact calculations from API instead of doing math on the client side based on fetched rate
  const [debouncedOnChangeAmountFrom] = useDebouncedCallback(async value => {
    const rate = await getRate();
    onChangeAmountTo(formatToCurrency(rate ? value * rate : 0));
  }, INPUT_DEBOUNCE_MS);
  const [debouncedOnChangeAmountTo] = useDebouncedCallback(async value => {
    const rate = await getRate();
    onChangeAmountFrom(formatToCurrency(rate ? value / rate : 0));
  }, INPUT_DEBOUNCE_MS);

  const onInitialInputKeyDown = e => {
    if (e.keyCode === ENTER_KEY_CODE) {
      initialize();
    }
  };

  useEffect(() => {
    getRate && getRate();
  }, [getRate]);

  return (
    <div className={s.Container}>
      <div className={s.CurrencySelectorsContainer}>
        <CurrencySelector
          currencies={currencies}
          currency={currencyFrom}
          label={LABELS.from}
          isOpen={isOpenFrom}
          onToggle={toggleCurrencyFrom}
          onSelect={selectCurrencyFrom}
        />
        <Switch onClick={switchCurrencies} />
        <CurrencySelector
          currencies={currencies}
          currency={currencyTo}
          label={LABELS.to}
          isOpen={isOpenTo}
          onToggle={toggleCurrencyTo}
          onSelect={selectCurrencyTo}
        />
      </div>
      {isInitialized ? (
        <>
          <div className={s.AmountInputsContainer}>
            <AmountInput
              label={LABELS.amount}
              currency={currencyFrom}
              value={amountFrom}
              onChange={({ target: { value } }) => {
                if (isNaN(value)) {
                  return;
                }
                onChangeAmountFrom(value);
                debouncedOnChangeAmountFrom(value);
              }}
            />
            <AmountInput
              label={LABELS.converted}
              currency={currencyTo}
              value={amountTo}
              onChange={({ target: { value } }) => {
                if (isNaN(value)) {
                  return;
                }
                onChangeAmountTo(value);
                debouncedOnChangeAmountTo(value);
              }}
            />
          </div>
          <ExchangeRate currencyFrom={currencyFrom} currencyTo={currencyTo} rate={rate} />
          <Disclaimer>
            All figures are live mid-market rates, which are for informational purposes only. To see
            the rates for money transfer, please select sending money option.
          </Disclaimer>
        </>
      ) : (
        <>
          <div className={s.InitialAmountInputContainer}>
            <AmountInput
              label={LABELS.amount}
              currency={currencyFrom}
              value={amountFrom}
              onKeyDown={onInitialInputKeyDown}
              onChange={({ target: { value } }) => {
                if (isNaN(value)) {
                  return;
                }
                onChangeAmountFrom(value);
                debouncedOnChangeAmountFrom(value);
              }}
              autoFocus
            />
          </div>
          <Button onClick={initialize}>Convert</Button>
        </>
      )}
    </div>
  );
}

const ConnectedApp = connect(
  ({ converter }) => ({ ...converter }),
  {
    initialize,
    onChangeAmountFrom,
    onChangeAmountTo,
    toggleCurrencyFrom,
    toggleCurrencyTo,
    switchCurrencies,
    selectCurrencyFrom,
    selectCurrencyTo,
    getRate,
  },
)(App);

App.propTypes = {
  currencies: PropTypes.array.isRequired,
  currencyFrom: PropTypes.string.isRequired,
  currencyTo: PropTypes.string.isRequired,
  isOpenFrom: PropTypes.bool.isRequired,
  isOpenTo: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  amountFrom: PropTypes.string.isRequired,
  amountTo: PropTypes.string.isRequired,
  rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialize: PropTypes.func.isRequired,
  onChangeAmountFrom: PropTypes.func.isRequired,
  onChangeAmountTo: PropTypes.func.isRequired,
  toggleCurrencyFrom: PropTypes.func.isRequired,
  toggleCurrencyTo: PropTypes.func.isRequired,
  switchCurrencies: PropTypes.func.isRequired,
  selectCurrencyFrom: PropTypes.func.isRequired,
  selectCurrencyTo: PropTypes.func.isRequired,
  getRate: PropTypes.func.isRequired,
};

export default ConnectedApp;
