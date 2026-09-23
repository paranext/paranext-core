/**
 * E2E checks for the Scripture Text Grid per-resource zoom feature (PT-4155).
 *
 * Covered:
 *
 * - Right-click context-menu path: right-click a cell, click "Zoom In" in the menu it opens, assert
 *   the first cell's content wrapper receives a `zoom` style > 1 while a second resource's cell
 *   remains unzoomed. (The kebab dropdown trigger renders only in the chapter-context header —
 *   `nameDisplay !== 'inline'` — which the grid's default verse view never uses; the right-click
 *   menu is available in both modes.)
 * - Pane vs. resource independence: Ctrl+wheel inside a resource cell changes only that resource's
 *   stored factor and leaves the pane's own zoom area untouched; Ctrl+wheel over the View Options
 *   row and the pane-level Ctrl+`=`/Ctrl+`0` chords change the pane's zoom area and leave every
 *   resource's stored factor alone; a resource cell's own inline `zoom` style reflects its stored
 *   per-resource factor exactly, independently of the pane's own level (asserted as two separate,
 *   independently falsifiable signals rather than a combined bounding-rect ratio — the wrapper each
 *   factor scales is a stretched, overflow-auto flex item, so its OUTER box is fixed by the flex
 *   parent and does not itself scale with either factor). The pane-level chords are routed through
 *   the platform's own content-zoom listener inside the WebView iframe — a separate path from the
 *   grid's own per-resource keyboard shortcut noted as deferred below.
 *
 * Not covered (need an app relaunch the CDP fixture can't do, plus real resource fixtures; verify
 * manually): persistence across restarts, chapter-context split rendering at the zoomed factor,
 * boundary disabled states (max/min).
 *
 * - Keyboard zoom of a single resource (Ctrl/Cmd +/-/0 aimed at one resource, as opposed to the
 *   pane-level chords above): deferred pending PT-4143. These chords DO reach the WebView iframe —
 *   `main.ts`'s `before-input-event` handlers claim F12, Ctrl+Tab, the PT9 navigation set and the
 *   reference-history chords, but no Ctrl/Cmd+`=`/`-`/`0` — where they are claimed by the
 *   platform's own pane-level content-zoom handler (`web-view-content-zoom.bootstrap-script.ts`),
 *   which has no notion of a resource cell. So today they zoom the whole pane rather than the
 *   focused resource.
 *
 * Runnability: these tests require a running Platform.Bible instance with 2+ resources flagged and
 * visible in the Scripture Text Grid. They are skipped in CI (no real resource fixtures) and must
 * be run locally after opening the app with --remote-debugging-port=9223 and configuring at least
 * two resources via View Options.
 *
 * The zoom CSS property is applied inline (`style="zoom: 1.1"`) on the content wrapper div. In a
 * real Chromium (unlike jsdom), `locator('[style*="zoom"]')` reliably matches this element.
 */
import type { Frame, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/enhanced-resources.fixture';
import { waitForAppReady, waitForOpenWebViewIdByType } from '../../fixtures/helpers';
import { ctrlWheel, firstLineBoxHeight } from '../../fixtures/content-zoom-helpers';
import { getEditorFrame, readFactor } from '../../fixtures/scripture-editor-helpers';
import {
  closeAllNonHomeDockTabs,
  discoverAdminTextConnectionProject,
  flagResourcesAndOpenScriptureTextGrid,
  openScriptureTextGrid,
  restoreScriptureTextGridProjectSettings,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
} from './test-helpers';
import type { FlaggedResourceItem } from './test-helpers';

/**
 * `scriptureTextGrid.zoomByResourceId` from the grid web view's own definition state
 * (`use-resource-zoom.hook.ts`) — the grid's per-resource levels, kept entirely separate from the
 * platform's own pane-level zoom (`platform.contentZoomLevels` on the same definition).
 */
async function readZoomByResourceId(
  page: Page,
  webViewId: string,
): Promise<Record<string, number>> {
  return page.evaluate(async (id) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as this file's
    // afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: {
        webViews: {
          getOpenWebViewDefinition: (
            webViewId: string,
          ) => Promise<{ state?: Record<string, unknown> } | undefined>;
        };
      };
    };
    const definition = await win.papi.webViews.getOpenWebViewDefinition(id);
    const raw = definition?.state?.['scriptureTextGrid.zoomByResourceId'];
    const out: Record<string, number> = {};
    if (typeof raw !== 'object' || !raw) return out;
    Object.entries(raw).forEach(([resourceId, level]) => {
      if (typeof level === 'number') out[resourceId] = level;
    });
    return out;
  }, webViewId);
}

/**
 * The app-wide default zoom level (`platform.webViewContentZoom`) a pane with no remembered level
 * starts at — read directly rather than assumed to be 1, since this suite attaches to an
 * already-running app whose Settings may not hold the factory default. Same shape as
 * `readSettingsDefaultZoom` in `enhanced-resource-content-zoom.spec.ts`.
 */
async function readSettingsDefaultZoom(page: Page): Promise<number> {
  return page.evaluate(async () => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as this file's
    // afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { get: (key: string) => Promise<number> } };
    };
    return win.papi.settings.get('platform.webViewContentZoom');
  });
}

/**
 * The zoom area the pane's focused element sits in — the same `closest()` lookup the in-iframe
 * chord handler runs on `document.activeElement` (`targetFor` in
 * `web-view-content-zoom.bootstrap-script.ts`). Same shape as `readFocusedAreaId` in
 * `content-zoom-chords.spec.ts`.
 */
async function readFocusedAreaId(frame: Frame): Promise<string | undefined> {
  return frame.evaluate(() => {
    const root = document.activeElement?.closest('[data-platform-content-zoom-root]');
    if (!root) return undefined;
    return root.getAttribute('data-platform-content-zoom-root') || 'main';
  });
}

/**
 * Two synthetic resource IDs for seeding the grid. The `id` values do not need to resolve to
 * downloadable projects for the zoom surfaces to render — the zoom menu is present even when a
 * resource is in the "unavailable" state. Using synthetic IDs avoids real Paratext project fixtures
 * and keeps the test self-contained.
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
function twoResources(): [FlaggedResourceItem, FlaggedResourceItem] {
  const ids =
    REAL_RESOURCE_IDS.length >= 2
      ? [REAL_RESOURCE_IDS[0], REAL_RESOURCE_IDS[1]]
      : [SYNTHETIC_RESOURCE_A, SYNTHETIC_RESOURCE_B];
  return [
    { type: 'project', name: 'Zoom A', id: ids[0], isInTextCollection: true },
    { type: 'project', name: 'Zoom B', id: ids[1], isInTextCollection: true },
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

  test('right-click zoom menu zooms first resource without affecting the second', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage);

    // Wait for the grid row (two cells) to be present. `stg.cellDraggable`
    // (`data-testid="scripture-text-grid-cell-draggable"`), not `[role="gridcell"]`: nothing in the
    // grid carries that role. A resource entry is a `role="listitem"` inside the column's
    // `role="list"`, and `ResourceCellView` inside it is purely presentational.
    await expect(stg.cellDraggable.first()).toBeVisible({ timeout: 15_000 });
    await expect(stg.cellDraggable).toHaveCount(2, { timeout: 15_000 });

    const firstCell = stg.cellDraggable.first();
    const secondCell = stg.cellDraggable.nth(1);

    // Drive the per-resource zoom through the cell's right-click menu, not the kebab: the kebab
    // dropdown trigger renders only in `ResourceCellView`'s chapter-context header
    // (`nameDisplay !== 'inline'`), and the grid's default view mode is verse
    // (`nameDisplay: 'inline'`), where the kebab is never rendered. The right-click menu sits on the
    // cell's outer wrapper and opens in both modes with the same "Zoom In"/"Zoom Out"/"Reset Zoom"
    // items.
    await firstCell.click({ button: 'right' });
    await stg.frame.getByRole('menuitem', { name: /^Zoom In$/i }).click();

    // The content wrapper div inside the first cell receives `style="zoom: 1.1"` once the
    // factor moves above the default (1). The actual browser (Chromium inside Electron) serialises
    // the inline `zoom` property into the `style` attribute — `locator('[style*="zoom"]')` is
    // therefore reliable in this environment (unlike jsdom which does not support `zoom`).
    const zoomedWrapper = firstCell.locator('[style*="zoom"]');
    await expect(zoomedWrapper).toBeVisible({ timeout: 5_000 });
    // The factor after one "Zoom In" step is 1.1 (DEFAULT_ZOOM_FACTOR + ZOOM_STEP).
    // `toHaveAttribute` with a regex tests for a substring match, so the trailing `(?!\d)` is what
    // keeps `zoom: 1.15` and `zoom: 1.12` out.
    await expect(zoomedWrapper).toHaveAttribute('style', /zoom:\s*1\.1(?!\d)/);

    // The second resource must NOT have a zoom style — it is independent of the first.
    await expect(secondCell.locator('[style*="zoom"]')).toHaveCount(0);
  });

  test('the pane level and a resource’s own level move independently, and a cell reflects both', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage);
    const webViewId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
    const frame = await getEditorFrame(mainPage, webViewId);

    // The draggable wrapper (present whenever the grid renders — reordering is always wired up, see
    // `onReorder={handleReorder}` in scripture-text-grid.web-view.tsx) carries `data-resource-id`
    // directly, unlike the presentational cell view inside it.
    await expect(stg.cellDraggable.first()).toBeVisible({ timeout: 15_000 });
    await expect(stg.cellDraggable).toHaveCount(2, { timeout: 15_000 });
    const firstCell = stg.cellDraggable.first();
    const resourceId = await firstCell.getAttribute('data-resource-id');
    if (!resourceId) throw new Error('First resource cell has no data-resource-id');

    // Establish a known pane baseline before any gesture below, rather than reading whatever level
    // a prior run against this already-running app happened to leave behind: every step asserts an
    // EXACT resulting value, which needs a known starting point to compute against, and — unlike
    // "did it change" — cannot pass on a level that has already ratcheted toward the 3.0 clamp.
    // Ending back at this same value (step 4's reset, with nothing after it moving the pane again)
    // is what keeps this run from ratcheting the shared `platform.webViewContentZoomMemory` setting
    // upward for the next one.
    const settingsDefault = await readSettingsDefaultZoom(mainPage);
    await firstCell.focus();
    // The focused cell wrapper sits outside every text marker (each cell marks only its verse
    // text), so the chord resolves to the view's only area by the bootstrap's fallback.
    await expect.poll(() => readFocusedAreaId(frame)).toBeUndefined();
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);

    await test.step('Ctrl+wheel inside a resource cell changes only that resource’s stored factor', async () => {
      const cellBox = await firstCell.boundingBox();
      if (!cellBox) throw new Error('Resource cell has no bounding box');
      const resourceFactorBefore =
        (await readZoomByResourceId(mainPage, webViewId))[resourceId] ?? 1;
      await ctrlWheel(mainPage, cellBox, -120);
      await expect
        .poll(async () => (await readZoomByResourceId(mainPage, webViewId))[resourceId])
        .toBeCloseTo(resourceFactorBefore + 0.1, 5);
      expect(await readFactor(frame, 'text-collection')).toBe(settingsDefault);
    });

    await test.step('Ctrl+wheel over the View Options row changes the pane level and leaves zoomByResourceId alone', async () => {
      const beforeWheel = await readZoomByResourceId(mainPage, webViewId);
      const toolbarBox = await stg.viewOptionsButton.boundingBox();
      if (!toolbarBox) throw new Error('View Options button has no bounding box');
      await ctrlWheel(mainPage, toolbarBox, -120);
      await expect
        .poll(() => readFactor(frame, 'text-collection'))
        .toBeCloseTo(settingsDefault + 0.1, 5);
      expect(await readZoomByResourceId(mainPage, webViewId)).toEqual(beforeWheel);
    });

    await test.step('Ctrl+= with the grid focused changes the pane level', async () => {
      await firstCell.focus();
      // The focused cell wrapper sits outside every text marker (each cell marks only its verse
      // text), so the chord resolves to the view's only area by the bootstrap's fallback.
      await expect.poll(() => readFocusedAreaId(frame)).toBeUndefined();
      await mainPage.keyboard.press('Control+=');
      await expect
        .poll(() => readFactor(frame, 'text-collection'))
        .toBeCloseTo(settingsDefault + 0.2, 5);
    });

    await test.step('a pane reset (Ctrl+0) leaves zoomByResourceId intact', async () => {
      const beforeReset = await readZoomByResourceId(mainPage, webViewId);
      await firstCell.focus();
      // The focused cell wrapper sits outside every text marker (each cell marks only its verse
      // text), so the chord resolves to the view's only area by the bootstrap's fallback.
      await expect.poll(() => readFocusedAreaId(frame)).toBeUndefined();
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);
      expect(await readZoomByResourceId(mainPage, webViewId)).toEqual(beforeReset);
    });

    await test.step('a resource cell’s own zoom style reflects its stored per-resource factor, independently of the pane', async () => {
      // Two independently falsifiable signals in place of a combined bounding-rect ratio: the two
      // factors nest and multiply — the pane's `text-collection` marker is a stretched,
      // overflow-auto flex item that wraps the element carrying the per-resource zoom
      // (`resource-cell-view.component.tsx`), and the flex parent fixes the marker's OUTER box, so
      // zooming the content scrolls it inside that box rather than growing the box itself.
      const resourceFactorBefore =
        (await readZoomByResourceId(mainPage, webViewId))[resourceId] ?? 1;

      await firstCell.click({ button: 'right' });
      await stg.frame.getByRole('menuitem', { name: /^Zoom In$/i }).click();
      await expect
        .poll(async () => (await readZoomByResourceId(mainPage, webViewId))[resourceId])
        .toBeCloseTo(resourceFactorBefore + 0.1, 5);
      const newResourceFactor = (await readZoomByResourceId(mainPage, webViewId))[resourceId];

      // `toHaveAttribute` with a regex tests for a substring match, so the interpolated factor is
      // bounded at both ends: its regex metacharacters are escaped (an unescaped `.` matches any
      // character), and `(?![\d.])` rejects both a longer decimal and a whole-number factor
      // matching the head of a longer one — `String(1)` is `"1"`, which `(?!\d)` alone would let
      // match `zoom: 1.1`.
      const escapedFactor = String(newResourceFactor).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      await expect(firstCell.locator('[style*="zoom"]')).toHaveAttribute(
        'style',
        new RegExp(`zoom:\\s*${escapedFactor}(?![\\d.])`),
      );
      expect(await readFactor(frame, 'text-collection')).toBe(settingsDefault);
    });
  });

  test('the pane zoom grows the verse text while the reorder grip and zoom kebab keep their size', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage);
    const webViewId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
    const frame = await getEditorFrame(mainPage, webViewId);

    // Chapter view: its cells carry the header band with the grip and the kebab.
    await stg.switchToChapterView();
    await expect(stg.cellDraggable.first()).toBeVisible({ timeout: 15_000 });
    const firstCell = stg.cellDraggable.first();
    const grip = firstCell.locator('[data-reorder-handle-id]');
    const kebab = firstCell.locator('button[aria-haspopup="menu"]').first();
    const text = firstCell
      .locator('[data-platform-content-zoom-root="text-collection"] > div')
      .first();

    const settingsDefault = await readSettingsDefaultZoom(mainPage);
    await firstCell.focus();
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);

    const gripBefore = await grip.boundingBox();
    const kebabBefore = await kebab.boundingBox();
    // One line box, not the text block: wrapped text grows by ~z² under CSS `zoom` z, a line by z.
    const textLineBefore = await firstLineBoxHeight(text);
    if (!gripBefore || !kebabBefore) throw new Error('Grip or kebab missing');

    // Five steps up from the default: each Ctrl+= is one 10 % step.
    /* eslint-disable no-await-in-loop */
    for (let step = 1; step <= 5; step += 1) {
      await mainPage.keyboard.press('Control+=');
      await expect
        .poll(() => readFactor(frame, 'text-collection'))
        .toBeCloseTo(settingsDefault + step / 10, 5);
    }
    /* eslint-enable no-await-in-loop */

    const gripAfter = await grip.boundingBox();
    const kebabAfter = await kebab.boundingBox();
    const textLineAfter = await firstLineBoxHeight(text);
    if (!gripAfter || !kebabAfter) throw new Error('Grip or kebab lost');
    expect(textLineAfter / textLineBefore).toBeCloseTo(
      (settingsDefault + 0.5) / settingsDefault,
      1,
    );
    expect(Math.abs(gripAfter.height - gripBefore.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(kebabAfter.height - kebabBefore.height)).toBeLessThanOrEqual(1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);
  });
});
