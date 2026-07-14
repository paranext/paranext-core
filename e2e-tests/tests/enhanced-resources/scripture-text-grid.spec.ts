/**
 * E2E scaffold checks for the Scripture Text Grid web view (PT-4049).
 *
 * Covered: the view opens as a non-closable, icon-only dock tab (located by the opened web view id,
 * since the tab has no text label) — no `.dock-tab-close-btn`, checked against a positive-control
 * tab so a class rename can't make the assertion pass vacuously. The app has no keyboard close
 * shortcut, so the missing button covers both close paths.
 *
 * There is no menu/command for this view (it is injected into the default Simple-mode layout via
 * the dock-layout supplement), so the test opens it directly via `window.papi.webViews.openWebView`
 * (renderer exposes `papi` on `globalThis`). Opening it directly makes these tests independent of
 * the interface mode and the default layout — they neither assume nor assert Simple mode; the
 * `closeAllNonHomeDockTabs` calls are just per-test dock hygiene, not a mode requirement.
 *
 * NOT covered (need an app relaunch the CDP fixture can't do; verified manually): `useWebViewState`
 * restart-persistence, and feature-flag-OFF hiding the view (registration happens at activation).
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import {
  closeAllNonHomeDockTabs,
  discoverAdminTextConnectionProject,
  flagResourcesAndOpenScriptureTextGrid,
  openEnhancedResource,
  openScriptureTextGrid,
  restoreScriptureTextGridProjectSettings,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
} from './test-helpers';

test.describe('Scripture Text Grid (scaffold)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  // The grid tab is non-closable, so the shared close-button sweep can't clear it, and it would leak
  // into later specs (shared instance + persisted layout). Make it closable via the renderer global
  // `updateWebViewDefinitionById`, then run the normal sweep. Best-effort: cleanup must not fail the test.
  test.afterEach(async ({ mainPage }) => {
    await mainPage
      .evaluate(async (webViewType) => {
        // The renderer exposes `papi` and `updateWebViewDefinitionById` on `globalThis`; both are
        // untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const win = window as unknown as {
          papi: {
            webViews: {
              getAllOpenWebViewDefinitions: () => Promise<{ id: string; webViewType: string }[]>;
            };
          };
          updateWebViewDefinitionById: (id: string, update: { isClosable: boolean }) => unknown;
        };
        const defs = await win.papi.webViews.getAllOpenWebViewDefinitions();
        await Promise.all(
          defs
            .filter((d) => d.webViewType === webViewType)
            .map((d) => win.updateWebViewDefinitionById(d.id, { isClosable: true })),
        );
      }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE)
      .catch(() => {
        // Ignore — cleanup is best-effort and must not fail the test.
      });
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('opens as a non-closable, icon-only tab', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // No menu/command exists for this view (it comes from the default layout), so open it directly
    // through the renderer's global `papi`. `existingId: '?'` reuses an already-open instance.
    const webViewId = await mainPage.evaluate(async (webViewType) => {
      // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { papi } = window as unknown as {
        papi: {
          webViews: {
            openWebView: (
              type: string,
              layout?: unknown,
              options?: { existingId?: string },
            ) => Promise<string | undefined>;
          };
        };
      };
      return papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
    }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
    expect(webViewId).toBeTruthy();

    // The tab shows only an icon (no text label), so locate it by the opened web view id rather than
    // by title text. rc-dock renders each tab nav button with `data-node-key` set to the tab id
    // (which equals the web view id).
    const tab = mainPage.locator(`.dock-tab[data-node-key="${webViewId}"]`);
    await expect(tab).toBeVisible({ timeout: 15_000 });

    // Non-closable: the grid tab renders no close button (rc-dock omits it when `closable` is false).
    await expect(tab.locator('.dock-tab-close-btn')).toHaveCount(0);

    // Positive control: a bare `toHaveCount(0)` would pass vacuously if rc-dock renamed
    // `.dock-tab-close-btn`. Open a normal closable tab and confirm the SAME selector matches its
    // close button once, proving the grid tab's zero-count means "no button", not "selector broke".
    await openEnhancedResource(mainPage);
    const closableTab = mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i }).first();
    await expect(closableTab).toBeVisible({ timeout: 15_000 });
    await expect(closableTab.locator('.dock-tab-close-btn')).toHaveCount(1);

    // The grid tab is still non-closable even with a closable tab now open alongside it.
    await expect(tab.locator('.dock-tab-close-btn')).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// PT-4052 — ScriptureTextGrid renderer (verse default + chapter-context split).
//
// Honest runnability: there is NO dev-fixture plumbing for web-view content (a web view is a
// renderer iframe with no injected env), and most scenarios need real flagged resources. Data-mutating
// specs skip in CI and discover an admin-writable project locally (mirroring the other
// data-mutating enhanced-resources specs).
//
// Env vars:
// - E2E_TEST_PROJECT_ID — pin an admin-writable text-connection project (optional)
// - E2E_TEST_RESOURCE_IDS — comma-separated downloaded Bible-text project IDs for multi-resource tests
// ---------------------------------------------------------------------------
const SYNTHETIC_BAD_ID = 'aabbccddeeff00112233';
const REAL_RESOURCE_IDS = (process.env.E2E_TEST_RESOURCE_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

test.describe('Scripture Text Grid renderer', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test.afterEach(async ({ mainPage }) => {
    await restoreScriptureTextGridProjectSettings(mainPage);
  });

  test('a shown resource renders a list item (no blank-out, no empty toolbar)', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'STG renderer smoke',
        id: SYNTHETIC_BAD_ID,
        isInTextCollection: true,
      },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    await expect(stg.frame.locator('[role="list"]')).toBeVisible({ timeout: 15_000 });
    await expect(stg.frame.locator('[role="listitem"]').first()).toBeVisible({ timeout: 15_000 });
    await expect(stg.frame.locator('[role="toolbar"]')).toHaveCount(0);
  });

  test('verse-click opens chapter-context panel beside the row', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'STG renderer split',
        id: SYNTHETIC_BAD_ID,
        isInTextCollection: true,
      },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    const firstCell = stg.frame.locator('[role="listitem"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);

    await firstCell.click();
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toBeVisible({
      timeout: 15_000,
    });
    // The split panel's inner cell is presentational (no listitem role); only verse list items are
    // listitems. Assert the chapter-context region is visible and the verse list still shows its
    // single flagged-resource listitem.
    await expect(stg.frame.locator('[role="listitem"]')).toHaveCount(1);
    await expect(stg.frame.locator('[role="list"]')).toBeVisible();
  });

  test('Escape closes the chapter-context panel without blanking the row', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'STG renderer esc',
        id: SYNTHETIC_BAD_ID,
        isInTextCollection: true,
      },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    await stg.frame.locator('[role="listitem"]').first().click();
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toBeVisible({
      timeout: 15_000,
    });

    await mainPage.keyboard.press('Escape');
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);
    await expect(stg.frame.locator('[role="listitem"]').first()).toBeVisible();
  });

  test('verse view is a vertical column, unaffected by RTL UI locale', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'WEB', id: 'rtl001', isInTextCollection: true },
      { type: 'project', name: 'KJV', id: 'rtl002', isInTextCollection: true },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    await expect(stg.frame.locator('[role="list"]')).toBeVisible({ timeout: 15_000 });

    const directions = await stg.frame.locator('[role="list"]').evaluate((list) => {
      document.documentElement.dir = 'ltr';
      const ltr = getComputedStyle(list).flexDirection;
      document.documentElement.dir = 'rtl';
      const rtl = getComputedStyle(list).flexDirection;
      document.documentElement.dir = 'ltr';
      return { ltr, rtl };
    });
    // Column in both directions — the verse view stacks vertically, which does not reverse under RTL.
    expect(directions.ltr).toBe('column');
    expect(directions.rtl).toBe('column');
  });

  test('partial failure: valid and invalid resources render side by side', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    const validIds = REAL_RESOURCE_IDS.slice(0, 2);
    warnAndSkip(
      validIds.length < 1,
      'Set E2E_TEST_RESOURCE_IDS with at least one downloaded resource',
    );

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      ...validIds.map((id, index) => ({
        type: 'project' as const,
        name: `Valid ${index + 1}`,
        id,
        isInTextCollection: true,
      })),
      {
        type: 'project',
        name: 'Bad resource',
        id: SYNTHETIC_BAD_ID,
        isInTextCollection: true,
      },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    await expect(stg.frame.locator('[role="listitem"]')).toHaveCount(validIds.length + 1, {
      timeout: 15_000,
    });
    await expect(stg.frame.getByText(/Resource unavailable|Downloading/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test('scrRef sync: all row cells remain visible after reference change', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');
    warnAndSkip(
      REAL_RESOURCE_IDS.length < 2,
      'Set E2E_TEST_RESOURCE_IDS with two downloaded resource IDs',
    );

    await flagResourcesAndOpenScriptureTextGrid(
      mainPage,
      projectId,
      REAL_RESOURCE_IDS.slice(0, 2).map((id, index) => ({
        type: 'project' as const,
        name: `Sync ${index + 1}`,
        id,
        isInTextCollection: true,
      })),
    );

    const stg = await openScriptureTextGrid(mainPage);
    await expect(stg.frame.locator('[role="listitem"]')).toHaveCount(2, { timeout: 15_000 });

    await mainPage.evaluate(async () => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
      const { papi } = window as unknown as {
        papi: {
          scrollGroups: {
            setScrRef: (groupId: number, scrRef: unknown) => Promise<void>;
          };
        };
      };
      await papi.scrollGroups.setScrRef(0, {
        book: 'MAT',
        chapterNum: 5,
        verseNum: 4,
        versificationStr: 'English',
      });
    });

    await expect(stg.frame.locator('[role="listitem"]')).toHaveCount(2);
    await expect(stg.frame.locator('[role="listitem"]').first()).toBeVisible();
    await expect(stg.frame.locator('[role="listitem"]').nth(1)).toBeVisible();
  });

  test('frame budget: verse row renders >=5 cells under threshold (split closed)', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');
    warnAndSkip(
      REAL_RESOURCE_IDS.length < 5,
      'Set E2E_TEST_RESOURCE_IDS with five downloaded resource IDs',
    );

    await flagResourcesAndOpenScriptureTextGrid(
      mainPage,
      projectId,
      REAL_RESOURCE_IDS.slice(0, 5).map((id, index) => ({
        type: 'project' as const,
        name: `Perf ${index + 1}`,
        id,
        isInTextCollection: true,
      })),
    );

    const stg = await openScriptureTextGrid(mainPage);
    const elapsedMs = await stg.frame.locator('body').evaluate(async () => {
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (document.querySelectorAll('[role="listitem"]').length >= 5) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        if (document.querySelectorAll('[role="listitem"]').length >= 5) resolve();
      });
      return performance.now() - start;
    });

    await expect(stg.frame.locator('[role="listitem"]')).toHaveCount(5, { timeout: 15_000 });
    expect(elapsedMs).toBeLessThan(220);
  });

  test('chapter mode arranges resources side-by-side (row layout)', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'WEB', id: 'chap001', isInTextCollection: true },
      { type: 'project', name: 'KJV', id: 'chap002', isInTextCollection: true },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    await stg.switchToChapterView();

    // The chapter group lays out as a horizontal row of columns and shows no chapter-context split.
    const grid = stg.frame.locator('[role="group"]');
    await expect(grid).toBeVisible({ timeout: 15_000 });
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);
    const flexDirection = await grid.evaluate((el) => getComputedStyle(el).flexDirection);
    expect(flexDirection).toBe('row');
    // Each resource is its own region (side-by-side column).
    await expect(stg.frame.locator('[role="region"]')).toHaveCount(2);
  });

  test('chapter mode: clicking a cell opens no chapter-context split (selection sync is delegated to the shared scrRef)', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');
    warnAndSkip(
      REAL_RESOURCE_IDS.length < 2,
      'Set E2E_TEST_RESOURCE_IDS with two downloaded resource IDs',
    );

    await flagResourcesAndOpenScriptureTextGrid(
      mainPage,
      projectId,
      REAL_RESOURCE_IDS.slice(0, 2).map((id, index) => ({
        type: 'project' as const,
        name: `ChapSync ${index + 1}`,
        id,
        isInTextCollection: true,
      })),
    );

    const stg = await openScriptureTextGrid(mainPage);
    await stg.switchToChapterView();

    await expect(stg.frame.locator('[role="region"]')).toHaveCount(2, { timeout: 15_000 });
    // Clicking inside a chapter region must NOT open the verse-view chapter-context split, and both
    // regions stay visible (selection sync keeps every column mounted and navigated).
    await stg.frame.locator('[role="region"]').first().click();
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);
    await expect(stg.frame.locator('[role="region"]')).toHaveCount(2);
    await expect(stg.frame.locator('[role="region"]').nth(1)).toBeVisible();
  });

  test('chapter frame budget: >=5 side-by-side chapters render under the chapter-mode baseline', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');
    warnAndSkip(
      REAL_RESOURCE_IDS.length < 5,
      'Set E2E_TEST_RESOURCE_IDS with five downloaded resource IDs',
    );

    await flagResourcesAndOpenScriptureTextGrid(
      mainPage,
      projectId,
      REAL_RESOURCE_IDS.slice(0, 5).map((id, index) => ({
        type: 'project' as const,
        name: `ChapPerf ${index + 1}`,
        id,
        isInTextCollection: true,
      })),
    );

    const stg = await openScriptureTextGrid(mainPage);
    await stg.switchToChapterView();

    const elapsedMs = await stg.frame.locator('body').evaluate(async () => {
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (document.querySelectorAll('[role="region"]').length >= 5) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        if (document.querySelectorAll('[role="region"]').length >= 5) resolve();
      });
      return performance.now() - start;
    });

    await expect(stg.frame.locator('[role="region"]')).toHaveCount(5, { timeout: 15_000 });
    // Chapter mode renders full chapters (10–100x a verse cell), so the ~220ms verse threshold does
    // NOT apply. Baseline established here; tighten once real measurements are collected.
    // eslint-disable-next-line no-console -- surfaces the measured baseline in CI/local logs
    console.log(`[chapter frame budget] ${elapsedMs.toFixed(1)}ms for 5 side-by-side chapters`);
    expect(elapsedMs).toBeLessThan(2000);
  });

  test('chapter mode: horizontal row is RTL-safe (flex-direction row, not a hardcoded axis)', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'WEB', id: 'chaprtl1', isInTextCollection: true },
      { type: 'project', name: 'KJV', id: 'chaprtl2', isInTextCollection: true },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    await stg.switchToChapterView();

    const grid = stg.frame.locator('[role="group"]');
    await expect(grid).toBeVisible({ timeout: 15_000 });
    const directions = await grid.evaluate((el) => {
      document.documentElement.dir = 'ltr';
      const ltr = getComputedStyle(el).flexDirection;
      document.documentElement.dir = 'rtl';
      const rtl = getComputedStyle(el).flexDirection;
      document.documentElement.dir = 'ltr';
      return { ltr, rtl };
    });
    // `flex-direction: row` follows `dir`: under RTL the columns flow right-to-left visually while
    // the computed value stays `row` (it does NOT become `row-reverse`). Asserting it stays `row`
    // both ways confirms the row is RTL-safe (no hardcoded left/right axis). Visual RTL column order
    // is confirmed in the manual AT pass.
    expect(directions.ltr).toBe('row');
    expect(directions.rtl).toBe('row');
  });
});

test.describe('Scripture Text Grid empty state', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test.afterEach(async ({ mainPage }) => {
    await restoreScriptureTextGridProjectSettings(mainPage);
  });

  test('shows directional copy and no cells when nothing is shown', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    // Flag nothing → the effective list is empty → the grid renders the empty state, not cells.
    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, []);

    const stg = await openScriptureTextGrid(mainPage);
    await expect(stg.frame.getByTestId('scripture-text-grid-empty-state')).toBeVisible({
      timeout: 15_000,
    });
    await expect(stg.frame.locator('[role="gridcell"]')).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// PT-4057 — accessibility pass on top of the PT-4062 renderer. Verse cells are `listitem`s that
// carry a reference-bearing accessible name, are keyboard-reachable (Tab) and -activatable
// (Enter/Space) with a visible focus ring, and announce chapter-context open/close through a polite
// live region. Local-only for the same reason as the renderer specs above (mutate real settings).
// ---------------------------------------------------------------------------
const ACC_RESOURCE_A_ID = 'aabbccddeeff00112233';
const ACC_RESOURCE_B_ID = 'bbccddeeff0011223344';

test.describe('Scripture Text Grid accessibility', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test.afterEach(async ({ mainPage }) => {
    await restoreScriptureTextGridProjectSettings(mainPage);
  });

  test('listitem accessible name includes the resource label and verse reference', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'AccName A',
        id: ACC_RESOURCE_A_ID,
        isResourceShownByDefault: true,
      },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    const firstCell = stg.frame.locator('[role="listitem"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    // Accessible name is "<label>, <BOOK C:V>" — anchored so a stray substring can't match.
    // The book id is a 3-char USFM code; only the first char may be a digit (1-4, e.g. 1SA, 2KI,
    // 3JN), and the remaining two are always letters.
    await expect(firstCell).toHaveAttribute('aria-label', /^[^,]+,\s[A-Z1-4][A-Z]{2}\s\d+:\d+$/);
  });

  test('Tab moves focus between listitems, not into editor content', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'Tab A', id: ACC_RESOURCE_A_ID, isResourceShownByDefault: true },
      { type: 'project', name: 'Tab B', id: ACC_RESOURCE_B_ID, isResourceShownByDefault: true },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    const firstCell = stg.frame.locator('[role="listitem"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });

    // Capture the first cell's aria-label to verify Tab moves focus to a different cell.
    const firstLabel = await firstCell.getAttribute('aria-label');
    await firstCell.focus();
    await mainPage.keyboard.press('Tab');
    // Read the active element from INSIDE the frame document so focus escaping the iframe
    // fails the test rather than passing vacuously.
    const focused = await stg.frame.evaluate(() => ({
      role: document.activeElement?.getAttribute('role') ?? undefined,
      label: document.activeElement?.getAttribute('aria-label') ?? undefined,
    }));
    expect(focused.role).toBe('listitem');
    expect(focused.label).not.toBe(firstLabel);
  });

  test('focused listitem shows a focus ring', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'Ring A', id: ACC_RESOURCE_A_ID, isResourceShownByDefault: true },
      { type: 'project', name: 'Ring B', id: ACC_RESOURCE_B_ID, isResourceShownByDefault: true },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    const firstCell = stg.frame.locator('[role="listitem"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    // The ring is `focus-visible`-gated, which Chromium applies only for keyboard-originated focus —
    // a programmatic `.focus()` would not trigger it. Land on the cell, then leave and re-enter via
    // the keyboard so the focus is keyboard-originated.
    await firstCell.focus();
    await mainPage.keyboard.press('Shift+Tab');
    await mainPage.keyboard.press('Tab');
    const boxShadow = await stg.frame
      .locator('[role="listitem"]:focus')
      .evaluate((el) => getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toBe('none');
  });

  test('chapter-context open and close are announced in the live region', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    warnAndSkip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'Announce A',
        id: ACC_RESOURCE_A_ID,
        isResourceShownByDefault: true,
      },
    ]);

    const stg = await openScriptureTextGrid(mainPage);
    const status = stg.frame.locator('[role="status"]').first();
    const firstCell = stg.frame.locator('[role="listitem"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    // Nothing announced until the split is opened.
    await expect(status).toHaveText('');

    await firstCell.click();
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toBeVisible({
      timeout: 15_000,
    });
    // Opening announces a non-empty "opened" message.
    await expect(status).not.toHaveText('');
    const openedMessage = await status.textContent();

    await mainPage.keyboard.press('Escape');
    await expect(stg.frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);
    // Closing announces a distinct "closed" message (a polite region needs a text change to re-fire).
    await expect(status).not.toHaveText('');
    expect(await status.textContent()).not.toBe(openedMessage);
  });
});

/**
 * Conditional `test.skip` that first emits a console warning when it is about to skip.
 *
 * These enhanced-resources specs run only locally (they mutate real project settings and need
 * downloaded resources), so a bare `test.skip` on a missing prerequisite is silent — a dev without
 * the local setup could miss that a whole scenario never ran. The warning surfaces the skipped
 * prerequisite in the run output while still skipping (not failing), so an unconfigured machine is
 * not blocked. Use only for prerequisite gates, not the deliberate CI gate.
 */
function warnAndSkip(condition: boolean, reason: string): void {
  if (condition) {
    // Warn (not fail) so a missing local prerequisite is visible in the run output without blocking
    // an unconfigured machine. console is the only run-output channel available in a spec here.
    // eslint-disable-next-line no-console
    console.warn(`[scripture-text-grid.spec] Skipping test — ${reason}`);
  }
  test.skip(condition, reason);
}
