import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FieldProps extends Omit<UseFormRegisterReturn, 'ref'> {
  label: string;
  placeholder?: string;
}

interface InputFieldProps extends FieldProps {}

const InputFieldComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  InputFieldProps
> = ({ name, placeholder, ...register }, ref) => {
  return (
    <>
      <Label />
      <Input
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder ?? name}
        {...register}
      />
    </>
  );
};

export const InputField = forwardRef(InputFieldComponent);
