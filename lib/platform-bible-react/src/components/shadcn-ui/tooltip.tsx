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
// CUSTOM: Shared portal-container factory (also used by popover.tsx) so this workaround is defined once
import { createPortalContainerContext } from '@/components/portal-container.context';

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

/* #region CUSTOM TooltipPortalContainerProvider — let descendant TooltipContent portal into a custom container instead of document.body */
const { PortalContainerProvider, usePortalContainer: useTooltipPortalContainer } =
  createPortalContainerContext();

/**
 * Keeps descendant {@link TooltipContent} inside `container` instead of `document.body`. Use it when
 * a tooltip sits inside an ancestor that stacks _above_ the tooltip layer: content portalled to the
 * body becomes a positioned sibling of that ancestor in the root stacking context, so the opaque
 * first-run wizard gate at `Z_INDEX_FIRST_RUN` (700) hides tooltips at `Z_INDEX_TOOLTIP` (550)
 * entirely.
 *
 * Contract:
 *
 * - Pass `null` for `container` until the ancestor element exists (the initial state of a
 *   ref-callback `useState`) to keep Radix's `document.body` default; once it exists, later opens
 *   portal into it.
 * - The ancestor must wrap this provider, not the other way round, so only its own descendants are
 *   redirected.
 * - Only affects tooltips mounted as React descendants; already-open tooltips are not re-portalled.
 *
 * `PopoverPortalContainerProvider` in `popover.tsx` does the same for popovers.
 *
 * @example
 *
 * ```tsx
 * const [dialogEl, setDialogEl] = useState<HTMLDivElement | null>(null);
 *
 * <Dialog open>
 *   <DialogContent ref={setDialogEl} style={{ zIndex: Z_INDEX_FIRST_RUN }}>
 *     <TooltipPortalContainerProvider container={dialogEl}>
 *       <FirstRunShell ... />
 *     </TooltipPortalContainerProvider>
 *   </DialogContent>
 * </Dialog>;
 * ```
 */
const TooltipPortalContainerProvider = PortalContainerProvider;
/* #endregion CUSTOM */

// CUSTOM: Added @inheritdoc TSDoc pointing to Tooltip for documentation inheritance
/** @inheritdoc Tooltip */
function TooltipContent({
  className,
  sideOffset = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow = true,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  // CUSTOM: showArrow prop — see comment above for full semantics
  showArrow?: boolean;
  // CUSTOM: arrowClassName prop — see comment above for full semantics
  arrowClassName?: string;
}) {
  // CUSTOM: Read portal container override (see TooltipPortalContainerProvider above) so tooltips
  // stay inside ancestors that stack above the tooltip layer (e.g. the first-run wizard gate).
  const portalContainer = useTooltipPortalContainer();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    <TooltipPrimitive.Portal container={portalContainer}>
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
        {/* CUSTOM: Conditionally render arrow based on showArrow prop */}
        {showArrow && (
          <TooltipPrimitive.Arrow
            // CUSTOM: Merge arrowClassName so it can override the default bg-foreground/fill-foreground.
            // Also (a) nudge the rotated-square arrow flush against the content box (translate-y), and
            // (b) clip it down to the triangular half that points away from the content box, so a
            // caller that adds a border via arrowClassName (e.g. the destructive confirmation hint)
            // doesn't get a doubled/crossing border line — or, without clipping the fill too, a
            // mismatched-color fill bleeding into the content — where the unclipped "back" half of the
            // diamond overlaps the content's own border.
            //
            // Empirically (verified via getBoundingClientRect straddle measurements, not just visual
            // inspection — see PT-4236 investigation) side="top" needs the exact same translate/clip as
            // side="bottom", NOT the mirrored values symmetry would suggest — this falls out of Radix
            // computing the arrow's base position from its declared height prop (5), while we override
            // the *rendered* height to 10 via CSS (tw:size-2.5), and that mismatch isn't direction-
            // specific. Keyed off the ancestor Content's own data-side via in-data-*, since Radix
            // doesn't put data-side on the Arrow itself. Clipping is a no-op for the default
            // borderless/same-fill arrow, so this is safe generally.
            //
            // side="left"/"right" deliberately get NO translate-x/clip-path here: mirroring the
            // top/bottom axis-not-direction logic for left/right was tried and found very buggy
            // (arrow polygon positioned and clipped incorrectly), and no consumer today needs a
            // bordered left/right arrow (`destructive-key-confirmation.component.tsx` only borders
            // top/bottom). Left/right therefore keep the plain unclipped default diamond. Work out
            // the correct left/right math and add the classes back if/when a bordered left/right
            // arrow consumer shows up.
            className={cn(
              'tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground',
              'tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]',
              'tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]',
              arrowClassName,
            )}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

// CUSTOM: Export TooltipPortalContainerProvider alongside the stock exports
export { Tooltip, TooltipContent, TooltipPortalContainerProvider, TooltipProvider, TooltipTrigger };
