import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';

import { ReactComponent as SelectIcon } from '../../assets/icons/select.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  options: SelectOptionType[];
  selectedItem: SelectOptionType;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectOptionType>>;
  link: boolean;
  className?: string;
};

const Select: React.FC<Props> = ({ className = '', options, selectedItem, setSelectedItem, link }) => {
  return (
    <div className={classNames(className)}>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className={styles.contentWrapper}>
          <Listbox.Button className={styles.listBoxButton}>
            <span className={styles.selectedItem}>{selectedItem.label}</span>
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
                      {link === true && item.label !== 'No allegiances' ? (
                        <Link
                          to="/housedetails"
                          className={classNames(styles.text, {
                            [styles.selected]: selected,
                          })}
                          state={{ homeAPI: item.value }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          className={classNames(styles.text, {
                            [styles.selected]: selected,
                          })}
                        >
                          {item.label}
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
