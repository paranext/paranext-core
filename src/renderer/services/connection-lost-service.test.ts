import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOnDidLoseConnection = vi.fn();
vi.mock('@shared/services/network.service', () => ({
  onDidLoseConnection: (callback: () => void) => mockOnDidLoseConnection(callback),
}));

// Both imports have to follow the `vi.mock` call above: the service reads the network service at
// import time, so the mock must already be registered. `import/first` cannot be satisfied without
// giving that up.
/* eslint-disable import/first */
import { initConnectionLostService } from '@renderer/services/connection-lost-service';
import { getIsConnectionLost, resetConnectionLost } from '@renderer/services/connection-lost-store';
/* eslint-enable import/first */

/** Starts the service against a fake network service and hands back the trigger for a loss. */
function initAndCaptureTrigger(): { fire: () => void; teardown: () => void; unsubscribe: unknown } {
  let captured: (() => void) | undefined;
  const unsubscribe = vi.fn();
  mockOnDidLoseConnection.mockImplementation((callback: () => void) => {
    captured = callback;
    return unsubscribe;
  });
  const teardown = initConnectionLostService();
  return { fire: () => captured?.(), teardown, unsubscribe };
}

describe('connection-lost service', () => {
  beforeEach(() => {
    resetConnectionLost();
    mockOnDidLoseConnection.mockReset();
  });

  it('drives the store when the network service reports a loss', () => {
    const { fire, teardown } = initAndCaptureTrigger();

    fire();

    expect(getIsConnectionLost()).toBe(true);
    teardown();
  });

  it('unsubscribes from the network service when torn down', () => {
    const { teardown, unsubscribe } = initAndCaptureTrigger();

    teardown();

    expect(unsubscribe).toHaveBeenCalled();
  });

  // The renderer has no `isAppShuttingDown()` of its own — that latch is main's — so the browser's
  // own unload signal is what tells this renderer a 1006 close is a quit rather than a failure.
  it('latches the store shut on beforeunload so an ordinary quit reports nothing', () => {
    const { fire, teardown } = initAndCaptureTrigger();

    window.dispatchEvent(new Event('beforeunload'));
    fire();

    expect(getIsConnectionLost()).toBe(false);
    teardown();
  });

  // A reload from inside the connection-lost state leaves via `pagehide`, not `beforeunload`.
  it('latches the store shut on pagehide too', () => {
    const { fire, teardown } = initAndCaptureTrigger();

    window.dispatchEvent(new Event('pagehide'));
    fire();

    expect(getIsConnectionLost()).toBe(false);
    teardown();
  });

  it('stops latching on unload once torn down', () => {
    const first = initAndCaptureTrigger();
    first.teardown();
    // Clear the latch state the previous runs may have set, so this asserts the listener removal
    // rather than leftover module state.
    resetConnectionLost();

    // Torn down, so this unload must reach no listener of the first run's.
    window.dispatchEvent(new Event('beforeunload'));

    const second = initAndCaptureTrigger();
    second.fire();

    expect(getIsConnectionLost()).toBe(true);
    second.teardown();
  });
});
