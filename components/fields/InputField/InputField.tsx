'use client';
import { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useController } from 'react-hook-form';

interface Props extends TextInputProps {
  name: string;
}

export const InputField: FC<Props> = (props) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return <TextInput {...props} {...field} error={error?.message} />;
};
