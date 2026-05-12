// kbd reapplied stuff

// CUSTOM: Added React import - file uses React.ComponentProps which requires the React namespace
import React from 'react';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Displays a keyboard key or shortcut to be pressed by the user. Renders an HTML `<kbd>` element.
 * This component is from Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/kbd}
 */
// CUSTOM: Added TSDoc with link to shadcn/ui documentation
function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Groups multiple {@link Kbd} components together to represent a key combination or sequence (for
 * example, `Ctrl + K`). This component is from Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/kbd}
 */
// CUSTOM: Added TSDoc with link to shadcn/ui documentation
function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp tw:inline-flex tw:items-center tw:gap-1', className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
