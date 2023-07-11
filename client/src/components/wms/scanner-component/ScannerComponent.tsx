import FormInput from '@/components/shared/input/FormInput';
import QRscanner from '../scanner/Scanner';
import { ScannerComponentProps } from './types';

const ScannerComponent = ({
  control,
  errors,
  name,
  placeholder,
  required = false,
}: ScannerComponentProps) => {
  return (
    <>
      <QRscanner />
      <FormInput
        id={name}
        name={name}
        placeholder={placeholder}
        control={control}
        error={errors[name]}
        required={required}
        rules={{
          required: required ? 'This field is required!' : false,
        }}
      />
    </>
  );
};

export default ScannerComponent;
