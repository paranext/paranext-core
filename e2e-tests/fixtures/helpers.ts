import {
  _electron as electron,
  ElectronApplication,
  expect,
  FrameLocator,
  Page,
} from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';
import WebSocket from 'ws';

const DEFAULT_WEBSOCKET_PORT = 8876;

/**
 * A renderer's window-scoped `platform.about` command (`command:platform.about-{windowId}`, see
 * `dialog.service-host.ts`).
 *
 * The gate matches the SCOPED name rather than the generic `command:platform.about`: the main
 * process registers routing proxies under the generic names before it creates any window, so the
 * generic name appears in `rpc.discover` while no renderer exists to serve it. A scoped name can
 * only come from a live renderer that finished registering its commands. The window id is an
 * Electron BrowserWindow id, so it is matched as a pattern rather than a fixed string.
 */
const SCOPED_PLATFORM_ABOUT_COMMAND = /^command:platform\.about-\d+$/;

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
  /**
   * OS pid of the Electron process, captured at launch time while `electronApp.process()` is
   * guaranteed to work. Teardown falls back to it when Playwright has already disposed the
   * ElectronApplication (where `process()` throws) — disposal usually means the process exited, but
   * that must be verified against the OS rather than assumed.
   */
  appPid?: number;
  /**
   * When true, {@link teardownElectronApp} leaves {@link userDataDir} on disk so a later launch can
   * reuse it. Carried over from {@link LaunchElectronAppOptions.preserveUserDataDir}.
   */
  preserveUserDataDir?: boolean;
}

/**
 * Wait for the given port to stop accepting connections (i.e., be free). Used after teardown to
 * ensure the previous Electron's extension-host WebSocket server has released port 8876 before the
 * next test launches. On Windows, killing the Electron main process does not always kill the
 * extension-host child process immediately; without this wait, the next `waitForWebSocketReady`
 * connects to the dying extension host rather than the new one, causing "Settings service
 * undefined" errors.
 */
async function waitForPortFree(port: number, timeout: number): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    // Sequential polling: each probe must finish before starting the next.
    // eslint-disable-next-line no-await-in-loop
    const isFree = await new Promise<boolean>((resolve) => {
      const ws = new WebSocket(`ws://localhost:${port}`);
      const timer = setTimeout(() => {
        ws.close();
        // Connect neither succeeded nor was refused within the probe window. A dying-but-still-
        // listening extension host that is slow to complete the handshake looks exactly like
        // this, and it is the case this helper exists to catch — so treat a timeout as "still in
        // use" and keep polling. Only a refused connection is evidence the port is free.
        resolve(false);
      }, 500);
      ws.on('open', () => {
        clearTimeout(timer);
        ws.close();
        resolve(false); // Connection succeeded → port is still in use
      });
      ws.on('error', () => {
        clearTimeout(timer);
        resolve(true); // Connection refused → port is free
      });
    });
    if (isFree) return;
    // Sequential polling: each probe must complete before the next starts.
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 250);
    });
  }
  // Do not throw — if the port is never freed within the window, log and proceed; the next
  // launch will fail its own waitForWebSocketReady with a clearer error.
  console.warn(`[teardown] Port ${port} still in use after ${timeout}ms — proceeding anyway`);
}

/** Wait for the WebSocket server to be ready on the specified port. */
async function waitForWebSocketReady(port: number, timeout: number): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      // Sequential polling: each attempt must finish (or time out) before the next;
      // parallelizing would defeat the retry/backoff.
      // eslint-disable-next-line no-await-in-loop
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
      // Sequential polling: each attempt must finish (or time out) before the next;
      // parallelizing would defeat the retry/backoff.
      // eslint-disable-next-line no-await-in-loop
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
  /**
   * When true, point the app's Paratext project root at an empty temp folder inside the isolated
   * user-data dir (via the PLATFORM_BIBLE_PROJECT_ROOT_FOLDER env var). The C# backend installs the
   * bundled sample WEB project into an empty root, so tests get an identical project on any
   * developer's machine and never read or write the developer's real projects.
   */
  isolatedProjectRoot?: boolean;
  /**
   * Absolute path of an existing user-data directory to launch into, instead of creating a fresh
   * temp one. For relaunch tests: pass the `userDataDir` a previous {@link launchElectronApp}
   * returned (launched with {@link LaunchElectronAppOptions.preserveUserDataDir}) so the new
   * instance starts from the profile state the previous one persisted. Launches must be sequential
   * — the fixed WebSocket port and Electron's per-profile singleton lock forbid overlapping
   * instances — so only pass this after the previous instance's process has fully exited.
   */
  userDataDir?: string;
  /**
   * When true, {@link teardownElectronApp} (and the cleanup that runs when the launch itself fails)
   * leaves the user-data directory on disk so a later launch can reuse it via
   * {@link LaunchElectronAppOptions.userDataDir}. The LAST launch of a relaunch chain must leave
   * this unset so its teardown deletes the directory — otherwise the temp directory leaks.
   */
  preserveUserDataDir?: boolean;
}

/**
 * Launch a fresh Electron instance with an isolated user-data directory (or, for relaunch tests, an
 * existing one via {@link LaunchElectronAppOptions.userDataDir}). Returns the app handle, the
 * user-data directory path, and a promise that resolves when the app closes.
 */
export async function launchElectronApp(
  opts: LaunchElectronAppOptions = {},
): Promise<ElectronAppContext> {
  const rootDir = path.resolve(__dirname, '../..');

  console.log(`Launching Electron app from project root: ${rootDir}`);

  // Use an isolated user-data directory so the singleton instance lock does not
  // conflict with any already-running Platform.Bible instance. A caller-supplied directory (a
  // relaunch into a preserved profile) is used as-is.
  const userDataDir = opts.userDataDir ?? fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-e2e-'));

  // VSCode/Claude Code set ELECTRON_RUN_AS_NODE=1 which forces the Electron
  // binary to run as plain Node.js. We must omit it (do not set it to undefined:
  // Playwright's env type is Record<string, string>).
  // NODE_ENV=development so the renderer loads from the webpack dev server.
  // Omit ELECTRON_RUN_AS_NODE so the Electron child does not inherit it.
  // Also strip PLATFORM_BIBLE_PROJECT_ROOT_FOLDER: the C# backend honors it, so an ambient value
  // from the dev/CI shell would silently redirect the project root of suites that did not opt into
  // isolatedProjectRoot. Only the isolatedProjectRoot branch (or an explicit envOverride) below sets it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ELECTRON_RUN_AS_NODE, PLATFORM_BIBLE_PROJECT_ROOT_FOLDER, ...restEnv } = process.env;
  const env = {
    ...restEnv,
    NODE_ENV: 'development',
    // Enable noisy dev mode so test extensions (helloRock3, helloSomeone, etc.) are loaded.
    // Only set if not already defined, so other E2E suites can override (e.g. a suite that needs a
    // clean layout passes `envOverrides: { DEV_NOISY: 'false' }`, which is spread last below).
    DEV_NOISY: process.env.DEV_NOISY ?? 'true',
    // Placing the project root inside userDataDir means the existing teardown rmSync cleans it up.
    ...(opts.isolatedProjectRoot
      ? { PLATFORM_BIBLE_PROJECT_ROOT_FOLDER: path.join(userDataDir, 'projects') }
      : {}),
    // Caller-supplied overrides take precedence over all defaults above.
    ...opts.envOverrides,
  };

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
    // Clean up the temp directory created above — launch never succeeded. Preserved profiles are
    // kept even here so a failed relaunch does not destroy the state under investigation.
    if (!opts.preserveUserDataDir) fs.rmSync(userDataDir, { recursive: true, force: true });
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
    if (!opts.preserveUserDataDir) fs.rmSync(userDataDir, { recursive: true, force: true });
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

  return {
    electronApp,
    userDataDir,
    appClosed,
    appPid: electronApp.process().pid,
    preserveUserDataDir: opts.preserveUserDataDir,
  };
}

/**
 * Tear down an Electron instance: kill the process group, wait for close, and clean up the isolated
 * user-data directory.
 */
export async function teardownElectronApp(ctx: ElectronAppContext): Promise<void> {
  const { electronApp, userDataDir, appClosed, appPid, preserveUserDataDir } = ctx;

  // Teardown: kill the OS process and wait for Playwright to passively detect
  // the disconnection via the 'close' event registered above.
  // After a graceful quit, Playwright may have fully disposed the ElectronApplication by the time
  // teardown runs — on Windows its stdio closes promptly (no .NET watcher child holds the pipe
  // write-ends open, unlike Linux), and `process()` on the disposed object throws. Disposal
  // usually means the process exited, but not always — so fall back to the pid captured at launch
  // and ask the OS whether the process is still alive rather than assuming.
  let electronProcess: ReturnType<ElectronApplication['process']> | undefined;
  try {
    electronProcess = electronApp.process();
  } catch {
    electronProcess = undefined;
  }
  const pid = electronProcess?.pid ?? appPid;
  console.log(
    `[teardown] Closing Electron app... pid=${pid} exitCode=${electronProcess?.exitCode} signalCode=${electronProcess?.signalCode}`,
  );

  // On Linux, processLauncher.js spawns Electron with `detached: true`, making
  // Electron the leader of its own process group. Child processes inherit the
  // write-ends of Electron's stdout/stderr pipes; killing only the Electron PID
  // leaves those write-ends open forever. The fix is to kill the ENTIRE process
  // group (-pid).
  // NodeJS is the ambient @types/node namespace; the strict staged-file lint
  // config has no node environment, so it cannot see the global.
  // eslint-disable-next-line no-undef
  const killGroup = (sig: NodeJS.Signals) => {
    if (!pid) return;
    try {
      process.kill(-pid, sig);
    } catch {
      // Process group may already be gone — fall back to single-process kill
      try {
        process.kill(pid, sig);
      } catch {
        /* already dead */
      }
    }
  };

  /** Whether the Electron OS process is still running, per the best signal available. */
  const isProcessAlive = (): boolean => {
    if (electronProcess)
      // Node.js ChildProcess.exitCode/signalCode are null until the process exits
      // eslint-disable-next-line no-null/no-null
      return electronProcess.exitCode === null && electronProcess.signalCode === null;
    if (pid === undefined) return false;
    // No child-process handle (Playwright disposed it) — probe the OS directly. Signal 0 performs
    // only an existence/permission check and delivers nothing.
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  };

  if (isProcessAlive()) {
    if (!electronProcess)
      console.log(
        `[teardown] Playwright handle already disposed but pid ${pid} is still alive — killing anyway...`,
      );
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
  } else if (!electronProcess) {
    console.log('[teardown] Playwright handle already disposed and the OS process has exited.');
  }

  // Wait for the extension-host's WebSocket server (port 8876) to release the port before the next
  // launch. On Windows, killing the Electron main process does not immediately kill child
  // processes — the extension host can outlive the main process and keep port 8876 bound, causing
  // the next test's waitForWebSocketReady to connect to the wrong (dying) server. Runs before the
  // preserve-and-return path too, since a relaunch reuses the same fixed port 8876.
  console.log('[teardown] Waiting for port 8876 to be free...');
  await waitForPortFree(DEFAULT_WEBSOCKET_PORT, 15_000);
  console.log('[teardown] Port 8876 is free');

  // A preserved profile stays on disk so a later launch can relaunch into it (see
  // LaunchElectronAppOptions.preserveUserDataDir). The last teardown of a relaunch chain runs with
  // the flag unset and deletes the directory below.
  if (preserveUserDataDir) {
    console.log(`[teardown] Preserving user data dir for relaunch: ${userDataDir}`);
    console.log('[teardown] Complete');
    return;
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
 * Poll `rpc.discover` until a method matching `methodName` appears in `result.methods` or
 * `timeoutMs` elapses. Uses the same registration map as the live PAPI server (renderer-registered
 * commands included).
 *
 * @param methodName Exact method name, or a pattern to match against every registered name (for
 *   names that carry a runtime-assigned suffix, e.g. a window-scoped command).
 */
export async function waitForPapiMethodRegistered(
  methodName: string | RegExp,
  port: number = DEFAULT_WEBSOCKET_PORT,
  timeoutMs = 60_000,
): Promise<void> {
  const isMatch = (name: string) =>
    typeof methodName === 'string' ? name === methodName : methodName.test(name);
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const remaining = timeoutMs - (Date.now() - start);
    try {
      // Sequential polling: each attempt must finish (or time out) before the next;
      // parallelizing would defeat the retry/backoff.
      // eslint-disable-next-line no-await-in-loop
      const result = await sendPapiRequestOnce<RpcDiscoverResult>(
        GET_METHODS,
        [],
        port,
        Math.min(10_000, Math.max(1000, remaining)),
      );
      if (result.methods?.some((m) => isMatch(m.name))) return;
    } catch {
      /* next poll */
    }
    const sleepMs = Math.min(RPC_DISCOVER_POLL_INTERVAL_MS, timeoutMs - (Date.now() - start));
    if (sleepMs <= 0) break;
    // Sequential polling: each attempt must finish (or time out) before the next;
    // parallelizing would defeat the retry/backoff.
    // eslint-disable-next-line no-await-in-loop
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
      // Sequential polling: each attempt must finish (or time out) before the next;
      // parallelizing would defeat the retry/backoff.
      // eslint-disable-next-line no-await-in-loop
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
    // Sequential polling: each attempt must finish (or time out) before the next;
    // parallelizing would defeat the retry/backoff.
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, sleepMs);
    });
  }
  throw new Error(
    `Project lookup returned no projects within ${timeoutMs}ms (PDP factories may not be registered).`,
  );
}

/**
 * Path to the shared dev-appdata settings file. Platform.Bible reads this file at startup in
 * development mode to restore user settings. Writing it before launching Electron is the correct
 * way to pre-configure locale and interface mode for E2E tests — it avoids triggering the
 * mid-session locale reload path, which sequentially reloads every open WebView.
 */
const DEV_APPDATA_SETTINGS_PATH = path.resolve(__dirname, '../../dev-appdata/data/settings.json');

/**
 * Merge the given key-value pairs into the dev-appdata settings file before launching the app.
 * Preserves any existing settings (e.g. `platform.verseRef`) so the app session starts from the
 * developer's saved state plus the overrides.
 *
 * Must be called BEFORE `launchElectronApp` so the app reads the correct values at startup.
 *
 * @returns A restore function that writes the settings file back to its exact pre-call contents (or
 *   deletes it if it did not exist). Call it in worker teardown, AFTER the app has closed, so the
 *   developer's saved settings are not permanently replaced by test values.
 */
export function preConfigureSettings(overrides: Record<string, unknown>): () => void {
  const settingsDir = path.dirname(DEV_APPDATA_SETTINGS_PATH);
  let originalContents: string | undefined;
  let existing: Record<string, unknown> = {};
  if (fs.existsSync(DEV_APPDATA_SETTINGS_PATH)) {
    originalContents = fs.readFileSync(DEV_APPDATA_SETTINGS_PATH, 'utf-8');
    try {
      // JSON.parse returns `any`; asserting the known shape of the settings file
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      existing = JSON.parse(originalContents) as Record<string, unknown>;
    } catch {
      // Corrupt file — start fresh with only the overrides
    }
  }
  fs.mkdirSync(settingsDir, { recursive: true });
  fs.writeFileSync(DEV_APPDATA_SETTINGS_PATH, JSON.stringify({ ...existing, ...overrides }));

  return () => {
    if (originalContents !== undefined)
      fs.writeFileSync(DEV_APPDATA_SETTINGS_PATH, originalContents);
    else fs.rmSync(DEV_APPDATA_SETTINGS_PATH, { force: true });
  };
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
 * Wait for the full-screen workspace-updating overlay to be gone. The overlay (`<div role="status"
 * class="tw:fixed tw:inset-0 …">`) intercepts pointer events while it is visible; it appears during
 * app initialization and during dock rebuilds (e.g. project switches in simple mode). Clicks and
 * iframe loads fail while it is up.
 */
export async function waitForOverlayGone(page: Page, timeout: number): Promise<void> {
  await expect(page.locator('.pr-twp [role="status"]')).not.toBeVisible({ timeout });
}

/**
 * LocalStorage key persisting onboarding-tour completion. Mirrors ONBOARDING_TOUR_DONE_KEY in
 * src/renderer/components/onboarding-tour/onboarding-tour.store.ts — keep in sync (renderer source
 * cannot be imported into the Playwright Node context).
 */
export const ONBOARDING_TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

/** Options accepted by {@link waitForAppReady}. */
export interface WaitForAppReadyOptions {
  /**
   * Budget for the whole readiness sequence, shared across its three waits.
   *
   * @default 90_000
   */
  timeout?: number;
  /**
   * Set true only in tests that are ABOUT the onboarding tour and need it to show. By default the
   * helper suppresses the tour (see {@link waitForAppReady}) because its full-screen overlay blocks
   * all pointer events for every other test.
   *
   * @default false
   */
  allowOnboardingTour?: boolean;
}

/**
 * Wait for the Platform.Bible UI to be fully ready beyond just React mounting. Waits for the
 * platform-dock layout to appear, then for a renderer to finish registering its window-scoped menu
 * commands (the dock can render before that async work completes), and finally for the full-screen
 * initialization overlay to clear. The overlay lingers while async services (settings, theme)
 * finish initializing — it must be gone before tests interact with the UI.
 *
 * Unless `allowOnboardingTour` is set, also suppresses the onboarding tour: in Simple mode with a
 * fresh profile the tour opens automatically (and asynchronously — it waits for the dock layout and
 * localized strings), and its full-screen overlay blocks all pointer events. Writing the done flag
 * makes `OnboardingTour` (which re-reads it each render) refuse to open from that point on, closing
 * the race a visibility check alone would leave; an instance that already opened before the flag
 * landed is dismissed with Escape.
 */
export async function waitForAppReady(
  page: Page,
  { timeout = 90_000, allowOnboardingTour = false }: WaitForAppReadyOptions = {},
): Promise<void> {
  const start = Date.now();
  await page.waitForSelector('div[class*="dock-layout"]', {
    state: 'attached',
    timeout,
  });
  const remaining1 = Math.max(1000, timeout - (Date.now() - start));
  await waitForPapiMethodRegistered(
    SCOPED_PLATFORM_ABOUT_COMMAND,
    DEFAULT_WEBSOCKET_PORT,
    remaining1,
  );
  const remaining2 = Math.max(1000, timeout - (Date.now() - start));
  // Services like settings and theme finish async work after dock-layout mounts and platform.about
  // registers, so the overlay can outlast both earlier signals.
  await waitForOverlayGone(page, remaining2);
  if (!allowOnboardingTour) {
    await page.evaluate((key) => {
      localStorage.setItem(key, 'true');
    }, ONBOARDING_TOUR_DONE_KEY);
    // The tour-specific test id (not a generic modal-dialog selector) so an unrelated dialog —
    // e.g. a real startup error — is never silently Escape-dismissed here.
    const tourDialog = page.getByTestId('tour-dialog');
    if (await tourDialog.isVisible()) {
      await page.keyboard.press('Escape');
      await expect(tourDialog).not.toBeVisible({ timeout: 5000 });
    }
  }
}

/** Options accepted by {@link openFromEditorHamburger}. */
export interface OpenFromEditorHamburgerOptions {
  /**
   * Short name of the project whose scripture editor hosts the hamburger ("Project") menu entry
   * point. When its editor dock tab is not already open, the project is opened from the Home tab
   * first.
   */
  projectName: string;
  /** Accessible name of the menu item to click inside the editor hamburger menu. */
  menuItem: string | RegExp;
  /**
   * Dock-tab title (at MAIN-PAGE level) expected to appear after the menu item is clicked. Defaults
   * to {@link OpenFromEditorHamburgerOptions.menuItem}.
   */
  tabTitle?: string | RegExp;
  /**
   * Optional callback awaited while the hamburger menu is open, BEFORE the menu item is clicked
   * (e.g. to capture a mid-flow evidence screenshot of the open menu). Receives the editor iframe's
   * FrameLocator — the menu items render INSIDE the editor's iframe (Radix portals to the iframe
   * body), so assertions on them must go through this frame, not the main page.
   */
  onMenuOpen?: (editorFrame: FrameLocator) => Promise<void>;
}

/**
 * Open a tool (e.g. "Manage books…") from the scripture editor's hamburger ("Project") menu.
 *
 * Tool entry points live in the scripture editor's hamburger menu rather than the application main
 * menu. The hamburger button (`button[aria-label='Project']`) and its Radix menu both render INSIDE
 * the editor's iframe, while the resulting tool web view surfaces as a dock tab at MAIN-PAGE
 * level.
 *
 * Steps:
 *
 * 1. Open `projectName`'s editor from the Home tab (skipped when its dock tab already exists). The
 *    relevant dock tab is activated first — in-iframe elements (Home's Open buttons, the editor's
 *    hamburger) are only clickable while their tab is the visible one in its dock panel.
 * 2. Enter the editor iframe and click the hamburger.
 * 3. Optionally await `onMenuOpen(editorFrame)` while the menu is open.
 * 4. Click the menu item, then wait for the target dock tab to appear at main-page level.
 */
export async function openFromEditorHamburger(
  page: Page,
  options: OpenFromEditorHamburgerOptions,
): Promise<void> {
  const { projectName, menuItem, tabTitle = menuItem, onMenuOpen } = options;

  const existingEditor = page.locator('.dock-tab', { hasText: projectName });
  if ((await existingEditor.count()) === 0) {
    // The Home iframe's Open buttons are only clickable while the Home tab is
    // the visible tab in its dock panel — activate it first.
    await page.locator('.dock-tab', { hasText: 'Home' }).first().click();
    const homeFrame = page.frameLocator('iframe[title="Home"]');
    await homeFrame.locator(`tr:has-text("${projectName}") button:has-text("Open")`).click();
    await expect(page.locator('.dock-tab', { hasText: projectName })).toBeVisible({
      timeout: 15_000,
    });
  } else {
    // Same constraint for the editor's hamburger: the editor iframe must be
    // the visible tab before its in-iframe button can be clicked.
    await existingEditor.first().click();
  }

  const editorFrame = page.frameLocator(`iframe[title*="${projectName}" i][title*="Editable" i]`);
  await editorFrame.locator("button[aria-label='Project']").first().click();
  if (onMenuOpen) await onMenuOpen(editorFrame);
  await editorFrame.getByRole('menuitem', { name: menuItem }).first().click();

  // The tool's web view appears as a dock tab at MAIN-PAGE level (not inside the editor iframe).
  await expect(page.locator('.dock-tab', { hasText: tabTitle })).toBeVisible({ timeout: 15_000 });
}
