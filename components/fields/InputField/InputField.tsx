import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC, ForwardRefRenderFunction, forwardRef } from 'react';
import { RegisterFieldProps } from '../FieldProps';

export const InputField: FC<RegisterFieldProps> = ({
  placeholder,
  register,
}) => {
  return (
    <>
      <Label />
      <Input
        id={register.name}
        placeholder={placeholder ?? register.name}
        {...register}
      />
    </>
  );
};
