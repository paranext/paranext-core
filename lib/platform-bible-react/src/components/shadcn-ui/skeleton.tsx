import React from 'react';
import { cn } from '@/utils/shadcn-ui.util';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
