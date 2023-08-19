import { Combobox, ComboboxProps } from '@/components/composite/Combobox';
import { FieldProps } from '@/components/fields/FieldProps';
import { Label } from '@/components/ui/label';
import { useCallback } from 'react';
import {
  FieldArray,
  FieldArrayPath,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';

export interface MultiselectFieldProps<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> extends Omit<FieldProps, 'placeholder'>,
    Omit<ComboboxProps, 'value' | 'onChange'> {
  name: Name;
  map: (value: string) => FieldArray<Values, Name>;
}

export const MultiselectField = <
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>({
  name,
  label,
  map,
  ...props
}: MultiselectFieldProps<Values, Name>) => {
  const { fields, append } = useFieldArray<Values, Name>({ name });

  const onChange = useCallback<ComboboxProps['onChange']>(
    (value) => {
      if (value) {
        append(map(value));
      }
    },
    [append, map],
  );

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Combobox value={undefined} onChange={onChange} {...props} />
      {fields.map((field, index) => (
        <div key={field.id}>
          {index}
          {JSON.stringify(field)}
        </div>
      ))}
    </div>
  );
};
