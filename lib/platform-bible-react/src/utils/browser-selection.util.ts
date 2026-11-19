/**
 * Runs `action`, then puts the browser selection back where it was if `action` moved it.
 *
 * The Scripture editor's copy (with no clipboard event to write to) selects a hidden element it
 * appends at the end of the document, copies that way, and removes the element, which leaves the
 * browser selection at the end of the document. The `selectionchange` that follows makes a
 * read-only editor take that as its own selection, and anything that follows the caret (the
 * scroll-group reference) moves there. Putting the selection back in the same turn means that event
 * finds the user's selection again.
 *
 * A selection whose nodes the action removed is not put back: the browser ignores a selection on
 * nodes outside the document. Nothing is kept when there is no browser selection to begin with, for
 * example while a paragraph marker is the editor's selection.
 *
 * @param action What to run
 * @param doc The document whose selection to keep; without one, `action` just runs
 * @experimental This function is unstable and may change shape or disappear without notice
 */
export function runKeepingBrowserSelection(
  action: () => void,
  doc: Document | undefined = globalThis.document,
): void {
  const selection = doc?.getSelection();
  const anchorNode = selection?.anchorNode;
  const focusNode = selection?.focusNode;
  if (!selection || !anchorNode || !focusNode) {
    action();
    return;
  }
  const { anchorOffset, focusOffset } = selection;
  try {
    action();
  } finally {
    const hasMoved =
      selection.anchorNode !== anchorNode ||
      selection.anchorOffset !== anchorOffset ||
      selection.focusNode !== focusNode ||
      selection.focusOffset !== focusOffset;
    if (hasMoved) {
      try {
        selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      } catch {
        // The action changed the text under the old selection; there is nothing to put back.
      }
    }
  }
}
