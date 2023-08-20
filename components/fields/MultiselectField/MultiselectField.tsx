import { Combobox, ComboboxProps } from '@/components/composite/Combobox';
import { FieldProps } from '@/components/fields/FieldProps';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { ReactNode, useCallback, useMemo } from 'react';
import {
  FieldArray,
  FieldArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';

export interface MultiselectFieldProps<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> extends Omit<FieldProps, 'placeholder'>,
    Omit<ComboboxProps, 'value' | 'onChange'> {
  name: Name;
  valueKey: keyof FieldArrayWithId<Values, Name>;
  valueLabel: string;
}

export const MultiselectField = <
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>({
  name,
  label,
  valueKey,
  valueLabel,
  options,
  ...props
}: MultiselectFieldProps<Values, Name>): ReactNode => {
  const { fields, append, remove } = useFieldArray<Values, Name>({ name });

  const onChange = useCallback<ComboboxProps['onChange']>(
    (value) => {
      if (value) {
        append({ [valueKey]: value } as FieldArray<Values, Name>);
      }
    },
    [append, valueKey],
  );

  const extendedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        disabled: !!fields.find((field) => field[valueKey] === option.value),
      })),
    [fields, options, valueKey],
  );

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-col items-center rounded border border-input p-2">
        <Combobox
          value={undefined}
          onChange={onChange}
          options={extendedOptions}
          {...props}
        />
        <Table>
          {!fields.length && <TableCaption>No option selected</TableCaption>}
          <TableHeader>
            {!!fields.length && (
              <TableRow>
                <TableHead>{valueLabel}</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  {
                    options.find((option) => option.value === field[valueKey])
                      ?.label
                  }
                </TableCell>
                <TableCell className="text-end">
                  <Button variant="outline" size="icon" type="button">
                    <Trash2
                      className="h-4 w-4 text-red-500"
                      onClick={() => remove(index)}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
