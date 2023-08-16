'use client';

import { Moon, Sun, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(Theme.Light)}>
          Light {theme === Theme.Light && <Check className="ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.Dark)}>
          Dark {theme === Theme.Dark && <Check className="ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.System)}>
          System {theme === Theme.System && <Check className="ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
