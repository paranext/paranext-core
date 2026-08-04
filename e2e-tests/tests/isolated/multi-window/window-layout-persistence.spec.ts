/**
 * Window layout persistence e2e test.
 *
 * Locks the across-restart behaviour of the window set: every window open at quit comes back on
 * relaunch — the main window with its dock layout, a deliberately-empty secondary window empty —
 * each at its saved bounds, while a window the user deliberately closed mid-session does NOT come
 * back.
 *
 * One test, three sequential launches into the SAME user-data profile (the launch helpers accept an
 * existing `userDataDir` and can preserve it across teardowns — see `LaunchElectronAppOptions`).
 * Launches are strictly sequential: the fixed WebSocket port and Electron's per-profile singleton
 * lock forbid overlap, so each phase quits gracefully (and its leftover process group is reaped)
 * before the next launches.
 *
 * - Phase 1 (fresh profile): the first window shows the single-Home-tab fallback layout; a second
 *   window is created mid-session (it starts empty); both windows are placed at known,
 *   different-sized bounds; graceful quit.
 * - Phase 2 (relaunch): BOTH windows come back — the main window with its Home tab, the second one
 *   EMPTY — each at its saved bounds; the second window is then deliberately closed; graceful
 *   quit.
 * - Phase 3 (second relaunch): exactly ONE window comes back (the deliberately closed window stays
 *   closed), still with its Home tab; graceful quit. The final teardown deletes the profile.
 *
 * ## App configuration
 *
 * Same pre-configuration as `multi-window.spec.ts` (power mode, first-run complete, English) — and
 * here `platform.interfaceMode: 'power'` is additionally REQUIRED for phase 2's both-windows
 * assertion, because simple mode is single-window and restores only the main window.
 *
 * ## Not covered here (and why)
 *
 * - The single-window legacy upgrade path (a profile holding only the previous bounds-keeper file and
 *   a pre-multi-window localStorage layout): needs a pre-multi-window profile fixture to be
 *   authored; the legacy-read behaviour is unit-covered in the main process's persistence service
 *   tests.
 * - Multi-monitor behaviour (restoring a window whose saved display is gone): this environment has a
 *   single virtual display; the monitor-gone re-placement is a pure function with its own unit
 *   tests.
 * - Tab-bearing SECONDARY windows round-tripping their content: putting a tab into a second window
 *   needs the move-web-views-between-windows feature; until then only the main window's layout has
 *   content to round-trip.
 * - Window POSITION restore at the window level: this environment's compositor (WSLg) assigns
 *   positions itself, in host-desktop coordinates that can lie outside the virtual display Electron
 *   reports, so a restored window's position never observably matches what the app requested.
 *   Position is covered on the SAVE side only (the persisted file must hold the pre-quit placement
 *   exactly). The live restore assertion is on SIZE, per the app's own decision rule: a saved
 *   placement on the display must come back at its saved size, and one off the display must come
 *   back at the default size (see expectRestoredSizeForSavedPlacement).
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated multi-window`
 */
import { expect, test, type ElectronApplication } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {
  ElectronAppContext,
  LaunchElectronAppOptions,
  launchElectronApp,
  preConfigureSettings,
  teardownElectronApp,
  waitForAppReady,
} from '../../../fixtures/helpers';
import {
  DUPLICATE_REGISTRATION_PATTERN,
  FAULT_MARKERS,
  HOME_TAB_UUID,
  captureAppOutput,
  createSecondWindow,
  createStepLogger,
  expectWindowDockEmpty,
  getAppPages,
  getWindowIdOfPage,
  homeTabTitle,
  quitAppAndWaitForExit,
  waitForAppPages,
  waitForRendererRegistered,
} from './multi-window.util';

/**
 * Launch options shared by all three phases — the same configuration `multi-window.spec.ts` uses
 * (see the `test.use` comment there for the rationale). Every phase must launch identically so a
 * phase-2/3 difference in what appears on screen can only come from the persisted profile state.
 */
const BASE_LAUNCH_OPTIONS: LaunchElectronAppOptions = {
  isolatedProjectRoot: true,
  envOverrides: { DEV_NOISY: 'false' },
};

/** Position and size of a window, as reported by `BrowserWindow.getBounds()`. */
type Rectangle = { x: number; y: number; width: number; height: number };

/** Read a window's current bounds from the main process. */
async function getWindowBounds(
  electronApp: ElectronApplication,
  windowId: number,
): Promise<Rectangle> {
  return electronApp.evaluate(({ BrowserWindow }, id) => {
    const win = BrowserWindow.fromId(id);
    if (!win) throw new Error(`No BrowserWindow with id ${id}`);
    return win.getBounds();
  }, windowId);
}

/** Whether `bounds` lies fully within a single one of `displays` — the app's "visible" rule. */
function isContainedInSomeDisplay(bounds: Rectangle, displays: readonly Rectangle[]): boolean {
  return displays.some(
    (display) =>
      bounds.x >= display.x &&
      bounds.y >= display.y &&
      bounds.x + bounds.width <= display.x + display.width &&
      bounds.y + bounds.height <= display.y + display.height,
  );
}

/** Bounds of all connected displays, as the app itself sees them (`screen.getAllDisplays()`). */
async function getDisplayBounds(electronApp: ElectronApplication): Promise<Rectangle[]> {
  return electronApp.evaluate(({ screen }) => screen.getAllDisplays().map((d) => d.bounds));
}

/**
 * Put a window into its normal state at the given bounds and wait until `getBounds` reports the
 * requested SIZE, then return the full settled placement. The settled read — not the requested
 * rectangle — is the reference for everything downstream: the app can only persist what the window
 * really reports.
 *
 * Size only, deliberately: this environment's compositor (WSLg) assigns window POSITIONS itself in
 * the host desktop's coordinate space, which spans the host's physical monitors — so the settled
 * x/y regularly differs from the request and can even lie outside the single virtual display
 * Electron reports. Sizes, in contrast, are honored exactly. Whatever position the compositor did
 * assign still round-trips into the persisted file (asserted in phase 1), and what it means for the
 * restore is decided per placement by {@link expectRestoredSizeForSavedPlacement}.
 */
async function placeWindowAndSettle(
  electronApp: ElectronApplication,
  windowId: number,
  targetBounds: Rectangle,
): Promise<Rectangle> {
  let settled: Rectangle | undefined;
  await expect(async () => {
    await electronApp.evaluate(
      ({ BrowserWindow }, { id, bounds }) => {
        const win = BrowserWindow.fromId(id);
        if (!win) throw new Error(`No BrowserWindow with id ${id}`);
        // Normal-state placement is what gets persisted, so leave any special state first, and
        // re-show a window the host may have minimized (an unmapped window reads back at a
        // far-off-screen position).
        if (win.isFullScreen()) win.setFullScreen(false);
        if (win.isMaximized()) win.unmaximize();
        if (win.isMinimized()) win.restore();
        win.show();
        win.setBounds(bounds);
      },
      { id: windowId, bounds: targetBounds },
    );
    // Let the compositor apply the placement and the app's debounced bounds capture observe it
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1_500);
    });
    const readBack = await getWindowBounds(electronApp, windowId);
    expect(readBack.width, 'settled width').toBe(targetBounds.width);
    expect(readBack.height, 'settled height').toBe(targetBounds.height);
    settled = readBack;
  }).toPass({ timeout: 30_000, intervals: [1_000] });
  if (!settled) throw new Error('placement settled without recording bounds');
  return settled;
}

/**
 * The window size the app falls back to when a saved placement is unusable. Keep in sync with
 * `DEFAULT_WINDOW_WIDTH`/`DEFAULT_WINDOW_HEIGHT` in `src/main/window-bounds.util.ts` (not imported
 * here because the e2e project cannot resolve the app's path aliases).
 */
const FALLBACK_WINDOW_SIZE = { width: 1024, height: 728 };

/**
 * Assert a restored window honors its saved placement the way the app specifies, and return a
 * description of which rule applied (for the runner log, so a pass records which branch it
 * exercised):
 *
 * - Saved bounds fully on a connected display: the restored window's SIZE must equal the saved size
 *   exactly. (Position is compositor-assigned in this environment — see the file header's
 *   not-covered list — so only size is checkable live.)
 * - Saved bounds off-display (this compositor parks windows in host-desktop coordinates beyond the
 *   virtual display): the app must NOT apply them — the window must come back at the default size
 *   ({@link FALLBACK_WINDOW_SIZE}), the same re-placement rule that recovers a window whose monitor
 *   went away. Both windows' test sizes differ from the default size, so a restore that wrongly
 *   applies off-display bounds fails this branch.
 */
function expectRestoredSizeForSavedPlacement(
  actual: Rectangle,
  saved: Rectangle,
  displays: readonly Rectangle[],
  label: string,
): string {
  if (isContainedInSomeDisplay(saved, displays)) {
    expect(actual.width, `${label}: width (saved placement on-display)`).toBe(saved.width);
    expect(actual.height, `${label}: height (saved placement on-display)`).toBe(saved.height);
    return `${label}: saved placement was on-display; restored at its saved size`;
  }
  expect(actual.width, `${label}: width (saved placement off-display, expect default)`).toBe(
    FALLBACK_WINDOW_SIZE.width,
  );
  expect(actual.height, `${label}: height (saved placement off-display, expect default)`).toBe(
    FALLBACK_WINDOW_SIZE.height,
  );
  return `${label}: saved placement was off-display; re-placed at the default size`;
}

/** Minimal view of one saved window entry from the persisted window-layouts structure. */
type SavedWindowEntry = {
  isMain: boolean;
  layoutJson: string | undefined;
  bounds: Rectangle | undefined;
};

/** View parsed JSON as an indexable record if it is object-shaped at all. */
function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object') return undefined;
  // Parsed JSON data; crossing from `object` to the indexable shape only adds property reads that
  // are each validated by the caller
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return value as Record<string, unknown>;
}

/**
 * Read the window-layouts structure the app persists in the profile's user-data folder, reduced to
 * what the assertions here need: entry count/order, which entry is the main window's, and each
 * entry's layout as JSON text (for content probes). This file is the contract between one session
 * and the next, so asserting on it after a quit separates save-side failures from restore-side
 * ones. Throws when the file is missing or not structure-shaped — after a quit it must exist and
 * parse.
 */
function readSavedWindowEntries(userDataDir: string): SavedWindowEntry[] {
  const raw = fs.readFileSync(path.join(userDataDir, 'window-layouts.json'), 'utf8');
  const record = asRecord(JSON.parse(raw));
  const windowsValue: unknown = record?.windows;
  if (!Array.isArray(windowsValue))
    throw new Error(`window-layouts.json does not hold a windows list: ${raw}`);
  return windowsValue.map((entryValue: unknown) => {
    const entry = asRecord(entryValue) ?? {};
    const boundsRecord = asRecord(entry.bounds);
    const { x, y, width, height } = boundsRecord ?? {};
    const bounds =
      typeof x === 'number' &&
      typeof y === 'number' &&
      typeof width === 'number' &&
      typeof height === 'number'
        ? { x, y, width, height }
        : undefined;
    return {
      isMain: entry.isMain === true,
      layoutJson: entry.layout === undefined ? undefined : JSON.stringify(entry.layout),
      bounds,
    };
  });
}

test.describe('window layout persistence', () => {
  // Three full app launches (each can cost 30–180 s), three graceful quits, and several settle
  // periods share this one test.
  test.setTimeout(900_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Written before any launch and restored after the test so the developer's own settings
    // survive the suite. Power mode is REQUIRED here: simple mode restores only the main window,
    // which would make phase 2's both-windows assertion fail for configuration reasons.
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('windows, layouts, and bounds survive relaunch; a deliberately closed window stays closed', async () => {
    const logStep = createStepLogger('window-layout-persistence');
    let ctx: ElectronAppContext | undefined;
    let profileDir: string | undefined;

    try {
      // #region Phase 1 — fresh profile: two windows at known bounds, then a graceful quit

      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, preserveUserDataDir: true });
      const { userDataDir } = ctx;
      profileDir = userDataDir;
      const output1 = captureAppOutput(ctx.electronApp);
      const mainPage1 = await ctx.electronApp.firstWindow({ timeout: 90_000 });
      await mainPage1.waitForLoadState('domcontentloaded');
      await mainPage1.waitForSelector('#root', { state: 'attached', timeout: 60_000 });
      await waitForAppReady(mainPage1, 180_000);
      const window1Id = getWindowIdOfPage(mainPage1);
      logStep(`phase 1: window ${window1Id} ready`);

      // The first window of a fresh profile shows the Home tab (from the single-Home-tab fallback
      // layout) — the layout content whose round-trip phase 2 asserts.
      await expect(homeTabTitle(mainPage1, window1Id)).toBeAttached({ timeout: 60_000 });

      // Known placements, requested inside the primary display's work area. The two windows get
      // DIFFERENT sizes — both also different from the app's fallback size — so the phase-2 size
      // comparison can tell the windows' saved entries apart (a swap changes both) and can tell a
      // restored entry from a fallback re-placement.
      const workArea = await ctx.electronApp.evaluate(
        ({ screen }) => screen.getPrimaryDisplay().workArea,
      );
      const placedMainBounds = await placeWindowAndSettle(ctx.electronApp, window1Id, {
        x: workArea.x + 40,
        y: workArea.y + 40,
        width: Math.min(1_100, workArea.width - 80),
        height: Math.min(700, workArea.height - 80),
      });
      logStep(`phase 1: window ${window1Id} placed at ${JSON.stringify(placedMainBounds)}`);

      const page2 = await createSecondWindow(ctx.electronApp);
      const window2Id = getWindowIdOfPage(page2);
      await waitForRendererRegistered(window2Id, 120_000);
      // The mid-session window starts empty (that behaviour is locked by multi-window.spec.ts);
      // asserting it here too makes phase 2's "restored EMPTY" meaningful — it restores what was
      // genuinely an empty window.
      await expectWindowDockEmpty(page2);
      const placedSecondBounds = await placeWindowAndSettle(ctx.electronApp, window2Id, {
        x: workArea.x + 120,
        y: workArea.y + 100,
        width: Math.min(940, workArea.width - 200),
        height: Math.min(620, workArea.height - 160),
      });
      logStep(
        `phase 1: window ${window2Id} created empty and placed at ${JSON.stringify(placedSecondBounds)}`,
      );

      // The compositor may re-place a window at any time after it settles (a host-side minimize
      // reads back far off-screen), so read each window's placement one final time immediately
      // before quitting. These reads are what the quit flush captures, so they — not the earlier
      // settled reads — are the reference for the persisted file and for the phase-2 restore.
      const savedMainBounds = await getWindowBounds(ctx.electronApp, window1Id);
      const savedSecondBounds = await getWindowBounds(ctx.electronApp, window2Id);
      logStep(
        `phase 1: pre-quit placements main=${JSON.stringify(savedMainBounds)} second=${JSON.stringify(savedSecondBounds)}`,
      );

      // Guard the discriminator the phase-2 assertions rely on: with equal sizes, the two windows'
      // entries swapping would be invisible to the size comparison.
      expect(savedSecondBounds.width).not.toBe(savedMainBounds.width);
      expect(savedSecondBounds.height).not.toBe(savedMainBounds.height);

      const exit1 = await quitAppAndWaitForExit(ctx.electronApp);
      logStep(`phase 1: exited with code ${exit1.code} signal ${exit1.signal}`);
      expect(exit1.signal).toBeUndefined();
      expect(exit1.code).toBe(0);

      const log1 = output1.text();
      FAULT_MARKERS.forEach((marker) => expect(log1).not.toContain(marker));
      expect(log1).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);

      // The persisted structure must hold both windows: exactly one main entry, whose layout
      // carries the Home web view — and the second entry must NOT carry it (an empty window's
      // entry with the main window's layout cloned in would restore tabs in phase 2). Each entry
      // must also hold its window's pre-quit placement EXACTLY, position included — this is the
      // save half of the bounds round trip, and the only place position is checkable in this
      // environment (see expectRestoredSizeForSavedPlacement). Asserting the save side here means
      // a phase-2 failure can be attributed to the restore side.
      const entriesAfterPhase1 = readSavedWindowEntries(userDataDir);
      expect(entriesAfterPhase1).toHaveLength(2);
      const mainEntriesAfterPhase1 = entriesAfterPhase1.filter((entry) => entry.isMain);
      expect(mainEntriesAfterPhase1).toHaveLength(1);
      expect(mainEntriesAfterPhase1[0].layoutJson).toContain(HOME_TAB_UUID);
      expect(mainEntriesAfterPhase1[0].bounds).toEqual(savedMainBounds);
      const secondEntriesAfterPhase1 = entriesAfterPhase1.filter((entry) => !entry.isMain);
      secondEntriesAfterPhase1.forEach((entry) =>
        expect(entry.layoutJson ?? '').not.toContain(HOME_TAB_UUID),
      );
      expect(secondEntriesAfterPhase1[0].bounds).toEqual(savedSecondBounds);
      logStep('phase 1: persisted structure holds both windows with their settled bounds');

      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion

      // #region Phase 2 — relaunch: both windows return; deliberately close the second

      ctx = await launchElectronApp({
        ...BASE_LAUNCH_OPTIONS,
        userDataDir,
        preserveUserDataDir: true,
      });
      const output2 = captureAppOutput(ctx.electronApp);
      // Both windows must come back. Secondary windows are created only once startup can read the
      // interface mode (which waits on the extension host), hence the long budget. The windows are
      // identified order-independently through their windowId URL parameter: the app creates the
      // main entry's window first, so the lower id is the main window (getAppPages sorts by id).
      const pagesPhase2 = await waitForAppPages(ctx.electronApp, 2, 240_000);
      expect(pagesPhase2).toHaveLength(2);
      const [mainPage2, secondPage2] = pagesPhase2;
      const mainId2 = getWindowIdOfPage(mainPage2);
      const secondId2 = getWindowIdOfPage(secondPage2);
      await waitForAppReady(mainPage2, 180_000);
      await waitForRendererRegistered(secondId2, 120_000);
      logStep(`phase 2: windows ${mainId2} and ${secondId2} restored`);

      // Layout round-trip: the main window still shows its Home tab…
      await expect(homeTabTitle(mainPage2, mainId2)).toBeAttached({ timeout: 120_000 });
      // …and the deliberately-empty second window is restored EMPTY: neither a copy of the main
      // window's layout nor any default layout may appear in it.
      await expectWindowDockEmpty(secondPage2);
      // The restore created exactly the saved windows — no duplicates (expectWindowDockEmpty's
      // settle has already given a straggler window time to appear).
      expect(getAppPages(ctx.electronApp)).toHaveLength(2);
      logStep('phase 2: main window has its Home tab; second window restored empty');

      // Bounds round-trip, per window, against what was saved at quit. Which live expectation
      // applies depends on whether the compositor left the saved placement on the virtual display
      // — see expectRestoredSizeForSavedPlacement; the position half of the SAVE side was already
      // asserted exactly against the persisted file in phase 1. The sizes differ between the
      // windows (guarded in phase 1), so the on-display branch also fails if the two entries
      // swapped windows across the restart.
      const displaysPhase2 = await getDisplayBounds(ctx.electronApp);
      logStep(
        `phase 2: ${expectRestoredSizeForSavedPlacement(
          await getWindowBounds(ctx.electronApp, mainId2),
          savedMainBounds,
          displaysPhase2,
          'restored main window',
        )}`,
      );
      logStep(
        `phase 2: ${expectRestoredSizeForSavedPlacement(
          await getWindowBounds(ctx.electronApp, secondId2),
          savedSecondBounds,
          displaysPhase2,
          'restored second window',
        )}`,
      );

      // Deliberately close the second window the way a user does…
      const secondClosed = secondPage2.waitForEvent('close', { timeout: 30_000 });
      // window.close() tears the page's execution context down, so schedule it instead of calling
      // it inline — an inline call can destroy the context before the evaluate call returns.
      await secondPage2.evaluate(() => {
        setTimeout(() => window.close(), 0);
      });
      await secondClosed;
      logStep(`phase 2: window ${secondId2} deliberately closed`);

      // …and wait until the persisted structure drops its entry: a deliberate close must leave no
      // trace of the window. (Phase 3 is the end-to-end proof; this pins the save side and
      // sequences the quit after the rewrite.)
      await expect(() => {
        expect(readSavedWindowEntries(userDataDir)).toHaveLength(1);
      }).toPass({ timeout: 30_000, intervals: [500] });

      const exit2 = await quitAppAndWaitForExit(ctx.electronApp);
      logStep(`phase 2: exited with code ${exit2.code} signal ${exit2.signal}`);
      expect(exit2.signal).toBeUndefined();
      expect(exit2.code).toBe(0);

      const log2 = output2.text();
      FAULT_MARKERS.forEach((marker) => expect(log2).not.toContain(marker));
      expect(log2).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);

      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion

      // #region Phase 3 — second relaunch: the deliberately closed window stays closed

      // No preserveUserDataDir: this phase's teardown must delete the profile directory.
      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, userDataDir });
      const output3 = captureAppOutput(ctx.electronApp);
      const pagesPhase3 = await waitForAppPages(ctx.electronApp, 1, 180_000);
      const mainPage3 = pagesPhase3[0];
      const mainId3 = getWindowIdOfPage(mainPage3);
      await waitForAppReady(mainPage3, 180_000);
      await expect(homeTabTitle(mainPage3, mainId3)).toBeAttached({ timeout: 60_000 });
      logStep(`phase 3: window ${mainId3} restored with its Home tab`);

      // Exactly ONE window: the deliberately closed window must not come back. Secondary windows
      // are created late in startup (once the interface mode becomes readable), so give a
      // wrongly-resurrected window time to appear before asserting the count.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 10_000);
      });
      expect(getAppPages(ctx.electronApp)).toHaveLength(1);
      logStep('phase 3: the deliberately closed window did not return');

      const exit3 = await quitAppAndWaitForExit(ctx.electronApp);
      logStep(`phase 3: exited with code ${exit3.code} signal ${exit3.signal}`);
      expect(exit3.signal).toBeUndefined();
      expect(exit3.code).toBe(0);

      const log3 = output3.text();
      FAULT_MARKERS.forEach((marker) => expect(log3).not.toContain(marker));
      expect(log3).not.toMatch(DUPLICATE_REGISTRATION_PATTERN);

      // The final teardown (launched without preserveUserDataDir) deletes the profile directory —
      // a relaunch chain must not leak temp directories.
      await teardownElectronApp(ctx);
      ctx = undefined;
      expect(fs.existsSync(userDataDir)).toBe(false);

      // #endregion
    } finally {
      // On any failure above: kill whatever instance is still up, then remove the preserved
      // profile directory so a failed run leaks nothing. Both are no-ops after a clean phase 3.
      if (ctx) await teardownElectronApp(ctx);
      if (profileDir) fs.rmSync(profileDir, { recursive: true, force: true });
    }
  });
});
