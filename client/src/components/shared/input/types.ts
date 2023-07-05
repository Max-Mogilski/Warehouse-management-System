import { HTMLInputTypeAttribute } from 'react';
import {
  ControllerRenderProps,
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form';

export interface FormInputProps<TFormFields extends FieldValues> {
  name: Path<TFormFields>;
  control: UseFormReturn<TFormFields>['control'];
  error?: any;
  rules?: RegisterOptions;
}

export interface InputProps
  extends Pick<ControllerRenderProps, 'name' | 'onChange' | 'value'> {
  id: string;
  type?: HTMLInputTypeAttribute;
  error?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  color?: string;
  animationDelay?: number;
}
