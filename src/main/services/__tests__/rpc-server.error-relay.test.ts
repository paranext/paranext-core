import { describe, expect, test, vi } from 'vitest';
import { deserialize } from 'platform-bible-utils';
import { RpcServer } from '@main/services/rpc-server';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';
import { RegisteredRpcMethodDetails } from '@shared/models/rpc.interface';
import { createFakeWebSocket } from './fake-web-socket-test.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const METHOD = 'command:test.busyMethod';

/** Waits until `payloads` holds at least `count` entries */
async function waitForPayloads(payloads: string[], count: number) {
  await vi.waitFor(() => expect(payloads.length).toBeGreaterThanOrEqual(count));
}

/**
 * Two clients connected to main, as the extension host and the .NET data provider are: the second
 * one handles {@link METHOD}, the first one asks for it.
 */
async function connectRequesterAndHandler() {
  const rpcMethodDetailsByMethodName = new Map<string, RegisteredRpcMethodDetails>();
  const eventRegistry = new RpcEventRegistry();
  const requesterSocket = createFakeWebSocket();
  const handlerSocket = createFakeWebSocket();
  const requester = new RpcServer(
    'requester',
    requesterSocket.webSocket,
    () => {},
    rpcMethodDetailsByMethodName,
    eventRegistry,
    () => {},
  );
  const handler = new RpcServer(
    'handler',
    handlerSocket.webSocket,
    () => {},
    rpcMethodDetailsByMethodName,
    eventRegistry,
    () => {},
  );
  await requester.connect();
  await handler.connect();
  rpcMethodDetailsByMethodName.set(METHOD, { handler });
  return { requesterSocket, handlerSocket };
}

/** Sends a request from the requester and answers it from the handler with `error` */
async function relayErrorResponse(error: unknown) {
  const { requesterSocket, handlerSocket } = await connectRequesterAndHandler();

  requesterSocket.receiveMessage({ jsonrpc: '2.0', id: 42, method: METHOD, params: [] });
  await waitForPayloads(handlerSocket.sentPayloads, 1);
  const forwarded = deserialize(handlerSocket.sentPayloads[0]);
  expect(forwarded.method).toBe(METHOD);

  handlerSocket.receiveMessage({ jsonrpc: '2.0', id: forwarded.id, error });
  await waitForPayloads(requesterSocket.sentPayloads, 1);
  return deserialize(requesterSocket.sentPayloads[0]);
}

describe('RpcServer relaying an error response between clients', () => {
  test("keeps the handler's error data, so a platform error code reaches the requester", async () => {
    const error = {
      code: -32000,
      message: 'A sync is already in progress',
      data: {
        type: 'System.InvalidOperationException',
        message: 'A sync is already in progress',
        stack: '   at Somewhere()',
        code: -2146233079,
        data: { platformErrorCode: 'FAILED_PRECONDITION' },
      },
    };

    const relayed = await relayErrorResponse(error);

    expect(relayed).toEqual({ jsonrpc: '2.0', id: 42, error });
  });

  test('relays an error without data unchanged', async () => {
    const error = { code: -32000, message: 'Plain failure' };

    const relayed = await relayErrorResponse(error);

    expect(relayed).toEqual({ jsonrpc: '2.0', id: 42, error });
  });
});
