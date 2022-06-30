import React, { useState } from 'react';
import classNames from 'classnames';

import Select from '../Select';

import styles from './styles.module.scss';

type Props = {
  character: string;
  alive: string;
  gender: string;
  culture: string;
  allegiances: SelectOptionType[];
  className?: string;
};

const CharacterTable: React.FC<Props> = ({ character, alive, gender, culture, allegiances, className = '' }) => {
  const [selectedLink, setSelectedLink] = useState<SelectOptionType>({ ...allegiances[0] });

  return (
    <tr className={classNames(styles.wrapper, className)}>
      <td className={styles.tdCharacter}>{character}</td>
      <td className={styles.td}>{alive}</td>
      <td className={styles.td}>{gender}</td>
      <td className={styles.td}>{culture}</td>
      <td className={styles.tdLink}>
        <Select options={allegiances} selectedItem={selectedLink} setSelectedItem={setSelectedLink} link={true} />
      </td>
    </tr>
  );
};

export default CharacterTable;
