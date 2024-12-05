import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn('pr-twp', badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
