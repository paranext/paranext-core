import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Displays a form textarea or a component that looks like a textarea. This component is from Shadcn
 * UI. See Shadcn UI documentation: https://ui.shadcn.com/docs/components/textarea
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'pr-twp', // CUSTOM
          'tw-flex tw-min-h-[60px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-2 tw-text-base tw-shadow-sm placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
