import React from 'react';
import PropTypes from 'prop-types';
import s from './AmountInput.module.scss';
import Label from '../Label';

const AmountInput = ({
  label = '',
  currency = '',
  defaultValue,
  value,
  onChange,
  onKeyDown,
  autoFocus,
}) => {
  const id = `amount-${label.replace(/\s/g, '').toLowerCase()}`;
  return (
    <div className={s.Container}>
      <Label htmlFor={id}>{label}</Label>
      <input
        type="text"
        name={id}
        id={id}
        defaultValue={defaultValue}
        value={value}
        className={s.Input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
      <span className={s.Currency}>{currency}</span>
    </div>
  );
};

AmountInput.propTypes = {
  label: PropTypes.string,
  currency: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default AmountInput;
