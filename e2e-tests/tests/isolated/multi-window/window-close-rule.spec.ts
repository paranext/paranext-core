/**
 * The window-close rule: the primary window's ✕ decides whether the app quits.
 *
 * TEST 1 — cancel keeps everything. With two windows open, closing the primary through its ✕ shows
 * the close-all question. Answering Cancel leaves both windows open, the app up, and — the part a
 * unit test cannot see — the primary still able to be closed again: a cancel that left the close
 * guard latched would make the next ✕ fall through to Electron's default close with none of the
 * shutdown work. So the test closes the primary a SECOND time and expects the question again.
 *
 * TEST 2 — confirm closes all and relaunch restores all. Same setup; answering "Close all windows"
 * brings the app down cleanly, and the next launch restores BOTH windows. This is the test that
 * keeps the dialog's own sentence honest: it promises the windows will be restored the next time
 * the application is opened, so the relaunch half is not optional.
 *
 * TEST 3 — the emptied primary. Its last tab is moved out; it docks Home rather than closing, and
 * is still the primary, shown by its ✕ still asking.
 *
 * TEST 4 — a quit during the question IS the answer. With the question showing and unanswered, a
 * real quit arrives (`app.quit()`, which is what Cmd+Q, File → Quit and platform.quit all do). A
 * quit outranks any button, and the question cannot outlive it: the decision stops waiting and the
 * primary goes into its normal shutdown work. Both entries must survive and both windows return.
 * Written against a question that NEVER answers, which is the reproduction of the deadlock this
 * once had — the quit's own close is ignored while asking, and a prevented close cancels the quit,
 * so nothing but the decision giving way can end it.
 *
 * TEST 5 — a second close arriving while the question is still open asks nothing more. With the
 * question up and unanswered, the primary's ✕ is clicked again. The stub records every call it gets
 * whether or not it ever answers, so nothing but the guard around `isAskingAboutClose` stops a
 * second click from putting up a second question — this is the guard's own test, not the dialog's.
 *
 * The native dialog is stubbed in the main process through `electronApp.evaluate`, which records
 * each call and answers as the test directs, or holds the question open for test 4. `app.quit()` is
 * deliberately NOT how test 2 brings the app down: that path sets the quit latch first and never
 * asks, which is the behaviour the rule leaves unchanged.
 *
 * Every test carries a "the primary is still what it should be" assertion in one form or another,
 * because the failure they guard against is silent: a stuck guard, a stuck latch, or a spliced
 * entry shows up as a window that looks fine and then closes wrong.
 */

import fs from 'fs';
import path from 'path';
import type { ElectronApplication } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  ElectronAppContext,
  LaunchElectronAppOptions,
  launchElectronApp,
  preConfigureSettings,
  sendPapiRequestOnce,
  teardownElectronApp,
  waitForAppReady,
} from '../../../fixtures/helpers';
import {
  MOVE_COMMAND_TIMEOUT_MS,
  WEBSOCKET_PORT,
  captureAppOutput,
  createSecondWindow,
  createStepLogger,
  expectWindowDockHasOnlyHomeTab,
  getWindowIdOfPage,
  homeTabTitle,
  homeTabWebViewId,
  pollUntil,
  quitAppAndWaitForExit,
  waitForAppPages,
  waitForRendererRegistered,
} from './multi-window.util';

const BASE_LAUNCH_OPTIONS: LaunchElectronAppOptions = {
  isolatedProjectRoot: true,
  envOverrides: { DEV_NOISY: 'false' },
};

/** Index of the "Close all windows" button as the app lays the dialog out; Cancel is the other */
const CLOSE_ALL_BUTTON = 0;
const CANCEL_BUTTON = 1;

/** What the stubbed message box records about each call it received */
type RecordedMessageBox = { buttons: string[] };

/**
 * Replace the main process's message box with one that records every call and answers with a fixed
 * button index — or, when `holdOpen` is set, records the call and never resolves, so the test can
 * act while the question is still "showing". The record is read back with
 * {@link readMessageBoxCalls}.
 *
 * The record lives on the `dialog` module object itself, which every `evaluate` sees the same
 * instance of, so nothing has to be smuggled through a global.
 */
async function stubMessageBox(
  electronApp: ElectronApplication,
  answer: number,
  holdOpen = false,
): Promise<void> {
  await electronApp.evaluate(
    ({ dialog }, { buttonIndex, neverResolve }) => {
      const calls: RecordedMessageBox[] = [];
      // Electron overloads the call as (window, options) and (options); the app uses the first.
      // The record is what the test reads; the answer is what the app reads.
      const stub = (
        windowOrOptions: Electron.BaseWindow | Electron.MessageBoxOptions,
        maybeOptions?: Electron.MessageBoxOptions,
      ): Promise<Electron.MessageBoxReturnValue> => {
        const options =
          maybeOptions ?? ('buttons' in windowOrOptions ? windowOrOptions : undefined);
        calls.push({ buttons: options?.buttons ?? [] });
        if (neverResolve) return new Promise(() => {});
        return Promise.resolve({ response: buttonIndex, checkboxChecked: false });
      };
      Object.assign(dialog, { showMessageBox: stub, recordedMessageBoxCalls: calls });
    },
    { buttonIndex: answer, neverResolve: holdOpen },
  );
}

/** Every message-box call recorded since {@link stubMessageBox}, oldest first */
async function readMessageBoxCalls(
  electronApp: ElectronApplication,
): Promise<RecordedMessageBox[]> {
  return electronApp.evaluate(({ dialog }) => {
    // `stubMessageBox` hangs the record off the dialog module; read it back the same way
    const record: unknown = Reflect.get(dialog, 'recordedMessageBoxCalls');
    if (!Array.isArray(record)) return [];
    // Narrow each entry rather than asserting the array's type: only the `buttons` field is read
    return record.flatMap((entry: unknown): RecordedMessageBox[] => {
      if (typeof entry !== 'object' || !entry || !('buttons' in entry)) return [];
      const { buttons } = entry;
      return Array.isArray(buttons) ? [{ buttons: buttons.map(String) }] : [];
    });
  });
}

/** Ask a window to close the way its ✕ does — through Electron's `close`, not `app.quit()` */
async function clickCloseOn(electronApp: ElectronApplication, windowId: number): Promise<void> {
  await electronApp.evaluate(({ BrowserWindow }, id) => {
    const win = BrowserWindow.fromId(id);
    if (!win) throw new Error(`No BrowserWindow with id ${id}`);
    win.close();
  }, windowId);
}

/** IDs of the windows still alive in the main process */
async function liveWindowIds(electronApp: ElectronApplication): Promise<number[]> {
  return electronApp.evaluate(({ BrowserWindow }) =>
    BrowserWindow.getAllWindows()
      .filter((win) => !win.isDestroyed())
      .map((win) => win.id)
      .sort((a, b) => a - b),
  );
}

/** How many window entries the persisted structure holds */
function countSavedWindowEntries(userDataDir: string): number {
  const file = path.join(userDataDir, 'window-layouts.json');
  const parsed: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (typeof parsed !== 'object' || !parsed || !('windows' in parsed)) return 0;
  const { windows } = parsed;
  return Array.isArray(windows) ? windows.length : 0;
}

test.use({
  // The fixture launches with no special options unless a suite says otherwise, and the three
  // tests that take `mainPage` from it need the same app the two that launch explicitly get.
  // DEV_NOISY=false is the load-bearing half: it gives the first window the single-Home-tab
  // fallback layout whose fixed web view id the emptied-primary test moves out.
  electronLaunchOptions: BASE_LAUNCH_OPTIONS,
});

test.describe('window close rule', () => {
  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Power mode is REQUIRED: the startup restore recreates secondary windows only in Power mode,
    // so without it tests 2 and 4 would see one window come back and fail for configuration
    // reasons rather than for the rule under test. Restored afterwards so the developer's own
    // settings survive the suite.
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('closing the primary with another window open asks, and cancel keeps everything', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('window-close-rule');
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);

    const page2 = await createSecondWindow(electronApp);
    const secondId = getWindowIdOfPage(page2);
    await waitForRendererRegistered(secondId, 120_000);
    logStep(`windows ${primaryId} (primary) and ${secondId} up`);

    await stubMessageBox(electronApp, CANCEL_BUTTON);
    await clickCloseOn(electronApp, primaryId);

    // The question was asked, with the outcome-named buttons the rule specifies…
    await pollUntil(
      () => readMessageBoxCalls(electronApp),
      (calls) => calls.length === 1,
      30_000,
      'the close-all question to be asked',
    );
    const [firstAsk] = await readMessageBoxCalls(electronApp);
    expect(firstAsk.buttons).toHaveLength(2);
    expect(firstAsk.buttons[CLOSE_ALL_BUTTON]).toMatch(/close all windows/i);
    expect(firstAsk.buttons[CANCEL_BUTTON]).toMatch(/cancel/i);
    logStep('asked once; cancelled');

    // …and cancelling changed nothing: both windows are still alive and the app is up
    expect(await liveWindowIds(electronApp)).toEqual([primaryId, secondId].sort((a, b) => a - b));
    await expect(mainPage.locator('body')).toBeVisible();

    // The primary is still a window that ASKS, not one whose close guard is stuck: a second ✕ must
    // produce a second question rather than falling through to Electron's default close.
    await clickCloseOn(electronApp, primaryId);
    await pollUntil(
      () => readMessageBoxCalls(electronApp),
      (calls) => calls.length === 2,
      30_000,
      'the close-all question to be asked a second time',
    );
    expect(await liveWindowIds(electronApp)).toEqual([primaryId, secondId].sort((a, b) => a - b));
    logStep('asked again on the second close; still both windows');
  });

  test('confirming closes every window, and the next launch restores all of them', async () => {
    const logStep = createStepLogger('window-close-rule');
    let ctx: ElectronAppContext | undefined;

    try {
      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, preserveUserDataDir: true });
      const { userDataDir } = ctx;
      const output = captureAppOutput(ctx.electronApp);
      const [mainPage] = await waitForAppPages(ctx.electronApp, 1, 90_000);
      await waitForAppReady(mainPage, 180_000);
      const primaryId = getWindowIdOfPage(mainPage);

      const page2 = await createSecondWindow(ctx.electronApp);
      const secondId = getWindowIdOfPage(page2);
      await waitForRendererRegistered(secondId, 120_000);
      logStep(`phase 1: windows ${primaryId} (primary) and ${secondId} up`);

      await stubMessageBox(ctx.electronApp, CLOSE_ALL_BUTTON);

      // Every window goes down and the process exits cleanly — a real quit, not a hang and not a
      // crash. The ✕ is the trigger rather than `app.quit()`, which would set the quit latch and
      // never ask. That a secondary's own close asks nothing further is pinned in
      // `decideWindowClose`'s tests instead of here: the stub's recorded calls live in the main
      // process this test is waiting to see exit, so the only moment this test could read them is
      // one where a later second question has not been asked yet — a count taken there would
      // agree with itself whether or not the rule holds.
      // Bound once because a closure does not keep `ctx`'s narrowing to a launched app
      const { electronApp } = ctx;
      const exit = await quitAppAndWaitForExit(electronApp, output, () =>
        clickCloseOn(electronApp, primaryId),
      );
      logStep(`phase 1: exited with code ${exit.code} signal ${exit.signal}`);
      expect(exit.signal).toBeUndefined();
      expect(exit.code).toBe(0);
      const log = output.text();
      expect(log).toContain('Main process is quitting');

      // Both entries survived the quit: a primary-close-quit records every window as staying
      expect(countSavedWindowEntries(userDataDir)).toBe(2);
      logStep('phase 1: persisted structure holds both windows');

      await teardownElectronApp(ctx);
      ctx = undefined;

      // Phase 2 — the promise the dialog makes: both windows come back
      ctx = await launchElectronApp({
        ...BASE_LAUNCH_OPTIONS,
        userDataDir,
        preserveUserDataDir: true,
      });
      const restored = await waitForAppPages(ctx.electronApp, 2, 240_000);
      expect(restored).toHaveLength(2);
      const [restoredMain, restoredSecond] = restored;
      await waitForAppReady(restoredMain, 180_000);
      await waitForRendererRegistered(getWindowIdOfPage(restoredSecond), 120_000);
      logStep('phase 2: both windows restored');
    } finally {
      if (ctx) await teardownElectronApp(ctx);
    }
  });

  test('the primary survives having its last tab moved out, and comes back with Home', async ({
    electronApp,
    mainPage,
  }) => {
    // Moving the primary's last tab out does what closing that tab does — Home reopens. The
    // primary neither empties away nor closes. If it closed, nothing would hold the primary role
    // and the window the user moved their work into would be a secondary whose ✕ drops its layout.
    // So this asserts both halves: the primary stays and docks Home, and it is STILL the primary —
    // shown by its ✕ asking, which only the primary's does.
    const logStep = createStepLogger('window-close-rule');
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);

    const page2 = await createSecondWindow(electronApp);
    const secondId = getWindowIdOfPage(page2);
    await waitForRendererRegistered(secondId, 120_000);
    logStep(`windows ${primaryId} (primary) and ${secondId} up`);

    // The primary's Home tab comes from the fixed fallback layout, so its id is known without
    // reading the dock — but it has to have RENDERED before it can be moved, and app-ready does not
    // wait for the dock. Waiting on the tab itself is what the sibling move spec does.
    await expect(homeTabTitle(mainPage, primaryId)).toBeVisible({ timeout: 60_000 });
    const webViewInPrimary = homeTabWebViewId(primaryId);

    // Move the primary's only web view into window 2, emptying the primary
    const movedWebViewId = await sendPapiRequestOnce<string>(
      'command:platform.moveWebViewToWindow',
      [webViewInPrimary, secondId],
      WEBSOCKET_PORT,
      MOVE_COMMAND_TIMEOUT_MS,
    );
    logStep(`moved ${movedWebViewId} out of the primary and into window ${secondId}`);

    // The primary stays, and docks Home rather than sitting empty. Docked on the fly, so it carries
    // a freshly minted id rather than the fixed fallback-layout one `homeTabTitle` builds.
    await expectWindowDockHasOnlyHomeTab(mainPage);
    expect(mainPage.isClosed()).toBe(false);
    expect(await liveWindowIds(electronApp)).toHaveLength(2);
    logStep('primary stayed open and docked Home');

    // And it is still the primary: only the primary's ✕ asks
    await stubMessageBox(electronApp, CANCEL_BUTTON);
    await clickCloseOn(electronApp, primaryId);
    await pollUntil(
      () => readMessageBoxCalls(electronApp),
      (calls) => calls.length === 1,
      30_000,
      'the emptied primary’s ✕ to still ask',
    );
    expect(await liveWindowIds(electronApp)).toHaveLength(2);
    logStep('the emptied primary is still the primary — its ✕ asked');
  });

  test('a quit arriving while the question is open still keeps the primary for next launch', async () => {
    // The question is not a close in progress. A close that reaches the primary while it is
    // showing — here `app.quit()`, as Cmd+Q, File → Quit and platform.quit all are — must go
    // through the primary's normal shutdown work, not the escape hatch that skips it. If it took
    // the hatch, the primary's entry would be spliced out and the user's main layout lost: the
    // very loss this rule exists to prevent, reopened through a timing window.
    const logStep = createStepLogger('window-close-rule');
    let ctx: ElectronAppContext | undefined;

    try {
      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, preserveUserDataDir: true });
      const { userDataDir } = ctx;
      const output = captureAppOutput(ctx.electronApp);
      const [mainPage] = await waitForAppPages(ctx.electronApp, 1, 90_000);
      await waitForAppReady(mainPage, 180_000);
      const primaryId = getWindowIdOfPage(mainPage);

      const page2 = await createSecondWindow(ctx.electronApp);
      const secondId = getWindowIdOfPage(page2);
      await waitForRendererRegistered(secondId, 120_000);
      logStep(`phase 1: windows ${primaryId} (primary) and ${secondId} up`);

      // The question is asked and then left hanging, as a user staring at it would leave it
      const { electronApp } = ctx;
      await stubMessageBox(electronApp, CANCEL_BUTTON, true);
      await clickCloseOn(electronApp, primaryId);
      await pollUntil(
        () => readMessageBoxCalls(electronApp),
        (calls) => calls.length === 1,
        30_000,
        'the close-all question to be showing',
      );
      logStep('phase 1: question showing; quitting underneath it');

      // Now a real quit arrives while the question is still up. `quitAppAndWaitForExit` triggers
      // `app.quit()` itself and arms its exit listener first, which is exactly what this test needs.
      const exit = await quitAppAndWaitForExit(ctx.electronApp, output);
      logStep(`phase 1: exited with code ${exit.code} signal ${exit.signal}`);
      expect(exit.signal).toBeUndefined();
      expect(exit.code).toBe(0);
      expect(output.text()).toContain('Main process is quitting');

      // The proof: the primary's entry is still there. Had the quit taken the escape hatch, the
      // primary would have been recorded as leaving and its entry spliced out.
      expect(countSavedWindowEntries(userDataDir)).toBe(2);
      logStep('phase 1: both entries survived the quit-during-question');

      await teardownElectronApp(ctx);
      ctx = undefined;

      ctx = await launchElectronApp({
        ...BASE_LAUNCH_OPTIONS,
        userDataDir,
        preserveUserDataDir: true,
      });
      const restored = await waitForAppPages(ctx.electronApp, 2, 240_000);
      expect(restored).toHaveLength(2);
      await waitForAppReady(restored[0], 180_000);
      logStep('phase 2: both windows restored, primary included');
    } finally {
      if (ctx) await teardownElectronApp(ctx);
    }
  });

  test('a second close while the question is still open asks nothing new', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('window-close-rule');
    await waitForAppReady(mainPage, 180_000);
    const primaryId = getWindowIdOfPage(mainPage);

    const page2 = await createSecondWindow(electronApp);
    const secondId = getWindowIdOfPage(page2);
    await waitForRendererRegistered(secondId, 120_000);
    logStep(`windows ${primaryId} (primary) and ${secondId} up`);

    // The question is asked and left hanging, as test 4's does, so it is still open for the
    // second close below to arrive underneath.
    await stubMessageBox(electronApp, CANCEL_BUTTON, true);
    await clickCloseOn(electronApp, primaryId);
    await pollUntil(
      () => readMessageBoxCalls(electronApp),
      (calls) => calls.length === 1,
      30_000,
      'the close-all question to be showing',
    );
    logStep('question showing; closing the primary again underneath it');

    // The guard, not the dialog, is what has to stop this: the stub above records every call it
    // gets whether or not it ever answers, so a second question would be recorded the same way
    // the first was. The wait is what makes the count mean something — read the moment the click
    // returns and a second question that was on its way would simply not have landed yet, so the
    // assertion would hold whether or not the guard did.
    await clickCloseOn(electronApp, primaryId);
    await mainPage.waitForTimeout(2_000);
    expect(await readMessageBoxCalls(electronApp)).toHaveLength(1);
    expect(await liveWindowIds(electronApp)).toEqual([primaryId, secondId].sort((a, b) => a - b));
    logStep('still asked only once; both windows still open');
  });
});
