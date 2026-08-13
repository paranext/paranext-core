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
 * @param deps.countWindows Number of windows currently open, NOT already closing, and NOT still
 *   pending content (see `isWindowPendingContent`) — main process's authority
 * @param deps.closeWindow Close the window with the given id
 * @param deps.markWindowClosing Record that this window's close has been decided
 * @returns A handler taking the reporting window's id and why it is empty (both `unknown`, as they
 *   arrive over the wire unvalidated), answering what that window should do — see
 *   {@link WindowEmptinessHandler} for the `handleWindowGone` the wiring must call
 */
export function createWindowEmptinessHandler(deps: {
  /**
   * Number of windows currently open, NOT already closing, and NOT still pending content (a window
   * created for specific content that has not yet arrived — see `isWindowPendingContent`) — main
   * process's authority
   */
  countWindows: () => number;
  /** Close the window with the given id */
  closeWindow: (windowId: number) => void;
  /**
   * Record that this window's close has been decided, so the count above excludes it from every
   * later decision and nothing routes new content into it while its close is in flight
   */
  markWindowClosing: (windowId: number) => void;
  /**
   * Whether this window's close has been decided by ANY path — the registry `markWindowClosing`
   * writes to, which the user closing a window with its close button also writes to. The handler's
   * private set only knows the closes this handler itself decided, so without this read a window
   * closing by another path that reports empty mid-teardown would be handed a second close, which
   * trips main's force-close escape hatch and abandons the close-time work the first close started.
   * Optional so a caller composing only this handler's own decisions can omit it.
   */
  isWindowClosing?: (windowId: number) => boolean;
}): WindowEmptinessHandler {
  /**
   * Windows already told "closing" that are still open.
   *
   * Its role narrows to repeat-answer idempotence: a window that reports empty again while its
   * close is still in flight gets the same answer again, and nothing more — a second close on a
   * closing window trips main's force-close escape hatch, which destroys the window outright and
   * abandons the close-time work the first close started. The count no longer subtracts this set: a
   * decided close is marked through `deps.markWindowClosing`, and `deps.countWindows` excludes
   * marked windows itself.
   *
   * An entry lives until {@link WindowEmptinessHandler.handleWindowGone} says the window really went
   * away, NOT until its close is handed out: closing a window runs an intercepted close whose async
   * close tasks can take seconds, and the window stays open throughout.
   */
  const closingWindowIds = new Set<number>();

  const handleWindowEmptied = (windowId: unknown, reason: unknown): WindowEmptiedResponse => {
    if (typeof windowId !== 'number' || !isWindowEmptiedReason(reason)) {
      logger.warn(
        `windowLayout:emptied called with invalid arguments (windowId: ${windowId}, reason: ${reason}); answering open-home`,
      );
      return { action: 'open-home' };
    }

    if (reason === 'born-empty') {
      logger.debug(`windowLayout:emptied window ${windowId} reason ${reason}: answering open-home`);
      return { action: 'open-home' };
    }

    // Repeat-answer idempotence — see the set's own doc comment. The shared-registry read extends
    // the same answer to closes decided outside this handler (see the `isWindowClosing` dep doc).
    if (closingWindowIds.has(windowId) || deps.isWindowClosing?.(windowId)) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason}: already closing, answering closing again`,
      );
      return { action: 'closing' };
    }

    const remainingWindows = deps.countWindows();
    if (remainingWindows <= 1) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason} saw ${remainingWindows} window(s) remaining: answering open-home`,
      );
      return { action: 'open-home' };
    }

    logger.debug(
      `windowLayout:emptied window ${windowId} reason ${reason} saw ${remainingWindows} windows remaining: answering closing`,
    );
    closingWindowIds.add(windowId);
    // Marked before the close is even scheduled: from this decision on, the window must not
    // count toward anyone's last-window arithmetic
    deps.markWindowClosing(windowId);
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
