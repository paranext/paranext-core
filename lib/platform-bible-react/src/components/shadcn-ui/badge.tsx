import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Style variants for the Badge component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
const badgeVariants = cva(
  cn(
    'pr-twp', // CUSTOM
    'tw-inline-flex tw-items-center tw-rounded-md tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2',
  ),
  {
    variants: {
      variant: {
        default:
          'tw-border-transparent tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/80',
        secondary:
          'tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80',
        destructive:
          'tw-border-transparent tw-bg-destructive tw-text-destructive-foreground tw-shadow hover:tw-bg-destructive/80',
        outline: 'tw-text-foreground',
        /*  CUSTOM VARIANTS  */
        muted:
          'tw-border-transparent tw-bg-muted tw-text-muted-foreground tw-shadow hover:tw-bg-muted/80',
        ghost: 'hover:tw-bg-accent hover:tw-text-accent-foreground',
        blueIndicator: 'tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0',
        mutedIndicator: 'tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0',
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
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * The Badge component displays a badge or a component that looks like a badge. The component is
 * built and styled by Shadcn UI.
 *
 * @param BadgeProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn('pr-twp' /* CUSTOM */, badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
