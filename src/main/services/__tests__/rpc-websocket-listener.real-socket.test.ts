// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import { createServer } from 'net';
import { WebSocket } from 'ws';
import { retryUntil } from 'platform-bible-utils';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { INTENTIONAL_CLOSE_CODE } from '@shared/data/rpc.model';
import { REGISTRY_TOKEN_REQUEST_TYPE } from '@node/services/request-registry-tokens.service-model';
import { createFakeWebSocket } from './fake-web-socket-test.util';

/**
 * Companion to `rpc-websocket-listener.listening.test.ts`, which proves the `listening` handshake
 * with a stubbed `ws`. This one deliberately does NOT mock `ws`: it binds a real socket so the
 * promise `connect()` awaits is resolved by the host's actual network stack.
 *
 * That is the part worth running on every OS in CI. Whether `connect()` resolving implies "a client
 * can connect right now" depends on the platform's bind/listen semantics and on how `localhost`
 * resolves (IPv4 vs IPv6) — details that a stubbed server cannot exercise and that differ across
 * Windows, macOS, and Linux.
 */

vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

/**
 * Asks the OS for a free port and releases it, since binding the app's real port would collide with
 * a dev app on a developer machine.
 *
 * Hand-rolled rather than using the `detect-port` devDependency because that probes upward from a
 * starting port, so parallel runs and a dev app converge on the same low ports. Asking the OS for
 * an ephemeral port instead makes a collision the OS's problem, and scopes the probe to `localhost`
 * — the interface the listener actually binds.
 */
function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on('error', reject);
    probe.listen(0, 'localhost', () => {
      const address = probe.address();
      if (address && typeof address === 'object') {
        const { port } = address;
        probe.close(() => resolve(port));
      } else {
        probe.close(() => reject(new Error('Could not determine a free port')));
      }
    });
  });
}

/**
 * Resolves whether a client can complete a websocket handshake against `port` right now.
 *
 * Bounded, because a peer that accepts the TCP connection but never completes the upgrade emits
 * neither `open` nor `error` — without the timer that reports as a hung suite rather than a false.
 */
function canConnect(port: number, timeoutMs = 2000): Promise<boolean> {
  return new Promise((resolve) => {
    const client = new WebSocket(`ws://localhost:${port}`);
    let timeout: ReturnType<typeof setTimeout>;
    const settle = (result: boolean) => {
      clearTimeout(timeout);
      // Keep an error handler attached through the close handshake: `ws` sockets are bare
      // EventEmitters, so a late `error` with no listener throws inside the test worker.
      client.removeAllListeners();
      client.on('error', () => {});
      client.close();
      resolve(result);
    };
    timeout = setTimeout(() => settle(false), timeoutMs);
    client.on('open', () => settle(true));
    client.on('error', () => settle(false));
  });
}

/**
 * Binds a listener on a free port, retrying if something else claimed the port first.
 *
 * `getFreePort` releases the port before the listener rebinds it, so a parallel vitest worker or
 * anything else on the machine can take it in between. Without the retry that lost race surfaces as
 * `connect()` resolving false, which reads as though the code under test regressed.
 */
async function bindOnAFreePort(): Promise<{ listener: RpcWebSocketListener; port: number }> {
  const maxAttempts = 5;
  // `retryUntil` rather than a bespoke loop: the awaits move into the attempt callback, so the
  // attempts stay serial — each must bind before the next port is picked — without suppressing
  // `no-await-in-loop`. A give-up attempt releases its listener before returning `undefined`.
  const bound = await retryUntil(
    async () => {
      const port = await getFreePort();
      const candidate = new RpcWebSocketListener(port);
      if (await candidate.connect(vi.fn())) return { listener: candidate, port };
      await candidate.disconnect();
      return undefined;
    },
    (result) => !!result,
    { maxAttempts },
  );
  if (!bound) throw new Error(`Could not bind a free port in ${maxAttempts} attempts`);
  return bound;
}

describe('the PAPI websocket against a real socket', () => {
  let listener: RpcWebSocketListener | undefined;

  afterEach(async () => {
    await listener?.disconnect();
    listener = undefined;
  });

  it('accepts a client immediately after connect() resolves', async () => {
    const bound = await bindOnAFreePort();
    listener = bound.listener;

    // No delay and no retry between connect() resolving and this attempt. That is the guarantee
    // main depends on when it spawns the extension host straight after initializing the network
    // service.
    await expect(canConnect(bound.port)).resolves.toBe(true);
  });

  it('reports failure rather than claiming success when the port is already taken', async () => {
    // Retries past a lost port race, so reaching the assertion below means the port really is held
    // by the squatter rather than by an unrelated process.
    const squatting = await bindOnAFreePort();
    const squatter = squatting.listener;

    try {
      listener = new RpcWebSocketListener(squatting.port);
      await expect(listener.connect(vi.fn())).resolves.toBe(false);
    } finally {
      await squatter.disconnect();
    }
  });
});

type JsonRpcReply = { id: number; result?: unknown; error?: { code: number; message: string } };

/**
 * A bare JSON-RPC client on a real `ws` socket. Passing `origin` makes its handshake carry the
 * `Origin` header a browser always sends; leaving it out connects the way the extension host and
 * the .NET data provider do.
 */
async function openRawClient(port: number, origin?: string) {
  const socket = new WebSocket(`ws://localhost:${port}`, origin === undefined ? {} : { origin });
  await new Promise<void>((resolve, reject) => {
    socket.once('open', () => resolve());
    socket.once('error', reject);
  });
  const received: { id?: number; method?: string }[] = [];
  const replies = new Map<number, (reply: JsonRpcReply) => void>();
  socket.on('message', (data) => {
    const message = JSON.parse(data.toString());
    received.push(message);
    replies.get(message.id)?.(message);
  });
  let nextId = 1;
  return {
    received,
    request(method: string, params: unknown[]): Promise<JsonRpcReply> {
      const id = nextId;
      nextId += 1;
      return new Promise((resolve) => {
        replies.set(id, resolve);
        socket.send(JSON.stringify({ jsonrpc: '2.0', id, method, params }));
      });
    },
    notify(method: string, params: unknown[]): void {
      socket.send(JSON.stringify({ jsonrpc: '2.0', method, params }));
    },
    close(): void {
      socket.close();
    },
  };
}

describe('the Registry token request type over real connections', () => {
  let listener: RpcWebSocketListener | undefined;
  const clients: { close(): void }[] = [];
  const issueToken = vi.fn(() => 'token');

  async function listenerServingTokens(): Promise<number> {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    await listener.registerMethod(REGISTRY_TOKEN_REQUEST_TYPE, issueToken);
    await listener.registerMethod('test:ping', () => 'pong');
    return bound.port;
  }

  async function connect(port: number, origin?: string) {
    const client = await openRawClient(port, origin);
    clients.push(client);
    return client;
  }

  afterEach(async () => {
    clients.splice(0).forEach((client) => client.close());
    await listener?.disconnect();
    listener = undefined;
    issueToken.mockClear();
  });

  it('serves a connection whose handshake carried no Origin, as the extension host connects', async () => {
    const port = await listenerServingTokens();
    const extensionHost = await connect(port);

    const reply = await extensionHost.request(REGISTRY_TOKEN_REQUEST_TYPE, ['ext', 'res', []]);

    expect(reply.result).toBe('token');
    expect(issueToken).toHaveBeenCalledTimes(1);
  });

  // `null` is what a sandboxed iframe or other opaque origin sends: still a browser
  it.each(['http://localhost:1212', 'https://example.com', 'null'])(
    'refuses a connection whose handshake carried Origin %s',
    async (origin) => {
      const port = await listenerServingTokens();
      const browserPage = await connect(port, origin);

      const reply = await browserPage.request(REGISTRY_TOKEN_REQUEST_TYPE, ['ext', 'res', []]);

      expect(reply.error?.message).toContain('not available');
      expect(issueToken).not.toHaveBeenCalled();
    },
  );

  it('still serves every other request type to a browser connection', async () => {
    const port = await listenerServingTokens();
    const browserPage = await connect(port, 'http://localhost:1212');

    await expect(browserPage.request('test:ping', [])).resolves.toMatchObject({ result: 'pong' });
  });

  it('does not pass the request type on as an event from a browser connection', async () => {
    const port = await listenerServingTokens();
    // Stands in for the .NET data provider, which StreamJsonRpc would hand a matching event to
    const dataProvider = await connect(port);
    const browserPage = await connect(port, 'http://localhost:1212');

    browserPage.notify(REGISTRY_TOKEN_REQUEST_TYPE, [{}]);
    browserPage.notify('test:event', [{}]);
    // Main forwards to the data provider in order, so a reply to its own request arrives after
    // anything forwarded before it
    await browserPage.request('test:ping', []);
    await dataProvider.request('test:ping', []);

    const forwarded = dataProvider.received.map((message) => message.method);
    expect(forwarded).toContain('test:event');
    expect(forwarded).not.toContain(REGISTRY_TOKEN_REQUEST_TYPE);
  });

  it('refuses a renderer connection, which reaches main over a MessagePort', async () => {
    await listenerServingTokens();
    const renderer = createFakeWebSocket();
    listener?.acceptLocalClient(renderer.webSocket, 'renderer:w1');

    renderer.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTRY_TOKEN_REQUEST_TYPE,
      params: ['ext', 'res', []],
    });

    await vi.waitFor(() => expect(renderer.sentPayloads).toHaveLength(1));
    expect(renderer.sentPayloads[0]).toContain('not available');
    expect(issueToken).not.toHaveBeenCalled();
  });
});

describe('closing the websocket clients on the way down', () => {
  let listener: RpcWebSocketListener | undefined;

  afterEach(async () => {
    await listener?.disconnect();
    listener = undefined;
  });

  /** Opens a real client, connected the way the .NET data provider connects */
  async function openClient(port: number): Promise<WebSocket> {
    const socket = new WebSocket(`ws://localhost:${port}`);
    await new Promise<void>((resolve, reject) => {
      socket.once('open', () => resolve());
      socket.once('error', reject);
    });
    return socket;
  }

  function closeOf(socket: WebSocket): Promise<{ code: number; reason: string }> {
    return new Promise((resolve) => {
      socket.once('close', (code, reason) => resolve({ code, reason: reason.toString() }));
    });
  }

  it('closes every websocket client with the code and reason given', async () => {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    const dataProvider = await openClient(bound.port);
    const externalTool = await openClient(bound.port);
    const dataProviderClosed = closeOf(dataProvider);
    const externalToolClosed = closeOf(externalTool);
    // No wait needed for the server to know both clients: `ws` emits `connection` as it writes the
    // handshake response, before the client can have read it and opened

    listener.closeWebSocketClients(INTENTIONAL_CLOSE_CODE, 'app shutdown');

    await expect(dataProviderClosed).resolves.toEqual({
      code: INTENTIONAL_CLOSE_CODE,
      reason: 'app shutdown',
    });
    await expect(externalToolClosed).resolves.toEqual({
      code: INTENTIONAL_CLOSE_CODE,
      reason: 'app shutdown',
    });
  });

  it('leaves a local client open, since whoever handed its socket over owns closing it', async () => {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    const renderer = createFakeWebSocket();
    const closeRenderer = vi.spyOn(renderer.webSocket, 'close');
    listener.acceptLocalClient(renderer.webSocket, 'renderer:w1');

    listener.closeWebSocketClients(INTENTIONAL_CLOSE_CODE, 'app shutdown');

    expect(closeRenderer).not.toHaveBeenCalled();
  });
});
