import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
  className?: string;
};
const CustomButton: React.FC<Props> = ({ text, className = '', onClick, disable = false }) => {
  return (
    <button className={classNames(styles.wrapper, className)} onClick={onClick} disabled={disable}>
      {text}
    </button>
  );
};

export default CustomButton;
