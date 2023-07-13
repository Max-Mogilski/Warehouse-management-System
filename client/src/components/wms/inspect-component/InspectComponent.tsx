import { useForm } from 'react-hook-form';
import ScannerComponent from '../scanner-component/ScannerComponent';
import { useEffect } from 'react';
import { useScanner } from '@/stores/scannerStore';
import { useNavigate } from 'react-router-dom';
import WmsButton from '../wms-button/WmsButton';
import styles from './InspectComponent.module.scss';

const InspectComponent = ({
  path,
  placeholder,
}: {
  path: string;
  placeholder: string;
}) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const scannerState = useScanner();
  const navigate = useNavigate();
  const inspectName = 'inspectName';

  const redirect = () => {
    const value = getValues()[inspectName];
    if (!value) return;
    navigate(path + value);
  };

  const handleScannerSuccess = (value: string) => {
    setValue(inspectName, value);
    redirect();
  };

  useEffect(() => {
    scannerState.setOnScanned(handleScannerSuccess);
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <ScannerComponent
          name={inspectName}
          placeholder={placeholder}
          control={control}
          errors={errors}
        />
        <WmsButton onclick={redirect} type="button">
          Confirm
        </WmsButton>
      </form>
    </div>
  );
};

export default InspectComponent;
