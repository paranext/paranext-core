/**
 * Arguments for the `platformScripture.openFind` command when Ctrl+F is pressed in a resource /
 * model-text panel: the triggering panel's web view id, the current text selection, and the
 * displayed resource's project id (the search source).
 */
export interface OpenFindTriggerArgs {
  webViewId: string;
  selectedText: string;
  sourceProjectId: string;
}

/**
 * Decide whether Ctrl+F in a resource / model-text panel should open Find, and with what arguments.
 * Returns `undefined` (a no-op) when no resource is currently displayed — Find must never fall back
 * to searching the panel's container project.
 */
export function getOpenFindTriggerArgs(
  webViewId: string | undefined,
  displayedResourceProjectId: string | undefined,
  selectedText: string,
): OpenFindTriggerArgs | undefined {
  if (!webViewId || !displayedResourceProjectId) return undefined;
  return { webViewId, selectedText, sourceProjectId: displayedResourceProjectId };
}
