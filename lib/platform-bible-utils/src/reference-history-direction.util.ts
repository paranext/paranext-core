/**
 * Resolve a physical arrow/bracket navigation direction to the logical reference-history direction
 * for the current UI layout direction. In LTR the left key goes back and the right key goes
 * forward; in RTL the pair swaps meaning (physical-direction preserving, like Paratext 9 and
 * Chromium).
 *
 * Single source of truth for the RTL swap so the main-process keyboard dispatch and the toolbar's
 * shortcut-hint display can never disagree about which physical key goes back.
 *
 * @param physicalDirection The physical key pressed: `'left'` (ArrowLeft / `[`) or `'right'`
 *   (ArrowRight / `]`)
 * @param interfaceDirection The current UI layout direction
 * @returns `'back'` or `'forward'` — the logical history direction the key should navigate
 */
export function resolveReferenceHistoryDirection(
  physicalDirection: 'left' | 'right',
  interfaceDirection: 'ltr' | 'rtl',
): 'back' | 'forward' {
  // The physical key that means "forward" in this layout: right in LTR, left in RTL.
  const forwardKey = interfaceDirection === 'rtl' ? 'left' : 'right';
  return physicalDirection === forwardKey ? 'forward' : 'back';
}
