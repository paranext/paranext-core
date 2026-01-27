import { test as appTest, AppFixtures } from './app.fixture';
import WebSocket from 'ws';
import { JSONRPCClient } from 'json-rpc-2.0';

const WEBSOCKET_PORT = 8876;

export interface PapiClient {
  /** Send a command via PAPI and wait for response */
  sendCommand<T>(commandName: string, ...args: unknown[]): Promise<T>;
  /** Send a raw JSON-RPC request */
  request<T>(method: string, params?: unknown): Promise<T>;
  /** Close the WebSocket connection */
  close(): void;
}

export interface PapiFixtures extends AppFixtures {
  papiClient: PapiClient;
}

export const test = appTest.extend<PapiFixtures>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  papiClient: async ({ electronApp }, use) => {
    const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);

    await new Promise<void>((resolve, reject) => {
      ws.on('open', resolve);
      ws.on('error', reject);
    });

    // Create JSON-RPC client
    const pendingRequests = new Map<
      number,
      { resolve: (value: unknown) => void; reject: (error: Error) => void }
    >();
    let requestId = 0;

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
        return jsonRpcClient.request(`command:${commandName}`, args) as Promise<T>;
      },
      async request<T>(method: string, params?: unknown): Promise<T> {
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

export { expect } from '@playwright/test';
