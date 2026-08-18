/**
 * Arguments for the `platformScripture.openFind` command when Ctrl+F is pressed in a scripture tab:
 * the triggering tab's web view id, the current text selection, and the project id of the scripture
 * the tab is showing (the search source).
 */
export interface OpenFindTriggerArgs {
  webViewId: string;
  selectedText: string;
  sourceProjectId: string;
}

/**
 * Decide whether Ctrl+F in a scripture tab should open Find, and with what arguments. Returns
 * `undefined` (a no-op) when the tab has no scripture resolved yet — Find must never fall back to
 * searching a reference panel's container project, which is not what the panel is showing.
 *
 * @param webViewId The triggering tab's own web view id (always supplied by `WebViewProps`).
 * @param sourceProjectId Project id of the scripture the tab is showing — the editor's own project
 *   for a Scripture editor tab, the displayed resource's project for a reference panel — or
 *   `undefined` while none is resolved.
 * @param selectedText The tab's current text selection, used to pre-fill Find. May be empty.
 */
export function getOpenFindTriggerArgs(
  webViewId: string,
  sourceProjectId: string | undefined,
  selectedText: string,
): OpenFindTriggerArgs | undefined {
  if (!sourceProjectId) return undefined;
  return { webViewId, selectedText, sourceProjectId };
}
