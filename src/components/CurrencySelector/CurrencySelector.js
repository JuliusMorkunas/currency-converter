import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import s from './CurrencySelector.module.scss';
import { useOnClickOutside } from '../../utils/hooks';
import Label from '../Label';

const CurrencySelector = ({
  currency = '',
  currencies = [],
  label = '',
  isOpen = false,
  onToggle,
  onSelect,
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    isOpen && onToggle(false);
  });

  return (
    <div className={[s.Container, isOpen ? s.IsOpen : ''].join(' ')} ref={ref}>
      <Label onClick={() => onToggle(!isOpen)}>{label}</Label>
      <div className={s.InputContainer} onClick={() => onToggle(!isOpen)}>
        <div className={s.SelectedCurrencyContainer}>
          <div className={[s.CurrencyIcon, s[currency]].join(' ')} />
          <div className={s.CurrencyName}>{currency}</div>
        </div>
        <span className={s.DropdownArrow} />
      </div>
      {isOpen && (
        <div className={s.DropdownContainer}>
          <div className={s.Dropdown}>
            {currencies
              .filter(item => item !== currency)
              .map(currency => (
                <div
                  key={currency}
                  className={s.Option}
                  role="button"
                  tabIndex="0"
                  onClick={() => onSelect(currency)}
                >
                  <div className={[s.CurrencyIcon, s[currency]].join(' ')} />
                  <div className={s.CurrencyName}>{currency}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

CurrencySelector.propTypes = {
  currency: PropTypes.string,
  currencies: PropTypes.array,
  label: PropTypes.string,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
};

export default CurrencySelector;
