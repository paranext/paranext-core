'use client';

import React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/shadcn-ui/utils';

/**
 * A drawer component for React. Built on Vaul and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/drawer}
 * @see Vaul Documentation: {@link https://vaul.emilkowal.ski/getting-started}
 */
function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

/** @inheritdoc Drawer */
function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

/** @inheritdoc Drawer */
function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

/** @inheritdoc Drawer */
function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

/** @inheritdoc Drawer */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:fixed tw:inset-0 tw:z-50 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Props for {@link DrawerContent}. Extends the Vaul DrawerPrimitive.Content props with
 * `hideDrawerHandle` to allow callers to suppress the drag handle.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/drawer}
 * @see Vaul Documentation: {@link https://vaul.emilkowal.ski/getting-started}
 */
// CUSTOM: Extend DrawerPrimitive.Content with hideDrawerHandle prop to allow suppressing the drag handle
interface DrawerContentProps extends React.ComponentProps<typeof DrawerPrimitive.Content> {
  /** Optionally hide the drawer handle */
  hideDrawerHandle?: boolean;
}

/** @inheritdoc Drawer */
function DrawerContent({
  className,
  children,
  // CUSTOM: Destructure hideDrawerHandle to conditionally render the drag handle
  hideDrawerHandle = false,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          'pr-twp tw:group/drawer-content tw:fixed tw:z-50 tw:flex tw:h-auto tw:flex-col tw:bg-popover tw:text-sm tw:text-popover-foreground tw:data-[vaul-drawer-direction=bottom]:inset-x-0 tw:data-[vaul-drawer-direction=bottom]:bottom-0 tw:data-[vaul-drawer-direction=bottom]:mt-24 tw:data-[vaul-drawer-direction=bottom]:max-h-[80vh] tw:data-[vaul-drawer-direction=bottom]:rounded-t-xl tw:data-[vaul-drawer-direction=bottom]:border-t tw:data-[vaul-drawer-direction=left]:inset-y-0 tw:data-[vaul-drawer-direction=left]:start-0 tw:data-[vaul-drawer-direction=left]:w-3/4 tw:data-[vaul-drawer-direction=left]:rounded-e-xl tw:data-[vaul-drawer-direction=left]:border-e tw:data-[vaul-drawer-direction=right]:inset-y-0 tw:data-[vaul-drawer-direction=right]:end-0 tw:data-[vaul-drawer-direction=right]:w-3/4 tw:data-[vaul-drawer-direction=right]:rounded-s-xl tw:data-[vaul-drawer-direction=right]:border-s tw:data-[vaul-drawer-direction=top]:inset-x-0 tw:data-[vaul-drawer-direction=top]:top-0 tw:data-[vaul-drawer-direction=top]:mb-24 tw:data-[vaul-drawer-direction=top]:max-h-[80vh] tw:data-[vaul-drawer-direction=top]:rounded-b-xl tw:data-[vaul-drawer-direction=top]:border-b tw:data-[vaul-drawer-direction=left]:sm:max-w-sm tw:data-[vaul-drawer-direction=right]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        {/* CUSTOM: Conditionally render the drag handle based on hideDrawerHandle prop */}
        {!hideDrawerHandle && (
          <div className="tw:mx-auto tw:mt-4 tw:hidden tw:h-1 tw:w-[100px] tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/** @inheritdoc Drawer */
function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:p-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center tw:group-data-[vaul-drawer-direction=top]/drawer-content:text-center tw:md:gap-0.5 tw:md:text-start',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Drawer */
function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Drawer */
function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:font-heading tw:text-base tw:font-medium tw:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc Drawer */
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:text-sm tw:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
export type { DrawerContentProps };
