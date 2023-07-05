import CartItem from '@/components/shop/cart-item/CartItem';
import ShopLayout from '@/layouts/ShopLayout';
import { useCartStore } from '@/stores/cartStore';
import styles from './CartPage.module.scss';
import Bar from '@/components/shop/bar/Bar';
import emptyCart from '@/assets/icons/empty-cart.svg';
import Button from '@/components/shop/button/Button';
import ButtonBack from '@/components/shop/button/ButtonBack';

const Cart = () => {
  const store = useCartStore((state) => state);
  const isCartEmpty = store.totalItems > 0;

  return (
    <ShopLayout>
      <ButtonBack big={false} navigateTo="/shop" />
      <h2>Summary of Your Order</h2>
      <div className={styles.list}>
        {store.cart.map((item) => (
          <CartItem
            product={item}
            key={item.id}
            delay={store?.cart[1]?.id === item.id ? 0.5 : 0}
          />
        ))}
      </div>
      {!isCartEmpty && <img className={styles.empty} src={emptyCart} />}
      <Bar />
      <div className={styles.summary}>
        <p className={styles.total}>Total</p>
        <p className={styles.amount}>{store.totalPrice.toFixed(2)} PLN</p>
      </div>
      <Button
        content="Continue"
        disabled={!isCartEmpty}
        navigateTo="/shop/details"
      />
    </ShopLayout>
  );
};

export default Cart;
