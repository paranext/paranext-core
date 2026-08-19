import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  isAppQuitRequested,
  isAppShuttingDown,
  markQuitRequested,
  resetShutdownLatchesForNewSession,
  runShutdownTasksOnce,
  shouldWindowCloseAbortStartupTasks,
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

  test('does not report a quit until one is requested', () => {
    expect(isAppQuitRequested()).toBe(false);

    markQuitRequested();

    expect(isAppQuitRequested()).toBe(true);
  });

  test('leaves the startup tasks running when macOS closes its last window without quitting', () => {
    // The app stays resident and a dock reactivation starts a fresh session, but the startup tasks
    // run once per process — so aborting here would drop that session's startup sync permanently.
    expect(shouldWindowCloseAbortStartupTasks('darwin')).toBe(false);

    markQuitRequested();

    // A real quit on macOS still has to stop them.
    expect(shouldWindowCloseAbortStartupTasks('darwin')).toBe(true);
  });

  test('stops the startup tasks off macOS even before a quit is flagged', () => {
    // Off macOS the last window closing always ends in a quit, but `window-all-closed` calls
    // `app.quit()` only after the close handlers have run — so the quit flag is still false while
    // the shutdown tasks this guard protects are already running. The platform has to decide.
    expect(isAppQuitRequested()).toBe(false);

    expect(shouldWindowCloseAbortStartupTasks('win32')).toBe(true);
    expect(shouldWindowCloseAbortStartupTasks('linux')).toBe(true);
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
      addWindow(fakeWindow(1));

      markWindowClosing(1);

      expect(isAppQuitRequested()).toBe(false);
      expect(isAppShuttingDown()).toBe(true);
    });

    test('does not report the app shutting down while a window is staying open', () => {
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));

      markWindowClosing(1);

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
