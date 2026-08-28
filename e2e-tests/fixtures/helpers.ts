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
 * Fixed GUID of the bundled sample WEB project (`c-sharp/assets/WEB/Settings.xml` `<Guid>`).
 *
 * Exported because it is a fixture identity, not a per-spec choice: every suite launching with
 * `isolatedProjectRoot` opens this same project, and a copy that drifts from the bundle fails as an
 * opaque `openScriptureEditorForProject` timeout rather than as a wrong-id error.
 */
export const SAMPLE_WEB_PROJECT_ID = '32664dc3288a28df2e2bb75ded887fc8f17a15fb';

/**
 * The window-scoped shard methods a renderer registers, one per service the main process's routers
 * forward a command or request to (see the `*.service-shard.ts` modules).
 *
 * Each gate matches a SCOPED name rather than the generic `dialog:showDialog` or
 * `command:platform.openBookChapterControl`: the main process registers those before it creates any
 * window, so they appear in `rpc.discover` while no renderer exists to serve them. A scoped shard
 * method can only come from a live renderer that finished registering its services. The window id
 * is an Electron BrowserWindow id, so it is matched as a pattern rather than a fixed string.
 *
 * All of them, not just one: a renderer starts its shards together, so any one of them proves only
 * that the batch is under way. A spec that drives a command right after the gate — Ctrl+B, a
 * feedback form, a settings tab — needs the shard behind THAT command to have registered.
 */
const SCOPED_SHARD_METHODS = [
  /^object:DialogService-\d+\.showDialog$/,
  /^object:UsersnapService-\d+\.submitIdea$/,
  /^object:BookChapterControlService-\d+\.open$/,
  /^object:WebViewService-\d+\.openSettingsTab$/,
];

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

/** The window size a spec's layout is written against. */
export type WindowSize = { width: number; height: number };

/**
 * Default window every e2e spec gets unless it declares otherwise with `test.use({ windowSize: ...
 * })`.
 *
 * 1280x800 because that is what the launch fixtures have always applied, so it is the layout the
 * existing specs were written against. It is deliberately NOT the Full HD minimum used for
 * screenshot evidence: window size decides layout, and screenshot quality is enforced separately
 * where screenshots are written (`assertFullHdScreenshot`). Conflating the two meant a spec's
 * result depended on which fixture happened to own the window.
 */
export const DEFAULT_WINDOW_SIZE: WindowSize = { width: 1280, height: 800 };

/**
 * A window asked for NxM under a bare Xvfb comes back as (N-1)x(M-1) — there is no window manager
 * to grant the last pixel. Tolerate that; the failures worth catching are an order of magnitude
 * larger (a default-sized or DevTools-squeezed window reports 469 or 725).
 */
export const WINDOW_SIZE_TOLERANCE_PX = 8;

/**
 * Fail loudly when the real OS window does not match what the spec declared.
 *
 * Reads `outerWidth`/`outerHeight`, never `innerWidth`/`innerHeight`: `setViewportSize()` on a
 * CDP-attached page applies an emulation override that sets `innerWidth`, so an inner-based check
 * reads back its own request and can never fail. Measured: a 1024px window reports `innerWidth` 469
 * before such a call and 1280 after, while `outerWidth` stays 1024.
 */
export async function assertDeclaredWindowSize(
  page: Page,
  declared: WindowSize,
  howToFix: string,
): Promise<void> {
  const actual = await page.evaluate(() => ({
    width: window.outerWidth,
    height: window.outerHeight,
  }));
  if (
    actual.width < declared.width - WINDOW_SIZE_TOLERANCE_PX ||
    actual.height < declared.height - WINDOW_SIZE_TOLERANCE_PX
  ) {
    throw new Error(
      `e2e precondition: this spec declares a ${declared.width}x${declared.height} window but the ` +
        `Electron window is ${actual.width}x${actual.height}. Layout-sensitive assertions would run ` +
        `against a window the spec was not written for, and screenshots would be cropped. ${howToFix}`,
    );
  }
}

/**
 * Resize the first window of a freshly launched Electron app and confirm the OS honoured it.
 *
 * Retried: `BrowserWindow.setSize` returns before the renderer's `outerWidth`/`outerHeight` reflect
 * the new size, so a single read after it can race the resize and report a size that has not
 * settled yet.
 */
export async function applyDeclaredWindowSize(
  electronApp: ElectronApplication,
  page: Page,
  size: WindowSize,
  howToFix: string,
): Promise<void> {
  await electronApp.evaluate(({ BrowserWindow }, declared) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      if (win.isMaximized()) win.unmaximize();
      win.setSize(declared.width, declared.height);
    }
  }, size);
  await expect(async () => {
    await assertDeclaredWindowSize(page, size, howToFix);
  }).toPass({ timeout: 15_000 });
}

/** The two interface modes a spec can require. Mirrors `SettingTypes['platform.interfaceMode']`. */
export type RequiredInterfaceMode = 'simple' | 'power';

/**
 * Fail loudly when the running app is not in the interface mode the spec was written for.
 *
 * A launch-mode spec pins the mode before starting its own app. An attach-mode spec cannot: it
 * drives an app someone else started, whose mode is whatever the shared
 * `dev-appdata/data/settings.json` last held — and that file keeps a pin from any run that was
 * killed before its teardown restored it. The two modes render genuinely different layouts (Simple
 * has no Home tab and locks three columns; Power tabs everything), so a spec run in the wrong one
 * does not fail at the assertion it cares about. It fails much later, waiting for an element the
 * mode never renders, and reads as a timeout rather than as a setup problem.
 *
 * Read from `document.body[data-interface-mode]`, which the app sets from the live setting
 * (`app.component.tsx`) rather than from the settings file, so it reflects a mode changed at
 * runtime too.
 */
export async function assertInterfaceMode(
  page: Page,
  required: RequiredInterfaceMode,
  howToFix: string,
  timeoutMs = 30_000,
): Promise<void> {
  let actual: string | undefined;
  try {
    // Polled, not read once: the attribute is written by a React effect, so it is briefly absent
    // after the page exists. A single read would report 'unknown' for a correctly configured app
    // purely on timing.
    await expect
      .poll(
        async () => {
          actual =
            (await page.evaluate(() => document.body.getAttribute('data-interface-mode'))) ??
            undefined;
          return actual;
        },
        { timeout: timeoutMs },
      )
      .toBe(required);
  } catch (err) {
    // Rethrown rather than left as the poll's own assertion error, which reports the mismatch but
    // none of the context that makes it actionable. `cause` keeps whatever the poll actually threw
    // (e.g. the page's execution context being destroyed) attached, rather than replacing it wholesale
    // with a mismatch message that may not be what happened.
    throw new Error(
      `e2e precondition: this spec requires '${required}' interface mode, but the running app is in ` +
        `'${actual ?? 'unknown (the attribute is missing — the renderer may not have finished mounting)'}'. ` +
        `${howToFix} If you did not choose this mode, a killed e2e run probably left it behind: ` +
        `preConfigureSettings merges into the shared settings file and only restores in teardown.`,
      { cause: err },
    );
  }
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

  // Only for a FRESH profile. A relaunch into a preserved profile is deliberately continuing the
  // state its own earlier launch wrote — including whatever reference that launch ended on — so
  // re-pinning here would erase the very thing such a test exists to check.
  //
  // Remembered rather than re-derived below: the launch-failure paths must undo exactly what this
  // decided. `preserveUserDataDir` is a different option and does not track it — a chain's FIRST
  // launch passes `preserveUserDataDir: true` with no `userDataDir`, so it pins here while a guard
  // on `preserveUserDataDir` would refuse to restore.
  const pinnedAppGlobalState = !opts.userDataDir;
  if (pinnedAppGlobalState) pinAppGlobalState();

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
    // Keep DevTools out of the window so the renderer is the size the test asked for.
    // Docked DevTools eats ~555px of a 1280px window, leaving specs interacting with a dock
    // they were never sized for. Honored in src/main/main.ts.
    PT_NO_DEVTOOLS: process.env.PT_NO_DEVTOOLS ?? 'true',
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
    // A launch that never came up starts no chain, so there is nothing left to continue and the
    // developer's own state must go back.
    if (pinnedAppGlobalState) restoreAppGlobalState();
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
    // A launch that never came up starts no chain, so there is nothing left to continue and the
    // developer's own state must go back.
    if (pinnedAppGlobalState) restoreAppGlobalState();
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

  // After the app has closed, so its own shutdown writes cannot land on top of what is restored.
  // Reached only on the final teardown: a preserved profile returned above, leaving the pin in
  // place for the next launch in the chain.
  restoreAppGlobalState();
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
/**
 * The settings file the app reads at startup in development.
 *
 * Resolved on each call rather than captured once, so the unit tests covering the crash-recovery
 * logic below can point it at a temp directory. Without that they would have to exercise it against
 * the developer's real settings file — and a test that can eat your settings while proving settings
 * are not eaten is not worth the coverage.
 */
function settingsPath(): string {
  return (
    process.env.PT_E2E_SETTINGS_PATH ??
    path.resolve(__dirname, '../../dev-appdata/data/settings.json')
  );
}

/**
 * Where {@link preConfigureSettings} parks the developer's real settings while a test's overrides
 * are in place, so a run that dies before its restore can be undone by the NEXT run's global setup
 * rather than leaving test values on disk forever.
 */
function settingsBackupPath(): string {
  return `${settingsPath()}.e2e-backup`;
}

/**
 * Directory backing the MAIN process's `localStorage`.
 *
 * The main process has no browser `localStorage`, so it uses a polyfill
 * (`src/node/polyfills/local-storage.polyfill.ts`) that writes one file per key under `getAppDir()`
 * — the shared, gitignored `dev-appdata`. A renderer's `localStorage`, by contrast, lives inside
 * Electron's `--user-data-dir`, which every isolated launch creates fresh.
 *
 * That difference is the whole reason this pin exists: app-global state held in main (the scroll
 * group's reference, the theme) survives an app launch, so without a reset each test inherits
 * whatever reference the previous test — or the developer's own last session — left behind.
 *
 * Resolved per call so the tests covering this logic can point it at a temp directory.
 */
function mainLocalStorageDir(): string {
  return (
    process.env.PT_E2E_MAIN_LOCAL_STORAGE_DIR ??
    path.resolve(__dirname, '../../dev-appdata/local-storage/main')
  );
}

/** Where {@link pinAppGlobalState} parks the developer's real app-global state. */
function mainLocalStorageBackupDir(): string {
  return `${mainLocalStorageDir()}.e2e-backup`;
}

/** Names of the keys currently stored, or an empty array when the store does not exist yet. */
function storedKeyNames(dir: string): string[] {
  return fs.existsSync(dir) ? fs.readdirSync(dir) : [];
}

/**
 * Empty the main process's app-global storage for the duration of a run, parking the developer's
 * own values so they can be put back.
 *
 * The whole directory rather than a list of keys: what must not carry over is "app-global state the
 * main process persists outside the isolated user-data directory", and a named list silently stops
 * covering that the next time a service starts persisting something. Emptying it means a future
 * spec that seeds main-side storage before launch fails visibly instead of leaking quietly.
 *
 * Only the FIRST pin writes a backup, so a relaunch chain (which pins once and reads the state its
 * own earlier launch wrote) cannot overwrite the developer's values with test ones.
 *
 * @returns A function that restores what was parked. Safe to call when nothing was pinned.
 */
export function pinAppGlobalState(): () => void {
  const liveDir = mainLocalStorageDir();
  const backupDir = mainLocalStorageBackupDir();

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    storedKeyNames(liveDir).forEach((key) => {
      fs.copyFileSync(path.join(liveDir, key), path.join(backupDir, key));
    });
  }
  storedKeyNames(liveDir).forEach((key) => fs.rmSync(path.join(liveDir, key), { force: true }));

  return () => {
    restoreAppGlobalState();
  };
}

/**
 * Put back app-global state a previous run parked and never restored, and report which keys were
 * recovered.
 *
 * Called both at teardown and from global setup, because a run killed mid-flight leaves the
 * developer's scroll position and theme emptied out until something puts them back.
 *
 * An absent store and an empty one are treated alike: the polyfill recreates the directory on
 * demand, so leaving an empty one behind changes nothing.
 *
 * @returns The recovered key names, or undefined when there was nothing to restore. Names only —
 *   the values are the developer's own state, not something to print.
 */
export function restoreAppGlobalState(): string[] | undefined {
  const liveDir = mainLocalStorageDir();
  const backupDir = mainLocalStorageBackupDir();
  if (!fs.existsSync(backupDir)) return undefined;

  storedKeyNames(liveDir).forEach((key) => fs.rmSync(path.join(liveDir, key), { force: true }));
  const recovered = storedKeyNames(backupDir);
  if (recovered.length > 0) fs.mkdirSync(liveDir, { recursive: true });
  recovered.forEach((key) => {
    fs.copyFileSync(path.join(backupDir, key), path.join(liveDir, key));
  });
  fs.rmSync(backupDir, { recursive: true, force: true });
  return recovered.length > 0 ? recovered : undefined;
}

/**
 * What the backup file holds: whether a settings file existed before the first pin, and its exact
 * bytes if it did.
 *
 * Recorded as a shape rather than a sentinel because "no settings file" and "an empty settings
 * file" are different states that must restore differently, and any string sentinel conflates
 * them.
 */
interface SettingsBackup {
  existed: boolean;
  contents?: string;
}

/** Read the backup, tolerating one written before it carried a shape. */
function readSettingsBackup(): SettingsBackup {
  const raw = fs.readFileSync(settingsBackupPath(), 'utf-8');
  try {
    // JSON.parse returns `any`; asserting the shape this function itself writes
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const parsed = JSON.parse(raw) as SettingsBackup;
    if (typeof parsed?.existed === 'boolean') return parsed;
  } catch {
    // Not our shape — fall through to the raw-contents reading below.
  }
  // A backup left by an earlier version stored the file's contents directly, with '' meaning
  // "there was no file". Honour that rather than discarding a developer's settings.
  return raw === '' ? { existed: false } : { existed: true, contents: raw };
}

/**
 * Undo a settings pin left behind by a run that never reached its teardown, and report which
 * settings it found. Safe to call when there is nothing to restore.
 *
 * The restore returned by `preConfigureSettings` only runs in an `afterAll`, so Ctrl+C, a killed
 * worker, or a crashed run all leave the pinned values in the shared settings file. The three
 * multi-window specs pin `interfaceMode: 'power'`, so the usual symptom is an unrelated suite
 * silently running in the wrong interface mode days later. CI never sees any of this — it starts
 * from a fresh checkout with no `dev-appdata/` at all — which is what makes it present as "green in
 * CI, red for me".
 *
 * @returns The top-level keys of the file that was left behind, or `undefined` when there was
 *   nothing to undo. Keys rather than contents: that file holds the developer's real settings too,
 *   including registration details, and the diagnostic question is only ever WHICH settings
 *   leaked.
 */
export function restoreLeakedSettings(): string[] | undefined {
  if (!fs.existsSync(settingsBackupPath())) return undefined;

  let leakedKeys: string[] = [];
  if (fs.existsSync(settingsPath())) {
    try {
      // JSON.parse returns `any`; the settings file is a flat key-value object
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const leaked = JSON.parse(fs.readFileSync(settingsPath(), 'utf-8')) as Record<
        string,
        unknown
      >;
      leakedKeys = Object.keys(leaked);
    } catch {
      leakedKeys = ['(unparsable settings file)'];
    }
  }

  const backup = readSettingsBackup();
  if (backup.existed) fs.writeFileSync(settingsPath(), backup.contents ?? '');
  else fs.rmSync(settingsPath(), { force: true });
  fs.rmSync(settingsBackupPath(), { force: true });
  return leakedKeys;
}

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
  const settingsDir = path.dirname(settingsPath());
  let originalContents: string | undefined;
  let existing: Record<string, unknown> = {};
  if (fs.existsSync(settingsPath())) {
    originalContents = fs.readFileSync(settingsPath(), 'utf-8');
    try {
      // JSON.parse returns `any`; asserting the known shape of the settings file
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      existing = JSON.parse(originalContents) as Record<string, unknown>;
    } catch {
      // Corrupt file — start fresh with only the overrides
    }
  }
  fs.mkdirSync(settingsDir, { recursive: true });
  // Park the original on disk BEFORE overwriting it. The returned restore only runs in an
  // `afterAll`, so anything that kills the run first would otherwise leave the overrides in the
  // developer's file permanently. With the backup present, the next run's global setup undoes it.
  //
  // Only the FIRST pin writes it. A second pin taken while the first is still active would
  // otherwise back up the already-pinned file, and a crash after that would "recover" the first
  // pin's values as though they were the developer's own — laundering the very leak this exists to
  // close, under a reassuring recovery message. The earliest original is the only correct one, so
  // whoever wrote the backup is also the only one allowed to remove it.
  const createdBackup = !fs.existsSync(settingsBackupPath());
  if (createdBackup) {
    const backup: SettingsBackup =
      originalContents !== undefined
        ? { existed: true, contents: originalContents }
        : { existed: false };
    fs.writeFileSync(settingsBackupPath(), JSON.stringify(backup));
  }
  fs.writeFileSync(settingsPath(), JSON.stringify({ ...existing, ...overrides }));

  return () => {
    if (originalContents !== undefined) fs.writeFileSync(settingsPath(), originalContents);
    else fs.rmSync(settingsPath(), { force: true });
    if (createdBackup) fs.rmSync(settingsBackupPath(), { force: true });
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
/**
 * Escape a value for use inside an XML attribute.
 *
 * Needed because one caller feeds in the machine's registered Paratext display name, which is free
 * text a person chose. ParatextData parses the result with `XmlSerializer`, which throws on
 * malformed XML rather than degrading — so an unescaped quote or ampersand in a real name would
 * fail every comment spec on that machine with a corrupt-XML error naming nothing relevant.
 */
function xmlEscapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function addUsersToProject(projectDir: string, users: string[]): void {
  const userEntries = users
    .map(
      (name) =>
        `  <User UserName="${xmlEscapeAttribute(name)}" FirstUser="false" UnregisteredUser="false">
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
 * Wait for the Platform.Bible UI to be fully ready beyond just React mounting. Waits for the
 * platform-dock layout to appear, then for a renderer to finish registering every window-scoped
 * shard the main process routes a command to (the dock can render before that async work
 * completes), and finally for the full-screen initialization overlay to clear. The overlay lingers
 * while async services (settings, theme) finish initializing — it must be gone before tests
 * interact with the UI.
 */
export async function waitForAppReady(page: Page, timeout = 90_000): Promise<void> {
  const start = Date.now();
  await page.waitForSelector('div[class*="dock-layout"]', {
    state: 'attached',
    timeout,
  });
  // Waited on together: the renderer starts them together too, so they arrive within a poll of one
  // another and waiting one after another would spend the timeout budget several times over
  const remainingForShards = Math.max(1000, timeout - (Date.now() - start));
  await Promise.all(
    SCOPED_SHARD_METHODS.map((scopedShardMethod) =>
      waitForPapiMethodRegistered(scopedShardMethod, DEFAULT_WEBSOCKET_PORT, remainingForShards),
    ),
  );
  const remainingForOverlay = Math.max(1000, timeout - (Date.now() - start));
  // Services like settings and theme finish async work after the dock layout mounts and the shards
  // register, so the overlay can outlast both earlier signals.
  await waitForOverlayGone(page, remainingForOverlay);
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
