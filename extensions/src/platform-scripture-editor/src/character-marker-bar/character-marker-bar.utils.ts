import { clampTopToVisibleArea, findTopLevelEditorBlock } from '../editor-dom.util';

/** A rect whose every edge is 0 — what a Range reports when it has no layout to measure. */
function isDegenerate(rect: DOMRect): boolean {
  return rect.top === 0 && rect.bottom === 0 && rect.left === 0 && rect.right === 0;
}

/** The line the caret is on, plus the top-level block that owns it. */
export type ActiveLine = {
  /** The rect to anchor to — the caret's own line, or the block's rect when that degenerates. */
  rect: DOMRect;
  /**
   * The top-level editor block the caret is inside (see `findTopLevelEditorBlock`): a marked
   * paragraph, verses outside any paragraph marker, or the `\id` or chapter line. Returned
   * alongside the rect because the caller needs the SAME block's font metrics to measure the
   * baseline against: the editor's first paragraph is typically a `\mt1` heading at 166% font-size,
   * so measuring that one would misalign the bar on every body line.
   */
  para: HTMLElement;
};

/**
 * Resolves the line the caret is on, for anchoring the character-marker bar.
 *
 * A collapsed caret's `Range` rect is zero-width but line-height-tall, which is precisely the
 * "active line" the bar tracks — finer-grained than the containing paragraph, which may wrap over
 * many lines. That rect degenerates to all-zeros at empty paragraphs, at some node boundaries, and
 * whenever the document has no layout at all (a `display: none` iframe), so fall back to the
 * containing block's rect rather than reporting a position at the top of the editor.
 *
 * A NON-COLLAPSED selection anchors to the TOP of the selection, by design — not to the end the
 * user is dragging. The range's union rect spans every selected line, so its `top` is the first
 * selected line's, and the paragraph comes from `anchorNode` (the fixed end) rather than
 * `focusNode` (the moving one). Extending a selection downward therefore leaves the bar where the
 * selection began. That is the right readout for this control: the bar reports the marker coverage
 * of the WHOLE selection, so pinning it to a stable edge keeps it from chasing the pointer while
 * the thing it describes is still being chosen.
 *
 * @param selection The document's current selection, or `undefined` when there is none
 * @param editorRoot The editor element the selection must be inside to count
 * @returns The rect to anchor to and the block it came from, or `undefined` when the caret is not
 *   inside an editor block
 */
export function resolveActiveLineRect(
  selection: Selection | undefined,
  editorRoot: HTMLElement,
): ActiveLine | undefined {
  if (!selection || selection.rangeCount === 0) return undefined;

  const { anchorNode } = selection;
  if (!anchorNode || !editorRoot.contains(anchorNode)) return undefined;

  const para = findTopLevelEditorBlock(anchorNode, editorRoot);
  if (!para) return undefined;

  const caretRect = selection.getRangeAt(0).getBoundingClientRect();
  return { rect: isDegenerate(caretRect) ? para.getBoundingClientRect() : caretRect, para };
}

/**
 * Computes the bar's `top` in `positionAnchor` content coordinates.
 *
 * Only the vertical axis is computed: the bar is pinned horizontally with `inset-inline-end: 0`, so
 * CSS logical properties handle that half and mirror it for RTL with no math at all.
 *
 * @param targetRect The active line's rect, from {@link resolveActiveLineRect}
 * @param positionAnchor The `position: relative` element that owns the coordinate space
 * @param scrollContainer The scrolling ancestor of `positionAnchor`
 * @param baselineOffset Pixels to shift the bar down so its trigger lines up with the line's text
 *   rather than with the line box's top edge. Defaults to `0`, the correct value while the offset
 *   is still unmeasurable (a hidden view)
 * @returns The `top` to apply to the bar's container
 */
export function computeBarTop(
  targetRect: { top: number; bottom: number },
  positionAnchor: HTMLElement,
  scrollContainer: HTMLElement,
  baselineOffset = 0,
): number {
  return clampTopToVisibleArea(
    // Only the TOP edge is shifted. `clampTopToVisibleArea`'s lower bound is `bottom - 1`, so
    // leaving `bottom` alone is what makes an over-large offset get clamped to just above the line
    // instead of dropping the bar onto the next one — the guard comes for free rather than needing
    // a second clamp here.
    { top: targetRect.top + baselineOffset, bottom: targetRect.bottom },
    positionAnchor.getBoundingClientRect(),
    scrollContainer.getBoundingClientRect(),
  );
}
