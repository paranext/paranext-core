import React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Displays an indicator showing the completion progress of a task, typically displayed as a
 * progress bar. This component is built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/progress}
 * @see Radix UI Documentation:
 *   {@link https://www.radix-ui.com/primitives/docs/components/progress#api-reference}
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:relative tw:flex tw:h-1 tw:w-full tw:items-center tw:overflow-x-hidden tw:rounded-full tw:bg-muted',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="tw:size-full tw:flex-1 tw:bg-primary tw:transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
