/**
 * Switching interface mode decides how many windows the application has.
 *
 * Simple mode is single-window and Power mode is not, so a live switch has to act on the set of
 * windows and not just on each window's own dock. These are the clauses that cannot be established
 * below the application: closing windows and bringing them back are main-process actions whose
 * result is what the user is left looking at after a real switch.
 *
 * TEST 1 — switching to Simple with two windows open leaves exactly one, and it is the primary. The
 * primary is identified from the application before the switch and asserted to be the survivor
 * afterwards, because "one window is left" would pass just as well if the wrong one survived — and
 * the wrong one surviving is the failure that costs the user their main layout, since the primary's
 * entry is the one Simple mode restores and the only one allowed the legacy layout fallback.
 *
 * TEST 2 — a Power → Simple → Power round trip returns both windows WITH THEIR TABS. The tabs are
 * the half that makes this more than a window count: the entries are kept precisely so the windows
 * come back holding what they held, and a switch that reopened two empty windows would satisfy a
 * count-only assertion while losing exactly what the feature promises.
 *
 * TEST 3 — switching to Simple with only the primary open changes nothing. The negative control for
 * test 1: an implementation that closed windows without asking which is the primary would pass test
 * 1 and fail here by leaving the user with no window at all.
 *
 * TEST 4 — creating a window is refused in Simple mode. Simple mode has no chrome that can reach a
 * second window, so the command is refused rather than producing one nobody can see; this refusal
 * is also what keeps two windows from ever holding the Simple layout's fixed tab ids at once.
 *
 * The mode is flipped over the WebSocket rather than by driving the user-profile popover: what is
 * under test is the application's reaction to the setting changing, and going through the UI would
 * make every failure ambiguous between the popover and the reaction.
 */

import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  LaunchElectronAppOptions,
  preConfigureSettings,
  sendPapiRequestOnce,
  waitForAppReady,
} from '../../../fixtures/helpers';
import {
  WEBSOCKET_PORT,
  captureAppOutput,
  createSecondWindow,
  createStepLogger,
  expectNoFaultsWhileRunning,
  getAppPages,
  getHeldWebViewIds,
  expectWindowDockHasOnlyHomeTab,
  getWindowIdOfPage,
  MOVE_COMMAND_TIMEOUT_MS,
  pollUntil,
  waitForRendererRegistered,
} from './multi-window.util';

const BASE_LAUNCH_OPTIONS: LaunchElectronAppOptions = {
  isolatedProjectRoot: true,
  envOverrides: { DEV_NOISY: 'false' },
};

/**
 * A tab id without the window suffix a tab carries.
 *
 * A tab's `data-web-view-id` is the web view id plus the id of the window it is in, so the same web
 * view restored into a different window carries a different tab id. Comparing what a window held
 * before a switch with what it holds after one has to compare the web views, not the windows.
 */
function stripWindowScope(tabId: string): string {
  return tabId.replace(/-w\d+$/, '');
}

/** How long a switch may take to settle before a poll gives up */
const SWITCH_SETTLE_TIMEOUT_MS = 120_000;

/** How long a single PAPI call may take */
const PAPI_CALL_TIMEOUT_MS = 30_000;

/** One open window as the application describes it */
type WindowSummary = { windowId: number; label: string; isMain: boolean };

/** Flip the interface mode the way the user's mode switcher does — by writing the setting */
async function setInterfaceMode(mode: 'simple' | 'power'): Promise<void> {
  await sendPapiRequestOnce(
    'object:platform.settingsServiceDataProvider-data.set',
    ['platform.interfaceMode', mode],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
  );
}

/** The interface mode as the application reports it right now */
async function getInterfaceMode(): Promise<string> {
  return sendPapiRequestOnce<string>(
    'object:platform.settingsServiceDataProvider-data.get',
    ['platform.interfaceMode'],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
  );
}

/**
 * Wait until the application reports the mode it was told to take.
 *
 * Polling the window count instead would synchronize nothing where the count is already right: a
 * poll whose condition holds on its first read returns immediately, so the assertion after it can
 * run before the application has reacted to the change at all.
 */
async function waitForInterfaceMode(mode: 'simple' | 'power'): Promise<void> {
  await pollUntil(
    () => getInterfaceMode(),
    (current) => current === mode,
    SWITCH_SETTLE_TIMEOUT_MS,
    `the application to report the ${mode} interface mode`,
  );
}

/** Ask the application which windows it has, and which of them holds the primary role */
async function getWindowSummaries(): Promise<WindowSummary[]> {
  return sendPapiRequestOnce<WindowSummary[]>(
    'command:platform.getWindows',
    [],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
  );
}

test.use({ electronLaunchOptions: BASE_LAUNCH_OPTIONS });

test.describe('switching interface mode', () => {
  // Every test flips the mode and waits for windows to close or be built again, which is a whole
  // renderer start per window — well past the default budget
  test.setTimeout(900_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Power mode is the starting point for every test here, and the startup restore recreates
    // secondary windows only in Power mode. Restored afterwards so the developer's own settings
    // survive the suite.
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('switching to simple with two windows open leaves exactly the primary', async ({
    electronApp,
    mainPage,
  }) => {
    const output = captureAppOutput(electronApp);
    const logStep = createStepLogger('interface-mode-switch');
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);

    const page2 = await createSecondWindow(electronApp);
    const secondId = getWindowIdOfPage(page2);
    await waitForRendererRegistered(secondId, 120_000);
    logStep(`windows ${primaryId} (primary) and ${secondId} up`);

    // Which window the application itself calls primary, asked before the switch so the survivor
    // is checked against the application's answer rather than against an assumption about
    // creation order
    const primaryBefore = (await getWindowSummaries()).find((summary) => summary.isMain);
    expect(primaryBefore?.windowId).toBe(primaryId);

    await setInterfaceMode('simple');

    await pollUntil(
      async () => getAppPages(electronApp),
      (pages) => pages.length === 1,
      SWITCH_SETTLE_TIMEOUT_MS,
      'the secondary window to close on the switch to simple mode',
    );
    logStep('one window left');

    // The survivor is the primary, not merely some window
    const [survivor] = getAppPages(electronApp);
    expect(getWindowIdOfPage(survivor)).toBe(primaryId);
    expectNoFaultsWhileRunning(output);
  });

  test('a power to simple to power round trip returns both windows with their tabs', async ({
    electronApp,
    mainPage,
  }) => {
    const output = captureAppOutput(electronApp);
    const logStep = createStepLogger('interface-mode-switch');
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);

    // A window created mid-session deliberately starts empty, so the second window is made by
    // MOVING real content into one: there has to be something to preserve for the round trip to
    // mean anything. The primary reopens Home in its place.
    // Polled rather than read once: the application reporting ready does not mean the primary's
    // dock has finished loading its layout, and there is nothing to move until it holds something
    const heldByPrimary = await pollUntil(
      () => getHeldWebViewIds(mainPage),
      (webViewIds) => webViewIds.length > 0,
      SWITCH_SETTLE_TIMEOUT_MS,
      'the primary window to hold a web view that can be moved out',
    );
    const [webViewToMove] = heldByPrimary;
    await sendPapiRequestOnce(
      'command:platform.moveWebViewToNewWindow',
      [webViewToMove],
      WEBSOCKET_PORT,
      MOVE_COMMAND_TIMEOUT_MS,
    );
    await pollUntil(
      async () => getAppPages(electronApp),
      (pages) => pages.length === 2,
      SWITCH_SETTLE_TIMEOUT_MS,
      'the moved web view to open in a window of its own',
    );
    const page2 = getAppPages(electronApp).find((page) => getWindowIdOfPage(page) !== primaryId);
    if (!page2) throw new Error('the window the web view moved into was not found');
    const secondId = getWindowIdOfPage(page2);
    await waitForRendererRegistered(secondId, 120_000);
    // The dock-Home decision lands a round trip AFTER the renderer registers, so reading the window
    // straight away can catch it holding nothing. Both sibling multi-window specs wait here for the
    // same reason.
    await expectWindowDockHasOnlyHomeTab(page2);
    // What the second window holds, recorded before the switch because the window holding it does
    // not survive the excursion — its entry is what carries the content back. The guard is the
    // precondition it proved itself to be: with nothing held, the round trip proves nothing.
    const tabsBefore = await getHeldWebViewIds(page2);
    expect(tabsBefore.length).toBeGreaterThan(0);
    logStep(`window ${secondId} holds ${tabsBefore.length} web view(s)`);

    await setInterfaceMode('simple');
    await pollUntil(
      async () => getAppPages(electronApp),
      (pages) => pages.length === 1,
      SWITCH_SETTLE_TIMEOUT_MS,
      'the secondary window to close on the switch to simple mode',
    );
    logStep('simple mode: one window');

    await setInterfaceMode('power');
    await pollUntil(
      async () => getAppPages(electronApp),
      (pages) => pages.length === 2,
      SWITCH_SETTLE_TIMEOUT_MS,
      'the secondary window to be reopened on the switch back to power mode',
    );
    logStep('power mode: two windows');

    // The window that comes back is a new window with a new id — what has to return is its
    // CONTENT, which is the whole reason its entry was kept
    const reopened = getAppPages(electronApp).find((page) => getWindowIdOfPage(page) !== primaryId);
    expect(reopened).toBeDefined();
    if (!reopened) throw new Error('the reopened window was not found');
    await waitForRendererRegistered(getWindowIdOfPage(reopened), 180_000);
    await pollUntil(
      () => getHeldWebViewIds(reopened),
      (tabs) => tabs.length === tabsBefore.length,
      SWITCH_SETTLE_TIMEOUT_MS,
      'the reopened window to hold the web views it had before the switch',
    );

    // Compared with the per-window suffix stripped: a tab's id is built from the web view id plus
    // the id of the window holding it, and the reopened window is a NEW window — so the raw ids
    // could never match however correct the restore was.
    expect((await getHeldWebViewIds(reopened)).map(stripWindowScope)).toEqual(
      tabsBefore.map(stripWindowScope),
    );
    expectNoFaultsWhileRunning(output);
  });

  test('switching to simple with only the primary open leaves it open', async ({
    electronApp,
    mainPage,
  }) => {
    // The negative control for the first test: a switch that closed windows without asking which
    // one is the primary would pass that one and leave the user with nothing here.
    //
    // No fault sweep here, deliberately: `expectNoFaultsWhileRunning` opens with a positive
    // control that a renderer started during the capture, and the whole point of this test is that
    // nothing starts. The count and identity below are the assertions.
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);
    expect(getAppPages(electronApp)).toHaveLength(1);

    await setInterfaceMode('simple');
    await waitForInterfaceMode('simple');

    // Nothing to close, so nothing may close. Given real time to get it wrong: a poll on a count
    // that is already right would return on its first read and prove nothing, so this waits for
    // the application to have taken the mode and then holds still to see whether a window goes.
    await new Promise((resolve) => {
      setTimeout(resolve, 5_000);
    });
    expect(getAppPages(electronApp)).toHaveLength(1);
    expect(getWindowIdOfPage(getAppPages(electronApp)[0])).toBe(primaryId);
  });

  test('creating a window is refused in simple mode', async ({ electronApp, mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await setInterfaceMode('simple');
    // Waited on the mode itself, not the window count: the count is already 1, so a poll on it
    // returns on its first read and the request below could reach the application before it has
    // taken the new mode — the guard would then read the mode it is being tested for having left.
    await waitForInterfaceMode('simple');

    // Refused, rather than quietly producing a window the mode has no way to show
    await expect(
      sendPapiRequestOnce(
        'command:platform.createWindow',
        [],
        WEBSOCKET_PORT,
        PAPI_CALL_TIMEOUT_MS,
      ),
    ).rejects.toThrow(/simple/i);

    expect(getAppPages(electronApp)).toHaveLength(1);
  });
});
