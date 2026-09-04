import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getIsConnectionLost,
  markShuttingDown,
  reportConnectionLost,
  resetConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';

describe('connection-lost store', () => {
  beforeEach(() => {
    resetConnectionLost();
  });

  it('starts out reporting a live connection', () => {
    expect(getIsConnectionLost()).toBe(false);
  });

  it('reports a lost connection once one is reported', () => {
    reportConnectionLost();
    expect(getIsConnectionLost()).toBe(true);
  });

  it('notifies subscribers exactly once', () => {
    const listener = vi.fn();
    subscribeToConnectionLost(listener);

    reportConnectionLost();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stays lost — a second report does not re-notify', () => {
    const listener = vi.fn();
    subscribeToConnectionLost(listener);

    reportConnectionLost();
    reportConnectionLost();

    expect(getIsConnectionLost()).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops notifying a listener that unsubscribed', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToConnectionLost(listener);
    unsubscribe();

    reportConnectionLost();

    expect(listener).not.toHaveBeenCalled();
  });

  // Every websocket dies with 1006 on an ordinary quit, so without this latch the store flips true
  // on the way out and the overlay is asked to render — leaving whether the user sees a farewell
  // error banner up to paint timing rather than up to the code.
  it('ignores a loss reported after the app has started closing', () => {
    const listener = vi.fn();
    subscribeToConnectionLost(listener);

    markShuttingDown();
    reportConnectionLost();

    expect(getIsConnectionLost()).toBe(false);
    expect(listener).not.toHaveBeenCalled();
  });

  // The latch only suppresses losses that arrive AFTER it. A real disconnect the user is already
  // looking at must survive them starting to close the window.
  it('keeps a loss that was already reported before the app started closing', () => {
    reportConnectionLost();
    markShuttingDown();

    expect(getIsConnectionLost()).toBe(true);
  });
});
