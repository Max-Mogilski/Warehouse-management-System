import styles from './ProductCard.module.scss';
import React, { useEffect, useState } from 'react';
import plusIcon from '../../../assets/icons/plus.svg';
import { ProductCardProps } from './types';
import { toast } from 'react-hot-toast';
import { useCartStore } from '@/stores/cartStore';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductCard = ({
  url,
  name,
  stock,
  price,
  id,
  delay,
}: ProductCardProps) => {
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

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: 'easeOut', delay: delay }}
      className={styles.container}
    >
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
    </motion.div>
  );
};

export default ProductCard;
