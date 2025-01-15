import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';

const badgeVariants = cva(
  'pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80',
        secondary:
          'tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80',
        muted:
          'tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80',
        destructive:
          'tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80',
        outline: 'tw-border tw-text-foreground',
        blueIndicator: 'tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0',
        mutedIndicator: 'tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0',
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
