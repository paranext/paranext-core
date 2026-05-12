import React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';

// CUSTOM: Import shared z-index constants so modals stack above rc-dock and other overlay layers
import { Z_INDEX_MODAL, Z_INDEX_MODAL_BACKDROP } from '@/components/z-index';
import { cn } from '@/utils/shadcn-ui/utils';
import { Button } from '@/components/shadcn-ui/button';
// CUSTOM: Import readDirection for RTL support
import { readDirection } from '@/utils/dir-helper.util';
import { IconX } from '@tabler/icons-react';

/**
 * The Dialog component displays a modal dialog window. Built on Radix UI's Dialog primitive and
 * styled by Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * Button or element that opens the dialog when clicked.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * Portals the dialog content into `document.body` to avoid z-index and overflow issues.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * Button or element that closes the dialog when clicked.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * Semi-transparent backdrop rendered behind the dialog content. Animates on open/close.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogOverlay({
  className,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        'tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0',
        className,
      )}
      // CUSTOM: Use shared Z_INDEX_MODAL_BACKDROP constant so modals stack above rc-dock and overlay layers (replaces tw:z-50)
      style={{ zIndex: Z_INDEX_MODAL_BACKDROP, ...style }}
      {...props}
    />
  );
}

/**
 * Props for {@link DialogContent}. Extends the Radix UI Dialog.Content props with an optional
 * `overlayClassName` for per-instance backdrop styling and `showCloseButton` to control the close
 * button visibility.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
// CUSTOM: Extend DialogContentProps with overlayClassName prop to allow per-call backdrop styling
export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  /**
   * Additional CSS classes for the backdrop (`DialogOverlay`). Use when one dialog needs different
   * overlay styling than the default.
   */
  overlayClassName?: string;
  showCloseButton?: boolean;
};

/**
 * Main container for dialog content. Renders inside a portal with an overlay backdrop, centered on
 * screen. Includes an optional close button in the top corner.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style,
  ...props
}: DialogContentProps) {
  // CUSTOM: Use readDirection for RTL support — sets dir on dialog content so text direction is correct
  const dir = readDirection();
  return (
    <DialogPortal>
      {/* CUSTOM: Pass overlayClassName to DialogOverlay for per-call backdrop styling */}
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          'pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95',
          className,
        )}
        // CUSTOM: Use shared Z_INDEX_MODAL constant so dialog stacks above rc-dock and overlay layers (replaces tw:z-50)
        style={{ zIndex: Z_INDEX_MODAL, ...style }}
        // CUSTOM: Set dir for RTL text direction inside dialog content
        dir={dir}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button variant="ghost" className="tw:absolute tw:top-2 tw:end-2" size="icon-sm">
              <IconX />
              <span className="tw:sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * Container for the dialog's header area. Stacks title and description vertically.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        'pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Container for the dialog's footer area. Lays out action buttons in a row on larger screens.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

/**
 * Renders the dialog's title as a styled heading. Used inside DialogHeader.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders the dialog's description text in a muted style. Used inside DialogHeader.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
