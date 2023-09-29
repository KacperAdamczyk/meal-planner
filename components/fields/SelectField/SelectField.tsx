'use client';
import { Select, SelectProps } from '@mantine/core';
import { FC } from 'react';
import { useController } from 'react-hook-form';

interface Props extends SelectProps {
  name: string;
}

export const SelectField: FC<Props> = (props) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return <Select {...field} {...props} error={error?.message} />;
};
