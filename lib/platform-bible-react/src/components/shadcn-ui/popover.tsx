'use client';

import React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
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

/* #region CUSTOM PopoverPortalContainerContext + Provider — let descendant PopoverContent portal into a custom container instead of document.body */
// Context to override where `PopoverContent` portals to. By default Radix portals
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
