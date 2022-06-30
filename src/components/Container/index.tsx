import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={classNames(styles.wrapper, className)}>{children}</div>;
};

export default Container;
