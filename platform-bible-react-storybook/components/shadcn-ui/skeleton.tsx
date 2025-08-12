import React from 'react';
import { cn } from '@/utils/shadcn-ui.util';

/**
 * Use to show a placeholder while content is loading. This component is from Shadcn UI. See Shadcn
 * UI documentation: https://ui.shadcn.com/docs/components/skeleton
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
