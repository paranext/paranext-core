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
 * A warn/error-severity line reporting a name collision in the central registry: a window failing
 * to scope its per-window services.
 *
 * Severity is part of the pattern because these phrases reach the captured output two different
 * ways. They are LOGGED, at warn, by `rpc-client.ts` (`registerMethod`, when a client already has
 * the method) and by `rpc-websocket-listener.ts` (a method and a network event colliding on one
 * name) — a logger line is the registry reporting a collision, which is the fault this hunts. They
 * are also THROWN, inside error messages built by `network-object.service.ts`,
 * `data-provider.service.ts`, `web-view-provider.service.ts` and `network.service.ts`, and thrown
 * text reaches this capture at whatever severity its catcher chooses to print it, or untagged
 * inside a stack trace. Bounding the match to warn/error keeps it on the lines that REPORT a
 * collision rather than on the same words quoted in passing.
 */
export const DUPLICATE_REGISTRATION_PATTERN =
  /\[(warn|error)\][^\n]*(already registered|rejected by the central registry)/;

/**
 * Logged by `main.ts` on the way down — the positive control for a collision sweep that runs after
 * a quit.
 *
 * `expect(log).not.toMatch(...)` passes just as happily against output that never arrived, so each
 * sweep asserts something present first, to prove it examined a real corpus.
 *
 * A control must be emitted AFTER {@link captureAppOutput} attaches, not merely be certain to
 * happen. The capture hooks `electronApp.process().stdout` once the app is already running, so
 * every main-process startup line — service registrations included — is emitted before it and is
 * never in the corpus at all. This line is not: {@link quitAndExpectCleanExit} performs the quit
 * that produces it, so it always lands mid-capture.
 */
export const APP_QUITTING_LOG = 'Main process is quitting';

/**
 * The first thing any renderer logs (`src/renderer/index.tsx`) — the positive control for any sweep
 * whose corpus begins before a window is created during the test, whether that corpus is a slice
 * taken from a mark or the whole log of a test that has not quit.
 *
 * {@link APP_QUITTING_LOG} controls sweeps taken after a quit; this one controls the sweeps where
 * the quit has not happened yet. A mark taken a moment too late would otherwise yield an empty
 * slice and a passing assertion.
 *
 * Note the window this refers to is created DURING the test, so its renderer's first line lands
 * well after the capture attached — which is what makes it usable as a control at all.
 */
export const RENDERER_STARTING_LOG = 'Starting renderer';

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
 * — the evidence for judging whether a pass exercised the intended waits (e.g. a second window's
 * services genuinely coming up) or short-circuited.
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
      await withPlatformWindow(
        electronApp,
        windowId,
        (win, { BrowserWindow }, simulateFocusDelivery) => {
          // Every other window steps aside so the compositor has one candidate to activate
          BrowserWindow.getAllWindows().forEach((otherWindow) => {
            if (otherWindow !== win && !otherWindow.isMinimized()) otherWindow.minimize();
          });
          if (win.isMinimized()) win.restore();
          win.show();
          win.focus();
          if (simulateFocusDelivery) win.emit('focus');
        },
        shouldSimulateFocusDelivery,
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
 * What an action against a resolved window may use from the main process.
 *
 * Deliberately not the whole `electron` module: a body is serialised and re-instantiated in the
 * main process, so what it can reach is exactly what is handed to it here.
 */
export type PlatformWindowActionContext = {
  BrowserWindow: typeof import('electron').BrowserWindow;
  screen: typeof import('electron').screen;
};

/**
 * Run `action` in the main process against the window carrying the given platform id.
 *
 * Every window is matched on the `windowId` query parameter the main process puts in its renderer
 * URL — the id `getWindowIdOfPage` reads — rather than looked up with `BrowserWindow.fromId`.
 * `fromId` takes Electron's ids, and the platform's ids stop coinciding with Electron's the moment
 * the app is relaunched: the platform's counter keeps counting while Electron's restarts at 1, so
 * `fromId` would answer `undefined` or, worse, a different window. A window whose URL is not yet
 * parseable (one still loading, with an empty URL) is skipped rather than aborting the lookup with
 * an opaque `TypeError`.
 *
 * `action` is sent to the main process as source text, so it must be self-contained: it may use its
 * parameters and nothing from the enclosing scope. Anything it needs from the test goes in `arg`.
 *
 * @param electronApp The app under test
 * @param windowId Platform id of the window to act on
 * @param action What to do with the resolved window. Receives the window, the main-process context,
 *   and `arg`.
 * @param arg A JSON-serialisable value forwarded to `action`
 * @returns Whatever `action` returns
 * @throws If no open window carries `windowId`
 */
export async function withPlatformWindow<TArg, TResult>(
  electronApp: ElectronApplication,
  windowId: number,
  action: (
    win: import('electron').BrowserWindow,
    context: PlatformWindowActionContext,
    arg: TArg,
  ) => TResult,
  arg?: TArg,
): Promise<TResult> {
  return electronApp.evaluate(
    ({ BrowserWindow, screen }, { id, actionSource, actionArg }) => {
      const platformIdOf = (someWindow: { webContents: { getURL: () => string } }) => {
        try {
          return Number(new URL(someWindow.webContents.getURL()).searchParams.get('windowId'));
        } catch {
          return undefined;
        }
      };
      const win = BrowserWindow.getAllWindows().find(
        (someWindow) => platformIdOf(someWindow) === id,
      );
      if (!win) throw new Error(`No window with platform id ${id}`);
      // Re-instantiated from source here because a function cannot cross the evaluate boundary.
      // The surrounding `new Function` gives the body a name to be called by.
      // eslint-disable-next-line no-new-func
      const runAction = new Function(`return (${actionSource});`)();
      return runAction(win, { BrowserWindow, screen }, actionArg);
    },
    { id: windowId, actionSource: action.toString(), actionArg: arg },
  );
}

/**
 * The window's platform id, read from the `windowId` query parameter the main process puts in every
 * renderer URL (`WINDOW_ID` in `src/shared/data/platform.data.ts`).
 *
 * Not Electron's `BrowserWindow.id`, which the platform stopped exporting — anything resolving a
 * window from this value has to match on the same query parameter rather than call
 * `BrowserWindow.fromId`.
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
 * Renderer width, in CSS pixels, at or above which a window's toolbar still renders the chapter and
 * verse of a reference.
 *
 * The toolbar walks a shrink ladder as its content row narrows (`APP_TOOLBAR_SHRINK_THRESHOLDS_PX`
 * in `lib/platform-bible-react/src/components/advanced/toolbar.component.tsx`), and at the ladder's
 * narrowest rung it drops the chapter and verse entirely, leaving the book alone. This sits above
 * that rung's threshold rather than on it, because the observed content row is narrower than the
 * window by its own padding.
 */
const TOOLBAR_REFERENCE_MIN_CSS_PX = 800;

/**
 * Widen a window until its toolbar has room to show a reference in full, and return the renderer
 * width that achieved it.
 *
 * A window narrow enough to reach the shrink ladder's narrowest rung shows the book alone, so a
 * spec reading a reference off that toolbar cannot see a chapter or verse there however correctly
 * the navigation reached the window. Every window whose toolbar text is asserted needs this first.
 *
 * Sized to the work area rather than to a fixed number, and size only: this compositor honors sizes
 * exactly but assigns positions itself, and the display is not guaranteed to be any given size.
 */
export async function widenWindowForToolbarReference(
  electronApp: ElectronApplication,
  page: Page,
): Promise<number> {
  const windowId = getWindowIdOfPage(page);
  await withPlatformWindow(electronApp, windowId, (win, { screen }) => {
    // An unmapped window reports stale bounds and ignores the resize.
    if (win.isMinimized()) win.restore();
    const { workArea } = screen.getPrimaryDisplay();
    const { height, y } = win.getBounds();
    win.setBounds({ x: workArea.x, y, width: workArea.width, height });
  });
  // The shrink step comes from a `ResizeObserver`, so the label re-renders after the resize lands
  // rather than with it.
  let rendererWidth = 0;
  await expect(async () => {
    rendererWidth = await page.evaluate(() => window.innerWidth);
    expect(rendererWidth).toBeGreaterThanOrEqual(TOOLBAR_REFERENCE_MIN_CSS_PX);
  }).toPass({ timeout: 30_000, intervals: [500] });
  return rendererWidth;
}

/**
 * The window-scoped shard methods a renderer registers, as patterns taking the window id.
 *
 * One per service the main process's routers forward a command or request to. A renderer starts
 * them together, so any one of them proves only that the batch is under way — a spec that drives a
 * command at this window right after the gate needs the shard behind THAT command to have arrived.
 */
const SCOPED_SHARD_METHOD_PATTERNS = [
  (windowId: number) => `^object:DialogService-${windowId}\\.showDialog$`,
  (windowId: number) => `^object:UsersnapService-${windowId}\\.submitIdea$`,
  (windowId: number) => `^object:BookChapterControlService-${windowId}\\.open$`,
  (windowId: number) => `^object:WebViewService-${windowId}\\.openSettingsTab$`,
  (windowId: number) => `^object:platform\\.windowServiceDataProvider-${windowId}-data\\.`,
];

/**
 * Wait until a window's renderer has registered every window-scoped service the main process's
 * routers forward to. Only then can generic-name calls be routed to this window.
 */
export async function waitForRendererRegistered(
  windowId: number,
  timeoutMs: number,
): Promise<void> {
  // Waited on together: the renderer starts them together too, so they arrive within a poll of one
  // another and waiting one after another would spend the timeout budget several times over
  await Promise.all(
    SCOPED_SHARD_METHOD_PATTERNS.map((buildPattern) =>
      waitForPapiMethodRegistered(new RegExp(buildPattern(windowId)), WEBSOCKET_PORT, timeoutMs),
    ),
  );
}

/**
 * A window's Home tab web view id BY ITS FIXED FALLBACK-LAYOUT ID — only valid for a window that
 * loaded the single-Home-tab fallback layout ({@link HOME_TAB_UUID}), i.e. the first window of a
 * fresh profile or one restored from a saved layout that already carried that id. A window whose
 * Home tab was docked on the fly (see {@link expectWindowDockHasOnlyHomeTab}) gets a freshly
 * generated web view id each time, so this is not that id.
 *
 * The window suffix this appends is owned by `window-scoped-web-view-ids.util.ts`
 * (`withWindowScopedWebViewIdInTab`), not by this file — calling this rather than spelling the
 * suffix out at each call site means a change to that scheme surfaces as one place to update
 * instead of a locator silently built against the old id and timing out with nothing to name.
 */
export function homeTabWebViewId(windowId: number): string {
  return `${HOME_TAB_UUID}-w${windowId}`;
}

/**
 * Locator for a window's Home tab title BY ITS FIXED FALLBACK-LAYOUT ID — see
 * {@link homeTabWebViewId}. A window whose Home tab was docked on the fly gets a freshly generated
 * web view id each time, so this locator will not find it — look that one up with
 * {@link webViewTabTitle}, passing the id it minted.
 */
export function homeTabTitle(page: Page, windowId: number) {
  return webViewTabTitle(page, homeTabWebViewId(windowId));
}

/**
 * The tab title element for a web view, by its id.
 *
 * The one place this selector is spelled, so the id is the only thing a caller can get wrong —
 * which matters because a wrong id yields a zero-element locator that blocks until the test times
 * out rather than failing with something that names the cause. Note {@link homeTabTitle} builds the
 * FIXED fallback-layout id, which only the first window's Home tab carries; a window that docks
 * Home on the fly mints its own, and must be looked up by that.
 */
export function webViewTabTitle(page: Page, webViewId: string) {
  return page.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`);
}

/**
 * The web view ids a window is holding, read off its dock's tab titles
 * (`platform-tab-title.component.tsx` stamps each web view tab with `data-web-view-id`;
 * non-web-view tabs carry no such attribute and are therefore not matched).
 *
 * Tab titles rather than iframes: every tab in the tab bar renders its title whether or not it has
 * ever been the active tab, while rc-dock mounts a tab's pane — and with it the web view's iframe —
 * lazily. A window holding a tab the user has not looked at yet must still count as holding it.
 */
export async function getHeldWebViewIds(page: Page): Promise<string[]> {
  return page
    .locator('.platform-tab-title[data-web-view-id]')
    .evaluateAll((titles) => titles.map((title) => title.getAttribute('data-web-view-id') ?? ''));
}

/**
 * Per-request timeout for a move (`platform.moveWebViewToWindow` /
 * `platform.moveWebViewToNewWindow` — see `src/declarations/papi-shared-types.ts`). A move to a new
 * window pays a whole cold renderer start before it touches the web view — deliberately, so a
 * window that never comes up costs a wait and an error rather than a web view open in no window —
 * and a cold start on a loaded machine can take a minute. A budget shorter than that would report a
 * transport timeout for a move that was still legitimately under way, even for a move whose target
 * is already open and so pays no cold start of its own: it inherits the same CI machines as the
 * moves that do.
 */
export const MOVE_COMMAND_TIMEOUT_MS = 180_000;

/**
 * How long {@link expectWindowDockHasOnlyHomeTab} waits after the Home tab attaches before asserting
 * it is the ONLY thing docked. A dock that is about to receive more than Home — e.g. a
 * wrongly-cloned copy of another window's layout landing alongside the docked Home tab — can look
 * identical to a Home-only dock for a moment, since the extra content can arrive after Home does;
 * this settle gives a wrongly-added tab time to appear before the count assertions below.
 */
const HOME_ONLY_SETTLE_MS = 5_000;

/**
 * Assert that a window's dock UI is genuinely up and renders EXACTLY the Home tab: one dock tab,
 * one tab title, one web view iframe, and that tab/iframe is Home. This is the observable shape of
 * a window that starts (or is restored) with nothing of its own to show — see
 * `src/main/services/window-emptiness.util.ts`: a window born empty, or emptied down to nothing,
 * docks Home instead of staying empty.
 *
 * A freshly docked Home tab is not restored from any saved layout, so it gets a new web view id
 * each time — identity here is asserted by title text ("Home"), not by a fixed id. That text is
 * locale-independent in these suites because they pin `platform.interfaceLanguage` to English.
 * Contrast {@link homeTabTitle}, which locates a Home tab that came from the fixed-id fallback
 * layout.
 *
 * Fails if the window renders zero tabs (Home never got docked) or more than one tab (something
 * besides Home is also present) — which is exactly what a regression to failing the dock-Home
 * decision, or to loading a default/cloned layout alongside it, would produce.
 */
export async function expectWindowDockHasOnlyHomeTab(page: Page): Promise<void> {
  // The dock container itself must render — "no tabs because the UI never came up" must fail, not
  // pass. Then the startup overlay must clear, signalling async initialization (settings, theme,
  // layout load) finished.
  await expect(page.locator('div[class*="dock-layout"]')).toBeAttached({ timeout: 120_000 });
  await waitForOverlayGone(page, 120_000);
  // Wait for Home itself as the readiness signal, rather than a blind settle before asserting
  // content: the dock-Home decision and the tab's own load both happen asynchronously after the
  // dock container first renders.
  await expect(page.locator('.dock-tab', { hasText: 'Home' })).toHaveCount(1, {
    timeout: 60_000,
  });
  // Give a wrongly-added extra tab time to become observable before asserting Home is the ONLY one.
  await new Promise<void>((resolve) => {
    setTimeout(resolve, HOME_ONLY_SETTLE_MS);
  });
  await expect(page.locator('.dock-tab')).toHaveCount(1);
  await expect(page.locator('.platform-tab-title')).toHaveCount(1);
  await expect(page.locator('iframe[data-web-view-id]')).toHaveCount(1);
  await expect(page.locator('iframe[title="Home"]')).toHaveCount(1);
}

// #endregion

// #region graceful quit

/** Exit report of the Electron OS process. */
export interface AppExitResult {
  code: number | undefined;
  signal: string | undefined;
}

/**
 * Bring the app down — a real quit, exactly what File > Exit or Cmd+Q does, or a caller-supplied
 * trigger (see `triggerExit`) — and wait for the Electron OS process to exit, then reap the
 * leftover process group. Returns the exit code/signal for the caller to assert on (a clean quit
 * exits with code 0 and no signal).
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
 * Pass `triggerExit` to bring the app down some other way — closing a window through its ✕, say. It
 * runs after the exit listener is armed, raced against that listener rather than plain-awaited: a
 * trigger that brings the process down itself can have its own round trip rejected once that
 * process is already gone, and that rejection must not skip the wait below or the reap that follows
 * it.
 *
 * Budget: the quit path is a bounded shutdown-sync attempt (which rejects immediately in this
 * suite's configuration, since no S/R extension is registered) plus bounded child-process waits of
 * a few seconds, so a healthy quit lands well under a minute — but only in that configuration: with
 * an S/R extension registered, the sync's own bound (`AUTO_SYNC_MAX_DURATION_MS`, 600 s) exceeds
 * this whole budget. 120 seconds is slow-machine headroom. A quit that exceeds it means shutdown
 * hung, which is exactly a failure of the behaviour under test. When it does, the tail of `output`
 * (if given) is folded into the timeout error — the captured app output is what can name the
 * statement shutdown is stuck on.
 *
 * Reaping: in dev mode the .NET watcher child survives its Electron parent, holding the inherited
 * stdio pipes open. Killing the leftover process group means nothing leaks into later launches and
 * the runner's own cleanup (which waits on those pipes) cannot stall on it. The group leader is
 * already gone, so any error just means the group is fully dead — the desired state.
 */
export async function quitAppAndWaitForExit(
  electronApp: ElectronApplication,
  output?: AppOutputCapture,
  triggerExit?: () => Promise<void>,
): Promise<AppExitResult> {
  const electronProcess = electronApp.process();
  const processExit = new Promise<AppExitResult>((resolve) => {
    electronProcess.once('exit', (code, signal) =>
      resolve({ code: code ?? undefined, signal: signal ?? undefined }),
    );
  });

  // Armed before the trigger, never after: a trigger whose own round trip outlives the exit would
  // otherwise land the exit before anything is listening, and the wait below would burn its whole
  // budget on an event that already fired.
  //
  // Raced against the exit rather than bare-awaited: a trigger that brings the process down itself
  // (closing the primary through its ✕, say) can have its own round trip rejected with "Target
  // page, context or browser has been closed" once that process is gone — before it ever resolves.
  // A bare await would propagate that rejection straight out of this function, skipping both the
  // wait below and the process-group reap that follows it. Racing lets the exit event settle this
  // step even when the trigger's own promise never gets to.
  if (triggerExit) await Promise.race([triggerExit(), processExit]);
  else
    await electronApp.evaluate(({ app }) => {
      setTimeout(() => app.quit(), 0);
    });

  const exitTriggerDescription = triggerExit ? 'the trigger' : 'app.quit()';
  const exitResult = await Promise.race([
    processExit,
    new Promise<never>((_resolve, reject) => {
      setTimeout(() => {
        const outputTail = output?.text().split('\n').slice(-60).join('\n');
        reject(
          new Error(
            `Electron process did not exit within 120 s of ${exitTriggerDescription}${
              outputTail ? `; last app output:\n${outputTail}` : ''
            }`,
          ),
        );
      }, 120_000);
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
 * signal), assert the capture actually saw the quit ({@link APP_QUITTING_LOG}, so the sweeps that
 * follow cannot pass vacuously against an empty corpus), then sweep everything the given capture
 * recorded for {@link FAULT_MARKERS} and for warn/error-severity duplicate registrations
 * ({@link DUPLICATE_REGISTRATION_PATTERN}).
 *
 * @param label Prefix for the step-log line recording the exit (e.g. `'phase 1'`).
 */
export async function quitAndExpectCleanExit(
  electronApp: ElectronApplication,
  output: AppOutputCapture,
  logStep: (label: string) => void,
  label: string,
): Promise<void> {
  const exitResult = await quitAppAndWaitForExit(electronApp, output);
  logStep(`${label}: exited with code ${exitResult.code} signal ${exitResult.signal}`);
  expect(exitResult.signal).toBeUndefined();
  expect(exitResult.code).toBe(0);

  const log = output.text();
  // Positive control before BOTH negative sweeps: the quit above produces this line, so its
  // absence means the capture holds nothing and everything below would pass without examining
  // anything. It has to precede the fault sweep too — that sweep is a negative assertion this
  // control backs, not an exception to it.
  expect(log).toContain(APP_QUITTING_LOG);
  FAULT_MARKERS.forEach((marker) => expect(log).not.toContain(marker));
  expect(log).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);
}

// #endregion
