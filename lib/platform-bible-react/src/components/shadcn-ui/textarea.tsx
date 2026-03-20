import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Displays a form textarea or a component that looks like a textarea. This component is from Shadcn
 * UI. See Shadcn UI documentation: https://ui.shadcn.com/docs/components/textarea
 */
function Textarea({
  className,
  ref,
  ...props
}: React.ComponentProps<'textarea'> & { ref?: React.Ref<HTMLTextAreaElement> }) {
  return (
    <textarea
      className={cn(
        'pr-twp tw:flex tw:min-h-[60px] tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-base tw:shadow-sm tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export { Textarea };
