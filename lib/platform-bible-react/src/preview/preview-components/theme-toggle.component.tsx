// source: https://ui.shadcn.com/docs/dark-mode/vite

import { Button } from '@/components/shadcn-ui/button';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import React, { ComponentPropsWithoutRef } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import ParatextLogo from './paratext-logo.component';
import ShadCnLogo from './shadcn-logo.component';
import { Theme, useTheme } from './theme-provider.component';

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
          <Button variant="outline" size="icon">
            {/* as copied from the website, it's not working to toggle the icon */}
            <Sun className="pr-h-[1.2rem] pr-w-[1.2rem] pr-rotate-0 pr-scale-100 pr-transition-all dark:pr--rotate-90 dark:pr-scale-0" />
            <Moon className="pr-absolute pr-h-[1.2rem] pr-w-[1.2rem] pr-rotate-90 pr-scale-0 pr-transition-all dark:pr-rotate-0 dark:pr-scale-100" />
            <span className="pr-sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
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
    <div className="pr-flex pr-gap-2">
      <div ref={ref} className={className}>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setTheme(
              // string replacement should always end up with a value of 'Theme', but ESLint cannot know or guarantee it
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              (theme.includes('paratext-')
                ? theme.replace('paratext-', '')
                : `paratext-${theme}`) as Theme,
            )
          }
        >
          {theme.includes('paratext-') ? <ParatextLogo /> : <ShadCnLogo />}
        </Button>
      </div>
      <div ref={ref} className={className}>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setTheme(
              // string replacement should always end up with a value of 'Theme', but ESLint cannot know or guarantee it
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              (theme.includes('dark')
                ? theme.replace('dark', 'light')
                : theme.replace('light', 'dark')) as Theme,
            )
          }
        >
          {theme.includes('dark') ? (
            <Moon className="pr-h-[1.2rem] pr-w-[1.2rem]" />
          ) : (
            <Sun className="pr-h-[1.2rem] pr-w-[1.2rem]" />
          )}
        </Button>
      </div>
    </div>
  );
});

export default ThemeToggle;
