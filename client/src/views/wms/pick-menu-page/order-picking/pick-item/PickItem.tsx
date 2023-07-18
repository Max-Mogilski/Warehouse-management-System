import ScannerComponent from '@/components/wms/scanner-component/ScannerComponent';
import WmsButton from '@/components/wms/wms-button/WmsButton';
import { useForm } from 'react-hook-form';
import styles from './PickItem.module.scss';

const PickItem = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pickItem = () => {};

  return (
    <form onSubmit={handleSubmit(pickItem)} className={styles.form}>
      <div className={styles.content}>
        <ScannerComponent
          name="productId"
          control={control}
          errors={errors}
          placeholder="Product ID"
        />
        <p>Quantity: 1</p>
        <p>Location: 1</p>
        <p>Item ID: 5323123</p>
      </div>
      <div className={styles.actions}>
        <WmsButton>Options</WmsButton>
        <WmsButton>Next</WmsButton>
      </div>
    </form>
  );
};

export default PickItem;
