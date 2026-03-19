/**
 * Overlay modal dialog component. Renders a modal dialog using Radix Dialog. Supports alert and
 * confirm dialog types with appropriate UI elements, keyboard handling, and accessibility
 * attributes.
 *
 * Contains both the presentational component (OverlayModalDialogPresentational, exported for tests
 * and stories) and the store-connected component (OverlayModalDialog) that resolves LocalizeKeys
 * and connects to the overlay store.
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import {
  ModalDialogOptions,
  ModalDialogType,
  OverlayEntry,
} from '@renderer/services/overlays/overlay.service-model';
import {
  Button,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
} from 'platform-bible-react';
import { type KeyboardEvent, type ReactNode, useCallback, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, type LocalizeKey } from 'platform-bible-utils';

// ── Fallback Labels ──
// Plain-English defaults used when the renderer wrapper does not supply a localized value. The
// store-connected component resolves LocalizeKeys via useLocalizedStrings and passes display-ready
// strings, so these are last-resort fallbacks (e.g., Storybook or direct usage without the wrapper).

const FALLBACK_OK_LABEL = 'OK';
const FALLBACK_CANCEL_LABEL = 'Cancel';
const FALLBACK_TITLE_ALERT = 'Alert';
const FALLBACK_TITLE_CONFIRM = 'Confirm';
const FALLBACK_TITLE_DIALOG = 'Dialog';

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

/** Props for the presentational OverlayModalDialogPresentational component */
export type OverlayModalDialogPresentationalProps = {
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
        <Button onClick={onOk}>{options.okLabel ?? FALLBACK_OK_LABEL}</Button>
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
          {options.cancelLabel ?? FALLBACK_CANCEL_LABEL}
        </Button>
        <Button variant={options.destructive ? 'destructive' : 'default'} onClick={onOk}>
          {options.okLabel ?? FALLBACK_OK_LABEL}
        </Button>
      </DialogFooter>
    </>
  );
}

/** Determines the appropriate ARIA role for the dialog */
function getDialogRole(dialogType: OverlayModalDialogType): 'alertdialog' | 'dialog' {
  return dialogType === 'alert' || dialogType === 'confirm' ? 'alertdialog' : 'dialog';
}

function getFallbackTitle(dialogType: OverlayModalDialogType): string {
  switch (dialogType) {
    case 'alert':
      return FALLBACK_TITLE_ALERT;
    case 'confirm':
      return FALLBACK_TITLE_CONFIRM;
    default:
      return FALLBACK_TITLE_DIALOG;
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

// ── Presentational Component ──

/**
 * Pure presentational modal dialog component. Renders a modal dialog using Radix Dialog. Supports
 * alert and confirm dialog types with appropriate UI elements, keyboard handling, and accessibility
 * attributes.
 *
 * This component has no dependency on the overlay store or localization hooks. Use it directly in
 * tests and Storybook stories. For production rendering via the overlay service, use
 * {@link OverlayModalDialog} instead — it handles LocalizeKey resolution and store lifecycle.
 */
export function OverlayModalDialogPresentational({
  dialogType,
  options,
  onResolve,
  onDismiss,
}: OverlayModalDialogPresentationalProps) {
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
    // Confirm Cancel button resolves false (explicit cancellation), distinct from
    // Escape/click-outside which calls onDismiss → resolves undefined
    resolveOnce(false);
  }, [resolveOnce]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      // Escape / click-outside dismissal → resolve undefined via onDismiss
      if (!open) {
        if (hasResolved.current) return;
        hasResolved.current = true;
        onDismiss();
      }
    },
    [onDismiss],
  );

  const dialogRole = getDialogRole(dialogType);
  const title =
    ('title' in options && typeof options.title === 'string' ? options.title : undefined) ||
    getFallbackTitle(dialogType);

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      {/* Compose portal + overlay + content manually instead of using DialogContent,
          which renders its own portal + overlay internally. This avoids duplicate backdrops
          and lets us control z-index for the overlay layering system. */}
      <DialogPortal>
        <DialogOverlay
          className="overlay-modal-backdrop"
          style={{ zIndex: Z_INDEX_MODAL_BACKDROP, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
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

// ── Localization Helpers ──

// Platform-level default keys for dialog buttons and titles
const DEFAULT_OK_LABEL: LocalizeKey = '%general_ok%';
const DEFAULT_CANCEL_LABEL: LocalizeKey = '%general_cancel%';
const DEFAULT_TITLE_ALERT: LocalizeKey = '%overlay_dialog_title_alert%';
const DEFAULT_TITLE_CONFIRM: LocalizeKey = '%overlay_dialog_title_confirm%';
const DEFAULT_TITLE_DIALOG: LocalizeKey = '%overlay_dialog_title_dialog%';

/** Returns the default title key for a given dialog type */
function getDefaultTitleKey(dialogType: ModalDialogType): LocalizeKey {
  switch (dialogType) {
    case 'alert':
      return DEFAULT_TITLE_ALERT;
    case 'confirm':
      return DEFAULT_TITLE_CONFIRM;
    default:
      return DEFAULT_TITLE_DIALOG;
  }
}

/**
 * Fills in default LocalizeKey values for any missing optional fields (title, okLabel,
 * cancelLabel), then collects all LocalizeKey values for resolution.
 */
function collectModalDialogKeys(
  dialogType: ModalDialogType,
  options: ModalDialogOptions[ModalDialogType],
): LocalizeKey[] {
  const keys: LocalizeKey[] = [];

  // Title: use provided value or default key
  const title =
    'title' in options && options.title ? options.title : getDefaultTitleKey(dialogType);
  if (isLocalizeKey(title)) keys.push(title);

  // Message
  if ('message' in options && isLocalizeKey(options.message)) keys.push(options.message);

  // OK label: use provided value or default key
  const okLabel = 'okLabel' in options && options.okLabel ? options.okLabel : DEFAULT_OK_LABEL;
  if (isLocalizeKey(okLabel)) keys.push(okLabel);

  // Cancel label (confirm only): use provided value or default key
  if (dialogType === 'confirm') {
    const cancelLabel =
      'cancelLabel' in options && options.cancelLabel ? options.cancelLabel : DEFAULT_CANCEL_LABEL;
    if (isLocalizeKey(cancelLabel)) keys.push(cancelLabel);
  }

  return keys;
}

/** Resolves LocalizeKey values in modal dialog options and fills in defaults */
function localizeModalDialogOptions(
  dialogType: ModalDialogType,
  options: ModalDialogOptions[ModalDialogType],
  localizedStrings: LanguageStrings,
): ModalDialogOptions[ModalDialogType] {
  const resolveValue = (value: string | LocalizeKey): string | LocalizeKey =>
    isLocalizeKey(value) ? (localizedStrings[value] ?? value) : value;

  // Fill in defaults then resolve
  const title =
    'title' in options && options.title ? options.title : getDefaultTitleKey(dialogType);
  const message = 'message' in options ? resolveValue(options.message) : undefined;
  const okLabel = 'okLabel' in options && options.okLabel ? options.okLabel : DEFAULT_OK_LABEL;

  const base = {
    ...options,
    title: resolveValue(title),
    ...(message !== undefined && { message }),
    okLabel: resolveValue(okLabel),
  };

  if (dialogType === 'confirm') {
    const cancelLabel =
      'cancelLabel' in options && options.cancelLabel ? options.cancelLabel : DEFAULT_CANCEL_LABEL;
    return { ...base, cancelLabel: resolveValue(cancelLabel) };
  }

  return base;
}

// ── Store-Connected Component ──

type OverlayModalDialogProps = {
  overlay: Extract<OverlayEntry, { type: 'modalDialog' }>;
};

/**
 * Production modal dialog component. Resolves LocalizeKey values in dialog options (title, message,
 * button labels) via `useLocalizedStrings`, fills in platform-level default keys, manages overlay
 * lifecycle, and delegates rendering to {@link OverlayModalDialogPresentational}.
 *
 * This is the component rendered by `OverlayHost`. Do not use it directly in tests or Storybook —
 * use {@link OverlayModalDialogPresentational} instead, which accepts plain props without requiring
 * an `OverlayEntry`.
 */
export function OverlayModalDialog({ overlay }: OverlayModalDialogProps) {
  const hasResolved = useRef(false);

  const localizeKeys = useMemo(
    () => collectModalDialogKeys(overlay.dialogType, overlay.options),
    [overlay.dialogType, overlay.options],
  );
  const [localizedStrings] = useLocalizedStrings(localizeKeys);

  const localizedOptions = useMemo(
    () => localizeModalDialogOptions(overlay.dialogType, overlay.options, localizedStrings),
    [overlay.dialogType, overlay.options, localizedStrings],
  );

  const handleResolve = useCallback(
    (result: unknown) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      resolveAndRemoveOverlay(overlay.id, overlay.type, result);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    // For confirm dialogs, Escape/click-outside resolves false (matching the boolean response type).
    // For alert dialogs, resolve undefined (no meaningful response).
    const dismissResult = overlay.dialogType === 'confirm' ? false : undefined;
    resolveAndRemoveOverlay(overlay.id, overlay.type, dismissResult);
  }, [overlay]);

  return (
    <OverlayModalDialogPresentational
      dialogType={overlay.dialogType}
      options={localizedOptions}
      onResolve={handleResolve}
      onDismiss={handleDismiss}
    />
  );
}
