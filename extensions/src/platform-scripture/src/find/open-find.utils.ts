import type { ScrollGroupScrRef } from '@papi/core';

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
