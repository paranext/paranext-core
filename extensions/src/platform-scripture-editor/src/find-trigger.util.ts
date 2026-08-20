/**
 * Normalize one candidate selection into something Find can search for, or `''` if it is not a
 * search term at all.
 *
 * Trimming matters because a double-click word selection often carries a trailing space, and
 * searching for `"grace "` finds far less than `"grace"`. Selections that span lines are rejected
 * outright: Find's search box is a single-line input, so a multi-line selection (Ctrl+A, or a drag
 * across verses) cannot be shown honestly, and pre-filling one would flatten a whole passage into a
 * run-on term, run a doomed search, and push it into the shared search history.
 */
function toSearchTerm(selectionText: string | undefined): string {
  const trimmed = (selectionText ?? '').trim();
  return /[\r\n]/.test(trimmed) ? '' : trimmed;
}

/**
 * Choose the text a Find trigger should search for.
 *
 * The live document selection wins when there is one. It can be gone by the time a tab-menu item is
 * chosen — the pointer press that opens the dropdown collapses the selection — so a snapshot taken
 * immediately before that press is the fallback. Every Find trigger goes through here, so all of
 * them normalize identically; see {@link toSearchTerm} for what that means.
 *
 * @param liveSelectionText Text currently selected in the document, if any.
 * @param selectionTextBeforePointerPress Text that was selected immediately before the most recent
 *   pointer press outside the tab's text content. Pass `undefined` from any trigger that does not
 *   destroy the selection it acts on — a keystroke, for instance.
 * @returns The search text, or an empty string when nothing usable is or was selected. An empty
 *   string means "open Find without pre-filling" — it leaves an already-open panel's search box
 *   alone.
 */
export function resolveFindSelectionText(
  liveSelectionText: string | undefined,
  selectionTextBeforePointerPress: string | undefined,
): string {
  return toSearchTerm(liveSelectionText) || toSearchTerm(selectionTextBeforePointerPress);
}

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
