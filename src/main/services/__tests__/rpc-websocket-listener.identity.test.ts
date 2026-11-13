// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IncomingMessage } from 'http';
import { WebSocket } from 'ws';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { issueLaunchSecrets, revokeLaunchSecrets } from '@main/services/launch-secrets.service';
import { logger } from '@shared/services/logger.service';
import { createFakeWebSocket } from './fake-web-socket-test.util';
import { bindOnAFreePort } from './real-socket-test.util';

vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

const CLIENT_SECRET_HEADER = 'x-papi-client-secret';
const SERVER_SECRET_HEADER = 'x-papi-server-secret';

type Handshake =
  | { accepted: true; socket: WebSocket; response: IncomingMessage }
  | { accepted: false; status: number | undefined };

/** Opens a real client, presenting `clientSecret` in its handshake when one is given */
function handshake(port: number, clientSecret?: string | string[]): Promise<Handshake> {
  const socket = new WebSocket(
    `ws://localhost:${port}`,
    clientSecret === undefined ? {} : { headers: { [CLIENT_SECRET_HEADER]: clientSecret } },
  );
  return new Promise((resolve) => {
    let response: IncomingMessage | undefined;
    socket.once('upgrade', (upgradeResponse) => {
      response = upgradeResponse;
    });
    socket.once('open', () => {
      if (!response) throw new Error('Opened without an upgrade response');
      resolve({ accepted: true, socket, response });
    });
    socket.once('unexpected-response', (request, rejection) => {
      request.destroy();
      resolve({ accepted: false, status: rejection.statusCode });
    });
    socket.on('error', () => {});
  });
}

function closeOf(socket: WebSocket): Promise<number> {
  return new Promise((resolve) => {
    socket.once('close', (code) => resolve(code));
  });
}

function connectLogLines(): string[] {
  return vi
    .mocked(logger.info)
    .mock.calls.map(([line]) => String(line))
    .filter((line) => line.includes('connected'));
}

describe('connection identity from the handshake', () => {
  let listener: RpcWebSocketListener | undefined;
  const sockets: WebSocket[] = [];

  async function bind(): Promise<number> {
    const bound = await bindOnAFreePort();
    listener = bound.listener;
    return bound.port;
  }

  async function accept(port: number, clientSecret?: string) {
    const result = await handshake(port, clientSecret);
    if (!result.accepted) throw new Error(`Handshake refused with ${result.status}`);
    sockets.push(result.socket);
    return result;
  }

  afterEach(async () => {
    sockets.splice(0).forEach((socket) => socket.terminate());
    await listener?.disconnect();
    listener = undefined;
    revokeLaunchSecrets('extensionHost');
    revokeLaunchSecrets('dotnetDataProvider');
    vi.mocked(logger.info).mockClear();
  });

  it('serves a client that presents no secret as unidentified', async () => {
    const port = await bind();

    await accept(port);

    await vi.waitFor(() => expect(connectLogLines()).toHaveLength(1));
    expect(connectLogLines()[0]).toContain('as unidentified');
  });

  it('identifies the extension host by its secret and returns the server secret', async () => {
    const port = await bind();
    const secrets = issueLaunchSecrets('extensionHost');

    const { response } = await accept(port, secrets.clientSecret);

    expect(response.headers[SERVER_SECRET_HEADER]).toBe(secrets.serverSecret);
    await vi.waitFor(() => expect(connectLogLines()).toHaveLength(1));
    expect(connectLogLines()[0]).toContain('as extensionHost');
  });

  it('identifies the data provider by its secret', async () => {
    const port = await bind();
    issueLaunchSecrets('extensionHost');
    const secrets = issueLaunchSecrets('dotnetDataProvider');

    const { response } = await accept(port, secrets.clientSecret);

    expect(response.headers[SERVER_SECRET_HEADER]).toBe(secrets.serverSecret);
    await vi.waitFor(() => expect(connectLogLines()).toHaveLength(1));
    expect(connectLogLines()[0]).toContain('as dotnetDataProvider');
  });

  it('does not return the server secret to an unidentified client', async () => {
    const port = await bind();
    issueLaunchSecrets('extensionHost');

    const { response } = await accept(port);

    expect(response.headers[SERVER_SECRET_HEADER]).toBeUndefined();
  });

  it('rejects a wrong secret with 401', async () => {
    const port = await bind();
    const secrets = issueLaunchSecrets('extensionHost');

    await expect(handshake(port, secrets.serverSecret)).resolves.toEqual({
      accepted: false,
      status: 401,
    });
    expect(connectLogLines()).toHaveLength(0);
  });

  it('rejects an empty, oversized or repeated secret header with 401 and stays up', async () => {
    const port = await bind();
    const secrets = issueLaunchSecrets('extensionHost');

    await expect(handshake(port, '')).resolves.toMatchObject({ accepted: false, status: 401 });
    await expect(handshake(port, 'a'.repeat(4000))).resolves.toMatchObject({
      accepted: false,
      status: 401,
    });
    await expect(
      handshake(port, [secrets.clientSecret, secrets.clientSecret]),
    ).resolves.toMatchObject({ accepted: false, status: 401 });

    const { response } = await accept(port, secrets.clientSecret);
    expect(response.headers[SERVER_SECRET_HEADER]).toBe(secrets.serverSecret);
  });

  it('never logs a secret', async () => {
    const port = await bind();
    const secrets = issueLaunchSecrets('extensionHost');

    await handshake(port, 'wrong');
    await accept(port, secrets.clientSecret);
    await handshake(port, secrets.clientSecret);

    const logged = Object.values(logger)
      .flatMap((method) => vi.mocked(method).mock.calls)
      .flat()
      .map(String)
      .join('\n');
    expect(logged).toContain('extensionHost');
    expect(logged).not.toContain(secrets.clientSecret);
    expect(logged).not.toContain(secrets.serverSecret);
  });

  it('refuses a second connection with the same secret while the first is open (409)', async () => {
    const port = await bind();
    const secrets = issueLaunchSecrets('dotnetDataProvider');
    await accept(port, secrets.clientSecret);

    await expect(handshake(port, secrets.clientSecret)).resolves.toEqual({
      accepted: false,
      status: 409,
    });
  });

  it('accepts the same secret again after the first connection closes', async () => {
    const port = await bind();
    const secrets = issueLaunchSecrets('dotnetDataProvider');
    const { socket: first } = await accept(port, secrets.clientSecret);
    const firstClosed = closeOf(first);
    first.close();
    await firstClosed;

    await vi.waitFor(async () => {
      const retry = await handshake(port, secrets.clientSecret);
      if (retry.accepted) sockets.push(retry.socket);
      expect(retry.accepted).toBe(true);
    });
  });

  it('closes the previous launch when a new launch of the same identity connects', async () => {
    const port = await bind();
    const firstLaunch = issueLaunchSecrets('extensionHost');
    const { socket: previous } = await accept(port, firstLaunch.clientSecret);
    const previousClosed = closeOf(previous);
    const secondLaunch = issueLaunchSecrets('extensionHost');

    const { response } = await accept(port, secondLaunch.clientSecret);

    expect(response.headers[SERVER_SECRET_HEADER]).toBe(secondLaunch.serverSecret);
    await expect(previousClosed).resolves.toBeGreaterThan(0);
  });

  it('serves a local client as renderer', async () => {
    await bind();
    const renderer = createFakeWebSocket();

    listener?.acceptLocalClient(renderer.webSocket, 'renderer:w1');

    expect(connectLogLines()).toHaveLength(1);
    expect(connectLogLines()[0]).toContain('as renderer');
  });
});
