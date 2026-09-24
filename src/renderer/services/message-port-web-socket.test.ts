import { describe, expect, test, vi } from 'vitest';
import {
  MessagePortWebSocket,
  MessagePortLike,
  PapiPortProvider,
} from '@renderer/services/message-port-web-socket';
import { createPapiPortCloseFrame } from '@shared/data/papi-port.model';

function makeFakePort() {
  const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  const port = {
    addEventListener: vi.fn((type: string, l: (...args: unknown[]) => void) => {
      const forType = listeners.get(type) ?? new Set();
      forType.add(l);
      listeners.set(type, forType);
    }),
    removeEventListener: vi.fn((type: string, l: (...args: unknown[]) => void) => {
      listeners.get(type)?.delete(l);
    }),
    postMessage: vi.fn(),
    start: vi.fn(),
    close: vi.fn(),
    emit: (type: string, ...args: unknown[]) => listeners.get(type)?.forEach((l) => l(...args)),
  };
  return port;
}

/** A provider the test settles by hand */
function makeProvider() {
  let handlers: Parameters<PapiPortProvider>[0] | undefined;
  const provider: PapiPortProvider = (h) => {
    handlers = h;
  };
  return {
    provider,
    grant: (port: MessagePortLike, windowId = 'w1') => handlers?.onPort(port, windowId),
    fail: (reason: string) => handlers?.onError(reason),
  };
}

function record(socket: MessagePortWebSocket) {
  const events: { type: string; ev: unknown }[] = [];
  (['open', 'message', 'error', 'close'] as const).forEach((type) =>
    socket.addEventListener(type, (ev) => events.push({ type, ev })),
  );
  return events;
}

describe('MessagePortWebSocket', () => {
  test('is CONNECTING until the port arrives, then starts it and opens', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);
    expect(socket.readyState).toBe(0);

    const port = makeFakePort();
    grant(port, 'w7');

    expect(port.start).toHaveBeenCalledTimes(1);
    expect(socket.readyState).toBe(1);
    expect(socket.url).toBe('electron-messageport://papi/w7');
    expect(events.map((e) => e.type)).toEqual(['open']);
  });

  test('keeps the first port and ignores a later one', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const first = makeFakePort();
    const second = makeFakePort();
    grant(first);
    grant(second);

    socket.send('x');

    expect(first.postMessage).toHaveBeenCalledWith('x');
    expect(second.start).not.toHaveBeenCalled();
    expect(second.postMessage).not.toHaveBeenCalled();
  });

  test('send before open throws like a WebSocket would', () => {
    const { provider } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    expect(() => socket.send('early')).toThrow(/not open/);
  });

  test('delivers port messages as message events with the same data', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);
    const port = makeFakePort();
    grant(port);

    port.emit('message', { data: '{"jsonrpc":"2.0"}' });
    port.emit('message', { data: { not: 'a string' } });

    const messages = events.filter((e) => e.type === 'message').map((e) => e.ev);
    expect(messages).toEqual([
      expect.objectContaining({ data: '{"jsonrpc":"2.0"}' }),
      expect.objectContaining({ data: { not: 'a string' } }),
    ]);
  });

  test('close(code, reason) posts a close frame, closes the port, reports a clean close once', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);
    const port = makeFakePort();
    grant(port);

    socket.close(4000, 'app shutdown');
    port.emit('close');

    expect(port.postMessage).toHaveBeenCalledWith(createPapiPortCloseFrame(4000, 'app shutdown'));
    expect(port.close).toHaveBeenCalledTimes(1);
    expect(socket.readyState).toBe(3);
    const closes = events.filter((e) => e.type === 'close');
    expect(closes).toHaveLength(1);
    expect(closes[0].ev).toMatchObject({
      code: 4000,
      reason: 'app shutdown',
      wasClean: true,
      target: socket,
    });
  });

  test('a close frame from main is reported with main’s code', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);
    const port = makeFakePort();
    grant(port);

    port.emit('message', { data: createPapiPortCloseFrame(1001, 'window closing') });
    port.emit('close');

    const closes = events.filter((e) => e.type === 'close');
    expect(closes).toHaveLength(1);
    expect(closes[0].ev).toMatchObject({ code: 1001, wasClean: true });
    expect(port.close).toHaveBeenCalledTimes(1);
  });

  test('a port close with no frame is reported as 1006, not clean', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);
    const port = makeFakePort();
    grant(port);

    port.emit('close');

    expect(events.filter((e) => e.type === 'close')[0].ev).toMatchObject({
      code: 1006,
      wasClean: false,
    });
  });

  test('a provider error fires error then a 1006 close, so a connect attempt fails immediately', () => {
    const { provider, fail } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);

    fail('The PAPI network service is not initialized');

    expect(events.map((e) => e.type)).toEqual(['error', 'close']);
    expect(events[0].ev).toMatchObject({ message: 'The PAPI network service is not initialized' });
    expect(events[1].ev).toMatchObject({ code: 1006, wasClean: false });
    expect(socket.readyState).toBe(3);
  });

  test('close before the port arrived reports a close and ignores a port that arrives later', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const events = record(socket);

    socket.close(1000, 'gave up');
    const port = makeFakePort();
    grant(port);

    expect(events.filter((e) => e.type === 'close')).toHaveLength(1);
    expect(port.start).not.toHaveBeenCalled();
    expect(port.close).toHaveBeenCalled();
  });

  test('pagehide closes with 1001 so a reload or window close reads as clean on main', () => {
    const { provider, grant } = makeProvider();
    // Constructed for its pagehide listener on the shared jsdom window
    // eslint-disable-next-line no-new
    new MessagePortWebSocket(provider);
    const port = makeFakePort();
    grant(port);

    window.dispatchEvent(new Event('pagehide'));

    expect(port.postMessage).toHaveBeenCalledWith(createPapiPortCloseFrame(1001, 'page unloading'));
  });

  test('exposes the WebSocket constants and a working dispatchEvent/on* surface', () => {
    const { provider, grant } = makeProvider();
    const socket = new MessagePortWebSocket(provider, { addPageHideListener: false });
    const onopen = vi.fn();
    socket.onopen = onopen;
    grant(makeFakePort());
    expect(socket.OPEN).toBe(1);
    expect(onopen).toHaveBeenCalledTimes(1);
  });
});
