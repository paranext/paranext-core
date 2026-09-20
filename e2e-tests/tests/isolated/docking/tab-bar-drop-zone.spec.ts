/**
 * Dropping a dragged tab onto a tab bar's empty space, end to end with rc-dock's real drag manager.
 *
 * Every Power-mode tab bar carries an invisible drop zone (`tab-bar-drop-zone.component.tsx`) that
 * fills the space after the tabs, so releasing a dragged tab anywhere in that space appends it as
 * the panel's last tab. rc-dock hit-tests by painted element under the pointer and moves the "+"
 * button while a drag is in progress, so only a real drag in a real window can show whether every
 * point of that space accepts the drop — unit tests with a mocked layout cannot.
 *
 * Four tests, each launching its own Electron instance:
 *
 * 1. The zone's remainder appends a tab dragged within its own panel.
 * 2. The zone claims the last tab's trailing half, so the bar reads as one continuous target instead
 *    of two.
 * 3. Every part of ANOTHER panel's empty bar space appends: the gap before "+", "+" itself, the bar's
 *    end padding, and the bar's lower band when the pointer arrives from the panel's content.
 * 4. Starting a drag on a crowded bar does not move the tabs; the squeezed zone refuses the drop, a
 *    neighboring tab's drop indicator stays inside the bar, and a release past the bar's last tab
 *    still appends even though the zone itself has no width left to claim.
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

/**
 * The flex gap between the drop zone and the "+" button (`$tab-bar-extra-gap` in
 * `_tab-bar-metrics.scss`) — the minimum the "+" must sit to the right of the zone's own box.
 */
const TAB_BAR_EXTRA_GAP_PX = 8;

/** Slack for the bar's trailing padding when checking that "+" has slid to the bar's far end. */
const BAR_END_SLACK_PX = 24;

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

function panelSelector(panelId: string): string {
  return `.dock-panel[data-dockid="${panelId}"]`;
}

function panelLocator(page: Page, panelId: string) {
  return page.locator(panelSelector(panelId));
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

/** The global drop indicator's horizontal extent, or `undefined` while rc-dock hides it. */
async function readDropIndicator(page: Page): Promise<{ left: number; right: number } | undefined> {
  const extent = await page.locator(DROP_INDICATOR).evaluate((indicator) => {
    if (getComputedStyle(indicator).display === 'none') return false;
    const { left, right } = indicator.getBoundingClientRect();
    return { left, right };
  });
  return extent || undefined;
}

/**
 * Poll `read` until two readings 400ms apart agree, and answer the second. rc-tabs animates a row
 * scroll over 0.3s and rc-dock's drop indicator moves over 0.1s, so a single reading can catch
 * either mid-move.
 */
async function readWhenSettled<T>(page: Page, read: () => Promise<T>): Promise<T> {
  let settled: { value: T } | undefined;
  await expect(async () => {
    const first: unknown = await read();
    await page.waitForTimeout(400);
    const second = await read();
    // The matcher argument, not `second` itself, is annotated to `unknown`: Playwright's matcher
    // typing can't resolve on an unconstrained generic.
    expect<unknown>(second).toEqual(first);
    settled = { value: second };
  }).toPass({ timeout: 10_000 });
  if (!settled) throw new Error('no settled reading');
  return settled.value;
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

/**
 * Wait until the tab is its panel's last tab and gone from `fromPanelId`. Hard: later steps in the
 * same test mutate the state this one just asserted on, so a real failure here must stop the test
 * rather than let a stale precondition cascade into every step that follows.
 */
async function expectAppendedTo(
  page: Page,
  webViewId: string,
  toPanelId: string,
  fromPanelId: string,
  label: string,
): Promise<void> {
  await expect(async () => {
    const bars = await readBars(page);
    const target = bars.find((bar) => bar.panelId === toPanelId)?.tabIds ?? [];
    const source = bars.find((bar) => bar.panelId === fromPanelId)?.tabIds ?? [];
    expect(target.at(-1), `${label}: last tab of ${toPanelId}`).toBe(webViewId);
    expect(source, `${label}: gone from ${fromPanelId}`).not.toContain(webViewId);
  }).toPass({ timeout: 10_000 });
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
      const panel = panelSelector(panelId);
      await dragTabTo(page, homeId, async () => {
        let point: Point = { x: 0, y: 0 };
        await expect(async () => {
          const zone = await rectOf(page, `${panel} .platform-tab-bar-drop-zone`);
          const plus = await rectOf(page, `${panel} .new-tab-button`);
          const bar = await rectOf(page, `${panel} .dock-bar`);
          // While dragging, the zone runs from the last tab to a "+" parked at the bar's far end;
          // a zone that stopped short would leave the rest of the bar accepting nothing.
          expect(plus.right, '"+" at the far end of the bar').toBeGreaterThan(
            bar.right - BAR_END_SLACK_PX,
          );
          expect(plus.left, '"+" clears the zone by at least the flex gap').toBeGreaterThan(
            zone.left + TAB_BAR_EXTRA_GAP_PX,
          );
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

  test("the zone claims the last tab's trailing half", async ({ mainPage: page }) => {
    // The zone's hit area extends backward over the current last tab's trailing half, so the bar
    // reads as one continuous target instead of two. The tab landing last only shows SOMETHING
    // accepted the drop — rc-dock's own after-tab target would produce the same outcome. Read the
    // drop indicator before releasing and check its shape to prove the ZONE claimed this half:
    // rc-dock's own after-tab indicator is a fixed 30px strip straddling the tab's trailing edge
    // (`DockLayout.tsx`'s `after-tab` case: `left += width - 15; width = 30`), while the zone's own
    // indicator (`.platform-tab-bar-drop-zone-indicator`, `inset-inline-end: 0` against the zone)
    // starts at or before that edge and runs all the way to the zone's own right edge.
    //
    // Its own test, with a fresh two-panel layout holding only Home (dragged) and panel B's own
    // original tab (claimed): sharing a layout with a sweep across the rest of the bar would crowd
    // panel B enough, by the time this case runs, to leave the zone no width to claim with.
    const { panelId: panelIdA, homeId } = await setUp(page);
    const { panelId: panelIdB } = await openPanelToTheRight(page);
    const panelB = panelSelector(panelIdB);

    const lastTabId = (await tabIdsOf(page, panelIdB)).at(-1);
    if (!lastTabId) throw new Error(`panel ${panelIdB} has no tabs`);

    await startDrag(page, homeId);
    try {
      const box = await tabButton(page, lastTabId).boundingBox();
      if (!box) throw new Error(`tab ${lastTabId} has no box`);
      await page.mouse.move(box.x + 0.75 * box.width, box.y + box.height / 2, { steps: 10 });

      const indicator = await readWhenSettled(page, () => readDropIndicator(page));
      expect(indicator, 'drop indicator over the last tab trailing half').toBeDefined();
      if (indicator) {
        const tabRight = box.x + box.width;
        const tabMidpoint = box.x + box.width / 2;
        const zone = await rectOf(page, `${panelB} .platform-tab-bar-drop-zone`);
        const plus = await rectOf(page, `${panelB} .new-tab-button`);
        expect
          .soft(indicator.left, 'indicator starts at or before the tab trailing edge')
          .toBeLessThanOrEqual(tabRight + 1);
        expect
          .soft(
            indicator.left,
            "indicator does not start before the last tab's midpoint — claimLastTabOverlap's own " +
              'backward limit',
          )
          .toBeGreaterThanOrEqual(tabMidpoint - 1);
        expect
          .soft(
            Math.abs(indicator.right - zone.right),
            "indicator right edge matches the zone's own right edge",
          )
          .toBeLessThan(2);
        expect
          .soft(
            indicator.right,
            'indicator reaches out toward "+", not a 15px after-tab strip past the tab edge',
          )
          .toBeGreaterThan(plus.left - TAB_BAR_EXTRA_GAP_PX - 1);
      }
    } finally {
      await page.mouse.up();
    }
    await expect(page.locator(DRAGGING_LAYER)).toHaveCount(0, { timeout: 5_000 });
    // Panel A holds only the dragged Home tab (see this test's own docblock), so dragging it away
    // destroys panel A entirely; expectAppendedTo's "gone from panelIdA" half then finds no bar to
    // check against and can't fail here — the drop-indicator shape asserted above is the real proof.
    await expectAppendedTo(page, homeId, panelIdB, panelIdA, 'last tab trailing half');
  });

  test("every part of another panel's empty bar space appends a dropped tab", async ({
    mainPage: page,
  }) => {
    const { panelId: panelIdA } = await setUp(page);
    const movers = [
      await addNewTab(page, panelIdA),
      await addNewTab(page, panelIdA),
      await addNewTab(page, panelIdA),
      await addNewTab(page, panelIdA),
    ];
    const { panelId: panelIdB } = await openPanelToTheRight(page);
    const panelB = panelSelector(panelIdB);

    const plusCenter = async (): Promise<Point> => {
      const plus = await rectOf(page, `${panelB} .new-tab-button`);
      const bar = await rectOf(page, `${panelB} .dock-bar`);
      return { x: (plus.left + plus.right) / 2, y: (bar.top + bar.bottom) / 2 };
    };

    await test.step('gap between zone and "+"', async () => {
      await dragTabTo(page, movers[0], async () => {
        const zone = await rectOf(page, `${panelB} .platform-tab-bar-drop-zone`);
        const plus = await rectOf(page, `${panelB} .new-tab-button`);
        const { y } = await plusCenter();
        return { x: (zone.right + plus.left) / 2, y };
      });
      await expectAppendedTo(page, movers[0], panelIdB, panelIdA, 'gap');
    });

    await test.step('"+" button center', async () => {
      await dragTabTo(page, movers[1], plusCenter);
      await expectAppendedTo(page, movers[1], panelIdB, panelIdA, '"+" center');
    });

    await test.step('bar end padding', async () => {
      await dragTabTo(page, movers[2], async () => {
        const bar = await rectOf(page, `${panelB} .dock-bar`);
        const { y } = await plusCenter();
        return { x: bar.right - 2, y };
      });
      await expectAppendedTo(page, movers[2], panelIdB, panelIdA, 'bar end padding');
    });

    await test.step("bar's lower band, reached from the content area", async () => {
      const panelCountBefore = await page.locator('.dock-panel[data-dockid]').count();
      await dragTabTo(
        page,
        movers[3],
        async () => {
          const zone = await rectOf(page, `${panelB} .platform-tab-bar-drop-zone`);
          const plus = await rectOf(page, `${panelB} .new-tab-button`);
          const bar = await rectOf(page, `${panelB} .dock-bar`);
          return { x: zone.left + 0.75 * (plus.left - zone.left), y: bar.bottom - 4 };
        },
        async () => {
          const panelRect = await rectOf(page, panelB);
          const bar = await rectOf(page, `${panelB} .dock-bar`);
          return {
            x: (panelRect.left + panelRect.right) / 2,
            y: (bar.bottom + panelRect.bottom) / 2,
          };
        },
      );
      await expectAppendedTo(page, movers[3], panelIdB, panelIdA, 'lower band');
      await expect
        .soft(page.locator('.dock-panel[data-dockid]'), 'no panel created by the lower-band drop')
        .toHaveCount(panelCountBefore);
    });
  });

  test('starting a drag on a crowded bar leaves the tab row and the indicator in place', async ({
    mainPage: page,
  }) => {
    const { panelId } = await setUp(page);
    const panel = panelSelector(panelId);

    /**
     * The tab row's geometry, which tabs are fully inside the visible wrap, the last tab, and
     * whether the overflow "more" dropdown is showing — all from one settled reading, so the
     * crowding loop's exit condition and the assertions that follow it never read the row at two
     * different moments.
     */
    const measure = async () =>
      page.locator(`${panel} .dock-nav-wrap`).evaluate((wrap) => {
        const wrapRect = wrap.getBoundingClientRect();
        const list = wrap.querySelector('.dock-nav-list');
        const visible: { id: string; left: number; right: number }[] = [];
        wrap.querySelectorAll('.dock-tab').forEach((tab) => {
          const tabRect = tab.getBoundingClientRect();
          const title = tab.querySelector('.platform-tab-title[data-web-view-id]');
          if (title && tabRect.left >= wrapRect.left - 0.5 && tabRect.right <= wrapRect.right + 0.5)
            visible.push({
              id: title.getAttribute('data-web-view-id') ?? '',
              left: tabRect.left,
              right: tabRect.right,
            });
        });
        const titles = wrap.querySelectorAll('.dock-tab .platform-tab-title[data-web-view-id]');
        const operationsElement = wrap.closest('.dock-nav')?.querySelector('.dock-nav-operations');
        return {
          wrapWidth: wrapRect.width,
          transform: list ? getComputedStyle(list).transform : '',
          visible,
          lastTabId: titles[titles.length - 1]?.getAttribute('data-web-view-id') ?? '',
          overflowed: operationsElement
            ? !operationsElement.classList.contains('dock-nav-operations-hidden')
            : false,
        };
      });

    await test.step('crowd the bar until tabs overflow with at least a few tabs still visible', async () => {
      // Comfortably more tabs than any window width the suite launches with needs before the row
      // overflows into the "more" dropdown with at least a few tabs still visible; if the cap is
      // reached first, this throws naming which of the two conditions was not met, rather than
      // leaving the assertion below to fail on a row that never got the chance to settle.
      const MAX_TABS_TO_CROWD_BAR = 40;
      const MIN_VISIBLE_TABS_TO_CROWD_BAR = 3;
      let overflowed = false;
      let visibleCount = 0;
      for (let i = 0; i < MAX_TABS_TO_CROWD_BAR; i++) {
        // Sequential on purpose: the settled row measurement, overflow included, after each tab lands
        // eslint-disable-next-line no-await-in-loop
        const settled = await readWhenSettled(page, measure);
        overflowed = settled.overflowed;
        visibleCount = settled.visible.length;
        if (overflowed && visibleCount >= MIN_VISIBLE_TABS_TO_CROWD_BAR) return;
        // Sequential on purpose: tabs are added one at a time
        // eslint-disable-next-line no-await-in-loop
        await addNewTab(page, panelId);
      }
      throw new Error(
        `bar did not reach both overflow and ${MIN_VISIBLE_TABS_TO_CROWD_BAR}+ visible tabs within ` +
          `${MAX_TABS_TO_CROWD_BAR} tabs (overflowed=${overflowed}, visible=${visibleCount})`,
      );
    });

    const before = await test.step('wait for the tab row to settle', async () => {
      // A new tab first shows its title's raw localization key, which is wider than the resolved
      // title. When it resolves, rc-tabs re-scrolls the row and animates the move over 0.3s, so a
      // row read any earlier is not the one a drag starts from.
      await expect(
        page.locator(`${panel} .dock-nav-list .platform-tab-title-text`, { hasText: '%' }),
      ).toHaveCount(0, { timeout: 30_000 });
      return readWhenSettled(page, measure);
    });
    // The crowding loop above already guarantees this; restated here as the precondition the rest
    // of the test depends on, not as a race with the loop's own exit condition.
    expect(before.visible.length).toBeGreaterThan(2);
    // Pressing a tab focuses it, and rc-tabs scrolls a focused tab into view by its own measure,
    // which ignores `.dock-nav-wrap`'s inline padding: a tab at either edge can move a few px on
    // press alone. A tab in the middle of the row is in view by any measure.
    const dragged = before.visible[Math.floor(before.visible.length / 2)];

    await test.step('start dragging a tab in the middle of the row', async () => {
      await startDrag(page, dragged.id);
    });

    try {
      const during = await readWhenSettled(page, measure);
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

      const bar = await rectOf(page, `${panel} .dock-bar`);

      await test.step('hover the gap before "+": the squeezed zone refuses the drop', async () => {
        const zone = await rectOf(page, `${panel} .platform-tab-bar-drop-zone`);
        const plus = await rectOf(page, `${panel} .new-tab-button`);
        // A crowded bar leaves the zone no width, so it refuses the drop rather than draw a
        // zero-width indicator.
        expect.soft(zone.width, 'zone width on a crowded bar').toBeLessThan(1);
        await page.mouse.move(plus.left - 2, (bar.top + bar.bottom) / 2, { steps: 10 });
        expect(await readWhenSettled(page, () => readDropIndicator(page))).toBeUndefined();
      });

      await test.step("hover a neighboring tab's trailing half", async () => {
        // Not the bar's last tab: during a drag the zone may claim that one's trailing half.
        const neighbor = during.visible
          .filter((tab) => tab.id !== dragged.id && tab.id !== during.lastTabId)
          .at(-1);
        if (!neighbor) throw new Error('no visible tab to hover');
        const neighborBox = await tabButton(page, neighbor.id).boundingBox();
        if (!neighborBox) throw new Error(`tab ${neighbor.id} has no box`);
        await page.mouse.move(
          neighborBox.x + 0.75 * neighborBox.width,
          neighborBox.y + neighborBox.height / 2,
          { steps: 10 },
        );
        // rc-dock's own after-tab indicator, centered on the tab's trailing edge.
        const indicator = await readWhenSettled(page, () => readDropIndicator(page));
        expect(indicator, 'after-tab drop indicator').toBeDefined();
        if (!indicator) return;
        expect.soft(indicator.left, 'indicator left edge').toBeGreaterThanOrEqual(bar.left);
        expect.soft(indicator.right, 'indicator right edge').toBeLessThanOrEqual(bar.right);
        expect.soft(indicator.left, 'indicator reaches the tab edge').toBeLessThan(neighbor.right);
        expect
          .soft(indicator.right, 'indicator reaches past the tab edge')
          .toBeGreaterThan(neighbor.right);
      });

      await test.step("release past the bar's last tab: still appends despite the crowd", async () => {
        // On a crowded bar the zone itself has no width (see the "gap before +" step above), so
        // whatever accepts a drop past the bar's LAST tab must be rc-dock's own after-tab handling —
        // proving the outcome the zone exists to guarantee (dropping past the last tab appends)
        // still holds even when the zone has no width of its own to claim it. Read the true last
        // tab's box and the bar's box first: a bar crowded enough to clip that tab behind the
        // overflow dropdown would send the release point somewhere else entirely, so fail with both
        // rects named rather than let that happen silently.
        const lastTabBox = await tabButton(page, during.lastTabId).boundingBox();
        if (!lastTabBox) throw new Error(`tab ${during.lastTabId} has no box`);
        const releaseX = lastTabBox.x + 0.75 * lastTabBox.width;
        const releaseY = lastTabBox.y + lastTabBox.height / 2;
        if (releaseX < bar.left || releaseX > bar.right) {
          throw new Error(
            `last tab ${during.lastTabId}'s trailing half falls outside the bar's visible bounds: ` +
              `release point x=${releaseX}, tab box=${JSON.stringify(lastTabBox)}, bar box=` +
              `${JSON.stringify(bar)}`,
          );
        }
        await page.mouse.move(releaseX, releaseY, { steps: 10 });
        await page.mouse.up();
        await expect(page.locator(DRAGGING_LAYER)).toHaveCount(0, { timeout: 5_000 });

        await expect(async () => {
          const tabIds = await tabIdsOf(page, panelId);
          expect(tabIds.at(-1), 'dragged tab appended despite the crowded bar').toBe(dragged.id);
        }).toPass({ timeout: 10_000 });
      });
    } finally {
      await page.keyboard.press('Escape');
      await page.mouse.up();
    }
  });
});
