// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import { WebSocket } from 'ws';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { INTENTIONAL_CLOSE_CODE, REGISTER_METHOD } from '@shared/data/rpc.model';
import { issueLaunchSecrets, revokeLaunchSecrets } from '@main/services/launch-secrets.service';
import { REGISTRY_TOKEN_REQUEST_TYPE } from '@node/services/request-registry-tokens.service-model';
import { createFakeWebSocket } from './fake-web-socket-test.util';
import { bindOnAFreePort } from './real-socket-test.util';

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

type RawClientOptions = {
  /** The `Origin` header a browser always sends on a handshake */
  origin?: string;
  /** The launch secret a child main launched presents on its handshake */
  clientSecret?: string;
  /** Answers every request main forwards to this client with this result */
  answerWith?: unknown;
};

/**
 * A bare JSON-RPC client on a real `ws` socket. With no options it connects the way an external
 * tool does: no `Origin` and no launch secret.
 */
async function openRawClient(port: number, options: RawClientOptions = {}) {
  const headers = options.clientSecret ? { 'x-papi-client-secret': options.clientSecret } : {};
  const socket = new WebSocket(`ws://localhost:${port}`, {
    headers,
    ...(options.origin === undefined ? {} : { origin: options.origin }),
  });
  await new Promise<void>((resolve, reject) => {
    socket.once('open', () => resolve());
    socket.once('error', reject);
  });
  const received: { id?: number; method?: string }[] = [];
  const replies = new Map<number, (reply: JsonRpcReply) => void>();
  socket.on('message', (data) => {
    const message = JSON.parse(data.toString());
    received.push(message);
    if (message.method && message.id !== undefined && 'answerWith' in options)
      socket.send(JSON.stringify({ jsonrpc: '2.0', id: message.id, result: options.answerWith }));
    else replies.get(message.id)?.(message);
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

  async function connect(port: number, options?: RawClientOptions) {
    const client = await openRawClient(port, options);
    clients.push(client);
    return client;
  }

  /** Binds a listener and connects a data provider, launched by main, that serves tokens */
  async function listenerServingTokens() {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    await listener.registerMethod('test:ping', () => 'pong');
    const dataProvider = await connect(bound.port, {
      clientSecret: issueLaunchSecrets('dotnetDataProvider').clientSecret,
      answerWith: 'token',
    });
    const registration = await dataProvider.request(REGISTER_METHOD, [REGISTRY_TOKEN_REQUEST_TYPE]);
    expect(registration.result).toBe(true);
    return { port: bound.port, dataProvider };
  }

  function forwardedToDataProvider(dataProvider: Awaited<ReturnType<typeof connect>>) {
    return dataProvider.received
      .filter((message) => message.method === REGISTRY_TOKEN_REQUEST_TYPE)
      .map((message) => message.method);
  }

  afterEach(async () => {
    clients.splice(0).forEach((client) => client.close());
    await listener?.disconnect();
    listener = undefined;
    revokeLaunchSecrets('extensionHost');
    revokeLaunchSecrets('dotnetDataProvider');
  });

  it('serves a connection that presented the extension host secret', async () => {
    const { port, dataProvider } = await listenerServingTokens();
    const extensionHost = await connect(port, {
      clientSecret: issueLaunchSecrets('extensionHost').clientSecret,
    });

    const reply = await extensionHost.request(REGISTRY_TOKEN_REQUEST_TYPE, ['ext', 'res', []]);

    expect(reply.result).toBe('token');
    expect(forwardedToDataProvider(dataProvider)).toHaveLength(1);
  });

  it('refuses a connection that presented no secret, even without Origin', async () => {
    const { port, dataProvider } = await listenerServingTokens();
    const externalTool = await connect(port);

    const reply = await externalTool.request(REGISTRY_TOKEN_REQUEST_TYPE, ['ext', 'res', []]);

    expect(reply.error?.message).toContain('not available');
    expect(forwardedToDataProvider(dataProvider)).toHaveLength(0);
  });

  // `null` is what a sandboxed iframe or other opaque origin sends: still a browser
  it.each(['http://localhost:1212', 'https://example.com', 'null'])(
    'refuses a connection whose handshake carried Origin %s and no secret',
    async (origin) => {
      const { port, dataProvider } = await listenerServingTokens();
      const browserPage = await connect(port, { origin });

      const reply = await browserPage.request(REGISTRY_TOKEN_REQUEST_TYPE, ['ext', 'res', []]);

      expect(reply.error?.message).toContain('not available');
      expect(forwardedToDataProvider(dataProvider)).toHaveLength(0);
    },
  );

  it('does not let a connection without the data provider secret register the request type', async () => {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    const squatter = await connect(bound.port, { origin: 'http://localhost:1212' });
    const extensionHost = await connect(bound.port, {
      clientSecret: issueLaunchSecrets('extensionHost').clientSecret,
    });

    await expect(
      squatter.request(REGISTER_METHOD, [REGISTRY_TOKEN_REQUEST_TYPE]),
    ).resolves.toMatchObject({ result: false });
    await expect(
      extensionHost.request(REGISTER_METHOD, [REGISTRY_TOKEN_REQUEST_TYPE]),
    ).resolves.toMatchObject({ result: false });
  });

  it('still serves every other request type to a browser connection', async () => {
    const { port } = await listenerServingTokens();
    const browserPage = await connect(port, { origin: 'http://localhost:1212' });

    await expect(browserPage.request('test:ping', [])).resolves.toMatchObject({ result: 'pong' });
  });

  it('does not pass the request type on as an event from an unidentified connection', async () => {
    const { port, dataProvider } = await listenerServingTokens();
    const browserPage = await connect(port, { origin: 'http://localhost:1212' });

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
    const { dataProvider } = await listenerServingTokens();
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
    expect(forwardedToDataProvider(dataProvider)).toHaveLength(0);
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

  it('closes the remaining websocket clients when closing one of them throws', async () => {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    const first = await openClient(bound.port);
    const second = await openClient(bound.port);
    const firstClosed = closeOf(first);
    const secondClosed = closeOf(second);
    // The server-side socket that is asked to close first fails; the other must still be closed
    const closeSocket = vi.spyOn(WebSocket.prototype, 'close');
    closeSocket.mockImplementationOnce(() => {
      throw new Error('close failed');
    });

    try {
      expect(() =>
        listener?.closeWebSocketClients(INTENTIONAL_CLOSE_CODE, 'app shutdown'),
      ).not.toThrow();
    } finally {
      closeSocket.mockRestore();
    }

    // Whichever client's server-side socket failed to close stays open; the other one is closed
    await expect(Promise.race([firstClosed, secondClosed])).resolves.toEqual({
      code: INTENTIONAL_CLOSE_CODE,
      reason: 'app shutdown',
    });
    first.terminate();
    second.terminate();
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
