import React from 'react';
import CharacterRow from './CharacterRow';

import styles from './styles.module.scss';

type Props = {
  characters: Array<CharacterType>;
  gender: string;
  filter: string;
};

const CharacterTable: React.FC<Props> = ({ characters, gender, filter }) => {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.overflow}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th scope="col" className={styles.th}>
                    Character
                  </th>
                  <th scope="col" className={styles.th}>
                    Alive
                  </th>
                  <th scope="col" className={styles.th}>
                    Gender
                  </th>
                  <th scope="col" className={styles.th}>
                    Culture
                  </th>
                  <th scope="col" className={styles.th}>
                    Allegiances
                  </th>
                </tr>
              </thead>
              <tbody>
                {characters !== undefined &&
                  characters
                    .filter(
                      item =>
                        (filter && filter.length > 0
                          ? item.culture.toLowerCase().includes(filter.toLowerCase())
                          : true) &&
                        (gender.toLowerCase() !== 'all' ? item.gender.toLowerCase() === gender.toLowerCase() : true)
                    )
                    .map((character: CharacterType, index) => <CharacterRow key={index} character={character} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterTable;
