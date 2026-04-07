/**
 * Generic overlay modal shell. Renders any dialog component inside a modal overlay with backdrop,
 * focus trap, centering, and accessibility attributes. The dialog component receives its props
 * directly - the shell only provides the modal wrapper.
 */

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from 'platform-bible-react';
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
      <DialogContent
        showCloseButton={false}
        overlayClassName="overlay-modal-backdrop tw-bg-black/40"
        data-overlay-modal-dialog
        role={typeof overlay.props.role === 'string' ? overlay.props.role : 'dialog'}
        aria-modal="true"
        className="tw-flex tw-max-h-[85vh] tw-min-h-0 tw-flex-col tw-overflow-hidden"
      >
        {/* Radix requires DialogTitle and DialogDescription inside DialogContent for
            accessibility. The inner dialog component may render its own visible versions;
            these hidden ones satisfy Radix for dialogs that don't. */}
        <VisuallyHidden asChild>
          <DialogTitle>
            {typeof overlay.props.title === 'string' ? overlay.props.title : 'Dialog'}
          </DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>
            {(() => {
              if (typeof overlay.props.prompt === 'string') return overlay.props.prompt;
              if (typeof overlay.props.title === 'string') return overlay.props.title;
              return 'Dialog';
            })()}
          </DialogDescription>
        </VisuallyHidden>
        {/* Flex-1 + min-h-0 + overflow-hidden fills the modal shell; each dialog body scrolls its
            own region. An outer overflow-y here scrolls the whole body and can push action buttons
            off-screen for tall dialogs (e.g. select books), breaking hit-testing in E2E. */}
        <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-overflow-hidden">
          {createElement(overlay.Component, overlay.props)}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OverlayModalDialog;
