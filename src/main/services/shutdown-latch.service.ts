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
 * Whether a window's `close` handler should stop the Simple-mode startup-sync READINESS WAIT.
 *
 * Scoped to that one wait on purpose. Everything else the startup tasks are doing — notably Power
 * mode's boot-race retry loop — is aborted unconditionally whenever the app starts going down, the
 * behavior it has always had; `main.ts` keeps a separate signal for that. Widening this exception
 * to cover both would silently change Power mode too, which nothing here intends.
 *
 * Aborting is right whenever the app is really going away: a startup sync firing after the shutdown
 * sync has already run would sync the same projects twice, and a late one can reach a network
 * connection `will-quit` is about to tear down.
 *
 * The one case where aborting is wrong is macOS closing its last window without a quit. There the
 * app stays resident and a later dock reactivation starts a fresh session, but the startup tasks
 * run once per PROCESS — so aborting drops that session's startup sync for the rest of the
 * process's life. Hence the quit flag decides on macOS.
 *
 * Letting the wait survive is NOT on its own a licence to fire: while the app sits resident with no
 * windows, the shutdown sync has already run and there is no UI to report into. The wait continuing
 * only buys the chance to fire if a dock reactivation brings a window back before readiness lands;
 * `performStartupTasks` re-checks that immediately before it sends the command (its signals'
 * `canFireStartupSync`), and skips when the app is windowless.
 *
 * Every other platform quits once its last window closes, but `window-all-closed` calls
 * `app.quit()` only after the close handlers have already run — so the quit flag is still false
 * throughout the very window this guard protects. Off macOS the platform alone therefore decides,
 * rather than a flag that arrives too late to help.
 *
 * @param platform The OS platform, i.e. `process.platform`. A parameter rather than a direct read
 *   so both branches stay testable without stubbing the global.
 * @returns `true` when the close should abort the readiness wait
 */
export function shouldWindowCloseAbortReadinessWait(platform: typeof process.platform): boolean {
  return isAppQuitRequested() || platform !== 'darwin';
}

/**
 * Whether the Simple-mode startup sync may still fire, asked immediately before the command goes
 * out rather than when the wait started.
 *
 * The readiness wait can park for up to its whole budget, and
 * {@link shouldWindowCloseAbortReadinessWait} deliberately lets it survive a macOS last-window
 * close. That leaves a state no abort signal describes: resident, not quitting, and WINDOWLESS.
 * Firing there would run a whole-workspace Send/Receive after the shutdown sync already ran, into a
 * process with no UI to report progress or failure into.
 *
 * Windowless is only disqualifying once this process has actually had a window, though. No window
 * YET is the app coming up, not going down — the same distinction {@link areAllWindowsClosing} draws
 * for the same reason — and treating it as disqualifying would silently drop the startup sync of
 * any boot whose readiness landed before the first window did. That is the invisible failure this
 * whole gate is meant to avoid, so it is guarded explicitly rather than left to window-creation
 * timing.
 *
 * @param windowCount How many live windows are tracked right now, i.e. `getWindows().length`
 * @param hasCreatedWindowThisProcess Whether this process has ever created a window
 * @returns `true` when the sync should be allowed to go out
 */
export function canStartupSyncFireNow(
  windowCount: number,
  hasCreatedWindowThisProcess: boolean,
): boolean {
  if (isAppShuttingDown()) return false;
  return windowCount > 0 || !hasCreatedWindowThisProcess;
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
