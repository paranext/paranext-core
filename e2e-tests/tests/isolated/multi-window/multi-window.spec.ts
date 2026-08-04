/**
 * Multi-window lifecycle e2e tests.
 *
 * These are behaviour-level safety nets for the multi-window plumbing (window-scoped services with
 * main-process routing proxies, app-global service hosting with takeover, and the shared
 * shutdown-task latch). They deliberately assert only what an outside observer can see — PAPI
 * responses over the WebSocket, page content, and log lines describing user-visible outcomes — so
 * the implementation underneath can be refactored while these tests keep guarding the behaviour.
 *
 * Three tests, each launching its own Electron instance (the isolated fixture is test-scoped and
 * each launch costs 30+ seconds, so related assertions are grouped into one instance):
 *
 * 1. Second-window lifecycle: a second window starts clean (its web views get window-scoped ids, no
 *    duplicate-registration errors), generic window-service calls route to whichever window has
 *    focus, and closing the secondary window neither quits the app nor runs shutdown tasks.
 * 2. Hosting takeover: window 1 hosts the app-global theme and scroll-group services; closing it hands
 *    hosting to window 2, proven by live PAPI reads AND a write round-trip against the survivor.
 * 3. Quit with two windows: the shutdown tasks run exactly once (not once per window, not zero times)
 *    and the process exits cleanly.
 *
 * ## App configuration
 *
 * All three tests pre-configure (via the dev-appdata settings file, read at app startup):
 *
 * - `platform.interfaceMode: 'power'` — load-bearing for falsifiability, not a styling choice. The
 *   power-mode shutdown path always attempts the S/R extension's `runScheduledSessionSync` command,
 *   which is not registered in plain paranext-core, so every shutdown-task run emits exactly one
 *   observable `power-mode shutdown session sync …` log line (see `src/main/shutdown-tasks.ts`).
 *   That single deterministic marker is what lets test 1 assert "shutdown tasks did NOT run" and
 *   test 3 assert "ran exactly once". Simple mode's shutdown path logs nothing when no scripture
 *   editor is open, which would make both assertions vacuous.
 * - `platform.firstRunComplete: true` — the first-run wizard is a full-screen modal that would
 *   intercept every click.
 * - `platform.interfaceLanguage: ['en']` — locale determinism.
 *
 * With `DEV_NOISY=false` and no saved layout (fresh user-data dir per test), every window loads the
 * single-Home-tab layout from `src/renderer/testing/test-layout.data.ts`, whose fixed web view id
 * makes the per-window `-w{windowId}` scoping suffix directly observable.
 *
 * ## Log capture
 *
 * Main-process logs, renderer logs (forwarded to main via electron-log's renderer spy), and
 * extension-host logs (piped through main) all land on the Electron process's stdout/stderr, which
 * this suite captures from `electronApp.process()`. Formatted lines look like `[2026-01-02
 * 03:04:05.678] [warn] [unkn] message`, so assertions can be scoped to warn/error severity where
 * the same phrase also occurs in expected debug-level lines.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated multi-window`
 */
import type { ElectronApplication, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  preConfigureSettings,
  sendPapiRequestOnce,
  waitForAppReady,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';

const WEBSOCKET_PORT = 8876;

/**
 * Fixed web view id of the Home tab in the non-noisy dev layout. Source:
 * `src/renderer/testing/test-layout.data.ts` (the `DEV_NOISY=false` branch). The renderer suffixes
 * every web view id from a shared layout with the window it loads into (`-w1`, `-w2`, …; see
 * `src/renderer/components/docking/window-scoped-web-view-ids.util.ts`), so the rendered
 * `data-web-view-id` is this UUID plus that suffix.
 */
const HOME_TAB_UUID = '7fc0e34a-d601-4995-fadc-92daa9ef713f';

// #region log markers
// Exact substrings of log lines this suite keys on, each with the file that emits it. These are
// behaviour-describing lines (outcomes a user/support person reads in a log), not internal symbol
// names, so they are fair game for behaviour-level assertions.

/**
 * A renderer that lost the theme-hosting race attaches instead.
 * `src/renderer/services/theme.service-host.ts`
 */
const THEME_STEP_ASIDE_LOG = 'Another window is already hosting the theme service';

/**
 * A renderer that lost the scroll-group race steps aside.
 * `src/renderer/services/scroll-group.service-host.ts`
 */
const SCROLL_GROUP_STEP_ASIDE_LOG = 'Another window is already publishing the scroll group service';

/**
 * A process drops its cached registration of a network object hosted by a window that closed — the
 * observable start of a hosting handover. `src/shared/services/network-object.service.ts`
 */
const FORGET_THEME_OBJECT_PATTERN = /Forgetting network object '[^']*themeServiceDataProvider/;

/**
 * The bounded shutdown-sync wait for power mode is named `power-mode shutdown session sync`, and
 * every log line about its outcome contains that phrase (`src/main/shutdown-tasks.ts`). With no S/R
 * extension registered, each shutdown-task run produces exactly one such line (the sync command is
 * unreachable, which the shutdown path logs as a warning). Counting occurrences therefore counts
 * shutdown-task runs.
 */
const SHUTDOWN_SYNC_ATTEMPT_MARKER = 'power-mode shutdown session sync';

/**
 * Simple-mode shutdown sync markers (`src/main/shutdown-tasks.ts`); banned wherever the power-mode
 * marker is.
 */
const SIMPLE_MODE_SHUTDOWN_MARKERS = ['Syncing projects on shutdown', 'Sync on shutdown'];

/** Logged from the `will-quit` handler when the whole app goes down. `src/main/main.ts` */
const APP_QUITTING_LOG = 'Main process is quitting';

/**
 * Logged when the shutdown path cannot read the interface mode and skips the sync entirely.
 * `src/main/shutdown-tasks.ts`
 */
const SHUTDOWN_MODE_UNREADABLE_LOG = 'Could not read platform.interfaceMode';

/**
 * Faults that must never appear during any of the exercised flows: an unhandled rejection or
 * exception surfacing in the main process (`src/main/main.ts` process-level handlers), or an event
 * being emitted through an already-disposed emitter (`platform-bible-utils`), which past
 * multi-window handover defects surfaced as.
 */
const FAULT_MARKERS = [
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
const DUPLICATE_REGISTRATION_PATTERN =
  /\[(warn|error)\][^\n]*(already registered|rejected by the central registry)/;

// #endregion

// #region app output capture

/** Accumulated stdout+stderr of the Electron process, with offset-based slicing. */
interface AppOutputCapture {
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
 * this suite accounts for by marking an offset before triggering the behaviour it asserts on.
 *
 * Listeners are intentionally not detached: the process (and its stdio streams) is torn down with
 * the test-scoped fixture right after the test body, so there is nothing to leak into.
 */
function captureAppOutput(electronApp: ElectronApplication): AppOutputCapture {
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
function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

/**
 * Per-test elapsed-time step logger, so the runner output records how long each phase actually took
 * — the evidence for judging whether a pass exercised the intended waits (e.g. a hosting takeover
 * that includes an unreachability probe) or short-circuited.
 */
function createStepLogger(): (label: string) => void {
  const start = Date.now();
  return (label: string) =>
    console.log(`[multi-window +${((Date.now() - start) / 1000).toFixed(1)}s] ${label}`);
}

// #endregion

// #region PAPI helpers (one-shot WebSocket JSON-RPC against the main process, port 8876)

/**
 * Per-attempt timeout for polled PAPI calls. While an app-global service's host window is gone and
 * no survivor has re-registered yet, the main process retries its handler lookup for up to ~9
 * seconds (10 attempts, 1 second apart — see `requestWithRetry` in `src/shared/data/rpc.model.ts`)
 * before answering method-not-found, so each attempt needs a budget above that to distinguish "not
 * re-registered yet" from a transport failure.
 */
const PAPI_ATTEMPT_TIMEOUT_MS = 15_000;

/** Minimal shape of a window-service focus subject, as seen over JSON-RPC. */
type FocusSubjectLike = { focusType?: string; id?: string; tabType?: string } | undefined;

/** Minimal shape of a serialized verse reference, as seen over JSON-RPC. */
type VerseRefLike = { book?: string; chapterNum?: number; verseNum?: number } | undefined;

/** Minimal shape of an expanded theme definition, as seen over JSON-RPC. */
type ThemeLike = { type?: string; cssVariables?: Record<string, string> } | undefined;

/**
 * Call the GENERIC window service's `getFocus` — the name declared in `papi.d.ts` that consumers
 * use. The main process serves it via a routing proxy that forwards to whichever window has focus,
 * which is exactly the routing behaviour under test.
 */
async function getGenericWindowFocus(): Promise<FocusSubjectLike> {
  return sendPapiRequestOnce<FocusSubjectLike>(
    'object:platform.windowServiceDataProvider-data.getFocus',
    [],
    WEBSOCKET_PORT,
    PAPI_ATTEMPT_TIMEOUT_MS,
  );
}

/** Ask the main process which window id it currently routes to. */
async function getFocusedWindowId(): Promise<number | undefined> {
  return sendPapiRequestOnce<number | undefined>(
    'command:platform.getFocusedWindowId',
    [],
    WEBSOCKET_PORT,
    PAPI_ATTEMPT_TIMEOUT_MS,
  );
}

/** Read the current theme from the app-global theme service. */
async function getCurrentTheme(): Promise<ThemeLike> {
  return sendPapiRequestOnce<ThemeLike>(
    'object:platform.themeServiceDataProvider-data.getCurrentTheme',
    [],
    WEBSOCKET_PORT,
    PAPI_ATTEMPT_TIMEOUT_MS,
  );
}

/** Read scroll group 0's verse reference from the app-global scroll group service. */
async function getScrollGroupRef(): Promise<VerseRefLike> {
  return sendPapiRequestOnce<VerseRefLike>(
    'object:ScrollGroupService.getScrRef',
    [0],
    WEBSOCKET_PORT,
    PAPI_ATTEMPT_TIMEOUT_MS,
  );
}

/** Set scroll group 0's verse reference through the app-global scroll group service. */
async function setScrollGroupRef(scrRef: {
  book: string;
  chapterNum: number;
  verseNum: number;
}): Promise<boolean> {
  return sendPapiRequestOnce<boolean>(
    'object:ScrollGroupService.setScrRef',
    [0, scrRef],
    WEBSOCKET_PORT,
    PAPI_ATTEMPT_TIMEOUT_MS,
  );
}

/** Whether a theme response is a real expanded theme (and not an error shape or undefined). */
function isThemeShaped(theme: ThemeLike): boolean {
  return (
    typeof theme?.type === 'string' &&
    theme.cssVariables !== undefined &&
    typeof theme.cssVariables === 'object'
  );
}

/** Whether a verse-ref response is a real serialized verse reference. */
function isVerseRefShaped(ref: VerseRefLike): boolean {
  return typeof ref?.book === 'string' && typeof ref.chapterNum === 'number';
}

/**
 * Repeatedly run `attempt` until `isAcceptable` accepts its value or `deadlineMs` elapses.
 * Rejections from `attempt` count as "not yet" (the service may legitimately be unreachable
 * mid-handover), so the last error is folded into the timeout message for diagnosis.
 */
async function pollUntil<T>(
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

// #region window helpers

/**
 * The window's Electron BrowserWindow id, read from the `windowId` query parameter the main process
 * puts in every renderer URL (`WINDOW_ID` in `src/shared/data/platform.data.ts`).
 */
function getWindowIdOfPage(page: Page): number {
  const rawId = new URL(page.url()).searchParams.get('windowId');
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0)
    throw new Error(`Page URL ${page.url()} has no usable windowId query parameter`);
  return id;
}

/**
 * Create a second application window through the public `platform.createWindow` command and return
 * its Page. The window event listener is armed BEFORE the command is sent, so the new window cannot
 * be missed. The predicate skips any non-app page (e.g. a detached devtools window) by requiring
 * the renderer URL's `windowId` query parameter.
 */
async function createSecondWindow(electronApp: ElectronApplication): Promise<Page> {
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
 * and its scoped window service (what the routing proxies forward to). Only then can generic-name
 * calls be routed to this window.
 */
async function waitForRendererRegistered(windowId: number, timeoutMs: number): Promise<void> {
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
async function focusWindowAndWaitForRouting(
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

/** Locator for a window's Home tab title, which carries the window-scoped web view id. */
function homeTabTitle(page: Page, windowId: number) {
  return page.locator(`.platform-tab-title[data-web-view-id="${HOME_TAB_UUID}-w${windowId}"]`);
}

/**
 * Click into a window's Home web view so that window's focus subject becomes the Home web view.
 * Clicking inside the iframe focuses the iframe element in the window document, which the window
 * service reports as a web-view focus subject carrying the scoped web view id. The click lands near
 * the iframe's top-left corner, which is static content in the Home view (no button to trip).
 */
async function clickIntoHomeWebView(page: Page, windowId: number): Promise<void> {
  const homeIframe = page.locator(`iframe[data-web-view-id="${HOME_TAB_UUID}-w${windowId}"]`);
  await expect(homeIframe).toBeVisible({ timeout: 60_000 });
  await page
    .frameLocator(`iframe[data-web-view-id="${HOME_TAB_UUID}-w${windowId}"]`)
    .locator('body')
    .click({ position: { x: 10, y: 10 } });
}

/**
 * Wait for the generic window service's `getFocus` to answer with a focus subject belonging to the
 * given window (id suffixed `-w{windowId}`), then return that subject. Polled because focus
 * detection in the renderer is debounced and the routing proxy re-resolves its target on focus
 * changes.
 */
async function waitForGenericFocusToReportWindow(windowId: number): Promise<FocusSubjectLike> {
  return pollUntil(
    getGenericWindowFocus,
    (focus) => typeof focus?.id === 'string' && focus.id.endsWith(`-w${windowId}`),
    30_000,
    `generic getFocus to report a web view of window ${windowId}`,
  );
}

// #endregion

test.use({
  // The option fixture is named `electronLaunchOptions` (not `launchOptions`) — see
  // e2e-tests/fixtures/isolated.fixture.ts.
  //
  // isolatedProjectRoot: the app must not read or write the developer's real projects; the C#
  // backend installs the bundled sample project into the empty temp root.
  //
  // DEV_NOISY=false: the noisy-dev layout has no stable single web view to key on and loads
  // test-only extensions; the quiet layout is a single Home tab with a fixed web view id (see
  // HOME_TAB_UUID) in every window, which is exactly what the scoping assertions need.
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('multi-window lifecycle', () => {
  // Each test pays full app startup (up to ~180 s worst case) plus one extra window startup and,
  // for the takeover test, a handover that can take tens of seconds (see the poll budgets below).
  test.setTimeout(420_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Written before any launch and restored after the last test so the developer's own settings
    // survive the suite. See the file header for why power mode is load-bearing.
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('second window starts clean, focus routing follows the focused window, and closing the secondary window does not shut the app down', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger();
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    const window1Id = getWindowIdOfPage(mainPage);
    logStep(`window ${window1Id} ready`);

    // Window 1's own Home web view id carries its window suffix.
    await expect(homeTabTitle(mainPage, window1Id)).toBeAttached({ timeout: 60_000 });

    // Create the second window through the public command, with the window listener armed first.
    const beforeCreateMark = output.mark();
    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    expect(window2Id).not.toBe(window1Id);
    await waitForRendererRegistered(window2Id, 120_000);
    logStep(`window ${window2Id} created and registered`);

    // The second renderer renders the app UI with ITS OWN window-scoped web view ids: same layout,
    // same fixed UUID, different window suffix. If id scoping regressed, both windows would hold
    // the same id and the second window's messages/state would collide with the first's.
    await expect(homeTabTitle(page2, window2Id)).toBeAttached({ timeout: 120_000 });

    // The second renderer must start clean: its per-window services register under scoped names,
    // so nothing may collide with window 1's registrations. Expected step-aside lines for the
    // app-global services are debug-severity and thus excluded by the pattern (see its doc).
    const window2StartupLog = output.textFrom(beforeCreateMark);
    expect(window2StartupLog).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);

    // Focus routing: with window 2 focused, generic window-service calls answer for window 2.
    await focusWindowAndWaitForRouting(electronApp, window2Id);
    await clickIntoHomeWebView(page2, window2Id);
    const focusInWindow2 = await waitForGenericFocusToReportWindow(window2Id);
    expect(focusInWindow2?.id).toBe(`${HOME_TAB_UUID}-w${window2Id}`);
    logStep(`generic getFocus answered for window ${window2Id}`);

    // …and it follows focus back to window 1.
    await focusWindowAndWaitForRouting(electronApp, window1Id);
    await clickIntoHomeWebView(mainPage, window1Id);
    const focusInWindow1 = await waitForGenericFocusToReportWindow(window1Id);
    expect(focusInWindow1?.id).toBe(`${HOME_TAB_UUID}-w${window1Id}`);
    logStep(`generic getFocus followed back to window ${window1Id}`);

    // Close the SECONDARY window the way a user does. The app must stay up, keep serving window 1,
    // and must NOT treat this as the app going down (no shutdown tasks, no quit).
    const beforeCloseMark = output.mark();
    const page2Closed = page2.waitForEvent('close', { timeout: 30_000 });
    // window.close() tears the page's execution context down, so schedule it instead of calling it
    // inline — an inline call can destroy the context before the evaluate call returns.
    await page2.evaluate(() => {
      setTimeout(() => window.close(), 0);
    });
    await page2Closed;
    logStep(`window ${window2Id} closed`);

    // Give a wrongly-triggered shutdown time to become observable before asserting absence: the
    // shutdown path's first marker is a log line emitted within about a second of the close (the
    // sync command rejects immediately in-process), so a few seconds is ample.
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 5_000);
    });

    // App still running and window 1 still healthy: routing answers, and the generic focus still
    // reports window 1's web view.
    await pollUntil(
      getFocusedWindowId,
      (focusedId) => focusedId === window1Id,
      30_000,
      `routing to answer for window ${window1Id} after the secondary window closed`,
    );
    const focusAfterClose = await waitForGenericFocusToReportWindow(window1Id);
    expect(focusAfterClose?.id).toBe(`${HOME_TAB_UUID}-w${window1Id}`);

    // No shutdown-task activity and no quit from a secondary-window close.
    const afterCloseLog = output.textFrom(beforeCloseMark);
    expect(afterCloseLog).not.toContain(SHUTDOWN_SYNC_ATTEMPT_MARKER);
    SIMPLE_MODE_SHUTDOWN_MARKERS.forEach((marker) => expect(afterCloseLog).not.toContain(marker));
    expect(afterCloseLog).not.toContain(APP_QUITTING_LOG);

    // No faults anywhere in the exercised window: create, route, close.
    const wholeLog = output.text();
    FAULT_MARKERS.forEach((marker) => expect(wholeLog).not.toContain(marker));
  });

  test('closing the window hosting the app-global services hands hosting to the surviving window', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger();
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    logStep('window 1 ready');

    // Baselines: both app-global services answer while window 1 (their host) is alive. Without
    // this, a takeover failure would be indistinguishable from services that never worked.
    const baselineTheme = await pollUntil(
      getCurrentTheme,
      isThemeShaped,
      60_000,
      'theme service to answer before the host closes',
    );
    expect(isThemeShaped(baselineTheme)).toBe(true);
    const baselineRef = await pollUntil(
      getScrollGroupRef,
      isVerseRefShaped,
      60_000,
      'scroll group service to answer before the host closes',
    );
    expect(isVerseRefShaped(baselineRef)).toBe(true);

    const beforeCreateMark = output.mark();
    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    await waitForRendererRegistered(window2Id, 120_000);
    // Window 2 must also have its UI up (not just its services registered) so it is a genuinely
    // live survivor when window 1 goes away.
    await expect(homeTabTitle(page2, window2Id)).toBeAttached({ timeout: 120_000 });

    // Window 1 hosts both app-global services, so window 2 steps aside for each — the log records
    // that explicitly. Renderer log lines reach the captured stream asynchronously, hence the poll.
    await expect(() => {
      const sinceCreate = output.textFrom(beforeCreateMark);
      expect(sinceCreate).toContain(THEME_STEP_ASIDE_LOG);
      expect(sinceCreate).toContain(SCROLL_GROUP_STEP_ASIDE_LOG);
    }).toPass({ timeout: 60_000, intervals: [1_000] });
    logStep(`window ${window2Id} up and stepped aside for both app-global services`);

    // Close WINDOW 1 — the host — the way a user does.
    const beforeHostCloseMark = output.mark();
    const page1Closed = mainPage.waitForEvent('close', { timeout: 30_000 });
    await mainPage.evaluate(() => {
      setTimeout(() => window.close(), 0);
    });
    await page1Closed;
    logStep('window 1 (the host) closed');

    // Both services must recover, served by the survivor. Budget: confirming the dead host is
    // unreachable takes ~10 seconds (the reachability probe retries about 10 times, 1 second
    // apart), each poll attempt can itself burn ~9 seconds in the main process's handler-lookup
    // retry while nothing is registered (see PAPI_ATTEMPT_TIMEOUT_MS), and the survivor then has to
    // win the re-registration race — so 90 seconds gives a couple of full poll cycles of headroom.
    const recoveredTheme = await pollUntil(
      getCurrentTheme,
      isThemeShaped,
      90_000,
      'theme service to be re-hosted by the surviving window',
      2_000,
    );
    expect(typeof recoveredTheme?.type).toBe('string');
    logStep('theme service recovered');
    const recoveredRef = await pollUntil(
      getScrollGroupRef,
      isVerseRefShaped,
      90_000,
      'scroll group service to be re-hosted by the surviving window',
      2_000,
    );
    expect(isVerseRefShaped(recoveredRef)).toBe(true);
    logStep('scroll group service recovered');

    // A write round-trip proves the takeover serves writes, not just cached reads: set scroll
    // group 0's reference on the re-hosted service and read the same value back.
    const targetRef = { book: 'JHN', chapterNum: 3, verseNum: 16 };
    await pollUntil(
      async () => {
        await setScrollGroupRef(targetRef);
        return getScrollGroupRef();
      },
      (ref) =>
        ref?.book === targetRef.book &&
        ref.chapterNum === targetRef.chapterNum &&
        ref.verseNum === targetRef.verseNum,
      30_000,
      'a scroll-group write round-trip against the re-hosted service',
    );
    logStep('scroll-group write round-trip verified against the survivor');

    // The handover is recorded in the log: the survivor drops its now-unreachable cached
    // registration of the theme provider before re-hosting it. (Successful re-hosting itself is
    // proven behaviourally by the reads and the write round-trip above.)
    await expect(() => {
      expect(output.textFrom(beforeHostCloseMark)).toMatch(FORGET_THEME_OBJECT_PATTERN);
    }).toPass({ timeout: 30_000, intervals: [1_000] });

    // The whole flow — second window start, host close, takeover — must complete without faults.
    const wholeLog = output.text();
    FAULT_MARKERS.forEach((marker) => expect(wholeLog).not.toContain(marker));
  });

  test('quitting with two windows open runs the shutdown tasks exactly once and exits cleanly', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger();
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);

    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    // The second renderer must be fully registered so this is a genuine two-live-window quit.
    await waitForRendererRegistered(window2Id, 120_000);
    logStep('both windows up; quitting');

    // Watch the OS process itself, not Playwright's ElectronApplication `close` event. That event
    // additionally waits for the process's stdio streams to close, and a graceful dev-mode quit
    // leaves the .NET data provider watcher child alive holding the inherited pipe write-ends — so
    // the event can stay unfired long after Electron has exited cleanly. The child process `exit`
    // event fires on the exit itself, which is the behaviour under test. Armed before quitting.
    const electronProcess = electronApp.process();
    const processExit = new Promise<{ code: number | undefined; signal: string | undefined }>(
      (resolve) => {
        electronProcess.once('exit', (code, signal) =>
          resolve({ code: code ?? undefined, signal: signal ?? undefined }),
        );
      },
    );

    // Trigger a REAL quit, exactly what File > Exit or Cmd+Q does. app.quit() is scheduled rather
    // than called inline so the evaluate round-trip completes before teardown begins.
    await electronApp.evaluate(({ app }) => {
      setTimeout(() => app.quit(), 0);
    });

    // Budget: the quit path is a bounded shutdown-sync attempt (which rejects immediately here —
    // no S/R extension is registered) plus bounded child-process waits of a few seconds, so a
    // healthy quit lands well under a minute; 120 seconds is slow-machine headroom. A quit that
    // exceeds it means shutdown hung, which is exactly a failure of the behaviour under test.
    const exitResult = await Promise.race([
      processExit,
      new Promise<never>((_resolve, reject) => {
        setTimeout(
          () => reject(new Error('Electron process did not exit within 120 s of app.quit()')),
          120_000,
        );
      }),
    ]);
    logStep(`process exited with code ${exitResult.code} signal ${exitResult.signal}`);

    // The process must exit cleanly (exit code 0), not by signal.
    expect(exitResult.signal).toBeUndefined();
    expect(exitResult.code).toBe(0);

    // Reap what the graceful quit leaves behind: in dev mode the .NET watcher child survives its
    // Electron parent, holding the inherited stdio pipes open. Kill the leftover process group so
    // nothing leaks into later tests and the runner's own cleanup (which waits on those pipes)
    // cannot stall on it. The group leader is already gone, so any error just means the group is
    // fully dead — the desired state.
    if (electronProcess.pid) {
      try {
        process.kill(-electronProcess.pid, 'SIGKILL');
      } catch {
        /* process group already gone */
      }
    }

    const log = output.text();

    // The quit went through the app-shutdown path…
    expect(log).toContain(APP_QUITTING_LOG);
    // …the shutdown path could read the interface mode (otherwise it skips the sync and the count
    // below would be measuring the wrong thing)…
    expect(log).not.toContain(SHUTDOWN_MODE_UNREADABLE_LOG);
    // …and the shutdown-task run happened EXACTLY once: both windows' close handlers funnel into
    // one shared run. Two occurrences would mean each window ran its own shutdown sync; zero would
    // mean a quit that skips shutdown work entirely — the data-loss direction.
    //
    // Level reached by this assertion: it proves the shutdown tasks ran once and attempted the
    // power-mode session sync (which is unreachable here because no S/R extension is installed, so
    // the attempt itself is the observable outcome). It does NOT prove an actual project sync —
    // that needs the S/R extension and lives beyond this repository.
    expect(countOccurrences(log, SHUTDOWN_SYNC_ATTEMPT_MARKER)).toBe(1);

    // Nothing after the quit began may surface a fault.
    const quitLog = log.slice(log.indexOf(APP_QUITTING_LOG));
    FAULT_MARKERS.forEach((marker) => expect(quitLog).not.toContain(marker));
  });
});
