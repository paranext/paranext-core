/**
 * Dropping a dragged tab onto a tab bar's empty space, end to end with rc-dock's real drag manager.
 *
 * Every dock panel's tab bar carries an invisible drop zone (`tab-bar-drop-zone.component.tsx`)
 * that fills the space after the tabs, so releasing a dragged tab anywhere in that space appends it
 * as the panel's last tab. rc-dock hit-tests by painted element under the pointer and moves the "+"
 * button while a drag is in progress, so only a real drag in a real window can show whether every
 * point of that space accepts the drop — unit tests with a mocked layout cannot.
 *
 * Three tests, each launching its own Electron instance:
 *
 * 1. The zone's remainder appends a tab dragged within its own panel.
 * 2. Every part of ANOTHER panel's empty bar space appends: the gap before "+", "+" itself, the bar's
 *    end padding, and the bar's lower band when the pointer arrives from the panel's content.
 * 3. Starting a drag on a crowded bar does not move the tabs, and the drop indicator stays inside the
 *    bar.
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

const NEW_TAB_WEB_VIEW_TYPE = 'platformGetResources.newTab';

/** The global overlay rc-dock positions over whatever drop target the pointer is on. */
const DROP_INDICATOR = '.dock-layout > .dock-drop-indicator';

/** Appended to `<body>` by rc-dock's drag manager for the duration of a tab drag. */
const DRAGGING_LAYER = 'body > .dragging-layer';

type Rect = { left: number; right: number; top: number; bottom: number; width: number };

type TabBar = { panelId: string; tabIds: string[] };

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

/** The element's viewport rect, as the mouse sees it. */
async function rectOf(page: Page, selector: string): Promise<Rect> {
  return page
    .locator(selector)
    .first()
    .evaluate((element) => {
      const { left, right, top, bottom, width } = element.getBoundingClientRect();
      return { left, right, top, bottom, width };
    });
}

/** Which panel holds `webViewId`, or `undefined` if none does. */
async function panelHolding(page: Page, webViewId: string): Promise<string | undefined> {
  return (await readBars(page)).find((bar) => bar.tabIds.includes(webViewId))?.panelId;
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

/** Open a New Tab web view in a panel of its own, to the right, and answer that panel's id. */
async function openPanelToTheRight(page: Page): Promise<{ panelId: string; tabId: string }> {
  const tabId = await page.evaluate(async (webViewType) => {
    // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { papi } = window as unknown as {
      papi: {
        webViews: {
          openWebView: (type: string, layout?: unknown) => Promise<string | undefined>;
        };
      };
    };
    return papi.webViews.openWebView(webViewType, { type: 'panel', direction: 'right' });
  }, NEW_TAB_WEB_VIEW_TYPE);
  if (!tabId) throw new Error('openWebView answered no id');
  let panelId: string | undefined;
  await expect(async () => {
    panelId = await panelHolding(page, tabId);
    expect(panelId).toBeDefined();
  }).toPass({ timeout: 30_000 });
  if (!panelId) throw new Error(`web view ${tabId} is in no panel`);
  return { panelId, tabId };
}

type Point = { x: number; y: number };

/**
 * Press on a tab and move just far enough for rc-dock to start a drag. Target geometry must be read
 * only after this: the "+" button moves once a drag starts.
 */
async function startDrag(page: Page, webViewId: string): Promise<void> {
  const box = await tabButton(page, webViewId).boundingBox();
  if (!box) throw new Error(`tab ${webViewId} has no box`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 6, box.y + box.height / 2, { steps: 3 });
  await expect(page.locator(DRAGGING_LAYER)).toBeAttached({ timeout: 5_000 });
}

/**
 * Drag a tab to wherever `target` computes (evaluated after the drag has started), expect the drop
 * indicator, and release. `via`, if given, is visited first.
 */
async function dragTabTo(
  page: Page,
  webViewId: string,
  target: () => Promise<Point>,
  via?: () => Promise<Point>,
): Promise<void> {
  await startDrag(page, webViewId);
  try {
    if (via) {
      const viaPoint = await via();
      await page.mouse.move(viaPoint.x, viaPoint.y, { steps: 10 });
    }
    const point = await target();
    await page.mouse.move(point.x, point.y, { steps: 10 });
    // Soft: a target that shows no indicator should still report where its drop ended up.
    await expect
      .soft(page.locator(DROP_INDICATOR), `drop indicator at ${point.x},${point.y}`)
      .toBeVisible({ timeout: 3_000 });
  } finally {
    await page.mouse.up();
  }
  await expect(page.locator(DRAGGING_LAYER)).toHaveCount(0, { timeout: 5_000 });
}

/** Wait until the tab is its panel's last tab and gone from `fromPanelId` (soft). */
async function expectAppendedTo(
  page: Page,
  webViewId: string,
  toPanelId: string,
  fromPanelId: string,
  label: string,
): Promise<void> {
  await expect
    .soft(async () => {
      const bars = await readBars(page);
      const target = bars.find((bar) => bar.panelId === toPanelId)?.tabIds ?? [];
      const source = bars.find((bar) => bar.panelId === fromPanelId)?.tabIds ?? [];
      expect(target.at(-1), `${label}: last tab of ${toPanelId}`).toBe(webViewId);
      expect(source, `${label}: gone from ${fromPanelId}`).not.toContain(webViewId);
    })
    .toPass({ timeout: 10_000 });
}

// #endregion

test.use({
  // Power mode so each web view is its own dock tab; firstRunComplete because the wizard is a
  // modal that aria-hides the app. DEV_NOISY=false gives the window the single-Home-tab layout.
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('tab-bar drop zone', () => {
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

  test('a tab released on the zone remainder of its own bar becomes the last tab', async ({
    mainPage: page,
  }) => {
    const { panelId, homeId } = await setUp(page);
    const newTab1 = await test.step('open two New Tabs', async () => addNewTab(page, panelId));
    const newTab2 = await addNewTab(page, panelId);
    expect(await tabIdsOf(page, panelId)).toEqual([homeId, newTab1, newTab2]);

    await test.step('drag Home to 75% across the zone', async () => {
      const panel = `.dock-panel[data-dockid="${panelId}"]`;
      await dragTabTo(page, homeId, async () => {
        let point: Point = { x: 0, y: 0 };
        await expect(async () => {
          const zone = await rectOf(page, `${panel} .platform-tab-bar-drop-zone`);
          const plus = await rectOf(page, `${panel} .new-tab-button`);
          const bar = await rectOf(page, `${panel} .dock-bar`);
          // While dragging, the zone runs from the last tab to a "+" parked at the bar's far end;
          // a zone that stopped short would leave the rest of the bar accepting nothing.
          expect(plus.right, '"+" at the far end of the bar').toBeGreaterThan(bar.right - 24);
          expect(plus.left).toBeGreaterThan(zone.left + 8);
          point = {
            x: zone.left + 0.75 * (plus.left - zone.left),
            y: (bar.top + bar.bottom) / 2,
          };
        }).toPass({ timeout: 5_000 });
        return point;
      });
    });

    await expect(async () => {
      const bars = await readBars(page);
      expect(bars.length).toBe(1);
      expect(bars[0].panelId).toBe(panelId);
      expect(bars[0].tabIds).toEqual([newTab1, newTab2, homeId]);
    }).toPass({ timeout: 10_000 });
  });

  test("every part of another panel's empty bar space appends a dropped tab", async ({
    mainPage: page,
  }) => {
    const { panelId: panelA } = await setUp(page);
    const movers = [
      await addNewTab(page, panelA),
      await addNewTab(page, panelA),
      await addNewTab(page, panelA),
      await addNewTab(page, panelA),
    ];
    const { panelId: panelB } = await openPanelToTheRight(page);
    const b = `.dock-panel[data-dockid="${panelB}"]`;

    const plusCentre = async (): Promise<Point> => {
      const plus = await rectOf(page, `${b} .new-tab-button`);
      const bar = await rectOf(page, `${b} .dock-bar`);
      return { x: (plus.left + plus.right) / 2, y: (bar.top + bar.bottom) / 2 };
    };

    await test.step('gap between zone and "+"', async () => {
      await dragTabTo(page, movers[0], async () => {
        const zone = await rectOf(page, `${b} .platform-tab-bar-drop-zone`);
        const plus = await rectOf(page, `${b} .new-tab-button`);
        const { y } = await plusCentre();
        return { x: (zone.right + plus.left) / 2, y };
      });
      await expectAppendedTo(page, movers[0], panelB, panelA, 'gap');
    });

    await test.step('"+" button centre', async () => {
      await dragTabTo(page, movers[1], plusCentre);
      await expectAppendedTo(page, movers[1], panelB, panelA, '"+" centre');
    });

    await test.step('bar end padding', async () => {
      await dragTabTo(page, movers[2], async () => {
        const bar = await rectOf(page, `${b} .dock-bar`);
        const { y } = await plusCentre();
        return { x: bar.right - 2, y };
      });
      await expectAppendedTo(page, movers[2], panelB, panelA, 'bar end padding');
    });

    await test.step("bar's lower band, reached from the content area", async () => {
      const panelCountBefore = await page.locator('.dock-panel[data-dockid]').count();
      await dragTabTo(
        page,
        movers[3],
        async () => {
          const zone = await rectOf(page, `${b} .platform-tab-bar-drop-zone`);
          const plus = await rectOf(page, `${b} .new-tab-button`);
          const bar = await rectOf(page, `${b} .dock-bar`);
          return { x: zone.left + 0.75 * (plus.left - zone.left), y: bar.bottom - 4 };
        },
        async () => {
          const panelRect = await rectOf(page, b);
          const bar = await rectOf(page, `${b} .dock-bar`);
          return {
            x: (panelRect.left + panelRect.right) / 2,
            y: (bar.bottom + panelRect.bottom) / 2,
          };
        },
      );
      await expectAppendedTo(page, movers[3], panelB, panelA, 'lower band');
      await expect
        .soft(page.locator('.dock-panel[data-dockid]'), 'no panel created by the lower-band drop')
        .toHaveCount(panelCountBefore);
    });
  });

  test('starting a drag on a crowded bar leaves the tab row and the indicator in place', async ({
    mainPage: page,
  }) => {
    const { panelId } = await setUp(page);
    const panel = `.dock-panel[data-dockid="${panelId}"]`;
    const operations = page.locator(`${panel} .dock-nav-operations`);

    await test.step('crowd the bar until tabs overflow', async () => {
      for (let i = 0; i < 40; i++) {
        // Sequential on purpose: each tab must land before overflow is read again
        // eslint-disable-next-line no-await-in-loop
        const hidden = await operations.evaluate((el) =>
          el.classList.contains('dock-nav-operations-hidden'),
        );
        if (!hidden) return;
        // Sequential on purpose: tabs are added one at a time
        // eslint-disable-next-line no-await-in-loop
        await addNewTab(page, panelId);
      }
      await expect(operations).not.toHaveClass(/dock-nav-operations-hidden/);
    });

    /** The tab row's geometry and which tabs are fully inside the visible wrap. */
    const measure = async () =>
      page.locator(`${panel} .dock-nav-wrap`).evaluate((wrap) => {
        const wrapRect = wrap.getBoundingClientRect();
        const list = wrap.querySelector('.dock-nav-list');
        const visible: { id: string; right: number }[] = [];
        wrap.querySelectorAll('.dock-tab').forEach((tab) => {
          const r = tab.getBoundingClientRect();
          const id = tab.querySelector('.platform-tab-title[data-web-view-id]');
          if (id && r.left >= wrapRect.left - 0.5 && r.right <= wrapRect.right + 0.5)
            visible.push({ id: id.getAttribute('data-web-view-id') ?? '', right: r.right });
        });
        return {
          wrapWidth: wrapRect.width,
          transform: list ? getComputedStyle(list).transform : '',
          visible,
        };
      });

    await test.step('wait for the tab row to settle', async () => {
      // A new tab first shows its title's raw localization key, which is wider than the resolved
      // title. When it resolves, rc-tabs re-scrolls the row and animates the move over 0.3s, so a
      // row read any earlier is not the one a drag starts from.
      await expect(
        page.locator(`${panel} .dock-nav-list .platform-tab-title-text`, { hasText: '%' }),
      ).toHaveCount(0, { timeout: 30_000 });
      await expect(async () => {
        const first = await measure();
        await page.waitForTimeout(400);
        const second = await measure();
        expect(second.transform).toBe(first.transform);
        expect(second.visible).toEqual(first.visible);
      }).toPass({ timeout: 10_000 });
    });

    const before = await measure();
    expect(before.visible.length).toBeGreaterThan(2);
    // Pressing a tab focuses it, and rc-tabs scrolls a focused tab into view by its own measure,
    // which ignores `.dock-nav-wrap`'s inline padding: a tab at either edge can move a few px on
    // press alone. A tab in the middle of the row is in view by any measure.
    const dragged = before.visible[Math.floor(before.visible.length / 2)];

    await test.step('start dragging a tab in the middle of the row', async () => {
      await startDrag(page, dragged.id);
      await page.evaluate(
        () =>
          new Promise<void>((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          }),
      );
      await page.waitForTimeout(300);
    });

    try {
      const during = await measure();
      expect
        .soft(Math.abs(during.wrapWidth - before.wrapWidth), 'wrap width')
        .toBeLessThanOrEqual(0.5);
      expect.soft(during.transform, 'tab list transform').toBe(before.transform);
      expect
        .soft(
          during.visible.map((tab) => tab.id),
          'visible tabs',
        )
        .toEqual(before.visible.map((tab) => tab.id));

      await test.step('hover the zone', async () => {
        const zone = await rectOf(page, `${panel} .platform-tab-bar-drop-zone`);
        const plus = await rectOf(page, `${panel} .new-tab-button`);
        const bar = await rectOf(page, `${panel} .dock-bar`);
        const x = zone.width > 2 ? (zone.left + zone.right) / 2 : plus.left - 2;
        await page.mouse.move(x, (bar.top + bar.bottom) / 2, { steps: 10 });
        await page.waitForTimeout(300);
        const lastVisibleRight = (await measure()).visible.at(-1)?.right ?? bar.left;
        const indicator = page.locator(DROP_INDICATOR);
        if (await indicator.isVisible()) {
          const box = await indicator.boundingBox();
          if (!box) throw new Error('visible indicator has no box');
          expect.soft(box.x + box.width, 'indicator right edge').toBeLessThanOrEqual(bar.right);
          expect.soft(box.x, 'indicator left edge').toBeGreaterThanOrEqual(lastVisibleRight - 1);
        }
      });
    } finally {
      await page.keyboard.press('Escape');
      await page.mouse.up();
    }
  });
});
