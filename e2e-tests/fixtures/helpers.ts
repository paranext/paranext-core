import { _electron as electron, ElectronApplication, Page } from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';
import WebSocket from 'ws';

const DEFAULT_WEBSOCKET_PORT = 8876;

/**
 * Same serialized request type as `registerCommand('platform.about', ...)` in command.service
 * (`command` + `:` + `platform.about`).
 */
const PLATFORM_ABOUT_COMMAND = 'command:platform.about';

const RPC_DISCOVER_POLL_INTERVAL_MS = 250;
export const PROCESS_READY_TIMEOUT = 120_000;

/**
 * Keep in sync with GET_METHODS from @shared/data/rpc.model Get all methods that are currently
 * registered on the network. Required to be 'rpc.discover' by the OpenRPC specification.
 */
const GET_METHODS = 'rpc.discover';

/**
 * Subset of the OpenRPC `rpc.discover` result shape used by E2E helpers (see
 * `src/shared/models/openrpc.model` for the full type).
 */
type RpcDiscoverResult = {
  methods?: Array<{ name: string }>;
};

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
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      });
    }
  }
  throw new Error(`WebSocket server not ready on port ${port} after ${timeout}ms`);
}

/** Options accepted by {@link launchElectronApp}. */
export interface LaunchElectronAppOptions {
  /**
   * Additional environment variables to merge into the child process environment, applied after the
   * defaults. Keys present here override the defaults (e.g. `{ DEV_NOISY: 'false' }`).
   */
  envOverrides?: Record<string, string>;
}

/**
 * Launch a fresh Electron instance with an isolated user-data directory. Returns the app handle,
 * the temp directory path, and a promise that resolves when the app closes.
 */
export async function launchElectronApp(
  opts: LaunchElectronAppOptions = {},
): Promise<ElectronAppContext> {
  const rootDir = path.resolve(__dirname, '../..');

  console.log(`Launching Electron app from project root: ${rootDir}`);

  // VSCode/Claude Code set ELECTRON_RUN_AS_NODE=1 which forces the Electron
  // binary to run as plain Node.js. We must omit it (do not set it to undefined:
  // Playwright's env type is Record<string, string>).
  // NODE_ENV=development so the renderer loads from the webpack dev server.
  // Omit ELECTRON_RUN_AS_NODE so the Electron child does not inherit it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ELECTRON_RUN_AS_NODE, ...restEnv } = process.env;
  const env = {
    ...restEnv,
    NODE_ENV: 'development',
    // Enable noisy dev mode so test extensions (helloRock3, helloSomeone, etc.) are loaded.
    // Only set if not already defined, so other E2E suites can override.
    DEV_NOISY: process.env.DEV_NOISY ?? 'true',
    // Caller-supplied overrides take precedence over all defaults above.
    ...opts.envOverrides,
  };

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
  const appClosed = new Promise<void>((resolve) => {
    electronApp.once('close', () => {
      resolve();
    });
  });

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

  // Node.js ChildProcess.exitCode/signalCode are null until the process exits
  // eslint-disable-next-line no-null/no-null
  if (electronProcess && electronProcess.exitCode === null && electronProcess.signalCode === null) {
    console.log('[teardown] Sending SIGKILL to process group...');
    killGroup('SIGKILL');
    console.log('[teardown] Waiting for appClosed after SIGKILL (up to 3s)...');
    await Promise.race([
      appClosed,
      new Promise<void>((resolve) => {
        setTimeout(resolve, 3_000);
      }),
    ]);
    console.log('[teardown] Done waiting after SIGKILL');
  }

  console.log('[teardown] Cleaning up user data dir...');

  // Clean up the isolated user-data directory. On some platforms file locks
  // may linger briefly after the process group is killed, so retry once.
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {
    console.warn('[teardown] First rmSync attempt failed — retrying in 3s...');
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 3_000);
    });
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {
      console.warn(`[teardown] Could not remove ${userDataDir}: ${e}`);
    }
  }
  console.log('[teardown] Complete');
}

/**
 * One JSON-RPC 2.0 request over WebSocket: open, send, wait for response id `1`, close. Ignores
 * unrelated messages until the matching response arrives.
 *
 * @param timeoutErrorMessage — optional; defaults to a `PAPI request "…" timed out …` message.
 */
async function sendPapiJsonRpcOnce<T>(
  method: string,
  timeoutErrorMessage?: string,
  params: unknown[] = [],
  port: number = DEFAULT_WEBSOCKET_PORT,
  perRequestTimeoutMs = 10_000,
): Promise<T> {
  const timeoutMessage =
    timeoutErrorMessage ?? `PAPI request "${method}" timed out after ${perRequestTimeoutMs}ms`;

  return new Promise<T>((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(timeoutMessage));
    }, perRequestTimeoutMs);

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params,
        }),
      );
    });

    ws.on('message', (data) => {
      let parsed: { id?: number; error?: unknown; result?: unknown };
      try {
        parsed = JSON.parse(data.toString());
      } catch (err) {
        clearTimeout(timeout);
        ws.close();
        reject(err);
        return;
      }
      // Ignore unsolicited messages (notifications, events) that don't match our request id.
      if (parsed.id !== 1) return;
      clearTimeout(timeout);
      ws.close();
      if (parsed.error) {
        reject(new Error(`PAPI error: ${JSON.stringify(parsed.error)}`));
      } else {
        // JSON-RPC `result` is untyped; caller supplies T (e.g. RpcDiscoverResult for rpc.discover).
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        resolve(parsed.result as T);
      }
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * @deprecated For CI smoke tests / app.fixture teardown only. Per-feature E2E tests must navigate
 *   through visible UI using cdp.fixture, not PAPI commands.
 *
 *   Send a PAPI command over WebSocket (`method` = `command:` + `command`). Opens a connection, sends
 *   the request, waits for the response, then closes.
 */
export async function sendPapiCommand<T = unknown>(
  command: string,
  args: unknown[] = [],
  port: number = DEFAULT_WEBSOCKET_PORT,
): Promise<T> {
  return sendPapiJsonRpcOnce<T>(
    `command:${command}`,
    `PAPI command "${command}" timed out after 10s`,
    args,
    port,
    10_000,
  );
}

/**
 * Send a single JSON-RPC request where `method` is a PAPI request type (e.g. `rpc.discover`). Opens
 * a connection, sends one request, waits for the matching response id, then closes.
 */
export async function sendPapiRequestOnce<T>(
  method: string,
  params: unknown[] = [],
  port: number = DEFAULT_WEBSOCKET_PORT,
  perRequestTimeoutMs = 10_000,
): Promise<T> {
  return sendPapiJsonRpcOnce<T>(method, undefined, params, port, perRequestTimeoutMs);
}

/**
 * Poll `rpc.discover` until `methodName` appears in `result.methods` or `timeoutMs` elapses. Uses
 * the same registration map as the live PAPI server (renderer-registered commands included).
 *
 * `port` is optional so callers can skip it and supply only `timeoutMs`:
 * `waitForPapiMethodRegistered(method, undefined, 120_000)`.
 */
export async function waitForPapiMethodRegistered(
  methodName: string,
  port?: number,
  timeoutMs = 60_000,
): Promise<void> {
  const resolvedPort = port ?? DEFAULT_WEBSOCKET_PORT;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const remaining = timeoutMs - (Date.now() - start);
    try {
      const result = await sendPapiRequestOnce<RpcDiscoverResult>(
        GET_METHODS,
        [],
        resolvedPort,
        Math.min(10_000, Math.max(1000, remaining)),
      );
      if (result.methods?.some((m) => m.name === methodName)) return;
    } catch {
      /* next poll */
    }
    const sleepMs = Math.min(RPC_DISCOVER_POLL_INTERVAL_MS, timeoutMs - (Date.now() - start));
    if (sleepMs <= 0) break;
    await new Promise<void>((resolve) => {
      setTimeout(resolve, sleepMs);
    });
  }
  throw new Error(`PAPI method "${methodName}" not listed in rpc.discover within ${timeoutMs}ms`);
}

/**
 * Serialized PAPI request for `ProjectLookupService.getMetadataForAllProjects` (see
 * `network-object.service.ts` `getNetworkObjectRequestType`).
 */
const PROJECT_LOOKUP_GET_ALL_PROJECTS_METHOD =
  'object:ProjectLookupService.getMetadataForAllProjects';

/**
 * Poll until project lookup returns at least one project. PDP factories can register after the dock
 * is visible; select-project dialogs need metadata before they render `.project-list` buttons.
 */
export async function waitForAtLeastOneProjectMetadata(
  port: number = DEFAULT_WEBSOCKET_PORT,
  timeoutMs = 60_000,
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const remaining = timeoutMs - (Date.now() - start);
    try {
      const result = await sendPapiRequestOnce<unknown[]>(
        PROJECT_LOOKUP_GET_ALL_PROJECTS_METHOD,
        [],
        port,
        Math.min(10_000, Math.max(1000, remaining)),
      );
      if (Array.isArray(result) && result.length > 0) return;
    } catch {
      /* PDP factories or network object not ready yet */
    }
    const sleepMs = Math.min(RPC_DISCOVER_POLL_INTERVAL_MS, timeoutMs - (Date.now() - start));
    if (sleepMs <= 0) break;
    await new Promise<void>((resolve) => {
      setTimeout(resolve, sleepMs);
    });
  }
  throw new Error(
    `Project lookup returned no projects within ${timeoutMs}ms (PDP factories may not be registered).`,
  );
}

/**
 * Adds the given usernames as team members of the specified Paratext project so they appear in the
 * "Assign to" dropdown.
 *
 * Writes a `ProjectUserAccess.xml` file into the project directory. The Paratext Data library
 * (`CommentThread.GetAssignToUsers`) reads this file to determine assignable users. Call this
 * before the data provider opens the project (i.e., during project setup) to avoid caching issues.
 *
 * @param projectDir Absolute path to the project directory
 * @param users Usernames to add as project team members
 */
export function addUsersToProject(projectDir: string, users: string[]): void {
  const userEntries = users
    .map(
      (name) =>
        `  <User UserName="${name}" FirstUser="false" UnregisteredUser="false">
    <Role>TeamMember</Role>
    <AllBooks>true</AllBooks>
    <Books/>
    <Permissions>
      <Permission Type="TermsList" Granted="false"/>
      <Permission Type="Renderings" Granted="true"/>
      <Permission Type="Spellings" Granted="true"/>
      <Permission Type="Passages" Granted="true"/>
      <Permission Type="Progress" Granted="false"/>
    </Permissions>
    <AutomaticBooks/>
    <AutomaticPermissions/>
  </User>`,
    )
    .join('\n');

  const xml = `<ProjectUserAccess PeerSharing="false">\n${userEntries}\n</ProjectUserAccess>\n`;
  fs.writeFileSync(path.join(projectDir, 'ProjectUserAccess.xml'), xml, 'utf8');
}

/**
 * Wait for the Platform.Bible UI to be fully ready beyond just React mounting. Waits for the
 * platform-dock layout to appear, then for the dialog service to finish registering menu commands
 * like `platform.about` (the dock can render before that async work completes).
 */
export async function waitForAppReady(page: Page, timeout = 60_000): Promise<void> {
  const start = Date.now();
  await page.waitForSelector('div[class*="dock-layout"]', {
    state: 'attached',
    timeout,
  });
  const remaining = Math.max(0, timeout - (Date.now() - start));
  await waitForPapiMethodRegistered(PLATFORM_ABOUT_COMMAND, DEFAULT_WEBSOCKET_PORT, remaining);
}
