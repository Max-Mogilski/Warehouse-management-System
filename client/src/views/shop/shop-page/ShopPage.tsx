import ProductsList from '../../../components/shop/products-list/ProductsList';
import SummaryTile from '../../../components/shop/summary-tile/SummaryTile';
import { useProductsQuery } from './queries';
import ShopLayout from '@/layouts/shop/ShopLayout';
import Bar from '@/components/shop/bar/Bar';
import Loader from '@/components/shared/loader/Loader';
import styles from './ShopPage.module.scss';

const ShopPage = () => {
  const { data, isLoading } = useProductsQuery();

  return (
    <ShopLayout>
      <h2>What do you buy today?</h2>
      {data?.length === 0 && (
        <div className={styles['loader-container']}>
          <p>No products found!</p>
        </div>
      )}
      {isLoading ? (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      ) : (
        <ProductsList products={data} isLoading={isLoading} />
      )}
      <Bar />
      <SummaryTile />
    </ShopLayout>
  );
};

export default ShopPage;
