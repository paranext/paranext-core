/**
 * E2E geometry checks for the Text Collection verse row's wrap-around layout.
 *
 * This is the only layer that exercises the real Lexical DOM and the real cascade. Unit tests
 * assert the component-to-stylesheet contract (jsdom computes no geometry) and Storybook renders a
 * hand-written stand-in, so neither can catch the dependencies this layout actually rests on:
 * `.editor-input` must stay a block container, and the first block must not be its own formatting
 * context, or the generated float stops shortening line 1 alone.
 *
 * Covered:
 *
 * - `.editor-input` is not flex or grid, and its first block computes `display: block` and `overflow:
 *   visible` (asserted directly so an upstream change fails loudly rather than as a subtle
 *   misrender).
 * - The `::before` exclusion is a float with non-zero width.
 * - The row leads with the reorder grip when there is one, otherwise the name, at its inline edge.
 * - Line 1 starts after the reserved name area, level with the name; line 2 starts back at the row's
 *   flush inline edge.
 * - Line 1 starts right after the row's own name, which is as wide as its text (as in PT9), so rows
 *   with different names start line 1 on different columns.
 * - Zooming one row leaves its line 1 starting at the same place on screen — the `--stg-zoom`
 *   compensation. Line-1 starts are NOT expected to agree across different zooms for every marker:
 *   the hanging (negative) `text-indent`s of poetry and lists live inside the zoomed subtree and
 *   are deliberately not compensated, because compensating them would fight the indents the float
 *   approach exists to preserve.
 *
 * Honest runnability: requires a running Platform.Bible instance and two downloaded resources named
 * in `E2E_TEST_RESOURCE_IDS`, at a reference where both have text. Skipped in CI (no real resource
 * fixtures); run locally after opening the app with --remote-debugging-port=9223.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady, waitForOpenWebViewIdByType } from '../../fixtures/helpers';
import { CONTENT_ZOOM_COMMANDS, sendCommandWithId } from '../../fixtures/scripture-editor-helpers';
import { closeAllNonHomeDockTabs } from './test-helpers';
import {
  discoverAdminTextConnectionProject,
  flagResourcesAndOpenScriptureTextGrid,
  openCellContextMenu,
  openScriptureTextGrid,
  readResourceZoomArea,
  restoreScriptureTextGridProjectSettings,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
} from './scripture-text-grid.page';
import type { FlaggedResourceItem } from './scripture-text-grid.page';

/**
 * Real downloaded resource ids, from `E2E_TEST_RESOURCE_IDS=id1,id2`. The geometry checks measure
 * the rendered verse text, which only an installed resource has; an unknown id renders as a "not
 * installed" placeholder with no `.editor-input`.
 */
const REAL_RESOURCE_IDS = (process.env.E2E_TEST_RESOURCE_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

const NEEDS_REAL_RESOURCES =
  'Set E2E_TEST_RESOURCE_IDS to two downloaded resource ids; the checks measure rendered verse text';

function twoResources(): FlaggedResourceItem[] {
  return REAL_RESOURCE_IDS.slice(0, 2).map((id, index) => ({
    type: 'project',
    name: `Verse row ${index + 1}`,
    id,
    isInTextCollection: true,
  }));
}

/**
 * Geometry for one verse row, measured inside the page against the real cascade. Inline positions
 * are distances in from the row's inline-start edge, so LTR and RTL rows read the same way.
 */
type RowGeometry = {
  leadStart: number;
  nameTop: number;
  nameEnd: number;
  /** One entry per rendered line of the first paragraph. */
  lineTops: number[];
  editorDisplay: string;
  firstBlockDisplay: string;
  firstBlockOverflow: string;
  floatSide: string;
  floatWidth: number;
  /** One entry per rendered line of the first paragraph. */
  lineStarts: number[];
};

/** Zoom areas a test zoomed, so `afterEach` can return them to the default whatever happened. */
let zoomedAreas: { webViewId: string; areaIds: string[] } | undefined;

test.describe('Text Collection verse row', () => {
  // Returns every zoomed area to the default so a run does not ratchet the shared zoom memory for
  // the next one. Best-effort — cleanup must not fail the test.
  test.afterEach(async ({ mainPage }) => {
    const zoomed = zoomedAreas;
    zoomedAreas = undefined;
    if (zoomed) {
      await Promise.all(
        zoomed.areaIds.map((areaId) =>
          sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, zoomed.webViewId, areaId).catch(
            () => {},
          ),
        ),
      );
    }
    await restoreScriptureTextGridProjectSettings(mainPage);
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('flows verse text after the name on line 1 and beneath it on line 2', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    test.skip(REAL_RESOURCE_IDS.length < 2, NEEDS_REAL_RESOURCES);
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage, projectId);

    const rows = stg.frame.locator('[role="listitem"]');
    // A row is visible while its cell is still a placeholder, which has no editor to measure.
    await expect(rows.nth(0).locator('.editor-input')).toBeVisible({ timeout: 15_000 });
    await expect(rows.nth(1).locator('.editor-input')).toBeVisible({ timeout: 15_000 });

    const geometries: RowGeometry[] = await stg.frame.locator('body').evaluate(() => {
      const measure = (row: Element): RowGeometry | undefined => {
        const name = row.querySelector('.stg-verse-name');
        const editorInput = row.querySelector('.editor-input');
        const paragraph = editorInput?.querySelector('p');
        if (!name || !editorInput || !paragraph) return undefined;

        const before = getComputedStyle(editorInput, '::before');
        const firstBlock = editorInput.firstElementChild ?? paragraph;

        const rowRect = row.getBoundingClientRect();
        const isRtl =
          getComputedStyle(row.querySelector('.stg-verse-row') ?? row).direction === 'rtl';
        // Distance in from the row's inline-start edge to a box's start or end side.
        const startOf = (rect: DOMRect) =>
          isRtl ? rowRect.right - rect.right : rect.left - rowRect.left;
        const endOf = (rect: DOMRect) =>
          isRtl ? rowRect.right - rect.left : rect.right - rowRect.left;

        // A range yields one rect per inline fragment (the verse number, each text span's piece of
        // each line), not one per line, so group them into lines by vertical overlap first.
        const range = document.createRange();
        range.selectNodeContents(paragraph);
        const lines: { top: number; bottom: number; start: number }[] = [];
        Array.from(range.getClientRects())
          .filter((rect) => rect.width > 0)
          .sort((a, b) => a.top - b.top)
          .forEach((rect) => {
            const middle = (rect.top + rect.bottom) / 2;
            const line = lines.find(({ top, bottom }) => middle >= top && middle <= bottom);
            if (line) {
              line.top = Math.min(line.top, rect.top);
              line.bottom = Math.max(line.bottom, rect.bottom);
              line.start = Math.min(line.start, startOf(rect));
            } else lines.push({ top: rect.top, bottom: rect.bottom, start: startOf(rect) });
          });
        // The grip leads the row when reorder is on; otherwise the name does.
        const lead = row.querySelector('.stg-verse-grip') ?? name;
        const nameRect = name.getBoundingClientRect();

        return {
          leadStart: Math.round(startOf(lead.getBoundingClientRect())),
          nameTop: Math.round(nameRect.top),
          nameEnd: Math.round(endOf(nameRect)),
          lineTops: lines.map((line) => Math.round(line.top)),
          editorDisplay: getComputedStyle(editorInput).display,
          firstBlockDisplay: getComputedStyle(firstBlock).display,
          firstBlockOverflow: getComputedStyle(firstBlock).overflow,
          floatSide: before.float,
          floatWidth: Math.round(parseFloat(before.width) || 0),
          lineStarts: lines.map((line) => Math.round(line.start)),
        };
      };
      return Array.from(document.querySelectorAll('[role="listitem"]'))
        .map(measure)
        .filter((geometry): geometry is RowGeometry => geometry !== undefined);
    });

    expect(geometries.length).toBeGreaterThan(0);

    geometries.forEach((geometry) => {
      // What the float depends on. In a flex or grid `.editor-input` the float stops floating; a
      // first block that is its own formatting context sits beside the float as a whole, so its
      // line 2+ would stay indented. `overflow` on `.editor-input` or `.editor-inner` is harmless:
      // the float and the blocks are siblings inside it.
      expect(geometry.editorDisplay).not.toMatch(/flex|grid/);
      expect(geometry.firstBlockDisplay).toBe('block');
      expect(geometry.firstBlockOverflow).toBe('visible');

      // The exclusion exists and reserves real width.
      expect(geometry.floatSide).not.toBe('none');
      expect(geometry.floatWidth).toBeGreaterThan(0);

      // The row's leading element hangs at its own inline edge — no reintroduced left margin.
      expect(Math.abs(geometry.leadStart)).toBeLessThanOrEqual(12);

      // Line 1 sits beside the name rather than below it, so the text flows after the name. The
      // tolerance covers the name's smaller font and a superscript verse number leading the line.
      expect(Math.abs(geometry.lineTops[0] - geometry.nameTop)).toBeLessThanOrEqual(6);

      // Line 1 clears the reserved area; line 2 returns to the flush edge. Only meaningful for a
      // verse long enough to wrap, so skip single-line rows rather than asserting vacuously.
      if (geometry.lineStarts.length > 1) {
        expect(geometry.lineStarts[0]).toBeGreaterThan(geometry.floatWidth - 1);
        expect(geometry.lineStarts[1]).toBeLessThan(geometry.lineStarts[0]);
      }
    });

    // Line 1 starts right after the row's own name — the gap after it, not a column shared with
    // other rows. The reserved width is measured from the name, so a stale or missing measurement
    // shows up here as line 1 starting under the name or well past it.
    geometries.forEach((geometry) => {
      const gapAfterName = geometry.lineStarts[0] - geometry.nameEnd;
      expect(gapAfterName).toBeGreaterThanOrEqual(0);
      expect(gapAfterName).toBeLessThanOrEqual(16);
    });
  });

  test('keeps the reserved width constant when one row is zoomed', async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    test.skip(REAL_RESOURCE_IDS.length < 2, NEEDS_REAL_RESOURCES);
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage, projectId);

    const rows = stg.frame.locator('[role="listitem"]');
    // A row is visible while its cell is still a placeholder, which has no editor to measure.
    await expect(rows.nth(0).locator('.editor-input')).toBeVisible({ timeout: 15_000 });
    await expect(rows.nth(1).locator('.editor-input')).toBeVisible({ timeout: 15_000 });

    /**
     * Where each row's line 1 starts on screen, measured in from the row's inline-start edge. This
     * is the rendered result of the exclusion, so it is unaffected by how Chromium reports lengths
     * inside a zoomed subtree.
     */
    const lineOneStarts = async () =>
      stg.frame.locator('body').evaluate(() =>
        Array.from(document.querySelectorAll('[role="listitem"] .stg-verse-row')).map((row) => {
          const paragraph = row.querySelector('.editor-input p');
          if (!paragraph) return Number.NaN;
          const range = document.createRange();
          range.selectNodeContents(paragraph);
          const rects = Array.from(range.getClientRects()).filter((rect) => rect.width > 0);
          if (rects.length === 0) return Number.NaN;
          const lineOneTop = Math.min(...rects.map((rect) => rect.top));
          const lineOne = rects.filter((rect) => rect.top - lineOneTop < 2);
          const rowRect = row.getBoundingClientRect();
          return getComputedStyle(row).direction === 'rtl'
            ? Math.round(rowRect.right - Math.max(...lineOne.map((rect) => rect.right)))
            : Math.round(Math.min(...lineOne.map((rect) => rect.left)) - rowRect.left);
        }),
      );

    // Start every row at the default level, so a level an earlier run left behind can neither make
    // the poll below pass before the click lands nor leave Zoom In disabled at the maximum.
    const webViewId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
    const areaIds = await Promise.all([
      readResourceZoomArea(rows.nth(0)),
      readResourceZoomArea(rows.nth(1)),
    ]);
    zoomedAreas = { webViewId, areaIds };
    await Promise.all(
      areaIds.map((areaId) =>
        sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, webViewId, areaId),
      ),
    );
    const readRowZoom = () =>
      rows
        .first()
        .locator('.stg-verse-row')
        .evaluate((row) => getComputedStyle(row).getPropertyValue('--stg-zoom').trim());
    const defaultZoom = await readRowZoom();

    const before = await lineOneStarts();
    expect(before.length).toBeGreaterThan(1);
    expect(before[0]).toBeGreaterThan(0);
    before.forEach((start) => expect(Number.isFinite(start)).toBe(true));

    // Verse rows have no zoom kebab (that lives in the chapter header band), so drive zoom through
    // the right-click menu, which the cell wrapper exposes in both view modes.
    // The item's accessible name ends with its shortcut keycaps, so match the start only.
    const menu = await openCellContextMenu(stg.frame, rows.first());
    await menu.getByRole('menuitem', { name: /^Zoom in/i }).click();
    await expect.poll(readRowZoom).not.toBe(defaultZoom);

    const after = await lineOneStarts();
    // The exclusion divides by `--stg-zoom`, so line 1 must start in the same place on screen
    // when the row zooms: that keeps the reserved space matching the unzoomed name beside it.
    // Without the compensation the zoomed row's line 1 would move out by the zoom factor.
    expect(Math.abs(after[0] - before[0])).toBeLessThanOrEqual(1);
    // The untouched row is unaffected either way.
    expect(Math.abs(after[1] - before[1])).toBeLessThanOrEqual(1);
  });
});
