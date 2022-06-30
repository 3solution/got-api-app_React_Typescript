import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';

import CharacterTable from '../../components/CharacterTable';
import CustomButton from '../../components/CustomButton';
import Select from '../../components/Select';

import styles from './styles.module.scss';

const pageSize: Array<string> = ['10', '25', '50'];

const gender: Array<string> = ['All', 'Male', 'Female'];

const TableOfCharacters = () => {
  const [selectedPageSize, setSelectedPageSize] = useState<string>(pageSize[0]);
  const [selectedGender, setSelectedGender] = useState<string>(gender[0]);
  // const [selectedLink, setSelectedLink] = useState<string>('No');
  const [pageNum, setPageNum] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [characters, setCharacters] = useState<Array<CharacterType>>([]);

  const getCharacterData = async (size: number, num: number) => {
    const res = await axios.get(`https://www.anapioficeandfire.com/api/characters`, {
      params: {
        pageSize: size,
        page: num,
      },
    });
    setCharacters([
      ...res.data.map((item: any) => {
        const nameString: string =
          item.name + item.aliases.length > 0 && item.name !== '' ? ',' : '' + item.aliases.join(',');

        const bornYear = item.born.match(/\d+/g);
        const diedYear = item.died.match(/\d+/g);

        let aliveString = '';

        if (item.born === '' && item.died === '') {
          aliveString = 'Unknown';
        } else if (item.born === '') {
          aliveString = 'No';
        } else if (item.died !== '') {
          if (bornYear !== null && diedYear != null) {
            const startAge = Math.min(...diedYear) - Math.max(...bornYear);
            const endAge = Math.max(...diedYear) - Math.min(...bornYear);
            aliveString = `No, died at ${startAge === endAge ? startAge : `${startAge} to ${endAge}`} years old`;
          } else {
            aliveString = 'No';
          }
        } else aliveString = 'Yes';

        return {
          name: nameString,
          alive: aliveString,
          gender: item.gender,
          culture: item.culture === '' ? 'Unknown' : item.culture,
          allegiances:
            item.allegiances.length === 0
              ? ['No allegiances']
              : item.allegiances.map((aItem: any) => aItem.match(/\d+/g)[0]),
        };
      }),
    ]);
  };

  useEffect(() => {
    getCharacterData(parseInt(selectedPageSize), pageNum);
  }, [selectedPageSize, pageNum]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div className={styles.filter}>
          <p className={styles.label}>Filter: </p>
          <input
            type="text"
            className={styles.input}
            value={filter}
            placeholder="input Culture"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
          />
        </div>
        <Select
          className={styles.genderSelect}
          options={gender}
          selectedItem={selectedGender}
          setSelectedItem={setSelectedGender}
          link={false}
        />
      </div>
      <CharacterTable characters={characters} gender={selectedGender} filter={filter} />
      <div className={styles.pagenationWrapper}>
        <div className={styles.pageNumWrapper}>
          <Select
            options={pageSize}
            className={styles.pageNumSelect}
            selectedItem={selectedPageSize}
            setSelectedItem={setSelectedPageSize}
            link={false}
          />
          <p className={styles.pageNum}>{pageNum} page</p>
        </div>
        <div className={styles.pagenation}>
          <CustomButton
            text="First page"
            onClick={() => {
              setPageNum(1);
            }}
            className={'rounded-l-md'}
          />
          <CustomButton
            text="Prev page"
            onClick={() => {
              setPageNum(prev => prev - 1);
            }}
            disable={pageNum === 1 ? true : false}
          />
          <CustomButton
            text="Next page"
            onClick={() => {
              setPageNum(prev => prev + 1);
            }}
            disable={
              (selectedPageSize === '10' && pageNum === 214) ||
              (selectedPageSize === '25' && pageNum === 85) ||
              (selectedPageSize === '50' && pageNum === 43)
                ? true
                : false
            }
          />
          <CustomButton
            text="Last page"
            onClick={() => {
              setPageNum(selectedPageSize === '10' ? 214 : selectedPageSize === '25' ? 85 : 43);
            }}
            className={'rounded-r-md'}
          />
        </div>
      </div>
    </div>
  );
};

export default TableOfCharacters;
