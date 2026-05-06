'use client';

import React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Import ButtonProps and buttonVariants to allow TooltipTrigger to accept button variants
import { ButtonProps, buttonVariants } from '@/components/shadcn-ui/button';
// CUSTOM: Use Z_INDEX_TOOLTIP (above Z_INDEX_MODAL=500) so tooltips triggered from
// inside a modal dialog (e.g. help icons in form fields) render above the modal instead
// of behind it. The prior Z_INDEX_ABOVE_DOCK=250 was below the modal layer.
import { Z_INDEX_TOOLTIP } from '@/components/z-index';

// CUSTOM: Added @inheritdoc TSDoc pointing to Tooltip for documentation inheritance
/** @inheritdoc Tooltip */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation for this component
/**
 * Tooltip components provide a popover that displays information related to an element when hovered
 * or focused. These components are built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tooltip}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tooltip}
 */
function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

// CUSTOM: TooltipTrigger is enhanced to accept ButtonProps (specifically the variant prop), so the
// trigger can be styled directly with button variants without needing a nested button element.
// When variant is provided, buttonVariants classes are applied and pr-twp is included via those
// classes; when no variant is provided, no extra DOM classes are added.
/** @inheritdoc Tooltip */
function TooltipTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger> & ButtonProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={variant ? cn(buttonVariants({ variant }), className) : className}
      {...props}
    />
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to Tooltip for documentation inheritance
/** @inheritdoc Tooltip */
function TooltipContent({
  className,
  sideOffset = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        // CUSTOM: Use Z_INDEX_TOOLTIP (above Z_INDEX_MODAL=500) so tooltips triggered from
        // inside a modal dialog (e.g. help icons in form fields) render above the modal instead
        // of behind it. The prior Z_INDEX_ABOVE_DOCK=250 was below the modal layer.
        style={{ zIndex: Z_INDEX_TOOLTIP, ...style }}
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          'pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
