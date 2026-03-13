/**
 * Thin wrapper that connects the presentational OverlayModalDialog from platform-bible-react to the
 * renderer's overlay store. Resolves any LocalizeKey values in dialog options before passing them
 * to the presentational component.
 *
 * Default button labels and titles use platform-level LocalizeKeys (%general_ok%, %general_cancel%,
 * %overlay_dialog_title_*%) that are resolved here so the presentational component always receives
 * display-ready strings.
 */

import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { removeOverlay } from '@renderer/services/overlay-store';
import {
  ModalDialogOptions,
  ModalDialogType,
  OverlayEntry,
} from '@shared/models/overlay.service-model';
import { OverlayModalDialog as PresentationalModalDialog } from 'platform-bible-react';
import { useCallback, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

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

type OverlayModalDialogProps = {
  overlay: Extract<OverlayEntry, { type: 'modalDialog' }>;
};

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
      removeOverlay(overlay.id);
      overlay.resolve(result);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    removeOverlay(overlay.id);
    // Dismiss without user action → resolve undefined (distinct from Cancel which resolves false)
    overlay.resolve(undefined);
  }, [overlay]);

  return (
    <PresentationalModalDialog
      dialogType={overlay.dialogType}
      options={localizedOptions}
      onResolve={handleResolve}
      onDismiss={handleDismiss}
    />
  );
}
