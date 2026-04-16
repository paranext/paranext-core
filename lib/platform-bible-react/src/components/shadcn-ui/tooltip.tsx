import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/shadcn-ui/utils';
import { ButtonProps, buttonVariants } from '@/components/shadcn-ui/button';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';

/** @inheritdoc Tooltip */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Tooltip components provide a popover that displays information related to an element when hovered
 * or focused. These components are built on Radix UI primitives and styled with Shadcn UI. See
 * Shadcn UI Documentation: https://ui.shadcn.com/docs/components/tooltip See Radix UI
 * Documentation: https://www.radix-ui.com/primitives/docs/components/tooltip
 */
const Tooltip = TooltipPrimitive.Root;

// CUSTOM: TooltipTrigger is a button, so allow to use the button variants (avoids the need for a nested button)
/** @inheritdoc Tooltip */
function TooltipTrigger({
  className,
  variant,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> &
  ButtonProps & {
    ref?: React.Ref<React.ComponentRef<typeof TooltipPrimitive.Trigger>>;
  }) {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      className={variant ? cn(buttonVariants({ variant }), className) : className}
      {...props}
    />
  );
}

/** @inheritdoc Tooltip */
function TooltipContent({
  className,
  sideOffset = 4,
  style,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof TooltipPrimitive.Content>>;
}) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      // CUSTOM z-index uses shared constant instead of default tw:z-50
      style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}
      className={cn(
        'pr-twp tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:px-3 tw:py-1.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
