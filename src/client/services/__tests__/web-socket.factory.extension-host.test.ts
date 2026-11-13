// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IncomingMessage } from 'http';
import type { AddressInfo } from 'net';
import { WebSocketServer } from 'ws';
import type { IWebSocket } from '@client/services/web-socket.interface';
import { PAPI_CLIENT_SECRET_HEADER, PAPI_SERVER_SECRET_HEADER } from '@shared/data/rpc.model';

vi.mock('@shared/utils/internal-util', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@shared/utils/internal-util')>()),
  isRenderer: () => false,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

const CREDENTIALS = { clientSecret: 'fake-client-secret', serverSecret: 'fake-server-secret' };

/** A real `ws` server that records each handshake and replies with `replyServerSecret` if given */
async function startServer(replyServerSecret?: string) {
  const handshakes: IncomingMessage[] = [];
  const server = new WebSocketServer({ host: 'localhost', port: 0 });
  server.on('headers', (headers, request) => {
    handshakes.push(request);
    if (replyServerSecret) headers.push(`${PAPI_SERVER_SECRET_HEADER}: ${replyServerSecret}`);
  });
  await new Promise<void>((resolve) => {
    server.once('listening', () => resolve());
  });
  // A bound `ws` server reports an AddressInfo
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const { port } = server.address() as AddressInfo;
  return { server, handshakes, url: `ws://localhost:${port}` };
}

/** Resolves `'open'` if the socket opened, or `'closed'` if it closed without ever opening */
function outcomeOf(socket: IWebSocket): Promise<'open' | 'closed'> {
  return new Promise((resolve) => {
    socket.addEventListener('open', () => resolve('open'));
    socket.addEventListener('close', () => resolve('closed'));
    socket.addEventListener('error', () => {});
  });
}

async function loadFreshModules() {
  vi.resetModules();
  const credentials = await import('@client/services/launch-credentials');
  const { createWebSocket } = await import('@client/services/web-socket.factory');
  return { ...credentials, createWebSocket };
}

describe('createWebSocket in the extension host', () => {
  const servers: WebSocketServer[] = [];
  const sockets: IWebSocket[] = [];

  afterEach(async () => {
    sockets.splice(0).forEach((socket) => socket.close());
    await Promise.all(
      servers.splice(0).map(
        (server) =>
          new Promise((resolve) => {
            server.close(resolve);
          }),
      ),
    );
  });

  async function connect(replyServerSecret: string | undefined, hasCredentials: boolean) {
    const { server, handshakes, url } = await startServer(replyServerSecret);
    servers.push(server);
    const modules = await loadFreshModules();
    if (hasCredentials) modules.setLaunchCredentials(CREDENTIALS);
    const socket = await modules.createWebSocket(url);
    sockets.push(socket);
    const outcome = await outcomeOf(socket);
    return { outcome, handshakes, identity: modules.getLocalConnectionIdentity() };
  }

  it('sends the client secret header and is identified once main proves itself', async () => {
    const { outcome, handshakes, identity } = await connect(CREDENTIALS.serverSecret, true);

    expect(handshakes[0]?.headers[PAPI_CLIENT_SECRET_HEADER]).toBe(CREDENTIALS.clientSecret);
    expect(outcome).toBe('open');
    expect(identity).toBe('extensionHost');
  });

  it('fails the connect when the reply lacks the server secret', async () => {
    const { outcome, identity } = await connect(undefined, true);

    expect(outcome).toBe('closed');
    expect(identity).toBe('unidentified');
  });

  it('fails the connect when the reply has the wrong server secret', async () => {
    const { outcome, identity } = await connect('some-other-secret', true);

    expect(outcome).toBe('closed');
    expect(identity).toBe('unidentified');
  });

  it('connects with no header when there are no credentials', async () => {
    const { outcome, handshakes, identity } = await connect(undefined, false);

    expect(handshakes[0]?.headers[PAPI_CLIENT_SECRET_HEADER]).toBeUndefined();
    expect(outcome).toBe('open');
    expect(identity).toBe('unidentified');
  });

  it('presents the credentials only once', async () => {
    const { server, handshakes, url } = await startServer(CREDENTIALS.serverSecret);
    servers.push(server);
    const modules = await loadFreshModules();
    modules.setLaunchCredentials(CREDENTIALS);
    const first = await modules.createWebSocket(url);
    const second = await modules.createWebSocket(url);
    sockets.push(first, second);
    await Promise.all([outcomeOf(first), outcomeOf(second)]);

    expect(handshakes.map((request) => request.headers[PAPI_CLIENT_SECRET_HEADER])).toEqual([
      CREDENTIALS.clientSecret,
      undefined,
    ]);
  });
});
