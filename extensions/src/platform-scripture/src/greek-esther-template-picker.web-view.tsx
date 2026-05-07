/**
 * === NEW IN PT10 === WP-002 (2026-05-01): Standalone web-view entry point for the Greek Esther
 * template picker.
 *
 * The WP-002 hot path is _inline_ usage from `manage-books.web-view.tsx`, where the picker is
 * rendered as a peer Radix Dialog inside the same React tree. That path bypasses this file entirely
 * (it imports the presentational component directly).
 *
 * This file exists so a future caller (e.g. a Tools-menu shortcut) can open the picker as a
 * free-floating dialog via
 * `papi.webViews.openWebView('platformScripture.greekEstherTemplatePicker', ...)` and discover the
 * user's choice through `useWebViewState`.
 */
import { useCallback } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import {
  GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS,
  GreekEstherTemplate,
  GreekEstherTemplatePicker,
  GreekEstherTemplatePickerLocalizedStrings,
} from './greek-esther-template-picker.component';

/**
 * The picker's web-view-state shape. The standalone web-view path writes one of these into the
 * saved state when the user picks OK / Cancel; the caller subscribes to discover the result.
 *
 * - `'pending'` — open, awaiting user decision (initial state)
 * - `'selected'` — user clicked OK; `template` carries the choice
 * - `'cancelled'` — user clicked Cancel, pressed Escape, or clicked the overlay
 */
export type GreekEstherTemplatePickerResult =
  | { kind: 'pending' }
  | { kind: 'selected'; template: GreekEstherTemplate }
  | { kind: 'cancelled' };

global.webViewComponent = function GreekEstherTemplatePickerWebView({
  useWebViewState,
}: WebViewProps) {
  // Spread `readonly` tuple into a mutable array so the hook signature accepts it.
  const [strings] = useLocalizedStrings([...GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS]);
  // Build a typed map by copying the picker's keys out of the shared map. Avoids `as`-assertion
  // (banned by no-type-assertion lint rule).
  const localizedStrings: GreekEstherTemplatePickerLocalizedStrings = {};
  GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS.forEach((key) => {
    const value = strings[key];
    if (typeof value === 'string') localizedStrings[key] = value;
  });

  const [, setResult] = useWebViewState<GreekEstherTemplatePickerResult>('pickerResult', {
    kind: 'pending',
  });

  const handleSelect = useCallback(
    (template: GreekEstherTemplate) => {
      setResult({ kind: 'selected', template });
    },
    [setResult],
  );

  const handleCancel = useCallback(() => {
    setResult({ kind: 'cancelled' });
  }, [setResult]);

  return (
    <GreekEstherTemplatePicker
      open
      onSelect={handleSelect}
      onCancel={handleCancel}
      localizedStrings={localizedStrings}
    />
  );
};
