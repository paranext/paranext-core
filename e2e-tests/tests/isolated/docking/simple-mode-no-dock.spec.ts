/**
 * Simple mode never docks, undocks, merges or reorders anything by dragging, end to end with
 * rc-dock's real drag manager. A floating panel can still be moved by its tab bar; the docked
 * Resources column cannot be dragged at all.
 *
 * Both drag sources and drop targets are picked by hit-testing the element under the pointer, and
 * the guards are stylesheet rules that only take effect there, so only a real drag in a real window
 * can show them. Each "nothing was offered" check first proves the drag started
 * (`body.dock-dragging`) and, over a column, reached it (`dock-panel-dropping`), so it cannot pass
 * because the gesture did nothing. The Power-mode tests are the controls: there, the same gestures
 * start a drag and are offered a drop.
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
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
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
 * The points in `panelId`'s tab bar where a press reaches the bar's own drag element, which drags
 * the whole tab group. Scans the bar every 2px. A press on a tab reaches the tab's own drag element
 * instead, and one on the overflow button opens its menu, so neither counts. Each point comes with
 * the class of the element hit there, to make a failure readable.
 */
async function barPointsThatDragTheGroup(
  page: Page,
  panelId: string,
): Promise<{ point: Point; hit: string }[]> {
  return page.evaluate((selector) => {
    const bar = document.querySelector(`${selector} .dock-bar`);
    if (!bar) throw new Error(`no tab bar in ${selector}`);
    const rect = bar.getBoundingClientRect();
    const found: { point: { x: number; y: number }; hit: string }[] = [];
    for (let y = Math.ceil(rect.top) + 1; y < rect.bottom - 1; y += 2) {
      for (let x = Math.ceil(rect.left) + 1; x < rect.right - 1; x += 2) {
        const hit = document.elementFromPoint(x, y);
        if (
          hit &&
          bar.contains(hit) &&
          !hit.closest('.dock-nav-operations') &&
          !hit.closest('.dock-tab .drag-initiator')
        )
          found.push({ point: { x, y }, hit: hit.className.toString() });
      }
    }
    return found;
  }, panelSelector(panelId));
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

  test('the Resources column cannot be dragged by its tab bar', async ({ mainPage: page }) => {
    const columnsBefore = await waitForSimpleColumns(page);
    const resources = panelLocator(page, SIMPLE_PANEL_ID_RESOURCES);

    // Nowhere in the bar does a press reach the bar's own drag element; the Power-mode control
    // shows the scan finds such points when there are some
    expect(await barPointsThatDragTheGroup(page, SIMPLE_PANEL_ID_RESOURCES)).toEqual([]);

    // And pressing past the last tab, then moving as a drag would, starts no drag
    const bar = await resources.locator('.dock-bar').boundingBox();
    const lastTab = await resources.locator('.dock-bar .dock-tab').last().boundingBox();
    if (!bar || !lastTab) throw new Error('the Resources tab bar has no box');
    const grab = { x: lastTab.x + lastTab.width + 8, y: bar.y + bar.height / 2 };
    expect(grab.x, 'the Resources tab bar has empty space past its tabs').toBeLessThan(
      bar.x + bar.width - 2,
    );
    await page.mouse.move(grab.x, grab.y);
    await page.mouse.down();
    try {
      await page.mouse.move(grab.x - 200, grab.y + 200, { steps: 10 });
      // Nothing changes when no drag starts, so there is no state to wait on. Give rc-dock time to
      // start one if it would; it marks `<body>` within a few pixels of movement.
      await page.waitForTimeout(500);
      await expect(page.locator('body')).not.toContainClass('dock-dragging');
      await expect(resources).not.toContainClass('dragging');
    } finally {
      await page.mouse.up();
    }

    expect(await floatPanelIds(page)).toEqual([]);
    expect(await readSimpleColumns(page)).toEqual(columnsBefore);
  });

  test('a Resources tab dragged by its padding onto a sibling tab is not reordered', async ({
    mainPage: page,
  }) => {
    const columnsBefore = await waitForSimpleColumns(page);
    const resources = panelLocator(page, SIMPLE_PANEL_ID_RESOURCES);
    const sibling = await resources.locator('.dock-bar .dock-tab').nth(1).boundingBox();
    if (!sibling) throw new Error('the Resources column has no second tab');

    await startDragAt(page, await tabPaddingPoint(page, SIMPLE_PANEL_ID_RESOURCES, 0));
    try {
      // A drag of that one tab, not of the whole column. rc-dock marks the parent of the tab's drag
      // element, rc-tabs' `.dock-tab-btn`.
      await expect(resources.locator('.dock-bar .dock-tab-btn').first()).toContainClass('dragging');
      await expect(resources).not.toContainClass('dragging');
      // Past the sibling's midpoint, where rc-dock would drop the tab after it. rc-dock accepts a
      // same-group tab there whatever `tabLocked` says; only the stylesheet stops it.
      await page.mouse.move(sibling.x + sibling.width * 0.75, sibling.y + sibling.height / 2, {
        steps: 10,
      });
      await page.waitForTimeout(500);
      await expect(page.locator(DROP_INDICATOR)).toBeHidden();
      await expect(page.locator(DROP_OFFERS)).toHaveCount(0);
    } finally {
      await page.mouse.up();
    }

    expect(await readSimpleColumns(page)).toEqual(columnsBefore);
  });
});

test.describe('Power mode (control): the same drags are allowed', () => {
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

  test('a docked panel can be dragged by the empty part of its tab bar', async ({
    mainPage: page,
  }) => {
    // The bar is in the layout before its tab has rendered, so wait for points to press on
    let dockedPanelId: string | undefined;
    let points: { point: Point; hit: string }[] = [];
    await expect(async () => {
      dockedPanelId = (await readBars(page))[0]?.panelId;
      if (!dockedPanelId) throw new Error('no docked panel');
      points = await barPointsThatDragTheGroup(page, dockedPanelId);
      expect(points.length, 'points in the tab bar that drag the whole tab group').toBeGreaterThan(
        0,
      );
    }).toPass({ timeout: 60_000 });
    if (!dockedPanelId) throw new Error('no docked panel');

    await startDragAt(page, points[0].point);
    try {
      await expect(panelLocator(page, dockedPanelId)).toContainClass('dragging');
    } finally {
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
