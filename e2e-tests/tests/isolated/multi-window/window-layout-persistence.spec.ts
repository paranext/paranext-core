/**
 * Window layout persistence e2e tests.
 *
 * Three tests, each running sequential launches into its own preserved user-data profile (the
 * launch helpers accept an existing `userDataDir` and can preserve it across teardowns — see
 * `LaunchElectronAppOptions`). Launches are strictly sequential: the fixed WebSocket port and
 * Electron's per-profile singleton lock forbid overlap, so each phase quits gracefully (and its
 * leftover process group is reaped) before the next launches.
 *
 * TEST 1 — the window set across restarts: every window open at quit comes back on relaunch — the
 * main window with its dock layout, a secondary window that only ever held its own auto-docked Home
 * tab — each at its saved bounds, while a window the user deliberately closed mid-session does NOT
 * come back.
 *
 * - Phase 1 (fresh profile): the first window shows the single-Home-tab fallback layout; a second
 *   window is created mid-session (it docks Home, having nothing else of its own to show); both
 *   windows are placed at known, different-sized bounds; graceful quit.
 * - Phase 2 (relaunch): BOTH windows come back — the main window with its Home tab, the second one
 *   with just its own Home tab — each at its saved bounds; the second window is then deliberately
 *   closed; graceful quit.
 * - Phase 3 (second relaunch): exactly ONE window comes back (the deliberately closed window stays
 *   closed), still with its Home tab; graceful quit. The final teardown deletes the profile.
 *
 * TEST 2 — MORE than two windows across a restart: three windows open at quit all come back on
 * relaunch, each at its own saved size. Two windows is the smallest multi-window case and cannot
 * distinguish "restores every window" from "restores a window besides the main one", so the window
 * count itself is the subject here.
 *
 * - Phase 1 (fresh profile): the first window plus TWO mid-session windows, each placed at its own
 *   distinct size; graceful quit; the structure file must hold all THREE entries.
 * - Phase 2 (relaunch): all three windows come back, each rendering only its own Home tab and each
 *   honoring its saved size; graceful quit. The final teardown deletes the profile.
 *
 * TEST 3 — the pre-multi-window upgrade path: a profile from before the window-layouts structure
 * existed (a legacy dock layout under the renderer's unprefixed localStorage key, the old
 * bounds-keeper file, and NO structure file) upgrades to exactly one window that loads the legacy
 * layout and honors the keeper's window size — and a window created mid-session in that upgraded
 * session still docks only its own Home tab rather than cloning the legacy layout.
 *
 * - Launch A (fresh profile): the app runs normally; the layout it persists for the main window is
 *   harvested from the structure file, extended with a SECOND web view tab (a Home clone under a
 *   distinct id), and written to the legacy localStorage key from inside the renderer; graceful
 *   quit.
 * - Between launches (no app running): the structure file is deleted and an old-style keeper file
 *   with a known window size is written — the profile now looks exactly like a pre-multi-window
 *   install.
 * - Launch B: exactly one window; it renders BOTH seeded tabs (the discriminator — no fallback layout
 *   has two tabs, and a window that only docks Home has one, so a pass cannot come from either);
 *   its size is the keeper file's; a newly created second window docks only its own Home tab;
 *   graceful quit; the final teardown deletes the profile.
 *
 * ## App configuration
 *
 * Same pre-configuration as `multi-window.spec.ts` (power mode, first-run complete, English) — and
 * here `platform.interfaceMode: 'power'` is additionally REQUIRED for the restore assertions in
 * tests 1 and 2, because simple mode is single-window and restores only the main window.
 *
 * ## Not covered here (and why)
 *
 * - Multi-monitor behaviour (restoring a window whose saved display is gone): this environment has a
 *   single virtual display; the monitor-gone re-placement is a pure function with its own unit
 *   tests.
 * - SECONDARY windows round-tripping content BEYOND their own auto-docked Home tab ACROSS A RESTART.
 *   Putting another window's content into a secondary window no longer needs anything that does not
 *   exist: `platform.moveWebViewToWindow` / `platform.moveWebViewToNewWindow` do it, and the move
 *   itself — a web view leaving one real window, arriving in another, and what each window is left
 *   holding afterwards — is covered by `web-view-move-between-windows.spec.ts` in this directory.
 *   What remains uncovered is the RESTART half: quitting with a moved tab sitting in a secondary
 *   window and asserting that window brings it back. That is a coverage gap, not a missing
 *   feature.
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
  HOME_TAB_UUID,
  captureAppOutput,
  createSecondWindow,
  createStepLogger,
  expectWindowDockHasOnlyHomeTab,
  getAppPages,
  getWindowIdOfPage,
  homeTabTitle,
  quitAndExpectCleanExit,
  waitForAppPages,
  waitForRendererRegistered,
  webViewTabTitle,
  withPlatformWindow,
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
  return withPlatformWindow(electronApp, windowId, (win) => win.getBounds());
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
    await withPlatformWindow(
      electronApp,
      windowId,
      (win, _context, bounds) => {
        // Normal-state placement is what gets persisted, so leave any special state first, and
        // re-show a window the host may have minimized (an unmapped window reads back at a
        // far-off-screen position).
        if (win.isFullScreen()) win.setFullScreen(false);
        if (win.isMaximized()) win.unmaximize();
        if (win.isMinimized()) win.restore();
        win.show();
        win.setBounds(bounds);
      },
      targetBounds,
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
 * Narrowest width the app allows a window to be. Keep in sync with `minWidth` on the BrowserWindow
 * in `src/main/main.ts` (not imported here because the e2e project cannot resolve the app's path
 * aliases). Electron enforces this by silently clamping `setBounds`, so a placement request below
 * it does not fail loudly — the window simply comes back wider than asked.
 */
const WINDOW_MIN_WIDTH = 900;

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

/**
 * The legacy `localStorage` key the dock layout was saved under before per-window persistence moved
 * layouts into the main process's window-layouts structure. The renderer still READS this key
 * (never writes it) for the one window of a legacy pre-multi-window startup — see
 * `getLegacySavedLayout` in `src/renderer/services/web-view.service-shard.ts`.
 */
const LEGACY_DOCK_LAYOUT_STORAGE_KEY = 'dock-saved-layout';

/**
 * File the pre-multi-window bounds keeper maintained in the profile, holding the single window's
 * placement as top-level `x`/`y`/`width`/`height` plus state flags. The main process reads it once
 * for upgrade placement when no window-layouts structure exists — see
 * `src/main/services/window-layout-persistence.service.ts`.
 */
const LEGACY_WINDOW_STATE_FILE_NAME = 'window-state.json';

/**
 * Web view id of the SECOND tab the upgrade test seeds into the legacy layout: a clone of the Home
 * tab under this distinct id. Two tabs are the upgrade test's discriminator — the fresh-profile
 * fallback layout has exactly one tab and a window with nothing of its own docks only its own Home
 * tab (also one), so only the seeded legacy blob can produce a tab with this id.
 */
const LEGACY_SECOND_TAB_UUID = 'ada6a781-10bf-46f3-a2f9-a1bb0e2fa221';

/**
 * Window size the upgrade test writes into the legacy keeper file. Deliberately different from the
 * app's fallback size ({@link FALLBACK_WINDOW_SIZE}), so an upgrade that ignores the keeper file
 * (and falls back to the default size) is distinguishable from one that honors it.
 */
const LEGACY_KEEPER_SIZE = { width: 1000, height: 640 };

/**
 * Build the legacy two-tab layout for the upgrade test from the layout the app itself persisted:
 * find the panel holding the Home tab and append a clone of that tab under
 * {@link LEGACY_SECOND_TAB_UUID}. Cloning the app's own saved tab (rather than authoring a layout by
 * hand) keeps the blob's shape exactly what a real pre-multi-window profile held. The clone's saved
 * web view definition mirrors the new id the way every saved web view tab's does — the tab loader
 * enforces that match.
 *
 * @param mainLayoutJson The main entry's layout from the persisted structure, as JSON text
 * @returns The two-tab layout object, ready to serialize under the legacy localStorage key
 */
function buildTwoTabLegacyLayout(mainLayoutJson: string): Record<string, unknown> {
  const layout = asRecord(JSON.parse(mainLayoutJson));
  if (!layout) throw new Error('main entry layout is not object-shaped');

  const insertCloneTab = (node: Record<string, unknown>): boolean => {
    const { tabs } = node;
    if (Array.isArray(tabs)) {
      const homeTab = tabs
        .map((tab: unknown) => asRecord(tab))
        .find((tab) => typeof tab?.id === 'string' && tab.id.includes(HOME_TAB_UUID));
      if (homeTab && typeof homeTab.id === 'string') {
        // Derive the clone id from the Home tab id so any window-scoping suffix carries over
        // unchanged (loading re-scopes ids to the loading window anyway)
        const cloneId = homeTab.id.split(HOME_TAB_UUID).join(LEGACY_SECOND_TAB_UUID);
        const homeTabData = asRecord(homeTab.data);
        tabs.push({
          ...homeTab,
          id: cloneId,
          ...(homeTabData ? { data: { ...homeTabData, id: cloneId } } : {}),
        });
        return true;
      }
    }
    const { children } = node;
    if (Array.isArray(children))
      return children.some((child: unknown) => {
        const childRecord = asRecord(child);
        return childRecord ? insertCloneTab(childRecord) : false;
      });
    return false;
  };

  const dockbox = asRecord(layout.dockbox);
  if (!dockbox || !insertCloneTab(dockbox))
    throw new Error(
      `could not find the Home tab to clone in the persisted layout: ${mainLayoutJson}`,
    );
  return layout;
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
      const [mainPage1] = await waitForAppPages(ctx.electronApp, 1, 90_000);
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
      // Both widths have to clear WINDOW_MIN_WIDTH: Electron clamps a smaller `setBounds` silently,
      // and `placeWindowAndSettle` asserts the window ended up exactly the width it asked for, so a
      // sub-minimum request retries for its full 30s and then fails. Deriving the main window's
      // width from the second's also keeps the two distinct once both are clamped up to the floor —
      // phase 2 tells the saved entries apart by width, and equal widths would make a swapped pair
      // invisible.
      const secondWindowWidth = Math.max(WINDOW_MIN_WIDTH, Math.min(940, workArea.width - 200));
      const mainWindowWidth = Math.max(
        secondWindowWidth + 80,
        Math.min(1_100, workArea.width - 80),
      );
      const placedMainBounds = await placeWindowAndSettle(ctx.electronApp, window1Id, {
        x: workArea.x + 40,
        y: workArea.y + 40,
        width: mainWindowWidth,
        height: Math.min(700, workArea.height - 80),
      });
      logStep(`phase 1: window ${window1Id} placed at ${JSON.stringify(placedMainBounds)}`);

      const page2 = await createSecondWindow(ctx.electronApp);
      const window2Id = getWindowIdOfPage(page2);
      await waitForRendererRegistered(window2Id, 120_000);
      // The mid-session window docks its own Home tab, having nothing else of its own to show
      // (that behaviour is locked by multi-window.spec.ts); asserting it here too makes phase 2's
      // "restored with just its own Home tab" meaningful — it restores what genuinely started with
      // only Home docked.
      await expectWindowDockHasOnlyHomeTab(page2);
      const placedSecondBounds = await placeWindowAndSettle(ctx.electronApp, window2Id, {
        x: workArea.x + 120,
        y: workArea.y + 100,
        width: secondWindowWidth,
        height: Math.min(620, workArea.height - 160),
      });
      logStep(
        `phase 1: window ${window2Id} created with only Home docked and placed at ${JSON.stringify(placedSecondBounds)}`,
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

      await quitAndExpectCleanExit(ctx.electronApp, output1, logStep, 'phase 1');

      // The persisted structure must hold both windows: exactly one main entry, whose layout
      // carries the Home web view under its fixed fallback-layout id — and the second entry must
      // NOT carry that exact id (it holds its OWN independently-docked Home tab under a freshly
      // minted id; carrying the fixed id instead would mean the main window's whole layout got
      // cloned into it, not that it docked its own Home tab, and would restore that clone in phase
      // 2). Each entry must also hold its window's pre-quit placement EXACTLY, position included —
      // this is the save half of the bounds round trip, and the only place position is checkable in
      // this environment (see expectRestoredSizeForSavedPlacement). Asserting the save side here
      // means a phase-2 failure can be attributed to the restore side.
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
      // …and the second window — which only ever held its own auto-docked Home tab — is restored
      // with just that: neither a copy of the main window's layout nor any default layout may
      // appear in it.
      await expectWindowDockHasOnlyHomeTab(secondPage2);
      // The restore created exactly the saved windows — no duplicates
      // (expectWindowDockHasOnlyHomeTab's settle has already given a straggler window time to
      // appear).
      expect(getAppPages(ctx.electronApp)).toHaveLength(2);
      logStep(
        'phase 2: main window has its Home tab; second window restored with just its own Home tab',
      );

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

      await quitAndExpectCleanExit(ctx.electronApp, output2, logStep, 'phase 2');

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

      await quitAndExpectCleanExit(ctx.electronApp, output3, logStep, 'phase 3');

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

  test('three windows all come back after a quit — restoring is not capped at two', async () => {
    const logStep = createStepLogger('window-layout-persistence-three');
    let ctx: ElectronAppContext | undefined;
    let profileDir: string | undefined;

    try {
      // #region Phase 1 — fresh profile: THREE windows at distinct sizes, then a graceful quit

      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, preserveUserDataDir: true });
      const { userDataDir } = ctx;
      profileDir = userDataDir;
      const output1 = captureAppOutput(ctx.electronApp);
      const [mainPage1] = await waitForAppPages(ctx.electronApp, 1, 90_000);
      await waitForAppReady(mainPage1, 180_000);
      const mainId1 = getWindowIdOfPage(mainPage1);
      await expect(homeTabTitle(mainPage1, mainId1)).toBeAttached({ timeout: 60_000 });
      logStep(`phase 1: main window ${mainId1} ready`);

      const workArea = await ctx.electronApp.evaluate(
        ({ screen }) => screen.getPrimaryDisplay().workArea,
      );
      // Distinct sizes, all different from each other and from the app's fallback size, so the
      // phase-2 comparison can tell the three entries apart and can tell a restored entry from a
      // fallback re-placement. Every width clears WINDOW_MIN_WIDTH: Electron clamps a narrower
      // `setBounds` silently, so such a window settles wider than asked and never matches.
      const sizes = [
        {
          width: Math.max(WINDOW_MIN_WIDTH, Math.min(1_100, workArea.width - 80)),
          height: Math.min(700, workArea.height - 80),
        },
        {
          width: Math.max(WINDOW_MIN_WIDTH, Math.min(940, workArea.width - 200)),
          height: Math.min(620, workArea.height - 160),
        },
        {
          width: Math.max(WINDOW_MIN_WIDTH, Math.min(880, workArea.width - 260)),
          height: Math.min(560, workArea.height - 220),
        },
      ];

      await placeWindowAndSettle(ctx.electronApp, mainId1, {
        x: workArea.x + 40,
        y: workArea.y + 40,
        ...sizes[0],
      });

      // Two mid-session windows, so the session holds three. Each docks its own Home tab, having
      // nothing else of its own to show.
      const secondaryIds1: number[] = [];
      for (let index = 1; index < sizes.length; index += 1) {
        // Sequential on purpose: each window must be up and registered before the next is created,
        // so a failure names the window it belongs to.
        /* eslint-disable no-await-in-loop */
        const page = await createSecondWindow(ctx.electronApp);
        const secondaryId = getWindowIdOfPage(page);
        await waitForRendererRegistered(secondaryId, 120_000);
        await expectWindowDockHasOnlyHomeTab(page);
        await placeWindowAndSettle(ctx.electronApp, secondaryId, {
          x: workArea.x + 60 * index,
          y: workArea.y + 50 * index,
          ...sizes[index],
        });
        /* eslint-enable no-await-in-loop */
        secondaryIds1.push(secondaryId);
      }
      const windowIds1 = [mainId1, ...secondaryIds1];
      expect(getAppPages(ctx.electronApp)).toHaveLength(3);
      logStep(`phase 1: three windows open (${windowIds1.join(', ')})`);

      // The compositor may re-place a window at any time after it settles, so read every window's
      // placement one final time immediately before quitting — those reads are what the quit flush
      // captures, and so are the reference for both the file and the phase-2 restore.
      const app1 = ctx.electronApp;
      const savedBounds1 = await Promise.all(
        windowIds1.map(async (id) => getWindowBounds(app1, id)),
      );
      // Guard the discriminator the size assertions rest on: equal sizes would make two entries
      // swapping windows invisible.
      expect(new Set(savedBounds1.map(({ width }) => width)).size).toBe(3);

      await quitAndExpectCleanExit(ctx.electronApp, output1, logStep, 'phase 1');

      // The save half. All three windows were open at the quit, so all three entries must be in the
      // file — this is where a quit flush that shrinks as windows go down shows up, and asserting
      // it here means a phase-2 failure can be attributed to the restore side.
      const entriesAfterPhase1 = readSavedWindowEntries(userDataDir);
      logStep(
        `phase 1: structure holds ${entriesAfterPhase1.length} entries: ${JSON.stringify(
          entriesAfterPhase1.map((entry) => ({ isMain: entry.isMain, bounds: entry.bounds })),
        )}`,
      );
      expect(entriesAfterPhase1).toHaveLength(3);
      expect(entriesAfterPhase1.filter((entry) => entry.isMain)).toHaveLength(1);
      expect(entriesAfterPhase1.map((entry) => entry.bounds)).toEqual(savedBounds1);

      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion

      // #region Phase 2 — relaunch: all three windows return

      // No preserveUserDataDir: this phase's teardown must delete the profile directory.
      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, userDataDir });
      const output2 = captureAppOutput(ctx.electronApp);
      const pages2 = await waitForAppPages(ctx.electronApp, 3, 240_000);
      expect(pages2).toHaveLength(3);
      await waitForAppReady(pages2[0], 180_000);
      const windowIds2 = pages2.map(getWindowIdOfPage);
      logStep(`phase 2: windows ${windowIds2.join(', ')} restored`);

      // The main window keeps its fallback-layout Home tab; the two secondaries come back with just
      // their own docked Home tab, as they were saved.
      await expect(homeTabTitle(pages2[0], windowIds2[0])).toBeAttached({ timeout: 120_000 });
      await expectWindowDockHasOnlyHomeTab(pages2[1]);
      await expectWindowDockHasOnlyHomeTab(pages2[2]);
      // Exactly three — no duplicates, and none of the restored windows closed itself again
      // (expectWindowDockHasOnlyHomeTab's settle has already given both time to happen).
      expect(getAppPages(ctx.electronApp)).toHaveLength(3);
      logStep('phase 2: all three windows restored with their own Home tab');

      const app2 = ctx.electronApp;
      const displays2 = await getDisplayBounds(app2);
      await Promise.all(
        windowIds2.map(async (id, index) => {
          logStep(
            `phase 2: ${expectRestoredSizeForSavedPlacement(
              await getWindowBounds(app2, id),
              savedBounds1[index],
              displays2,
              `restored window ${index + 1}`,
            )}`,
          );
        }),
      );

      await quitAndExpectCleanExit(ctx.electronApp, output2, logStep, 'phase 2');

      await teardownElectronApp(ctx);
      ctx = undefined;
      expect(fs.existsSync(userDataDir)).toBe(false);

      // #endregion
    } finally {
      if (ctx) await teardownElectronApp(ctx);
      if (profileDir) fs.rmSync(profileDir, { recursive: true, force: true });
    }
  });

  test('a pre-multi-window profile upgrades to one window with its legacy layout, and new windows still dock only their own Home tab', async () => {
    const logStep = createStepLogger('window-layout-upgrade');
    let ctx: ElectronAppContext | undefined;
    let profileDir: string | undefined;

    try {
      // #region Launch A — build a genuine pre-multi-window profile with the app itself

      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, preserveUserDataDir: true });
      const { userDataDir } = ctx;
      profileDir = userDataDir;
      const outputA = captureAppOutput(ctx.electronApp);
      const [pageA] = await waitForAppPages(ctx.electronApp, 1, 90_000);
      await waitForAppReady(pageA, 180_000);
      const windowAId = getWindowIdOfPage(pageA);
      await expect(homeTabTitle(pageA, windowAId)).toBeAttached({ timeout: 60_000 });
      logStep(`launch A: window ${windowAId} ready with its Home tab`);

      // Harvest the layout the app itself persists for the main window (the renderer pushes the
      // loaded layout and the main process's write is debounced, so poll for the file) — the base
      // for the legacy blob, so its shape is exactly what the app saves, not a hand-authored
      // approximation.
      let mainLayoutJson: string | undefined;
      await expect(() => {
        const mainEntry = readSavedWindowEntries(userDataDir).find((entry) => entry.isMain);
        expect(mainEntry?.layoutJson ?? '').toContain(HOME_TAB_UUID);
        mainLayoutJson = mainEntry?.layoutJson;
      }).toPass({ timeout: 30_000, intervals: [500] });
      if (!mainLayoutJson) throw new Error('unreachable: poll passed without a main entry layout');

      // Write the two-tab legacy blob under the legacy localStorage key, from inside the renderer
      // — the same storage a real pre-multi-window install left behind.
      const legacyLayout = buildTwoTabLegacyLayout(mainLayoutJson);
      await pageA.evaluate(
        ([storageKey, serializedLayout]) => localStorage.setItem(storageKey, serializedLayout),
        [LEGACY_DOCK_LAYOUT_STORAGE_KEY, JSON.stringify(legacyLayout)] as const,
      );
      logStep('launch A: seeded the legacy dock layout (Home tab + cloned second tab)');

      // The keeper bounds written below sit at the primary display's origin, so the upgrade's
      // on-display validation is guaranteed to accept them (this compositor honors requested
      // sizes, which is the half the assertion uses).
      const primaryDisplayBounds = await ctx.electronApp.evaluate(
        ({ screen }) => screen.getPrimaryDisplay().bounds,
      );

      await quitAndExpectCleanExit(ctx.electronApp, outputA, logStep, 'launch A');

      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion

      // #region Between launches — make the profile look pre-multi-window

      // No structure file (the marker of the new persistence), a legacy layout in localStorage
      // (seeded above, and retained by the quit), and an old-style keeper file with a known
      // placement: exactly the state an install from before the window-layouts structure holds.
      fs.rmSync(path.join(userDataDir, 'window-layouts.json'), { force: true });
      expect(fs.existsSync(path.join(userDataDir, 'window-layouts.json'))).toBe(false);
      fs.writeFileSync(
        path.join(userDataDir, LEGACY_WINDOW_STATE_FILE_NAME),
        JSON.stringify({
          x: primaryDisplayBounds.x,
          y: primaryDisplayBounds.y,
          ...LEGACY_KEEPER_SIZE,
          isMaximized: false,
          isFullScreen: false,
          displayBounds: primaryDisplayBounds,
        }),
      );
      logStep('between launches: structure file removed, legacy keeper file written');

      // #endregion

      // #region Launch B — the upgrade

      // No preserveUserDataDir: this launch's teardown must delete the profile directory.
      ctx = await launchElectronApp({ ...BASE_LAUNCH_OPTIONS, userDataDir });
      const outputB = captureAppOutput(ctx.electronApp);
      const pagesB = await waitForAppPages(ctx.electronApp, 1, 180_000);
      const pageB = pagesB[0];
      const windowBId = getWindowIdOfPage(pageB);
      await waitForAppReady(pageB, 180_000);
      logStep(`launch B: window ${windowBId} ready`);

      // Premise check on the harness itself: the seeded blob must have survived the quit (the
      // renderer only reads this key, never writes or clears it). Failing here means the SEEDING
      // did not persist — a test-harness problem — so the layout assertions below can only fail
      // for product reasons.
      const storedLegacyBlob = await pageB.evaluate(
        (storageKey) => localStorage.getItem(storageKey),
        LEGACY_DOCK_LAYOUT_STORAGE_KEY,
      );
      expect(storedLegacyBlob ?? '').toContain(LEGACY_SECOND_TAB_UUID);

      // The discriminator: BOTH seeded tabs must render. A pass cannot be vacuous through some
      // other layout source — the fresh-profile fallback layout has exactly ONE tab (Home) and a
      // window with nothing of its own docks only its own Home tab (also one), so a tab with the
      // seeded clone id can only have come from the legacy localStorage blob itself. An upgrade
      // that lost the legacy layout would show one Home tab (fallback, or its own docked Home), and
      // fail here.
      await expect(homeTabTitle(pageB, windowBId)).toBeAttached({ timeout: 60_000 });
      await expect(webViewTabTitle(pageB, `${LEGACY_SECOND_TAB_UUID}-w${windowBId}`)).toBeAttached({
        timeout: 60_000,
      });
      await expect(pageB.locator('.platform-tab-title')).toHaveCount(2);
      logStep('launch B: legacy layout loaded — Home tab and seeded second tab both render');

      // Exactly ONE window: the upgrade rule is one window, not two, not zero. Give a wrongly
      // created extra window time to appear before asserting the count (secondary windows are
      // created late in startup, once the interface mode becomes readable).
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 10_000);
      });
      expect(getAppPages(ctx.electronApp)).toHaveLength(1);
      logStep('launch B: exactly one window restored');

      // The keeper file's size must be honored (its placement is on-display by construction, so
      // the app's off-display fallback cannot legitimately apply). An upgrade that ignores the
      // keeper file would come up at the default size instead — which the keeper size deliberately
      // differs from.
      const upgradedBounds = await getWindowBounds(ctx.electronApp, windowBId);
      expect(upgradedBounds.width, 'upgraded window: width from the keeper file').toBe(
        LEGACY_KEEPER_SIZE.width,
      );
      expect(upgradedBounds.height, 'upgraded window: height from the keeper file').toBe(
        LEGACY_KEEPER_SIZE.height,
      );
      logStep('launch B: keeper-file window size honored');

      // A window created mid-session in the upgraded session must dock only its OWN Home tab even
      // though a legacy blob exists in localStorage — the kill-shot for the fallback that cloned
      // the legacy layout into every new window. A regression to that behaviour would render the
      // two seeded tabs here.
      const page2B = await createSecondWindow(ctx.electronApp);
      const window2BId = getWindowIdOfPage(page2B);
      await waitForRendererRegistered(window2BId, 120_000);
      await expectWindowDockHasOnlyHomeTab(page2B);
      logStep(
        `launch B: mid-session window ${window2BId} docked only its own Home tab despite the legacy blob`,
      );

      await quitAndExpectCleanExit(ctx.electronApp, outputB, logStep, 'launch B');

      // The final teardown (launched without preserveUserDataDir) deletes the profile directory.
      await teardownElectronApp(ctx);
      ctx = undefined;
      expect(fs.existsSync(userDataDir)).toBe(false);

      // #endregion
    } finally {
      // On any failure above: kill whatever instance is still up, then remove the preserved
      // profile directory so a failed run leaks nothing. Both are no-ops after a clean launch B.
      if (ctx) await teardownElectronApp(ctx);
      if (profileDir) fs.rmSync(profileDir, { recursive: true, force: true });
    }
  });
});
