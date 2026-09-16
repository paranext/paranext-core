import { hasOverlayOfType } from '@renderer/services/overlays/overlay-store';

/**
 * Determine whether a modal overlay is open in this window — a modal dialog or the command palette,
 * both of which live in the overlay store (`overlay-store.ts`) and hold the window's input while
 * they are up. Callers that must not act while such an overlay has focus (e.g. a window-chrome key
 * listener) should check this.
 *
 * A docked PAPI dialog request (`dialog.service-shard.ts`) is deliberately not one of these: those
 * dialogs are non-modal tabs the user keeps working behind, so they stop nothing.
 *
 * @returns True if a modal dialog or the command palette is open; false otherwise
 */
export function isModalOverlayOpen(): boolean {
  return hasOverlayOfType('modalDialog') || hasOverlayOfType('commandPalette');
}
