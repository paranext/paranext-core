/**
 * E2E for content zoom in Find, the inventories and Checks: each view zooms only its project text.
 * The results, items and occurrence snippets grow with the pane, while search inputs, filters,
 * reference buttons, column headers and selectors keep their size. Each view is declared zoomable
 * in core, so its tab menu offers the zoom items before it has any text to show (Find before a
 * search, Checks before a run), and the level is remembered per project under the view's kind.
 *
 * Runs against an isolated project root with the bundled sample WEB project: `npm run
 * test:e2e:isolated tests/isolated/content-zoom-tools/`.
 */
import type { Frame, Locator, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  closeDockTab,
  firstLineBoxHeight,
  readContentZoomMemory,
  zoomAreaTo,
} from '../../../fixtures/content-zoom-helpers';
import {
  getEditorFrame,
  openScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  sendPapiCommandWhenRegistered,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const TARGET_ZOOM = 2;
/** Memory keys fold project ids to upper case (`normalizeProjectId`). */
const PROJECT_KEY = SAMPLE_WEB_PROJECT_ID.toUpperCase();
/** Absorbs sub-pixel rounding and a scrollbar appearing once zoomed content overflows. */
const FIXED_TOLERANCE_PX = 2;

async function openToolFor(command: string, triggeringWebViewId: string): Promise<string> {
  const webViewId = await sendPapiCommandWhenRegistered(command, triggeringWebViewId);
  if (typeof webViewId !== 'string') throw new Error(`${command} returned no web view id`);
  return webViewId;
}

async function heightOf(locator: Locator): Promise<number> {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Element has no bounding box');
  return box.height;
}

/** Right-clicks the tab and checks that "Zoom in" is offered and enabled, then closes the menu. */
async function expectZoomItemsOffered(page: Page, webViewId: string): Promise<void> {
  // `data-web-view-id` is on `.platform-tab-title` (platform-tab-title.component.tsx).
  await page
    .locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`)
    .click({ button: 'right' });
  const zoomIn = page.getByRole('menuitem', { name: 'Zoom in' });
  await expect(zoomIn).toBeVisible();
  await expect(zoomIn).toBeEnabled();
  await page.keyboard.press('Escape');
  await expect(zoomIn).toBeHidden();
}

/** Asserts the text grew by about the zoom factor while the control kept its size. */
function expectTextZoomedControlFixed(
  text: { before: number; after: number },
  control: { before: number; after: number },
): void {
  const ratio = text.after / text.before;
  expect(ratio).toBeGreaterThan(TARGET_ZOOM - 0.15);
  expect(ratio).toBeLessThan(TARGET_ZOOM + 0.15);
  expect(Math.abs(control.after - control.before)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
}

async function waitForFactor(frame: Frame, expected: number): Promise<void> {
  await expect.poll(() => readFactor(frame, '')).toBe(expected);
}

test.describe('content zoom in Find, the inventories and Checks', () => {
  test.setTimeout(600_000);

  test('only project text zooms, and each view offers zoom before it has results', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    const editorId = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await test.step('Find: zoom items before a search; after it, only the result text grows', async () => {
      const findId = await openToolFor('platformScripture.openFind', editorId);
      const findFrame = await getEditorFrame(mainPage, findId);
      const searchInput = findFrame.locator('#search-term');
      await expect(searchInput).toBeVisible({ timeout: 60_000 });

      // Declared empty state: there are no results and so no markers yet, but the pane is zoomable.
      await expectZoomItemsOffered(mainPage, findId);

      await searchInput.fill('God');
      await searchInput.press('Enter');
      const snippet = findFrame.locator('span[data-platform-content-zoom-root]').first();
      await expect(snippet).toBeVisible({ timeout: 60_000 });
      // The reference button sits right before the snippet in the same card row.
      const referenceButton = snippet.locator('xpath=preceding-sibling::button[1]');
      await waitForFactor(findFrame, 1);

      const before = {
        snippet: await firstLineBoxHeight(snippet),
        input: await heightOf(searchInput),
        reference: await heightOf(referenceButton),
      };
      await zoomAreaTo(mainPage, findFrame, findId, 'main', TARGET_ZOOM);
      const after = {
        snippet: await firstLineBoxHeight(snippet),
        input: await heightOf(searchInput),
        reference: await heightOf(referenceButton),
      };

      expectTextZoomedControlFixed(
        { before: before.snippet, after: after.snippet },
        { before: before.input, after: after.input },
      );
      expect(Math.abs(after.reference - before.reference)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`find:${PROJECT_KEY}:main`])
        .toBe(TARGET_ZOOM);
    });

    await test.step('Inventory: items and occurrence text grow; filter and headers do not', async () => {
      const inventoryId = await openToolFor('platformScripture.openCharactersInventory', editorId);
      const inventoryFrame = await getEditorFrame(mainPage, inventoryId);
      const item = inventoryFrame.locator('tbody span[data-platform-content-zoom-root]').first();
      await expect(item).toBeVisible({ timeout: 90_000 });
      await expectZoomItemsOffered(mainPage, inventoryId);

      // Selecting a row shows its occurrence table, whose text cell is provider-marked.
      await item.click();
      const occurrence = inventoryFrame.locator('td[data-platform-content-zoom-root]').first();
      await expect(occurrence).toBeVisible({ timeout: 60_000 });
      const filterInput = inventoryFrame.getByRole('textbox').first();
      const headerButton = inventoryFrame.locator('thead button').first();
      await waitForFactor(inventoryFrame, 1);

      const before = {
        item: await firstLineBoxHeight(item),
        occurrence: await firstLineBoxHeight(occurrence),
        filter: await heightOf(filterInput),
        header: await heightOf(headerButton),
      };
      await zoomAreaTo(mainPage, inventoryFrame, inventoryId, 'main', TARGET_ZOOM);
      const after = {
        item: await firstLineBoxHeight(item),
        occurrence: await firstLineBoxHeight(occurrence),
        filter: await heightOf(filterInput),
        header: await heightOf(headerButton),
      };

      expectTextZoomedControlFixed(
        { before: before.item, after: after.item },
        { before: before.filter, after: after.filter },
      );
      expectTextZoomedControlFixed(
        { before: before.occurrence, after: after.occurrence },
        { before: before.header, after: after.header },
      );
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`inventory:${PROJECT_KEY}:main`])
        .toBe(TARGET_ZOOM);

      // The inventory opens as a floating panel over the dock's tab strips, where it would cover
      // the Checks tab title the next step right-clicks.
      await closeDockTab(mainPage, inventoryId);
    });

    await test.step('Checks: before any run the pane is zoomable and its selectors stay fixed', async () => {
      const checksId = await openToolFor('platformScripture.openChecksSidePanel', editorId);
      const checksFrame = await getEditorFrame(mainPage, checksId);
      const selector = checksFrame.getByRole('combobox').first();
      await expect(selector).toBeVisible({ timeout: 60_000 });

      // No check types are selected, so there are no results and no markers: the declaration
      // alone makes the items appear and the commands act on the main area.
      await expectZoomItemsOffered(mainPage, checksId);
      const selectorBefore = await heightOf(selector);
      await zoomAreaTo(mainPage, checksFrame, checksId, 'main', TARGET_ZOOM);
      const selectorAfter = await heightOf(selector);

      expect(Math.abs(selectorAfter - selectorBefore)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`checks:${PROJECT_KEY}:main`])
        .toBe(TARGET_ZOOM);
    });
  });
});
