// CUSTOM: Added React import - file uses React.ComponentProps which requires the React namespace
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
import { Separator } from '@/components/shadcn-ui/separator';

/**
 * Style variants for the ButtonGroup component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
// CUSTOM: Added TSDoc comment for documentation purposes.
const buttonGroupVariants = cva(
  'tw:group/button-group tw:flex tw:w-fit tw:items-stretch tw:*:focus-visible:relative tw:*:focus-visible:z-10 tw:has-[>[data-slot=button-group]]:gap-2 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1',
  {
    variants: {
      orientation: {
        horizontal:
          'tw:[&>*:not(:first-child)]:rounded-s-none tw:[&>*:not(:first-child)]:border-s-0 tw:[&>*:not(:last-child)]:rounded-e-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg!',
        vertical:
          'tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

/**
 * ButtonGroup groups multiple buttons together with merged borders and consistent sizing. The
 * component is a Platform.Bible extension of shadcn/ui.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
// CUSTOM: Added TSDoc comment for documentation purposes.
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
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp',
        buttonGroupVariants({ orientation }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * ButtonGroupText renders a text/label element styled to fit inside a ButtonGroup.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
// CUSTOM: Added TSDoc comment for documentation purposes.
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4',
        className,
      )}
      {...props}
    />
  );
}

/**
 * ButtonGroupSeparator renders a visual separator between items in a ButtonGroup.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/separator}
 */
// CUSTOM: Added TSDoc comment for documentation purposes.
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
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        'pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto',
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
