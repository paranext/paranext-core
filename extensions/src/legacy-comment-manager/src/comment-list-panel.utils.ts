/**
 * Resolves the projectId to display in the Comment List Panel.
 *
 * Priority: pending sentinel (set by openCommentListPanel before reloadWebView) >
 * openWebViewOptions
 *
 * > SavedWebView. The sentinel exists because reloadWebView has no way to forward extra data into
 * > getWebView; the caller writes to the sentinel and getWebView reads and clears it.
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
  return pending !== undefined ? pending : (fromOptions ?? fromSaved);
}
