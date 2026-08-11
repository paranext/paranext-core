/**
 * Deciding what happens to a window that reports its dock empty.
 *
 * The renderer owns the moment emptiness happens; only the main process knows how many windows
 * exist. A window emptied by removal closes — windows are equal siblings, and one with nothing in
 * it has nothing to be — unless it is the last window standing, which docks Home instead (closing
 * it would exit the application). A window born empty always docks Home.
 */

import { logger } from '@shared/services/logger.service';
import {
  WindowEmptiedReason,
  WindowEmptiedResponse,
} from '@shared/data/window-layout-persistence.model';

function isWindowEmptiedReason(reason: unknown): reason is WindowEmptiedReason {
  return reason === 'emptied-by-removal' || reason === 'born-empty';
}

/**
 * Build a `windowLayout:emptied` handler over the given dependencies.
 *
 * @param deps.countWindows Number of windows currently open, main process's authority
 * @param deps.closeWindow Close the window with the given id
 * @returns A handler taking the reporting window's id and why it is empty (both `unknown`, as they
 *   arrive over the wire unvalidated), answering what that window should do
 */
export function createWindowEmptinessHandler(deps: {
  countWindows: () => number;
  closeWindow: (windowId: number) => void;
}): (windowId: unknown, reason: unknown) => WindowEmptiedResponse {
  /**
   * Windows already told "closing" whose close has not landed yet. Counted as gone, so two windows
   * emptying in the same instant can never both be told to close — the second one is, by then, the
   * last window standing.
   */
  const closingWindowIds = new Set<number>();

  return (windowId, reason) => {
    if (typeof windowId !== 'number' || !isWindowEmptiedReason(reason)) {
      logger.warn(
        `windowLayout:emptied called with invalid arguments (windowId: ${windowId}, reason: ${reason}); answering open-home`,
      );
      return { action: 'open-home' };
    }

    if (reason === 'born-empty') return { action: 'open-home' };

    const remainingWindows = deps.countWindows() - closingWindowIds.size;
    if (remainingWindows <= 1) return { action: 'open-home' };

    closingWindowIds.add(windowId);
    // Close on the next tick, after this response has gone out — closing first can tear down the
    // socket the answer needs to travel on
    setTimeout(() => {
      closingWindowIds.delete(windowId);
      deps.closeWindow(windowId);
    }, 0);
    return { action: 'closing' };
  };
}
