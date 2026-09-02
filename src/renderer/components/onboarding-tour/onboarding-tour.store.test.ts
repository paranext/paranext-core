// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  ONBOARDING_TOUR_DONE_KEY,
  readTourDone,
  resetTourDone,
  subscribeToTourDone,
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
