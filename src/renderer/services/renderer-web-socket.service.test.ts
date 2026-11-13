import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/** Stands in for the browser `WebSocket` so an allowed construction opens no real connection */
class FakeWebSocket {
  constructor(readonly url: string | URL) {}
}

const papiUrl = `ws://localhost:${WEBSOCKET_PORT}`;

/** The block is a module-level flag, so each test needs a fresh copy of the module */
async function importFresh() {
  return import('@renderer/services/renderer-web-socket.service');
}

describe('PapiRendererWebSocket blocking', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('WebSocket', FakeWebSocket);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('allows the PAPI port while initialize is pending', async () => {
    const mod = await importFresh();
    let finishInitialize: () => void = () => {};
    const initializing = mod.initializeNetworkThenBlockPapiWebSockets(
      () =>
        new Promise<void>((resolve) => {
          finishInitialize = resolve;
        }),
    );

    expect(new mod.PapiRendererWebSocket(papiUrl)).toBeInstanceOf(FakeWebSocket);

    finishInitialize();
    await initializing;
    expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
  });

  it('blocks after initialize resolves', async () => {
    const mod = await importFresh();

    await mod.initializeNetworkThenBlockPapiWebSockets(async () => {});

    expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
  });

  it('blocks after initialize rejects', async () => {
    const mod = await importFresh();

    await expect(
      mod.initializeNetworkThenBlockPapiWebSockets(() => Promise.reject(new Error('induced'))),
    ).rejects.toThrow('induced');

    expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
  });

  it('rethrows the initialize error', async () => {
    const mod = await importFresh();
    const error = new Error('induced');

    await expect(
      mod.initializeNetworkThenBlockPapiWebSockets(() => Promise.reject(error)),
    ).rejects.toBe(error);
  });

  it('blocks when initialize throws synchronously', async () => {
    const mod = await importFresh();

    await expect(
      mod.initializeNetworkThenBlockPapiWebSockets(() => {
        throw new Error('sync');
      }),
    ).rejects.toThrow('sync');

    expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
  });

  it('still allows other ports after blocking', async () => {
    const mod = await importFresh();

    await mod.initializeNetworkThenBlockPapiWebSockets(async () => {});

    expect(new mod.PapiRendererWebSocket('ws://localhost:1234')).toBeInstanceOf(FakeWebSocket);
  });

  describe('replaceTopWindowWebSocket', () => {
    it("makes the window's WebSocket refuse the PAPI port", async () => {
      const mod = await importFresh();
      const target: { WebSocket: unknown } = { WebSocket: FakeWebSocket };
      mod.replaceTopWindowWebSocket(target);
      await mod.initializeNetworkThenBlockPapiWebSockets(async () => {});

      expect(target.WebSocket).toBe(mod.PapiRendererWebSocket);
      expect(() => new mod.PapiRendererWebSocket(papiUrl)).toThrow(`Invalid URL: ${papiUrl}`);
    });

    it("makes a native socket's constructor the checked one", async () => {
      const mod = await importFresh();
      mod.replaceTopWindowWebSocket({ WebSocket: FakeWebSocket });

      const socket = new mod.PapiRendererWebSocket('ws://localhost:1234');

      expect(socket).toBeInstanceOf(FakeWebSocket);
      expect(socket.constructor).toBe(mod.PapiRendererWebSocket);
    });

    it('keeps the WebSocket statics and instanceof working', async () => {
      const mod = await importFresh();
      mod.replaceTopWindowWebSocket({ WebSocket: FakeWebSocket });

      expect(mod.PapiRendererWebSocket.OPEN).toBe(1);
      expect(mod.PapiRendererWebSocket.CLOSED).toBe(3);
      expect(new mod.PapiRendererWebSocket('ws://localhost:1234')).toBeInstanceOf(
        mod.PapiRendererWebSocket,
      );
    });
  });
});
