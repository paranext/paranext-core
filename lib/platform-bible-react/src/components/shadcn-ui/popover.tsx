import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Direction, readDirection } from '@/utils/dir-helper.util';

import { cn } from '@/utils/shadcn-ui.util';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';

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
const PopoverAnchor = PopoverPrimitive.Anchor;

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
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, style, ...props }, ref) => {
  const dir: Direction = readDirection(); // CUSTOM RTL support
  const portalContainer = React.useContext(PopoverPortalContainerContext); // CUSTOM read portal container override (see context above)
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    <PopoverPrimitive.Portal container={portalContainer ?? undefined}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
          className,
        )}
        // CUSTOM z-index uses shared constant instead of default tw-z-50
        style={{ zIndex: Z_INDEX_ABOVE_DOCK, ...style }}
        {...props}
        dir={dir} // CUSTOM RTL support
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// CUSTOM: export `PopoverPortalContainerProvider` alongside the standard shadcn exports
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverPortalContainerProvider };
