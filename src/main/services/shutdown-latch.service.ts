/**
 * Per-session latches guarding the shutdown tasks.
 *
 * Bringing the app down has to track two things: whether this is a whole-app quit as opposed to one
 * window closing, and whether the shutdown tasks are already running so that several windows
 * closing together share a single run rather than starting one each.
 *
 * Both are per SESSION, not per process. On macOS the app stays resident after its last window
 * closes and can be reactivated from the dock, which starts a fresh session in the same process —
 * so the latches have to be cleared when a window is created, or every session after the first
 * would come down without running its shutdown tasks.
 */

import { areAllWindowsClosing } from '@main/services/window-state.service';

let isQuitRequested = false;
let shutdownTasksPromise: Promise<void> | undefined;

/** Record that the whole app is quitting, not just one window. Called from `before-quit`. */
export function markQuitRequested(): void {
  isQuitRequested = true;
}

/**
 * Whether the whole app is quitting, as opposed to a single window being closed. A window's `close`
 * handler needs this to tell the two apart, because `before-quit` fires ahead of every `close` and
 * the tracked-window count alone cannot distinguish them.
 */
export function isAppQuitRequested(): boolean {
  return isQuitRequested;
}

/**
 * Whether the app is on its way down, by either of the two routes it can take.
 *
 * A quit (Cmd+Q, menu Quit, OS logout) sets the quit flag from `before-quit`. Closing the last
 * window with the X button does not: on non-macOS, `window-all-closed` only calls `app.quit()` once
 * every window is already gone, so for the whole shutdown the quit flag is false while every
 * tracked window is on its way out.
 *
 * Both the guard that refuses to create a window during a shutdown and the decision a window's
 * close handler makes about whether to run the app's shutdown tasks have to agree on this, or the
 * guard protects the shared shutdown run from only one of the two ways it can be undermined.
 */
export function isAppShuttingDown(): boolean {
  return isAppQuitRequested() || areAllWindowsClosing();
}

/**
 * Run the shutdown tasks, sharing one run across every window that closes as part of the same quit.
 *
 * @param performShutdownTasks Work to run once for this session
 * @returns The shared run, so each caller can wait for it before destroying its window
 */
export function runShutdownTasksOnce(performShutdownTasks: () => Promise<void>): Promise<void> {
  shutdownTasksPromise ??= performShutdownTasks();
  return shutdownTasksPromise;
}

/**
 * Clear both latches because a new session is starting. Called when a window is created.
 *
 * Without this the shutdown tasks would run at most once per process. Closing the last window on
 * macOS runs them and leaves the app resident; reactivating from the dock then gives the user a
 * fresh session whose work is never synced on the way out, because the memoized promise had already
 * settled. A stale quit flag is the same class of problem pointed the other way — it would make an
 * ordinary window close look like a quit for the rest of the process, running the shutdown tasks
 * when only one of several windows was being closed.
 *
 * Must not be called while a quit is under way — every window is sitting in `preventDefault()`
 * waiting on the shared run at that point, and dropping it would let a window closing afterwards
 * start a second one while the windows still waiting stop waiting for anything. The one caller
 * refuses to create a window during a quit for exactly this reason.
 */
export function resetShutdownLatchesForNewSession(): void {
  isQuitRequested = false;
  shutdownTasksPromise = undefined;
}
