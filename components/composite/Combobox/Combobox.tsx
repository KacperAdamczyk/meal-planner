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
import { useState } from 'react';

interface ComboboxOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface ComboboxProps {
  options: ComboboxOption[];
  placeholder: string;
  inputPlaceholder: string;
  notFoundText: string;
  emptyText: string;
}

export function Combobox({
  options,
  placeholder,
  inputPlaceholder,
  notFoundText,
  emptyText,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
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
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={inputPlaceholder} />
          {!!options.length && <CommandEmpty>{notFoundText}</CommandEmpty>}
          <CommandGroup>
            {options.length ? (
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
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
                  {option.icon && <option.icon className="ml-2 h-4 w-4" />}
                </CommandItem>
              ))
            ) : (
              <div className="m-1 text-center text-sm text-gray-500">
                {emptyText}
              </div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
