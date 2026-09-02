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
 * The settings service is exposed as a data-provider network object — data providers append a
 * `-data` suffix to the provider name, so the JSON-RPC method is `object:<providerName>-data.get`.
 */
const SETTINGS_GET_METHOD = 'object:platform.settingsServiceDataProvider-data.get';

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
 * Fail loudly when the real OS window is SMALLER than what the spec declared.
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
 * What this asserts is that the app IS in the requested mode — which is what a spec's layout
 * depends on — and NOT that any particular pin is what put it there. For `'power'` the two amount
 * to the same thing, since nothing else produces it. For `'simple'` they do not: `get()` falls back
 * to the contributed default when the key is absent (`core-settings-info.data.ts`), and that
 * default is `'simple'`, so an app that was never pinned at all satisfies this check. That is the
 * right answer to "can this suite's layout work here", and the wrong one to "did my seed land" — do
 * not read a passing `'simple'` assertion as proof of the latter.
 *
 * A launch-mode spec pins the mode before starting its own app. An attach-mode spec cannot: it
 * drives an app someone else started, whose mode is whatever the shared
 * `dev-appdata/data/settings.json` last held — and that file keeps a pin from any run that was
 * killed before its teardown restored it. The two modes render genuinely different layouts (Simple
 * has no Home tab and locks three columns; Power tabs everything), so a spec run in the wrong one
 * does not fail at the assertion it cares about. It fails much later, waiting for an element the
 * mode never renders, and reads as a timeout rather than as a setup problem.
 *
 * Reads `platform.interfaceMode` from the settings service directly over PAPI, not from
 * `document.body[data-interface-mode]` (the renderer's own reflection of the same setting). That
 * attribute has a seeded phase: `useInterfaceMode()` renders `readCachedInterfaceMode() ??
 * 'simple'` synchronously, before its own async settings round-trip resolves — so polling it for
 * `'simple'` can pass on the seed alone, before the pin could possibly have been read yet, and
 * never actually exercises the check. The `'power'` branch is not affected, because the seed only
 * ever reads `'simple'`. The settings service has no equivalent seeded phase to race: its data
 * provider is registered (and thus reachable at all) only once its own settings-file read has
 * already resolved (`settings.service-host.ts`'s `initialize()` constructs the engine from an
 * already-awaited file read), so `get()` is always either unreachable — handled by the same
 * registration poll every other PAPI helper here uses — or already authoritative. It is also still
 * live, not a launch-time snapshot: `set()` updates the same in-memory value `get()` reads, so a
 * mode changed at runtime is reflected too, same as the attribute was.
 *
 * Takes no `page`: `platform.interfaceMode` is one app-wide setting, not per-window, so which
 * window's PAPI connection asks is irrelevant — every one of them would get the same answer.
 *
 * Called from fixture setup, BEFORE any `waitForAppReady` — the fixtures do not call that; the
 * specs do. So this is waiting on the settings data provider in the extension host at the slowest
 * point of a launch, which is why its default budget is sized against the other readiness waits
 * rather than against a normal PAPI round trip. A caller that knows its machine is slow should pass
 * a larger one rather than let this be the tightest wait in the sequence.
 */
export async function assertInterfaceMode(
  required: RequiredInterfaceMode,
  howToFix: string,
  timeoutMs = 60_000,
): Promise<void> {
  const start = Date.now();
  let actual: string | undefined;
  let lastReadError: unknown;
  try {
    const remainingForRegistration = Math.max(1000, timeoutMs - (Date.now() - start));
    await waitForPapiMethodRegistered(SETTINGS_GET_METHOD, undefined, remainingForRegistration);
    // Polled, not read once: `set()` calls (including our own pin) are async too, so a single read
    // right as the provider registers can still race a write that landed a moment later.
    await expect
      .poll(
        async () => {
          const remainingForGet = Math.max(1000, timeoutMs - (Date.now() - start));
          try {
            actual = await sendPapiRequestOnce<string | undefined>(
              SETTINGS_GET_METHOD,
              ['platform.interfaceMode'],
              undefined,
              remainingForGet,
            );
          } catch (error) {
            // Playwright evaluates this generator OUTSIDE the try/catch that retries a failed
            // match, so letting a rejection escape ends the poll on its first attempt instead of
            // polling. A transient socket error or a request that outran its own share of the
            // budget would then fail every test in the suite at fixture setup, reporting that the
            // settings service was never reachable moments after it was proved reachable.
            lastReadError = error;
            actual = undefined;
          }
          return actual;
        },
        { timeout: Math.max(1000, timeoutMs - (Date.now() - start)) },
      )
      .toBe(required);
  } catch (err) {
    // Rethrown rather than left as the poll's own assertion error, which reports the mismatch but
    // none of the context that makes it actionable. `cause` keeps whatever the poll actually threw
    // (e.g. a PAPI request timeout) attached, rather than replacing it wholesale with a mismatch
    // message that may not be what happened.
    throw new Error(
      `e2e precondition: this spec requires '${required}' interface mode, but the running app is in ` +
        `'${actual ?? unreachableDescription(lastReadError)}'. ` +
        `${howToFix} If you did not choose this mode, a killed e2e run probably left it behind: ` +
        `preConfigureSettings merges into the shared settings file and only restores in teardown.`,
      { cause: lastReadError ?? err },
    );
  }
}

/** How to describe a mode that could not be read, naming the last failure when there was one. */
function unreachableDescription(lastReadError: unknown): string {
  if (lastReadError === undefined)
    return 'unknown (the settings service never became reachable — the renderer may not have finished mounting)';
  const reason = lastReadError instanceof Error ? lastReadError.message : String(lastReadError);
  return `unknown (every read of the settings service failed; the last said: ${reason})`;
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
  // re-pinning here would erase the very thing such a test exists to check. The launch-failure
  // paths below restore unconditionally regardless of this — see their own comment for why.
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
    // Unconditional, not gated on whether THIS call pinned: restoreAppGlobalState() is a safe
    // no-op when nothing is pinned, and a relaunch chain's LATER launch failing must still restore
    // the EARLIER launch's still-active pin — nothing else ever will, since that responsibility
    // was riding on a successful teardown this failure just prevented.
    restoreAppGlobalState();
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
    // See the matching comment above: unconditional and safe either way.
    restoreAppGlobalState();
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
  return waitForProjectMetadata(() => true, 'any project', port, timeoutMs);
}

/**
 * Wait until project lookup reports a project the caller can name.
 *
 * "At least one project" is not the same precondition as "the project this spec is about". Projects
 * register in whatever order their PDP factories come up, and a non-scripture project routinely
 * registers first — so a spec that waits for a non-empty list and then opens a SPECIFIC project by
 * id can proceed before that project exists, and fails later on something that looks unrelated.
 *
 * @param matches Predicate identifying the project the caller needs.
 * @param description How to name that project if it never arrives, e.g. "the sample WEB project".
 */
export async function waitForProjectMetadata(
  matches: (project: { id?: string }) => boolean,
  description: string,
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
      const result = await sendPapiRequestOnce<({ id?: string } | undefined)[]>(
        PROJECT_LOOKUP_GET_ALL_PROJECTS_METHOD,
        [],
        port,
        Math.min(10_000, Math.max(1000, remaining)),
      );
      if (Array.isArray(result) && result.some((project) => matches(project ?? {}))) return;
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
    `Project lookup did not report ${description} within ${timeoutMs}ms (PDP factories may not be registered).`,
  );
}

/** Who wrote a backup, from this process's point of view. */
type BackupOwner = 'ours' | 'orphaned' | 'live';

/**
 * Whether a process is still running.
 *
 * EPERM counts as ALIVE. The signal was refused, which only happens for a process that exists — on
 * Windows, and for a pid owned by another user. Reading that as dead is the dangerous direction,
 * because every caller uses this to decide whether destroying a developer's files is safe.
 */
export function isPidAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // `catch` binds `unknown`; reading `.code` is the only way to tell EPERM from ESRCH
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
}

/**
 * Who owns a backup: this process, nobody (the run that wrote it is gone), or a run still going.
 *
 * Recovery is deliberately best-effort. A pid is the only ownership signal Node can read portably,
 * and pids are recycled, so a backup whose owner's pid has since been reused reads as `live` and is
 * left alone. That is the fail-closed direction: the cost is a backup the developer restores by
 * hand, never files destroyed underneath a running app.
 */
export function classifyBackupOwner(ownerPid: number): BackupOwner {
  if (ownerPid === process.pid) return 'ours';
  return isPidAlive(ownerPid) ? 'live' : 'orphaned';
}

/**
 * Write a file so no reader can ever observe it half-written.
 *
 * `writeFileSync` truncates before it writes, so an interrupt inside that window leaves a zero-byte
 * or partial file behind. Renaming a fully-written temporary file over the target is atomic within
 * a filesystem, so a reader sees either the previous contents or the complete new ones.
 *
 * The temp path carries the writing process's pid. A shared `${filePath}.tmp` would let two
 * processes writing the same target each overwrite the other's temp file before either renames, so
 * one rename could install the other's contents under a path it believes is its own. Within a
 * process the writes are synchronous, so the pid alone is enough to keep them apart.
 */
function writeFileAtomic(filePath: string, contents: string): void {
  const tempPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, contents);
  fs.renameSync(tempPath, filePath);
}

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

/**
 * Names of the keys currently stored, or an empty array when the store does not exist yet.
 *
 * Files only. A directory here would make `copyFileSync` throw part-way through a backup that has
 * already been created, and every later run would then treat that half-copied backup as complete.
 */
function storedKeyNames(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
}

/** Where {@link pinAppGlobalState} records who took the pin and what it parked. */
function mainLocalStorageBackupManifestPath(): string {
  return `${mainLocalStorageDir()}.e2e-backup.json`;
}

/**
 * What the app-global backup records. Kept beside the backup directory rather than inside it, so
 * the directory holds nothing but parked keys.
 */
interface AppGlobalBackup {
  ownerPid: number;
  createdAt: string;
  /** The keys parked. Empty is meaningful: it says the store was empty when the pin was taken. */
  pinnedKeys: string[];
}

/** Read the manifest, or `undefined` when it is absent, unreadable, or predates this format. */
function readAppGlobalBackup(): AppGlobalBackup | undefined {
  if (!fs.existsSync(mainLocalStorageBackupManifestPath())) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(mainLocalStorageBackupManifestPath(), 'utf-8'));
  } catch {
    return undefined;
  }
  // JSON.parse returns `any`; this narrows the shape this file's own writer produces
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const manifest = parsed as Partial<AppGlobalBackup> | null;
  if (typeof manifest?.ownerPid !== 'number') return undefined;
  if (!Array.isArray(manifest.pinnedKeys)) return undefined;
  return {
    ownerPid: manifest.ownerPid,
    createdAt: manifest.createdAt ?? '',
    pinnedKeys: manifest.pinnedKeys,
  };
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

  const createdBackup = !fs.existsSync(backupDir);
  if (createdBackup) {
    fs.mkdirSync(backupDir, { recursive: true });
    const parked = storedKeyNames(liveDir);
    parked.forEach((key) => {
      fs.copyFileSync(path.join(liveDir, key), path.join(backupDir, key));
    });
    // The manifest is what makes an empty backup meaningful. Without it, "the store was empty when
    // we pinned" and "there is no backup" are the same empty directory, and the second reading
    // empties the store for real.
    writeFileAtomic(
      mainLocalStorageBackupManifestPath(),
      JSON.stringify({
        ownerPid: process.pid,
        createdAt: new Date().toISOString(),
        pinnedKeys: parked,
      }),
    );
  }
  // Empty the store ONLY when something can put it back: either this call just parked it, or the
  // standing backup is one this process took and can still restore. A backup directory left by a
  // run that died before writing its manifest exists but says nothing, so every later pin would
  // park nothing and — without this guard — empty the store anyway, permanently, on every run. Same
  // for a backup another live run owns: we can neither park nor restore, so emptying is pure loss.
  const standing = readAppGlobalBackup();
  const canRestoreWhatWeEmpty =
    createdBackup || (standing !== undefined && classifyBackupOwner(standing.ownerPid) === 'ours');
  if (canRestoreWhatWeEmpty)
    storedKeyNames(liveDir).forEach((key) => fs.rmSync(path.join(liveDir, key), { force: true }));
  else
    console.warn(
      `Leaving ${liveDir} as it is: ${mainLocalStorageBackupDir()} stands but this run cannot ` +
        'restore it, so emptying the store would discard state nothing could put back. A launch ' +
        'may therefore inherit app-global state from the developer or from an earlier run.',
    );

  return () => {
    // Only the call that wrote the backup may undo it. A relaunch chain pins more than once, and a
    // later launch's teardown restoring the standing pin would hand the chain's next launch a
    // restored store with nothing left to undo what it writes.
    if (createdBackup) restoreAppGlobalState();
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
  if (!fs.existsSync(backupDir) && !fs.existsSync(mainLocalStorageBackupManifestPath()))
    return undefined;

  const manifest = readAppGlobalBackup();
  if (manifest === undefined) {
    console.warn(
      `Leaving ${backupDir} alone: it has no readable record of which run took it. Nothing was ` +
        'restored and nothing was deleted — inspect it by hand.',
    );
    return undefined;
  }
  if (classifyBackupOwner(manifest.ownerPid) === 'live') {
    console.warn(
      `Leaving ${backupDir} alone: process ${manifest.ownerPid} still owns it, so another run is ` +
        'using these files. To recover by hand once that run has ended, move the files in that ' +
        'directory back beside it and delete the directory.',
    );
    return undefined;
  }

  // Read what goes back BEFORE emptying anything, so a backup that turns out to hold nothing cannot
  // cost the developer the store it was supposed to protect.
  const parked = storedKeyNames(backupDir);

  // Clearing what is live is only safe when THIS process pinned: then the extra keys are its own
  // run's output. For a backup recovered from a run that has died, keys accumulated since cannot be
  // told from run output, and the developer's are the ones at stake — so restore over the top and
  // leave the rest, which is untidy but never destructive.
  if (classifyBackupOwner(manifest.ownerPid) === 'ours')
    storedKeyNames(liveDir).forEach((key) => fs.rmSync(path.join(liveDir, key), { force: true }));

  if (parked.length > 0) fs.mkdirSync(liveDir, { recursive: true });
  parked.forEach((key) => {
    fs.copyFileSync(path.join(backupDir, key), path.join(liveDir, key));
  });
  fs.rmSync(backupDir, { recursive: true, force: true });
  fs.rmSync(mainLocalStorageBackupManifestPath(), { force: true });
  // The parked names, even when empty: an empty pin is a recovery that restored nothing, which is a
  // different thing from having found no backup, and global setup reports them differently.
  return manifest.pinnedKeys;
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
  /** The process that took the pin. See {@link classifyBackupOwner}. */
  ownerPid: number;
  createdAt: string;
  existed: boolean;
  contents?: string;
  /** The keys the pin wrote, so a restore can undo exactly those and nothing else. */
  pinnedKeys: string[];
}

/**
 * Parse a settings-shaped JSON object, or an empty object when it is absent or unreadable.
 *
 * Unreadable maps to empty rather than throwing: the callers below are recovery paths, and a
 * recovery that dies on a corrupt file leaves the developer worse off than one that treats it as
 * having nothing to preserve.
 */
function parseSettingsObject(raw: string | undefined): Record<string, unknown> {
  if (raw === undefined) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || !parsed || Array.isArray(parsed)) return {};
    // Narrowed directly above to a non-null, non-array object, which is the settings file's shape
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return parsed as Record<string, unknown>;
  } catch {
    return {};
  }
}

/** Whether two settings objects hold the same keys with the same values, regardless of key order. */
function sameSettings(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every(
    (key, index) => bKeys[index] === key && JSON.stringify(a[key]) === JSON.stringify(b[key]),
  );
}

/**
 * Read the backup, or `undefined` when it cannot be trusted.
 *
 * All-or-nothing on purpose. A backup that does not parse, or that carries no owner, is a backup we
 * cannot reason about — a torn write, or one written before backups recorded who took them. The
 * only safe reading of "I do not understand this file" is to change nothing: guessing at its
 * meaning is how a truncated backup ends up written into the developer's settings verbatim.
 */
function readSettingsBackup(): SettingsBackup | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(settingsBackupPath(), 'utf-8'));
  } catch {
    return undefined;
  }
  // JSON.parse returns `any`; this narrows the shape this function's own writer produces
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const backup = parsed as Partial<SettingsBackup> | null;
  if (typeof backup?.ownerPid !== 'number') return undefined;
  if (typeof backup.existed !== 'boolean') return undefined;
  if (!Array.isArray(backup.pinnedKeys)) return undefined;
  // Rebuilt field by field rather than asserted: the checks above narrow each one, and building the
  // result is what makes that narrowing something the compiler can see.
  return {
    ownerPid: backup.ownerPid,
    createdAt: backup.createdAt ?? '',
    existed: backup.existed,
    ...(backup.contents !== undefined ? { contents: backup.contents } : {}),
    pinnedKeys: backup.pinnedKeys,
  };
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

  const backup = readSettingsBackup();
  if (backup === undefined) {
    console.warn(
      `Leaving ${settingsBackupPath()} alone: it is unreadable, or predates backups recording ` +
        'which run took them. Nothing was restored and nothing was deleted — inspect it by hand.',
    );
    return undefined;
  }
  if (classifyBackupOwner(backup.ownerPid) === 'live') {
    console.warn(
      `Leaving ${settingsBackupPath()} alone: process ${backup.ownerPid} still owns it, so another ` +
        'run is using these files. To recover by hand once that run has ended, delete the backup ' +
        'file and restore its `contents` into the settings file.',
    );
    return undefined;
  }
  // Undo the keys the pin wrote, and nothing else. The file on disk is not necessarily test
  // residue: a run can die and then sit unrecovered for days while the developer keeps using the
  // app, so anything outside the pinned keys is theirs and has to survive this.
  const reconciled = parseSettingsObject(
    fs.existsSync(settingsPath()) ? fs.readFileSync(settingsPath(), 'utf-8') : undefined,
  );
  const original = backup.existed ? parseSettingsObject(backup.contents) : {};
  backup.pinnedKeys.forEach((key) => {
    if (key in original) reconciled[key] = original[key];
    else delete reconciled[key];
  });

  // Only remove the file if this pin is what brought it into existence and undoing the pin has left
  // nothing behind — otherwise writing it back is what preserves the developer's own settings.
  if (!backup.existed && Object.keys(reconciled).length === 0)
    fs.rmSync(settingsPath(), { force: true });
  // When undoing the pin lands exactly on what was there before, put the original bytes back rather
  // than a re-serialized equivalent: an empty file and `{}` are different states, and re-encoding
  // would also churn the developer's formatting for no reason.
  else if (backup.existed && sameSettings(reconciled, original))
    fs.writeFileSync(settingsPath(), backup.contents ?? '');
  else fs.writeFileSync(settingsPath(), JSON.stringify(reconciled));

  fs.rmSync(settingsBackupPath(), { force: true });
  // The keys the killed run PINNED, not every key in the file. The file also holds the developer's
  // own settings — registration details among them — and naming those as settings a test "left
  // behind" is both wrong and alarming to read.
  return backup.pinnedKeys;
}

/**
 * Merge the given key-value pairs into the dev-appdata settings file before launching the app.
 * Preserves any existing settings (e.g. `platform.verseRef`) so the app session starts from the
 * developer's saved state plus the overrides.
 *
 * Must be called BEFORE `launchElectronApp` so the app reads the correct values at startup. That is
 * also why this is the right way to pre-configure locale and interface mode: setting them at
 * startup avoids the mid-session locale reload path, which sequentially reloads every open
 * WebView.
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
    const backup: SettingsBackup = {
      ownerPid: process.pid,
      createdAt: new Date().toISOString(),
      existed: originalContents !== undefined,
      ...(originalContents !== undefined ? { contents: originalContents } : {}),
      pinnedKeys: Object.keys(overrides),
    };
    writeFileAtomic(settingsBackupPath(), JSON.stringify(backup));
  } else {
    // A pin taken while an earlier one still stands writes keys the earlier backup never recorded.
    // The earliest original stays the only correct one, but the record of WHICH keys the run wrote
    // has to grow, or the restore below leaves this pin's keys behind as though they were the
    // developer's.
    const standing = readSettingsBackup();
    if (standing === undefined)
      // Refuse rather than pin. The standing backup cannot be read, so recovery will decline to act
      // on it — and anything pinned now would sit in the developer's real settings until they
      // intervened by hand. Failing here costs a run; pinning anyway costs them their settings.
      throw new Error(
        `Refusing to pin settings: the backup at ${settingsBackupPath()} cannot be read, so this ` +
          'pin could not be undone by this run or recovered by the next. Inspect that file and ' +
          'remove it once you are satisfied nothing in it is yours.',
      );
    const pinnedKeys = [...new Set([...standing.pinnedKeys, ...Object.keys(overrides)])];
    writeFileAtomic(settingsBackupPath(), JSON.stringify({ ...standing, pinnedKeys }));
  }
  fs.writeFileSync(settingsPath(), JSON.stringify({ ...existing, ...overrides }));

  return () => {
    if (originalContents !== undefined) fs.writeFileSync(settingsPath(), originalContents);
    else fs.rmSync(settingsPath(), { force: true });
    if (createdBackup) fs.rmSync(settingsBackupPath(), { force: true });
  };
}

/**
 * Path to the platform-scripture extension's persisted recently-opened-projects list.
 * `papi.storage`'s user-data files are named for the base64 of the storage key with padding
 * stripped, so this is `recentlyOpenedProjects` encoded — see
 * `RECENTLY_OPENED_PROJECTS_STORAGE_KEY` in
 * `extensions/src/platform-scripture/src/recently-opened-projects.service.ts`.
 */
const DEV_APPDATA_RECENT_PROJECTS_PATH = path.resolve(
  __dirname,
  '../../dev-appdata/extensions/platformScripture/user-data/cmVjZW50bHlPcGVuZWRQcm9qZWN0cw',
);

/**
 * Replaces the persisted recently-opened-projects list before the app launches.
 *
 * SIMPLE-MODE TESTS NEED THIS. Simple mode auto-fills its empty Scripture editor slot with the
 * first project from this list that will open (`openDefaultActiveProjectIfApplicable` in
 * `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts`). That open is
 * asynchronous and slow — it can land AFTER a test has opened its own project, replacing the editor
 * tab and re-pointing every Column 3 panel at the auto-opened project. Left alone the list holds
 * whatever the developer last opened, so which project wins is a coin flip. Naming the project the
 * test wants makes the auto-open agree with the test's own open, so it no longer matters which
 * lands first.
 *
 * Must be called BEFORE `launchElectronApp`.
 *
 * @param projectIds Project ids, most recent first. An empty list leaves the picker nothing to open
 *   from recents, so it falls through to Send/Receive's shared projects.
 * @returns A restore function that writes the file back to its exact pre-call contents (or deletes
 *   it if it did not exist). Call it AFTER the app has closed — the app rewrites this file whenever
 *   a project is opened.
 */
export function preConfigureRecentlyOpenedProjects(projectIds: string[]): () => void {
  let originalContents: string | undefined;
  if (fs.existsSync(DEV_APPDATA_RECENT_PROJECTS_PATH))
    originalContents = fs.readFileSync(DEV_APPDATA_RECENT_PROJECTS_PATH, 'utf-8');

  fs.mkdirSync(path.dirname(DEV_APPDATA_RECENT_PROJECTS_PATH), { recursive: true });
  fs.writeFileSync(DEV_APPDATA_RECENT_PROJECTS_PATH, JSON.stringify(projectIds));

  return () => {
    if (originalContents !== undefined)
      fs.writeFileSync(DEV_APPDATA_RECENT_PROJECTS_PATH, originalContents);
    else fs.rmSync(DEV_APPDATA_RECENT_PROJECTS_PATH, { force: true });
  };
}

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
 * WORKAROUND for an app-level race, not a fix for it. Click past the first-run gate (PT-4175) if it
 * is still showing despite `platform.firstRunComplete` being pinned before launch.
 *
 * The pin is a file write that lands before Electron starts, but the renderer's own read of it at
 * boot — `src/renderer/services/first-run-store.ts`'s `resolveInternal()` — is a separate, later
 * async round-trip, and on a slow/cold CI runner (observed on Windows, occasionally macOS) that
 * round-trip can resolve to `undefined` rather than `true` if it lands before the settings service
 * has finished loading the file. When that happens, the app falls back to treating first-run as
 * incomplete, probes local registration validity, and renders the gate — a full-screen modal that
 * aria-hides the rest of the app and intercepts pointer events. A test proceeding past it then
 * fails on whatever it clicks next with a generic timeout that gives no hint the gate is why: the
 * locator it clicked can even resolve to a real, visible, enabled element (the app underneath is
 * still there) while Playwright's actionability check keeps failing because the gate's overlay is
 * covering the click point.
 *
 * The gate — `data-testid="first-run-dialog"` — mounts in the SAME initial React commit as
 * `dock-layout` (both are siblings rendered by `Main()`), showing a `'loading'` spinner until
 * resolution settles, so waiting for it to become not-visible is meaningful from the very first
 * paint, not a check that can spuriously pass before React has rendered anything. `dock-layout`
 * being merely _attached_ is NOT that signal: it mounts regardless of the gate's status (confirmed
 * from a CI trace where dock-layout attached successfully while the gate was still blocking
 * clicks), which is why this checks the gate directly rather than piggy-backing on the earlier
 * dock-layout wait above.
 *
 * This tells three states apart. The gate clearing is the normal path — resolution settles and the
 * brief `'loading'` flash goes. The "continue without finishing setup" button appearing means the
 * resolve is slow but recoverable: the app reveals that button itself once its startup probe runs
 * long (`REGISTRATION_SLOW_REVEAL_MS` in `first-run-overlay.component.tsx`, 15 s), so a budget
 * shorter than that can never see it. The setup wizard's stepper appearing means the gate is stuck
 * in the one state with no escape hatch at all — a registration that resolves as invalid routes
 * there (`first-run.reducer.ts` -> `startWizard`), and that branch renders no such button by design
 * — so this fails immediately naming the cause instead of waiting out a budget it cannot recover
 * from.
 *
 * Anything else within the budget is inconclusive and returns quietly, because this is a recovery
 * step: the readiness waits after it will fail with their own message if something is genuinely
 * wrong, and treating "I could not tell" as failure turned a merely slow start into a hard error.
 * That is the app's own intended remedy for a slow/stuck resolve, so using it here is low-risk —
 * but it treats the SYMPTOM. The real fix is closing the read race in `resolveInternal()` itself,
 * which is app onboarding code used by real users on slow machines, not just CI, and belongs in its
 * own reviewed change, not a tooling branch. If the warning below starts firing often, that is the
 * signal to do that work.
 *
 * Deliberately loud when it fires, with a stable, greppable tag: this is called from
 * `waitForAppReady`, which is about POST-first-run behaviour, never first-run itself (that is
 * `first-run-wizard.spec.ts`, which documents why it cannot call `waitForAppReady` at all), so
 * recovering silently here would hide a real, if rare, product-level race behind a passing test.
 *
 * Takes and respects a caller-supplied budget rather than its own fixed timeout, matching every
 * other step in `waitForAppReady`: a stuck gate that never resolves must not be allowed to run out
 * the clock on its own, independent 120 s wait on top of whatever the overall readiness budget
 * already spent getting here.
 */
/** What the gate is showing, once it is known to be showing something. */
interface StuckGateObservations {
  escapeHatchVisible: boolean;
  onErrorScreen: boolean;
}

/**
 * Decide what a stuck first-run gate needs, from what is on screen rather than from what was seen
 * first.
 *
 * The three states overlap in their signals: the error screen shows a heading, an alert AND an
 * escape hatch simultaneously. Racing "a hatch appeared" against "a heading appeared" therefore
 * reaches either answer for one app state, depending on which locator settles first — so the race
 * establishes only THAT the gate is stuck, and this decides what it is.
 */
export function decideStuckGateAction({
  escapeHatchVisible,
  onErrorScreen,
}: StuckGateObservations): 'recoverable' | 'wizard' | 'inconclusive' {
  // A way out is a way out, whichever branch offered it.
  if (escapeHatchVisible) return 'recoverable';
  // A heading with no alert beside it is the wizard, which offers no way out by design.
  if (!onErrorScreen) return 'wizard';
  // The error screen before its hatch has rendered: there IS a way out, just not yet. Naming this
  // the wizard would report the wrong cause.
  return 'inconclusive';
}

/**
 * Matches the first-run gate's ERROR screen and nothing else.
 *
 * Both the error screen and a wizard step can show a `role="alert"`, so its mere presence says
 * nothing. The difference is where it sits: the error screen puts the role on the container that
 * WRAPS the dialog's heading, while a wizard step reporting its own problem renders the alert as a
 * SIBLING of the shell's heading. Keying on presence alone therefore reads a stuck wizard as the
 * error screen — which does offer a way out — and lets it pass as merely slow.
 */
export const TOP_LEVEL_ERROR_SELECTOR = '[role="alert"]:has(h1)';

async function dismissStuckFirstRunGate(page: Page, timeout: number): Promise<void> {
  const start = Date.now();
  const firstRunDialog = page.getByTestId('first-run-dialog');
  const escapeHatch = page.getByRole('button', {
    name: /continue without (finishing setup|registration)/i,
  });
  // The wizard branch renders the setup shell and NO escape hatch, so it is the one stuck state
  // this cannot recover from — worth telling apart rather than waiting out.
  //
  // Told apart by what each branch always renders, never by a step control: the shell's
  // Next/Finish button is conditional on `canProceed !== undefined`
  // (first-run-shell.component.tsx), so any step that hides it would slip past a check looking for
  // it. The loading branch renders `role="status"` and no heading; the error branch renders a
  // heading AND `role="alert"`; the wizard renders a heading and neither.
  const dialogHeading = firstRunDialog.getByRole('heading', { level: 1 });
  const errorScreen = firstRunDialog.locator(TOP_LEVEL_ERROR_SELECTOR);

  // The race establishes only WHETHER the gate cleared or is stuck showing something; what it is
  // stuck on is decided afterwards, from the screen itself. Racing the discriminators against each
  // other would let one app state reach either answer depending on which locator settled first.
  //
  // Each leg swallows its own timeout so the race reports what it SAW rather than rejecting: a
  // rejection makes the gate's ordinary loading flash a hard failure whenever the remaining budget
  // is short, which is exactly when this is called.
  const settled = await Promise.race([
    firstRunDialog
      .waitFor({ state: 'hidden', timeout })
      .then(() => 'cleared' as const)
      .catch(() => 'inconclusive' as const),
    escapeHatch
      .waitFor({ state: 'visible', timeout })
      .then(() => 'stuck' as const)
      .catch(() => 'inconclusive' as const),
    dialogHeading
      .waitFor({ state: 'visible', timeout })
      .then(() => 'stuck' as const)
      .catch(() => 'inconclusive' as const),
  ]);

  if (settled === 'cleared') return;

  const action =
    settled === 'stuck'
      ? decideStuckGateAction({
          escapeHatchVisible: await escapeHatch.isVisible(),
          onErrorScreen: (await errorScreen.count()) > 0,
        })
      : 'inconclusive';

  if (action === 'wizard')
    throw new Error(
      'e2e precondition: the app started its first-run setup wizard, so the pin that should have ' +
        'skipped it did not take. Check that platform.firstRunComplete is seeded before launch — ' +
        "through the fixture's seedSettings option, not a preConfigureSettings call in a hook. " +
        'The wizard renders no "continue without finishing setup" button, by design, so nothing ' +
        'here can dismiss it.',
    );

  // Nothing recognisable within the budget, or an error screen that has not offered its way out
  // yet. Say nothing and let the readiness steps after this one fail with their own message: this
  // is a recovery, and guessing at an inconclusive state would turn a merely slow run into a
  // failure.
  if (action === 'inconclusive') return;

  // Stable "[e2e-first-run-gate-race]" tag: grep CI logs for it to count how often this actually
  // fires, independent of which test happened to hit it.
  console.warn(
    '[e2e-first-run-gate-race] The first-run gate was still showing despite ' +
      'platform.firstRunComplete being pinned before launch — clicking its "continue without ' +
      'finishing setup" escape hatch. This is a workaround for a slow-CI read race in ' +
      'first-run-store.ts, expected to be rare; if it recurs often, that race needs its own fix.',
  );
  await escapeHatch.click();
  const remainingForDismiss = Math.max(1000, timeout - (Date.now() - start));
  await expect(firstRunDialog).not.toBeVisible({ timeout: remainingForDismiss });
}

/**
 * Wait for the Platform.Bible UI to be fully ready beyond just React mounting. Waits for the
 * platform-dock layout to appear, then for a renderer to finish registering every window-scoped
 * shard the main process routes a command to (the dock can render before that async work
 * completes), then for the rare first-run-gate race to clear if it happened, and finally for the
 * full-screen initialization overlay to clear. The overlay lingers while async services (settings,
 * theme) finish initializing — it must be gone before tests interact with the UI.
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
  const remainingForFirstRunGate = Math.max(1000, timeout - (Date.now() - start));
  await dismissStuckFirstRunGate(page, remainingForFirstRunGate);
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
