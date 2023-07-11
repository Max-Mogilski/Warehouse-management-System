import ScannerComponent from '@/components/wms/scanner-component/ScannerComponent';
import { useForm } from 'react-hook-form';
import styles from './Pallet.module.scss';
import WmsButton from '@/components/wms/wms-button/WmsButton';
import { useCreatePalletMutation } from './query';
import { defaultSchema, schemaFiller } from '@/config/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useScanner } from '@/stores/scannerStore';
import { useEffect } from 'react';
import Loader from '@/components/shared/loader/Loader';

const Pallet = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const createMutation = useCreatePalletMutation();
  const navigate = useNavigate();
  const scannerState = useScanner();

  const createPallet = (data: any) => {
    createMutation.mutate(schemaFiller(data, defaultSchema.pallet), {
      onSuccess: () => {
        toast.success('Pallet has been sucessfully created!');
        navigate('/cms');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.msg);
        setValue('locationId', '');
      },
    });
  };

  const handleScannerSuccess = (value: string) => {
    setValue('locationId', value);
    createPallet({ locationId: value });
  };

  useEffect(() => {
    scannerState.setOnScanned(handleScannerSuccess);
  }, []);

  return (
    <div className={styles.container}>
      {createMutation.isLoading && <Loader />}
      <form onSubmit={handleSubmit(createPallet)} className={styles.form}>
        {!createMutation.isLoading && (
          <ScannerComponent
            control={control}
            name={'locationId'}
            placeholder="Location ID"
            errors={errors}
          />
        )}
        <WmsButton type="submit" disabled={createMutation.isLoading}>
          Next
        </WmsButton>
      </form>
    </div>
  );
};

export default Pallet;
