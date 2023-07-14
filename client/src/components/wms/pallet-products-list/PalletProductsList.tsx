import styles from './PalletProductsList.module.scss';
import { usePalletProductsQuery } from './query';

const PalletProductsList = ({ palletId }: { palletId: string }) => {
  const { data } = usePalletProductsQuery(palletId);

  return (
    <div className={styles.container}>
      <ul>
        {data?.map((product: any) => {
          return (
            <li className={styles.product} key={product.productId}>
              <p>Product Name: {product.product.name}</p>
              <p>Product id: {product.product.id}</p>
              <p>Quantity: {product.quantity}</p>
            </li>
          );
        })}
      </ul>
      {data?.length === 0 && <p>Pallet is empty!</p>}
    </div>
  );
};

export default PalletProductsList;
