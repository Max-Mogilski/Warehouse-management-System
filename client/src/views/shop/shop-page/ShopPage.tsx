import ProductsList from '../../../components/shop/products-list/ProductsList';
import SummaryTile from '../../../components/shop/summary-tile/SummaryTile';
import { useProductsQuery } from './queries';
import ShopLayout from '@/layouts/ShopLayout';
import Bar from '@/components/shop/bar/Bar';

const ShopPage = () => {
  const { data } = useProductsQuery();

  return (
    <ShopLayout>
      <h2>What do you buy today?</h2>
      <ProductsList products={data} />
      <Bar />
      <SummaryTile />
    </ShopLayout>
  );
};

export default ShopPage;
