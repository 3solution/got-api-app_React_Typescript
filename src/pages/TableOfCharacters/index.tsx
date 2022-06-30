import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';

import CharacterTable from '../../components/CharacterTable';
import CustomButton from '../../components/CustomButton';
import Select from '../../components/Select';

import styles from './styles.module.scss';

const pageSize: SelectOptionType[] = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
];

const gender: SelectOptionType[] = [
  { label: 'All', value: 'All' },
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const TableOfCharacters = () => {
  const [selectedPageSize, setSelectedPageSize] = useState<SelectOptionType>(pageSize[0]);
  const [selectedGender, setSelectedGender] = useState<SelectOptionType>(gender[0]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [characters, setCharacters] = useState<Array<CharacterType>>();

  const getCharacterData = async (size: number, num: number) => {
    console.log('process.env.REACT_APP_API_Character:', process.env.REACT_APP_API_Character);

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
          houseDetail:
            item.allegiances.length === 0
              ? [{ value: 'No allegiances', label: 'No allegiances' }]
              : item.allegiances.map((aItem: any) => ({
                  label: aItem.match(/\d+/g),
                  value: aItem.match(/\d+/g),
                })),
        };
      }),
    ]);
  };

  useEffect(() => {
    getCharacterData(parseInt(selectedPageSize.value), pageNum);
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
                          (selectedGender.value.toLowerCase() !== 'all'
                            ? item.gender.toLowerCase() === selectedGender.value.toLowerCase()
                            : true)
                      )
                      .map((item, index: number) => (
                        <CharacterTable
                          key={index}
                          character={item.name}
                          alive={item.alive}
                          gender={item.gender}
                          culture={item.culture}
                          allegiances={item.houseDetail}
                          className={index % 2 == 0 ? 'bg-white' : 'bg-gray-50'}
                        />
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
              (selectedPageSize.value === '10' && pageNum === 214) ||
              (selectedPageSize.value === '25' && pageNum === 85) ||
              (selectedPageSize.value === '50' && pageNum === 43)
                ? true
                : false
            }
          />
          <CustomButton
            text="Last page"
            onClick={() => {
              setPageNum(selectedPageSize.value === '10' ? 214 : selectedPageSize.value === '25' ? 85 : 43);
            }}
            className={'rounded-r-md'}
          />
        </div>
      </div>
    </div>
  );
};

export default TableOfCharacters;
