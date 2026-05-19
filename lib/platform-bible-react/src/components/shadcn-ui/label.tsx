'use client';

import React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * The Label component renders an accessible label associated with controls. This component is built
 * on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/label}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/label}
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:text-foreground tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
