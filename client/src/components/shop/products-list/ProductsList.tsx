import React from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductsList.module.scss';

const ProductsList = ({
  products,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <ProductCard
          delay={products[1].id === product.id ? 0.35 : 0}
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
