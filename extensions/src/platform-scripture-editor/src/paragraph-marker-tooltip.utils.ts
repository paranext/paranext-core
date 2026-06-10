/**
 * Extracts the USFM marker code from a paragraph element's className string. e.g. 'para usfm_q1
 * ContentEditable__root' → 'q1'
 */
export function extractMarker(className: string): string | undefined {
  return /\busfm_(\S+)/.exec(className)?.[1];
}

export type TooltipPosition = { top: number; left: number };

/**
 * Computes the tooltip anchor position in positionAnchor content coordinates.
 *
 * ScrollContainer is an ancestor of positionAnchor — the element whose scrolling causes paragraph
 * positions to change. positionAnchor.scrollTop staying 0 while text visibly scrolls is the symptom
 * of passing the wrong element.
 *
 * Because scrollContainer is an ancestor, positionAnchor and para move together in the viewport as
 * the user scrolls. The viewport-relative delta already gives the correct content-relative
 * position; no scrollTop addition is needed. scrollContainer's viewport top is used only for the
 * "clamp to visible area" logic.
 */
export function computePosition(
  para: HTMLElement,
  positionAnchor: HTMLElement,
  scrollContainer: HTMLElement,
): TooltipPosition {
  const anchorRect = positionAnchor.getBoundingClientRect();
  const paraRect = para.getBoundingClientRect();

  // Both positionAnchor and para move together when the ancestor scrollContainer scrolls,
  // so the viewport delta is already the content-relative position.
  const topInContent = paraRect.top - anchorRect.top;
  const bottomInContent = paraRect.bottom - anchorRect.top;

  // Determine where the visible area begins in positionAnchor content coordinates, so we
  // can pin the anchor to the viewport top for paras that have partially scrolled off.
  const { top: scrollerTop } = scrollContainer.getBoundingClientRect();
  const visibleAreaTop = scrollerTop - anchorRect.top;

  const ANCHOR_HEIGHT = 1;
  // Pin to top of visible area when para has scrolled above viewport.
  const clampedTop = Math.max(topInContent, visibleAreaTop);
  // Don't let the anchor exceed the paragraph's own bottom.
  const finalTop = Math.min(clampedTop, bottomInContent - ANCHOR_HEIGHT);

  // Always anchor at the leading margin (left = 0) so indented paragraphs (e.g. \q, \q2)
  // show their tooltip at the editor's left edge, not at the indented position.
  return { top: finalTop, left: 0 };
}
