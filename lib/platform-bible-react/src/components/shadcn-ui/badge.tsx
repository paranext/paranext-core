import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Style variants for the Badge component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/badge}
 */
const badgeVariants = cva(
  'pr-twp tw:inline-flex tw:items-center tw:rounded-full tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-semibold tw:transition-colors tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'tw:border tw:border-transparent tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/80',
        secondary:
          'tw:border tw:border-transparent tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80',
        muted:
          'tw:border tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80',
        destructive:
          'tw:border tw:border-transparent tw:bg-destructive tw:text-destructive-foreground tw:hover:bg-destructive/80',
        outline: 'tw:border tw:text-foreground',
        blueIndicator: 'tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0',
        mutedIndicator: 'tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0',
        ghost: 'tw:hover:bg-accent tw:hover:text-accent-foreground tw:text-mu',
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
function Badge({
  className,
  variant,
  ref,
  ...props
}: BadgeProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={cn('pr-twp', badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
