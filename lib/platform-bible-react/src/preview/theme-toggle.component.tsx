// source: https://ui.shadcn.com/docs/dark-mode/vite

/* eslint-disable react/prop-types */
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/shadcn-ui/dropdown-menu';
import { useTheme } from './theme-provider.component';

const ThemeToggle = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className }, ref) => {
  const { setTheme } = useTheme();
  return (
    <div ref={ref} className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="pr-h-[1.2rem] pr-w-[1.2rem] pr-rotate-0 pr-scale-100 pr-transition-all dark:pr--rotate-90 dark:pr-scale-0" />
            <Moon className="pr-absolute pr-h-[1.2rem] pr-w-[1.2rem] pr-rotate-90 pr-scale-0 pr-transition-all dark:pr-rotate-0 dark:pr-scale-100" />
            <span className="pr-sr-only">Toggle theme</span>
          </Button>
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

export default ThemeToggle;
