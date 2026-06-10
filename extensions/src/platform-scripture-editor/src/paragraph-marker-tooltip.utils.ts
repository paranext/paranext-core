/**
 * Extracts the USFM marker code from a paragraph element's className string. e.g. 'para usfm_q1
 * ContentEditable__root' → 'q1'
 */
export function extractMarker(className: string): string | undefined {
  return /\busfm_(\S+)/.exec(className)?.[1];
}

export type TooltipPosition = { top: number; left: number };

/**
 * Computes the tooltip anchor position in scroll-content coordinates.
 *
 * Separating positionAnchor from scrollContainer handles the case where Editorial introduces its
 * own internal scroll container inside our position:relative wrapper.
 * positionAnchorRef.current.scrollTop being 0 while text visibly scrolls is the symptom of getting
 * this wrong.
 */
export function computePosition(
  para: HTMLElement,
  positionAnchor: HTMLElement,
  scrollContainer: HTMLElement,
): TooltipPosition {
  const anchorRect = positionAnchor.getBoundingClientRect();
  const paraRect = para.getBoundingClientRect();
  const { scrollTop } = scrollContainer;

  // Convert viewport-relative rects to scroll-content-relative coordinates.
  const topInContent = paraRect.top - anchorRect.top + scrollTop;
  const bottomInContent = paraRect.bottom - anchorRect.top + scrollTop;
  const leftInContainer = paraRect.left - anchorRect.left;

  const ANCHOR_HEIGHT = 1;
  // Pin to top of visible area when para has scrolled above viewport.
  const clampedTop = Math.max(topInContent, scrollTop);
  // Don't let the anchor exceed the paragraph's own bottom.
  const finalTop = Math.min(clampedTop, bottomInContent - ANCHOR_HEIGHT);

  return { top: finalTop, left: leftInContainer };
}
