import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { RpcServer } from '@main/services/rpc-server';
import { RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import { REGISTER_METHOD } from '@shared/data/rpc.model';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';
import { createFakeWebSocket } from './fake-web-socket-test.util';
import type { FakeWebSocketServer } from './fake-web-socket-test.util';

// Mock heavy dependencies so this test can run outside the Electron main process.
vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
const servers = vi.hoisted<FakeWebSocketServer[]>(() => []);
// connect() waits for the server's `listening` event before reporting success, so the fake has to
// finish the handshake or connect() would never resolve.
vi.mock('ws', async () => {
  const { createFakeWebSocketServer } = await import('./fake-web-socket-test.util');
  return {
    WebSocketServer: vi.fn(() => {
      const server = createFakeWebSocketServer();
      servers.push(server);
      return server;
    }),
  };
});
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

describe('RpcServer announces the methods that died with its client', () => {
  let rpcMethodDetailsByMethodName: Map<string, RegisteredRpcMethodDetails>;
  let announcedMethodNames: string[][];
  let socket: ReturnType<typeof createFakeWebSocket>;
  let rpcServer: RpcServer;

  beforeEach(async () => {
    rpcMethodDetailsByMethodName = new Map();
    announcedMethodNames = [];
    socket = createFakeWebSocket();
    rpcServer = new RpcServer(
      'test-client',
      socket.webSocket,
      () => {},
      rpcMethodDetailsByMethodName,
      new RpcEventRegistry(),
      (removedMethodNames) => announcedMethodNames.push(removedMethodNames),
    );
    await rpcServer.connect();
  });

  it('announces exactly the methods of the client that died, not the whole registry', () => {
    rpcServer.registerRemoteMethod('object:DyingObject');
    rpcServer.registerRemoteMethod('object:DyingObject.doThing');
    // Another process's method, sharing the registry the dying client's methods live in
    const otherHandler = { name: 'someone-else' };
    // The registry stores any IRpcHandler; this stand-in only has to be a distinct identity.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    rpcMethodDetailsByMethodName.set('object:SurvivingObject', {
      handler: otherHandler,
    } as unknown as RegisteredRpcMethodDetails);

    socket.close();

    expect(announcedMethodNames).toEqual([['object:DyingObject', 'object:DyingObject.doThing']]);
    // The surviving process's method is untouched
    expect(rpcMethodDetailsByMethodName.has('object:SurvivingObject')).toBe(true);
  });

  it('announces an empty list when the client had registered nothing', () => {
    socket.close();

    expect(announcedMethodNames).toEqual([[]]);
  });
});

describe('the websocket listener exposes client disconnects to shared code', () => {
  it('fires onDidDisconnectClient with the method names a closing client took with it', async () => {
    const listener = new RpcWebSocketListener();
    await listener.connect(vi.fn());

    const disconnects: string[][] = [];
    listener.onDidDisconnectClient(({ removedMethodNames }) =>
      disconnects.push(removedMethodNames),
    );

    // Hand the listener a connecting client the same way the WebSocketServer would
    const connectionListener = servers[0]?.getHandler('connection');
    if (!connectionListener) throw new Error('Main never started listening for connections');
    const socket = createFakeWebSocket();
    connectionListener(socket.webSocket);

    // The client registers a network object over the wire, as a renderer's network object service does
    socket.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: ['object:ObjectInTheClient'],
    });
    await vi.waitFor(() => expect(socket.sentPayloads.length).toBeGreaterThan(0));

    socket.close();

    expect(disconnects).toEqual([['object:ObjectInTheClient']]);
  });
});
