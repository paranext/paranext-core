// @vitest-environment node
import { describe, expect, test, vi } from 'vitest';
import { MessageChannel } from 'node:worker_threads';
import {
  MessagePortServerSocket,
  MessagePortMainLike,
} from '@main/services/message-port-server-socket';
import { createPapiPortCloseFrame, isPapiPortCloseFrame } from '@shared/data/papi-port.model';
import { wrapNodePortAsMessagePortMain } from './message-port-main-shim.test.util';

/** A port fake that records listeners and calls, for the assertions a real channel cannot make */
function makeFakePort() {
  const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  const port: MessagePortMainLike & { emit: (event: string, ...args: unknown[]) => void } = {
    // One recording fake serves both overloads of `on`/`off`; the tests drive it by event name
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    on: vi.fn((event: string, listener: (...args: unknown[]) => void) => {
      const forEvent = listeners.get(event) ?? new Set();
      forEvent.add(listener);
      listeners.set(event, forEvent);
      return port;
    }) as MessagePortMainLike['on'],
    // One recording fake serves both overloads of `on`/`off`; the tests drive it by event name
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    off: vi.fn((event: string, listener: (...args: unknown[]) => void) => {
      listeners.get(event)?.delete(listener);
      return port;
    }) as MessagePortMainLike['off'],
    postMessage: vi.fn(),
    start: vi.fn(),
    close: vi.fn(),
    emit: (event, ...args) => listeners.get(event)?.forEach((l) => l(...args)),
  };
  return port;
}

function closeEvents(socket: MessagePortServerSocket) {
  const events: unknown[] = [];
  socket.addEventListener('close', (ev) => events.push(ev));
  return events;
}

describe('MessagePortServerSocket', () => {
  test('starts the port on construction and reports OPEN', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    expect(port.start).toHaveBeenCalledTimes(1);
    expect(socket.readyState).toBe(1);
  });

  test('send posts the payload unchanged', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    socket.send('{"jsonrpc":"2.0"}');
    expect(port.postMessage).toHaveBeenCalledWith('{"jsonrpc":"2.0"}');
  });

  test('delivers a port message to message listeners as { data }', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    const received: unknown[] = [];
    socket.addEventListener('message', (ev) => received.push(ev.data));
    port.emit('message', { data: 'hello' });
    port.emit('message', { data: { not: 'a string' } });
    expect(received).toEqual(['hello', { not: 'a string' }]);
  });

  test('close(code, reason) posts a close frame, closes the port, and reports a clean close once', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    const events = closeEvents(socket);

    socket.close(1001, 'window closing');

    expect(port.postMessage).toHaveBeenCalledWith(createPapiPortCloseFrame(1001, 'window closing'));
    expect(port.close).toHaveBeenCalledTimes(1);
    expect(socket.readyState).toBe(3);
    expect(events).toEqual([
      { type: 'close', target: socket, code: 1001, reason: 'window closing', wasClean: true },
    ]);
    // The port's own close event follows; it must not produce a second close
    port.emit('close');
    expect(events).toHaveLength(1);
  });

  test('a peer close frame reports the peer’s code as a clean close, then the port close adds nothing', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    const events = closeEvents(socket);

    port.emit('message', { data: createPapiPortCloseFrame(1001, 'page unloading') });
    port.emit('close');

    expect(events).toEqual([
      { type: 'close', target: socket, code: 1001, reason: 'page unloading', wasClean: true },
    ]);
    expect(port.close).toHaveBeenCalledTimes(1);
  });

  test('a port close with no frame is reported as 1006, not clean', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    const events = closeEvents(socket);

    port.emit('close');

    expect(events).toEqual([
      {
        type: 'close',
        target: socket,
        code: 1006,
        reason: 'port closed without a close frame',
        wasClean: false,
      },
    ]);
    expect(socket.readyState).toBe(3);
  });

  test('a close frame with a non-clean code is reported as not clean', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    const events = closeEvents(socket);
    port.emit('message', { data: createPapiPortCloseFrame(1011, 'internal error') });
    expect(events[0]).toMatchObject({ code: 1011, wasClean: false });
  });

  test('send after close is dropped rather than thrown', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    socket.close();
    vi.mocked(port.postMessage).mockClear();
    expect(() => socket.send('late')).not.toThrow();
    expect(port.postMessage).not.toHaveBeenCalled();
  });

  test('removeEventListener stops delivery', () => {
    const port = makeFakePort();
    const socket = new MessagePortServerSocket(port);
    const listener = vi.fn();
    socket.addEventListener('message', listener);
    socket.removeEventListener('message', listener);
    port.emit('message', { data: 'x' });
    expect(listener).not.toHaveBeenCalled();
  });

  test('round-trips over a real channel and the peer sees the close frame before the port closes', async () => {
    const { port1, port2 } = new MessageChannel();
    const socket = new MessagePortServerSocket(wrapNodePortAsMessagePortMain(port1));
    const seenByPeer: unknown[] = [];
    const peerClosed = new Promise<void>((resolve) => {
      port2.once('close', () => resolve());
    });
    port2.on('message', (value) => seenByPeer.push(value));

    socket.send('ping');
    port2.postMessage('pong');
    const received = await new Promise<unknown>((resolve) => {
      socket.addEventListener('message', (ev) => resolve(ev.data));
    });
    expect(received).toBe('pong');

    socket.close(1000, 'done');
    await peerClosed;
    expect(seenByPeer).toEqual(['ping', createPapiPortCloseFrame(1000, 'done')]);
    expect(isPapiPortCloseFrame(seenByPeer[1])).toBe(true);
    port2.close();
  });
});

describe('RpcServer over MessagePortServerSocket', () => {
  test('answers a request that arrives over the port and logs a clean close from the peer', async () => {
    vi.resetModules();
    const infoLines: string[] = [];
    vi.doMock('@shared/services/logger.service', () => ({
      logger: {
        info: (line: string) => infoLines.push(line),
        warn: vi.fn(),
        debug: vi.fn(),
        error: vi.fn(),
      },
    }));
    const { RpcServer } = await import('@main/services/rpc-server');
    const { RpcEventRegistry } = await import('@main/services/rpc-event-registry');
    const { MessagePortServerSocket: Socket } = await import(
      '@main/services/message-port-server-socket'
    );
    const { REGISTER_METHOD } = await import('@shared/data/rpc.model');

    const { port1, port2 } = new MessageChannel();
    const socket = new Socket(wrapNodePortAsMessagePortMain(port1));
    const server = new RpcServer(
      'renderer:w1',
      socket,
      () => {},
      new Map(),
      new RpcEventRegistry(),
      () => {},
    );
    await server.connect();

    const reply = new Promise<string>((resolve) => {
      port2.once('message', resolve);
    });
    port2.postMessage(
      JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: REGISTER_METHOD,
        params: ['command:test.overPort', undefined],
      }),
    );
    expect(JSON.parse(await reply)).toMatchObject({ id: 1, result: true });

    port2.postMessage(createPapiPortCloseFrame(1001, 'page unloading'));
    await vi.waitFor(() =>
      expect(infoLines.some((l) => l.includes('renderer:w1 closed (code=1001'))).toBe(true),
    );
    port2.close();
    vi.doUnmock('@shared/services/logger.service');
  });
});
