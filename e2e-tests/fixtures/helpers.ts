import { Page } from '@playwright/test';
import WebSocket from 'ws';

const DEFAULT_WEBSOCKET_PORT = 8876;

/**
 * Send a JSON-RPC request over WebSocket to the PAPI server. Opens a connection, sends the request,
 * waits for response, then closes.
 */
export async function sendPapiCommand<T = unknown>(
  command: string,
  args: unknown[] = [],
  port: number = DEFAULT_WEBSOCKET_PORT,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(`PAPI command "${command}" timed out after 10s`));
    }, 10_000);

    ws.on('open', () => {
      const request = {
        jsonrpc: '2.0',
        id: 1,
        method: `command:${command}`,
        params: args,
      };
      ws.send(JSON.stringify(request));
    });

    ws.on('message', (data) => {
      clearTimeout(timeout);
      try {
        const response = JSON.parse(data.toString());
        if (response.error) {
          reject(new Error(`PAPI error: ${JSON.stringify(response.error)}`));
        } else {
          resolve(response.result as T);
        }
      } catch (err) {
        reject(err);
      } finally {
        ws.close();
      }
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Wait for the Platform.Bible UI to be fully ready beyond just React mounting. Waits for the
 * platform-dock layout to appear, indicating extensions have loaded.
 */
export async function waitForAppReady(page: Page, timeout = 60_000): Promise<void> {
  // Wait for the dock layout which indicates the full UI has rendered
  await page.waitForSelector('div[class*="dock-layout"]', {
    state: 'attached',
    timeout,
  });
}
