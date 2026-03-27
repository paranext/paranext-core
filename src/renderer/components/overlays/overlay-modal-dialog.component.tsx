/**
 * Generic overlay modal shell. Renders any dialog component inside a modal overlay with backdrop,
 * focus trap, centering, and accessibility attributes. The dialog component receives its props
 * directly - the shell only provides the modal wrapper.
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
} from 'platform-bible-react';
import { createElement, useCallback, useRef } from 'react';

type OverlayModalShellProps = {
  overlay: Extract<OverlayEntry, { type: 'modalDialog' }>;
};

/**
 * Generic modal shell for the overlay service. Wraps any dialog component in a modal overlay with
 * backdrop, centering, focus trap, and z-index management. The dialog component is rendered inside
 * the modal content area with its pre-built props.
 *
 * Escape / click-outside dismissal resolves the overlay with `undefined`.
 */
export function OverlayModalDialog({ overlay }: OverlayModalShellProps) {
  const hasResolved = useRef(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      // Escape / click-outside dismissal - resolve undefined.
      // When the inner dialog component calls submitDialog/cancelDialog, those callbacks call
      // resolveAndRemoveOverlay directly, which removes the overlay from the store. Radix then
      // fires onOpenChange(false) as the dialog unmounts. The hasResolved guard prevents a
      // second resolveAndRemoveOverlay call (which would be a harmless no-op since the store
      // entry is already gone, but this makes the intent explicit).
      if (!open && !hasResolved.current) {
        hasResolved.current = true;
        resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
      }
    },
    [overlay],
  );

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="overlay-modal-backdrop"
          style={{ zIndex: Z_INDEX_MODAL_BACKDROP, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        />
        {/* CUSTOM: Using DialogPrimitive.Content instead of the platform-bible-react
            DialogContent component because DialogContent bundles its own DialogPortal,
            DialogOverlay (we need custom backdrop opacity and z-index management), and a
            close (X) button (inner dialog components handle their own dismissal). The
            className below duplicates DialogContent's visual styling (positioning, animations,
            sizing). To eliminate this duplication, DialogContent could be refactored to export
            its base className as a constant or accept props to disable the close button and
            skip the bundled portal/overlay. */}
        <DialogPrimitive.Content
          data-overlay-modal-dialog
          role={typeof overlay.props.role === 'string' ? overlay.props.role : 'dialog'}
          aria-modal="true"
          className="pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg"
          style={{ zIndex: Z_INDEX_MODAL, maxHeight: '85vh', overflowY: 'auto' }}
        >
          {/* Radix requires DialogTitle and DialogDescription inside DialogContent for
              accessibility. The inner dialog component may render its own visible versions;
              these hidden ones satisfy Radix for dialogs that don't. */}
          <VisuallyHidden asChild>
            <DialogPrimitive.Title>
              {typeof overlay.props.title === 'string' ? overlay.props.title : 'Dialog'}
            </DialogPrimitive.Title>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogPrimitive.Description>
              {(() => {
                if (typeof overlay.props.prompt === 'string') return overlay.props.prompt;
                if (typeof overlay.props.title === 'string') return overlay.props.title;
                return 'Dialog';
              })()}
            </DialogPrimitive.Description>
          </VisuallyHidden>
          {createElement(overlay.Component, overlay.props)}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export default OverlayModalDialog;
