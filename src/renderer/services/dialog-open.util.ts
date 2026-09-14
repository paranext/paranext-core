/**
 * Whether a dialog is currently open in this window, composed from the two independent places a
 * dialog can live: a live docked PAPI dialog request (`dialog.service-shard.ts`) or a modal overlay
 * (`overlay-store.ts`). Callers that must not act while a dialog has focus (e.g. a window-chrome
 * key listener) check this rather than either source alone.
 */

import { hasAnyDialogRequest } from '@renderer/services/dialog.service-shard';
import { hasOverlayOfType } from '@renderer/services/overlays/overlay-store';

/**
 * Determine whether any dialog is open in this window
 *
 * @returns True if there is a live docked dialog request or an active modal overlay; false
 *   otherwise
 */
export function isAnyDialogOpen(): boolean {
  return hasAnyDialogRequest() || hasOverlayOfType('modalDialog');
}
