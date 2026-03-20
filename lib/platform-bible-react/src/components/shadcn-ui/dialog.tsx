import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { Z_INDEX_MODAL, Z_INDEX_MODAL_BACKDROP } from '@/components/z-index';
import { cn } from '@/utils/shadcn-ui.util';
import { readDirection } from '@/utils/dir-helper.util';

// CUSTOM JSDoc comments added to all components for documentation
/**
 * The Dialog component displays a modal dialog window. Built on Radix UI's Dialog component and
 * styled by Shadcn UI.
 *
 * See Shadcn UI Documentation https://ui.shadcn.com/docs/components/dialog See Radix UI
 * Documentation https://www.radix-ui.com/docs/primitives/components/dialog
 */
const Dialog = DialogPrimitive.Root;

/** Button or element that opens the dialog when clicked. */
const DialogTrigger = DialogPrimitive.Trigger;

/** Portals the dialog content into `document.body` to avoid z-index and overflow issues. */
const DialogPortal = DialogPrimitive.Portal;

/** Button or element that closes the dialog when clicked. */
const DialogClose = DialogPrimitive.Close;

/** Semi-transparent backdrop rendered behind the dialog content. Animates on open/close. */
function DialogOverlay({
  className,
  style,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>>;
}) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
        'tw:fixed tw:inset-0 tw:bg-black/80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0',
        className,
      )}
      // CUSTOM: shared z-index scale so modals stack above rc-dock and overlay layers (replaces tw:z-50)
      style={{ zIndex: Z_INDEX_MODAL_BACKDROP, ...style }}
      {...props}
    />
  );
}

// CUSTOM: Extend DialogContentProps with overlayClassName prop
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /**
   * Additional CSS classes for the backdrop (`DialogOverlay`). Use when one dialog needs different
   * overlay styling than the default.
   */
  overlayClassName?: string;
};

/**
 * Main container for dialog content. Renders inside a portal with an overlay backdrop, centered on
 * screen. Includes a close button in the top corner.
 */
function DialogContent({
  className,
  children,
  overlayClassName,
  style,
  ref,
  ...props
}: DialogContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>;
}) {
  const dir = readDirection();
  return (
    <DialogPortal>
      {/* CUSTOM: Pass overlayClassName to DialogOverlay for per-call backdrop styling */}
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // CUSTOM: Remove tw:z-50 and replace with shared Z_INDEX_MODAL constant
          'pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg',
          className,
        )}
        // CUSTOM: use shared Z_INDEX_MODAL constant
        style={{ zIndex: Z_INDEX_MODAL, ...style }}
        {...props}
        dir={dir}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            'tw:absolute tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground',
            { 'tw:right-4': dir === 'ltr' },
            { 'tw:left-4': dir === 'rtl' },
          )}
        >
          <X className="tw:h-4 tw:w-4" />
          <span className="tw:sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/** Container for the dialog's header area. Stacks title and description vertically. */
function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'tw:flex tw:flex-col tw:space-y-1.5 tw:text-center tw:sm:text-start',
        className,
      )}
      {...props}
    />
  );
}

/** Container for the dialog's footer area. Lays out action buttons in a row on larger screens. */
function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'tw:flex tw:flex-col-reverse tw:sm:flex-row tw:sm:justify-end tw:sm:space-x-2',
        className,
      )}
      {...props}
    />
  );
}

/** Renders the dialog's title as a styled heading. Used inside DialogHeader. */
function DialogTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Title>>;
}) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight', className)}
      {...props}
    />
  );
}

/** Renders the dialog's description text in a muted style. Used inside DialogHeader. */
function DialogDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Description>>;
}) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('tw:text-sm tw:text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
