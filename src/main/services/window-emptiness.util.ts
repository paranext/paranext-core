/**
 * Deciding what happens to a window that reports its dock empty.
 *
 * The renderer owns the moment emptiness happens; only the main process knows how many windows
 * exist. A window emptied by removal closes — windows are equal siblings, and one with nothing in
 * it has nothing to be — unless it is the last window standing, which docks Home instead (closing
 * it would exit the application). A window born empty always docks Home.
 */

import { getErrorMessage } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import {
  WindowEmptiedReason,
  WindowEmptiedResponse,
} from '@shared/data/window-layout-persistence.model';

function isWindowEmptiedReason(reason: unknown): reason is WindowEmptiedReason {
  return reason === 'emptied-by-removal' || reason === 'born-empty';
}

/**
 * Answers a window reporting its dock empty, and takes `handleWindowGone` for the moment a window
 * has actually gone away — the handler counts a window it has told to close as already gone, and
 * only the wiring knows when that has come true.
 */
export type WindowEmptinessHandler = ((
  windowId: unknown,
  reason: unknown,
) => WindowEmptiedResponse) & {
  /** Tell the handler the window with this id is gone. Ids it is not tracking are ignored. */
  handleWindowGone: (windowId: number) => void;
};

/**
 * Build a `windowLayout:emptied` handler over the given dependencies.
 *
 * @param deps.countWindows Number of windows currently open, main process's authority
 * @param deps.closeWindow Close the window with the given id
 * @returns A handler taking the reporting window's id and why it is empty (both `unknown`, as they
 *   arrive over the wire unvalidated), answering what that window should do — see
 *   {@link WindowEmptinessHandler} for the `handleWindowGone` the wiring must call
 */
export function createWindowEmptinessHandler(deps: {
  countWindows: () => number;
  closeWindow: (windowId: number) => void;
}): WindowEmptinessHandler {
  /**
   * Windows already told "closing" that are still open. Counted as gone, so two windows emptying
   * while both are still open can never both be told to close — the second one is, by then, the
   * last window standing.
   *
   * An entry lives until {@link WindowEmptinessHandler.handleWindowGone} says the window really went
   * away, NOT until its close is handed out: closing a window runs an intercepted close whose async
   * close tasks can take seconds, and the window stays open, and counted, throughout. Because an
   * entry outlives the count it is subtracted from only if that call never comes, the worst a stale
   * entry can do is keep a window open that could have closed — never close one that should have
   * stayed.
   */
  const closingWindowIds = new Set<number>();

  const handleWindowEmptied = (windowId: unknown, reason: unknown): WindowEmptiedResponse => {
    if (typeof windowId !== 'number' || !isWindowEmptiedReason(reason)) {
      logger.warn(
        `windowLayout:emptied called with invalid arguments (windowId: ${windowId}, reason: ${reason}); answering open-home`,
      );
      return { action: 'open-home' };
    }

    if (reason === 'born-empty') return { action: 'open-home' };

    // A window already on its way out gets the same answer again, and nothing more: a second close
    // on a closing window trips main's force-close escape hatch, which destroys the window outright
    // and abandons the close-time work the first close started.
    if (closingWindowIds.has(windowId)) return { action: 'closing' };

    const remainingWindows = deps.countWindows() - closingWindowIds.size;
    if (remainingWindows <= 1) return { action: 'open-home' };

    closingWindowIds.add(windowId);
    // Close on the next tick, after this response has gone out — closing first can tear down the
    // socket the answer needs to travel on
    setTimeout(() => {
      try {
        deps.closeWindow(windowId);
      } catch (e) {
        // Nothing is waiting on this callback, so an error here would surface as a process-level
        // failure with no context rather than as the small cleanup problem it is
        logger.warn(
          `Could not close window ${windowId} after it reported its dock empty: ${getErrorMessage(e)}`,
        );
      }
    }, 0);
    return { action: 'closing' };
  };

  return Object.assign(handleWindowEmptied, {
    handleWindowGone: (windowId: number) => {
      closingWindowIds.delete(windowId);
    },
  });
}
