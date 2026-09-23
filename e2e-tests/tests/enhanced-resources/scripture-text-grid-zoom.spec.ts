/**
 * E2E checks that the Scripture Text Grid's text is sized by the platform's content zoom alone: the
 * grid has no zoom of its own per resource column.
 *
 * Covered:
 *
 * - The cell's right-click menu offers Copy and no zoom items, and no cell carries an inline `zoom`
 *   of its own.
 * - Ctrl+wheel over a resource cell reaches the platform's content zoom and changes the pane's
 *   `text-collection` level, leaving every cell without an inline `zoom`.
 * - The pane zoom grows the verse text while the reorder grip keeps its size.
 *
 * Not covered here: that a per-resource level saved in the grid's web-view state by an earlier
 * version is ignored. Nothing in the grid reads that state, which the source contract test
 * `resource-panels-content-zoom.contract.test.ts` pins.
 *
 * Runnability: these tests require a running Platform.Bible instance with 2+ resources flagged and
 * visible in the Scripture Text Grid. They are skipped in CI (no real resource fixtures) and must
 * be run locally after opening the app with --remote-debugging-port=9223 and configuring at least
 * two resources via View Options.
 *
 * In a real Chromium (unlike jsdom) an inline `zoom` is serialized into the `style` attribute, so
 * `locator('[style*="zoom"]')` finds any element carrying one.
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
 * downloadable projects for the cells to render. Using synthetic IDs avoids real Paratext project
 * fixtures and keeps the test self-contained. A cell whose resource is not installed opens no
 * right-click menu, so the menu test needs real downloaded resources.
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

test.describe('Scripture Text Grid — content zoom', () => {
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

  test('the right-click menu offers Copy and no zoom items, and no cell zooms itself', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    test.skip(
      REAL_RESOURCE_IDS.length < 2,
      'Needs two installed resources (E2E_TEST_RESOURCE_IDS): a cell whose resource is not installed opens no right-click menu',
    );
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage);

    // `stg.cellDraggable` (`data-testid="scripture-text-grid-cell-draggable"`), not
    // `[role="gridcell"]`: nothing in the grid carries that role. A resource entry is a
    // `role="listitem"` inside the column's `role="list"`, and `ResourceCellView` inside it is
    // purely presentational.
    await expect(stg.cellDraggable.first()).toBeVisible({ timeout: 15_000 });
    await expect(stg.cellDraggable).toHaveCount(2, { timeout: 15_000 });
    const firstCell = stg.cellDraggable.first();

    await firstCell.click({ button: 'right' });
    const menu = stg.frame.getByRole('menu');
    await expect(menu.getByRole('menuitem', { name: /^Copy$/i })).toBeVisible();
    await expect(menu.getByRole('menuitem')).toHaveCount(1);
    await expect(menu.getByRole('menuitem', { name: /zoom/i })).toHaveCount(0);
    await mainPage.keyboard.press('Escape');

    await expect(stg.cellDraggable.locator('[style*="zoom"]')).toHaveCount(0);
  });

  test('Ctrl+wheel over a resource cell zooms the pane’s text-collection area', async ({
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

    await expect(stg.cellDraggable.first()).toBeVisible({ timeout: 15_000 });
    await expect(stg.cellDraggable).toHaveCount(2, { timeout: 15_000 });
    const firstCell = stg.cellDraggable.first();

    // Establish a known pane baseline rather than reading whatever level a prior run against this
    // already-running app left behind: the step below asserts an EXACT resulting value. Ending back
    // at this same value keeps this run from ratcheting the shared
    // `platform.webViewContentZoomMemory` setting upward for the next one.
    const settingsDefault = await readSettingsDefaultZoom(mainPage);
    await firstCell.focus();
    // The focused cell wrapper sits outside every text marker (each cell marks only its verse
    // text), so the chord resolves to the view's only area by the bootstrap's fallback.
    await expect.poll(() => readFocusedAreaId(frame)).toBeUndefined();
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);

    await test.step('one wheel notch over the cell steps the pane level once', async () => {
      const cellBox = await firstCell.boundingBox();
      if (!cellBox) throw new Error('Resource cell has no bounding box');
      await ctrlWheel(mainPage, cellBox, -120);
      await expect
        .poll(() => readFactor(frame, 'text-collection'))
        .toBeCloseTo(settingsDefault + 0.1, 5);
      await expect(stg.cellDraggable.locator('[style*="zoom"]')).toHaveCount(0);
    });

    await test.step('a pane reset (Ctrl+0) returns it to the Settings default', async () => {
      await firstCell.focus();
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);
    });
  });

  test('the pane zoom grows the verse text while the reorder grip keeps its size', async ({
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

    // Chapter view: its cells carry the header band with the grip.
    await stg.switchToChapterView();
    await expect(stg.cellDraggable.first()).toBeVisible({ timeout: 15_000 });
    const firstCell = stg.cellDraggable.first();
    const grip = firstCell.locator('[data-reorder-handle-id]');
    const text = firstCell
      .locator('[data-platform-content-zoom-root="text-collection"] > div')
      .first();

    const settingsDefault = await readSettingsDefaultZoom(mainPage);
    await firstCell.focus();
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);

    const gripBefore = await grip.boundingBox();
    // One line box, not the text block: wrapped text grows by ~z² under CSS `zoom` z, a line by z.
    const textLineBefore = await firstLineBoxHeight(text);
    if (!gripBefore) throw new Error('Grip missing');

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
    const textLineAfter = await firstLineBoxHeight(text);
    if (!gripAfter) throw new Error('Grip lost');
    expect(textLineAfter / textLineBefore).toBeCloseTo(
      (settingsDefault + 0.5) / settingsDefault,
      1,
    );
    expect(Math.abs(gripAfter.height - gripBefore.height)).toBeLessThanOrEqual(1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, 'text-collection')).toBe(settingsDefault);
  });
});
