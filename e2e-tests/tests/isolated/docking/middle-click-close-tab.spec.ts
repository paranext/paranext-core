/**
 * Closing a tab with a middle click on its header, end to end in a real Electron window.
 *
 * The renderer installs two document listeners
 * (`platform-dock-layout-middle-click-handlers.util.ts`): a capture-phase `mousedown` listener that
 * cancels a middle press on a tab bar so rc-dock arms no drag, and an `auxclick` listener that
 * closes the clicked closable tab, ignoring one repeat click that lands on the same spot shortly
 * after a close. Whether the browser still fires `auxclick` after the press was cancelled, whether
 * rc-dock really starts no drag, and whether the neighbour that slides under a stationary pointer
 * survives a quick second click are real-browser behaviour that jsdom cannot show.
 *
 * Three tests, each launching its own Electron instance:
 *
 * 1. A middle click on a closable tab's header closes that tab.
 * 2. A middle press dragged off a tab header starts no drag and changes nothing, while a left-button
 *    drag along the same path does start one.
 * 3. A repeat middle click on the same spot right after a close is ignored once; the click after it,
 *    and a click well after a close, close the tab under the pointer.
 *
 * Everything is asserted on web view ids read from the tab titles, never on tab counts alone.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated docking`
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

/** The global overlay rc-dock positions over whatever drop target the pointer is on. */
const DROP_INDICATOR = '.dock-layout > .dock-drop-indicator';

/** Appended to `<body>` by rc-dock's drag manager for the duration of a tab drag. */
const DRAGGING_LAYER = 'body > .dragging-layer';

/** How long the app ignores a repeat middle click after a close (`REPEAT_CLOSE_GUARD_MS`). */
const REPEAT_CLOSE_GUARD_MS = 500;

type TabBar = { panelId: string; tabIds: string[] };

type Point = { x: number; y: number };

// #region probes

/** Each dock panel's id and the web view ids of its tabs, in DOM order. */
async function readBars(page: Page): Promise<TabBar[]> {
  return page.locator('.dock-panel[data-dockid]').evaluateAll((panels) =>
    panels.map((panel) => ({
      panelId: panel.getAttribute('data-dockid') ?? '',
      tabIds: Array.from(
        panel.querySelectorAll('.dock-nav-list .platform-tab-title[data-web-view-id]'),
      ).map((title) => title.getAttribute('data-web-view-id') ?? ''),
    })),
  );
}

async function tabIdsOf(page: Page, panelId: string): Promise<string[]> {
  return (await readBars(page)).find((bar) => bar.panelId === panelId)?.tabIds ?? [];
}

function panelLocator(page: Page, panelId: string) {
  return page.locator(`.dock-panel[data-dockid="${panelId}"]`);
}

function tabButton(page: Page, webViewId: string) {
  return page.locator('.dock-tab-btn', {
    has: page.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`),
  });
}

async function centerOf(page: Page, webViewId: string): Promise<Point> {
  const box = await tabButton(page, webViewId).boundingBox();
  if (!box) throw new Error(`tab ${webViewId} has no box`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/** The web view id of the tab header under a viewport point, or `undefined` if there is none. */
async function tabIdAt(page: Page, { x, y }: Point): Promise<string | undefined> {
  const id = await page.evaluate(
    ([pointX, pointY]) =>
      document
        .elementFromPoint(pointX, pointY)
        ?.closest('[role="tab"]')
        ?.querySelector('[data-web-view-id]')
        ?.getAttribute('data-web-view-id') ?? '',
    [x, y],
  );
  return id || undefined;
}

/** Whether rc-dock is currently showing its drop indicator. */
async function isDropIndicatorShown(page: Page): Promise<boolean> {
  return page
    .locator(DROP_INDICATOR)
    .evaluate((indicator) => getComputedStyle(indicator).display !== 'none');
}

/** Wait until no tab title in the panel still shows a raw `%localization_key%`. */
async function waitForLocalizedTitles(page: Page, panelId: string): Promise<void> {
  await expect(
    panelLocator(page, panelId).locator('.dock-nav-list .platform-tab-title-text', {
      hasText: '%',
    }),
  ).toHaveCount(0, { timeout: 30_000 });
}

/**
 * Poll the tab headers' rects until two readings 400ms apart agree. A title resolving from its raw
 * key narrows its tab and shifts every tab after it, so a single early reading can be stale.
 */
async function waitForTabRowToSettle(page: Page, panelId: string): Promise<void> {
  const readRow = async () =>
    panelLocator(page, panelId)
      .locator('.dock-nav-list .dock-tab-btn')
      .evaluateAll((tabs) =>
        tabs.map((tab) => {
          const { left, right } = tab.getBoundingClientRect();
          return [left, right];
        }),
      );
  await expect(async () => {
    const first = await readRow();
    await page.waitForTimeout(400);
    expect(await readRow()).toEqual(first);
  }).toPass({ timeout: 10_000 });
}

// #endregion

// #region actions

/** Click a panel's "+" and answer the id of the tab it added. */
async function addNewTab(page: Page, panelId: string): Promise<string> {
  const before = await tabIdsOf(page, panelId);
  await panelLocator(page, panelId).locator('.new-tab-button').click();
  let added: string | undefined;
  await expect(async () => {
    added = (await tabIdsOf(page, panelId)).find((id) => !before.includes(id));
    expect(added).toBeDefined();
  }).toPass({ timeout: 30_000 });
  if (!added) throw new Error(`no tab was added to panel ${panelId}`);
  return added;
}

/** Add New Tabs to a panel one at a time and answer their ids in order. */
async function addNewTabs(page: Page, panelId: string, count: number): Promise<string[]> {
  const added: string[] = [];
  for (let i = 0; i < count; i++) {
    // Sequential on purpose: each tab must land before the next "+" click is diffed against it
    // eslint-disable-next-line no-await-in-loop
    added.push(await addNewTab(page, panelId));
  }
  return added;
}

/** Wait until the panel's tabs are exactly `expected`, in order. */
async function expectTabs(
  page: Page,
  panelId: string,
  expected: string[],
  label: string,
): Promise<void> {
  await expect(async () => {
    expect(await tabIdsOf(page, panelId), label).toEqual(expected);
  }).toPass({ timeout: 10_000 });
}

// #endregion

test.use({
  // Power mode so each web view is its own closable dock tab; firstRunComplete because the wizard
  // is a modal that aria-hides the app. DEV_NOISY=false gives the window the single-Home-tab layout.
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('middle-click tab close', () => {
  test.setTimeout(300_000);

  /** Wait for the app and answer the single panel's id and its Home tab's id. */
  async function setUp(page: Page): Promise<{ panelId: string; homeId: string }> {
    await waitForAppReady(page, { timeout: 180_000 });
    let bars: TabBar[] = [];
    await expect(async () => {
      bars = await readBars(page);
      expect(bars.length).toBe(1);
      expect(bars[0].tabIds.length).toBe(1);
    }).toPass({ timeout: 60_000 });
    return { panelId: bars[0].panelId, homeId: bars[0].tabIds[0] };
  }

  test("a middle click on a closable tab's header closes that tab", async ({ mainPage: page }) => {
    const { panelId, homeId } = await setUp(page);
    const [newTab1, newTab2] = await test.step('open two New Tabs', async () =>
      addNewTabs(page, panelId, 2));
    await expect(tabButton(page, newTab1).locator('.dock-tab-close-btn')).toBeAttached();
    await waitForLocalizedTitles(page, panelId);
    await waitForTabRowToSettle(page, panelId);

    // Records every mouse event at the window, before the app's document listeners run, so the
    // press's `defaultPrevented` can be read after the app has handled it.
    const probe = await page.evaluateHandle(() => {
      const records: MouseEvent[] = [];
      const record = (event: MouseEvent) => records.push(event);
      window.addEventListener('mousedown', record, { capture: true });
      window.addEventListener('auxclick', record, { capture: true });
      return records;
    });

    await test.step('middle-click the first New Tab', async () => {
      const { x, y } = await centerOf(page, newTab1);
      await page.mouse.click(x, y, { button: 'middle' });
    });

    await expectTabs(page, panelId, [homeId, newTab2], 'tabs after the middle click');

    const recorded = await probe.evaluate((records) =>
      records.map((event) => ({
        type: event.type,
        button: event.button,
        defaultPrevented: event.defaultPrevented,
      })),
    );
    expect(recorded, 'the press is cancelled and the click still reaches the app').toEqual([
      { type: 'mousedown', button: 1, defaultPrevented: true },
      { type: 'auxclick', button: 1, defaultPrevented: false },
    ]);
  });

  test('a middle press dragged off a tab header starts no drag and changes nothing', async ({
    mainPage: page,
  }) => {
    const { panelId, homeId } = await setUp(page);
    const [, newTab2] = await addNewTabs(page, panelId, 2);
    await waitForLocalizedTitles(page, panelId);
    await waitForTabRowToSettle(page, panelId);
    const barsBefore = await readBars(page);

    /** Press on the second New Tab with `button` and move onto Home's trailing half. */
    const pressAndMove = async (button: 'left' | 'middle') => {
      const start = await centerOf(page, newTab2);
      await page.mouse.move(start.x, start.y);
      await page.mouse.down({ button });
      await page.mouse.move(start.x + 6, start.y, { steps: 3 });
      const homeBox = await tabButton(page, homeId).boundingBox();
      if (!homeBox) throw new Error('Home tab has no box');
      await page.mouse.move(homeBox.x + 0.75 * homeBox.width, homeBox.y + homeBox.height / 2, {
        steps: 10,
      });
    };

    await test.step('control: a left-button drag along the same path starts a drag', async () => {
      try {
        await pressAndMove('left');
        await expect(page.locator(DRAGGING_LAYER)).toBeAttached({ timeout: 5_000 });
        await expect.poll(async () => isDropIndicatorShown(page), { timeout: 5_000 }).toBe(true);
      } finally {
        await page.keyboard.press('Escape');
        await page.mouse.up({ button: 'left' });
      }
      await expect(page.locator(DRAGGING_LAYER)).toHaveCount(0, { timeout: 5_000 });
      await expectTabs(page, panelId, barsBefore[0].tabIds, 'tabs after the cancelled left drag');
    });

    await test.step('a middle-button drag along the same path', async () => {
      try {
        await pressAndMove('middle');
        // Give a drag the same time the control needed to show itself, then look.
        await page.waitForTimeout(1_000);
        await expect(page.locator(DRAGGING_LAYER)).toHaveCount(0);
        expect(await isDropIndicatorShown(page), 'drop indicator during the middle drag').toBe(
          false,
        );
      } finally {
        await page.mouse.up({ button: 'middle' });
      }
      await page.waitForTimeout(500);
      expect(await readBars(page), 'layout after the middle drag').toEqual(barsBefore);
    });
  });

  test('a repeat middle click on the same spot right after a close is ignored once', async ({
    mainPage: page,
  }) => {
    const { panelId, homeId } = await setUp(page);
    const [newTab1, newTab2, newTab3, newTab4] = await test.step('open four New Tabs', async () =>
      addNewTabs(page, panelId, 4));
    await waitForLocalizedTitles(page, panelId);
    await waitForTabRowToSettle(page, panelId);
    const point = await centerOf(page, newTab2);
    expect(await tabIdAt(page, point), 'tab under the pointer before the first click').toBe(
      newTab2,
    );

    /**
     * Wait until `closedId` is gone and `nextId` has slid under the pointer, and answer how many ms
     * that took since `since`. No screenshots or other slow work between the clicks: the guard
     * window is only 500ms.
     */
    const waitForSlide = async (closedId: string, nextId: string, since: number) => {
      await expect(async () => {
        expect(await tabIdsOf(page, panelId)).not.toContain(closedId);
        expect(await tabIdAt(page, point), 'tab slid under the pointer').toBe(nextId);
      }).toPass({ timeout: 5_000, intervals: [10] });
      return Date.now() - since;
    };

    await test.step('middle-click the second New Tab, then again ~150ms later', async () => {
      const firstClickAt = Date.now();
      await page.mouse.click(point.x, point.y, { button: 'middle' });
      const slidAfter = await waitForSlide(newTab2, newTab3, firstClickAt);
      await page.waitForTimeout(Math.max(0, 150 - slidAfter));
      const secondClickAfter = Date.now() - firstClickAt;
      await page.mouse.click(point.x, point.y, { button: 'middle' });
      // A slow machine that took longer than the guard window would make this step prove nothing.
      expect(secondClickAfter, 'ms between the two clicks').toBeLessThan(
        REPEAT_CLOSE_GUARD_MS - 150,
      );
      await page.waitForTimeout(REPEAT_CLOSE_GUARD_MS);
      await expectTabs(
        page,
        panelId,
        [homeId, newTab1, newTab3, newTab4],
        'only the aimed-at tab is closed',
      );
    });

    await test.step('the guard ignores only one repeat: the next click closes', async () => {
      const thirdClickAt = Date.now();
      await page.mouse.click(point.x, point.y, { button: 'middle' });
      await expectTabs(page, panelId, [homeId, newTab1, newTab4], 'tabs after the third click');
      await waitForSlide(newTab3, newTab4, thirdClickAt);
    });

    await test.step('a click well after a close, on the same spot, closes', async () => {
      await page.waitForTimeout(REPEAT_CLOSE_GUARD_MS + 200);
      await page.mouse.click(point.x, point.y, { button: 'middle' });
      await expectTabs(page, panelId, [homeId, newTab1], 'tabs after the late click');
    });
  });
});
