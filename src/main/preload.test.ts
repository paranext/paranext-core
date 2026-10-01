import { describe, expect, test, vi, beforeEach } from 'vitest';
import {
  PAPI_PORT_CHANNEL,
  PAPI_PORT_ERROR_CHANNEL,
  PAPI_PORT_REQUEST_CHANNEL,
} from '@shared/data/papi-port.model';

const { ipcListeners, exposed, send } = vi.hoisted(() => ({
  ipcListeners: new Map<string, (event: unknown, ...args: unknown[]) => void>(),
  exposed: new Map<string, unknown>(),
  send: vi.fn(),
}));

vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: (key: string, value: unknown) => {
      exposed.set(key, value);
    },
  },
  ipcRenderer: {
    invoke: vi.fn(),
    send,
    on: (channel: string, listener: (event: unknown, ...args: unknown[]) => void) => {
      ipcListeners.set(channel, listener);
    },
  },
}));

describe('preload PAPI port bridge', () => {
  beforeEach(async () => {
    vi.resetModules();
    ipcListeners.clear();
    send.mockClear();
    await import('@main/preload');
  });

  test('exposes requestPort, which sends the request channel', () => {
    // The mocked bridge records whatever the preload exposed; this is its shape
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const api = exposed.get('electronAPI') as { papi: { requestPort: () => void } };
    api.papi.requestPort();
    expect(send).toHaveBeenCalledWith(PAPI_PORT_REQUEST_CHANNEL);
  });

  test('forwards the granted port into the main world with window.postMessage', () => {
    const postMessage = vi.spyOn(window, 'postMessage').mockImplementation(() => {});
    const fakePort = { fake: 'port' };

    ipcListeners.get(PAPI_PORT_CHANNEL)?.({ ports: [fakePort] }, { windowId: 'w1' });

    expect(postMessage).toHaveBeenCalledWith({ type: PAPI_PORT_CHANNEL, windowId: 'w1' }, '*', [
      fakePort,
    ]);
    postMessage.mockRestore();
  });

  test('forwards a port error into the main world', () => {
    const postMessage = vi.spyOn(window, 'postMessage').mockImplementation(() => {});

    ipcListeners.get(PAPI_PORT_ERROR_CHANNEL)?.({ ports: [] }, { reason: 'not ready' });

    expect(postMessage).toHaveBeenCalledWith(
      { type: PAPI_PORT_ERROR_CHANNEL, reason: 'not ready' },
      '*',
    );
    postMessage.mockRestore();
  });
});
