import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';

// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation for this export
/**
 * Variants factory for Toggle button styling. Provides `variant` (default, outline) and `size`
 * (default, sm, lg) options.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/toggle}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/toggle}
 */
const toggleVariants = cva(
  // CUSTOM: Added pr-twp at the front of the base class string to apply Platform.Bible's Tailwind
  // CSS scope isolation; all Toggle and ToggleGroupItem components inherit this via toggleVariants
  'pr-twp tw:group/toggle tw:inline-flex tw:items-center tw:justify-center tw:gap-1 tw:rounded-lg tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:hover:bg-muted tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:aria-pressed:bg-muted tw:data-[state=on]:bg-muted tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'tw:bg-transparent',
        outline: 'tw:border tw:border-input tw:bg-transparent tw:hover:bg-muted',
      },
      size: {
        default:
          'tw:h-8 tw:min-w-8 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2',
        sm: 'tw:h-7 tw:min-w-7 tw:rounded-[min(var(--radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5',
        lg: 'tw:h-9 tw:min-w-9 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation for this component
/**
 * A two-state button that can be toggled on or off. Built on Radix UI primitives and styled with
 * Shadcn UI. The `pr-twp` scope class is applied via the `toggleVariants` base class string.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/toggle}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/toggle}
 */
function Toggle({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
