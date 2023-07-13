import MultiStepForm from '@/components/wms/multistep-form/MultistepForm';
import WmsButton from '@/components/wms/wms-button/WmsButton';
import {
  RefCallback,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Refill.module.scss';
import { useScanner } from '@/stores/scannerStore';
import QRscanner from '@/components/wms/scanner/Scanner';
import FormInput from '@/components/shared/input/FormInput';
import { useRefillProductMutation } from './query';
import { defaultSchema, schemaFiller } from '@/config/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const INITIAL_STEP = 0;

const Refill = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const scannerState = useScanner();
  const [step, setStep] = useState(INITIAL_STEP);
  const refillMutation = useRefillProductMutation();
  const navigate = useNavigate();

  const scannerPages = useMemo(() => ['productId', 'palletId'], []);

  const nextPage = () => {
    setStep((prev) => prev + 1);
  };

  const clearForm = () => {
    setValue('productId', '');
    setValue('palletId', '');
    setValue('productQuantity', '');
  };

  const pages = [
    {
      index: 1,
      component: (
        <>
          {step === 0 && <QRscanner />}
          <FormInput
            id="productId"
            name="productId"
            placeholder="Product ID"
            control={control}
            error={errors.productId}
            required={true}
            rules={{
              required: 'This field is required!',
            }}
          />
        </>
      ),
    },
    {
      index: 2,
      component: (
        <>
          {step === 1 && <QRscanner />}
          <FormInput
            id="palletId"
            name="palletId"
            placeholder="Pallet ID"
            control={control}
            error={errors.palletId}
            required={true}
            rules={{
              required: 'This field is required!',
            }}
          />
        </>
      ),
    },
    {
      index: 3,
      component: (
        <>
          <FormInput
            id="productQuantity"
            name="productQuantity"
            placeholder="Quantity"
            control={control}
            step={1}
            error={errors.productQuantity}
            required={true}
            type="number"
            rules={{
              required: 'This field is required!',
              min: {
                value: 1,
                message: 'Quantity has to be >= 1',
              },
            }}
          />
        </>
      ),
    },
  ];

  const refillProduct: SubmitHandler<FieldValues> = (data) => {
    refillMutation.mutate(
      schemaFiller(
        { ...data, productQuantity: +data.productQuantity },
        defaultSchema.refill_product
      ),
      {
        onSuccess: () => {
          toast.success('Stock has been successfully updated!');
          navigate('/cms/menagment');
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.msg);
          setStep(INITIAL_STEP);
          clearForm();
        },
      }
    );
  };

  const handleScannerSuccess = (value: string) => {
    setValue(scannerPages[step], value);
    nextPage();
  };

  useEffect(() => {
    scannerState.setOnScanned(handleScannerSuccess);
  }, [step]);

  const handleButtonClick = () => {
    if (pages.length - 1 === step) {
      return;
    }
    nextPage();
  };

  const buttonTitle = step === pages.length - 1 ? 'Confirm' : 'Next';
  const buttonType = step === pages.length - 1 ? 'submit' : 'button';

  return (
    <form className={styles.container} onSubmit={handleSubmit(refillProduct)}>
      <MultiStepForm step={step} pages={pages} />
      <WmsButton
        disabled={refillMutation.isLoading}
        onclick={handleButtonClick}
        type={buttonType}
      >
        {refillMutation.isLoading ? 'Loading' : buttonTitle}
      </WmsButton>
    </form>
  );
};

export default Refill;
