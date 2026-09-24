import { clampTopToVisibleArea } from '../editor-dom.util';

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
  const finalTop = clampTopToVisibleArea(
    para.getBoundingClientRect(),
    positionAnchor.getBoundingClientRect(),
    scrollContainer.getBoundingClientRect(),
  );

  // Always anchor at the leading margin (left = 0) so indented paragraphs (e.g. \q, \q2)
  // show their tooltip at the editor's left edge, not at the indented position.
  return { top: finalTop, left: 0 };
}
