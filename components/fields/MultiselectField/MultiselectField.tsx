'use client';
import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { FC } from 'react';
import { useController } from 'react-hook-form';

interface Props extends MultiSelectProps {
  name: string;
}

export const MultiselectField: FC<Props> = (props) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return <MultiSelect {...field} {...props} error={error?.message} />;
};
