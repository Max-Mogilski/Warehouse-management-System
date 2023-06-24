import { useCartStore } from '@/stores/cartStore';
import cartIcon from '../../../assets/icons/cart.svg';
import styles from './SummaryTile.module.scss';
import { useNavigate } from 'react-router-dom';

const SummaryTile = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems);
  return (
    <button className={styles.container} onClick={() => navigate('cart')}>
      <div
        className={styles['cart-btn']}
        style={{ backgroundImage: `url(${cartIcon})` }}
      >
        <div className={styles['cart-quantity']}>{totalItems}</div>
      </div>
      <div className={styles['payment-btn']}>Proceed to Checkout</div>
    </button>
  );
};

export default SummaryTile;
