import type { SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import type { FindWebViewOptions } from '../find.web-view-provider';

/**
 * Build the Find WebView's persisted `state` from its saved definition and the options `openFind`
 * supplies. Extracted from `FindWebViewProvider.getWebView` so this option→state mapping is
 * unit-testable without importing the WebView's `?inline` content.
 *
 * Two rules live here:
 *
 * - `initialSearchText` (the selection forwarded by Ctrl+F) is written to `findSearchTerm` so the
 *   find panel pre-fills and searches it. An empty/absent value is intentionally NOT written, so an
 *   empty selection never clobbers a restored or existing search term.
 * - `editorWebViewId` is taken from the caller when it supplies one, and dropped entirely when the
 *   caller sets `clearEditorWebViewId` — the signal `openFind` sends for a non-editor trigger.
 *   Without that clear, a `??` would resurrect the editor id from a prior open-from-editor and
 *   re-point Find at the wrong (or a closed) editor. Content reload/restore sets neither, so the
 *   saved value is preserved there.
 */
export function buildFindWebViewState(
  savedWebView: SavedWebViewDefinition,
  getWebViewOptions: FindWebViewOptions,
): WebViewDefinition['state'] {
  return {
    ...savedWebView.state,
    editorWebViewId: getWebViewOptions.clearEditorWebViewId
      ? undefined
      : (getWebViewOptions.editorWebViewId ?? savedWebView.state?.editorWebViewId),
    ...(getWebViewOptions.initialSearchText
      ? { findSearchTerm: getWebViewOptions.initialSearchText }
      : {}),
  };
}
