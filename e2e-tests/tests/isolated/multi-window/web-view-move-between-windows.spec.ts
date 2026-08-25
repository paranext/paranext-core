/**
 * Moving a web view between windows, end to end with real Electron windows.
 *
 * A move closes the web view in the window that holds it and reopens it in another window (see
 * `platform.moveWebViewToNewWindow` / `platform.moveWebViewToWindow` in
 * `src/declarations/papi-shared-types.ts`). The order it does that in is the risk: the destination
 * — including a whole cold renderer start, when the destination is a window created for the move —
 * is made ready BEFORE the source tab is captured and closed. That ordering is about real window
 * creation racing real tab teardown, which is precisely what a unit test with stand-in windows
 * cannot exercise: mocks have no renderer to start, no dock to empty, and no emptiness report
 * racing the adopt.
 *
 * Two tests, each launching its own Electron instance (the isolated fixture is test-scoped and each
 * launch costs 30+ seconds, so related assertions are grouped into one instance):
 *
 * 1. The USER'S route: right-click a web view's tab, choose "Move tab to new window". The web view
 *    leaves the window it was in, a second window comes up holding it, the window it left docks a
 *    Home tab of its own, and the app ends with two windows.
 * 2. The COMMAND routes, where the id a move answers with is observable: `moveWebViewToWindow` into an
 *    already-open window, then `moveWebViewToNewWindow` back out of it. The first move empties its
 *    source window while another window is standing, so that window closes; the second move leaves
 *    its source window holding its other tab, so that window stays. It then moves the tab back in
 *    through the tab menu's "Move tab to window" submenu — the user's route to docking a tab back,
 *    and the only route that needs a window to be NAMED, so it also pins that each window is called
 *    after the tab it shows and that a window is never offered as a target for a tab it already
 *    holds. Both windows show a Home tab there, so both are named "Home"; that collision is the
 *    designed behaviour, and it is what makes the target COUNT rather than the target's label the
 *    assertion that catches a window wrongly offering itself. That rides this instance because two
 *    windows are already standing by then. Ends with a graceful quit, so the whole flow is also
 *    swept for faults and duplicate registrations.
 *
 * ## Asserting identity, not shape
 *
 * "The web view moved" and "the destination opened a web view of its own" look identical if the
 * only thing asserted is that the destination shows one Home tab — and in this configuration every
 * window that has nothing else to show holds exactly one Home tab, so shape alone would pass for
 * the wrong reason. Everything here is therefore asserted on web view IDS:
 *
 * - The first window's Home tab comes from the fixed-id fallback layout, so before any move it is
 *   `{@link HOME_TAB_UUID}-w{windowId}` — an id no other Home tab in the session can have.
 * - A Home tab a window docks on the fly gets a freshly minted id (see
 *   {@link expectWindowDockHasOnlyHomeTab}), which can never be that one.
 * - A window that wrongly CLONED another window's layout would render that layout's ids re-scoped to
 *   itself — `{@link HOME_TAB_UUID}-w{itsOwnWindowId}` — ALONGSIDE the web view it received, so a
 *   clone shows up as an EXTRA held id, never as a different value of the moved one. What catches
 *   it is therefore {@link expectWindowToHoldExactly}, which pins the destination's whole set of
 *   held ids: the cloned tab makes that set too big. Comparing the moved id itself against the
 *   clone's id would prove nothing, since the moved id is already constrained (below) to ids the
 *   clone's can never be.
 *
 * The move's own answer is the fourth piece: it returns the AUTHORITATIVE id of the web view after
 * the move, which the API documents as possibly differing from the id passed in, because a web view
 * restored from a persisted layout carries a window-scoped id and the move does not carry that
 * scope into another window. So the ids a moved web view may legitimately answer to are exactly two
 * — the id it was named by, or that id with its window scope stripped
 * ({@link idsMovedWebViewMayAnswerTo}) — and the assertions accept either rather than pinning the
 * one this build happens to produce.
 *
 * ## App configuration
 *
 * Same pre-configuration as the sibling multi-window specs (`platform.interfaceMode: 'power'`,
 * `platform.firstRunComplete: true`, `platform.interfaceLanguage: ['en']`) and the same
 * `DEV_NOISY=false` launch option, which gives the first window the single-Home-tab layout with the
 * fixed web view id every assertion here keys on.
 *
 * Power mode is load-bearing twice over, not a styling choice: the tab context menu's "Move tab to
 * new window" item is rendered only in power mode, and the move-to-a-new-window command is
 * documented to do nothing in simple mode (which is single-window by design).
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
} from '../../../fixtures/helpers';
import {
  DUPLICATE_REGISTRATION_PATTERN,
  FAULT_MARKERS,
  HOME_TAB_UUID,
  RENDERER_STARTING_LOG,
  WEBSOCKET_PORT,
  captureAppOutput,
  createSecondWindow,
  createStepLogger,
  expectWindowDockHasOnlyHomeTab,
  getAppPages,
  getWindowIdOfPage,
  homeTabTitle,
  pollUntil,
  quitAndExpectCleanExit,
  waitForRendererRegistered,
} from './multi-window.util';

// #region move commands

/**
 * Per-request timeout for a move. A move to a new window pays a whole cold renderer start before it
 * touches the web view — deliberately, so a window that never comes up costs a wait and an error
 * rather than a web view open in no window — and a cold start on a loaded machine can take a
 * minute. A budget shorter than that would report a transport timeout for a move that was still
 * legitimately under way.
 */
const MOVE_COMMAND_TIMEOUT_MS = 180_000;

/** Move a web view to a window created for it, answering its authoritative id after the move. */
async function moveWebViewToNewWindow(webViewId: string): Promise<string> {
  return sendPapiRequestOnce<string>(
    'command:platform.moveWebViewToNewWindow',
    [webViewId],
    WEBSOCKET_PORT,
    MOVE_COMMAND_TIMEOUT_MS,
  );
}

/** Move a web view to an already-open window, answering its authoritative id after the move. */
async function moveWebViewToWindow(webViewId: string, targetWindowId: number): Promise<string> {
  return sendPapiRequestOnce<string>(
    'command:platform.moveWebViewToWindow',
    [webViewId, targetWindowId],
    WEBSOCKET_PORT,
    MOVE_COMMAND_TIMEOUT_MS,
  );
}

/**
 * The window-scope suffix a window appends to the web view ids of any layout it loads. Keep in sync
 * with `WINDOW_SUFFIX_PATTERN` in
 * `src/renderer/components/docking/window-scoped-web-view-ids.util.ts` (not imported here — the e2e
 * project cannot resolve the app's path aliases).
 */
const WINDOW_SCOPE_SUFFIX_PATTERN = /-w\d+$/;

/**
 * Every id a moved web view may legitimately answer to in its new window, per the move commands'
 * documented contract: the id it was named by, or that id with its window scope stripped (a web
 * view restored from a persisted layout carries a scope, and a move does not carry one window's
 * scope into another).
 *
 * Deliberately NOT the single id this build happens to return: the contract is what these tests
 * guard, and pinning the current spelling would fail the day a move stops re-scoping — or starts —
 * without anything the API promises having changed.
 *
 * Equally deliberately not "any id at all": the set excludes the id a fresh open would mint and the
 * id a cloned layout would carry, which is what makes an assertion against it an identity claim.
 */
function idsMovedWebViewMayAnswerTo(webViewIdBeforeMove: string): string[] {
  const unscoped = webViewIdBeforeMove.replace(WINDOW_SCOPE_SUFFIX_PATTERN, '');
  return unscoped === webViewIdBeforeMove ? [webViewIdBeforeMove] : [webViewIdBeforeMove, unscoped];
}

// #endregion

// #region window content probes

/**
 * The web view ids a window is holding, read off its dock's tab titles
 * (`platform-tab-title.component.tsx` stamps each web view tab with `data-web-view-id`;
 * non-web-view tabs carry no such attribute and are therefore not matched).
 *
 * Tab titles rather than iframes: every tab in the tab bar renders its title whether or not it has
 * ever been the active tab, while rc-dock mounts a tab's pane — and with it the web view's iframe —
 * lazily. A window holding a tab the user has not looked at yet must still count as holding it.
 */
async function getHeldWebViewIds(page: Page): Promise<string[]> {
  return page
    .locator('.platform-tab-title[data-web-view-id]')
    .evaluateAll((titles) => titles.map((title) => title.getAttribute('data-web-view-id') ?? ''));
}

/**
 * Wait until `page` holds exactly one web view out of `candidateIds`, and answer which one.
 *
 * Polled rather than asserted once: a move lands asynchronously in a window that may still be
 * starting up.
 */
async function waitForWindowToHoldOneOf(
  page: Page,
  candidateIds: string[],
  timeoutMs: number,
  label: string,
): Promise<string> {
  const matches = await pollUntil(
    async () => (await getHeldWebViewIds(page)).filter((id) => candidateIds.includes(id)),
    (found) => found.length === 1,
    timeoutMs,
    label,
  );
  const [heldWebViewId] = matches;
  if (!heldWebViewId) throw new Error(`${label}: poll accepted an empty match list`);
  return heldWebViewId;
}

/**
 * Wait until a window holds exactly the given web view ids and nothing else, then pin the tab count
 * to match — so "the moved tab arrived" cannot pass in a window that also grew a tab nobody asked
 * for, and "the moved tab left" cannot pass in a window that lost everything.
 */
async function expectWindowToHoldExactly(
  page: Page,
  expectedWebViewIds: string[],
  timeoutMs: number,
  label: string,
): Promise<void> {
  await expect(async () => {
    expect(await getHeldWebViewIds(page), label).toEqual(
      expect.arrayContaining(expectedWebViewIds),
    );
    expect((await getHeldWebViewIds(page)).length, label).toBe(expectedWebViewIds.length);
  }).toPass({ timeout: timeoutMs, intervals: [500, 1_000, 2_000] });
  await expect(page.locator('.dock-tab')).toHaveCount(expectedWebViewIds.length);
}

/**
 * How long to let the window set settle before pinning its size. A window that is about to close —
 * or a second window that is about to be created — looks exactly like a settled set for a moment,
 * so the count is read once the wait is satisfied and then again after this pause.
 */
const WINDOW_COUNT_SETTLE_MS = 5_000;

/**
 * Wait until the app has exactly `expectedCount` windows, then confirm it still does after a
 * settle.
 */
async function expectAppWindowCount(
  electronApp: ElectronApplication,
  expectedCount: number,
  timeoutMs: number,
  label: string,
): Promise<void> {
  await pollUntil(
    async () => getAppPages(electronApp).length,
    (count) => count === expectedCount,
    timeoutMs,
    label,
  );
  await new Promise<void>((resolve) => {
    setTimeout(resolve, WINDOW_COUNT_SETTLE_MS);
  });
  expect(getAppPages(electronApp).length, label).toBe(expectedCount);
}

// #endregion

// #region move failure marker

/**
 * What the CONTEXT-MENU route logs when the move it sent is rejected (`handleMoveTabToNewWindow` in
 * `src/renderer/components/docking/platform-tab-title.component.tsx`). No other code in the app
 * emits this phrase. It reaches the captured app output because `log.initialize` in
 * `src/shared/services/logger.service.ts` forwards the renderer's logging to the main process,
 * whose console transport is what {@link captureAppOutput} reads — the same path that puts
 * {@link RENDERER_STARTING_LOG}, itself a renderer line, in the capture.
 *
 * A rejected move is worth a dedicated marker because it need not be visible anywhere else: the
 * failure paths that reopen the web view (the `reopened-in-focused-window` disposition puts it in a
 * window nobody chose) can leave it looking exactly like a successful arrival, satisfying every
 * identity assertion here.
 *
 * The LOG rather than the failure toast the user sees, even though the toast is the user-facing
 * signal: toasts auto-close on a timer derived from their message length (about ten seconds for
 * copy this short — see `src/renderer/services/notification.service-shard.ts`), and the assertions
 * here spend far longer than that waiting out the move, a window creation and two settle periods,
 * so asserting a toast's absence at the end would pass whether or not it was ever shown. The log
 * line does not expire.
 *
 * The COMMAND routes need no marker of their own: a move that fails there rejects the JSON-RPC
 * request, which {@link moveWebViewToWindow} / {@link moveWebViewToNewWindow} surface as a thrown
 * error that fails the test outright. The toast is not even reachable on those routes — it is sent
 * by the context menu's handler, which a command sent over the socket never runs.
 */
const MOVE_FAILURE_LOG = 'Failed to move web view';

// #endregion

test.use({
  // Same options as the sibling multi-window specs — see the `test.use` comment in
  // `multi-window.spec.ts` for the rationale. DEV_NOISY=false is what gives window 1 the
  // single-Home-tab layout whose fixed web view id every identity assertion here keys on.
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('moving a web view between windows', () => {
  // Each test pays full app startup (up to ~180 s worst case) plus one or two extra window
  // startups — a move to a new window contains a whole cold renderer start of its own.
  test.setTimeout(480_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Written before any launch and restored after the last test so the developer's own settings
    // survive the suite. See the file header for why power mode is load-bearing here.
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('a tab moved to a new window through its context menu leaves its window, arrives in the new one, and leaves a Home tab behind', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('web-view-move');
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    const window1Id = getWindowIdOfPage(mainPage);
    logStep(`window ${window1Id} ready`);

    // The web view about to be moved, identified by the fixed id the fallback layout gives it,
    // suffixed with this window's scope. Nothing else in the session can carry this id.
    const webViewIdBeforeMove = `${HOME_TAB_UUID}-w${window1Id}`;
    await expect(homeTabTitle(mainPage, window1Id)).toBeVisible({ timeout: 60_000 });
    await expect(
      mainPage.locator(`iframe[data-web-view-id="${webViewIdBeforeMove}"]`),
    ).toBeAttached({ timeout: 60_000 });
    await expectAppWindowCount(electronApp, 1, 60_000, 'the app to start with exactly one window');
    logStep(`window ${window1Id} holds web view ${webViewIdBeforeMove}`);

    // Drive the only route a user actually has today: the tab's own context menu. The window
    // listener is armed BEFORE the menu item is clicked, so the window the move creates cannot be
    // missed however fast it comes up.
    const beforeMoveMark = output.mark();
    const newWindowPromise = electronApp.waitForEvent('window', {
      predicate: (page: Page) => page.url().includes('windowId='),
      timeout: 180_000,
    });
    await homeTabTitle(mainPage, window1Id).click({ button: 'right' });
    const moveMenuItem = mainPage.getByRole('menuitem', { name: 'Move tab to new window' });
    await expect(moveMenuItem).toBeVisible({ timeout: 30_000 });
    await moveMenuItem.click();
    logStep('chose "Move tab to new window" from the tab context menu');

    const page2 = await newWindowPromise;
    await page2.waitForLoadState('domcontentloaded');
    const window2Id = getWindowIdOfPage(page2);
    expect(window2Id).not.toBe(window1Id);
    await waitForRendererRegistered(window2Id, 180_000);
    logStep(`window ${window2Id} created for the move`);

    // THE MOVE ITSELF, asserted on identity. The new window must hold the web view that was in
    // window 1 — under one of the two ids the move's contract allows it to answer to — and nothing
    // else. "Nothing else" is also what rules out a window that wrongly CLONED window 1's LAYOUT
    // instead of receiving the move: a clone's tabs carry that layout's ids re-scoped to this
    // window and sit ALONGSIDE the moved web view, so a clone is an extra held id rather than a
    // different value of `movedWebViewId`.
    const movedWebViewId = await waitForWindowToHoldOneOf(
      page2,
      idsMovedWebViewMayAnswerTo(webViewIdBeforeMove),
      180_000,
      `window ${window2Id} to hold the moved web view`,
    );
    await expectWindowToHoldExactly(
      page2,
      [movedWebViewId],
      60_000,
      `window ${window2Id} holds only the moved web view`,
    );
    // Not merely present as a tab: its content is really rendering in the new window.
    await expect(page2.locator(`iframe[data-web-view-id="${movedWebViewId}"]`)).toBeAttached({
      timeout: 120_000,
    });
    logStep(`window ${window2Id} holds the moved web view as ${movedWebViewId}`);

    // Gone from the window it left — the tab and its iframe both.
    await expect(
      mainPage.locator(`.platform-tab-title[data-web-view-id="${webViewIdBeforeMove}"]`),
    ).toHaveCount(0, { timeout: 60_000 });
    await expect(mainPage.locator(`iframe[data-web-view-id="${webViewIdBeforeMove}"]`)).toHaveCount(
      0,
    );
    logStep(`window ${window1Id} no longer holds ${webViewIdBeforeMove}`);

    // The window it left has nothing of its own to show, and it is the last window that could be
    // the one the user is left with (the window created for the move is still waiting for content
    // while the source empties), so it docks Home rather than closing — its own freshly minted Home,
    // whose id can be neither the moved web view's nor the one the fallback layout used.
    await expectWindowDockHasOnlyHomeTab(mainPage);
    const [dockedHomeWebViewId] = await getHeldWebViewIds(mainPage);
    expect(dockedHomeWebViewId).toBeDefined();
    expect(dockedHomeWebViewId).not.toBe(movedWebViewId);
    expect(dockedHomeWebViewId).not.toBe(webViewIdBeforeMove);
    logStep(`window ${window1Id} docked its own Home tab as ${dockedHomeWebViewId}`);

    // Two windows, and exactly two: the moved web view's window, plus the window it left.
    await expectAppWindowCount(
      electronApp,
      2,
      60_000,
      'the app to end the move with exactly two windows',
    );

    // Nothing about creating a window, emptying another, and reopening a web view across them may
    // fault or collide — and the move must not have been REJECTED, which a failure that reopened
    // the web view somewhere plausible would otherwise hide from every assertion above (see
    // {@link MOVE_FAILURE_LOG}). The slice starts before the move, so window 2's whole startup is
    // in it — and its renderer's first line is the positive control proving the slice is not empty,
    // which is what keeps these negative sweeps from passing against nothing.
    const moveLog = output.textFrom(beforeMoveMark);
    expect(moveLog).toContain(RENDERER_STARTING_LOG);
    expect(moveLog).not.toContain(MOVE_FAILURE_LOG);
    expect(moveLog).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);
    FAULT_MARKERS.forEach((marker) => expect(moveLog).not.toContain(marker));
  });

  test('moving a web view into an open window and back out again reports the id it answers to, and each source window is left as the rules say', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('web-view-move');
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    const window1Id = getWindowIdOfPage(mainPage);
    const webViewIdBeforeMove = `${HOME_TAB_UUID}-w${window1Id}`;
    await expect(homeTabTitle(mainPage, window1Id)).toBeVisible({ timeout: 60_000 });
    logStep(`window ${window1Id} holds web view ${webViewIdBeforeMove}`);

    // A second window to move INTO. It docks a Home tab of its own, whose freshly minted id is the
    // control for everything below: it is what the destination held before the move, so a
    // destination that ends up holding only it has not received anything.
    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    await waitForRendererRegistered(window2Id, 180_000);
    await expectWindowDockHasOnlyHomeTab(page2);
    const [window2OwnHomeWebViewId] = await getHeldWebViewIds(page2);
    if (!window2OwnHomeWebViewId)
      throw new Error(`window ${window2Id} reported no web view of its own`);
    expect(window2OwnHomeWebViewId).not.toBe(webViewIdBeforeMove);
    logStep(`window ${window2Id} up, holding its own Home tab ${window2OwnHomeWebViewId}`);

    // MOVE INTO THE OPEN WINDOW. The command answers with the authoritative id of the web view
    // after the move — the one thing the context-menu route cannot show — so it is asserted
    // directly against the contract rather than inferred from what turned up on screen.
    const idAfterFirstMove = await moveWebViewToWindow(webViewIdBeforeMove, window2Id);
    expect(idsMovedWebViewMayAnswerTo(webViewIdBeforeMove)).toContain(idAfterFirstMove);
    // The id names the moved web view, never the window's own Home tab: this is the whole
    // difference between "your tab arrived" and "the window already had a Home tab".
    expect(idAfterFirstMove).not.toBe(window2OwnHomeWebViewId);
    logStep(`move into window ${window2Id} answered with ${idAfterFirstMove}`);

    // Window 2 now holds BOTH: its own Home tab and the moved web view. Two tabs is what makes this
    // destination assertion an identity claim rather than a shape one — a window that had merely
    // docked a Home tab of its own would still hold exactly one.
    await expectWindowToHoldExactly(
      page2,
      [window2OwnHomeWebViewId, idAfterFirstMove],
      120_000,
      `window ${window2Id} holds its own Home tab and the moved web view`,
    );
    await expect(page2.locator(`iframe[data-web-view-id="${idAfterFirstMove}"]`)).toBeAttached({
      timeout: 120_000,
    });
    logStep(`window ${window2Id} holds the moved web view`);

    // Window 1 held nothing else, so moving its one web view out empties it — and with window 2
    // standing there holding content, it is NOT the last window that could be the one the user is
    // left with, so it closes rather than docking Home. (Contrast the first test, where the same
    // move leaves Home behind because the only other window is still waiting for content.)
    await expectAppWindowCount(
      electronApp,
      1,
      120_000,
      `window ${window1Id} to close after the move emptied it`,
    );
    expect(mainPage.isClosed()).toBe(true);
    logStep(`window ${window1Id} closed after being emptied`);

    // MOVE BACK OUT, to a window created for it. The source survives this one: it keeps its own
    // Home tab, so it is never empty.
    const secondMoveWindowPromise = electronApp.waitForEvent('window', {
      predicate: (page: Page) => page.url().includes('windowId='),
      timeout: 180_000,
    });
    const idAfterSecondMove = await moveWebViewToNewWindow(idAfterFirstMove);
    expect(idsMovedWebViewMayAnswerTo(idAfterFirstMove)).toContain(idAfterSecondMove);
    const page3 = await secondMoveWindowPromise;
    await page3.waitForLoadState('domcontentloaded');
    const window3Id = getWindowIdOfPage(page3);
    await waitForRendererRegistered(window3Id, 180_000);
    logStep(`move to a new window answered with ${idAfterSecondMove} in window ${window3Id}`);

    // Present in the window created for it, and nothing else is.
    await expectWindowToHoldExactly(
      page3,
      [idAfterSecondMove],
      180_000,
      `window ${window3Id} holds only the moved web view`,
    );
    await expect(page3.locator(`iframe[data-web-view-id="${idAfterSecondMove}"]`)).toBeAttached({
      timeout: 120_000,
    });
    // Nearly implied by the contract check above, and worth being honest about how nearly: that
    // check narrows the answer to the id this move was handed or its unscoped spelling, and the id
    // it was handed was already held apart from window 2's own Home tab at the first move. What is
    // left for this line is the residue — an unscoped spelling colliding with the Home id window 2
    // minted for itself. Unlikely, but it is the one way the answer could name whatever was lying
    // around rather than the web view that moved.
    // (A clone of window 2's layout is caught by the exactness of the assertion above, not here:
    // it would arrive as an extra tab in window 3, never as a different `idAfterSecondMove`.)
    expect(idAfterSecondMove).not.toBe(window2OwnHomeWebViewId);

    // Gone from the window it left — which is still open, still holding its own Home tab, because
    // this move did not empty it.
    await expectWindowToHoldExactly(
      page2,
      [window2OwnHomeWebViewId],
      120_000,
      `window ${window2Id} keeps its own Home tab and no longer holds the moved web view`,
    );
    expect(page2.isClosed()).toBe(false);
    logStep(`window ${window2Id} survived the move out, holding only its own Home tab`);

    await expectAppWindowCount(
      electronApp,
      2,
      60_000,
      'the app to end the second move with exactly two windows',
    );

    // MOVE BACK IN THROUGH THE SUBMENU — the user's route to what the requirement calls docking a
    // tab back, and the only one of the three routes that needs a window to be NAMED. Two windows
    // are already standing at this point, which is what the submenu needs, so this rides the same
    // Electron instance rather than paying for another launch.
    //
    // Each window is named after the tab it is showing, which is what gives it its own OS switcher
    // entry (NN-3) and what the submenu names its targets by. BOTH windows here show a Home tab, so
    // both are called "Home": the design tolerates that collision deliberately, since nothing
    // disambiguates two windows showing the same thing. So this asserts each window is named after
    // its content — never that the two names differ, which would contradict the rule.
    // Auto-retrying, because the title is published asynchronously: a layout change localizes the
    // label before assigning it, and until that resolves the window still shows the document's
    // initial title. The expected value is read from the tab each window is showing rather than
    // written as a literal, which is both the claim being made and immune to an English-string edit
    // Located by the id window 2 minted for its own Home tab, not by `homeTabTitle`, which builds
    // the FIXED-id spelling only window 1's fallback-layout tab carries
    const expectedWindowName = (
      await page2
        .locator(`.platform-tab-title[data-web-view-id="${window2OwnHomeWebViewId}"]`)
        .innerText()
    ).trim();
    await expect(page2).toHaveTitle(expectedWindowName, { timeout: 30_000 });
    await expect(page3).toHaveTitle(expectedWindowName, { timeout: 30_000 });
    const window2Title = await page2.title();
    logStep(`both windows are named after the tab they show: "${window2Title}"`);

    await page3
      .locator(`.platform-tab-title[data-web-view-id="${idAfterSecondMove}"]`)
      .click({ button: 'right' });
    const moveToWindowItem = page3.getByRole('menuitem', { name: 'Move tab to window' });
    await expect(moveToWindowItem).toBeVisible({ timeout: 30_000 });
    await moveToWindowItem.hover();

    // Exactly ONE target with two windows open: the window the tab is already in is left out,
    // because moving it there would do nothing. The COUNT is what proves that rule here — both
    // windows carry the same name, so a submenu wrongly offering this one would show two entries
    // reading "Home" rather than an entry with a label to tell apart.
    const targetItems = page3.getByRole('menuitem', { name: window2Title, exact: true });
    await expect(targetItems).toHaveCount(1, { timeout: 30_000 });
    logStep(`the submenu offers one target, "${window2Title}", and not the window the tab is in`);

    await targetItems.click();

    // Window 2 holds both again, which is the requirement met through the menu rather than the API.
    // The moved web view's id is asserted against the spellings the contract allows rather than
    // pinned, for the same reason the API moves above accept either.
    await expect
      .poll(async () => (await getHeldWebViewIds(page2)).length, { timeout: 120_000 })
      .toBe(2);
    const idsInWindow2AfterSubmenuMove = await getHeldWebViewIds(page2);
    expect(idsInWindow2AfterSubmenuMove).toContain(window2OwnHomeWebViewId);
    const [idMovedBySubmenu] = idsInWindow2AfterSubmenuMove.filter(
      (heldId) => heldId !== window2OwnHomeWebViewId,
    );
    expect(idsMovedWebViewMayAnswerTo(idAfterSecondMove)).toContain(idMovedBySubmenu);

    // Held EXACTLY, with the settle the count poll above cannot give: a wrongly-cloned layout
    // arrives as an extra tab after the count momentarily reads right, which is the whole reason
    // this file asserts destinations this way rather than by shape
    await expectWindowToHoldExactly(
      page2,
      [window2OwnHomeWebViewId, idMovedBySubmenu],
      120_000,
      `window ${window2Id} received the tab back through the submenu`,
    );
    logStep(`tab moved back into window ${window2Id} through the submenu as ${idMovedBySubmenu}`);

    // The source side, by the same rule the earlier moves assert: this move emptied window 3 while
    // window 2 was standing, so window 3 closes rather than docking a Home tab of its own
    await expectAppWindowCount(
      electronApp,
      1,
      120_000,
      `window ${window3Id} to close after the submenu move emptied it`,
    );
    expect(page3.isClosed()).toBe(true);
    logStep(`window ${window3Id} closed after the submenu move emptied it`);

    // A real quit after all of that: the app must still go down cleanly, and the epilogue sweeps
    // everything captured — both moves included — for faults and duplicate registrations, with the
    // quit line itself as the positive control that the corpus is not empty.
    await quitAndExpectCleanExit(electronApp, output, logStep, 'quit after two moves');
  });
});
