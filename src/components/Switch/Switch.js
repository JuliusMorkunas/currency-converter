import React from 'react';
import PropTypes from 'prop-types';
import s from './Switch.module.scss';

const Switch = ({ onClick }) => {
  return (
    <button className={s.Button} onClick={onClick}>
      <span className={s.Icon} />
    </button>
  );
};

Switch.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Switch;
