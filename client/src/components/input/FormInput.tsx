import { Controller } from 'react-hook-form';

import Input from './Input';
import type { FormInputProps, InputProps } from './types';

export default function FormInput<TFormFields extends Record<string, unknown>>({
  id,
  name,
  placeholder,
  required,
  rules,
  type = 'text',
  control,
}: FormInputProps<TFormFields> &
  Omit<
    InputProps,
    'name' | 'onChange' | 'onBlur' | 'value' | 'ref' | 'error'
  >) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => {
        return (
          <Input
            id={id}
            placeholder={placeholder}
            type={type}
            required={required}
            {...field}
          />
        );
      }}
    />
  );
}
