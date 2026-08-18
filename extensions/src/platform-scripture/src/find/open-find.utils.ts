import type { SavedWebViewDefinition, ScrollGroupScrRef } from '@papi/core';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '../scripture-editor-web-view-type.const';

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
   * `useWebViewController(SCRIPTURE_EDITOR_WEBVIEW_TYPE, id)` hang ~20s and then log an unhandled
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
 * Decide whether an already-open Find panel must be reloaded to reflect a new trigger. Reloading
 * remounts the panel — it discards in-progress results and re-runs the search — so it must fire
 * when, and only when, one of these differs from what the panel already holds:
 *
 * - `projectId` — the project/resource to search;
 * - `selectedText` — a caller-supplied selection to pre-fill, and only when it differs from the term
 *   the panel is already showing (only a reload injects a new term into an open panel's search box;
 *   re-injecting the term already there would remount the panel and blank its results for nothing —
 *   the common case when Ctrl+F fires repeatedly on the same selection); or
 * - `editorWebViewIdForFind` — the editor coupling. A panel trigger resolves this to `undefined`
 *   (read-only panels register no controller), so without a reload the panel keeps a stale
 *   `editorWebViewId` from a prior open-from-editor and re-points Find at the wrong — or a closed —
 *   editor, hanging `useWebViewController(SCRIPTURE_EDITOR_WEBVIEW_TYPE, staleId)` ~20s. The same
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
  if (selectedText && existingFind?.state?.findSearchTerm !== selectedText) return true;
  return existingFind?.state?.editorWebViewId !== editorWebViewIdForFind;
}
