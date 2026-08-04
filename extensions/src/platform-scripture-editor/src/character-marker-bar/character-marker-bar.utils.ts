import { clampTopToVisibleArea } from '../editor-dom.util';

/**
 * The USFM paragraph elements the editor renders. Matches the selector
 * `ParagraphMarkerTooltipOverlay` uses, so both overlays agree on what a paragraph is.
 */
export const EDITOR_PARA_SELECTOR = '.para[class*="usfm_"]';

/** A rect whose every edge is 0 — what a Range reports when it has no layout to measure. */
function isDegenerate(rect: DOMRect): boolean {
  return rect.top === 0 && rect.bottom === 0 && rect.left === 0 && rect.right === 0;
}

/**
 * Resolves the rect of the line the caret is on, for anchoring the character-marker bar.
 *
 * A collapsed caret's `Range` rect is zero-width but line-height-tall, which is precisely the
 * "active line" the bar tracks — finer-grained than the containing paragraph, which may wrap over
 * many lines. That rect degenerates to all-zeros at empty paragraphs, at some node boundaries, and
 * whenever the document has no layout at all (a `display: none` iframe), so fall back to the
 * containing paragraph's rect rather than reporting a position at the top of the editor.
 *
 * @param selection The document's current selection, or `undefined` when there is none
 * @param editorRoot The editor element the selection must be inside to count
 * @returns The rect to anchor to, or `undefined` when the caret is not in an editor paragraph
 */
export function resolveActiveLineRect(
  selection: Selection | undefined,
  editorRoot: HTMLElement,
): DOMRect | undefined {
  if (!selection || selection.rangeCount === 0) return undefined;

  const { anchorNode } = selection;
  if (!anchorNode || !editorRoot.contains(anchorNode)) return undefined;

  // A text node has no .closest(); start from its parent element.
  const anchorElement =
    anchorNode instanceof Element ? anchorNode : (anchorNode.parentElement ?? undefined);
  const para = anchorElement?.closest<HTMLElement>(EDITOR_PARA_SELECTOR);
  if (!para) return undefined;

  const caretRect = selection.getRangeAt(0).getBoundingClientRect();
  return isDegenerate(caretRect) ? para.getBoundingClientRect() : caretRect;
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
 * @returns The `top` to apply to the bar's container
 */
export function computeBarTop(
  targetRect: { top: number; bottom: number },
  positionAnchor: HTMLElement,
  scrollContainer: HTMLElement,
): number {
  return clampTopToVisibleArea(
    targetRect,
    positionAnchor.getBoundingClientRect(),
    scrollContainer.getBoundingClientRect(),
  );
}
