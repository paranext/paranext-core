import React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';

const toggleVariants = cva(
  'pr-twp pr-font-sans pr-inline-flex pr-items-center pr-justify-center pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-muted hover:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=on]:pr-bg-accent data-[state=on]:pr-text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'pr-bg-transparent',
        outline:
          'pr-border pr-border-input pr-bg-transparent hover:pr-bg-accent hover:pr-text-accent-foreground',
      },
      size: {
        default: 'pr-h-10 pr-px-3',
        sm: 'pr-h-9 pr-px-2.5',
        lg: 'pr-h-11 pr-px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
