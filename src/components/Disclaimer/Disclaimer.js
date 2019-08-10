import React from 'react';
import s from './Disclaimer.module.scss';

const Disclaimer = ({ children }) => {
  return <p className={s.Disclaimer}>{children}</p>;
};

export default Disclaimer;
