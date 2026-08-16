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

/**
 * Arguments for the `platformScripture.openFind` command when Ctrl+F is pressed in a scripture
 * editor tab: the editor's own web view id and its current text selection.
 */
export interface EditorOpenFindArgs {
  webViewId: string;
  selectedText: string;
}

/**
 * Build the `openFind` arguments for a Ctrl+F in a scripture editor tab. Unlike the reference-panel
 * trigger, the editor always opens Find — the backend resolves the search project from the editor's
 * own web view definition, so no source project is passed here — and it forwards the current
 * selection so Find pre-fills and searches it. A missing selection is normalized to an empty string
 * (Find then opens without pre-filling).
 */
export function getEditorOpenFindArgs(
  webViewId: string,
  selectedText: string | undefined,
): EditorOpenFindArgs {
  return { webViewId, selectedText: selectedText ?? '' };
}
