import {
  test as base,
  _electron as electron,
  ElectronApplication,
  Page,
  TestInfo,
} from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';
import WebSocket from 'ws';
import { sendPapiCommand, waitForPapiReady } from './helpers';

const WEBSOCKET_PORT = 8876;
const PROCESS_READY_TIMEOUT = 60_000;
const CLOSE_TIMEOUT = 15_000;

export interface AppFixtures {
  electronApp: ElectronApplication;
  mainPage: Page;
}

/** Wait for the WebSocket server to be ready on the specified port. */
async function waitForWebSocketReady(port: number, timeout: number): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      await new Promise<void>((resolve, reject) => {
        const ws = new WebSocket(`ws://localhost:${port}`);
        const timer = setTimeout(() => {
          ws.close();
          reject(new Error('Connection timeout'));
        }, 2000);

        ws.on('open', () => {
          clearTimeout(timer);
          ws.close();
          resolve();
        });
        ws.on('error', (err) => {
          clearTimeout(timer);
          reject(err);
        });
      });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`WebSocket server not ready on port ${port} after ${timeout}ms`);
}

export const test = base.extend<AppFixtures>({
  electronApp: async ({}, use) => {
    const rootDir = path.resolve(__dirname, '../..');

    console.log(`Launching Electron app from project root: ${rootDir}`);

    // VSCode/Claude Code set ELECTRON_RUN_AS_NODE=1 which forces the Electron
    // binary to run as plain Node.js. We must remove it.
    // NODE_ENV=development so the renderer loads from the webpack dev server
    // (started automatically by global-setup).
    const env: Record<string, string> = {
      ...process.env,
      NODE_ENV: 'development',
    } as Record<string, string>;
    delete env.ELECTRON_RUN_AS_NODE;

    // Use an isolated user-data directory so the singleton instance lock does not
    // conflict with any already-running Platform.Bible instance.
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-e2e-'));

    let electronApp: ElectronApplication;
    try {
      electronApp = await electron.launch({
        args: [`--user-data-dir=${userDataDir}`, rootDir],
        cwd: rootDir,
        env,
        timeout: PROCESS_READY_TIMEOUT,
      });
    } catch (error) {
      console.error('Failed to launch Electron:', error);
      throw error;
    }

    // Wait for WebSocket server to be ready (port 8876)
    console.log('Waiting for WebSocket server on port 8876...');
    await waitForWebSocketReady(WEBSOCKET_PORT, PROCESS_READY_TIMEOUT);
    console.log('WebSocket server is ready');

    // Wait for PAPI commands to be registered (extension host initialization)
    console.log('Waiting for PAPI commands to be ready...');
    await waitForPapiReady(PROCESS_READY_TIMEOUT, WEBSOCKET_PORT);
    console.log('PAPI commands are ready');

    await use(electronApp);

    // Graceful shutdown: ask the platform to quit via PAPI, then close Electron
    console.log('Sending platform.quit command...');
    try {
      await sendPapiCommand('platform.quit');
      // Give the platform a moment to begin its shutdown sequence
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      console.warn('platform.quit failed (app may already be closing):', err);
    }

    console.log('Closing Electron app...');
    let closedCleanly = false;
    const closeTimeout = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn(`electronApp.close() timed out after ${CLOSE_TIMEOUT}ms, force killing`);
        resolve();
      }, CLOSE_TIMEOUT);
    });
    await Promise.race([
      electronApp.close().then(() => {
        closedCleanly = true;
      }),
      closeTimeout,
    ]);

    // Force kill if graceful close timed out
    if (!closedCleanly) {
      try {
        const proc = electronApp.process();
        if (proc.pid) {
          process.kill(proc.pid, 'SIGKILL');
          console.log(`Sent SIGKILL to Electron process ${proc.pid}`);
        }
      } catch {
        // Process may already be dead
      }
    }

    // Clean up the isolated user-data directory
    fs.rmSync(userDataDir, { recursive: true, force: true });
  },

  mainPage: async ({ electronApp }, use, testInfo: TestInfo) => {
    const page = await electronApp.firstWindow();

    // Debug: log the URL and any page errors
    console.log(`Window URL: ${page.url()}`);
    page.on('pageerror', (err) => console.error(`Page error: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error(`Console error: ${msg.text()}`);
    });

    await page.waitForLoadState('domcontentloaded');

    // Wait for React to mount
    await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 });

    await use(page);

    // Capture a screenshot on failure and attach it to the test report
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = testInfo.outputPath('failure.png');
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await testInfo.attach('failure-screenshot', {
          path: screenshotPath,
          contentType: 'image/png',
        });
        console.log(`Failure screenshot saved to ${screenshotPath}`);
      } catch {
        console.warn('Could not capture failure screenshot (window may already be closed)');
      }
    }
  },
});

export { expect } from '@playwright/test';
