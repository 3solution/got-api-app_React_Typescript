import React, { useEffect, useState } from 'react';
import Select from '../../Select';
import styles from './styles.module.scss';

type Props = {
  character: CharacterType;
};

const CharacterRow: React.FC<Props> = ({ character }) => {
  const {
    allegiances: { 0: initialAllegiances },
  } = character;
  const [selectedItem, setSelectedItem] = useState(initialAllegiances);

  useEffect(() => {
    setSelectedItem(initialAllegiances);
  }, [initialAllegiances]);

  return (
    <tr>
      <td className={styles.tdCharacter}>{character.name}</td>
      <td className={styles.td}>{character.alive}</td>
      <td className={styles.td}>{character.gender}</td>
      <td className={styles.td}>{character.culture}</td>
      <td className={styles.tdLink}>
        <Select
          options={character.allegiances}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          link={true}
        />
      </td>
    </tr>
  );
};

export default CharacterRow;
