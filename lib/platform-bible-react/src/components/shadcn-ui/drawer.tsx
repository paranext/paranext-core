import React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/shadcn-ui.util';

// CUSTOM: Added context to manage drawer direction
const DrawerContext = React.createContext<{
  direction?: 'top' | 'bottom' | 'left' | 'right';
}>({
  direction: 'bottom',
});

/**
 * A drawer component for React. These components are built on Vaul and styled with Shadcn UI. See
 * Shadcn UI Documentation: https://ui.shadcn.com/docs/components/drawer See Vaul Documentation:
 * https://vaul.emilkowal.ski/getting-started
 */
function Drawer({
  shouldScaleBackground = true,
  direction = 'bottom',
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  // CUSTOM: Use context to provide direction to child components
  const contextValue = React.useMemo(() => ({ direction }), [direction]);
  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        direction={direction}
        {...props}
      />
    </DrawerContext.Provider>
  );
}
Drawer.displayName = 'Drawer';

/** @inheritdoc Drawer */
const DrawerTrigger = DrawerPrimitive.Trigger;

/** @inheritdoc Drawer */
const DrawerPortal = DrawerPrimitive.Portal;

/** @inheritdoc Drawer */
const DrawerClose = DrawerPrimitive.Close;

/** @inheritdoc Drawer */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

/* CUSTOM: Extend DrawerPrimitive.Content with additional props */
interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  /** Optionally hide the drawer handle */
  hideDrawerHandle?: boolean;
}

/** @inheritdoc Drawer */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, hideDrawerHandle = false, ...props }, ref) => {
  // CUSTOM: Use context to provide direction to child components
  const { direction = 'bottom' } = React.useContext(DrawerContext);

  // CUSTOM: Define positioning and styling based on direction
  const directionStyles = {
    bottom: 'tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]',
    top: 'tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]',
    left: 'tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm',
    right: 'tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm',
  };

  // CUSTOM: Define handle styles for each direction
  const handleStyles = {
    bottom: 'tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted',
    top: 'tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted',
    left: 'tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted',
    right: 'tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted',
  };

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          'pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background',
          direction === 'bottom' || direction === 'top' ? 'tw-flex-col' : 'tw-flex-row',
          directionStyles[direction],
          className,
        )}
        {...props}
      >
        {/* CUSTOM: Render handles and children based on direction and if the drawer handle is hidden */}
        {!hideDrawerHandle && (direction === 'bottom' || direction === 'right') && (
          <div className={handleStyles[direction]} />
        )}
        <div className="tw-flex tw-flex-col">{children}</div>
        {!hideDrawerHandle && (direction === 'top' || direction === 'left') && (
          <div className={handleStyles[direction]} />
        )}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

/** @inheritdoc Drawer */
function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left', className)}
      {...props}
    />
  );
}
DrawerHeader.displayName = 'DrawerHeader';

/** @inheritdoc Drawer */
function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4', className)} {...props} />
  );
}
DrawerFooter.displayName = 'DrawerFooter';

/** @inheritdoc Drawer */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

/** @inheritdoc Drawer */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('tw-text-sm tw-text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

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
