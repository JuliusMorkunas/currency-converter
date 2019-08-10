import React from 'react';
import PropTypes from 'prop-types';
import s from './ExchangeRate.module.scss';

const ExchangeRate = ({ rate, currencyFrom, currencyTo }) => {
  return (
    <div className={s.Container}>
      <span className={s.Decoration} />
      <span className={s.ExchangeRate}>
        1 {currencyFrom} = {!rate ? '...' : rate} {currencyTo}
      </span>
    </div>
  );
};

ExchangeRate.propTypes = {
  rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currencyFrom: PropTypes.string,
  currencyTo: PropTypes.string,
};

export default ExchangeRate;
