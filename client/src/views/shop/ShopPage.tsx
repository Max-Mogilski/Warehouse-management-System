import styles from './ShopPage.module.scss';
import ProductsList from '../../components/shop/products-list/ProductsList';
import SummaryTile from '../../components/shop/summary-tile/SummaryTile';
import { useProductsQuery } from './queries';

const ShopPage = () => {
  const { data } = useProductsQuery();

  return (
    <div className={styles['shop-layout']}>
      <div className={styles.content}>
        <h2>What do you buy today?</h2>
        <ProductsList products={data} />
        <div className={styles.bar} />
        <SummaryTile />
      </div>
    </div>
  );
};

export default ShopPage;
