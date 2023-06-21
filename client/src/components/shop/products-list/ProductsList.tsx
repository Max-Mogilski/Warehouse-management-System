import ProductCard from '../product-card/ProductCard';
import styles from './ProductsList.module.scss';

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          url={product.url}
          name={product.name}
          price={product.price}
          stockQuantity={product.quantity}
        />
      ))}
    </div>
  );
};

export default ProductsList;
