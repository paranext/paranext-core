import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Direction, readDirection } from '@/utils/dir-helper.util';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * The Popover component displays rich content in a portal, triggered by a button. This popover is
 * built on Radix UI's Popover component and styled by Shadcn UI.
 *
 * See Shadcn UI Documentation https://ui.shadcn.com/docs/components/popover See Radix UI
 * Documentation https://www.radix-ui.com/docs/primitives/components/popover
 */
const Popover = PopoverPrimitive.Root;

/** @inheritdoc Popover */
const PopoverTrigger = PopoverPrimitive.Trigger;

/** @inheritdoc Popover */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
          'tw-z-[250]',
          'pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
          className,
        )}
        {...props}
        dir={dir}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
