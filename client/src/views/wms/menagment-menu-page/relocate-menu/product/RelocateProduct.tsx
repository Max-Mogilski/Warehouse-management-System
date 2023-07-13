import MultiStepForm from '@/components/wms/multistep-form/MultistepForm';
import WmsButton from '@/components/wms/wms-button/WmsButton';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './RelocateProduct.module.scss';
import { useScanner } from '@/stores/scannerStore';
import QRscanner from '@/components/wms/scanner/Scanner';
import FormInput from '@/components/shared/input/FormInput';
import { defaultSchema, schemaFiller } from '@/config/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useRelocateProductMutation } from './query';

const INITIAL_STEP = 0;

const RelocateProduct = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const scannerState = useScanner();
  const [step, setStep] = useState(INITIAL_STEP);
  const relocateMutation = useRelocateProductMutation();
  const navigate = useNavigate();

  const scannerPages = useMemo(
    () => ['currentPalletId', 'productId', 'quantity', 'destinationPalletId'],
    []
  );

  const nextPage = () => {
    setStep((prev) => prev + 1);
  };

  const clearForm = () => {
    setValue('currentPalletId', '');
    setValue('palletId', '');
    setValue('productQuantity', '');
    setValue('destinationPalletId', '');
  };

  const pages = [
    {
      index: 1,
      component: (
        <>
          {step === 0 && <QRscanner />}
          <FormInput
            id="currentPalletId"
            name="currentPalletId"
            placeholder="Current Pallet ID"
            control={control}
            error={errors.currentPalletId}
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
    {
      index: 4,
      component: (
        <>
          {step === 3 && <QRscanner />}
          <FormInput
            id="destinationPalletId"
            name="destinationPalletId"
            placeholder="Destination Pallet ID"
            control={control}
            error={errors.destinationPalletId}
            required={true}
            rules={{
              required: 'This field is required!',
            }}
          />
        </>
      ),
    },
  ];

  const relocateProduct: SubmitHandler<FieldValues> = (data) => {
    relocateMutation.mutate(
      schemaFiller(
        { ...data, productQuantity: +data.productQuantity },
        defaultSchema.relocate_product
      ),
      {
        onSuccess: () => {
          toast.success('Relocated successfully!');
          navigate('/cms/menagment/relocate');
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
    if (pages.length - 1 === step) {
      relocateProduct(getValues());
    }
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
    <form className={styles.container} onSubmit={handleSubmit(relocateProduct)}>
      <MultiStepForm step={step} pages={pages} />
      <WmsButton
        disabled={relocateMutation.isLoading}
        onclick={handleButtonClick}
        type={buttonType}
      >
        {relocateMutation.isLoading ? 'Loading' : buttonTitle}
      </WmsButton>
    </form>
  );
};

export default RelocateProduct;
