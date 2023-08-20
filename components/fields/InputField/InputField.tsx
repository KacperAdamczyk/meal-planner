import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC, ForwardRefRenderFunction, forwardRef } from 'react';
import { RegisterFieldProps } from '../FieldProps';

export const InputField: FC<RegisterFieldProps> = ({
  label,
  placeholder,
  register,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        id={register.name}
        placeholder={placeholder ?? register.name}
        {...register}
      />
    </div>
  );
};
