import { ReactNode } from 'react';
import styles from './ShopLayout.module.scss';

const ShopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles['shop-layout']}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ShopLayout;
