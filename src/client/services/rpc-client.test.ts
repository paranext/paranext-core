// @vitest-environment node

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { RpcClient } from '@client/services/rpc-client';

/**
 * Regression coverage for how a client reports a failed websocket connection to main.
 *
 * A client that cannot connect must fail fast and say why: both the `error` and the `close` handler
 * have to settle the in-flight attempt, or it waits out the full 10 s `AsyncVariable` timeout
 * before reporting anything, and the log has to carry the underlying cause rather than `{}`.
 *
 * The race itself is fixed on the server side, by having the listener wait for its socket to bind
 * before main reports the network service up (see rpc-websocket-listener.listening.test.ts). What
 * is covered here is that a client fails fast and says why.
 */

const mocks = vi.hoisted(() => {
  type Listener = (ev: unknown) => void;

  /**
   * Minimal stand-in for the browser/`ws` socket. Starts in CONNECTING (readyState 0) like a real
   * socket so `RpcClient.connect` waits on its `open`/`error`/`close` events rather than
   * short-circuiting.
   *
   * Deliberately separate from `createFakeWebSocket` in
   * `src/main/services/__tests__/fake-web-socket-test.util.ts`: that one models the SERVER end of a
   * client's socket (what main sent, firing `close`), while this is the client end, which needs a
   * readyState lifecycle and `accept`/`refuse` the server-end suites have no use for.
   */
  class FakeWebSocket {
    readyState = 0;

    closeCalls = 0;

    url: string;

    private listeners = new Map<string, Set<Listener>>();

    constructor(url: string) {
      this.url = url;
    }

    addEventListener(type: string, callback: Listener) {
      const forType = this.listeners.get(type) ?? new Set<Listener>();
      forType.add(callback);
      this.listeners.set(type, forType);
    }

    removeEventListener(type: string, callback: Listener) {
      this.listeners.get(type)?.delete(callback);
    }

    close() {
      this.closeCalls += 1;
      this.readyState = 3;
      this.dispatch('close');
    }

    /** An error that does not tear the socket down, so it stays live afterwards */
    reportError(error?: unknown) {
      this.dispatch('error', error);
    }

    /** What a real socket does when nothing is listening on the port yet (ECONNREFUSED) */
    refuse(error?: unknown) {
      this.readyState = 3;
      this.dispatch('error', error);
      this.dispatch('close');
    }

    accept() {
      this.readyState = 1;
      this.dispatch('open');
    }

    private dispatch(type: string, payload?: unknown) {
      [...(this.listeners.get(type) ?? [])].forEach((callback) => callback(payload ?? { type }));
    }
  }

  const state: {
    /** Pins that a failed attempt is not silently retried */
    attempts: number;
    refuseConnection: boolean;
    /** ReadyState the factory hands back, for the states connect() has to tell apart */
    initialReadyState: number;
    /**
     * Fire `error` without a following `close`, which is how a socket that reports a problem but
     * stays live presents. Nothing else settles the attempt, and nothing else closes the socket.
     */
    errorWithoutClose: boolean;
    /** Error to hand the `error` listener, for asserting what gets logged */
    refuseWith: unknown;
    /**
     * Close the socket without an `error` first, which is how a peer that accepts the TCP
     * connection and then drops it before the websocket upgrade presents. Only the `close` handler
     * runs, so it alone has to settle the attempt.
     */
    closeWithoutError: boolean;
  } = {
    attempts: 0,
    refuseConnection: false,
    initialReadyState: 0,
    errorWithoutClose: false,
    refuseWith: undefined,
    closeWithoutError: false,
  };
  const sockets: InstanceType<typeof FakeWebSocket>[] = [];
  return { FakeWebSocket, state, sockets };
});

vi.mock('@client/services/web-socket.factory', () => ({
  createWebSocket: vi.fn(async (url: string) => {
    mocks.state.attempts += 1;
    const socket = new mocks.FakeWebSocket(url);
    socket.readyState = mocks.state.initialReadyState;
    mocks.sockets.push(socket);
    // Events must fire after `connect` attaches its listeners, which happens synchronously once
    // this promise resolves.
    setTimeout(() => {
      if (!mocks.state.refuseConnection) socket.accept();
      else if (mocks.state.closeWithoutError) socket.close();
      else if (mocks.state.errorWithoutClose) socket.reportError(mocks.state.refuseWith);
      else socket.refuse(mocks.state.refuseWith);
    }, 0);
    return socket;
  }),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/**
 * Mirrors `ws`'s own `ErrorEvent` (see node_modules/ws/lib/event-target.js): the underlying error
 * is held behind a symbol and exposed through a prototype getter, so `JSON.stringify` renders the
 * whole event as `{}` and carries no cause at all.
 *
 * Modelling this faithfully matters. A plain `Error` carrying an enumerable `code` would serialize
 * its own cause and let a stringify-only implementation pass this test.
 */
function makeWebSocketErrorEvent(cause: unknown): unknown {
  const event = {};
  // Object.defineProperty defaults to enumerable: false, matching ws's prototype accessors. Object
  // literal getters would be enumerable and would defeat the point.
  Object.defineProperty(event, 'error', { get: () => cause });
  Object.defineProperty(event, 'message', {
    get: () => (cause instanceof Error ? cause.message : String(cause)),
  });
  return event;
}

/**
 * Mirrors the renderer's socket: the browser `WebSocket` fires a bare `Event` by spec, carrying
 * neither `error` nor `message`. Its properties are prototype accessors, so the only thing
 * `JSON.stringify` can reach is Chrome's own enumerable `isTrusted`.
 */
function makeBrowserErrorEvent(): unknown {
  const prototype = {};
  Object.defineProperty(prototype, 'type', { get: () => 'error' });
  const event = Object.create(prototype);
  Object.defineProperty(event, 'isTrusted', { get: () => false, enumerable: true });
  return event;
}

/** A connect failure as Node reports it, with the system fields a real ECONNREFUSED carries */
function makeConnectionRefusedError(): Error {
  return Object.assign(new Error('connect ECONNREFUSED 127.0.0.1:8876'), {
    code: 'ECONNREFUSED',
    errno: -111,
    syscall: 'connect',
    address: '127.0.0.1',
    port: 8876,
  });
}

describe('RpcClient initial connection', () => {
  beforeEach(() => {
    vi.mocked(logger.error).mockClear();
    mocks.state.attempts = 0;
    mocks.state.refuseConnection = false;
    mocks.state.initialReadyState = 0;
    mocks.state.errorWithoutClose = false;
    mocks.sockets.length = 0;
    mocks.state.refuseWith = undefined;
    mocks.state.closeWithoutError = false;
  });

  it('connects when the server is accepting', async () => {
    const client = new RpcClient();

    await expect(client.connect(() => {})).resolves.toBe(true);
    expect(mocks.state.attempts).toBe(1);
  });

  // The 1 s timeout is the assertion: settling on `error`/`close` rather than waiting out the 10 s
  // AsyncVariable timeout is the whole behavior under test, and the runner enforces the bound
  // without a wall-clock comparison in the test body that a loaded CI runner could flake.
  it('reports a refused connection promptly instead of waiting out the timeout', async () => {
    mocks.state.refuseConnection = true;
    const client = new RpcClient();

    await expect(client.connect(() => {})).resolves.toBe(false);
  }, 1000);

  it('reports a socket that closes before connecting, with no error event to settle it', async () => {
    // A refusal fires `error` then `close`, so the `error` handler always settles the attempt
    // first and the `close` handler's own settling never gets a turn. A peer that accepts the
    // connection and drops it before the websocket upgrade fires `close` alone, which is the only
    // thing left to settle the attempt.
    mocks.state.refuseConnection = true;
    mocks.state.closeWithoutError = true;
    const client = new RpcClient();

    await expect(client.connect(() => {})).resolves.toBe(false);
  }, 1000);

  it('logs the underlying error code so a refused connection is diagnosable', async () => {
    mocks.state.refuseConnection = true;
    mocks.state.refuseWith = makeWebSocketErrorEvent(makeConnectionRefusedError());

    // Guards the test itself: if this ever serializes its cause, the fake has drifted from ws and
    // would stop being able to catch a stringify-only implementation.
    expect(JSON.stringify(mocks.state.refuseWith)).toBe('{}');
    const client = new RpcClient();

    await client.connect(() => {});

    const logged = vi.mocked(logger.error).mock.calls.map((args: unknown[]) => String(args[0]));
    // The message alone would pass on a stringify-only implementation; the system fields are what
    // unwrapping the nested error actually buys.
    expect(logged.some((message: string) => message.includes('ECONNREFUSED'))).toBe(true);
    expect(logged.some((message: string) => message.includes('code=ECONNREFUSED'))).toBe(true);
    expect(logged.some((message: string) => message.includes('syscall=connect'))).toBe(true);
  });

  it('logs the socket context alone when the event carries no cause', async () => {
    // The renderer's socket is the browser `WebSocket`, whose `error` event is a bare `Event`.
    // There is no cause to unwrap, so url and readyState are the only diagnostic that path has —
    // and the `JSON.stringify` fallback must not put an empty object in front of them.
    mocks.state.refuseConnection = true;
    mocks.state.refuseWith = makeBrowserErrorEvent();

    // Guards the test itself: an event that serialized to nothing would pass even if the fallback
    // still fired, so the fake has to carry the one property Chrome exposes.
    expect(JSON.stringify(mocks.state.refuseWith)).toBe('{"isTrusted":false}');
    const client = new RpcClient();

    await client.connect(() => {});

    const logged = vi.mocked(logger.error).mock.calls.map((args: unknown[]) => String(args[0]));
    const errorEventLog = logged.find((message: string) =>
      message.includes('Client websocket error event occurred'),
    );
    expect(errorEventLog).toContain('url=');
    expect(errorEventLog).toContain('readyState=');
    expect(errorEventLog).not.toContain('isTrusted');
  });

  it('fails instead of reporting success on a socket that is already closed', async () => {
    // 3 is CLOSED. Reporting this as connected would hand the caller a dead socket, and every send
    // would be dropped until its own request timeout expired.
    mocks.state.initialReadyState = 3;
    const client = new RpcClient();

    await expect(client.connect(() => {})).resolves.toBe(false);
  });

  it('closes the socket it gives up on', async () => {
    // An `error` with no following `close` leaves the socket live, so giving up without closing it
    // orphans a socket that may still complete its handshake — and main would then build an
    // RpcServer for a client that will never respond.
    mocks.state.refuseConnection = true;
    mocks.state.errorWithoutClose = true;
    const client = new RpcClient();

    await client.connect(() => {});

    expect(mocks.sockets[0].closeCalls).toBeGreaterThan(0);
  });
});
