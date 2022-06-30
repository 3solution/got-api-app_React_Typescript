import React from 'react';

import Container from '../../components/Container';

import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <p className={styles.wrapper}>GoT API App</p>
      {children}
    </Container>
  );
};

export default MainLayout;
