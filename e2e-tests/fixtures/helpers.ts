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

  // Use an isolated user-data directory so the singleton instance lock does not
  // conflict with any already-running Platform.Bible instance.
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-e2e-'));

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
    // Only set if not already defined, so other E2E suites can override.
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
  // NodeJS is the ambient @types/node namespace; the strict staged-file lint
  // config has no node environment, so it cannot see the global.
  // eslint-disable-next-line no-undef
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
 */
export async function waitForPapiMethodRegistered(
  methodName: string,
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
      const result = await sendPapiRequestOnce<RpcDiscoverResult>(
        GET_METHODS,
        [],
        port,
        Math.min(10_000, Math.max(1000, remaining)),
      );
      if (result.methods?.some((m) => m.name === methodName)) return;
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
 * Wait for the Platform.Bible UI to be fully ready beyond just React mounting. Waits for the
 * platform-dock layout to appear, then for the dialog service to finish registering menu commands
 * like `platform.about` (the dock can render before that async work completes), and finally for the
 * full-screen initialization overlay to clear. The overlay lingers while async services (settings,
 * theme) finish initializing — it must be gone before tests interact with the UI.
 */
export async function waitForAppReady(page: Page, timeout = 90_000): Promise<void> {
  const start = Date.now();
  await page.waitForSelector('div[class*="dock-layout"]', {
    state: 'attached',
    timeout,
  });
  const remaining1 = Math.max(1000, timeout - (Date.now() - start));
  await waitForPapiMethodRegistered(PLATFORM_ABOUT_COMMAND, DEFAULT_WEBSOCKET_PORT, remaining1);
  const remaining2 = Math.max(1000, timeout - (Date.now() - start));
  // Services like settings and theme finish async work after dock-layout mounts and platform.about
  // registers, so the overlay can outlast both earlier signals.
  await waitForOverlayGone(page, remaining2);
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
