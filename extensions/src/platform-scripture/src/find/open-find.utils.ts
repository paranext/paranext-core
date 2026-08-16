import type { SavedWebViewDefinition, ScrollGroupScrRef } from '@papi/core';

/**
 * Web view type of the Scripture editor / Resource viewer. Kept as a literal (this extension does
 * not import the platform-scripture-editor constant) — it must equal
 * `SCRIPTURE_EDITOR_WEBVIEW_TYPE` in
 * `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts`.
 */
export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/** The subset of a web view definition that `openFind` reads to decide what to open. */
export interface FindTriggerWebViewDefinition {
  id?: string;
  projectId?: string;
  webViewType?: string;
  scrollGroupScrRef?: ScrollGroupScrRef;
}

export interface ResolvedFindInvocation {
  /** Project/resource to search. */
  projectId: string | undefined;
  /** Scroll group the Find panel should follow. */
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  /** Id of the triggering tab; used for power-mode placement (`targetTabId`). */
  tabIdFromWebViewId: string | undefined;
  /**
   * Editor web view id forwarded to Find — ONLY when the trigger is a real scripture editor.
   * Read-only panels register no web view controller, so passing their id would make Find's
   * `useWebViewController('platformScriptureEditor.react', id)` hang ~20s and then log an unhandled
   * rejection. `undefined` for any non-editor trigger.
   */
  editorWebViewIdForFind: string | undefined;
}

/** Resolve everything `openFind` needs from the triggering web view + the optional explicit source. */
export function resolveFindInvocation(
  webViewDefinition: FindTriggerWebViewDefinition | undefined,
  editorWebViewId: string | undefined,
  sourceProjectId: string | undefined,
): ResolvedFindInvocation {
  return {
    projectId: sourceProjectId ?? webViewDefinition?.projectId,
    editorScrollGroupId: webViewDefinition?.scrollGroupScrRef,
    tabIdFromWebViewId: webViewDefinition?.id,
    editorWebViewIdForFind:
      webViewDefinition?.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE
        ? editorWebViewId
        : undefined,
  };
}

/**
 * Decide whether an already-open Find panel must be reloaded to reflect a new trigger. Reloading is
 * the only way fresh options reach an existing panel, so it must fire whenever any of these differ
 * from what the panel already holds:
 *
 * - `projectId` — the project/resource to search;
 * - `selectedText` — a caller-supplied selection to pre-fill (only a reload injects it into an
 *   already-open panel's search box); or
 * - `editorWebViewIdForFind` — the editor coupling. A panel trigger resolves this to `undefined`
 *   (read-only panels register no controller), so without a reload the panel keeps a stale
 *   `editorWebViewId` from a prior open-from-editor and re-points Find at the wrong — or a closed —
 *   editor, hanging `useWebViewController('platformScriptureEditor.react', staleId)` ~20s. The same
 *   clause also re-points Find when Ctrl+F fires in a different editor for the same project.
 *
 * Returning `false` leaves the existing panel untouched; it is still brought to front by the
 * detect-and-reuse `openWebView` call in {@link openFind}, so no reload is needed just for focus.
 */
export function shouldReloadExistingFind(
  existingFind: SavedWebViewDefinition | undefined,
  projectId: string | undefined,
  editorWebViewIdForFind: string | undefined,
  selectedText: string | undefined,
): boolean {
  if (existingFind?.projectId !== projectId) return true;
  if (selectedText) return true;
  return existingFind?.state?.editorWebViewId !== editorWebViewIdForFind;
}
