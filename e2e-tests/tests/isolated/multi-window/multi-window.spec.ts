/**
 * Multi-window lifecycle e2e tests.
 *
 * These are behaviour-level safety nets for the multi-window plumbing (window-scoped services with
 * main-process service routers, app-global services hosted in main, and the shared shutdown-task
 * latch). They deliberately assert only what an outside observer can see — PAPI responses over the
 * WebSocket, page content, and log lines describing user-visible outcomes — so the implementation
 * underneath can be refactored while these tests keep guarding the behaviour.
 *
 * Three tests, each launching its own Electron instance (the isolated fixture is test-scoped and
 * each launch costs 30+ seconds, so related assertions are grouped into one instance):
 *
 * 1. Second-window lifecycle: a window created mid-session that would otherwise be born empty docks
 *    Home instead — one tab, one web view, nothing else (it must not clone the first window's
 *    layout or load some OTHER default layout) — while its per-window services register under
 *    scoped names with no collisions, generic window-service calls route to whichever window has
 *    focus, and closing the secondary window neither quits the app nor runs shutdown tasks.
 * 2. App-global state across windows, and surviving any window's close: a scroll group change and a
 *    theme change each reach every open window, a window created afterwards starts on the current
 *    reference and the current theme rather than the defaults, and then window 1 — no longer
 *    special in any way, since both services are hosted in main — is closed and both keep working.
 *    Proven by what the surviving windows are DISPLAYING, not only by PAPI reads: a PAPI read only
 *    ever talks to main and would pass even if no window heard anything.
 * 3. Quit with two windows: the shutdown tasks run exactly once (not once per window, not zero times)
 *    and the process exits cleanly.
 *
 * Shared plumbing (output capture, window helpers, the graceful-quit pattern) lives in
 * `multi-window.util.ts`, which `window-layout-persistence.spec.ts` also uses.
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
 * With `DEV_NOISY=false` and no saved layout (fresh user-data dir per test), the FIRST window loads
 * the single-Home-tab layout from `src/renderer/testing/test-layout.data.ts` (the fallback for a
 * profile with no saved window structure), whose fixed web view id makes the per-window
 * `-w{windowId}` scoping suffix directly observable. A window created mid-session docks Home by
 * design — its own freshly minted Home tab, not loaded from any shared layout — so window 2 in
 * these tests renders exactly that one tab and nothing more.
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
import type { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  preConfigureSettings,
  sendPapiRequestOnce,
  waitForAppReady,
  waitForOverlayGone,
} from '../../../fixtures/helpers';
import {
  APP_QUITTING_LOG,
  DUPLICATE_REGISTRATION_PATTERN,
  FAULT_MARKERS,
  RENDERER_STARTING_LOG,
  WEBSOCKET_PORT,
  captureAppOutput,
  countOccurrences,
  createSecondWindow,
  createStepLogger,
  expectWindowDockHasOnlyHomeTab,
  focusWindowAndWaitForRouting,
  getFocusedWindowId,
  getWindowIdOfPage,
  homeTabTitle,
  homeTabWebViewId,
  pollUntil,
  quitAndExpectCleanExit,
  waitForRendererRegistered,
  closeWindowLikeAUser,
  widenWindowForToolbarReference,
} from './multi-window.util';

// #region log markers
// Exact substrings of log lines this suite keys on, each with the file that emits it. These are
// behaviour-describing lines (outcomes a user/support person reads in a log), not internal symbol
// names, so they are fair game for behaviour-level assertions. Markers shared with the
// persistence spec live in multi-window.util.ts.

/**
 * The main process announces the network objects a departed window was hosting, naming each of
 * them. `src/shared/services/network-object.service.ts`
 *
 * No window hosts the theme provider (main does, before any window exists), so this pattern
 * matching after a window closes would mean a renderer had claimed the name.
 */
const ANNOUNCE_THEME_OBJECT_PATTERN =
  /Announcing the network objects a departed process took with it:[^\n]*themeServiceDataProvider/;

/**
 * The same announcement, whatever objects it names. Waited for so the negative assertion about the
 * theme provider has something to be a negative OF.
 */
const ANNOUNCE_DEPARTED_OBJECTS_LOG =
  'Announcing the network objects a departed process took with it';

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

/**
 * Logged when the shutdown path cannot read the interface mode and skips the sync entirely.
 * `src/main/shutdown-tasks.ts`
 */
const SHUTDOWN_MODE_UNREADABLE_LOG = 'Could not read platform.interfaceMode';

// #endregion

// #region PAPI helpers (one-shot WebSocket JSON-RPC against the main process, port 8876)

/**
 * Per-attempt timeout for polled PAPI calls. A window-scoped service whose window has just gone
 * away leaves the main process retrying its handler lookup for up to ~9 seconds (10 attempts, 1
 * second apart — see `requestWithRetry` in `src/shared/data/rpc.model.ts`) before answering
 * method-not-found, so each attempt needs a budget above that to distinguish "not registered yet"
 * from a transport failure.
 */
const PAPI_ATTEMPT_TIMEOUT_MS = 15_000;

/** Minimal shape of a window-service focus subject, as seen over JSON-RPC. */
type FocusSubjectLike = { focusType?: string; id?: string; tabType?: string } | undefined;

/**
 * Extract the web view id a focus subject names, however it names it: directly (`focusType:
 * 'webView'`) or via its tab (`focusType: 'tab'`, `tabType: 'webView'`). Both shapes occur in these
 * tests — clicking into a web view's iframe reports the direct shape, while a tab's own mount-time
 * auto-focus (`platform-panel.component.tsx`, `web-view.component.tsx`) always reports the tab
 * shape — so any assertion identifying "the window's Home web view" by focus must accept either.
 * Mirrors `getWebViewIdFromFocusSubject` in `src/shared/services/window.service-model.ts` from the
 * outside (that module isn't importable here — these tests only see the app's observable surface).
 * Returns undefined for a subject that names neither a web view nor a web view's tab.
 */
function webViewIdFromFocusSubject(focus: FocusSubjectLike): string | undefined {
  if (focus?.focusType === 'webView' && typeof focus.id === 'string') return focus.id;
  if (focus?.focusType === 'tab' && focus.tabType === 'webView' && typeof focus.id === 'string')
    return focus.id;
  return undefined;
}

/** Minimal shape of a serialized verse reference, as seen over JSON-RPC. */
type VerseRefLike = { book?: string; chapterNum?: number; verseNum?: number } | undefined;

/** Minimal shape of an expanded theme definition, as seen over JSON-RPC. */
type ThemeLike = { id?: string; type?: string; cssVariables?: Record<string, string> } | undefined;

/**
 * Call the GENERIC window service's `getFocus` — the name declared in `papi.d.ts` that consumers
 * use. The main process serves it via a service router that forwards to whichever window has focus,
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

/**
 * Ask a SPECIFIC window's scoped window service for its own current focus subject, bypassing the
 * service router. This is the ground truth of what that window would answer if the generic call
 * were routed to it.
 */
async function getScopedWindowFocus(windowId: string): Promise<FocusSubjectLike> {
  return sendPapiRequestOnce<FocusSubjectLike>(
    `object:platform.windowServiceDataProvider-${windowId}-data.getFocus`,
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

/** Set the current theme through the app-global theme service. */
async function setCurrentTheme(themeFamilyId: string, type: string): Promise<unknown> {
  return sendPapiRequestOnce<unknown>(
    'object:platform.themeServiceDataProvider-data.setCurrentTheme',
    [undefined, { themeFamilyId, type }],
    WEBSOCKET_PORT,
    PAPI_ATTEMPT_TIMEOUT_MS,
  );
}

/**
 * The theme a window is actually RENDERING WITH, read off the stylesheet element the renderer
 * applies the current theme through (`applyThemeStylesheet` tags it with the theme's id). This is
 * what a user sees, as opposed to what the service in main would answer.
 */
async function expectWindowToRenderTheme(page: Page, themeId: string, timeoutMs: number) {
  await expect(async () => {
    const renderedThemeId = await page.evaluate(
      () =>
        document.querySelector<HTMLStyleElement>('style[data-theme-id]')?.dataset.themeId ??
        '(none)',
    );
    expect(renderedThemeId).toBe(themeId);
  }).toPass({ timeout: timeoutMs, intervals: [500, 1_000] });
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
 * What a window's toolbar is DISPLAYING for the scroll group it follows — the book/chapter
 * control's trigger text, e.g. `John 3:16`.
 *
 * This is the assertion the PAPI reads cannot make: those go straight to main over the WebSocket,
 * so they only prove main answers. This proves the window's own renderer heard about the change and
 * put it on screen, which is what a user sees and the point of the whole move.
 */
async function readToolbarReference(page: Page): Promise<string> {
  return (
    (await page.locator('button[aria-label="book-chapter-trigger"]').first().textContent()) ?? ''
  );
}

/** Wait until a window's toolbar displays a reference containing `expected` (e.g. `'3:16'`). */
async function expectToolbarReferenceToContain(
  page: Page,
  expected: string,
  timeoutMs: number,
): Promise<void> {
  await expect(async () => {
    expect(await readToolbarReference(page)).toContain(expected);
  }).toPass({ timeout: timeoutMs, intervals: [500] });
}

// #endregion

// #region window focus helpers

/**
 * Click into a window's Home web view so that window's focus subject becomes the Home web view.
 * Clicking inside the iframe focuses the iframe element in the window document, which the window
 * service reports as a web-view focus subject carrying the scoped web view id. The click lands near
 * the iframe's top-left corner, which is static content in the Home view (no button to trip).
 */
async function clickIntoHomeWebView(page: Page, windowId: string): Promise<void> {
  const homeIframe = page.locator(`iframe[data-web-view-id="${homeTabWebViewId(windowId)}"]`);
  await expect(homeIframe).toBeVisible({ timeout: 60_000 });
  await page
    .frameLocator(`iframe[data-web-view-id="${homeTabWebViewId(windowId)}"]`)
    .locator('body')
    .click({ position: { x: 10, y: 10 } });
}

/**
 * Wait for the generic window service's `getFocus` to answer with a focus subject belonging to the
 * given window (id suffixed `-w{windowId}`), then return that subject. Polled because focus
 * detection in the renderer is debounced and the service router re-resolves its target on focus
 * changes.
 */
async function waitForGenericFocusToReportWindow(windowId: string): Promise<FocusSubjectLike> {
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
  // HOME_TAB_UUID) in the first window, which is exactly what the scoping and focus assertions
  // need. Mid-session windows dock a freshly minted Home tab of their own regardless of the dev
  // layout (that tab's id is never HOME_TAB_UUID, which is specific to the first window's layout).
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('multi-window lifecycle', () => {
  // Each test pays full app startup (up to ~180 s worst case) plus one or two extra window
  // startups, each of which can take tens of seconds (see the poll budgets below).
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

  test('second window opens with Home docked, focus routing follows the focused window, and closing the secondary window does not shut the app down', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('multi-window');
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    const window1Id = getWindowIdOfPage(mainPage);
    logStep(`window ${window1Id} ready`);

    // Window 1 — the profile's first window, which loads the single-Home-tab fallback layout —
    // renders its Home web view id with its own window suffix.
    await expect(homeTabTitle(mainPage, window1Id)).toBeAttached({ timeout: 60_000 });

    // Pin the generic window service's focus answer to a window-1 subject BEFORE the second window
    // exists: click into window 1's Home web view so window 1's focus subject is that web view.
    // The routing assertion after window 2 takes focus hinges on this baseline — the generic
    // answer must CHANGE away from this subject, which it can only do by being routed elsewhere.
    await focusWindowAndWaitForRouting(electronApp, window1Id);
    await clickIntoHomeWebView(mainPage, window1Id);
    const baselineFocus = await waitForGenericFocusToReportWindow(window1Id);
    expect(baselineFocus?.id).toBe(homeTabWebViewId(window1Id));
    logStep(`generic getFocus pinned to window ${window1Id}'s Home web view`);

    // Create the second window through the public command, with the window listener armed first.
    const beforeCreateMark = output.mark();
    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    expect(window2Id).not.toBe(window1Id);
    await waitForRendererRegistered(window2Id, 120_000);
    logStep(`window ${window2Id} created and registered`);

    // A window created mid-session that would otherwise be born empty docks Home instead: its
    // dock renders exactly one tab (Home) and one web view iframe, and nothing else. This is
    // decided product behaviour; the failure modes it locks out are a new window cloning window
    // 1's layout, loading some OTHER default layout, or failing to dock Home at all.
    await expectWindowDockHasOnlyHomeTab(page2);
    logStep(`window ${window2Id} docked its own Home tab`);

    // The second renderer must start clean: its per-window services register under scoped names and
    // it registers no globally-unique name at all, so nothing may collide with window 1's
    // registrations. Any warn/error collision line here is a fault — see the pattern's doc for why
    // it is bounded by severity.
    const window2StartupLog = output.textFrom(beforeCreateMark);
    // Positive control first: prove this slice actually holds window 2's startup. A mark taken a
    // moment too late leaves an empty slice, against which the collision assertion below passes
    // without having examined anything.
    expect(window2StartupLog).toContain(RENDERER_STARTING_LOG);
    expect(window2StartupLog).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);

    // Focus routing: with window 2 focused, generic window-service calls must be answered by
    // window 2. Window 2's own docked Home tab focuses itself as soon as it mounts — every tab
    // does, regardless of which window currently has OS focus (see the `setFocus` calls in
    // `platform-panel.component.tsx` and `web-view.component.tsx`) — so window 2's genuine focus
    // report names ITS OWN Home tab, via the tab-focus shape those mount-time calls use
    // (`focusType: 'tab'`, `tabType: 'webView'`; see {@link webViewIdFromFocusSubject}): a freshly
    // minted id (docked on the fly, not loaded from any shared layout, so unlike window 1's it
    // carries no `-w{id}` suffix), which can never equal window 1's
    // `homeTabWebViewId(window1Id)`. Read directly off window 2's own scoped service first
    // (bypassing the router) so this is the ground truth to poll the generic, routed answer
    // against, independent of how long window 2's own focus takes to settle.
    await focusWindowAndWaitForRouting(electronApp, window2Id);
    const window2OwnFocus = await pollUntil(
      () => getScopedWindowFocus(window2Id),
      (focus) => webViewIdFromFocusSubject(focus) !== undefined,
      30_000,
      `window ${window2Id}'s own scoped getFocus to report its docked Home web view`,
    );
    const window2OwnFocusId = webViewIdFromFocusSubject(window2OwnFocus);
    const focusInWindow2 = await pollUntil(
      getGenericWindowFocus,
      (focus) => webViewIdFromFocusSubject(focus) === window2OwnFocusId,
      30_000,
      `generic getFocus to report window ${window2Id}'s own Home web view`,
    );
    // The exact shape window 2 reports: its own Home web view id — in particular NOT window 1's.
    expect(focusInWindow2).toEqual(window2OwnFocus);
    expect(webViewIdFromFocusSubject(focusInWindow2)).not.toBe(homeTabWebViewId(window1Id));
    // Discriminate "routed to window 2" from "still answering window 1": window 1's own scoped
    // service must still hold its Home web view subject (a background window's focused element is
    // retained while the window is inactive), so the answer above cannot have come from window 1 —
    // only from the service router genuinely forwarding to window 2.
    const window1OwnFocus = await getScopedWindowFocus(window1Id);
    expect(window1OwnFocus?.id).toBe(homeTabWebViewId(window1Id));
    logStep(`generic getFocus answered for window ${window2Id}`);

    // …and it follows focus back to window 1.
    await focusWindowAndWaitForRouting(electronApp, window1Id);
    await clickIntoHomeWebView(mainPage, window1Id);
    const focusInWindow1 = await waitForGenericFocusToReportWindow(window1Id);
    expect(focusInWindow1?.id).toBe(homeTabWebViewId(window1Id));
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
    expect(focusAfterClose?.id).toBe(homeTabWebViewId(window1Id));

    // No shutdown-task activity and no quit from a secondary-window close.
    const afterCloseLog = output.textFrom(beforeCloseMark);
    expect(afterCloseLog).not.toContain(SHUTDOWN_SYNC_ATTEMPT_MARKER);
    SIMPLE_MODE_SHUTDOWN_MARKERS.forEach((marker) => expect(afterCloseLog).not.toContain(marker));
    expect(afterCloseLog).not.toContain(APP_QUITTING_LOG);

    // No faults anywhere in the exercised window: create, route, close.
    const wholeLog = output.text();
    FAULT_MARKERS.forEach((marker) => expect(wholeLog).not.toContain(marker));
  });

  test('scroll group and theme changes reach every window, and closing any window disturbs neither', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('multi-window');
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    // This test reads references off both windows' toolbars, so every window it asserts on has to
    // stay above the toolbar shrink ladder's narrowest rung, where the chapter and verse are gone.
    await widenWindowForToolbarReference(electronApp, mainPage);
    logStep('window 1 ready');

    // Baselines: both app-global services answer before anything is changed or closed. Without
    // this, a service that broke later would be indistinguishable from one that never worked.
    const baselineTheme = await pollUntil(
      getCurrentTheme,
      isThemeShaped,
      60_000,
      'theme service to answer before anything is changed',
    );
    expect(isThemeShaped(baselineTheme)).toBe(true);
    const baselineRef = await pollUntil(
      getScrollGroupRef,
      isVerseRefShaped,
      60_000,
      'scroll group service to answer before anything is changed',
    );
    expect(isVerseRefShaped(baselineRef)).toBe(true);

    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    await waitForRendererRegistered(window2Id, 120_000);
    // Window 2 must also have its UI genuinely up (not just its services registered) so it is a
    // live survivor when window 1 goes away. This test doesn't care about window 2's own tab
    // content (a mid-session window docks its own Home tab, but that isn't what's under test
    // here), so "up" means its dock container rendered and its startup overlay cleared.
    await expect(page2.locator('div[class*="dock-layout"]')).toBeAttached({ timeout: 120_000 });
    await waitForOverlayGone(page2, 120_000);
    await widenWindowForToolbarReference(electronApp, page2);

    logStep(`window ${window2Id} up`);

    // THE HEADLINE BEHAVIOUR: a change to a scroll group reaches every window's UI. Written through
    // the host (which is where a navigation in any window ends up) and then read off BOTH windows'
    // toolbars, so this fails if the host stops broadcasting or a window's cache stops listening —
    // neither of which a PAPI read, which only ever talks to main, can see.
    const sharedRef = { book: 'JHN', chapterNum: 3, verseNum: 16 };
    await setScrollGroupRef(sharedRef);
    await expectToolbarReferenceToContain(page2, '3:16', 60_000);
    await expectToolbarReferenceToContain(mainPage, '3:16', 60_000);
    logStep('scroll group change reached both windows');

    // The same for the theme, and read the same way — off what each window is RENDERING rather than
    // off the service. `paratext` is a built-in family, so it exists whatever extensions are loaded.
    await setCurrentTheme('paratext', 'dark');
    await expectWindowToRenderTheme(page2, 'paratext-dark', 60_000);
    await expectWindowToRenderTheme(mainPage, 'paratext-dark', 60_000);
    logStep('theme change reached both windows');

    // A window created AFTER those changes must show them on its first paint rather than starting on
    // the defaults and jumping: main puts both on the window's URL, the same channel the window id
    // arrives on.
    const page3 = await createSecondWindow(electronApp);
    const window3Url = decodeURIComponent(page3.url());
    expect(window3Url).toContain('JHN');
    expect(window3Url).toContain('paratext-dark');
    await widenWindowForToolbarReference(electronApp, page3);
    await expectToolbarReferenceToContain(page3, '3:16', 60_000);
    await expectWindowToRenderTheme(page3, 'paratext-dark', 60_000);
    logStep('a newly created window starts on the current reference and theme');

    // Close a SECONDARY window the way a user does. It hosts neither app-global service — both live
    // in main — so nothing about this close should be special.
    //
    // Not the primary, which this used to close: closing the primary while other windows are open
    // now asks whether to close the whole application, so "the primary goes and the others stay" is
    // no longer a state the app can reach. `window-close-rule.spec.ts` owns that path.
    const beforeWindowCloseMark = output.mark();
    await closeWindowLikeAUser(electronApp, page3);
    logStep('window 3 closed');

    // Both services are hosted in main, which did not go anywhere, so both must keep answering
    // across the close with no handover at all.
    const themeAfterClose = await pollUntil(
      getCurrentTheme,
      isThemeShaped,
      90_000,
      'theme service to keep answering after a window closed',
      2_000,
    );
    expect(themeAfterClose?.id).toBe('paratext-dark');
    logStep('theme service still answering');
    const refAfterClose = await pollUntil(
      getScrollGroupRef,
      isVerseRefShaped,
      90_000,
      'scroll group service to keep answering after a window closed',
      2_000,
    );
    expect(isVerseRefShaped(refAfterClose)).toBe(true);
    logStep('scroll group service still answering');

    // Write round-trips prove both services serve writes, not just cached reads, AND that the
    // surviving windows are still being fed: change each one and then look at what the survivors are
    // actually displaying.
    const targetRef = { book: 'ROM', chapterNum: 8, verseNum: 28 };
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
      'a scroll-group write round-trip after a window closed',
    );
    await expectToolbarReferenceToContain(page2, '8:28', 60_000);
    await expectToolbarReferenceToContain(mainPage, '8:28', 60_000);
    logStep('surviving windows followed a scroll-group write made after a window closed');

    await setCurrentTheme('paratext', 'light');
    await expectWindowToRenderTheme(page2, 'paratext-light', 60_000);
    await expectWindowToRenderTheme(mainPage, 'paratext-light', 60_000);
    logStep('surviving windows followed a theme change made after a window closed');

    // No window ever hosted the theme provider, so the closed window cannot have taken it with it:
    // the departed-objects announcement must not name it. This is what makes "closing any window is
    // ordinary" checkable rather than merely asserted — a renderer that started claiming the name
    // again would show up here even while every read above still passed.
    await expect(() => {
      expect(output.textFrom(beforeWindowCloseMark)).toContain(ANNOUNCE_DEPARTED_OBJECTS_LOG);
    }).toPass({ timeout: 60_000, intervals: [1_000] });
    expect(output.textFrom(beforeWindowCloseMark)).not.toMatch(ANNOUNCE_THEME_OBJECT_PATTERN);

    // The whole flow — second window start, app-global changes, a window close — must complete
    // without faults.
    const wholeLog = output.text();
    FAULT_MARKERS.forEach((marker) => expect(wholeLog).not.toContain(marker));
  });

  test('quitting with two windows open runs the shutdown tasks exactly once and exits cleanly', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('multi-window');
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);

    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    // The second renderer must be fully registered so this is a genuine two-live-window quit.
    await waitForRendererRegistered(window2Id, 120_000);
    logStep('both windows up; quitting');

    // Trigger a REAL quit and watch the OS process itself — see quitAppAndWaitForExit (which the
    // shared epilogue wraps) for why the process `exit` event (not Playwright's `close` event) is
    // the right signal and why the leftover process group is reaped afterwards. The epilogue also
    // asserts a clean exit (code 0, no signal) and sweeps the whole captured log for fault markers
    // and duplicate registrations.
    await quitAndExpectCleanExit(electronApp, output, logStep, 'quit');

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
    // The fault-marker sweep (whole log, so the quit window included) ran in the epilogue above.
  });
});
