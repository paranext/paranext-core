import React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';

const toggleVariants = cva(
  'pr-twp tw:inline-flex tw:items-center tw:justify-center tw:rounded-md tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-colors tw:hover:bg-muted tw:hover:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=on]:bg-accent tw:data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'tw:bg-transparent',
        outline:
          'tw:border tw:border-input tw:bg-transparent tw:hover:bg-accent tw:hover:text-accent-foreground',
      },
      size: {
        default: 'tw:h-10 tw:px-3',
        sm: 'tw:h-9 tw:px-2.5',
        lg: 'tw:h-11 tw:px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    ref?: React.Ref<React.ComponentRef<typeof TogglePrimitive.Root>>;
  }) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
