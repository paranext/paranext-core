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
function Switch({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof SwitchPrimitives.Root>>;
}) {
  const dir: Direction = readDirection();
  return (
    <SwitchPrimitives.Root
      className={cn(
        'tw:peer pr-twp tw:inline-flex tw:h-6 tw:w-11 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pr-twp tw:pointer-events-none tw:block tw:h-5 tw:w-5 tw:rounded-full tw:bg-background tw:shadow-lg tw:ring-0 tw:transition-transform',
          {
            'tw:data-[state=checked]:translate-x-5 tw:data-[state=unchecked]:translate-x-0':
              dir === 'ltr',
          },
          {
            'tw:data-[state=checked]:translate-x-[-20px] tw:data-[state=unchecked]:translate-x-0':
              dir === 'rtl',
          },
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
