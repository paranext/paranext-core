import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deserialize } from 'platform-bible-utils';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import { RpcServer } from '@main/services/rpc-server';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { createSuccessResponse, REGISTER_METHOD } from '@shared/data/rpc.model';
import { IRpcHandler, RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import type { ConnectionIdentity } from '@shared/data/request-access.data';
import { logger } from '@shared/services/logger.service';
import { createFakeWebSocket } from './fake-web-socket-test.util';

vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

type RemoteIdentity = Exclude<ConnectionIdentity, 'main'>;

const REMOTE_IDENTITIES: RemoteIdentity[] = [
  'renderer',
  'extensionHost',
  'dotnetDataProvider',
  'unidentified',
];

/** Every row of the access table with the callers and registrant it names, written out by hand */
const TABLE: { requestType: string; callers: RemoteIdentity[]; registrant: ConnectionIdentity }[] =
  [
    {
      requestType: 'requestRegistryTokens:getAccessToken',
      callers: ['extensionHost'],
      registrant: 'dotnetDataProvider',
    },
    {
      requestType:
        'object:paratextRegistration.internetSettingsDataProvider-data.setInternetSettings',
      callers: ['renderer', 'extensionHost'],
      registrant: 'dotnetDataProvider',
    },
    {
      requestType: 'command:paratextRegistration.setParatextDataInternetSettings',
      callers: ['renderer', 'extensionHost'],
      registrant: 'dotnetDataProvider',
    },
    {
      requestType: 'command:paratextRegistration.setParatextRegistrationData',
      callers: ['renderer', 'extensionHost'],
      registrant: 'dotnetDataProvider',
    },
    {
      requestType: 'command:paratextRegistration.resetForFirstRun',
      callers: [],
      registrant: 'dotnetDataProvider',
    },
    { requestType: 'command:platform.resetFirstRun', callers: ['renderer'], registrant: 'main' },
    {
      requestType: 'object:DataProtectionService.encryptString',
      callers: ['extensionHost'],
      registrant: 'main',
    },
    {
      requestType: 'object:DataProtectionService.decryptString',
      callers: ['extensionHost'],
      registrant: 'main',
    },
    {
      requestType: 'command:platform.getLogFileContent',
      callers: ['renderer'],
      registrant: 'main',
    },
  ];

const OPEN_REQUEST_TYPE = 'command:test.open';

const CALL_CASES = TABLE.flatMap(({ requestType, callers }) =>
  REMOTE_IDENTITIES.map((caller) => ({ requestType, caller, isAllowed: callers.includes(caller) })),
);

const REGISTRATION_CASES = TABLE.flatMap(({ requestType, registrant }) =>
  REMOTE_IDENTITIES.map((identity) => ({
    requestType,
    identity,
    isAllowed: identity === registrant,
  })),
);

/** A connected process main routes requests to, answering every request with `'handled'` */
function createHandler() {
  const handler: IRpcHandler & { request: ReturnType<typeof vi.fn> } = {
    connectionStatus: 0,
    connect: async () => true,
    disconnect: async () => {},
    emitEventOnNetwork: () => {},
    request: vi.fn(async () => createSuccessResponse('handled')),
  };
  return handler;
}

/** Main's shared registries, with a stand-in handler registered for every table row */
function createNetwork() {
  const rpcMethodDetailsByMethodName = new Map<string, RegisteredRpcMethodDetails>();
  const eventRegistry = new RpcEventRegistry();
  const handler = createHandler();
  [...TABLE.map(({ requestType }) => requestType), OPEN_REQUEST_TYPE].forEach((requestType) =>
    rpcMethodDetailsByMethodName.set(requestType, { handler }),
  );
  const propagateEvent = vi.fn();

  async function connectClient(identity: RemoteIdentity) {
    const socket = createFakeWebSocket();
    const rpcServer = new RpcServer(
      `client-${identity}`,
      socket.webSocket,
      propagateEvent,
      rpcMethodDetailsByMethodName,
      eventRegistry,
      () => {},
      identity,
    );
    await rpcServer.connect();
    return { socket, rpcServer };
  }

  return { rpcMethodDetailsByMethodName, handler, propagateEvent, connectClient };
}

async function nextReply(socket: ReturnType<typeof createFakeWebSocket>, count = 1) {
  await vi.waitFor(() => expect(socket.sentPayloads.length).toBeGreaterThanOrEqual(count));
  return deserialize(socket.sentPayloads[count - 1]);
}

describe('RpcServer enforcing the request access table', () => {
  beforeEach(() => {
    vi.mocked(logger.warn).mockClear();
  });

  it.each(CALL_CASES.filter(({ isAllowed }) => isAllowed))(
    'routes $requestType from $caller',
    async ({ requestType, caller }) => {
      const { handler, connectClient } = createNetwork();
      const { socket } = await connectClient(caller);

      socket.receiveMessage({ jsonrpc: '2.0', id: 7, method: requestType, params: [] });
      const reply = await nextReply(socket);

      expect(reply.result).toBe('handled');
      expect(handler.request).toHaveBeenCalledTimes(1);
    },
  );

  it.each(CALL_CASES.filter(({ isAllowed }) => !isAllowed))(
    'refuses $requestType from $caller',
    async ({ requestType, caller }) => {
      const { handler, connectClient } = createNetwork();
      const { socket } = await connectClient(caller);

      socket.receiveMessage({ jsonrpc: '2.0', id: 7, method: requestType, params: [] });
      const reply = await nextReply(socket);

      expect(reply.error).toEqual({
        code: JSONRPCErrorCode.MethodNotFound,
        message: `'${requestType}' is not available on this connection`,
      });
      expect(reply.id).toBe(7);
      expect(handler.request).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining(caller));
    },
  );

  it('refuses a restricted type sent as a notification and does not propagate it', async () => {
    const { propagateEvent, connectClient } = createNetwork();
    const { socket } = await connectClient('unidentified');

    socket.receiveMessage({ jsonrpc: '2.0', method: 'command:platform.getLogFileContent' });
    socket.receiveMessage({ jsonrpc: '2.0', method: 'test:anEvent', params: [{}] });
    socket.receiveMessage({ jsonrpc: '2.0', id: 1, method: OPEN_REQUEST_TYPE, params: [] });
    await nextReply(socket);

    expect(propagateEvent).toHaveBeenCalledTimes(1);
    expect(propagateEvent).toHaveBeenCalledWith(expect.anything(), 'test:anEvent', [{}]);
    expect(socket.sentPayloads).toHaveLength(1);
  });

  it('checks every request in a batch separately', async () => {
    const { handler, connectClient } = createNetwork();
    const { socket } = await connectClient('unidentified');

    socket.receiveMessage([
      { jsonrpc: '2.0', id: 1, method: OPEN_REQUEST_TYPE, params: [] },
      { jsonrpc: '2.0', id: 2, method: 'requestRegistryTokens:getAccessToken', params: [] },
    ]);
    await nextReply(socket, 2);

    const replies = socket.sentPayloads.map((payload) => deserialize(payload));
    expect(replies.find((reply) => reply.id === 1)?.result).toBe('handled');
    expect(replies.find((reply) => reply.id === 2)?.error?.code).toBe(
      JSONRPCErrorCode.MethodNotFound,
    );
    expect(handler.request).toHaveBeenCalledTimes(1);
  });

  it('still serves unrestricted request types to an unidentified client', async () => {
    const { connectClient } = createNetwork();
    const { socket } = await connectClient('unidentified');

    socket.receiveMessage({ jsonrpc: '2.0', id: 3, method: OPEN_REQUEST_TYPE, params: [] });

    expect((await nextReply(socket)).result).toBe('handled');
  });
});

describe('RpcServer enforcing who registers a restricted request type', () => {
  it.each(REGISTRATION_CASES)(
    'answers registering $requestType from $identity: allowed $isAllowed',
    async ({ requestType, identity, isAllowed }) => {
      const { rpcMethodDetailsByMethodName, handler, connectClient } = createNetwork();
      rpcMethodDetailsByMethodName.delete(requestType);
      const { socket, rpcServer } = await connectClient(identity);

      socket.receiveMessage({
        jsonrpc: '2.0',
        id: 1,
        method: REGISTER_METHOD,
        params: [requestType],
      });
      const reply = await nextReply(socket);

      expect(reply.result).toBe(isAllowed);
      expect(rpcMethodDetailsByMethodName.get(requestType)?.handler).toBe(
        isAllowed ? rpcServer : undefined,
      );
      expect(handler.request).not.toHaveBeenCalled();
    },
  );

  it('lets the registrant re-register after it disconnects, and no one else', async () => {
    const tokens = 'requestRegistryTokens:getAccessToken';
    const { rpcMethodDetailsByMethodName, connectClient } = createNetwork();
    rpcMethodDetailsByMethodName.delete(tokens);
    const first = await connectClient('dotnetDataProvider');
    first.socket.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: [tokens],
    });
    expect((await nextReply(first.socket)).result).toBe(true);

    first.socket.close();
    expect(rpcMethodDetailsByMethodName.has(tokens)).toBe(false);
    const squatter = await connectClient('unidentified');
    squatter.socket.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: [tokens],
    });
    expect((await nextReply(squatter.socket)).result).toBe(false);
    const restarted = await connectClient('dotnetDataProvider');
    restarted.socket.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: [tokens],
    });

    expect((await nextReply(restarted.socket)).result).toBe(true);
    expect(rpcMethodDetailsByMethodName.get(tokens)?.handler).toBe(restarted.rpcServer);
  });

  it('still lets an unidentified client register an unrestricted request type', async () => {
    const { connectClient } = createNetwork();
    const { socket } = await connectClient('unidentified');

    socket.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: ['command:test.newOne'],
    });

    expect((await nextReply(socket)).result).toBe(true);
  });
});

describe('main registering a restricted request type', () => {
  it('refuses main registering a row it does not own', async () => {
    const listener = new RpcWebSocketListener();

    await expect(
      listener.registerMethod('requestRegistryTokens:getAccessToken', () => 'token'),
    ).resolves.toBe(false);
  });

  it('lets main register a row it owns', async () => {
    const listener = new RpcWebSocketListener();

    await expect(
      listener.registerMethod('command:platform.getLogFileContent', () => 'log'),
    ).resolves.toBe(true);
  });
});
