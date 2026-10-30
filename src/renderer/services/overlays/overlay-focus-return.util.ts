/**
 * Overlays whose close may hand focus back to the opener only when focus sits inside the overlay's
 * own content at that moment. A close that qualifies (Escape, the opener's own dismiss, app
 * deactivation) is marked here before the overlay is resolved; the overlay service consumes the
 * mark when it settles the overlay.
 */

/** Ids of overlays whose close is a candidate for returning focus to the opener */
const overlayIdsMarkedForFocusReturn = new Set<string>();

/**
 * Marks an overlay's coming close as one that returns focus to the opener, provided focus is inside
 * the overlay's own content when the overlay settles. Call it right before resolving the overlay.
 *
 * @param overlayId Id of the overlay about to close
 * @experimental This function is unstable and may change or disappear without notice
 */
export function markOverlayFocusReturnIfFocusInside(overlayId: string): void {
  overlayIdsMarkedForFocusReturn.add(overlayId);
}

/**
 * Reads and clears an overlay's mark set by {@link markOverlayFocusReturnIfFocusInside}.
 *
 * @param overlayId Id of the overlay that is settling
 * @returns Whether the overlay was marked
 * @experimental This function is unstable and may change or disappear without notice
 */
export function takeOverlayFocusReturnMark(overlayId: string): boolean {
  return overlayIdsMarkedForFocusReturn.delete(overlayId);
}
