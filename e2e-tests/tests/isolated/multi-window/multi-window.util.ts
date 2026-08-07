/**
 * Shared helpers for the multi-window e2e specs (`multi-window.spec.ts` and
 * `window-layout-persistence.spec.ts`): Electron process output capture, PAPI wrappers for creating
 * windows and waiting for renderer registration, dock-content probes, and the graceful-quit pattern
 * that watches the OS process itself.
 *
 * Everything here follows the suites' shared philosophy: assert only what an outside observer can
 * see — PAPI responses over the WebSocket, page content, process exits, and log lines describing
 * user-visible outcomes — so the implementation underneath can be refactored while the tests keep
 * guarding the behaviour.
 */
import { ElectronApplication, Page, expect } from '@playwright/test';
import {
  sendPapiRequestOnce,
  waitForOverlayGone,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';

export const WEBSOCKET_PORT = 8876;

/**
 * Fixed web view id of the Home tab in the non-noisy dev layout. Source:
 * `src/renderer/testing/test-layout.data.ts` (the `DEV_NOISY=false` branch). The renderer suffixes
 * every web view id from a shared layout with the window it loads into (`-w1`, `-w2`, …; see
 * `src/renderer/components/docking/window-scoped-web-view-ids.util.ts`), so the rendered
 * `data-web-view-id` is this UUID plus that suffix.
 */
export const HOME_TAB_UUID = '7fc0e34a-d601-4995-fadc-92daa9ef713f';

// #region log markers shared by both specs

/**
 * Faults that must never appear during any of the exercised flows: an unhandled rejection or
 * exception surfacing in the main process (`src/main/main.ts` process-level handlers), or an event
 * being emitted through an already-disposed emitter (`platform-bible-utils`), which multi-window
 * handover defects surface as.
 */
export const FAULT_MARKERS = [
  'Unhandled promise rejection',
  'Unhandled exception in main process',
  'Emitter is disposed',
];

/**
 * A warn/error-severity line reporting a name collision in the central registry. The same phrases
 * appear at debug severity on the EXPECTED step-aside paths (a second window losing the app-global
 * hosting race logs "… already registered" as debug), so severity is part of the pattern: only
 * warn/error occurrences indicate a window failing to scope its per-window services.
 */
export const DUPLICATE_REGISTRATION_PATTERN =
  /\[(warn|error)\][^\n]*(already registered|rejected by the central registry)/;

// #endregion

// #region app output capture

/** Accumulated stdout+stderr of the Electron process, with offset-based slicing. */
export interface AppOutputCapture {
  /** Everything captured so far (ANSI color codes stripped). */
  text(): string;
  /** Opaque offset marking "now"; pass to {@link textFrom} to read only later output. */
  mark(): number;
  /** Everything captured after the given {@link mark} (ANSI color codes stripped). */
  textFrom(offset: number): string;
}

/**
 * Start capturing the Electron process's stdout and stderr. Captures from the moment of the call —
 * output that was already flushed before (early startup) is not included, which every assertion in
 * these suites accounts for by marking an offset before triggering the behaviour it asserts on.
 *
 * Listeners are intentionally not detached: the process (and its stdio streams) is torn down with
 * its Electron instance right after the assertions that read the capture, so there is nothing to
 * leak into.
 */
export function captureAppOutput(electronApp: ElectronApplication): AppOutputCapture {
  let buffer = '';
  const append = (chunk: Buffer | string) => {
    buffer += chunk.toString();
  };
  const proc = electronApp.process();
  proc.stdout?.on('data', append);
  proc.stderr?.on('data', append);
  const stripAnsi = (raw: string) =>
    // Terminal color escape sequences (from chalk in the app's console log transport) would break
    // plain-substring matching, so strip them. The escape character is the point of the pattern.
    // eslint-disable-next-line no-control-regex
    raw.replace(/\u001b\[[0-9;]*m/g, '');
  return {
    text: () => stripAnsi(buffer),
    mark: () => buffer.length,
    textFrom: (offset: number) => stripAnsi(buffer.slice(offset)),
  };
}

/** Number of times `needle` occurs in `haystack` (non-overlapping). */
export function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

/**
 * Per-test elapsed-time step logger, so the runner output records how long each phase actually took
 * — the evidence for judging whether a pass exercised the intended waits (e.g. a hosting takeover
 * that waits on the disposal announced for the departed window) or short-circuited.
 */
export function createStepLogger(prefix: string): (label: string) => void {
  const start = Date.now();
  return (label: string) =>
    console.log(`[${prefix} +${((Date.now() - start) / 1000).toFixed(1)}s] ${label}`);
}

// #endregion

// #region polling

/**
 * Repeatedly run `attempt` until `isAcceptable` accepts its value or `deadlineMs` elapses.
 * Rejections from `attempt` count as "not yet" (the service may legitimately be unreachable
 * mid-handover), so the last error is folded into the timeout message for diagnosis.
 */
export async function pollUntil<T>(
  attempt: () => Promise<T>,
  isAcceptable: (value: T) => boolean,
  deadlineMs: number,
  label: string,
  intervalMs = 1_000,
): Promise<T> {
  const deadline = Date.now() + deadlineMs;
  let lastFailure = 'no attempt settled';
  for (;;) {
    try {
      // Sequential polling: each attempt must settle before the next; parallel attempts would
      // hammer a service that is mid-handover.
      // eslint-disable-next-line no-await-in-loop
      const value = await attempt();
      if (isAcceptable(value)) return value;
      lastFailure = `last value was not acceptable: ${JSON.stringify(value)}`;
    } catch (e) {
      lastFailure = `last attempt rejected: ${e instanceof Error ? e.message : String(e)}`;
    }
    if (Date.now() >= deadline)
      throw new Error(`Timed out after ${deadlineMs} ms waiting for ${label}; ${lastFailure}`);
    // Sequential polling: wait between attempts (see above).
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, intervalMs);
    });
  }
}

// #endregion

// #region focused-window routing

/**
 * Per-attempt timeout for one-shot routed PAPI calls. While a routed service's target window is not
 * ready yet, the main process retries its handler lookup for up to ~9 seconds (10 attempts, 1
 * second apart — see `requestWithRetry` in `src/shared/data/rpc.model.ts`) before answering
 * method-not-found, so each attempt needs a budget above that to distinguish "not ready yet" from a
 * transport failure.
 */
const ROUTED_CALL_TIMEOUT_MS = 15_000;

/** Ask the main process which window id it currently routes to. */
export async function getFocusedWindowId(): Promise<number | undefined> {
  return sendPapiRequestOnce<number | undefined>(
    'command:platform.getFocusedWindowId',
    [],
    WEBSOCKET_PORT,
    ROUTED_CALL_TIMEOUT_MS,
  );
}

/**
 * How long {@link focusWindowAndWaitForRouting} keeps asking the display server to activate the
 * window before falling back to delivering the focus notification at the Electron boundary itself.
 * Activation requests that a compositor honors at all are honored within a second or two, so ten
 * seconds of retries means it will not cooperate.
 */
const OS_FOCUS_COOPERATION_BUDGET_MS = 10_000;

/**
 * Give a window focus and wait until the main process routes to it.
 *
 * Two escalation stages, re-issued on every poll attempt:
 *
 * 1. Ask the display server: minimize every other window (a covering window need not be re-raised by a
 *    bare `focus()` call) and request activation of the target.
 * 2. If the display server has not cooperated within {@link OS_FOCUS_COOPERATION_BUDGET_MS}, also emit
 *    the window's `focus` notification directly. Headless/CI compositors (observed on WSLg/Weston)
 *    honor the activation a window gets when it is first shown but ignore programmatic
 *    re-activation of an existing window, so no amount of asking produces the event a real user's
 *    window switch produces. Emitting it simulates the compositor's delivery at the app boundary;
 *    everything the app does with the event — focus tracking, routing target re-resolution, relay
 *    re-pointing — still runs for real, so a break anywhere in that chain still fails the wait.
 *
 * A previously minimized target is restored, so alternating focus between windows is self-healing.
 */
export async function focusWindowAndWaitForRouting(
  electronApp: ElectronApplication,
  windowId: number,
): Promise<void> {
  const startTime = Date.now();
  await pollUntil(
    async () => {
      const shouldSimulateFocusDelivery = Date.now() - startTime >= OS_FOCUS_COOPERATION_BUDGET_MS;
      await electronApp.evaluate(
        ({ BrowserWindow }, { id, simulateFocusDelivery }) => {
          const win = BrowserWindow.fromId(id);
          if (!win) throw new Error(`No BrowserWindow with id ${id}`);
          BrowserWindow.getAllWindows().forEach((otherWindow) => {
            if (otherWindow.id !== id && !otherWindow.isMinimized()) otherWindow.minimize();
          });
          if (win.isMinimized()) win.restore();
          win.show();
          win.focus();
          if (simulateFocusDelivery) win.emit('focus');
        },
        { id: windowId, simulateFocusDelivery: shouldSimulateFocusDelivery },
      );
      return getFocusedWindowId();
    },
    (focusedId) => focusedId === windowId,
    30_000,
    `main process to route to window ${windowId}`,
  );
}

// #endregion

// #region window helpers

/**
 * The window's Electron BrowserWindow id, read from the `windowId` query parameter the main process
 * puts in every renderer URL (`WINDOW_ID` in `src/shared/data/platform.data.ts`).
 */
export function getWindowIdOfPage(page: Page): number {
  const rawId = new URL(page.url()).searchParams.get('windowId');
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0)
    throw new Error(`Page URL ${page.url()} has no usable windowId query parameter`);
  return id;
}

/**
 * The app's renderer pages (windows), sorted by their BrowserWindow id. Filters out any non-app
 * page (e.g. a detached devtools window) by requiring the renderer URL's `windowId` query
 * parameter. BrowserWindow ids increase in creation order within one app session, so the sort puts
 * the earliest-created window first — at startup that is the main window, which the app creates
 * before any secondary window.
 */
export function getAppPages(electronApp: ElectronApplication): Page[] {
  return electronApp
    .windows()
    .filter((page) => !page.isClosed() && page.url().includes('windowId='))
    .sort((a, b) => getWindowIdOfPage(a) - getWindowIdOfPage(b));
}

/**
 * Wait until the app has at least `count` open windows (renderer pages), then return them sorted by
 * BrowserWindow id (see {@link getAppPages}), each with its React root attached. For asserting
 * "exactly N windows", follow this with a settle period and a {@link getAppPages} length check —
 * this only waits for the count to be reached.
 */
export async function waitForAppPages(
  electronApp: ElectronApplication,
  count: number,
  timeoutMs: number,
): Promise<Page[]> {
  const pages = await pollUntil(
    async () => getAppPages(electronApp),
    (candidate) => candidate.length >= count,
    timeoutMs,
    `${count} app window(s) to be open`,
  );
  await Promise.all(
    pages.map(async (page) => {
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('#root', { state: 'attached', timeout: 60_000 });
    }),
  );
  return pages;
}

/**
 * Create a second application window through the public `platform.createWindow` command and return
 * its Page. The window event listener is armed BEFORE the command is sent, so the new window cannot
 * be missed. The predicate skips any non-app page (e.g. a detached devtools window) by requiring
 * the renderer URL's `windowId` query parameter.
 */
export async function createSecondWindow(electronApp: ElectronApplication): Promise<Page> {
  const windowPromise = electronApp.waitForEvent('window', {
    predicate: (page: Page) => page.url().includes('windowId='),
    timeout: 60_000,
  });
  await sendPapiRequestOnce('command:platform.createWindow', [], WEBSOCKET_PORT, 30_000);
  const page = await windowPromise;
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('#root', { state: 'attached', timeout: 60_000 });
  return page;
}

/**
 * Wait until a window's renderer has registered its window-scoped services with the main process:
 * its scoped `platform.about-{windowId}` command (the last of the renderer's command registrations)
 * and its scoped window service (what the service routers forward to). Only then can generic-name
 * calls be routed to this window.
 */
export async function waitForRendererRegistered(
  windowId: number,
  timeoutMs: number,
): Promise<void> {
  await waitForPapiMethodRegistered(
    new RegExp(`^command:platform\\.about-${windowId}$`),
    WEBSOCKET_PORT,
    timeoutMs,
  );
  await waitForPapiMethodRegistered(
    new RegExp(`^object:platform\\.windowServiceDataProvider-${windowId}-data\\.`),
    WEBSOCKET_PORT,
    timeoutMs,
  );
}

/** Locator for a window's Home tab title, which carries the window-scoped web view id. */
export function homeTabTitle(page: Page, windowId: number) {
  return page.locator(`.platform-tab-title[data-web-view-id="${HOME_TAB_UUID}-w${windowId}"]`);
}

/**
 * How long {@link expectWindowDockEmpty} waits after the window's UI is up before asserting
 * emptiness. An empty dock and a dock about to load tabs look identical for a moment — the dock
 * container renders before any layout content arrives — so asserting zero tabs immediately could
 * pass vacuously while a wrongly-loaded layout (a clone of another window's, or a default) is still
 * on its way. The window's startup overlay clearing already signals initialization is done; this
 * settle is headroom on top of that for stragglers.
 */
const EMPTY_DOCK_SETTLE_MS = 5_000;

/**
 * Assert that a window's dock UI is genuinely up and renders NO content: zero dock tabs, zero tab
 * titles, zero web view iframes. This is the observable shape of a window that starts (or is
 * restored) with an empty layout.
 *
 * Fails if the window renders any tab — which is exactly what a regression to loading a default
 * layout, or to cloning another window's layout into this one, would produce.
 */
export async function expectWindowDockEmpty(page: Page): Promise<void> {
  // The dock container itself must render — "no tabs because the UI never came up" must fail, not
  // pass. Then the startup overlay must clear, signalling async initialization (settings, theme,
  // layout load) finished.
  await expect(page.locator('div[class*="dock-layout"]')).toBeAttached({ timeout: 120_000 });
  await waitForOverlayGone(page, 120_000);
  // Give a wrongly-loaded layout time to become observable before asserting absence.
  await new Promise<void>((resolve) => {
    setTimeout(resolve, EMPTY_DOCK_SETTLE_MS);
  });
  await expect(page.locator('.dock-tab')).toHaveCount(0);
  await expect(page.locator('.platform-tab-title')).toHaveCount(0);
  await expect(page.locator('iframe[data-web-view-id]')).toHaveCount(0);
}

// #endregion

// #region graceful quit

/** Exit report of the Electron OS process. */
export interface AppExitResult {
  code: number | undefined;
  signal: string | undefined;
}

/**
 * Trigger a REAL app quit — exactly what File > Exit or Cmd+Q does — and wait for the Electron OS
 * process to exit, then reap the leftover process group. Returns the exit code/signal for the
 * caller to assert on (a clean quit exits with code 0 and no signal).
 *
 * Watches the OS process itself, not Playwright's ElectronApplication `close` event. That event
 * additionally waits for the process's stdio streams to close, and a graceful dev-mode quit leaves
 * the .NET data provider watcher child alive holding the inherited pipe write-ends — so the event
 * can stay unfired long after Electron has exited cleanly. The child process `exit` event fires on
 * the exit itself, which is the behaviour under test. Armed before quitting.
 *
 * `app.quit()` is scheduled rather than called inline so the evaluate round-trip completes before
 * teardown begins.
 *
 * Budget: the quit path is a bounded shutdown-sync attempt (which rejects immediately when no S/R
 * extension is registered) plus bounded child-process waits of a few seconds, so a healthy quit
 * lands well under a minute; 120 seconds is slow-machine headroom. A quit that exceeds it means
 * shutdown hung, which is exactly a failure of the behaviour under test.
 *
 * Reaping: in dev mode the .NET watcher child survives its Electron parent, holding the inherited
 * stdio pipes open. Killing the leftover process group means nothing leaks into later launches and
 * the runner's own cleanup (which waits on those pipes) cannot stall on it. The group leader is
 * already gone, so any error just means the group is fully dead — the desired state.
 */
export async function quitAppAndWaitForExit(
  electronApp: ElectronApplication,
): Promise<AppExitResult> {
  const electronProcess = electronApp.process();
  const processExit = new Promise<AppExitResult>((resolve) => {
    electronProcess.once('exit', (code, signal) =>
      resolve({ code: code ?? undefined, signal: signal ?? undefined }),
    );
  });

  await electronApp.evaluate(({ app }) => {
    setTimeout(() => app.quit(), 0);
  });

  const exitResult = await Promise.race([
    processExit,
    new Promise<never>((_resolve, reject) => {
      setTimeout(
        () => reject(new Error('Electron process did not exit within 120 s of app.quit()')),
        120_000,
      );
    }),
  ]);

  if (electronProcess.pid) {
    try {
      process.kill(-electronProcess.pid, 'SIGKILL');
    } catch {
      /* process group already gone */
    }
  }

  return exitResult;
}

/**
 * The graceful-quit epilogue shared by the multi-window suites: trigger a real quit and wait for
 * the OS process to exit (see {@link quitAppAndWaitForExit}), assert the exit was clean (code 0, no
 * signal), then sweep everything the given capture recorded for {@link FAULT_MARKERS} and for
 * warn/error-severity duplicate registrations ({@link DUPLICATE_REGISTRATION_PATTERN}).
 *
 * @param label Prefix for the step-log line recording the exit (e.g. `'phase 1'`).
 */
export async function quitAndExpectCleanExit(
  electronApp: ElectronApplication,
  output: AppOutputCapture,
  logStep: (label: string) => void,
  label: string,
): Promise<void> {
  const exitResult = await quitAppAndWaitForExit(electronApp);
  logStep(`${label}: exited with code ${exitResult.code} signal ${exitResult.signal}`);
  expect(exitResult.signal).toBeUndefined();
  expect(exitResult.code).toBe(0);

  const log = output.text();
  FAULT_MARKERS.forEach((marker) => expect(log).not.toContain(marker));
  expect(log).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);
}

// #endregion
