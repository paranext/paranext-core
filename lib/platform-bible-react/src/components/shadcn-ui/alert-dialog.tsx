import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { Z_INDEX_MODAL, Z_INDEX_MODAL_BACKDROP } from '@/components/z-index';
import { cn } from '@/utils/shadcn-ui.util';
import { readDirection } from '@/utils/dir-helper.util';
import { buttonVariants } from '@/components/shadcn-ui/button';

/**
 * AlertDialog components display a modal dialog that interrupts the user with important content and
 * expects a response. These components are built and styled with Shadcn UI. See Shadcn UI
 * Documentation: https://ui.shadcn.com/docs/components/alert-dialog
 */
const AlertDialog = AlertDialogPrimitive.Root;

/** @inheritdoc AlertDialog */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/** @inheritdoc AlertDialog */
const AlertDialogPortal = AlertDialogPrimitive.Portal;

/** @inheritdoc AlertDialog */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant (see style)
      'tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0',
      className,
    )}
    // CUSTOM: shared z-index scale so modals stack above rc-dock and overlay layers (replaces tw-z-50)
    style={{ zIndex: Z_INDEX_MODAL_BACKDROP, ...style }}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

/** @inheritdoc AlertDialog */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, style, ...props }, ref) => {
  // CUSTOM: Read layout direction so the alert dialog respects the app's RTL setting
  const dir = readDirection();
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant (see style)
          'pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg',
          className,
        )}
        // CUSTOM: use shared Z_INDEX_MODAL constant
        style={{ zIndex: Z_INDEX_MODAL, ...style }}
        {...props}
        // CUSTOM: pass dir for RTL support (mirrors DialogContent)
        dir={dir}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

/** @inheritdoc AlertDialog */
function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('tw-flex tw-flex-col tw-space-y-2 tw-text-center sm:tw-text-left', className)}
      {...props}
    />
  );
}
AlertDialogHeader.displayName = 'AlertDialogHeader';

/** @inheritdoc AlertDialog */
function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2',
        className,
      )}
      {...props}
    />
  );
}
AlertDialogFooter.displayName = 'AlertDialogFooter';

/** @inheritdoc AlertDialog */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('tw-text-lg tw-font-semibold', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

/** @inheritdoc AlertDialog */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('tw-text-sm tw-text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

/** @inheritdoc AlertDialog */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

/** @inheritdoc AlertDialog */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), 'tw-mt-2 sm:tw-mt-0', className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
