import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Style variants for the Badge component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
const badgeVariants = cva(
  'tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80',
        secondary:
          'tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80',
        muted: 'tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80',
        destructive:
          'tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80',
        outline: 'tw-text-foreground',
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
  return <div className={cn('pr-twp', badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
