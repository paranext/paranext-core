/**
 * E2E checks for the Scripture Text Grid per-resource zoom feature (PT-4155 / B8).
 *
 * Covered:
 * - Kebab path: hover a cell, click its "Zoom options" dropdown trigger, click "Zoom In", assert
 *   the first cell's content wrapper receives a `zoom` style > 1 while a second resource's cell
 *   remains unzoomed.
 * - Keyboard path: focus the first cell, press Ctrl+= to zoom in (zoom style applied), press
 *   Ctrl+0 to reset (zoom style removed).
 *
 * Not covered (need an app relaunch the CDP fixture can't do, plus real resource fixtures;
 * verify manually): Ctrl+wheel zoom, context-menu path, persistence across restarts,
 * chapter-context split rendering at the zoomed factor, boundary disabled states (max/min).
 *
 * Honest runnability: these tests require a running Platform.Bible instance with 2+ resources
 * flagged and visible in the Scripture Text Grid. They are skipped in CI (no real resource
 * fixtures) and must be run locally after opening the app with
 * --remote-debugging-port=9223 and configuring at least two resources via View Options.
 *
 * The zoom CSS property is applied inline (`style="zoom: 1.1"`) on the content wrapper div.
 * In a real Chromium (unlike jsdom), `locator('[style*="zoom"]')` reliably matches this element.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import {
  closeAllNonHomeDockTabs,
  discoverAdminTextConnectionProject,
  flagResourcesAndOpenScriptureTextGrid,
  openScriptureTextGrid,
  restoreScriptureTextGridProjectSettings,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
} from './test-helpers';

/**
 * Two synthetic resource IDs for seeding the grid. The `id` values do not need to resolve to
 * downloadable projects for the zoom surfaces to render — the zoom menu is present even when a
 * resource is in the "unavailable" state. Using synthetic IDs avoids real Paratext project
 * fixtures and keeps the test self-contained.
 *
 * If you have real downloaded resources, set `E2E_TEST_RESOURCE_IDS=id1,id2` and the tests will
 * prefer them (no "unavailable" banner).
 */
const SYNTHETIC_RESOURCE_A = 'aabbccddeeff001122334455';
const SYNTHETIC_RESOURCE_B = 'aabbccddeeff001122334456';

const REAL_RESOURCE_IDS = (process.env.E2E_TEST_RESOURCE_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

/** The two resources to seed: prefer real downloaded IDs, fall back to synthetics. */
function twoResources(): [
  { type: 'project'; name: string; id: string; isResourceShownByDefault: boolean },
  { type: 'project'; name: string; id: string; isResourceShownByDefault: boolean },
] {
  const ids =
    REAL_RESOURCE_IDS.length >= 2
      ? [REAL_RESOURCE_IDS[0], REAL_RESOURCE_IDS[1]]
      : [SYNTHETIC_RESOURCE_A, SYNTHETIC_RESOURCE_B];
  return [
    { type: 'project', name: 'Zoom A', id: ids[0], isResourceShownByDefault: true },
    { type: 'project', name: 'Zoom B', id: ids[1], isResourceShownByDefault: true },
  ];
}

test.describe('Scripture Text Grid — per-resource zoom', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  // Make the non-closable grid tab closable so the shared sweep can clear it between tests.
  // Best-effort — cleanup must not fail the test.
  test.afterEach(async ({ mainPage }) => {
    await mainPage
      .evaluate(async (webViewType) => {
        // The renderer exposes `papi` and `updateWebViewDefinitionById` on `globalThis`, untyped here.
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
    await restoreScriptureTextGridProjectSettings(mainPage);
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('kebab menu zooms first resource without affecting the second', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const frame = await openScriptureTextGrid(mainPage);

    // Wait for the grid row (two cells) to be present.
    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible({ timeout: 15_000 });
    await expect(frame.locator('[role="gridcell"]')).toHaveCount(2, { timeout: 15_000 });

    const firstCell = frame.locator('[role="gridcell"]').first();
    const secondCell = frame.locator('[role="gridcell"]').nth(1);

    // Hover the first cell so the kebab button becomes visible (it uses opacity-0 / group-hover).
    await firstCell.hover();

    // The dropdown trigger button carries aria-label="Zoom options" (English locale).
    // Matching case-insensitively with a regex guards against minor casing variations.
    const zoomKebab = firstCell.getByRole('button', { name: /Zoom options/i });
    await expect(zoomKebab).toBeVisible({ timeout: 5_000 });
    await zoomKebab.click();

    // The dropdown menu item "Zoom In" appears in the Radix DropdownMenuContent.
    await frame.getByRole('menuitem', { name: /^Zoom In$/i }).click();

    // The content wrapper div inside the first gridcell receives `style="zoom: 1.1"` once the
    // factor moves above the default (1). The actual browser (Chromium inside Electron) serialises
    // the inline `zoom` property into the `style` attribute — `locator('[style*="zoom"]')` is
    // therefore reliable in this environment (unlike jsdom which does not support `zoom`).
    const zoomedWrapper = firstCell.locator('[style*="zoom"]');
    await expect(zoomedWrapper).toBeVisible({ timeout: 5_000 });
    // The factor after one "Zoom In" step is 1.1 (DEFAULT_ZOOM_FACTOR + ZOOM_STEP).
    await expect(zoomedWrapper).toHaveAttribute('style', /zoom:\s*1\.1/);

    // The second resource must NOT have a zoom style — it is independent of the first.
    await expect(secondCell.locator('[style*="zoom"]')).toHaveCount(0);
  });

  test('keyboard Ctrl+= zooms, Ctrl+0 resets', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const frame = await openScriptureTextGrid(mainPage);

    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible({ timeout: 15_000 });

    const firstCell = frame.locator('[role="gridcell"]').first();

    // Focus the first gridcell so the keyboard handler resolves it as the zoom target.
    // `focus()` triggers the `onFocusCapture` on the `[data-resource-id]` wrapper, which
    // updates `lastInteractedResourceIdRef` — the keyboard handler's fallback resource id.
    await firstCell.focus();

    // Ctrl+= fires the zoom-in branch in `useResourceZoomInput` (key "=" without shift).
    // Playwright sends this as "Control+Equal" on all platforms.
    await frame.locator('[role="grid"]').press('Control+Equal');

    // After one step the content wrapper has zoom: 1.1.
    const zoomedWrapper = firstCell.locator('[style*="zoom"]');
    await expect(zoomedWrapper).toBeVisible({ timeout: 5_000 });
    await expect(zoomedWrapper).toHaveAttribute('style', /zoom:\s*1\.1/);

    // Ctrl+0 resets the zoom — the style attribute is removed entirely (resetZoom deletes the key).
    await frame.locator('[role="grid"]').press('Control+0');
    await expect(firstCell.locator('[style*="zoom"]')).toHaveCount(0);
  });
});
