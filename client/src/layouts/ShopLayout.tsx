import { ReactNode } from 'react';
import styles from './ShopLayout.module.scss';
import { motion } from 'framer-motion';

const ShopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles['shop-layout']}>
      <div className={styles.content}>
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className={styles['content-animation']}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopLayout;
