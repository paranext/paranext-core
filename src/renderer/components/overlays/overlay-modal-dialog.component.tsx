/**
 * Generic overlay modal shell. Renders any dialog component inside a modal overlay with backdrop,
 * focus trap, centering, and accessibility attributes. The dialog component receives its props
 * directly - the shell only provides the modal wrapper.
 *
 * Unlike the popover, command palette, and context menu overlays, this shell takes no content-zoom
 * scale and never applies one: a full-window modal is not anchored to the requesting pane's
 * content, so it draws at interface scale regardless of that pane's zoom.
 */

import { VisuallyHidden } from 'radix-ui';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from 'platform-bible-react';
import { createElement, useCallback, useRef } from 'react';
import './overlay-modal-dialog.component.scss';

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

  const providesOwnTitle = overlay.props.providesOwnTitle === true;
  const providesOwnDescription = overlay.props.providesOwnDescription === true;

  const rawSize = overlay.props.initialSize;
  const initialSize =
    typeof rawSize === 'object' &&
    rawSize &&
    'width' in rawSize &&
    'height' in rawSize &&
    typeof rawSize.width === 'number' &&
    typeof rawSize.height === 'number'
      ? { width: rawSize.width, height: rawSize.height }
      : undefined;

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="overlay-modal-backdrop"
        data-overlay-modal-dialog
        role={typeof overlay.props.role === 'string' ? overlay.props.role : 'dialog'}
        aria-modal="true"
        className="tw:flex tw:max-h-[85vh] tw:min-h-0 tw:flex-col tw:overflow-hidden"
        style={
          initialSize
            ? { maxWidth: initialSize.width, maxHeight: `min(${initialSize.height}px, 85vh)` }
            : undefined
        }
      >
        {/* Radix requires DialogTitle and DialogDescription inside DialogContent for
            accessibility. These hidden ones satisfy it for dialogs that render neither.
            A dialog that renders its own sets `providesOwnTitle` / `providesOwnDescription` on
            its `DialogDefinition` and gets no fallback for that half: the ids come from the one
            `Dialog.Root` context, so rendering either twice duplicates its id and leaves
            `aria-labelledby`/`aria-describedby` resolving to whichever comes first in document
            order — this generic text rather than the dialog's own localized text. The two are
            suppressed independently so a dialog that renders only one of them still gets the
            other. */}
        {!providesOwnTitle && (
          <VisuallyHidden.Root asChild>
            <DialogTitle>
              {typeof overlay.props.title === 'string' ? overlay.props.title : 'Dialog'}
            </DialogTitle>
          </VisuallyHidden.Root>
        )}
        {!providesOwnDescription && (
          <VisuallyHidden.Root asChild>
            <DialogDescription>
              {(() => {
                if (typeof overlay.props.prompt === 'string') return overlay.props.prompt;
                if (typeof overlay.props.title === 'string') return overlay.props.title;
                return 'Dialog';
              })()}
            </DialogDescription>
          </VisuallyHidden.Root>
        )}
        {/* Flex-1 + min-h-0 + overflow-hidden fills the modal shell; each dialog body scrolls its
            own region. An outer overflow-y here scrolls the whole body and can push action buttons
            off-screen for tall dialogs (e.g. select books), breaking hit-testing in E2E. */}
        <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:overflow-hidden">
          {createElement(overlay.Component, overlay.props)}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OverlayModalDialog;
