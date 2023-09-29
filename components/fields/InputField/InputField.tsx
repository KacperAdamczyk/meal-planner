import { RegisterFieldProps } from '@/components/fields';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrorMessage } from '@/components/fields/FieldErrorMessage';

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
      <FieldErrorMessage name={register.name} />
    </div>
  );
};
