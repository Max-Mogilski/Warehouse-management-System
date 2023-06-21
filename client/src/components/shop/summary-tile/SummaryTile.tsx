import cartIcon from '../../../assets/icons/cart.svg';
import styles from './SummaryTile.module.scss';

const SummaryTile = () => {
  return (
    <button className={styles.container}>
      <div
        className={styles['cart-btn']}
        style={{ backgroundImage: `url(${cartIcon})` }}
      >
        <div className={styles['cart-quantity']}>1</div>
      </div>
      <div className={styles['payment-btn']}>Proceed to Checkout</div>
    </button>
  );
};

export default SummaryTile;
