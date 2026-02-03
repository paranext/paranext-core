import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/shadcn-ui.util';
import { ButtonProps, buttonVariants } from './button';

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
const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> & ButtonProps
>(({ className, variant, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    className={variant ? cn(buttonVariants({ variant }), className) : className}
    {...props}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

/** @inheritdoc Tooltip */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
