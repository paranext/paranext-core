/**
 * Presentational overlay modal dialog component. Renders a modal dialog using Radix Dialog.
 * Supports alert and confirm dialog types with appropriate UI elements, keyboard handling, and
 * accessibility attributes.
 *
 * This is a pure presentational component with no dependency on the overlay store. The renderer's
 * overlay wrapper connects it to the store.
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { LocalizeKey } from 'platform-bible-utils';
import { type KeyboardEvent, type ReactNode, useCallback, useRef } from 'react';
import { Button } from '../../shadcn-ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '../../shadcn-ui/dialog';
import { Z_INDEX_MODAL, Z_INDEX_MODAL_BACKDROP } from '../../z-index';

// ── Fallback Labels ──
// Plain-English defaults used when the renderer wrapper does not supply a localized value. The
// renderer's overlay wrapper resolves LocalizeKeys via useLocalizedStrings and passes display-ready
// strings, so these are last-resort fallbacks (e.g., Storybook or direct usage without the wrapper).

const DEFAULT_OK_LABEL = 'OK';
const DEFAULT_CANCEL_LABEL = 'Cancel';
const DEFAULT_TITLE_ALERT = 'Alert';
const DEFAULT_TITLE_CONFIRM = 'Confirm';
const DEFAULT_TITLE_DIALOG = 'Dialog';

// ── Public Types ──

/** The supported modal dialog types */
export type OverlayModalDialogType = 'alert' | 'confirm';

/** Options for each modal dialog type, keyed by dialog type */
export interface OverlayModalDialogOptions {
  alert: {
    title?: string | LocalizeKey;
    message: string | LocalizeKey;
    okLabel?: string | LocalizeKey;
  };
  confirm: {
    title?: string | LocalizeKey;
    message: string | LocalizeKey;
    okLabel?: string | LocalizeKey;
    cancelLabel?: string | LocalizeKey;
    destructive?: boolean;
  };
}

/** Props for the presentational OverlayModalDialog component */
export type OverlayModalDialogProps = {
  /** Which dialog variant to render */
  dialogType: OverlayModalDialogType;
  /** Type-specific dialog configuration */
  options: OverlayModalDialogOptions[OverlayModalDialogType];
  /** Called when the dialog resolves with a result */
  onResolve: (result: unknown) => void;
  /** Called when the dialog is dismissed without a result */
  onDismiss: () => void;
};

// ── Internal Components ──

/** Renders the alert dialog body (message + OK button) */
function AlertDialogBody({
  options,
  onOk,
}: {
  options: OverlayModalDialogOptions['alert'];
  onOk: () => void;
}) {
  return (
    <>
      <DialogDescription>{options.message}</DialogDescription>
      <DialogFooter>
        <Button onClick={onOk}>{options.okLabel ?? DEFAULT_OK_LABEL}</Button>
      </DialogFooter>
    </>
  );
}

/** Renders the confirm dialog body (message + OK/Cancel buttons) */
function ConfirmDialogBody({
  options,
  onOk,
  onCancel,
}: {
  options: OverlayModalDialogOptions['confirm'];
  onOk: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <DialogDescription>{options.message}</DialogDescription>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          {options.cancelLabel ?? DEFAULT_CANCEL_LABEL}
        </Button>
        <Button variant={options.destructive ? 'destructive' : 'default'} onClick={onOk}>
          {options.okLabel ?? DEFAULT_OK_LABEL}
        </Button>
      </DialogFooter>
    </>
  );
}

/** Determines the appropriate ARIA role for the dialog */
function getDialogRole(dialogType: OverlayModalDialogType): 'alertdialog' | 'dialog' {
  return dialogType === 'alert' || dialogType === 'confirm' ? 'alertdialog' : 'dialog';
}

function getDefaultTitle(dialogType: OverlayModalDialogType): string {
  switch (dialogType) {
    case 'alert':
      return DEFAULT_TITLE_ALERT;
    case 'confirm':
      return DEFAULT_TITLE_CONFIRM;
    default:
      return DEFAULT_TITLE_DIALOG;
  }
}

function renderDialogBody(
  dialogType: OverlayModalDialogType,
  options: OverlayModalDialogOptions[OverlayModalDialogType],
  onResolve: (result: unknown) => void,
  handleCancel: () => void,
): ReactNode {
  switch (dialogType) {
    case 'alert':
      return (
        <AlertDialogBody
          // TS can't narrow options union via dialogType; switch case guarantees the type
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          options={options as OverlayModalDialogOptions['alert']}
          onOk={() => onResolve(true)}
        />
      );
    case 'confirm':
      return (
        <ConfirmDialogBody
          // TS can't narrow options union via dialogType; switch case guarantees the type
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          options={options as OverlayModalDialogOptions['confirm']}
          onOk={() => onResolve(true)}
          onCancel={handleCancel}
        />
      );
    default:
      return undefined;
  }
}

// ── Main Component ──

/**
 * Renders a modal dialog using Radix Dialog. Supports alert and confirm dialog types with
 * appropriate UI elements, keyboard handling, and accessibility attributes.
 */
export function OverlayModalDialog({
  dialogType,
  options,
  onResolve,
  onDismiss,
}: OverlayModalDialogProps) {
  const hasResolved = useRef(false);

  const resolveOnce = useCallback(
    (result: unknown) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      onResolve(result);
    },
    [onResolve],
  );

  const handleCancel = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    onDismiss();
  }, [onDismiss]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) handleCancel();
    },
    [handleCancel],
  );

  const dialogRole = getDialogRole(dialogType);
  const title =
    ('title' in options && typeof options.title === 'string' ? options.title : undefined) ||
    getDefaultTitle(dialogType);

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      {/* Compose portal + overlay + content manually instead of using DialogContent,
          which renders its own portal + overlay internally. This avoids duplicate backdrops
          and lets us control z-index for the overlay layering system. */}
      <DialogPortal>
        <DialogOverlay
          className="overlay-modal-backdrop tw-bg-black/40"
          style={{ zIndex: Z_INDEX_MODAL_BACKDROP }}
        />
        <DialogPrimitive.Content
          data-overlay-modal-dialog
          role={dialogRole}
          aria-modal="true"
          className="pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg"
          style={{ zIndex: Z_INDEX_MODAL }}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter' && dialogType === 'alert') {
              e.preventDefault();
              resolveOnce(true);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {renderDialogBody(dialogType, options, resolveOnce, handleCancel)}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
