/**
 * @deprecated For CI smoke tests only. New feature E2E tests MUST use cdp.fixture.ts instead.
 *
 *   This fixture launches a fresh Electron instance via app.fixture and adds a PAPI WebSocket client.
 *   It is NOT suitable for agent-driven E2E tests because:
 *
 *   - It restarts the app (conflicts with the running dev instance on port 8876)
 *   - It exposes papiClient, which encourages bypassing visible UI interaction
 *
 *   For per-feature E2E tests, import from '../fixtures/cdp.fixture' and navigate via menu clicks.
 *   See e2e-tests/tests/smoke/cdp-example.spec.ts for the correct pattern.
 */
import WebSocket from 'ws';
import { JSONRPCClient } from 'json-rpc-2.0';
import { test as appTest, AppFixtures, WorkerAppFixtures } from './app.fixture';

export { expect } from '@playwright/test';

const WEBSOCKET_PORT = 8876;

export interface PapiClient {
  /** Send a command via PAPI and wait for response */
  sendCommand<T>(commandName: string, ...args: unknown[]): Promise<T>;
  /** Send a raw JSON-RPC request */
  request<T>(method: string, params?: unknown): Promise<T>;
  /** Close the WebSocket connection */
  close(): void;
}

/** All fixtures exposed by the papi fixture (union of worker + test scoped). */
export type PapiFixtures = AppFixtures & { papiClient: PapiClient };

export const test = appTest.extend<{ papiClient: PapiClient }, WorkerAppFixtures>({
  // electronApp is destructured to ensure the fixture dependency is established
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  papiClient: async ({ electronApp }, use) => {
    const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);

    await new Promise<void>((resolve, reject) => {
      ws.on('open', resolve);
      ws.on('error', reject);
    });

    // Create JSON-RPC client
    const jsonRpcClient = new JSONRPCClient((jsonRPCRequest) => {
      ws.send(JSON.stringify(jsonRPCRequest));
      return Promise.resolve();
    });

    ws.on('message', (data) => {
      try {
        const response = JSON.parse(data.toString());
        jsonRpcClient.receive(response);
      } catch (err) {
        console.error('Failed to parse PAPI response:', err);
      }
    });

    const papiClient: PapiClient = {
      async sendCommand<T>(commandName: string, ...args: unknown[]): Promise<T> {
        // PAPI commands are sent as "command:<commandName>"
        // json-rpc-2.0 returns PromiseLike<unknown>; caller provides T
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return jsonRpcClient.request(`command:${commandName}`, args) as Promise<T>;
      },
      async request<T>(method: string, params?: unknown): Promise<T> {
        // json-rpc-2.0 returns PromiseLike<unknown>; caller provides T
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return jsonRpcClient.request(method, params) as Promise<T>;
      },
      close() {
        ws.close();
      },
    };

    await use(papiClient);

    papiClient.close();
  },
});
