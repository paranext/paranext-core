/**
 * What closing a window means for the application.
 *
 * Only the primary window's close can take the app down while other windows are open, and only with
 * the user's say-so. Everything else about a window close — running the shutdown tasks, flushing
 * layouts, the disposition each window records — already keys off the quit latch, so the whole
 * decision reduces to whether and when that latch gets set. Kept out of the close handler so it can
 * be tested without a BrowserWindow.
 */

import {
  isAppQuitRequested,
  markQuitRequested,
  whenQuitRequested,
} from '@main/services/shutdown-latch.service';
import { getErrorMessage } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { countWindowsThatWouldStayOpen } from '@main/services/window-state.service';
import { isPrimaryWindow } from '@main/services/window-layout-persistence.service';

/** What the user chose when asked whether to close every window */
export type CloseAllAnswer = 'close-all' | 'cancel';

/** What the close handler should do with the window whose close it is handling */
export type WindowCloseDecision =
  /** Close only this window; the app stays up (or quits on its own if this was the last one) */
  | 'close-this-window'
  /** The user confirmed: the quit latch is set, and every window is to go down with the app */
  | 'quit-all'
  /** The user cancelled: nothing has changed, and this window is to stay open */
  | 'stay-open';

/**
 * Decide what closing a window means, asking the user when the primary window's close would take
 * other windows with it.
 *
 * On `quit-all` the quit latch is already set by the time this resolves. That ordering is the
 * point: every other window's close handler reads that latch on its first pass to record its layout
 * as staying for next session, and it has to find the latch set rather than happen upon it once the
 * last window is marked closing.
 *
 * @param windowId The window whose close is being handled
 * @param confirmCloseAll Asks the user whether to close every window; only called when it matters
 * @returns What to do with this window
 */
export async function decideWindowClose(
  windowId: string,
  confirmCloseAll: () => Promise<CloseAllAnswer>,
): Promise<WindowCloseDecision> {
  if (!isPrimaryWindow(windowId)) return 'close-this-window';
  // A quit already asked for (Cmd+Q, File → Quit, `platform.quit`) sets the latch from `before-quit`
  // and then closes each window in creation order, the primary first — before any secondary has
  // been marked closing, so from here it looks like a primary ✕ with others open. It is not: the
  // user has chosen, and asking again would be asking twice. A cancel here could not undo the
  // latch either, and would leave the app half-quit with the latch stuck for the session.
  if (isAppQuitRequested()) return 'close-this-window';
  // Nothing left behind — windows already on their way out do not count, but a window still
  // loading its content does
  if (countWindowsThatWouldStayOpen(windowId) === 0) return 'close-this-window';

  // The user's answer, unless a quit arrives first. A quit while the question is open — Cmd+Q,
  // File → Quit, `platform.quit` — is a stronger statement than any button, and the asker takes
  // the question down when one arrives (Electron closes a signalled message box and reports it as
  // cancelled). Racing the latch as well is what ends the wait for an asker that does not, so the
  // app can never hang with the question up and the quit swallowed underneath it.
  const answer = await Promise.race([
    // An asker that fails is not the user choosing to stay, so it is reported rather than being
    // indistinguishable from a Cancel click. Treated as one all the same: the window is already
    // held open, and taking it down because the question could not be put is the worse outcome.
    confirmCloseAll().catch((e: unknown): CloseAllAnswer => {
      logger.warn(`Could not put the close-all question to the user: ${getErrorMessage(e)}`);
      return 'cancel';
    }),
    whenQuitRequested().then((): CloseAllAnswer => 'close-all'),
  ]);
  // No second latch read here, deliberately. A quit takes the question down by aborting it, but that
  // abort still has to travel through the native dialog before the box's promise resolves as
  // `cancel` — an event-loop turn at least — while `whenQuitRequested().then(...)` above resolves in
  // plain microtasks off the same `markQuitRequested()` call. Microtasks always drain before the
  // next event-loop turn, so the `'close-all'` branch of this race can never lose to an aborted
  // box's `cancel`, whichever of the two subscribed to the latch first. A `cancel` reaching this line
  // is therefore always a real click made before any quit.
  if (answer === 'cancel') return 'stay-open';

  markQuitRequested();
  return 'quit-all';
}
