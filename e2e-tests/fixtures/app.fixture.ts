import {
  test as base,
  _electron as electron,
  ElectronApplication,
  Page,
  TestInfo,
  ConsoleMessage,
} from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';
import WebSocket from 'ws';

const WEBSOCKET_PORT = 8876;
const PROCESS_READY_TIMEOUT = 60_000;

/** Worker-scoped fixtures — one instance shared across all tests in a worker. */
export interface WorkerAppFixtures {
  electronApp: ElectronApplication;
}

/** Test-scoped fixtures — re-created for every test. */
export interface TestAppFixtures {
  mainPage: Page;
}

/** Union of all app fixtures (kept for downstream compatibility). */
export type AppFixtures = WorkerAppFixtures & TestAppFixtures;

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

export const test = base.extend<TestAppFixtures, WorkerAppFixtures>({
  // Worker-scoped: the Electron process is launched once per worker and shared
  // across all tests, avoiding the process startup/teardown cost per test.
  electronApp: [
    async ({}, use) => {
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

      // Register the close listener BEFORE yielding to tests. The 'close' event
      // fires once — if we registered it after use(), it could already be gone by
      // the time teardown runs (e.g. if the app exited during mainPage teardown).
      let appAlreadyClosed = false;
      const appClosed = new Promise<void>((resolve) =>
        electronApp.once('close', () => {
          appAlreadyClosed = true;
          resolve();
        }),
      );

      await use(electronApp);

      // Teardown: kill the OS process and wait for Playwright to passively detect
      // the disconnection via the 'close' event registered above. We deliberately
      // do NOT call electronApp.close() because it sends a CDP message and awaits
      // a response — if the connection is in any degraded state that ack never
      // arrives and the call hangs forever.
      console.log(`[teardown] Closing Electron app... appAlreadyClosed=${appAlreadyClosed}`);
      const electronProcess = electronApp.process();
      console.log(
        `[teardown] electronProcess pid=${electronProcess?.pid} exitCode=${electronProcess?.exitCode} signalCode=${electronProcess?.signalCode}`,
      );

      // On Linux, processLauncher.js spawns Electron with `detached: true`, making
      // Electron the leader of its own process group. Electron then forks the
      // extension host (and .NET data provider) WITHOUT detaching them, so they
      // inherit Electron's process group.  Playwright's readline interfaces read
      // Electron's stdout/stderr pipes; because the child processes inherit the
      // write-ends of those pipes (Linux doesn't guarantee FD_CLOEXEC on every
      // inherited fd), killing only the Electron PID leaves those write-ends open
      // forever, so readline never sees EOF, ChildProcess 'close' never fires, and
      // the worker hangs.  The fix is to kill the ENTIRE process group (-pid).
      const killGroup = (sig: NodeJS.Signals) => {
        if (!electronProcess?.pid) return;
        try {
          process.kill(-electronProcess.pid, sig);
        } catch {
          // Process group may already be gone — fall back to single-process kill
          try {
            electronProcess.kill(sig);
          } catch {
            /* already dead */
          }
        }
      };

      if (
        electronProcess &&
        electronProcess.exitCode === null &&
        electronProcess.signalCode === null
      ) {
        console.log('[teardown] Sending SIGKILL to process group...');
        killGroup('SIGKILL');
        // After SIGKILL the socket closes immediately; give a generous budget.
        console.log('[teardown] Waiting for appClosed after SIGKILL (up to 3s)...');
        await Promise.race([appClosed, new Promise<void>((r) => setTimeout(r, 3_000))]);
        console.log('[teardown] Done waiting after SIGKILL');
      }

      console.log('[teardown] Cleaning up user data dir...');

      // Clean up the isolated user-data directory. On some platforms file locks
      // may linger briefly after the process group is killed, so retry once.
      try {
        fs.rmSync(userDataDir, { recursive: true, force: true });
      } catch {
        console.warn('[teardown] First rmSync attempt failed — retrying in 3s...');
        await new Promise((r) => setTimeout(r, 3_000));
        try {
          fs.rmSync(userDataDir, { recursive: true, force: true });
        } catch (e) {
          console.warn(`[teardown] Could not remove ${userDataDir}: ${e}`);
        }
      }
      console.log('[teardown] Complete — worker will exit now');
    },
    { scope: 'worker' },
  ],

  mainPage: async ({ electronApp }, use, testInfo: TestInfo) => {
    const page = await electronApp.firstWindow();

    // The Page object is shared within a worker. Use named functions so listeners
    // can be removed after the test, preventing accumulation. Tests should NOT
    // attach their own page.on(...) handlers — use this fixture for all event
    // subscriptions so cleanup is centralized.
    console.log(`Window URL: ${page.url()}`);
    const onPageError = (err: Error) => console.error(`Page error: ${err.message}`);
    const onConsoleMsg = (msg: ConsoleMessage) => {
      if (msg.type() === 'error') console.error(`Console error: ${msg.text()}`);
    };
    page.on('pageerror', onPageError);
    page.on('console', onConsoleMsg);

    await page.waitForLoadState('domcontentloaded');

    // Wait for React to mount
    await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 });

    await use(page);

    // Remove listeners so they don't fire during subsequent tests or worker teardown
    page.off('pageerror', onPageError);
    page.off('console', onConsoleMsg);

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
