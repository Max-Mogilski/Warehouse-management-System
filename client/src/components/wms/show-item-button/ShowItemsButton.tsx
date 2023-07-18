import { ReactNode, useState } from 'react';
import styles from './ShowItemsButton.module.scss';
import ArrowUpIcon from '@/assets/icons/upper-arrow.svg';
import ArrowDownIcon from '@/assets/icons/arrow.svg';
import Loader from '@/components/shared/loader/Loader';

const ShowItemsButton = ({
  children,
  listNode,
  initOpen = false,
}: {
  children: ReactNode;
  listNode: ReactNode;
  initOpen: boolean;
}) => {
  const [isClicked, setIsClicked] = useState(initOpen);
  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsClicked((prev) => !prev)}
        className={styles.btn}
      >
        {isClicked ? 'Hide' : 'Show'} {children}{' '}
        <img
          className={styles.arrow}
          src={isClicked ? ArrowUpIcon : ArrowDownIcon}
        />
      </button>
      {isClicked && listNode}
    </div>
  );
};

export default ShowItemsButton;
