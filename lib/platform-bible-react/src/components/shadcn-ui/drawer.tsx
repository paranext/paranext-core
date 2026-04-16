'use client';

import React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Added Direction and readDirection imports for RTL-safe handle positioning
import { type Direction, readDirection } from '@/utils/dir-helper.util';

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
  // CUSTOM: readDirection() for RTL-safe children text direction inside the drawer
  const dir: Direction = readDirection();
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          // CUSTOM: Changed left/right drawer positioning from logical (start-0/end-0,
          // rounded-e/s-xl, border-e/s) to physical (left-0/right-0, rounded-r/l-xl, border-r/l).
          // Vaul's slide animation is physical, so logical properties in RTL caused the drawer to
          // appear on the wrong side and cover most of the screen.
          // CUSTOM: Added tw:data-[vaul-drawer-direction=left/right]:flex-row so the drag handle
          // sits on the open edge of left/right drawers instead of at the top.
          'pr-twp tw:group/drawer-content tw:fixed tw:z-50 tw:flex tw:h-auto tw:flex-col tw:bg-popover tw:text-sm tw:text-popover-foreground tw:data-[vaul-drawer-direction=bottom]:inset-x-0 tw:data-[vaul-drawer-direction=bottom]:bottom-0 tw:data-[vaul-drawer-direction=bottom]:mt-24 tw:data-[vaul-drawer-direction=bottom]:max-h-[80vh] tw:data-[vaul-drawer-direction=bottom]:rounded-t-xl tw:data-[vaul-drawer-direction=bottom]:border-t tw:data-[vaul-drawer-direction=left]:inset-y-0 tw:data-[vaul-drawer-direction=left]:left-0 tw:data-[vaul-drawer-direction=left]:w-3/4 tw:data-[vaul-drawer-direction=left]:rounded-r-xl tw:data-[vaul-drawer-direction=left]:border-r tw:data-[vaul-drawer-direction=left]:flex-row tw:data-[vaul-drawer-direction=right]:inset-y-0 tw:data-[vaul-drawer-direction=right]:right-0 tw:data-[vaul-drawer-direction=right]:w-3/4 tw:data-[vaul-drawer-direction=right]:rounded-l-xl tw:data-[vaul-drawer-direction=right]:border-l tw:data-[vaul-drawer-direction=right]:flex-row tw:data-[vaul-drawer-direction=top]:inset-x-0 tw:data-[vaul-drawer-direction=top]:top-0 tw:data-[vaul-drawer-direction=top]:mb-24 tw:data-[vaul-drawer-direction=top]:max-h-[80vh] tw:data-[vaul-drawer-direction=top]:rounded-b-xl tw:data-[vaul-drawer-direction=top]:border-b tw:data-[vaul-drawer-direction=left]:sm:max-w-sm tw:data-[vaul-drawer-direction=right]:sm:max-w-sm',
          className,
        )}
        // CUSTOM: Force physical LTR direction on the flex container. In RTL, CSS flex-direction:row
        // flows right-to-left, which would put the "before-children" handle on the wrong side.
        // The children wrapper below restores the correct text direction for content inside.
        dir="ltr"
        {...props}
      >
        {/* CUSTOM: Conditionally render drag handles for all drawer directions.
            Bottom/Right: handle appears before children (top of bottom drawer, left of right drawer).
            Top/Left: handle appears after children (bottom of top drawer, right of left drawer).
            Left/Right drawers are flex-row so the handle sits on the open edge. Children are wrapped
            in a flex-col div so they still stack vertically inside horizontal drawers. */}
        {!hideDrawerHandle && (
          <div className="tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:mt-4 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=bottom]/drawer-content:block tw:group-data-[vaul-drawer-direction=right]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=right]/drawer-content:ms-4 tw:group-data-[vaul-drawer-direction=right]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=right]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=right]/drawer-content:block" />
        )}
        {/* CUSTOM: dir={dir} restores correct text direction for drawer content after dir="ltr" above */}
        <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col" dir={dir}>
          {children}
        </div>
        {!hideDrawerHandle && (
          <div className="tw:hidden tw:shrink-0 tw:rounded-full tw:bg-muted tw:group-data-[vaul-drawer-direction=top]/drawer-content:mx-auto tw:group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 tw:group-data-[vaul-drawer-direction=top]/drawer-content:h-1.5 tw:group-data-[vaul-drawer-direction=top]/drawer-content:w-[100px] tw:group-data-[vaul-drawer-direction=top]/drawer-content:block tw:group-data-[vaul-drawer-direction=left]/drawer-content:my-auto tw:group-data-[vaul-drawer-direction=left]/drawer-content:me-4 tw:group-data-[vaul-drawer-direction=left]/drawer-content:h-[100px] tw:group-data-[vaul-drawer-direction=left]/drawer-content:w-1.5 tw:group-data-[vaul-drawer-direction=left]/drawer-content:block" />
        )}
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
