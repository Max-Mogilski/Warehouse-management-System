import ShopLayout from '@/layouts/shop/ShopLayout';
import styles from './OrderDetailsPage.module.scss';
import Bar from '@/components/shop/bar/Bar';
import Button from '@/components/shop/button/Button';
import ButtonBack from '@/components/shop/button/ButtonBack';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/shared/input/FormInput';
import { useEffect, useState } from 'react';
import {
  validateEmail,
  validateFilledInput,
  validateFullName,
  validatePostCode,
} from '@/utils/globalValidation';
import { useCartStore } from '@/stores/cartStore';
import { usePlaceOrder } from './query';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../shop-page/queries';
import { defaultSchema, schemaFiller } from '@/config/api';

const OrderDetailsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm();
  const [error, setError] = useState<null | string>(null);
  const store = useCartStore((state) => state);
  const placeOrderMutation = usePlaceOrder(queryKeys.productsLists());
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (store.cart.length === 0) {
      toast.error("Orders can't be placed without items");
      return;
    }
    const products = store.cart.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });
    placeOrderMutation.mutate(
      schemaFiller({ ...data, products }, defaultSchema.order),
      {
        onSuccess: (res) => {
          store.clearCart();
          navigate(`/shop/transaction/${res.id}`);
        },
        onError: (error) => {
          toast.error(error as string);
        },
      }
    );
  };
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    const requiredFields = ['fullName', 'email', 'address', 'city', 'postcode'];
    const isFilled = requiredFields.every((field) => dirtyFields[field]);
    setIsFormFilled(isFilled);
  }, [Object.values(dirtyFields)]);

  return (
    <ShopLayout>
      <ButtonBack big={false} navigateTo="/shop/cart" />
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
        disabled={!isFormFilled || placeOrderMutation.isLoading}
        content={placeOrderMutation.isLoading ? 'Loading' : 'Pay'}
      />
    </ShopLayout>
  );
};

export default OrderDetailsPage;
