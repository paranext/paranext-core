import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Props for the Kbd component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/kbd}
 */
export type KbdProps = React.HTMLAttributes<HTMLElement>;

/**
 * The Kbd component displays keyboard keys or shortcuts. The component is built and styled by
 * Shadcn UI.
 *
 * @param KbdProps
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/kbd}
 */
const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        'pr-twp tw-rounded tw-border tw-border-border tw-bg-muted tw-px-1 tw-py-0.5 tw-font-mono tw-text-xs',
        className,
      )}
      {...props}
    />
  );
});

Kbd.displayName = 'Kbd';

export { Kbd };
