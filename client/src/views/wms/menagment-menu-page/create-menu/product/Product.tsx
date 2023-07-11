import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Product.module.scss';
import FormInput from '@/components/shared/input/FormInput';
import ScannerComponent from '@/components/wms/scanner-component/ScannerComponent';
import WmsButton from '@/components/wms/wms-button/WmsButton';
import { useEffect, useState } from 'react';
import { useScanner } from '@/stores/scannerStore';
import { useCreateProductMutation } from './query';
import { defaultSchema, schemaFiller } from '@/config/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm();
  const navigate = useNavigate();
  const scannerState = useScanner();
  const [isFormFilled, setIsFormFilled] = useState(false);
  const productMutation = useCreateProductMutation();

  const createProduct: SubmitHandler<FieldValues> = (data) => {
    productMutation.mutate(
      schemaFiller(
        { ...data, price: +data.price, weight: +data.weight },
        defaultSchema.product
      ),
      {
        onSuccess: (data) => {
          toast.success('Product has been added!');
          navigate('/cms');
        },
      }
    );
  };

  const handleScannerSuccess = (value: string) => {
    setValue('id', value);
  };

  useEffect(() => {
    scannerState.setOnScanned(handleScannerSuccess);
  }, []);

  useEffect(() => {
    const requiredFields = ['name', 'url', 'price'];
    const isFilled = requiredFields.every((field) => dirtyFields[field]);
    setIsFormFilled(isFilled);
  }, [Object.values(dirtyFields)]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(createProduct)}>
        <FormInput
          id="name"
          name="name"
          placeholder="Product Name"
          control={control}
          error={errors.name}
          required={true}
          rules={{
            required: 'This field is required!',
          }}
        />
        <FormInput
          id="url"
          name="url"
          placeholder="Image Url"
          control={control}
          error={errors.url}
          required={true}
          rules={{
            required: 'This field is required!',
          }}
        />
        <div className={styles.row}>
          <FormInput
            id="price"
            name="price"
            placeholder="Price"
            control={control}
            error={errors.price}
            required={true}
            type="number"
            rules={{
              required: 'This field is required!',
            }}
          />
          <FormInput
            id="weight"
            name="weight"
            placeholder="Weight (kg)"
            control={control}
            type="number"
            error={errors.weight}
          />
        </div>
        <ScannerComponent
          control={control}
          name={'id'}
          placeholder="Product ID"
          errors={errors}
        />
        <WmsButton
          disabled={!isFormFilled || productMutation.isLoading}
          type="submit"
        >
          {productMutation.isLoading ? 'Loading' : 'Confirm'}
        </WmsButton>
      </form>
    </div>
  );
};

export default Product;
