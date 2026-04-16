import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui/utils';
import { Separator } from '@/components/shadcn-ui/separator';

/** CVA variants for ButtonGroup — controls horizontal vs. vertical orientation styling. */
const buttonGroupVariants = cva(
  'tw:flex tw:w-fit tw:items-stretch tw:has-[>[data-slot=button-group]]:gap-2 tw:[&>*]:focus-visible:relative tw:[&>*]:focus-visible:z-10 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1',
  {
    variants: {
      orientation: {
        horizontal:
          'tw:[&>*:not(:first-child)]:rounded-l-none tw:[&>*:not(:first-child)]:border-l-0 tw:[&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none',
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
        'tw:shadow-xs tw:flex tw:items-center tw:gap-2 tw:rounded-md tw:border tw:bg-muted tw:px-4 tw:text-sm tw:font-medium tw:[&_svg:not([class*=size-])]:size-4 tw:[&_svg]:pointer-events-none',
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
        'tw:!m-0 tw:relative tw:self-stretch tw:bg-input tw:data-[orientation=vertical]:h-auto',
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
