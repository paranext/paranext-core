import { describe, expect, test, vi, afterEach } from 'vitest';

vi.mock('@shared/utils/internal-util', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@shared/utils/internal-util')>()),
  isRenderer: () => true,
}));
vi.mock('@renderer/services/renderer-web-socket.service', () => ({
  default: class FakeRendererWebSocket {
    constructor(public url: string) {}
  },
}));

describe('createWebSocket in the renderer', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  test('returns a MessagePort-backed socket when the preload bridge is present', async () => {
    const requestPort = vi.fn();
    vi.stubGlobal('electronAPI', { papi: { requestPort } });
    Object.assign(window, { electronAPI: { papi: { requestPort } } });
    const { createWebSocket } = await import('@client/services/web-socket.factory');
    const { MessagePortWebSocket } = await import('@renderer/services/message-port-web-socket');

    const socket = await createWebSocket('ws://localhost:8876');

    expect(socket).toBeInstanceOf(MessagePortWebSocket);
    expect(requestPort).toHaveBeenCalledTimes(1);
  });

  test('falls back to the browser WebSocket wrapper when there is no bridge', async () => {
    vi.stubGlobal('electronAPI', undefined);
    Object.assign(window, { electronAPI: undefined });
    const { createWebSocket } = await import('@client/services/web-socket.factory');

    const socket = await createWebSocket('ws://localhost:8876');

    expect(socket).toMatchObject({ url: 'ws://localhost:8876' });
  });
});
