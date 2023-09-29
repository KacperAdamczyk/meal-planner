'use client';

import { IconSun, IconMoon, IconCheck } from '@tabler/icons-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

enum Theme {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto',
}

export function ModeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ActionIcon variant="outline" size="lg">
          <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </ActionIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setColorScheme(Theme.Light);
          }}
        >
          Light {colorScheme === Theme.Light && <IconCheck className="ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setColorScheme(Theme.Dark);
          }}
        >
          Dark {colorScheme === Theme.Dark && <IconCheck className="ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setColorScheme(Theme.Auto);
          }}
        >
          System {colorScheme === Theme.Auto && <IconCheck className="ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
