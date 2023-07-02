import ShopLayout from '@/layouts/ShopLayout';
import styles from './OrderDetailsPage.module.scss';
import Bar from '@/components/shop/bar/Bar';
import Button from '@/components/shop/button/Button';
import ButtonBack from '@/components/shop/button/ButtonBack';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/input/FormInput';
import { useEffect, useState } from 'react';
import {
  validateEmail,
  validateFilledInput,
  validateFullName,
  validatePostCode,
} from '@/utils/globalValidation';
import { useCartStore } from '@/stores/cartStore';

const OrderDetailsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm();
  const [error, setError] = useState<null | string>(null);
  const store = useCartStore((state) => state);

  const cartItems = store.cart.map((product) => product.id);

  const onSubmit = (data: any) => console.log(data, cartItems);
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    const requiredFields = ['fullName', 'email', 'address', 'city', 'postcode'];
    const isFilled = requiredFields.every((field) => dirtyFields[field]);
    setIsFormFilled(isFilled);
  }, [Object.values(dirtyFields)]);

  return (
    <ShopLayout>
      <ButtonBack navigateTo="/shop/cart" />
      <h2>Order Details</h2>
      <form className={styles.form}>
        <FormInput
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          control={control}
          error={errors.fullName}
          required={true}
          color="#fef6f2"
          rules={{
            required: 'Full Name is required',
            validate: validateFullName,
          }}
        />
        <FormInput
          id="email"
          name="email"
          placeholder="Email"
          control={control}
          error={errors.email}
          required={true}
          animationDelay={0.1}
          color="#fef6f2"
          rules={{
            required: 'Email is required',
            validate: validateEmail,
          }}
        />
        <FormInput
          id="address"
          name="address"
          placeholder="Address (House No. Building)"
          control={control}
          error={errors.address}
          required={true}
          animationDelay={0.2}
          color="#fef6f2"
          rules={{
            required: true,
            validate: validateFilledInput,
          }}
        />
        <div className={styles.row}>
          <FormInput
            id="city"
            name="city"
            placeholder="City"
            control={control}
            required={true}
            animationDelay={0.4}
            color="#fef6f2"
            rules={{
              required: true,
              validate: validateFilledInput,
            }}
          />
          <FormInput
            id="postcode"
            name="postcode"
            placeholder="Postcode"
            control={control}
            required={true}
            animationDelay={0.4}
            color="#fef6f2"
            rules={{
              required: true,
              validate: validatePostCode,
            }}
          />
        </div>
        {errors.postcode && typeof errors.postcode.message === 'string' && (
          <p className={styles.error}>{errors.postcode.message}</p>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <Bar />
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormFilled}
        content="Pay"
      />
    </ShopLayout>
  );
};

export default OrderDetailsPage;
