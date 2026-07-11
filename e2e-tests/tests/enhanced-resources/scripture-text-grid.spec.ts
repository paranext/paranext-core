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

  test('non-negotiable #1: a shown resource renders a gridcell (no blank-out, no empty toolbar)', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'STG renderer smoke',
        id: SYNTHETIC_BAD_ID,
        isResourceShownByDefault: true,
      },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.locator('[role="grid"]')).toBeVisible({ timeout: 15_000 });
    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible({ timeout: 15_000 });
    await expect(frame.locator('[role="toolbar"]')).toHaveCount(0);
  });

  test('verse-click opens chapter-context panel beside the row', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'STG renderer split',
        id: SYNTHETIC_BAD_ID,
        isResourceShownByDefault: true,
      },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    const firstCell = frame.locator('[role="gridcell"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    await expect(frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);

    await firstCell.click();
    await expect(frame.getByTestId('scripture-text-grid-chapter-context')).toBeVisible({
      timeout: 15_000,
    });
    await expect(frame.locator('[role="gridcell"]')).toHaveCount(2);
    await expect(frame.locator('[role="grid"]')).toBeVisible();
  });

  test('Escape closes the chapter-context panel without blanking the row', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      {
        type: 'project',
        name: 'STG renderer esc',
        id: SYNTHETIC_BAD_ID,
        isResourceShownByDefault: true,
      },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    await frame.locator('[role="gridcell"]').first().click();
    await expect(frame.getByTestId('scripture-text-grid-chapter-context')).toBeVisible({
      timeout: 15_000,
    });

    await mainPage.keyboard.press('Escape');
    await expect(frame.getByTestId('scripture-text-grid-chapter-context')).toHaveCount(0);
    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible();
  });

  test('RTL UI locale reverses the row via logical flex properties', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'WEB', id: 'rtl001', isResourceShownByDefault: true },
      { type: 'project', name: 'KJV', id: 'rtl002', isResourceShownByDefault: true },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.locator('[role="row"]')).toBeVisible({ timeout: 15_000 });

    const directions = await frame.locator('[role="row"]').evaluate((row) => {
      document.documentElement.dir = 'ltr';
      const ltr = getComputedStyle(row).flexDirection;
      document.documentElement.dir = 'rtl';
      const rtl = getComputedStyle(row).flexDirection;
      return { ltr, rtl };
    });
    expect(directions.ltr).toBe('row');
    expect(directions.rtl).toBe('row-reverse');
  });

  test('partial failure: valid and invalid resources render side by side', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    const validIds = REAL_RESOURCE_IDS.slice(0, 2);
    test.skip(
      validIds.length < 1,
      'Set E2E_TEST_RESOURCE_IDS with at least one downloaded resource',
    );

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      ...validIds.map((id, index) => ({
        type: 'project' as const,
        name: `Valid ${index + 1}`,
        id,
        isResourceShownByDefault: true,
      })),
      {
        type: 'project',
        name: 'Bad resource',
        id: SYNTHETIC_BAD_ID,
        isResourceShownByDefault: true,
      },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.locator('[role="gridcell"]')).toHaveCount(validIds.length + 1, {
      timeout: 15_000,
    });
    await expect(frame.getByText(/Resource unavailable|Downloading/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test('scrRef sync: all row cells remain visible after reference change', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');
    test.skip(
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
        isResourceShownByDefault: true,
      })),
    );

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.locator('[role="gridcell"]')).toHaveCount(2, { timeout: 15_000 });

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

    await expect(frame.locator('[role="gridcell"]')).toHaveCount(2);
    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible();
    await expect(frame.locator('[role="gridcell"]').nth(1)).toBeVisible();
  });

  test('frame budget: verse row renders >=5 cells under threshold (split closed)', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');
    test.skip(
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
        isResourceShownByDefault: true,
      })),
    );

    const frame = await openScriptureTextGrid(mainPage);
    const elapsedMs = await frame.evaluate(async () => {
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (document.querySelectorAll('[role="gridcell"]').length >= 5) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        if (document.querySelectorAll('[role="gridcell"]').length >= 5) resolve();
      });
      return performance.now() - start;
    });

    await expect(frame.locator('[role="gridcell"]')).toHaveCount(5, { timeout: 15_000 });
    expect(elapsedMs).toBeLessThan(220);
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
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    // Flag nothing → the effective list is empty → the grid renders the empty state, not cells.
    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, []);

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.getByTestId('scripture-text-grid-empty-state')).toBeVisible({
      timeout: 15_000,
    });
    await expect(frame.locator('[role="gridcell"]')).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// A12 (PT-4057) — Scripture Text Grid accessibility pass.
//
// Covers: accessible name on gridcells, Tab-key focus order stays within
// gridcells, focus-visible ring renders a non-zero box-shadow, and the
// chapter-context split panel positions to the left (inline-end) under RTL.
//
// All specs are local-only (they mutate real project settings) and self-skip
// in CI or when no admin-writable project is available.
// ---------------------------------------------------------------------------
test.describe('Scripture Text Grid accessibility (A12)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test.afterEach(async ({ mainPage }) => {
    await restoreScriptureTextGridProjectSettings(mainPage);
  });

  test('gridcell accessible name includes the resource label and verse reference', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'AccName A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
      { type: 'project', name: 'AccName B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    const firstCell = frame.locator('[role="gridcell"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    // Accessible name is "<label>, <BOOK C:V>" — assert the comma-joined shape.
    await expect(firstCell).toHaveAttribute('aria-label', /.+,\s+[A-Z1-9]{3}\s+\d+:\d+/);
  });

  test('Tab moves focus between gridcells, not into editor content', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'Tab A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
      { type: 'project', name: 'Tab B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible({ timeout: 15_000 });

    // Focus the first cell, then Tab — focus should land on a gridcell (the next cell), never inside
    // the readonly editor.
    await frame.locator('[role="gridcell"]').first().focus();
    await mainPage.keyboard.press('Tab');
    const focusedRole = await frame.evaluate(() => document.activeElement?.getAttribute('role'));
    expect(focusedRole).toBe('gridcell');
  });

  test('focused gridcell shows a focus ring', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'Ring A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
      { type: 'project', name: 'Ring B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    const firstCell = frame.locator('[role="gridcell"]').first();
    await expect(firstCell).toBeVisible({ timeout: 15_000 });
    await firstCell.focus();
    // Tailwind focus-visible ring renders a non-zero box-shadow on the focused cell.
    const boxShadow = await firstCell.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toBe('none');
  });

  test('chapter-context split opens on the inline-end (visual-left) side under RTL', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, [
      { type: 'project', name: 'RtlSplit A', id: 'aabbccddeeff00112233', isResourceShownByDefault: true },
      { type: 'project', name: 'RtlSplit B', id: 'bbccddeeff0011223344', isResourceShownByDefault: true },
    ]);

    const frame = await openScriptureTextGrid(mainPage);
    await frame.evaluate(() => {
      document.documentElement.dir = 'rtl';
    });
    await frame.locator('[role="gridcell"]').first().click();
    const context = frame.getByTestId('scripture-text-grid-chapter-context');
    await expect(context).toBeVisible({ timeout: 15_000 });

    // Under RTL the chapter-context panel sits to the LEFT of the verse row.
    const contextBox = await context.boundingBox();
    const rowBox = await frame.locator('[role="grid"]').boundingBox();
    expect(contextBox && rowBox && contextBox.x < rowBox.x).toBe(true);
  });
});
