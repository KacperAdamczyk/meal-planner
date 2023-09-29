import { Autocomplete, AutocompleteProps } from '@mantine/core';
import { FC } from 'react';
import { useController } from 'react-hook-form';

interface Props extends AutocompleteProps {
  name: string;
}

export const SelectField: FC<Props> = (props) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return <Autocomplete {...field} {...props} error={error?.message} />;
};
