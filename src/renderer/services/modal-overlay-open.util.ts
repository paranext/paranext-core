import { hasOverlayOfType } from '@renderer/services/overlays/overlay-store';
import { isWindowBlockedByOverlay } from '@renderer/services/window-blocking-overlay-store';

/**
 * Determine whether anything is holding this window's input, so a caller that must not act behind
 * it — a window-chrome key listener, for one — can stand down. Two sources, because the app has
 * two:
 *
 * - The overlay store's own modal entries (`overlay-store.ts`): a modal dialog, or the command
 *   palette. Each is what the user is working in, and its own use of a key must not be shadowed.
 * - The full-screen overlays that mount directly in `app.component.tsx` and deliberately bypass
 *   `OverlayHost`, registered through `window-blocking-overlay-store.ts`: the connection-lost
 *   banner, the workspace-updating cover and the first-run gate. Behind those the pane is dimmed or
 *   invisible, and a change made to it would be saved and outlive the overlay.
 *
 * A docked PAPI dialog request (`dialog.service-shard.ts`) is deliberately not one of these: those
 * dialogs are non-modal tabs the user keeps working behind, so they stop nothing.
 *
 * @returns True if a modal overlay or a full-screen blocking overlay is up; false otherwise
 */
export function isModalOverlayOpen(): boolean {
  return (
    hasOverlayOfType('modalDialog') ||
    hasOverlayOfType('commandPalette') ||
    isWindowBlockedByOverlay()
  );
}
