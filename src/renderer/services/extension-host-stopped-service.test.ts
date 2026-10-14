import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EVENT_NAME_ON_DID_START_EXTENSION_HOST,
  EVENT_NAME_ON_DID_STOP_EXTENSION_HOST,
  EVENT_NAME_ON_WILL_SHUT_DOWN,
} from '@shared/models/extension-host-lifecycle.model';

type Listener = (payload: unknown) => void;
const captured = new Map<string, Listener>();
const unsubscribers = new Map<string, ReturnType<typeof vi.fn>>();

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: (eventName: string) => (listener: Listener) => {
    captured.set(eventName, listener);
    const unsubscribe = vi.fn();
    unsubscribers.set(eventName, unsubscribe);
    return unsubscribe;
  },
}));

// Imports follow the `vi.mock` call: the service reads the network service at import time.
/* eslint-disable import/first */
import {
  catchUpExtensionHostStoppedState,
  initExtensionHostStoppedService,
} from '@renderer/services/extension-host-stopped-service';
import {
  getExtensionHostNotice,
  markExtensionHostRestarting,
  reportExtensionHostStopped,
  resetExtensionHostStopped,
} from '@renderer/services/extension-host-stopped-store';
import {
  getIsConnectionLost,
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import { sendCommand } from '@shared/services/command.service';
/* eslint-enable import/first */

function fire(eventName: string, payload?: unknown) {
  captured.get(eventName)?.(payload);
}

describe('extension-host-stopped service', () => {
  beforeEach(() => {
    captured.clear();
    unsubscribers.clear();
    vi.mocked(sendCommand).mockReset();
    resetExtensionHostStopped();
    resetConnectionLost();
  });

  it('writes the stop into the store when main announces one', () => {
    const teardown = initExtensionHostStoppedService();

    fire(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST, { reason: 'lost-connection' });

    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'lost-connection' });
    teardown();
  });

  it('moves a restart in flight to restarted when the extension host announces it started', () => {
    const teardown = initExtensionHostStoppedService();
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();

    fire(EVENT_NAME_ON_DID_START_EXTENSION_HOST);

    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted', isConfirmed: true });
    teardown();
  });

  it('a start announcement ends a stop notice, even without a restart from this window', () => {
    const teardown = initExtensionHostStoppedService();

    fire(EVENT_NAME_ON_DID_START_EXTENSION_HOST);
    expect(getExtensionHostNotice()).toBeUndefined();

    reportExtensionHostStopped({ reason: 'crashed' });
    fire(EVENT_NAME_ON_DID_START_EXTENSION_HOST);
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted', isConfirmed: true });
    teardown();
  });

  it('latches the connection-lost store shut when main announces a shutdown', () => {
    const teardown = initExtensionHostStoppedService();

    fire(EVENT_NAME_ON_WILL_SHUT_DOWN);
    reportConnectionLost();

    expect(getIsConnectionLost()).toBe(false);
    teardown();
  });

  it('onWillShutDown after a reported loss changes nothing', () => {
    const teardown = initExtensionHostStoppedService();
    reportConnectionLost();

    fire(EVENT_NAME_ON_WILL_SHUT_DOWN);

    expect(getIsConnectionLost()).toBe(true);
    teardown();
  });

  it('catch-up reports a stop main remembered before this window was listening', async () => {
    vi.mocked(sendCommand).mockResolvedValue({ reason: 'crashed' });

    await catchUpExtensionHostStoppedState();

    expect(sendCommand).toHaveBeenCalledWith('platform.getExtensionHostStoppedState');
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'crashed' });
  });

  it('catch-up leaves the store alone when main remembers nothing', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);

    await catchUpExtensionHostStoppedState();

    expect(getExtensionHostNotice()).toBeUndefined();
  });

  it('catch-up swallows a failed request', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('main did not answer'));

    await expect(catchUpExtensionHostStoppedState()).resolves.toBeUndefined();
    expect(getExtensionHostNotice()).toBeUndefined();
  });

  it('unsubscribes from all three events when torn down', () => {
    const teardown = initExtensionHostStoppedService();

    teardown();

    expect(unsubscribers.get(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST)).toHaveBeenCalled();
    expect(unsubscribers.get(EVENT_NAME_ON_DID_START_EXTENSION_HOST)).toHaveBeenCalled();
    expect(unsubscribers.get(EVENT_NAME_ON_WILL_SHUT_DOWN)).toHaveBeenCalled();
  });
});
