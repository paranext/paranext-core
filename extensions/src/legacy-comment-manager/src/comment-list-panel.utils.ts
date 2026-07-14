/**
 * Web view type for the fixed Column 3 Comment List Panel. Shared between `main.ts` (which
 * registers the provider) and the web view itself (which reads its own `webViewType` prop to tell
 * the panel apart from the editor-anchored comment list).
 */
export const COMMENT_LIST_PANEL_WEB_VIEW_TYPE = 'legacyCommentManager.commentListPanel';

/**
 * Resolves the projectId to display in the Comment List Panel.
 *
 * Priority order (highest to lowest):
 *
 * 1. Pending sentinel (set by openCommentListPanel before reloadWebView)
 * 2. OpenWebViewOptions
 * 3. SavedWebView
 *
 * The sentinel exists because reloadWebView has no way to forward extra data into getWebView; the
 * caller writes to the sentinel and getWebView reads and clears it.
 *
 * @param pending The module-level sentinel set by openCommentListPanel, or undefined if not set
 * @param fromOptions The projectId from OpenWebViewOptions passed to getWebView
 * @param fromSaved The projectId stored on the SavedWebViewDefinition
 */
export function resolveCommentListPanelProjectId(
  pending: string | undefined,
  fromOptions: string | undefined,
  fromSaved: string | undefined,
): string | undefined {
  return pending ?? fromOptions ?? fromSaved;
}
