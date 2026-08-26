/**
 * Deciding what happens to a window that reports its dock empty.
 *
 * The renderer owns the moment emptiness happens; only the main process knows how many windows
 * exist. A window emptied by removal closes — windows are equal siblings, and one with nothing in
 * it has nothing to be — unless it is the last window standing, which docks Home instead (closing
 * it would exit the application). A window born empty always docks Home.
 *
 * A report describes a moment that has already passed by the time it is answered, so a close is
 * decided against a fresh reading rather than against the report alone — see
 * {@link WindowEmptinessHandlerDependencies.hasContentArrivedSinceEmptyReport}.
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
 *
 * Asynchronous because deciding a close asks the reporting window whether it is still empty, and
 * because decisions are taken one at a time (see {@link createWindowEmptinessHandler}).
 */
export type WindowEmptinessHandler = ((
  windowId: unknown,
  reason: unknown,
) => Promise<WindowEmptiedResponse>) & {
  /** Tell the handler the window with this id is gone. Ids it is not tracking are ignored. */
  handleWindowGone: (windowId: number) => void;
};

/** What {@link createWindowEmptinessHandler} needs to answer a window reporting its dock empty */
export type WindowEmptinessHandlerDependencies = {
  /**
   * Number of windows that could still be the one the user is left with — main process's authority.
   * Several kinds of window are excluded; `countWindowsThatCouldBeTheLastOne` states the rule in
   * full and is what main wires here. Re-listing the exclusions here would give a future composer a
   * second version to read and a way to rebuild a count that misses one.
   */
  countWindows: () => number;
  /** Close the window with the given id */
  closeWindow: (windowId: number) => void;
  /**
   * Whether the reported id names a window main is actually tracking.
   *
   * A report arrives over the network and names its own subject, so any process can report any
   * number. An id main does not know is not a window that emptied — it is either a window already
   * gone or a number nobody minted — and answering it does more than waste a decision: a `closing`
   * answer records the id in this handler's closing set, where nothing will ever remove it, because
   * removal happens when the window is seen to go away and this one never existed. Electron reuses
   * ids within a process, so a real window minted with that number later would be told `closing` on
   * its first report, never be closed, and latch there refusing content for the rest of the
   * session.
   */
  isWindowTracked: (windowId: number) => boolean;
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
  /**
   * Whether anything reached the reporting window's dock after it sent the report — asked of that
   * window, which is the only place that knows.
   *
   * A report describes a moment that has already passed by the time this handler answers it: a
   * routed open or a move's adopt can land in the window while the report is in flight, and closing
   * it then takes content the user is looking at with it.
   *
   * Answering `false` means "close it", and covers BOTH "still empty" and "could not tell": the
   * report was the window's own word about its own dock, and a question that could not be asked is
   * no reason to leave an empty window standing. The wiring is what decides not to ask — a window
   * that cannot serve a request answers `false` without a round trip.
   *
   * Optional so a caller with no way to reach the window can compose the handler without it; every
   * report is then taken at its word.
   */
  hasContentArrivedSinceEmptyReport?: (windowId: number) => Promise<boolean>;
};

/**
 * How long the re-check may take before the report is taken at its word.
 *
 * Bounded and never retried: a window that is slow to answer is holding up every other window's
 * decision behind it (they are taken one at a time), and the answer it owes is one a renderer reads
 * out of a variable.
 *
 * Sized for the slowest machine rather than the fastest, because the two ways of being wrong are
 * not equally bad. Waiting too long leaves a window the user cannot work in on screen a moment
 * longer; giving up too early closes a window whose content was on its way, and the thing the user
 * asked to open never appears. Generous here costs a pause; mean here costs the operation.
 */
const CONTENT_RECHECK_TIMEOUT_MS = 5000;

/**
 * Build a `windowLayout:emptied` handler over the given dependencies.
 *
 * Decisions are serialized — one in flight at a time, in the order the reports arrived. Two windows
 * emptying at the same moment would otherwise both read "2 windows exist" (neither has closed yet)
 * and both be told to close, leaving the app with no window at all; and two reports from ONE window
 * would both slip past the repeat-answer guard, the second close tripping main's force-close escape
 * hatch. Serializing is what makes each decision read the mark the decision before it wrote.
 *
 * @returns A handler taking the reporting window's id and why it is empty (both `unknown`, as they
 *   arrive over the wire unvalidated), answering what that window should do — see
 *   {@link WindowEmptinessHandler} for the `handleWindowGone` the wiring must call
 */
export function createWindowEmptinessHandler(
  deps: WindowEmptinessHandlerDependencies,
): WindowEmptinessHandler {
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

  /**
   * Ask the reporting window whether content reached it since it sent the report, bounded so one
   * unresponsive window cannot hold up every decision behind it. A throw, a timeout, and a plain
   * "no" all mean the same thing here — see the dependency's own doc comment.
   */
  const hasContentArrivedSinceEmptyReport = async (windowId: number): Promise<boolean> => {
    if (!deps.hasContentArrivedSinceEmptyReport) return false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        deps.hasContentArrivedSinceEmptyReport(windowId),
        new Promise<boolean>((resolve) => {
          timeout = setTimeout(() => {
            logger.warn(
              `Window ${windowId} did not say whether it is still empty within ${CONTENT_RECHECK_TIMEOUT_MS}ms; taking its report at its word`,
            );
            resolve(false);
          }, CONTENT_RECHECK_TIMEOUT_MS);
        }),
      ]);
    } catch (e) {
      logger.warn(
        `Could not ask window ${windowId} whether it is still empty; taking its report at its word: ${getErrorMessage(e)}`,
      );
      return false;
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  };

  const decideWhatHappensToWindow = async (
    windowId: unknown,
    reason: unknown,
  ): Promise<WindowEmptiedResponse> => {
    if (typeof windowId !== 'number' || !isWindowEmptiedReason(reason)) {
      logger.warn(
        `windowLayout:emptied called with invalid arguments (windowId: ${windowId}, reason: ${reason}); answering open-home`,
      );
      return { action: 'open-home' };
    }

    // Ahead of every decision, including the closing-set read below, because the damage is done by
    // recording the id rather than by acting on it — see `isWindowTracked`.
    if (!deps.isWindowTracked(windowId)) {
      logger.warn(
        `windowLayout:emptied named window ${windowId}, which is not tracked; answering open-home without deciding anything`,
      );
      return { action: 'open-home' };
    }

    // Repeat-answer idempotence — see the set's own doc comment. The shared-registry read extends
    // the same answer to closes decided outside this handler (see the `isWindowClosing` dep doc).
    //
    // Ahead of every other answer, including born-empty's: a window whose close is in flight docks
    // nothing, whatever emptied it. Telling one to open Home mid-teardown puts a tab — and a web
    // view provider's side effects with it — into a window that is on its way out.
    if (closingWindowIds.has(windowId) || deps.isWindowClosing?.(windowId)) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason}: already closing, answering closing again`,
      );
      return { action: 'closing' };
    }

    if (reason === 'born-empty') {
      logger.debug(`windowLayout:emptied window ${windowId} reason ${reason}: answering open-home`);
      return { action: 'open-home' };
    }

    const remainingWindows = deps.countWindows();
    if (remainingWindows <= 1) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason} saw ${remainingWindows} window(s) remaining: answering open-home`,
      );
      return { action: 'open-home' };
    }

    // Everything above is decided from what the main process knows. This is the one question only
    // the reporting window can answer, and it is asked BEFORE anything is marked: `markWindowClosing`
    // writes the shared registry the user's own close handler also writes, so a mark made here
    // could not be taken back — unmarking would clear a mark a real close had set in the meantime.
    if (await hasContentArrivedSinceEmptyReport(windowId)) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason}: content arrived after the report, answering stay`,
      );
      return { action: 'stay' };
    }

    // The guard above, asked again: the close it looks for is decided on a path this handler's
    // serialization does not cover, so the user can close the reporting window with its own close
    // button while its re-check is in flight. The count below cannot stand in for this — a window
    // whose close has begun is excluded from the count rather than reported by it — and every
    // answer past this point is the wrong one for a window on its way out: a second close trips
    // main's force-close escape hatch, and Home docks a tab into a window mid-teardown.
    if (closingWindowIds.has(windowId) || deps.isWindowClosing?.(windowId)) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason}: close began during its re-check, answering closing`,
      );
      return { action: 'closing' };
    }

    // Asked again, because the count above is from before the re-check. Decisions from this handler
    // are serialized against each other, but a window the user closes with its own X button marks
    // itself closing on a path that serialization does not cover — so the number can drop while a
    // re-check is in flight. Closing on the earlier number closes the only window that would have
    // been left, and an app whose every window is closing exits.
    const windowsLeftAfterRecheck = deps.countWindows();
    if (windowsLeftAfterRecheck <= 1) {
      logger.debug(
        `windowLayout:emptied window ${windowId} reason ${reason} saw ${windowsLeftAfterRecheck} window(s) remaining once its re-check answered: answering open-home`,
      );
      return { action: 'open-home' };
    }

    logger.debug(
      `windowLayout:emptied window ${windowId} reason ${reason} saw ${windowsLeftAfterRecheck} windows remaining: answering closing`,
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

  /**
   * The decision in flight, if any. Every report links its decision off this one, so no decision
   * ever reads the window count while another is still deciding what to write into it — see
   * {@link createWindowEmptinessHandler}.
   */
  let decisionChain: Promise<unknown> = Promise.resolve();

  const handleWindowEmptied = (
    windowId: unknown,
    reason: unknown,
  ): Promise<WindowEmptiedResponse> => {
    const decision = decisionChain.then(() => decideWhatHappensToWindow(windowId, reason));
    // The chain carries the caught version of each decision, never the one handed to the caller: a
    // rejection left on it would be inherited by every report for the rest of the session, and this
    // handler must never be able to stop answering.
    decisionChain = decision.catch(() => undefined);
    return decision;
  };

  return Object.assign(handleWindowEmptied, {
    handleWindowGone: (windowId: number) => {
      closingWindowIds.delete(windowId);
    },
  });
}
