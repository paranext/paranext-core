import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  isAppQuitRequested,
  isAppShuttingDown,
  markQuitRequested,
  resetShutdownLatchesForNewSession,
  runShutdownTasksOnce,
  whenQuitRequested,
} from '@main/services/shutdown-latch.service';
import {
  addWindow,
  markWindowClosing,
  resetForTesting as resetWindowStateForTesting,
} from '@main/services/window-state.service';

// `window-state.service`, which this module asks about the tracked windows, imports BrowserWindow
// as a type, but the module graph resolves `electron`, which is unavailable outside the Electron
// runtime. `vi.mock` is hoisted above the imports above, so the static import resolves against this
// stub.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

/** Stand-in for a BrowserWindow — the window state service only reads `id` and `isDestroyed` */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, isDestroyed: () => false } as BrowserWindow;
}

describe('shutdown latches', () => {
  beforeEach(() => {
    // Both modules hold process-wide state, so unwind it between tests
    resetShutdownLatchesForNewSession();
    resetWindowStateForTesting();
  });

  test('a quit settles a wait that began before it', async () => {
    // What the close path does while the close-all question is open: it holds the signal from
    // before the question and needs the quit to settle THAT one.
    const waiting = whenQuitRequested();

    markQuitRequested();

    await expect(waiting).resolves.toBeUndefined();
  });

  test('a new session leaves nothing waiting on the last session’s quit', async () => {
    // The signal has to be REPLACED, not merely re-armed: a settled one carried into the next
    // session would resolve a fresh wait instantly, and the close path reads that as "the user
    // is quitting" — it would close every window without asking. The cost of replacing it is that
    // a wait begun before a reset never settles, which is why only a window created where there
    // were NONE resets at all (see `createWindow`): with no windows there is no close-all question
    // in flight to strand.
    markQuitRequested();

    resetShutdownLatchesForNewSession();

    const settled = await Promise.race([
      whenQuitRequested().then(() => 'settled'),
      Promise.resolve().then(() => 'still waiting'),
    ]);
    expect(settled).toBe('still waiting');
    expect(isAppQuitRequested()).toBe(false);
  });

  test('a wait begun before a reset is not settled by a quit requested after it', async () => {
    // The mirror of "a new session leaves nothing waiting on the last session's quit": there the
    // capture happens after the reset; here it happens before. A primary holding open the
    // close-all question captures its wait this way, ahead of
    // any reset a later window creation might trigger, and the signal it is holding must stay its
    // own — a quit requested afterward has to settle only the session's new signal, not reach back
    // and settle the one this wait is still holding.
    const waitingBeforeReset = whenQuitRequested();

    resetShutdownLatchesForNewSession();
    markQuitRequested();

    const settled = await Promise.race([
      waitingBeforeReset.then(() => 'settled'),
      Promise.resolve().then(() => 'still waiting'),
    ]);
    expect(settled).toBe('still waiting');

    // The new session's own wait is unaffected — it settles normally from the same quit.
    await expect(whenQuitRequested()).resolves.toBeUndefined();
  });

  test('a session that runs on without quitting still has a usable quit signal', async () => {
    // The signal is an `AsyncVariable`, which by default rejects anything waiting on it once ten
    // seconds pass without it settling. A session that simply has not quit yet is the normal case,
    // and that rejection would reach the close-all decision — which races this signal — and turn
    // "ask the user" into "could not decide", so the primary's ✕ would quietly stop asking. The
    // timeout is disabled for exactly that reason; this pins it.
    vi.useFakeTimers();
    try {
      // Built while the fake clock is installed, so the variable's own timer is a fake one. A
      // signal constructed at module load carries a real timer that advancing fake time never
      // fires, and this test would then pass whatever the timeout is set to.
      resetShutdownLatchesForNewSession();
      const waiting = whenQuitRequested();
      let rejectedWith: unknown;
      waiting.catch((e: unknown) => {
        rejectedWith = e;
      });

      await vi.advanceTimersByTimeAsync(60_000);

      expect(rejectedWith).toBeUndefined();

      // The positive control: the signal is not merely inert — it still settles when a quit comes
      markQuitRequested();
      await expect(waiting).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  test('does not report a quit until one is requested', () => {
    expect(isAppQuitRequested()).toBe(false);

    markQuitRequested();

    expect(isAppQuitRequested()).toBe(true);
  });

  test('shares one run across every window closing as part of the same quit', async () => {
    const performShutdownTasks = vi.fn(async () => {});

    await Promise.all([
      runShutdownTasksOnce(performShutdownTasks),
      runShutdownTasksOnce(performShutdownTasks),
      runShutdownTasksOnce(performShutdownTasks),
    ]);

    expect(performShutdownTasks).toHaveBeenCalledTimes(1);
  });

  test('runs the shutdown tasks again for a session that starts after the last one ended', async () => {
    // The macOS path: closing the final window runs the shutdown tasks but leaves the app resident,
    // and reactivating from the dock starts a fresh session in the same process. Without the reset
    // the memoized run is already settled, so the second session's work is never synced — silent
    // data loss that only shows up on the second quit of a process.
    const performShutdownTasks = vi.fn(async () => {});
    await runShutdownTasksOnce(performShutdownTasks);

    resetShutdownLatchesForNewSession();
    await runShutdownTasksOnce(performShutdownTasks);

    expect(performShutdownTasks).toHaveBeenCalledTimes(2);
  });

  test('stops reporting a quit once a new session starts', () => {
    // A quit flag that outlived its session would make an ordinary window close look like a quit,
    // running the shutdown tasks when only one of several windows was being closed
    markQuitRequested();

    resetShutdownLatchesForNewSession();

    expect(isAppQuitRequested()).toBe(false);
  });

  describe('whether the app is on its way down', () => {
    test('reports the app shutting down while a quit is under way', () => {
      addWindow(fakeWindow(1));

      markQuitRequested();

      expect(isAppShuttingDown()).toBe(true);
    });

    test('reports the app shutting down once every window has begun closing', () => {
      // Closing the last window with the X button emits no `before-quit`, so the quit flag stays
      // false for the whole shutdown. Anything that refuses to start new work during a shutdown has
      // to catch this case too, or it only guards half of the ways the app goes down.
      const windowId = addWindow(fakeWindow(1));

      markWindowClosing(windowId);

      expect(isAppQuitRequested()).toBe(false);
      expect(isAppShuttingDown()).toBe(true);
    });

    test('does not report the app shutting down while a window is staying open', () => {
      const firstWindowId = addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));

      markWindowClosing(firstWindowId);

      expect(isAppShuttingDown()).toBe(false);
    });

    test('does not report the app shutting down when no window is tracked', () => {
      // Process start and a macOS dock reactivation both run with nothing tracked. Reporting a
      // shutdown here would refuse to create the window the app is starting up to show.
      expect(isAppShuttingDown()).toBe(false);
    });
  });

  test('keeps the shared run distinct from the quit flag', async () => {
    // Closing the last window runs the shutdown tasks without any quit having been requested, so
    // the two latches must not be collapsed into one
    const performShutdownTasks = vi.fn(async () => {});

    await runShutdownTasksOnce(performShutdownTasks);

    expect(performShutdownTasks).toHaveBeenCalledTimes(1);
    expect(isAppQuitRequested()).toBe(false);
  });
});
