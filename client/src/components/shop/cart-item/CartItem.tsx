import styles from './CartItem.module.scss';
import React, { useEffect } from 'react';
import basketIcon from '../../../assets/icons/basket.svg';
import plusIcon from '../../../assets/icons/plus-black.svg';
import minusIcon from '../../../assets/icons/minus.svg';
import { toast } from 'react-hot-toast';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/stores/types';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CartItem = ({ product, delay }: { product: Product, delay: number }) => {
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
    </motion.div>
  );
};

export default CartItem;
