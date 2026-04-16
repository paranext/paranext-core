// CUSTOM: Added React import - file uses React.ComponentProps which requires the React namespace
import React from 'react';

import { cn } from '@/utils/shadcn-ui/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('tw:animate-pulse tw:rounded-md tw:bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
