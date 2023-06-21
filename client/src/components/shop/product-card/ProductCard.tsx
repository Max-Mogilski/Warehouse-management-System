import styles from './ProductCard.module.scss';
import React from 'react';
import plusIcon from '../../../assets/icons/plus.svg';
import { ProductCardProps } from './types';
import { toast } from 'react-hot-toast';

const ProductCard = ({ url, name, stockQuantity, price }: ProductCardProps) => {
  const isAvailable = stockQuantity > 0;

  const handleAddToCart = () => {
    toast.success('Added to the cart!');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleAddToCart} className={styles.btn}>
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
