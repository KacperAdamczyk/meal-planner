import { RegisterFieldProps } from '@/components/fields';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

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
      <ErrorMessage
        name={register.name}
        render={({ message }) => <p className="text-red-500">{message}</p>}
      />
    </div>
  );
};
