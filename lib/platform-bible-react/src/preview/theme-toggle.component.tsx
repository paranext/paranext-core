// source: https://ui.shadcn.com/docs/dark-mode/vite

import React, { ComponentPropsWithoutRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { Button } from '..';
import { Button as ShadcnButton } from '../components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/shadcn-ui/dropdown-menu';
import { useTheme } from './theme-provider.component';

export type ThemeToggleProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  className?: string;
};

const ThemeToggle = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  ThemeToggleProps
>(({ className }, ref) => {
  const { setTheme } = useTheme();
  return (
    <div ref={ref} className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* TODO: wondering why our Button does not work here */}
          <ShadcnButton variant="outline" size="icon">
            <Sun className="pr-h-[1.2rem] pr-w-[1.2rem] pr-rotate-0 pr-scale-100 pr-transition-all dark:pr--rotate-90 dark:pr-scale-0" />
            <Moon className="pr-absolute pr-h-[1.2rem] pr-w-[1.2rem] pr-rotate-90 pr-scale-0 pr-transition-all dark:pr-rotate-0 dark:pr-scale-100" />
            <span className="pr-sr-only">Toggle theme</span>
          </ShadcnButton>
        </DropdownMenuTrigger>

        {/* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */}
        <DropdownMenuContent align="end" className="pr-font-sans">
          <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export const ThemeButton = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  ThemeToggleProps
>(({ className }, ref) => {
  const { theme, setTheme } = useTheme();
  return (
    <div ref={ref} className={className}>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? (
          <Moon className="pr-h-[1.2rem] pr-w-[1.2rem]" />
        ) : (
          <Sun className="pr-h-[1.2rem] pr-w-[1.2rem]" />
        )}
      </Button>
    </div>
  );
});

export default ThemeToggle;
