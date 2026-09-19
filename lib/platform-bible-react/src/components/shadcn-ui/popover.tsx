'use client';

import React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Import direction helper for RTL support
import { Direction, readDirection } from '@/utils/dir-helper.util';
// CUSTOM: Import shared z-index constant to ensure popovers stack above the dock
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
// CUSTOM: Import the content-zoom area context so a popover opened from zoomed content follows
// that area's zoom
import { getContentZoomPopupStyle, useContentZoomArea } from '@/context/content-zoom-area.context';

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

// CUSTOM: expand JSDoc — explain focus-trap rationale and add usage examples
/* #region CUSTOM PopoverPortalContainerContext + Provider — let descendant PopoverContent portal into a custom container instead of document.body */
// Backing context for `PopoverPortalContainerProvider`. See the provider's JSDoc for rationale.
// eslint-disable-next-line no-null/no-null
const PopoverPortalContainerContext = React.createContext<HTMLElement | null>(null);

/**
 * Overrides the container that descendant {@link PopoverContent} components portal into. Use it to
 * keep popovers inside a Radix `DialogContent`, `DropdownMenuContent`, or any other ancestor that
 * owns a focus trap or dismiss-on-outside-click layer.
 *
 * @remarks
 * Radix `Popover` portals its content to `document.body` by default, which works fine for top-level
 * UI. The default breaks down whenever a popover trigger lives inside an ancestor that:
 *
 * - Runs a focus trap (`Dialog`, `AlertDialog`, modal `DropdownMenu`) — the trap yanks focus back out
 *   of the popover the instant it opens because the portal'd content is outside the trap's DOM
 *   subtree.
 * - Listens for outside-clicks (Radix `DismissableLayer`, used by every `*Menu`/`Dialog`) — a click
 *   inside the popover reads as "outside the menu" and dismisses the parent immediately.
 *
 * Wrapping the children of the trapping ancestor in this provider, with that ancestor's element as
 * `container`, makes nested `PopoverContent` portal as a DOM descendant of the trap so both focus
 * and dismiss-layer logic accept it.
 *
 * Single descendant scope: a `PopoverPortalContainerProvider` only affects `PopoverContent` mounts
 * rendered as React children. It does not retroactively re-portal already-mounted popovers, and it
 * does not affect popovers in sibling subtrees.
 *
 * Initial-mount behavior: pass `null` for `container` (the initial value of a `useState<HTMLElement
 *
 * | null>(null)` paired with a ref callback on the ancestor) to keep Radix's default
 *
 * `document.body` behavior until the ancestor mounts. Once the element exists, future popover opens
 * portal into it. The triggering ancestor (the trap owner) must wrap, not be wrapped by, this
 * provider.
 * @example
 *
 * ```tsx
 * function ScopeMenu() {
 *   const [dialogEl, setDialogEl] = useState<HTMLDivElement | null>(null);
 *
 *   return (
 *     <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *       <DialogContent ref={setDialogEl}>
 *         <PopoverPortalContainerProvider container={dialogEl}>
 *           <BookChapterControl ... />
 *         </PopoverPortalContainerProvider>
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 *
 * @example
 *
 * ```tsx
 * // Dropdown variant: same pattern, container is the DropdownMenuContent.
 * const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
 * <DropdownMenu>
 *   <DropdownMenuTrigger>...</DropdownMenuTrigger>
 *   <DropdownMenuContent ref={setContentEl}>
 *     <PopoverPortalContainerProvider container={contentEl}>
 *       <BookChapterControl ... />
 *     </PopoverPortalContainerProvider>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
function PopoverPortalContainerProvider({
  container,
  children,
}: {
  container: HTMLElement | null;
  children: React.ReactNode;
}) {
  return (
    <PopoverPortalContainerContext.Provider value={container}>
      {children}
    </PopoverPortalContainerContext.Provider>
  );
}
/* #endregion CUSTOM */

/** @inheritdoc Popover */
function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  // CUSTOM: Read document direction to support RTL layouts
  const dir: Direction = readDirection();
  // CUSTOM: Read portal container override (see PopoverPortalContainerContext above) so nested popovers stay inside modal dialogs.
  const portalContainer = React.useContext(PopoverPortalContainerContext);
  // CUSTOM: Read the content-zoom area this popover was opened from (undefined outside every area)
  const zoomArea = useContentZoomArea();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    <PopoverPrimitive.Portal container={portalContainer ?? undefined}>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          'pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95',
          // CUSTOM: Inside a content-zoom area, cap the width at the space Radix reports as available,
          // divided by the area's zoom factor: Radix measures in unzoomed pixels while this element's
          // own lengths are zoomed, so the division keeps a zoomed popover inside the pane
          zoomArea !== undefined &&
            'tw:max-w-[calc(var(--radix-popover-content-available-width)/var(--platform-content-zoom-popup-factor,1))]',
          // CUSTOM: Inside a content-zoom area, also cap the height at the space Radix reports as
          // available, divided by the area's zoom factor, so a tall zoomed popover stays inside the
          // pane vertically too (same unzoomed-vs-zoomed pixel reason as the width cap above). The
          // box scrolls, so content that cannot shrink to the capped size stays inside it instead of
          // painting past its edges. That makes this element a clipping ancestor for anything
          // rendered inside it: the editor's right-click menu portals into the footnote editor's
          // root, a descendant, and stays inside this box only because the editor library clamps
          // the menu against its clipping ancestors. A nested pop-up that does not do that would
          // be clipped here.
          zoomArea !== undefined &&
            'tw:max-h-[calc(var(--radix-popover-content-available-height)/var(--platform-content-zoom-popup-factor,1))] tw:overflow-y-auto',
          className,
        )}
        // CUSTOM: z-index uses shared constant instead of default tw:z-50, ensuring popover renders above the dock
        // CUSTOM: Inside a content-zoom area, also carry the area's zoom factor, which both the width
        // and the height cap above divide by
        style={{
          zIndex: Z_INDEX_ABOVE_DOCK,
          ...(zoomArea === undefined ? undefined : getContentZoomPopupStyle(zoomArea)),
          ...style,
        }}
        // CUSTOM: Apply document direction for RTL layout support
        dir={dir}
        // CUSTOM: Inside a content-zoom area, mark the content with that area so the platform's zoom
        // rule scales it, and flag it as pop-up content so the platform never counts it as a pane.
        // It is portaled out of the area element, so it is a marker of its own, not a nested one.
        data-platform-content-zoom-root={zoomArea}
        data-platform-content-zoom-popup={zoomArea === undefined ? undefined : ''}
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
