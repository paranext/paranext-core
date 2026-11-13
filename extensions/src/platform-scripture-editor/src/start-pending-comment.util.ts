/** The side effects of starting a pending comment, in the order {@link startPendingComment} runs them */
export type PendingCommentSteps = {
  /** Records the range the comment will be saved against */
  recordPendingRange: () => void;
  /** Highlights that range in the text */
  highlightPendingRange: () => void;
  /** Anchors the comment editor popover within the rendered text */
  anchorPopover: (editorContainer: HTMLElement) => void;
  /** Opens the comment editor popover */
  openCommentEditor: () => void;
};

/**
 * Starts a pending comment at the current selection — records its range, highlights it, anchors the
 * comment editor popover within the rendered text and opens it — or, when `root` has no rendered
 * text (no `.usfm` element) to anchor the popover to, does none of these.
 *
 * All or nothing. Only the popover's cancel and save handlers clear the recorded range and the
 * highlight, so either one left behind with no popover open would strand a highlight in the text
 * with no way to remove it, and misdirect the next comment actually saved to the stale range. And a
 * popover opened with nothing to anchor to sits at the pane's origin or a stale previous anchor.
 *
 * @param root Where the editor renders its text, normally `document`
 * @param steps The side effects to run
 * @returns Whether the comment editor opened
 */
export function startPendingComment(root: ParentNode, steps: PendingCommentSteps): boolean {
  const editorContainer = root.querySelector<HTMLElement>('.usfm');
  if (!editorContainer) return false;

  steps.recordPendingRange();
  steps.highlightPendingRange();
  steps.anchorPopover(editorContainer);
  steps.openCommentEditor();
  return true;
}
