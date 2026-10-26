/**
 * Simple mode never docks or undocks anything by dragging, end to end with rc-dock's real drag
 * manager. A floating panel can still be moved by its tab bar.
 *
 * A drop target is picked by rc-dock hit-testing the element under the pointer, and one of the
 * guards is a stylesheet rule that only takes effect there, so only a real drag in a real window
 * can show it. Each "nothing was offered" check first proves the drag started
 * (`body.dock-dragging`) and, over a column, reached it (`dock-panel-dropping`), so it cannot pass
 * because the gesture did nothing. The Power-mode tests are the controls: there, the same gestures
 * are offered a drop.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated docking`
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  DROP_INDICATOR,
  DROP_OFFERS,
  type Point,
  emptyBarPoint,
  floatPanelIds,
  openFloat,
  panelLocator,
  panelSelector,
  readBars,
  startDragAt,
  tabCountOf,
  tabPaddingPoint,
  visibleCenterOf,
} from '../../../fixtures/dock-tab-helpers';
import {
  SIMPLE_PANEL_ID_PROJECT,
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_RESOURCES,
  readSimpleColumns,
  waitForSimpleColumns,
} from '../../../fixtures/simple-mode-columns.page';

/**
 * Wide enough for the three columns' minimum widths under Windows display scaling, and for the
 * Resources column's tab bar to keep empty space past its tabs.
 */
const WINDOW_SIZE = { width: 1920, height: 1080 };

/**
 * Launch options both modes share, so the Power-mode control runs under the same conditions as the
 * Simple-mode tests it controls for. firstRunComplete because the wizard is a modal that aria-hides
 * the app; DEV_NOISY=false gives Power mode its single-Home-tab layout.
 */
const SHARED_TEST_OPTIONS = {
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  windowSize: WINDOW_SIZE,
};

test.use(SHARED_TEST_OPTIONS);
test.setTimeout(300_000);

test.beforeEach(async ({ mainPage: page }) => {
  await waitForAppReady(page, { timeout: 180_000 });
});

/**
 * During a drag, move the pointer over the column `columnId`, wait until the column registers the
 * drag, and check that no drop is offered there.
 */
async function expectNoDropOfferOver(page: Page, columnId: string): Promise<void> {
  const target = await visibleCenterOf(page, columnId);
  await page.mouse.move(target.x, target.y, { steps: 10 });
  // Set in the same render that would draw the column's drop squares
  await expect(panelLocator(page, columnId), `${columnId} sees the drag`).toContainClass(
    'dock-panel-dropping',
    { timeout: 5_000 },
  );
  await expect(page.locator(DROP_OFFERS), `drop offered over ${columnId}`).toHaveCount(0);
  await expect(page.locator(DROP_INDICATOR), `drop indicator over ${columnId}`).toBeHidden();
}

/**
 * Open Settings and About as floats, move About off the Settings tab (both open centered), and
 * answer the point at the center of the Settings tab, checked to be uncovered. The move ends with
 * Escape, so in Power mode it cannot dock About wherever it lands.
 */
async function openTwoFloatsWithSettingsTabExposed(
  page: Page,
): Promise<{ settingsId: string; aboutId: string; onSettingsTab: Point }> {
  const settingsId = await openFloat(page, 'platform.openSettings');
  const aboutId = await openFloat(page, 'platform.about');

  // Into the bottom-right corner, wholly on screen: focus lands in About when the drag ends, and a
  // focused float hanging past the window's edge scrolls the whole page to bring it into view. By
  // the tab, not the empty bar: a float's only tab hands its drag to the whole float, so the tests
  // that drag About this way cover that path too.
  const aboutBox = await panelLocator(page, aboutId).boundingBox();
  if (!aboutBox) throw new Error('the About panel has no box');
  const viewport = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  const grab = await tabPaddingPoint(page, aboutId);
  await startDragAt(page, grab);
  await page.mouse.move(
    grab.x + (viewport.width - 20 - aboutBox.width - aboutBox.x),
    grab.y + (viewport.height - 20 - aboutBox.height - aboutBox.y),
    { steps: 10 },
  );
  await page.keyboard.press('Escape');
  await page.mouse.up();

  const settingsTab = await panelLocator(page, settingsId)
    .locator('.dock-bar .dock-tab')
    .first()
    .boundingBox();
  if (!settingsTab) throw new Error('the Settings tab has no box');
  const onSettingsTab = {
    x: settingsTab.x + settingsTab.width / 2,
    y: settingsTab.y + settingsTab.height / 2,
  };
  const hitsSettingsTab = await page.evaluate(
    ([selector, point]) =>
      !!document.elementFromPoint(point.x, point.y)?.closest(`${selector} .dock-tab`),
    [panelSelector(settingsId), onSettingsTab] as const,
  );
  expect(hitsSettingsTab, 'the Settings tab is uncovered').toBe(true);
  return { settingsId, aboutId, onSettingsTab };
}

test.describe('Simple mode: dragging never changes what is docked', () => {
  test.use({ interfaceMode: 'simple' });

  test('a float dragged by its tab bar moves, but no column offers to dock it', async ({
    mainPage: page,
  }) => {
    const columnsBefore = await waitForSimpleColumns(page);
    const settingsId = await openFloat(page, 'platform.openSettings');
    const settingsTabCount = await tabCountOf(page, settingsId);
    const boxBefore = await panelLocator(page, settingsId).boundingBox();

    await startDragAt(page, await emptyBarPoint(page, settingsId));
    try {
      await expect(panelLocator(page, settingsId)).toContainClass('dragging');
      await expectNoDropOfferOver(page, SIMPLE_PANEL_ID_MODEL_TEXT);
      await expectNoDropOfferOver(page, SIMPLE_PANEL_ID_RESOURCES);
      // Last, so the release lands over the editor
      await expectNoDropOfferOver(page, SIMPLE_PANEL_ID_PROJECT);
    } finally {
      await page.mouse.up();
    }

    await expect(page.locator('body')).not.toContainClass('dock-dragging');
    expect(await floatPanelIds(page)).toEqual([settingsId]);
    expect(await tabCountOf(page, settingsId)).toBe(settingsTabCount);
    expect(await readSimpleColumns(page)).toEqual(columnsBefore);
    const boxAfter = await panelLocator(page, settingsId).boundingBox();
    expect(boxAfter, 'the float moved with the drag').not.toEqual(boxBefore);
  });

  test("a float dragged onto another float's tab is not merged into it", async ({
    mainPage: page,
  }) => {
    await waitForSimpleColumns(page);
    const { settingsId, aboutId, onSettingsTab } = await openTwoFloatsWithSettingsTabExposed(page);

    await startDragAt(page, await tabPaddingPoint(page, aboutId));
    try {
      await expect(panelLocator(page, aboutId)).toContainClass('dragging');
      await page.mouse.move(onSettingsTab.x, onSettingsTab.y, { steps: 10 });
      // Nothing changes on screen when the drop is refused, so there is no state to wait on. Give
      // rc-dock time to show its drop indicator if it would; the Power-mode control shows it does.
      await page.waitForTimeout(500);
      await expect(page.locator(DROP_INDICATOR)).toBeHidden();
      await expect(page.locator(DROP_OFFERS)).toHaveCount(0);
    } finally {
      await page.mouse.up();
    }

    expect((await floatPanelIds(page)).sort()).toEqual([settingsId, aboutId].sort());
    expect(await tabCountOf(page, settingsId)).toBe(1);
    expect(await tabCountOf(page, aboutId)).toBe(1);
  });

  test('the Resources column dragged by its tab bar is neither docked elsewhere nor floated', async ({
    mainPage: page,
  }) => {
    const columnsBefore = await waitForSimpleColumns(page);
    const resources = panelLocator(page, SIMPLE_PANEL_ID_RESOURCES);

    await startDragAt(page, await emptyBarPoint(page, SIMPLE_PANEL_ID_RESOURCES));
    try {
      await expect(resources).toContainClass('dragging');
      // rc-dock fades a dragged panel; a drag that can drop nowhere should not look like one
      await expect(resources).toHaveCSS('opacity', '1');
      await expectNoDropOfferOver(page, SIMPLE_PANEL_ID_PROJECT);
      await expectNoDropOfferOver(page, SIMPLE_PANEL_ID_MODEL_TEXT);
    } finally {
      await page.mouse.up();
    }

    expect(await floatPanelIds(page)).toEqual([]);
    expect(await readSimpleColumns(page)).toEqual(columnsBefore);
  });
});

test.describe('Power mode (control): the same drags are offered a drop', () => {
  test.use({ interfaceMode: 'power' });

  test('a float dragged by its tab bar over a docked panel is offered a drop', async ({
    mainPage: page,
  }) => {
    let dockedPanelId: string | undefined;
    await expect(async () => {
      dockedPanelId = (await readBars(page))[0]?.panelId;
      expect(dockedPanelId).toBeDefined();
    }).toPass({ timeout: 60_000 });
    if (!dockedPanelId) throw new Error('no docked panel');
    const settingsId = await openFloat(page, 'platform.openSettings');

    await startDragAt(page, await emptyBarPoint(page, settingsId));
    try {
      const target = await visibleCenterOf(page, dockedPanelId);
      await page.mouse.move(target.x, target.y, { steps: 10 });
      await expect(page.locator(DROP_OFFERS).first()).toBeAttached({ timeout: 5_000 });
    } finally {
      // Escape first, so the release cancels the drag instead of docking the float
      await page.keyboard.press('Escape');
      await page.mouse.up();
    }
  });

  test("a float dragged onto another float's tab is offered a merge", async ({
    mainPage: page,
  }) => {
    const { aboutId, onSettingsTab } = await openTwoFloatsWithSettingsTabExposed(page);

    await startDragAt(page, await tabPaddingPoint(page, aboutId));
    try {
      await page.mouse.move(onSettingsTab.x, onSettingsTab.y, { steps: 10 });
      await expect(page.locator(DROP_INDICATOR)).toBeVisible({ timeout: 5_000 });
    } finally {
      // Escape first, so the release cancels the drag instead of merging the floats
      await page.keyboard.press('Escape');
      await page.mouse.up();
    }
  });
});
