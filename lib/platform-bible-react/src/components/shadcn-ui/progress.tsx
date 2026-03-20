import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Displays an indicator showing the completion progress of a task, typically displayed as a
 * progress bar. This component is built on Radix UI primitives and styled with Shadcn UI. See
 * Shadcn UI documentation: https://ui.shadcn.com/docs/components/progress See Radix UI
 * documentation: https://www.radix-ui.com/primitives/docs/components/progress#api-reference
 */
function Progress({
  className,
  value,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof ProgressPrimitive.Root>>;
}) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'pr-twp tw:relative tw:h-2 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-primary/20',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
