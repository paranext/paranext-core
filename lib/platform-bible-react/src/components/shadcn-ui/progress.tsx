import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Displays an indicator showing the completion progress of a task, typically displayed as a
 * progress bar. This component is built on Radix UI primitives and styled with Shadcn UI. See
 * Shadcn UI documentation: https://ui.shadcn.com/docs/components/progress See Radix UI
 * documentation: https://www.radix-ui.com/primitives/docs/components/progress#api-reference
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
