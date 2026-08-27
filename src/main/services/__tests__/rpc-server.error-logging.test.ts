import { describe, expect, test, vi, beforeEach } from 'vitest';
import { RpcServer } from '@main/services/rpc-server';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';

const { mockLoggerError, mockLoggerWarn, mockLoggerInfo } = vi.hoisted(() => ({
  mockLoggerError: vi.fn(),
  mockLoggerWarn: vi.fn(),
  mockLoggerInfo: vi.fn(),
}));

// vi.mock and vi.hoisted calls are hoisted above the static imports at transform time, so the
// imports can be written first here to satisfy import/first.
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    error: mockLoggerError,
    warn: mockLoggerWarn,
    info: mockLoggerInfo,
    debug: vi.fn(),
  },
}));

/** Minimal event-target stand-in: records listeners so tests can dispatch to them. */
function makeFakeSocket() {
  const listeners = new Map<string, (ev: unknown) => void>();
  // Separate from `listeners`: never pruned by removeEventListener, so a test can still invoke a
  // handler after RpcServer has "unregistered" it — proving idempotence against a caller holding a
  // stale reference, not just against dispatch-via-listeners-map (which self-defeats that case).
  const captured = new Map<string, (ev: unknown) => void>();
  const socket = {
    readyState: 1,
    send: vi.fn(),
    close: vi.fn(),
    addEventListener: (type: string, handler: (ev: unknown) => void) => {
      listeners.set(type, handler);
      captured.set(type, handler);
    },
    removeEventListener: (type: string) => {
      listeners.delete(type);
    },
  };
  return {
    // The fake implements only the surface RpcServer touches; a cast is unavoidable here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    socket: socket as unknown as WebSocket,
    dispatch: (type: string, ev: unknown) => listeners.get(type)?.(ev),
    captured,
  };
}

function makeServer(socket: WebSocket) {
  return new RpcServer('7', socket, () => {}, new Map(), new RpcEventRegistry());
}

describe('RpcServer error logging', () => {
  beforeEach(() => {
    mockLoggerError.mockClear();
  });

  test('logs the socket name and the real error detail, not "{}"', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    const error = new Error('socket hang up');
    Object.defineProperty(error, 'code', { value: 'ECONNRESET', enumerable: true });
    dispatch('error', { message: 'outer', error });

    expect(mockLoggerError).toHaveBeenCalledTimes(1);
    const logged = mockLoggerError.mock.calls[0][0];
    expect(logged).toContain('Websocket 7');
    expect(logged).toContain('socket hang up');
    expect(logged).toContain('ECONNRESET');
    expect(logged).not.toContain('{}');
  });

  test('logs the error detail exactly once, not doubled', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('error', { message: 'read ECONNRESET' });

    const logged = mockLoggerError.mock.calls[0][0];
    // A regression that re-interpolates the detail into the message as well as the data
    // argument would double it, so assert the occurrence count rather than pinning the full
    // log line (which would break on harmless wording changes).
    expect(logged.split('read ECONNRESET')).toHaveLength(2);
  });

  test('reports unknown rather than {} for a detail-free event', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('error', new Event('error'));

    expect(mockLoggerError.mock.calls[0][0]).toContain('message=unknown');
  });
});

describe('RpcServer close logging', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockLoggerInfo.mockClear();
  });

  // wasClean must be set explicitly: jsdom's CloseEvent defaults it to false, and a clean
  // code paired with an incomplete handshake is not an event any engine actually emits.
  test.each([1000, 1001, 1005, 4000])(
    'logs a clean close (code %i) at info, not warn',
    async (code) => {
      const { socket, dispatch } = makeFakeSocket();
      const server = makeServer(socket);
      await server.connect();

      dispatch('close', new CloseEvent('close', { code, wasClean: true }));

      expect(mockLoggerInfo).toHaveBeenCalledTimes(1);
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    },
  );

  test.each([1005, 1006])('logs an abnormal close (code %i) at warn, not info', async (code) => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code }));

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerInfo).not.toHaveBeenCalled();
  });

  test('logs an unexpected close at warn, with the close code', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code: 1006, reason: '', wasClean: false }));

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn.mock.calls[0][0]).toContain('code=1006');
    expect(mockLoggerInfo).not.toHaveBeenCalled();
  });

  test('logs an intentional close at info, not warn', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch(
      'close',
      new CloseEvent('close', { code: 4000, reason: 'app shutdown', wasClean: true }),
    );

    expect(mockLoggerWarn).not.toHaveBeenCalled();
    expect(mockLoggerInfo).toHaveBeenCalled();
  });

  test('logs exactly once when the close event is dispatched twice', async () => {
    const { socket, captured } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    // Call the captured handler directly, twice: `captured` is never pruned by
    // removeEventListener, so this genuinely re-invokes the handler after the first close has
    // already torn things down — unlike dispatching through the mutated `listeners` map, where the
    // second dispatch would find nothing and never call the handler at all.
    const closeHandler = captured.get('close');
    const ev = new CloseEvent('close', { code: 1006, wasClean: false });
    closeHandler?.(ev);
    closeHandler?.(ev);

    // Two scary lines for one disconnect is the noise regression this ticket must not ship.
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });

  test('removes only its own registered methods on close', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const methods = new Map();
    const server = new RpcServer('7', socket, () => {}, methods, new RpcEventRegistry());
    await server.connect();
    server.registerRemoteMethod('command:mine');
    methods.set('command:someone-elses', { handler: {}, methodDocs: undefined });

    dispatch('close', new CloseEvent('close', { code: 1006 }));

    expect(methods.has('command:mine')).toBe(false);
    expect(methods.has('command:someone-elses')).toBe(true);
  });
});
