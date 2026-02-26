import { _electron as electron, ElectronApplication, Page } from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';
import WebSocket from 'ws';

const DEFAULT_WEBSOCKET_PORT = 8876;
const PROCESS_READY_TIMEOUT = 60_000;

/** Return value from {@link launchElectronApp}. */
export interface ElectronAppContext {
  electronApp: ElectronApplication;
  userDataDir: string;
  /** Resolves when the Electron process closes (registered before yielding to tests). */
  appClosed: Promise<void>;
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
          ws.close();
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

/**
 * Launch a fresh Electron instance with an isolated user-data directory. Returns the app handle,
 * the temp directory path, and a promise that resolves when the app closes.
 */
export async function launchElectronApp(): Promise<ElectronAppContext> {
  const rootDir = path.resolve(__dirname, '../..');

  console.log(`Launching Electron app from project root: ${rootDir}`);

  // VSCode/Claude Code set ELECTRON_RUN_AS_NODE=1 which forces the Electron
  // binary to run as plain Node.js. We must remove it.
  // NODE_ENV=development so the renderer loads from the webpack dev server.
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
    // Clean up the temp directory created above — launch never succeeded
    fs.rmSync(userDataDir, { recursive: true, force: true });
    throw error;
  }

  // Wait for WebSocket server to be ready (port 8876)
  console.log('Waiting for WebSocket server on port 8876...');
  try {
    await waitForWebSocketReady(DEFAULT_WEBSOCKET_PORT, PROCESS_READY_TIMEOUT);
  } catch (error) {
    // Launch succeeded but WebSocket never became ready — kill the orphaned
    // Electron process and clean up the temp directory before propagating.
    console.error('WebSocket readiness check failed after Electron launch:', error);
    const proc = electronApp.process();
    if (proc?.pid) {
      try {
        process.kill(-proc.pid, 'SIGKILL');
      } catch {
        try {
          proc.kill('SIGKILL');
        } catch {
          /* already dead */
        }
      }
    }
    fs.rmSync(userDataDir, { recursive: true, force: true });
    throw error;
  }
  console.log('WebSocket server is ready');

  // Register the close listener BEFORE yielding to tests. The 'close' event
  // fires once — if we registered it after use(), it could already be gone by
  // the time teardown runs.
  const appClosed = new Promise<void>((resolve) =>
    electronApp.once('close', () => {
      resolve();
    }),
  );

  return { electronApp, userDataDir, appClosed };
}

/**
 * Tear down an Electron instance: kill the process group, wait for close, and clean up the isolated
 * user-data directory.
 */
export async function teardownElectronApp(ctx: ElectronAppContext): Promise<void> {
  const { electronApp, userDataDir, appClosed } = ctx;

  // Teardown: kill the OS process and wait for Playwright to passively detect
  // the disconnection via the 'close' event registered above.
  const electronProcess = electronApp.process();
  console.log(
    `[teardown] Closing Electron app... pid=${electronProcess?.pid} exitCode=${electronProcess?.exitCode} signalCode=${electronProcess?.signalCode}`,
  );

  // On Linux, processLauncher.js spawns Electron with `detached: true`, making
  // Electron the leader of its own process group. Child processes inherit the
  // write-ends of Electron's stdout/stderr pipes; killing only the Electron PID
  // leaves those write-ends open forever. The fix is to kill the ENTIRE process
  // group (-pid).
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

  if (electronProcess && electronProcess.exitCode === null && electronProcess.signalCode === null) {
    console.log('[teardown] Sending SIGKILL to process group...');
    killGroup('SIGKILL');
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
  console.log('[teardown] Complete');
}

/**
 * @deprecated For CI smoke tests / app.fixture teardown only. Per-feature E2E tests must navigate
 *   through visible UI using cdp.fixture, not PAPI commands.
 *
 *   Send a JSON-RPC request over WebSocket to the PAPI server. Opens a connection, sends the request,
 *   waits for response, then closes.
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
      try {
        const response = JSON.parse(data.toString());
        // Ignore unsolicited messages (notifications, events) that don't
        // match our request id — only resolve on the actual response.
        if (response.id !== 1) return;
        clearTimeout(timeout);
        if (response.error) {
          reject(new Error(`PAPI error: ${JSON.stringify(response.error)}`));
        } else {
          resolve(response.result as T);
        }
      } catch (err) {
        clearTimeout(timeout);
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
