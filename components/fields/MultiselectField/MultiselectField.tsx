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
import { Delete, Trash2 } from 'lucide-react';
import { ReactNode, useCallback } from 'react';
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
  map: (value: string) => FieldArray<Values, Name>;
  columns: { label: string; key: keyof FieldArray<Values, Name> }[];
}

export const MultiselectField = <
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>({
  name,
  label,
  map,
  columns,
  ...props
}: MultiselectFieldProps<Values, Name>): ReactNode => {
  const { fields, append, remove } = useFieldArray<Values, Name>({ name });

  const onChange = useCallback<ComboboxProps['onChange']>(
    (value) => {
      if (value) {
        append(map(value));
      }
    },
    [append, map],
  );

  return (
    <div className="rounded border border-input p-2">
      <Label htmlFor={name}>{label}</Label>
      <Combobox value={undefined} onChange={onChange} {...props} />
      <Table>
        {!fields.length && <TableCaption>No option selected</TableCaption>}
        <TableHeader>
          {!!fields.length && (
            <TableRow>
              {columns.map(({ label, key }) => (
                <TableHead key={key.toString()}>{label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {columns.map(({ key }) => (
                <TableCell key={key.toString()}>
                  {field[key] as ReactNode}
                </TableCell>
              ))}
              <TableCell>
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
  );
};
