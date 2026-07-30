import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  isAppQuitRequested,
  markQuitRequested,
  resetShutdownLatchesForNewSession,
  runShutdownTasksOnce,
} from '@main/services/shutdown-latch.service';

describe('shutdown latches', () => {
  beforeEach(() => {
    // The module holds process-wide state, so unwind it between tests
    resetShutdownLatchesForNewSession();
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

  test('keeps the shared run distinct from the quit flag', async () => {
    // Closing the last window runs the shutdown tasks without any quit having been requested, so
    // the two latches must not be collapsed into one
    const performShutdownTasks = vi.fn(async () => {});

    await runShutdownTasksOnce(performShutdownTasks);

    expect(performShutdownTasks).toHaveBeenCalledTimes(1);
    expect(isAppQuitRequested()).toBe(false);
  });
});
