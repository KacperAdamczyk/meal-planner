'use client';
import { ErrorMessage } from '@hookform/error-message';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
}

export const FieldErrorMessage: FC<Props> = ({ name }) => {
  const context = useFormContext();

  return (
    <ErrorMessage
      errors={context.formState.errors}
      name={name}
      render={({ message }) => <p className="text-red-500">{message}</p>}
    />
  );
};
