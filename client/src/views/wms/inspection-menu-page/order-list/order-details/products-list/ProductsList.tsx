import { useParams } from 'react-router-dom';
import styles from './ProductsList.module.scss';
import { useOrderProductsQuery } from './query';
import { useEffect } from 'react';

const ProductsList = () => {
  const { id } = useParams();
  const { data } = useOrderProductsQuery(id!);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={styles.container}>
      <ul>
        {data?.map((product: any) => {
          return (
            <li className={styles.product}>
              <p>Product Name: {product.name}</p>
              <p>Product id: {product.productId}</p>
              <p>
                Price: {product.price} x {product.quantity}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
