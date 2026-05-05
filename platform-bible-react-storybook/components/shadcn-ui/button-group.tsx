import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';
import { Separator } from '@/components/shadcn-ui/separator';

/** CVA variants for ButtonGroup — controls horizontal vs. vertical orientation styling. */
const buttonGroupVariants = cva(
  'tw-flex tw-w-fit tw-items-stretch has-[>[data-slot=button-group]]:tw-gap-2 [&>*]:focus-visible:tw-relative [&>*]:focus-visible:tw-z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:tw-rounded-r-md [&>[data-slot=select-trigger]:not([class*=w-])]:tw-w-fit [&>input]:tw-flex-1',
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:tw-rounded-l-none [&>*:not(:first-child)]:tw-border-l-0 [&>*:not(:last-child)]:tw-rounded-r-none',
        vertical:
          'tw-flex-col [&>*:not(:first-child)]:tw-rounded-t-none [&>*:not(:first-child)]:tw-border-t-0 [&>*:not(:last-child)]:tw-rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

/**
 * Groups a set of buttons (or other form controls) with shared borders and rounded corners, making
 * them appear as a single cohesive unit. Use `orientation` to switch between horizontal (default)
 * and vertical layouts.
 */
function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn('pr-twp', buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

/**
 * Renders a non-interactive text label (or arbitrary content via `asChild`) inside a `ButtonGroup`,
 * styled to match the height and border of adjacent buttons.
 */
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'tw-shadow-xs tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-border tw-bg-muted tw-px-4 tw-text-sm tw-font-medium [&_svg:not([class*=size-])]:tw-size-4 [&_svg]:tw-pointer-events-none',
        className,
      )}
      {...props}
    />
  );
}

/**
 * A thin visual divider between items inside a `ButtonGroup`. Defaults to vertical orientation and
 * stretches to fill the group's cross-axis height automatically.
 */
function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'tw-!m-0 tw-relative tw-self-stretch tw-bg-input data-[orientation=vertical]:tw-h-auto',
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
