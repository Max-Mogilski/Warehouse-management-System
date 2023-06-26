import Loader from '@/components/loader/Loader';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductsList.module.scss';

const ProductsList = ({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          url={product.url}
          name={product.name}
          price={product.price}
          stock={product.quantity}
        />
      ))}
    </div>
  );
};

export default ProductsList;
