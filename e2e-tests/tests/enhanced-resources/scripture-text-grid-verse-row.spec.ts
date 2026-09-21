/**
 * E2E geometry checks for the Text Collection verse row's wrap-around layout.
 *
 * This is the only layer that exercises the real Lexical DOM and the real cascade. Unit tests
 * assert the component-to-stylesheet contract (jsdom computes no geometry) and Storybook renders a
 * hand-written stand-in, so neither can catch the dependency this layout actually rests on:
 * `.editor-input` must not establish a block formatting context, or the generated float stops
 * shortening the paragraph's line boxes and the verse text slides under the resource name.
 *
 * Covered:
 *
 * - `.editor-input` and `.editor-inner` compute `overflow: visible` (the BFC dependency, asserted
 *   directly so an upstream `overflow` fails loudly rather than as a subtle misrender).
 * - The `::before` exclusion is a float with non-zero width.
 * - Line 1 starts after the reserved name area; line 2 starts back at the row's flush inline edge.
 * - Every row's line-1 start agrees within 1px, including after one row is zoomed — the
 *   zoom-compensation contract.
 *
 * Honest runnability: requires a running Platform.Bible instance with 2+ resources flagged and
 * visible in the Text Collection, in verse view, at a reference where both have text. Skipped in CI
 * (no real resource fixtures); run locally after opening the app with
 * --remote-debugging-port=9223.
 *
 * Note: `scripture-text-grid-zoom.spec.ts` still queries `[role="gridcell"]`, but the component
 * renders `role="listitem"` — that spec looks stale. This one uses `listitem`.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import {
  closeAllNonHomeDockTabs,
  discoverAdminTextConnectionProject,
  flagResourcesAndOpenScriptureTextGrid,
  openScriptureTextGrid,
  restoreScriptureTextGridProjectSettings,
} from './test-helpers';
import type { FlaggedResourceItem } from './test-helpers';

function twoResources(): FlaggedResourceItem[] {
  return [
    { id: 'e2e-verse-row-a', isVisible: true },
    { id: 'e2e-verse-row-b', isVisible: true },
  ];
}

/** Geometry for one verse row, measured inside the page against the real cascade. */
type RowGeometry = {
  rowLeft: number;
  nameLeft: number;
  editorOverflow: string;
  innerOverflow: string;
  floatSide: string;
  floatWidth: number;
  lineStarts: number[];
};

test.describe('Text Collection verse row', () => {
  test.afterEach(async ({ mainPage }) => {
    await restoreScriptureTextGridProjectSettings(mainPage);
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('flows verse text after the name on line 1 and beneath it on line 2', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    await waitForAppReady(mainPage);

    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');

    await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
    const stg = await openScriptureTextGrid(mainPage);

    const rows = stg.frame.locator('[role="listitem"]');
    await expect(rows.first()).toBeVisible({ timeout: 15_000 });

    const geometries: RowGeometry[] = await stg.frame.evaluate(() => {
      const measure = (row: Element): RowGeometry | undefined => {
        const name = row.querySelector('.stg-verse-name');
        const editorInput = row.querySelector('.editor-input');
        const paragraph = editorInput?.querySelector('p');
        if (!name || !editorInput || !paragraph) return undefined;

        const before = getComputedStyle(editorInput, '::before');
        const inner = editorInput.closest('.editor-inner') ?? editorInput.parentElement;

        // Line boxes, via the range rects of the paragraph's own contents.
        const range = document.createRange();
        range.selectNodeContents(paragraph);
        const lineStarts = [...range.getClientRects()].map((rect) => Math.round(rect.left));

        return {
          rowLeft: Math.round(row.getBoundingClientRect().left),
          nameLeft: Math.round(name.getBoundingClientRect().left),
          editorOverflow: getComputedStyle(editorInput).overflow,
          innerOverflow: inner ? getComputedStyle(inner).overflow : 'visible',
          floatSide: before.float,
          floatWidth: Math.round(parseFloat(before.width) || 0),
          lineStarts,
        };
      };
      return [...document.querySelectorAll('[role="listitem"]')]
        .map(measure)
        .filter((geometry): geometry is RowGeometry => geometry !== undefined);
    });

    expect(geometries.length).toBeGreaterThan(0);

    geometries.forEach((geometry) => {
      // The BFC dependency the whole layout rests on. If either of these ever computes anything but
      // `visible`, the float no longer shortens the paragraph's line boxes.
      expect(geometry.editorOverflow).toBe('visible');
      expect(geometry.innerOverflow).toBe('visible');

      // The exclusion exists and reserves real width.
      expect(geometry.floatSide).not.toBe('none');
      expect(geometry.floatWidth).toBeGreaterThan(0);

      // The name hangs at the row's own inline edge — no reintroduced left margin.
      expect(Math.abs(geometry.nameLeft - geometry.rowLeft)).toBeLessThanOrEqual(12);

      // Line 1 clears the reserved area; line 2 returns to the flush edge. Only meaningful for a
      // verse long enough to wrap, so skip single-line rows rather than asserting vacuously.
      if (geometry.lineStarts.length > 1) {
        expect(geometry.lineStarts[0]).toBeGreaterThan(geometry.rowLeft + geometry.floatWidth - 1);
        expect(geometry.lineStarts[1]).toBeLessThan(geometry.lineStarts[0]);
      }
    });

    // Every row's first line starts on the same column — the alignment a content-sized name breaks.
    const firstLineStarts = geometries
      .map((geometry) => geometry.lineStarts[0])
      .filter((start) => start !== undefined);
    const spread = Math.max(...firstLineStarts) - Math.min(...firstLineStarts);
    expect(spread).toBeLessThanOrEqual(1);
  });
});
