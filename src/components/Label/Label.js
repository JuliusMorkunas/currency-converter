import React from 'react';
import s from './Label.module.scss';

const Label = ({ children, ...rest }) => {
  return (
    <label {...rest} className={s.Label}>
      {children}:
    </label>
  );
};

export default Label;
