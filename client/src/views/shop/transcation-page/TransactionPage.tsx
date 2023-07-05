import ShopLayout from '@/layouts/ShopLayout';
import Loader from '@/components/shared/loader/Loader';
import styles from './TransactionPage.module.scss';
import { useState } from 'react';
import SuccessAnimation from './SuccessAnimation';
import Button from '@/components/shop/button/Button';

const TransactionPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 2000);

  return (
    <ShopLayout>
      {isLoading ? (
        <div className={styles.loader}>
          <h2>PROCESSING PAYMENT</h2>
          <Loader />
        </div>
      ) : (
        <div className={styles.success}>
          <h2>Order Placed</h2>
          <SuccessAnimation />
          <Button navigateTo="/shop" content="Get Back" />
        </div>
      )}
    </ShopLayout>
  );
};

export default TransactionPage;
