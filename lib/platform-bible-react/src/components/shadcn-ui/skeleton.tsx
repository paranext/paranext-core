// CUSTOM: Added React import - file uses React.ComponentProps which requires the React namespace
import React from 'react';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Use to show a placeholder while content is loading. This component is from Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/skeleton}
 */
// CUSTOM: Added TSDoc with link to shadcn/ui documentation
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
