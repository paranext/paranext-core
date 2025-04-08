import * as SwitchPrimitives from '@radix-ui/react-switch';
import React from 'react';

import { cn } from '@/utils/shadcn-ui.util';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * The Switch component is a control that allows the user to toggle between checked and not checked.
 * This component is built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/switch}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/switch}
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <SwitchPrimitives.Root
      className={cn(
        'tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input',
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform',
          {
            'data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0':
              dir === 'ltr',
          },
          {
            'data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0':
              dir === 'rtl',
          },
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
