/**
 * === NEW IN PT10 === Reason: Standalone PAPI WebSocket fixture for command verification tests
 * against an already-running Platform.Bible instance.
 *
 * Named "papi-live" to distinguish from the deprecated `papi.fixture.ts`:
 *
 * - `papi.fixture` launches its own Electron via app.fixture (port 8876 conflict with dev instance)
 * - `papi-live.fixture` connects to an ALREADY-RUNNING instance (no app launch, no conflict)
 *
 * Use this fixture for:
 *
 * - Command verification tests (porting workflow runtime verification)
 * - Any test that needs to call PAPI commands against the running dev instance
 *
 * Prerequisite: Platform.Bible running (WebSocket server on port 8876). Tests using this fixture
 * should include a skip guard via {@link canConnectToPapi} so they gracefully skip in CI or when the
 * app isn't running.
 */
import WebSocket from 'ws';
import {
  JSONRPCClient,
  type JSONRPCRequest,
  type JSONRPCResponse,
  createJSONRPCRequest,
} from 'json-rpc-2.0';
import { test as base } from '@playwright/test';

export { expect } from '@playwright/test';

const WEBSOCKET_PORT = 8876;
const CONNECT_TIMEOUT_MS = 2_000;
const CONNECT_RETRIES = 3;
const CONNECT_RETRY_DELAY_MS = 2_000;

/** Client interface for PAPI command verification tests. */
export interface PapiLiveClient {
  /** Send a PAPI command and return the result. Throws on JSON-RPC errors. */
  sendCommand<T>(commandName: string, ...args: unknown[]): Promise<T>;
  /**
   * Send a PAPI command and return the raw JSON-RPC response (including any error). Use this when
   * you need to inspect error codes rather than just catching exceptions.
   */
  sendCommandRaw(commandName: string, ...args: unknown[]): Promise<JSONRPCResponse>;
  /** Send a raw JSON-RPC request. Throws on JSON-RPC errors. */
  request<T>(method: string, params?: unknown): Promise<T>;
  /** Send a raw JSON-RPC request and return the full JSON-RPC response object. */
  requestRaw(method: string, params?: unknown): Promise<JSONRPCResponse>;
  /** Close the WebSocket connection. Called automatically during fixture teardown. */
  close(): void;
}

/** All fixtures exposed by the papi-live fixture. */
export interface PapiLiveFixtures {
  papiLive: PapiLiveClient;
}

/**
 * Check whether the PAPI WebSocket server is reachable. Use this in `test.beforeAll` to skip tests
 * gracefully when the app isn't running:
 *
 * @example
 *
 * ```ts
 * import { canConnectToPapi } from '../../fixtures/papi-live.fixture';
 *
 * test.beforeAll(async () => {
 *   test.skip(!(await canConnectToPapi()), 'PAPI server not running');
 * });
 * ```
 */
export async function canConnectToPapi(
  port: number = WEBSOCKET_PORT,
  timeout: number = CONNECT_TIMEOUT_MS,
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const ws = new WebSocket(`ws://localhost:${port}`);
    const timer = setTimeout(() => {
      ws.close();
      resolve(false);
    }, timeout);

    ws.on('open', () => {
      clearTimeout(timer);
      ws.close();
      resolve(true);
    });
    ws.on('error', () => {
      clearTimeout(timer);
      ws.close();
      resolve(false);
    });
  });
}

/** Connect a WebSocket to the PAPI server with retry logic. Throws after all retries are exhausted. */
async function connectWebSocket(): Promise<WebSocket> {
  for (let attempt = 1; attempt <= CONNECT_RETRIES; attempt++) {
    try {
      // eslint-disable-next-line no-await-in-loop -- intentional retry loop
      const ws = await new Promise<WebSocket>((resolve, reject) => {
        const socket = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
        const timer = setTimeout(() => {
          socket.close();
          reject(new Error('WebSocket connection timeout'));
        }, CONNECT_TIMEOUT_MS);

        socket.on('open', () => {
          clearTimeout(timer);
          resolve(socket);
        });
        socket.on('error', (err) => {
          clearTimeout(timer);
          socket.close();
          reject(err);
        });
      });
      return ws;
    } catch (err) {
      if (attempt === CONNECT_RETRIES) {
        throw new Error(
          `Failed to connect to PAPI WebSocket (ws://localhost:${WEBSOCKET_PORT}) after ${CONNECT_RETRIES} attempts. ` +
            `Is Platform.Bible running? Start it with: ./refresh.sh`,
        );
      }
      console.log(
        `PAPI WebSocket connection attempt ${attempt}/${CONNECT_RETRIES} failed, retrying in ${CONNECT_RETRY_DELAY_MS}ms...`,
      );
      // eslint-disable-next-line no-await-in-loop -- intentional retry delay
      await new Promise<void>((resolve) => {
        setTimeout(resolve, CONNECT_RETRY_DELAY_MS);
      });
    }
  }
  // Unreachable, but TypeScript needs it
  throw new Error('Unexpected: exhausted retries without throwing');
}

export const test = base.extend<PapiLiveFixtures>({
  // Playwright fixtures require destructured parameter even when no dependencies are needed
  // eslint-disable-next-line no-empty-pattern
  papiLive: async ({}, use) => {
    const ws = await connectWebSocket();
    let nextRequestId = 1;

    // Track connection state for clear error messages on mid-test disconnection
    let connected = true;
    ws.on('close', () => {
      connected = false;
    });
    ws.on('error', (err) => {
      console.error('PAPI WebSocket error:', err);
      connected = false;
    });

    // Create JSON-RPC client with the WebSocket transport.
    // Timeout is applied per-request via jsonRpcClient.timeout() rather than globally.
    const jsonRpcClient = new JSONRPCClient((jsonRPCRequest) => {
      if (!connected) {
        return Promise.reject(
          new Error(
            'PAPI connection lost — the .NET data provider may have crashed. Check c-sharp logs.',
          ),
        );
      }
      ws.send(JSON.stringify(jsonRPCRequest));
      return Promise.resolve();
    });

    // Route incoming messages to the JSON-RPC client
    ws.on('message', (data) => {
      try {
        const response = JSON.parse(data.toString());
        jsonRpcClient.receive(response);
      } catch (err) {
        console.error('Failed to parse PAPI response:', err);
      }
    });

    /** Build a JSONRPCRequest and send it via requestAdvanced for raw response access. */
    async function sendRaw(method: string, params?: unknown): Promise<JSONRPCResponse> {
      if (!connected) {
        throw new Error(
          'PAPI connection lost — the .NET data provider may have crashed. Check c-sharp logs.',
        );
      }
      const id = nextRequestId;
      nextRequestId += 1;
      // createJSONRPCRequest expects JSONRPCParams (object | array); cast is safe because
      // our callers always pass arrays (command args) or objects (rpc.discover params)
      const rpcParams: Record<string, unknown> | unknown[] | undefined =
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        params as Record<string, unknown> | unknown[] | undefined;
      const request: JSONRPCRequest = createJSONRPCRequest(id, method, rpcParams);
      return jsonRpcClient.requestAdvanced(request);
    }

    const papiLive: PapiLiveClient = {
      async sendCommand<T>(commandName: string, ...args: unknown[]): Promise<T> {
        // json-rpc-2.0 returns PromiseLike<unknown>; caller provides T
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return jsonRpcClient.request(`command:${commandName}`, args) as Promise<T>;
      },

      async sendCommandRaw(commandName: string, ...args: unknown[]): Promise<JSONRPCResponse> {
        return sendRaw(`command:${commandName}`, args);
      },

      async request<T>(method: string, params?: unknown): Promise<T> {
        // json-rpc-2.0 returns PromiseLike<unknown>; caller provides T
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return jsonRpcClient.request(method, params) as Promise<T>;
      },

      async requestRaw(method: string, params?: unknown): Promise<JSONRPCResponse> {
        return sendRaw(method, params);
      },

      close() {
        ws.close();
      },
    };

    await use(papiLive);

    // Fixture teardown: close the WebSocket cleanly
    try {
      ws.close();
    } catch {
      // Ignore close errors during cleanup — connection may already be gone
    }
  },
});
