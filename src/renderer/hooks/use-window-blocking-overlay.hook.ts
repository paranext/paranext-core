import { useEffect } from 'react';
import { registerWindowBlockingOverlay } from '@renderer/services/window-blocking-overlay-store';

/**
 * Marks this window as held by a full-screen overlay for as long as `isBlocking` is true, so
 * handlers that must stand down while the user cannot reach the window behind it — the content-zoom
 * chords, for one — can ask one question instead of knowing about each overlay.
 *
 * Called above the overlay's own early return, with the same expression that return uses, so the
 * flag and what is on screen cannot drift apart.
 */
export function useWindowBlockingOverlay(isBlocking: boolean): void {
  useEffect(() => (isBlocking ? registerWindowBlockingOverlay() : undefined), [isBlocking]);
}

export default useWindowBlockingOverlay;
