import styles from './CartItem.module.scss';
import React from 'react';
import basketIcon from '../../../assets/icons/basket.svg';
import plusIcon from '../../../assets/icons/plus-black.svg';
import minusIcon from '../../../assets/icons/minus.svg';
import { toast } from 'react-hot-toast';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/stores/types';

const CartItem = ({ product }: { product: Product }) => {
  const isAvailable = product.quantity! >= product.stock;

  const useStore = useCartStore((state) => state);

  const handleIncrement = () => {
    if (isAvailable) {
      toast.error("Couldn't add this item due to stock quantity!");
      return;
    }
    useStore.addToCart(product);
  };

  const handleDecrement = () => useStore.decrementProductQuantity(product);

  const handleRemove = () => {
    useStore.removeFromCart(product);
    toast.success('Item removed!');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleRemove} className={styles.btn}>
        <img src={basketIcon} />
      </button>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${product.url})` }}
      />
      <p className={styles.name}>{product.name}</p>
      <div className={styles.quantity}>
        <button onClick={handleDecrement} className={styles['btn-action']}>
          <img src={minusIcon} />
        </button>
        <p className={styles.total}>{product.quantity}</p>
        <button onClick={handleIncrement} className={styles['btn-action']}>
          <img src={plusIcon} />
        </button>
      </div>
      <p className={styles.price}>{product.price} PLN</p>
    </div>
  );
};

export default CartItem;
