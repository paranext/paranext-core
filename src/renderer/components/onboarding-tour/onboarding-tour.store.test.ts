// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  getTourReplayCount,
  ONBOARDING_TOUR_DONE_KEY,
  readTourDone,
  requestTourReplay,
  resetTourDone,
  subscribeToTourDone,
  subscribeToTourReplay,
  writeTourDone,
} from './onboarding-tour.store';

afterEach(() => {
  resetTourDone();
});

/** Fires the event the browser raises in OTHER same-origin windows when one of them writes */
function simulateWriteFromAnotherWindow(key: string, newValue: string | undefined) {
  localStorage.setItem(key, newValue ?? '');
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

describe('the tour completion flag as a subscribable store', () => {
  test('notifies subscribers when another window records the tour as done', () => {
    // Simple mode is single-window by design, but a Power user with several windows open who
    // switches to Simple keeps them, and the flag is shared across same-origin renderers. Without
    // this, finishing the tour in one window leaves the others' overlays up.
    const listener = vi.fn();
    subscribeToTourDone(listener);

    simulateWriteFromAnotherWindow(ONBOARDING_TOUR_DONE_KEY, 'true');

    expect(listener).toHaveBeenCalled();
    expect(readTourDone()).toBe(true);
  });

  test('notifies subscribers when this window records the tour as done', () => {
    // A `storage` event does not fire in the window that performed the write, so a store that only
    // listened for it would report every window's writes except its own.
    const listener = vi.fn();
    subscribeToTourDone(listener);

    writeTourDone();

    expect(listener).toHaveBeenCalled();
  });

  test('ignores writes to unrelated keys', () => {
    const listener = vi.fn();
    subscribeToTourDone(listener);

    simulateWriteFromAnotherWindow('platform-bible.somethingElse', 'true');

    expect(listener).not.toHaveBeenCalled();
  });

  test('stops notifying once unsubscribed', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToTourDone(listener);
    unsubscribe();

    simulateWriteFromAnotherWindow(ONBOARDING_TOUR_DONE_KEY, 'true');

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('the replay channel', () => {
  // Both consumers — the component and the service shard — mock this module, so these are the only
  // tests that exercise the shipping implementation. The count is module state that persists across
  // tests by design (a replay is a live request, not something reset between them), so each test
  // measures a delta from its own baseline rather than an absolute.

  test('notifies subscribers and advances the count when a replay is requested', () => {
    const listener = vi.fn();
    const baseline = getTourReplayCount();
    const unsubscribe = subscribeToTourReplay(listener);

    requestTourReplay();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(getTourReplayCount()).toBe(baseline + 1);
    unsubscribe();
  });

  test('advances once per request, so asking again while the tour is open restarts it', () => {
    // The count is also the component's remount key. A flag that is already true cannot express
    // "start over from stop 1" for a tour that is already showing; only a changing value can.
    const listener = vi.fn();
    const baseline = getTourReplayCount();
    const unsubscribe = subscribeToTourReplay(listener);

    requestTourReplay();
    requestTourReplay();

    expect(listener).toHaveBeenCalledTimes(2);
    expect(getTourReplayCount()).toBe(baseline + 2);
    unsubscribe();
  });

  test('reports a stable snapshot when nothing has changed', () => {
    // `useSyncExternalStore` re-reads the snapshot on every render and re-renders whenever it
    // differs from the last. A snapshot that returned a fresh identity each call would spin.
    const unchanged = getTourReplayCount();

    expect(getTourReplayCount()).toBe(unchanged);
    expect(getTourReplayCount()).toBe(unchanged);
  });

  test('notifies every subscriber, not just the most recent', () => {
    const first = vi.fn();
    const second = vi.fn();
    const unsubscribeFirst = subscribeToTourReplay(first);
    const unsubscribeSecond = subscribeToTourReplay(second);

    requestTourReplay();

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    unsubscribeFirst();
    unsubscribeSecond();
  });

  test('stops notifying once unsubscribed, while still counting the request', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToTourReplay(listener);
    unsubscribe();
    const baseline = getTourReplayCount();

    requestTourReplay();

    expect(listener).not.toHaveBeenCalled();
    expect(getTourReplayCount()).toBe(baseline + 1);
  });
});
