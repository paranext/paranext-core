// @vitest-environment node
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { MessageChannel, MessagePort as NodeMessagePort } from 'node:worker_threads';
import { RpcServer } from '@main/services/rpc-server';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';
import { MessagePortServerSocket } from '@main/services/message-port-server-socket';
import {
  MessagePortLike,
  MessagePortWebSocket,
  PapiPortProvider,
} from '@renderer/services/message-port-web-socket';
import { RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import { wrapNodePortAsMessagePortMain } from './message-port-main-shim.test.util';

const { logLines, socketHolder } = vi.hoisted(() => {
  const lines: { level: string; line: string }[] = [];
  return {
    logLines: lines,
    /** The client side needs `createWebSocket` to hand back our adapter */
    socketHolder: new Map<'client', unknown>(),
  };
});
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: (line: string) => logLines.push({ level: 'info', line }),
    warn: (line: string) => logLines.push({ level: 'warn', line }),
    debug: vi.fn(),
    error: (line: string) => logLines.push({ level: 'error', line }),
  },
}));
vi.mock('@client/services/web-socket.factory', () => ({
  createWebSocket: vi.fn(async () => socketHolder.get('client')),
}));

/** Hands a Node port over on the next tick, the way the bridge would */
function providerFor(port: NodeMessagePort): PapiPortProvider {
  // Node's port satisfies MessagePortLike at runtime; its EventTarget typing is wider than the
  // listener overloads MessagePortLike names, so TypeScript cannot see that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const portLike = port as unknown as MessagePortLike;
  return ({ onPort }) => {
    setTimeout(() => onPort(portLike, 'w1'), 0);
  };
}

async function connectedPair() {
  const { RpcClient } = await import('@client/services/rpc-client');
  const { port1, port2 } = new MessageChannel();
  const methods = new Map<string, RegisteredRpcMethodDetails>();
  const events = new RpcEventRegistry();
  const serverSocket = new MessagePortServerSocket(wrapNodePortAsMessagePortMain(port1));
  const server = new RpcServer(
    'renderer:w1',
    serverSocket,
    () => {},
    methods,
    events,
    () => {},
  );
  await server.connect();

  socketHolder.set(
    'client',
    new MessagePortWebSocket(providerFor(port2), { addPageHideListener: false }),
  );

  const client = new RpcClient('renderer');
  const connected = await client.connect(() => {});
  expect(connected).toBe(true);
  return { client, server, serverSocket, methods, port2 };
}

describe('RpcClient and RpcServer over one MessagePort channel', () => {
  beforeEach(() => {
    logLines.length = 0;
  });

  test('a method registered by the client is callable from the server', async () => {
    const { client, server } = await connectedPair();
    await client.registerMethod('command:test.echo', async (value: string) => `echo:${value}`);

    const response = await server.request('command:test.echo', ['hi']);

    expect(response).toMatchObject({ result: 'echo:hi' });
    await client.disconnect();
  });

  test('client.disconnect() reaches the server as an intentional, clean close', async () => {
    const { client } = await connectedPair();

    await client.disconnect();

    await vi.waitFor(() =>
      expect(
        logLines.some(
          (l) =>
            l.level === 'info' && l.line.includes('renderer:w1') && l.line.includes('code=4000'),
        ),
      ).toBe(true),
    );
    expect(logLines.some((l) => l.level === 'warn' && l.line.includes('renderer:w1'))).toBe(false);
  });

  test('the server closing its socket with 1001 is a clean close on the client, not a lost connection', async () => {
    const { client, serverSocket } = await connectedPair();
    const lost = vi.fn();
    client.onDidLoseConnection(lost);

    serverSocket.close(1001, 'window closing');

    await vi.waitFor(() =>
      expect(logLines.some((l) => l.level === 'info' && l.line.includes('code=1001'))).toBe(true),
    );
    expect(lost).not.toHaveBeenCalled();
  });

  test('the server end dying with no frame is a lost connection on the client', async () => {
    // Built by hand rather than through connectedPair so the raw main-side port is in scope: closing
    // port1 with no frame is what a dead main end looks like to the page
    const { RpcClient } = await import('@client/services/rpc-client');
    const { port1, port2 } = new MessageChannel();
    socketHolder.set(
      'client',
      new MessagePortWebSocket(providerFor(port2), { addPageHideListener: false }),
    );
    const client = new RpcClient('renderer');
    expect(await client.connect(() => {})).toBe(true);
    const lost = vi.fn();
    client.onDidLoseConnection(lost);

    port1.close();

    await vi.waitFor(() => expect(lost).toHaveBeenCalledTimes(1));
    expect(logLines.some((l) => l.level === 'warn' && l.line.includes('code=1006'))).toBe(true);
  });
});
