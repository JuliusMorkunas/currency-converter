import React from 'react';
import s from './Button.module.scss';

const Button = ({ children, ...rest }) => {
  return (
    <button {...rest} className={s.Button}>
      {children}
    </button>
  );
};

export default Button;
