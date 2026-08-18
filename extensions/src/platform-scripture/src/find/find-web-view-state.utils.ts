import type { ScrollGroupScrRef, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import type { FindWebViewOptions } from '../find.web-view-provider';

/**
 * Pick the scroll group the Find WebView should follow. Extracted from
 * `FindWebViewProvider.getWebView` alongside {@link buildFindWebViewState} so the rule is
 * unit-testable without importing the WebView's `?inline` content.
 *
 * Simple mode forces group 0, matching the Scripture editor, model text panel, Text Collection, and
 * comment list panel — Find follows the single reference the top-toolbar BCV drives. The web view
 * also reads that group's source project to resolve a project when its own tab carries none, which
 * is what makes the seeded Column 3 Find tab usable before the first Ctrl+F.
 *
 * Power mode takes the caller's group, falling back to the saved one so a trigger with no group of
 * its own (a read-only reference panel, or a content reload/restore, which passes no options at
 * all) leaves an already-grouped Find panel in the group it was following.
 */
export function resolveFindScrollGroupScrRef(
  interfaceMode: string,
  savedWebView: SavedWebViewDefinition,
  getWebViewOptions: FindWebViewOptions,
): ScrollGroupScrRef | undefined {
  if (interfaceMode === 'simple') return 0;
  return getWebViewOptions.editorScrollGroupId ?? savedWebView.scrollGroupScrRef;
}

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
