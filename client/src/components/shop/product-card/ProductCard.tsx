import styles from './ProductCard.module.scss';
import React, { useState } from 'react';
import plusIcon from '../../../assets/icons/plus.svg';
import { ProductCardProps } from './types';
import { toast } from 'react-hot-toast';
import { useCartStore } from '@/stores/cartStore';

const ProductCard = ({ url, name, stock, price, id }: ProductCardProps) => {
  const cartStore = useCartStore((state) => state);
  const currentItem = cartStore.cart.find((item) => item.id === id);
  let isAvailable = false;
  if (stock)
    isAvailable = currentItem ? stock - currentItem?.quantity! > 0 : true;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("Couldn't add this item due to stock quantity!");
      return;
    }
    cartStore.addToCart({ url, name, quantity: 0, id, price, stock });
    toast.success('Added to the cart!');
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleAddToCart}
        disabled={!isAvailable}
        className={styles.btn}
      >
        <img src={plusIcon} />
      </button>
      <div className={styles.img} style={{ backgroundImage: `url(${url})` }} />
      <p className={styles.name}>{name}</p>
      <p className={styles.availability}>
        {isAvailable ? 'In stock' : 'Out of stock'}
      </p>
      <p className={styles.price}>{price} PLN</p>
    </div>
  );
};

export default ProductCard;
