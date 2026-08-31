import { describe, expect, test, vi, beforeEach } from 'vitest';
import { RpcServer } from '@main/services/rpc-server';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';

const { mockLoggerError, mockLoggerWarn, mockLoggerInfo, mockIsAppShuttingDown } = vi.hoisted(
  () => ({
    mockLoggerError: vi.fn(),
    mockLoggerWarn: vi.fn(),
    mockLoggerInfo: vi.fn(),
    mockIsAppShuttingDown: vi.fn(() => false),
  }),
);

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

// Stubbed rather than exercised through the real latch: the real one answers from the tracked
// BrowserWindow list, which would make the severity assertions below depend on window-state setup
// instead of on the close handler under test. It also keeps `electron` out of this module graph.
vi.mock('@main/services/shutdown-latch.service', () => ({
  isAppShuttingDown: () => mockIsAppShuttingDown(),
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
  return new RpcServer(
    '7',
    socket,
    () => {},
    new Map(),
    new RpcEventRegistry(),
    () => {},
  );
}

describe('RpcServer error logging', () => {
  beforeEach(() => {
    mockLoggerError.mockClear();
    mockIsAppShuttingDown.mockReturnValue(false);
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

/**
 * The close-summary lines a mock logger recorded. A close logs twice — the summary carrying the
 * event detail, then the count of methods the socket actually took with it — so a raw call count
 * says nothing about the severity the summary was reported at.
 */
function closeSummaries(mockLogger: { mock: { calls: unknown[][] } }): string[] {
  return mockLogger.mock.calls
    .map((call) => String(call[0]))
    .filter((line) => line.includes('closed (code='));
}

describe('RpcServer close logging', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockLoggerInfo.mockClear();
    mockIsAppShuttingDown.mockReturnValue(false);
  });

  // wasClean must be set explicitly: jsdom's CloseEvent defaults it to false, and each row below
  // pairs a code with the wasClean value that really accompanies it.
  test.each([1000, 1001, 1005, 4000])(
    'logs a clean close (code %i) at info, not warn',
    async (code) => {
      const { socket, dispatch } = makeFakeSocket();
      const server = makeServer(socket);
      await server.connect();

      dispatch('close', new CloseEvent('close', { code, wasClean: true }));

      expect(closeSummaries(mockLoggerInfo)).toHaveLength(1);
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    },
  );

  test.each([1005, 1006])('logs an abnormal close (code %i) at warn, not info', async (code) => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code }));

    expect(closeSummaries(mockLoggerWarn)).toHaveLength(1);
    expect(closeSummaries(mockLoggerInfo)).toHaveLength(0);
  });

  test('logs an unexpected close at warn, with the close code', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code: 1006, reason: '', wasClean: false }));

    expect(closeSummaries(mockLoggerWarn)).toHaveLength(1);
    expect(closeSummaries(mockLoggerWarn)[0]).toContain('code=1006');
    expect(closeSummaries(mockLoggerInfo)).toHaveLength(0);
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
    expect(closeSummaries(mockLoggerWarn)).toHaveLength(1);
  });

  test('removes only its own registered methods on close', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const methods = new Map();
    const server = new RpcServer(
      '7',
      socket,
      () => {},
      methods,
      new RpcEventRegistry(),
      () => {},
    );
    await server.connect();
    server.registerRemoteMethod('command:mine');
    methods.set('command:someone-elses', { handler: {}, methodDocs: undefined });

    dispatch('close', new CloseEvent('close', { code: 1006 }));

    expect(methods.has('command:mine')).toBe(false);
    expect(methods.has('command:someone-elses')).toBe(true);
  });

  test("counts only the departing peer's methods, not the whole shared registry", async () => {
    // The method map is shared by reference across every RpcServer, so its `size` is the network's
    // method count. Reporting that against one socket is what produced "Removing 566 methods" for a
    // peer that had registered a handful.
    const { socket, dispatch } = makeFakeSocket();
    const methods = new Map();
    const server = new RpcServer(
      '7',
      socket,
      () => {},
      methods,
      new RpcEventRegistry(),
      () => {},
    );
    await server.connect();
    server.registerRemoteMethod('command:mine');
    server.registerRemoteMethod('command:mine-too');
    methods.set('command:someone-elses', { handler: {}, methodDocs: undefined });
    methods.set('command:someone-elses-2', { handler: {}, methodDocs: undefined });

    dispatch('close', new CloseEvent('close', { code: 1006, wasClean: false }));

    // The count belongs to what the socket actually took with it, so it is logged after the removal
    // loop; the close line itself carries no count at all, rather than a shared-registry number.
    expect(closeSummaries(mockLoggerWarn)[0]).not.toMatch(/\d+ methods/);
    const counted = mockLoggerInfo.mock.calls.map((call) => String(call[0])).join('\n');
    expect(counted).toContain('Removed 2 methods');
  });

  test('reports a peer that died on the way down at info, not warn', async () => {
    // No client closes politely: main's server is still listening while the extension host calls
    // process.exit() and each renderer process is torn down, so every peer dies with 1006 on a
    // normal quit. At warn, that fires on every shutdown and buries the signal.
    mockIsAppShuttingDown.mockReturnValue(true);
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code: 1006, wasClean: false }));

    expect(mockLoggerWarn).not.toHaveBeenCalled();
    expect(closeSummaries(mockLoggerInfo)).toHaveLength(1);
    // Still says what happened — the point is the severity, not hiding the abnormal close.
    expect(closeSummaries(mockLoggerInfo)[0]).toContain('code=1006 abnormal=true');
    expect(closeSummaries(mockLoggerInfo)[0]).toContain('expected during app shutdown');
  });

  test('still reports a peer that died while the app is running at warn', async () => {
    // The complement of the case above, and the one PT-1641 is about: same event, app not going
    // down, so it must stay greppable.
    mockIsAppShuttingDown.mockReturnValue(false);
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code: 1006, wasClean: false }));

    expect(closeSummaries(mockLoggerWarn)).toHaveLength(1);
    expect(closeSummaries(mockLoggerWarn)[0]).not.toContain('expected during app shutdown');
  });
});

describe('RpcServer peer identity', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
    mockIsAppShuttingDown.mockReturnValue(false);
  });

  test('names the announced peer in the close line alongside its own socket id', async () => {
    // Main labels sockets with an incrementing id that appears nowhere in the client's logs, so
    // without the announced name the two ends' lines for one disconnect cannot be joined.
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();
    server.setPeerName('renderer#3');

    dispatch('close', new CloseEvent('close', { code: 1006, wasClean: false }));

    expect(closeSummaries(mockLoggerWarn)[0]).toContain('Websocket 7 (renderer#3) closed');
  });

  test('names the announced peer in the error line too', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();
    server.setPeerName('extension-host#4021');

    dispatch('error', { message: 'read ECONNRESET' });

    expect(mockLoggerError.mock.calls[0][0]).toContain('Websocket 7 (extension-host#4021)');
  });

  test('falls back to the bare socket id for a peer that never announces', async () => {
    // The .NET data provider does not announce, so this is the live path, not a hypothetical.
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('close', new CloseEvent('close', { code: 1006, wasClean: false }));

    expect(closeSummaries(mockLoggerWarn)[0]).toContain('Websocket 7 closed');
  });

  test.each([
    ['renderer#3 \n[main] forged line', 'renderer#3mainforgedline'],
    ['a'.repeat(200), 'a'.repeat(60)],
  ])('strips a peer-supplied label down to a safe one (%j)', (announced, expected) => {
    // Peer-controlled text heading straight into log lines. The allowlist is deliberately narrower
    // than a whitespace sweep: the shape a client generates is `<processType>#<discriminator>`.
    const { socket } = makeFakeSocket();
    const server = makeServer(socket);
    server.setPeerName(announced);

    expect(mockLoggerInfo.mock.calls[0][0]).toContain(expected);
  });

  test.each(['', '!!!'])('rejects a label with nothing usable in it (%j)', (announced) => {
    const { socket } = makeFakeSocket();
    const server = makeServer(socket);

    expect(server.setPeerName(announced)).toBe(false);
  });
});
