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
  getWindowIdOfPage,
  pollUntil,
  waitForRendererRegistered,
} from './multi-window.util';

const BASE_LAUNCH_OPTIONS: LaunchElectronAppOptions = {
  isolatedProjectRoot: true,
  envOverrides: { DEV_NOISY: 'false' },
};

/** How long a switch may take to settle before a poll gives up */
const SWITCH_SETTLE_TIMEOUT_MS = 120_000;

/** How long a single PAPI call may take */
const PAPI_CALL_TIMEOUT_MS = 30_000;

/** One open window as the application describes it */
type WindowSummary = { windowId: number; label: string; isMain: boolean };

/** Flip the interface mode the way the user's mode switcher does — by writing the setting */
async function setInterfaceMode(mode: 'simple' | 'power'): Promise<void> {
  await sendPapiRequestOnce(
    'object:platform.settingsServiceDataProvider.set',
    ['platform.interfaceMode', mode],
    WEBSOCKET_PORT,
    PAPI_CALL_TIMEOUT_MS,
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

    const page2 = await createSecondWindow(electronApp);
    const secondId = getWindowIdOfPage(page2);
    await waitForRendererRegistered(secondId, 120_000);
    // What the second window holds, recorded before the switch because the window holding it does
    // not survive the excursion — its entry is what carries the content back
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
    expect(await getHeldWebViewIds(reopened)).toEqual(tabsBefore);
    expectNoFaultsWhileRunning(output);
  });

  test('switching to simple with only the primary open leaves it open', async ({
    electronApp,
    mainPage,
  }) => {
    // The negative control for the first test: a switch that closed windows without asking which
    // one is the primary would pass that one and leave the user with nothing here
    const output = captureAppOutput(electronApp);
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);
    expect(getAppPages(electronApp)).toHaveLength(1);

    await setInterfaceMode('simple');

    // Nothing to close, so nothing may close. Given time to get it wrong rather than read once,
    // because the failure this guards against is asynchronous.
    await expect
      .poll(() => getAppPages(electronApp).length, { timeout: 30_000, intervals: [1_000] })
      .toBe(1);
    expect(getWindowIdOfPage(getAppPages(electronApp)[0])).toBe(primaryId);
    expectNoFaultsWhileRunning(output);
  });

  test('creating a window is refused in simple mode', async ({ electronApp, mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await setInterfaceMode('simple');
    await expect
      .poll(() => getAppPages(electronApp).length, { timeout: 30_000, intervals: [1_000] })
      .toBe(1);

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
