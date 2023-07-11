import FormInput from '@/components/shared/input/FormInput';
import QRscanner from '../scanner/Scanner';

const ScannerComponent = ({ control, errors, name, placeholder }: any) => {
  return (
    <>
      <QRscanner />
      <FormInput
        id={name}
        name={name}
        placeholder={placeholder}
        control={control}
        error={errors[name]}
        required={true}
        rules={{
          required: 'This field is required!',
        }}
      />
    </>
  );
};

export default ScannerComponent;
