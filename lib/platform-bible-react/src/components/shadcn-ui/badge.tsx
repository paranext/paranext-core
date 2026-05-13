import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Style variants for the Badge component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
const badgeVariants = cva(
  'tw:group/badge tw:inline-flex tw:h-5 tw:w-fit tw:shrink-0 tw:items-center tw:justify-center tw:gap-1 tw:overflow-hidden tw:rounded-4xl tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:whitespace-nowrap tw:transition-all tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:[&>svg]:pointer-events-none tw:[&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80',
        secondary: 'tw:bg-secondary tw:text-secondary-foreground tw:[a]:hover:bg-secondary/80',
        destructive:
          'tw:bg-destructive/10 tw:text-destructive tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:focus-visible:ring-destructive/40 tw:[a]:hover:bg-destructive/20',
        outline:
          'tw:border-border tw:text-foreground tw:[a]:hover:bg-muted tw:[a]:hover:text-muted-foreground',
        ghost: 'tw:hover:bg-muted tw:hover:text-muted-foreground tw:dark:hover:bg-muted/50',
        link: 'tw:text-primary tw:underline-offset-4 tw:hover:underline',
        // CUSTOM: Added 'muted' variant — a muted-background badge without a visible border, for
        // low-emphasis status indicators.
        muted: 'tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80',
        // CUSTOM: Added 'blueIndicator' variant — a small solid blue dot for status indication,
        // without padding. Used as a notification or presence indicator.
        blueIndicator: 'tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0',
        // CUSTOM: Added 'mutedIndicator' variant — a small solid muted dot for status indication,
        // without padding. Used as a lower-emphasis presence or state indicator.
        mutedIndicator: 'tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Props for the Badge component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
// CUSTOM: Added BadgeProps interface exporting the combined props type so callers can type
// badge-related props without importing VariantProps directly.
export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

/**
 * The Badge component displays a badge or a component that looks like a badge. The component is
 * built and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
// CUSTOM: Added TSDoc comment with link to upstream shadcn/ui documentation.
function Badge({ className, variant = 'default', asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        'pr-twp',
        badgeVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
