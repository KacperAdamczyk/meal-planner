'use client';

import { IconSun, IconMoon, IconCheck } from '@tabler/icons-react';
import { ActionIcon, Menu, useMantineColorScheme } from '@mantine/core';

enum Theme {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto',
}

export function ModeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="outline" size="lg">
          <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            setColorScheme(Theme.Light);
          }}
          rightSection={<IconCheck className="ml-2 dark:hidden" />}
        >
          Light
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setColorScheme(Theme.Dark);
          }}
          rightSection={<IconCheck className="ml-2 hidden dark:inline" />}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setColorScheme(Theme.Auto);
          }}
        >
          System
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
