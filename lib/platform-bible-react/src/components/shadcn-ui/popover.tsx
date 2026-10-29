'use client';

import React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Dismiss the popover when the window blurs (a click into another iframe)
import { useDismissOnWindowBlur } from '@/hooks/use-dismiss-on-window-blur.hook';
// CUSTOM: Shared portal-container factory (also used by tooltip.tsx) so this workaround is defined once
import { createPortalContainerContext } from '@/context/portal-container.context';
// CUSTOM: Import direction helper for RTL support
import { Direction, readDirection } from '@/utils/dir-helper.util';
// CUSTOM: Import shared z-index constant to ensure popovers stack above the dock
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';

/**
 * The Popover component displays rich content in a portal, triggered by a button. This component is
 * built on Radix UI's Popover component and styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/popover}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/popover}
 */
function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/** @inheritdoc Popover */
function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/* #region CUSTOM PopoverPortalContainerProvider — let descendant PopoverContent portal into a custom container instead of document.body */
const { PortalContainerProvider, usePortalContainer: usePopoverPortalContainer } =
  createPortalContainerContext();

// CUSTOM: expand JSDoc — state the provider's contract and give a usage example. The shared factory
// carries the general rationale, so this keeps only what a popover caller needs.
/**
 * Keeps descendant {@link PopoverContent} inside `container` instead of `document.body`. Use it
 * whenever a popover's trigger sits inside an ancestor that owns a focus trap or a
 * dismiss-on-outside-click layer (`DialogContent`, `DropdownMenuContent`, …), which would otherwise
 * pull focus out of the popover or treat a click inside it as an outside click.
 *
 * Contract:
 *
 * - Pass `null` for `container` until the ancestor element exists (the initial state of a
 *   ref-callback `useState`) to keep Radix's `document.body` default; once it exists, later opens
 *   portal into it.
 * - The ancestor must wrap this provider, not the other way round, so only its own descendants are
 *   redirected.
 * - Only affects popovers mounted as React descendants; already-open popovers are not re-portalled.
 *
 * `TooltipPortalContainerProvider` in `tooltip.tsx` does the same for tooltips.
 *
 * @example
 *
 * ```tsx
 * const [dialogEl, setDialogEl] = useState<HTMLDivElement | null>(null);
 *
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogContent ref={setDialogEl}>
 *     <PopoverPortalContainerProvider container={dialogEl}>
 *       <BookChapterControl ... />
 *     </PopoverPortalContainerProvider>
 *   </DialogContent>
 * </Dialog>;
 * ```
 */
const PopoverPortalContainerProvider = PortalContainerProvider;
/* #endregion CUSTOM */

/** @inheritdoc Popover */
// CUSTOM: Carries no content-zoom marker and reads no zoom area, so this pop-up keeps interface
// scale when opened from zoomed content; pop-ups never follow content zoom (see ContentZoomRoot).
function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  // CUSTOM: Destructure ref (a regular prop in React 19) so it can be composed with the local ref
  // that useDismissOnWindowBlur reads
  ref: forwardedRef,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  // CUSTOM: Read document direction to support RTL layouts
  const dir: Direction = readDirection();
  // CUSTOM: Read portal container override (see PopoverPortalContainerProvider above) so nested
  // popovers stay inside modal dialogs. The hook already resolves "no provider in scope" to
  // undefined, which is what Radix's Portal wants for its document.body default, so nothing here
  // has to coalesce it.
  const portalContainer = usePopoverPortalContainer();
  // CUSTOM: Added useDismissOnWindowBlur so the popover closes when the window loses focus. A click
  // into another iframe never reaches this document, so the window's blur stands in for the outside
  // press; see the hook's TSDoc. The press targets the content's parent, so a dialog hosting this
  // popover (via PopoverPortalContainerProvider) sees an inside press and stays open.
  // React's ref API uses null as the empty value
  // eslint-disable-next-line no-null/no-null
  const contentRef = React.useRef<HTMLDivElement>(null);
  useDismissOnWindowBlur(contentRef);
  // CUSTOM: Compose the local ref with the caller's ref
  const setContentRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    <PopoverPrimitive.Portal container={portalContainer}>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        // CUSTOM: Composed ref so useDismissOnWindowBlur can find the content's parent
        ref={setContentRef}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          'pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95',
          className,
        )}
        // CUSTOM: z-index uses shared constant instead of default tw:z-50, ensuring popover renders above the dock
        style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}
        // CUSTOM: Apply document direction for RTL layout support
        dir={dir}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/** @inheritdoc Popover */
function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

/** @inheritdoc Popover */
function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm', className)}
      {...props}
    />
  );
}

/** @inheritdoc Popover */
function PopoverTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <div
      data-slot="popover-title"
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp tw:font-medium', className)}
      {...props}
    />
  );
}

/** @inheritdoc Popover */
function PopoverDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="popover-description"
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn('pr-twp tw:text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  // CUSTOM: export `PopoverPortalContainerProvider` alongside the standard shadcn exports
  PopoverPortalContainerProvider,
  PopoverTitle,
  PopoverTrigger,
};
