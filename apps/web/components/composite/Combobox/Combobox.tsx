'use client';

import { Check, ChevronsUpDown, LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ForwardedRef, forwardRef, useState } from 'react';

export interface ComboboxOption {
  label: string;
  value: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface ComboboxProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: ComboboxOption[];
  placeholder: string;
}

function ComboboxComponent(
  { value, onChange, options, placeholder }: ComboboxProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? selectedOption?.label : placeholder}
          {!!selectedOption?.icon && (
            <selectedOption.icon className="h-4 w-4" />
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          {!!options.length && <CommandEmpty>Not found</CommandEmpty>}
          <CommandGroup>
            {options.length ? (
              options.map((option) => (
                <CommandItem
                  ref={ref}
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  data-disabled={option.disabled ? 'true' : undefined}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? undefined : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                  {!!option.icon && <option.icon className="ml-2 h-4 w-4" />}
                </CommandItem>
              ))
            ) : (
              <div className="m-1 text-center text-sm text-gray-500">
                No items
              </div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  ComboboxComponent,
);
