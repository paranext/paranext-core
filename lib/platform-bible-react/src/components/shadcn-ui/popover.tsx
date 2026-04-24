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

// CUSTOM: Context to override where `PopoverContent` portals to. By default Radix portals
// popovers to `document.body`, which is fine for top-level UI but breaks Radix Dialog's
// focus trap when a popover opens from inside a modal dialog — the portal'd content is
// outside the dialog's DOM subtree, so the trap yanks focus back out of the popover.
// Providing a container inside the dialog here lets the popover render as a DOM descendant
// of the dialog content and be accepted by the focus scope.
// eslint-disable-next-line no-null/no-null
const PopoverPortalContainerContext = React.createContext<HTMLElement | null>(null);

/**
 * Override the container that descendant `PopoverContent` components portal to. Render this inside
 * a modal Radix `DialogContent` (with its element as `container`) so that nested popovers remain
 * within the dialog's focus scope and keep working normally.
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

/** @inheritdoc Popover */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, style, ...props }, ref) => {
  const dir: Direction = readDirection();
  const portalContainer = React.useContext(PopoverPortalContainerContext);
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
        dir={dir}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverPortalContainerProvider };
