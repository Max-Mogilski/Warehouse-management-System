import ScannerComponent from '@/components/wms/scanner-component/ScannerComponent';
import WmsButton from '@/components/wms/wms-button/WmsButton';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './PickItem.module.scss';
import { useItemToPickQuery, usePickItemMutation } from './query';
import { useEffect } from 'react';
import Loader from '@/components/shared/loader/Loader';
import FormInput from '@/components/shared/input/FormInput';
import { defaultSchema, schemaFiller } from '@/config/api';
import { useScanner } from '@/stores/scannerStore';
import { toast } from 'react-hot-toast';

const PickItem = ({ setStep }: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data, isLoading, isFetching } = useItemToPickQuery();
  const pickItemMutation = usePickItemMutation();
  const scannerState = useScanner();

  const clearInputs = () => {
    setValue('productId', '');
    setValue('quantity', '');
  };

  const pickItem: SubmitHandler<FieldValues> = (data) => {
    pickItemMutation.mutate(
      schemaFiller(
        { ...data, quantity: +data.quantity },
        defaultSchema.productToPick
      ),
      {
        onSuccess: (data) => {
          clearInputs();
          if (data?.msg === 'completed') {
            setStep((prev: number) => prev + 1);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.msg);
        },
      }
    );
  };

  const handleScannerSuccess = (value: string) => {
    setValue('productId', value);
  };

  useEffect(() => {
    scannerState.setOnScanned(handleScannerSuccess);
  }, []);

  if (isLoading || pickItemMutation.isLoading || isFetching) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(pickItem)} className={styles.form}>
      <div className={styles.content}>
        <ScannerComponent
          name="productId"
          control={control}
          errors={errors}
          placeholder="Product ID"
        />
        <FormInput
          required={true}
          rules={{ required: true }}
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          control={control}
        />
        <p>Quantity: {data?.quantity}</p>
        <p>Location: {data?.product?.locations}</p>
        <p>Item ID: {data?.productId}</p>
      </div>
      <div className={styles.actions}>
        <WmsButton>Options</WmsButton>
        <WmsButton type="submit">Next</WmsButton>
      </div>
    </form>
  );
};

export default PickItem;
