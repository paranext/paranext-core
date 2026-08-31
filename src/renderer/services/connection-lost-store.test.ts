import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOnDidLoseConnection = vi.fn();
vi.mock('@shared/services/network.service', () => ({
  onDidLoseConnection: (callback: () => void) => mockOnDidLoseConnection(callback),
}));

// The mock must be registered before the module under test reads the network service at import time.
// eslint-disable-next-line import/first
import {
  getIsConnectionLost,
  initConnectionLostStore,
  resetConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';

/** Wires the store to a fake network service and hands back the trigger for a lost connection. */
function initAndCaptureTrigger(): { fire: () => void; teardown: () => void } {
  let captured: (() => void) | undefined;
  const unsubscribe = vi.fn();
  mockOnDidLoseConnection.mockImplementation((callback: () => void) => {
    captured = callback;
    return unsubscribe;
  });
  const teardown = initConnectionLostStore();
  return {
    fire: () => captured?.(),
    teardown,
  };
}

describe('connection-lost store', () => {
  beforeEach(() => {
    resetConnectionLost();
    mockOnDidLoseConnection.mockReset();
  });

  it('starts out reporting a live connection', () => {
    expect(getIsConnectionLost()).toBe(false);
  });

  it('reports a lost connection once the network service says so', () => {
    const { fire } = initAndCaptureTrigger();
    fire();
    expect(getIsConnectionLost()).toBe(true);
  });

  it('notifies subscribers exactly once', () => {
    const { fire } = initAndCaptureTrigger();
    const listener = vi.fn();
    subscribeToConnectionLost(listener);

    fire();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stays lost — a second announcement does not re-notify', () => {
    const { fire } = initAndCaptureTrigger();
    const listener = vi.fn();
    subscribeToConnectionLost(listener);

    fire();
    fire();

    expect(getIsConnectionLost()).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops notifying a listener that unsubscribed', () => {
    const { fire } = initAndCaptureTrigger();
    const listener = vi.fn();
    const unsubscribe = subscribeToConnectionLost(listener);
    unsubscribe();

    fire();

    expect(listener).not.toHaveBeenCalled();
  });

  it('unsubscribes from the network service when torn down', () => {
    const { teardown } = initAndCaptureTrigger();
    const unsubscribe = mockOnDidLoseConnection.mock.results[0].value;

    teardown();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
