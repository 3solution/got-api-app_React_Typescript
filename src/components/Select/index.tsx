import React, { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';

import { ReactComponent as SelectIcon } from '../../assets/icons/select.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  options: Array<string>;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  link: boolean;
  className?: string;
};

const Select: React.FC<Props> = ({ className = '', options, selectedItem, setSelectedItem, link }) => {
  return (
    <div className={classNames(className)}>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className={styles.contentWrapper}>
          <Listbox.Button className={styles.listBoxButton}>
            <span className={styles.selectedItem}>{selectedItem}</span>
            <span className={styles.selectedIconWrapper}>
              <SelectIcon className={styles.selectIcon} />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className={classNames(styles.listBoxOptionWrapper)}>
              {options.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    classNames(styles.content, {
                      [styles.active]: active,
                    })
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      {link === true && item !== 'No allegiances' ? (
                        <Link
                          to="/housedetails"
                          className={classNames(styles.text, {
                            [styles.selected]: selected,
                          })}
                          state={{ homeAPI: item }}
                        >
                          {item}
                        </Link>
                      ) : (
                        <span
                          className={classNames(styles.text, {
                            [styles.selected]: selected,
                          })}
                        >
                          {item}
                        </span>
                      )}
                      {selected ? (
                        <span className={styles.icon}>
                          <CheckIcon className={styles.checkIcon} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
