import { Combobox, ComboboxProps } from '@/components/composite/Combobox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { FC, useCallback } from 'react';
import { useController } from 'react-hook-form';

interface Props extends Omit<ComboboxProps, 'value' | 'onChange'> {
  name: string;
  label: string;
  isClearable?: boolean;
}

export const SelectField: FC<Props> = ({ name, isClearable, ...props }) => {
  const { field } = useController({
    name,
  });

  const onClick = useCallback(() => {
    field.onChange(undefined);
  }, [field]);

  return (
    <div className="flex flex-col gap-1">
      <Label>{props.label}</Label>
      <div className="flex gap-1 align-middle">
        <Combobox {...field} {...props} />
        {isClearable && (
          <Button size="icon" variant="outline">
            <Trash2 className="h-4 w-4 text-red-500" onClick={onClick} />
          </Button>
        )}
      </div>
    </div>
  );
};
