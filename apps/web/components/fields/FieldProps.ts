import { UseFormRegisterReturn } from 'react-hook-form';

export interface FieldProps {
  label: string;
  placeholder?: string;
}

export interface RegisterFieldProps extends FieldProps {
  register: UseFormRegisterReturn;
}
