import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';
import { RpcClient } from '@client/services/rpc-client';
import { createWebSocket } from '@client/services/web-socket.factory';
import { ConnectionStatus } from '@shared/data/rpc.model';

const { mockLoggerWarn, mockLoggerInfo, mockLoggerError } = vi.hoisted(() => ({
  mockLoggerWarn: vi.fn(),
  mockLoggerInfo: vi.fn(),
  mockLoggerError: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: mockLoggerWarn, info: mockLoggerInfo, error: mockLoggerError, debug: vi.fn() },
}));

/**
 * Mirrors how the `ws` library builds its ErrorEvent: the message lives on a symbol key with an
 * enumerable accessor on the prototype, so `JSON.stringify` yields `{}` — an event built from own
 * properties (e.g. a plain `{ message }` object) would not actually reproduce that collapse and
 * would pass even against a `JSON.stringify`-based handler.
 */
const kMessage = Symbol('message');
class WsLikeErrorEvent {
  [key: symbol]: unknown;

  constructor(message: string) {
    this[kMessage] = message;
  }

  get message() {
    return this[kMessage];
  }
}
Object.defineProperty(WsLikeErrorEvent.prototype, 'message', { enumerable: true });

/** Minimal event-target stand-in: records listeners so tests can dispatch to them. */
function makeFakeSocket() {
  const listeners = new Map<string, (ev: unknown) => void>();
  // Separate from `listeners`: never pruned by removeEventListener, so a test can still invoke a
  // handler after RpcClient has "unregistered" it — proving idempotence against a caller holding a
  // stale reference, not just against dispatch-via-listeners-map (which self-defeats that case).
  const captured = new Map<string, (ev: unknown) => void>();
  const socket = {
    url: 'ws://localhost:8876/',
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
    socket,
    dispatch: (type: string, ev: unknown) => listeners.get(type)?.(ev),
    captured,
  };
}

let fakeSocket: ReturnType<typeof makeFakeSocket>['socket'];
let dispatch: ReturnType<typeof makeFakeSocket>['dispatch'];
let captured: ReturnType<typeof makeFakeSocket>['captured'];

vi.mock('@client/services/web-socket.factory', () => ({
  createWebSocket: vi.fn(async () => fakeSocket),
}));

async function connectedClient(peerName = 'renderer-1') {
  const client = new RpcClient(peerName);
  await client.connect(() => {});
  return client;
}

describe('RpcClient close logging', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    const fake = makeFakeSocket();
    fakeSocket = fake.socket;
    dispatch = fake.dispatch;
    captured = fake.captured;
    mockLoggerWarn.mockClear();
    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
  });

  /** Close one client built with the given window id and return the label it logged. */
  async function labelForWindow(windowId: string | undefined): Promise<string> {
    vi.stubGlobal('windowId', windowId);
    const fake = makeFakeSocket();
    fakeSocket = fake.socket;
    dispatch = fake.dispatch;
    mockLoggerWarn.mockClear();
    await connectedClient('renderer');
    dispatch('close', new CloseEvent('close', { code: 1006 }));
    return mockLoggerWarn.mock.calls[0][0];
  }

  test('gives two windows labels that differ, not merely labels that are decorated', async () => {
    // createRpcHandler passes the bare processType as peerName, so without a discriminator two
    // BrowserWindow renderer processes emit byte-identical lines. Asserting both match
    // /renderer#\S+/ would pass against a constant discriminator, which is exactly the regression
    // that matters — so compare the two labels to each other.
    const firstLabel = await labelForWindow('1');
    const secondLabel = await labelForWindow('2');

    expect(firstLabel).toContain('renderer#1');
    expect(secondLabel).toContain('renderer#2');
    expect(firstLabel).not.toBe(secondLabel);
  });

  test('reuses the window id across reloads, so a reconnect is not read as a new window', async () => {
    // The point of preferring globalThis.windowId over a per-instance random id: a reload builds a
    // new RpcClient in the same window, and its lines must still be attributable to that window.
    expect(await labelForWindow('7')).toBe(await labelForWindow('7'));
  });

  test('falls back to a per-instance id where neither a window id nor a pid exists', async () => {
    // The renderer has no `process` (see logger.utils.ts), and a web view context has no window id
    // either; the label must still not read `renderer#undefined`. The discriminator is computed in
    // the constructor, so only construction needs the globals stubbed.
    vi.stubGlobal('windowId', undefined);
    vi.stubGlobal('process', undefined);
    const client = new RpcClient('renderer');
    vi.unstubAllGlobals();

    await client.connect(() => {});
    dispatch('close', new CloseEvent('close', { code: 1006 }));

    const logged = mockLoggerWarn.mock.calls[0][0];
    expect(logged).toMatch(/renderer#[a-z0-9]+ /);
    expect(logged).not.toContain('undefined');
  });

  // wasClean must be set explicitly: jsdom's CloseEvent defaults it to false, so each row here
  // pairs a clean code with the completed handshake that really accompanies it. The abnormal rows
  // below deliberately leave it at that default.
  test.each([1000, 1001, 1005, 4000])(
    'logs a clean close (code %i) at info, not warn',
    async (code) => {
      await connectedClient();
      // connect() itself logs at info ("Websocket connected to ..."); clear that so the assertions
      // below observe only the close-logging behavior under test.
      mockLoggerInfo.mockClear();

      dispatch('close', new CloseEvent('close', { code, wasClean: true }));

      expect(mockLoggerInfo).toHaveBeenCalledTimes(1);
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    },
  );

  test.each([1005, 1006])('logs an abnormal close (code %i) at warn, not info', async (code) => {
    await connectedClient();
    mockLoggerInfo.mockClear();

    dispatch('close', new CloseEvent('close', { code }));

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerInfo).not.toHaveBeenCalled();
  });

  test('logs an unexpected close at warn, naming the peer and the close code', async () => {
    await connectedClient('renderer-1');

    dispatch('close', new CloseEvent('close', { code: 1006, reason: '', wasClean: false }));

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    const logged = mockLoggerWarn.mock.calls[0][0];
    expect(logged).toContain('renderer-1');
    expect(logged).toContain('code=1006');
  });

  test('logs a close following disconnect() at info, not warn', async () => {
    const client = await connectedClient();
    await client.disconnect();

    dispatch(
      'close',
      new CloseEvent('close', { code: 4000, reason: 'app shutdown', wasClean: true }),
    );

    expect(mockLoggerWarn).not.toHaveBeenCalled();
    expect(mockLoggerInfo).toHaveBeenCalled();
  });

  test('disconnect() closes with the intentional close code', async () => {
    const client = await connectedClient();
    await client.disconnect();

    expect(fakeSocket.close).toHaveBeenCalledWith(4000, expect.any(String));
  });

  test('classifies an abnormal close arriving AFTER disconnect() as unexpected', async () => {
    // Suspend kills the socket, the abnormal close event queues, then the app quits and
    // calls disconnect(). The queued close must not be relabelled as a clean shutdown.
    const client = await connectedClient();
    await client.disconnect();

    dispatch('close', new CloseEvent('close', { code: 1006, wasClean: false }));

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn.mock.calls[0][0]).toContain('code=1006');
  });

  test('logs exactly once when close is dispatched twice', async () => {
    await connectedClient();
    const ev = new CloseEvent('close', { code: 1006 });

    // Call the captured handler directly, twice: `captured` is never pruned by
    // removeEventListener, so this genuinely re-invokes the handler after the first close has
    // already torn things down — unlike dispatching through the mutated `listeners` map, where the
    // second dispatch would find nothing and never call the handler at all.
    const closeHandler = captured.get('close');
    closeHandler?.(ev);
    closeHandler?.(ev);

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });

  test('still tears down when connectionStatus was already set to Disconnected', async () => {
    // `connectionStatus` is public and mutable, so keying idempotence off it made teardown
    // dependent on it: setting Disconnected in disconnect() — the natural future edit — would make
    // the close that follows a no-op, leaking every pending request and listener the socket held.
    const client = await connectedClient();
    client.connectionStatus = ConnectionStatus.Disconnected;
    const inFlight = client.request('command:slow', []);

    dispatch('close', new CloseEvent('close', { code: 1006 }));

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    const response = await inFlight;
    expect('error' in response && response.error?.message).toMatch(/closed/i);
  });

  test('resolves in-flight requests with an error naming the closed socket', async () => {
    // json-rpc-2.0's rejectAllPendingRequests resolves each pending request's promise with a
    // JSON-RPC error response rather than rejecting it, so the request settles here instead of
    // throwing.
    const client = await connectedClient();
    const inFlight = client.request('command:slow', []);

    dispatch('close', new CloseEvent('close', { code: 1006 }));

    const response = await inFlight;
    expect('error' in response && response.error?.message).toMatch(/closed/i);
  });

  test('logs a real error detail instead of {}', async () => {
    await connectedClient();

    dispatch('error', new WsLikeErrorEvent('read ECONNRESET'));

    expect(mockLoggerError).toHaveBeenCalled();
    const logged = mockLoggerError.mock.calls[0][0];
    expect(logged).toContain('read ECONNRESET');
    expect(logged).not.toContain('{}');
  });

  test('logs the error detail exactly once, not doubled', async () => {
    await connectedClient();

    dispatch('error', new WsLikeErrorEvent('read ECONNRESET'));

    const logged = mockLoggerError.mock.calls[0][0];
    // A regression that re-interpolates the detail into the message as well as the data
    // argument would double it, so assert the occurrence count rather than pinning the full
    // log line (which would break on harmless wording changes).
    expect(logged.split('read ECONNRESET')).toHaveLength(2);
  });

  test('names the peer on the error line, usually the first symptom', async () => {
    // In the renderer the error event carries no detail at all by specification, so without the
    // peer label two windows emit byte-identical error lines.
    await connectedClient('renderer-1');

    dispatch('error', new WsLikeErrorEvent('read ECONNRESET'));

    expect(mockLoggerError.mock.calls[0][0]).toContain('renderer-1');
  });

  test('announces its peer name to main so the two ends can be joined', async () => {
    // Main labels the socket with an id this process never sees; this is the only thing that ties
    // main's close line for a socket to the client's own line for the same disconnect.
    await connectedClient('renderer-1');

    const sent = fakeSocket.send.mock.calls.map((call) => String(call[0])).join('\n');
    expect(sent).toContain('network:announcePeer');
    expect(sent).toContain('renderer-1#');
  });

  test('does not wait for the announcement to be answered', async () => {
    // The fake socket never answers, so awaiting the announcement would hang connect() — which is
    // the point: diagnostic metadata must not sit in the path of a connection that is already up,
    // where a peer that never implements the method would block startup outright.
    const client = new RpcClient('renderer-1');

    await expect(client.connect(() => {})).resolves.toBe(true);
  });

  test('logs a connection failure with the peer and reason, not {}', async () => {
    vi.mocked(createWebSocket).mockRejectedValueOnce(
      Object.assign(new Error('connect ECONNREFUSED 127.0.0.1:8876'), { code: 'ECONNREFUSED' }),
    );

    const client = new RpcClient('extension-host');
    const connected = await client.connect(() => {});

    expect(connected).toBe(false);
    const logged = mockLoggerError.mock.calls[0][0];
    expect(logged).toContain('extension-host');
    expect(logged).toContain('ECONNREFUSED');
    expect(logged).not.toContain('{}');
  });
});
