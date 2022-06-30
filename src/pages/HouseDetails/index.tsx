import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './styles.module.scss';

const HouseDetails = () => {
  const [homeDetails, setHomeDetails] = useState<HouseDetailsType>();
  const { state }: { state: any } = useLocation();

  const getHomeDetailsData = () => {
    axios.get(`https://www.anapioficeandfire.com/api/houses/${state.homeAPI}`).then(res => {
      setHomeDetails({
        name: res.data.name,
        region: res.data.region,
        costOfArms: res.data.costOfArms,
        words: res.data.words,
        titles: res.data.titles,
        seats: res.data.seats,
        diedOut: res.data.dieOut,
        overlord: res.data.overlord,
        cadetBranches: res.data.cadetBranches.length,
      });
    });
  };

  useEffect(() => {
    getHomeDetailsData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <p className={styles.title}>Name of the House:</p>
        <p className={styles.value}>{homeDetails?.name}</p>
        <p className={styles.title}>Region:</p>
        <p className={styles.value}>{homeDetails?.region}</p>
        <p className={styles.title}>Coat of Arms:</p>
        <p className={styles.value}>{homeDetails?.costOfArms}</p>
        <p className={styles.title}>Words:</p>
        <p className={styles.value}>{homeDetails?.words}</p>
        <p className={styles.title}>Titles:</p>
        <div className={styles.value}>
          {homeDetails?.titles.map(item => (
            <p className={styles.array}>{`- ${item}`}</p>
          ))}
        </div>
        <p className={styles.title}>Seats:</p>
        <p className={styles.value}>
          {homeDetails?.seats.map(item => (
            <p className={styles.value}>{`- ${item}`}</p>
          ))}
        </p>
        <p className={styles.title}>Has died out:</p>
        <p className={styles.value}>{homeDetails?.diedOut}</p>
        <p className={styles.title}>Has overlord:</p>
        <p className={styles.value}>{homeDetails?.overlord}</p>
        <p className={styles.title}>Number of Cadet Branches:</p>
        <p className={styles.value}>{homeDetails?.cadetBranches}</p>
      </div>
      <div className={styles.backButtonWrapper}>
        <Link to="/" className={styles.button}>
          Go to Character Page
        </Link>
      </div>
    </div>
  );
};

export default HouseDetails;
