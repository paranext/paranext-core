import { describe, expect, test, vi, beforeEach } from 'vitest';
import { RpcWebSocketListener } from '@main/services/rpc-websocket-listener';
import { REGISTER_METHOD } from '@shared/data/rpc.model';
import { createFakeWebSocket } from './fake-web-socket-test.util';
import type { FakeWebSocketServer } from './fake-web-socket-test.util';

const { mockLoggerInfo, mockLoggerWarn } = vi.hoisted(() => ({
  mockLoggerInfo: vi.fn(),
  mockLoggerWarn: vi.fn(),
}));
const servers = vi.hoisted<FakeWebSocketServer[]>(() => []);

vi.mock('electron', () => ({ app: { getVersion: () => '0.0.0' } }));
vi.mock('ws', async () => {
  const { createFakeWebSocketServer } = await import('./fake-web-socket-test.util');
  return {
    WebSocketServer: vi.fn(() => {
      const server = createFakeWebSocketServer(true);
      servers.push(server);
      return server;
    }),
  };
});
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: mockLoggerWarn, info: mockLoggerInfo, debug: vi.fn(), error: vi.fn() },
}));

async function connectedListener(): Promise<RpcWebSocketListener> {
  const listener = new RpcWebSocketListener();
  expect(await listener.connect(() => {})).toBe(true);
  return listener;
}

describe('RpcWebSocketListener.acceptLocalClient', () => {
  beforeEach(() => {
    mockLoggerInfo.mockClear();
    mockLoggerWarn.mockClear();
  });

  test('serves a caller-supplied socket under the caller-supplied name', async () => {
    const listener = await connectedListener();
    const fake = createFakeWebSocket();

    listener.acceptLocalClient(fake.webSocket, 'renderer:w1');

    expect(mockLoggerInfo).toHaveBeenCalledWith(
      expect.stringContaining('PAPI client renderer:w1 connected'),
    );
    // The socket is wired to an RpcServer: a REGISTER_METHOD request over it is answered.
    fake.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: REGISTER_METHOD,
      params: ['command:test.local', undefined],
    });
    await vi.waitFor(() => expect(fake.sentPayloads.length).toBeGreaterThan(0));
    expect(fake.sentPayloads[0]).toContain('"id":1');
  });

  test('tears the client down on close exactly as a websocket client, keyed by the close target', async () => {
    const listener = await connectedListener();
    const fake = createFakeWebSocket();
    listener.acceptLocalClient(fake.webSocket, 'renderer:w1');

    fake.close();

    expect(mockLoggerWarn).not.toHaveBeenCalledWith(
      'Close called on a websocket, but no rpc server handler was found for it',
    );
    expect(mockLoggerInfo).toHaveBeenCalledWith(
      expect.stringContaining('Websocket renderer:w1 closed. Removed 0 methods'),
    );
  });

  test('refuses a client while the listener is not connected, so the caller can report it', () => {
    const listener = new RpcWebSocketListener();
    const fake = createFakeWebSocket();

    expect(() => listener.acceptLocalClient(fake.webSocket, 'renderer:w1')).toThrow(
      /not accepting clients/,
    );
  });
});

describe('a WebSocket client handed over without its handshake request', () => {
  test('is served as unidentified and refused a restricted request type', async () => {
    servers.length = 0;
    const listener = await connectedListener();
    const readLog = vi.fn(() => 'log');
    await listener.registerMethod('command:platform.getLogFileContent', readLog);
    const onConnection = servers[0]?.getHandler('connection');
    if (!onConnection) throw new Error('Main never started listening for connections');
    const client = createFakeWebSocket();

    onConnection(client.webSocket);
    client.receiveMessage({
      jsonrpc: '2.0',
      id: 1,
      method: 'command:platform.getLogFileContent',
      params: [],
    });

    await vi.waitFor(() => expect(client.sentPayloads).toHaveLength(1));
    expect(client.sentPayloads[0]).toContain('not available');
    expect(readLog).not.toHaveBeenCalled();
    expect(mockLoggerInfo).toHaveBeenCalledWith(expect.stringContaining('as unidentified'));
  });

  test('is refused a handler main restricted with allowedCallers', async () => {
    servers.length = 0;
    const listener = await connectedListener();
    const handle = vi.fn(() => 'handled');
    await listener.registerMethod('command:test.restricted', handle, undefined, {
      allowedCallers: ['extensionHost'],
    });
    const onConnection = servers[0]?.getHandler('connection');
    if (!onConnection) throw new Error('Main never started listening for connections');
    const client = createFakeWebSocket();

    onConnection(client.webSocket);
    client.receiveMessage({ jsonrpc: '2.0', id: 1, method: 'command:test.restricted', params: [] });

    await vi.waitFor(() => expect(client.sentPayloads).toHaveLength(1));
    expect(client.sentPayloads[0]).toContain('not available');
    expect(handle).not.toHaveBeenCalled();
  });
});
