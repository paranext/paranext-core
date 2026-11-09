/** Helpers shared by the e2e specs that read rc-dock's tab bars and drag its tabs in a real window. */
import { type Locator, type Page, expect } from '@playwright/test';

/** The global overlay rc-dock positions over whatever drop target the pointer is on. */
export const DROP_INDICATOR = '.dock-layout > .dock-drop-indicator';

/** Appended to `<body>` by rc-dock's drag manager for the duration of a tab drag. */
export const DRAGGING_LAYER = 'body > .dragging-layer';

/** One dock panel's id and the web view ids of its tabs, in DOM order. */
export type TabBar = { panelId: string; tabIds: string[] };

/** A viewport point, as the mouse sees it. */
export type Point = { x: number; y: number };

/** Each dock panel's id and the web view ids of its tabs, in DOM order. */
export async function readBars(page: Page): Promise<TabBar[]> {
  return page.locator('.dock-panel[data-dockid]').evaluateAll((panels) =>
    panels.map((panel) => ({
      panelId: panel.getAttribute('data-dockid') ?? '',
      tabIds: Array.from(
        panel.querySelectorAll('.dock-nav-list .platform-tab-title[data-web-view-id]'),
      ).map((title) => title.getAttribute('data-web-view-id') ?? ''),
    })),
  );
}

/** The web view ids of one panel's tabs, in DOM order; empty if there is no such panel. */
export async function tabIdsOf(page: Page, panelId: string): Promise<string[]> {
  return (await readBars(page)).find((bar) => bar.panelId === panelId)?.tabIds ?? [];
}

/** CSS selector for the dock panel with rc-dock id `panelId`, for use inside `page.evaluate`. */
export function panelSelector(panelId: string): string {
  return `.dock-panel[data-dockid="${panelId}"]`;
}

/** The dock panel with rc-dock id `panelId`. */
export function panelLocator(page: Page, panelId: string): Locator {
  return page.locator(panelSelector(panelId));
}

/** The tab header button of the tab showing `webViewId`. */
export function tabButton(page: Page, webViewId: string): Locator {
  return page.locator('.dock-tab-btn', {
    has: page.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`),
  });
}

/**
 * Every element rc-dock draws to offer a drop: its drop squares (the float square among them) and
 * Power mode's edge layer.
 */
export const DROP_OFFERS = '.dock-drop-square, .dock-drop-edge';

/**
 * Press at `point` and move just far enough for rc-dock to start a drag, then wait until it has:
 * rc-dock marks `<body>` with `dock-dragging` for every drag it runs. Waiting on that keeps a later
 * "nothing was offered" check from passing just because no drag began.
 */
export async function startDragAt(page: Page, point: Point): Promise<void> {
  await page.mouse.move(point.x, point.y);
  await page.mouse.down();
  await page.mouse.move(point.x + 6, point.y, { steps: 3 });
  await expect(page.locator('body')).toContainClass('dock-dragging', { timeout: 5_000 });
}

/**
 * Press on a tab and move just far enough for rc-dock to start a drag. rc-dock listens to pointer
 * events and starts a drag only after a few pixels of movement. Target geometry must be read only
 * after this: the "+" button moves once a drag starts.
 */
export async function startDrag(page: Page, webViewId: string): Promise<void> {
  const box = await tabButton(page, webViewId).boundingBox();
  if (!box) throw new Error(`tab ${webViewId} has no box`);
  await startDragAt(page, { x: box.x + box.width / 2, y: box.y + box.height / 2 });
  await expect(page.locator(DRAGGING_LAYER)).toBeAttached({ timeout: 5_000 });
}

/**
 * A point in `panelId`'s tab bar past its last tab, where a press drags the whole tab group. Skips
 * buttons such as Power mode's "+". Throws if the tabs fill the bar.
 */
export async function emptyBarPoint(page: Page, panelId: string): Promise<Point> {
  const point = await page.evaluate((selector) => {
    const bar = document.querySelector(`${selector} .dock-bar`);
    if (!bar) return undefined;
    const barRect = bar.getBoundingClientRect();
    const tabsRight = Math.max(
      barRect.left,
      ...Array.from(bar.querySelectorAll('.dock-tab')).map(
        (tab) => tab.getBoundingClientRect().right,
      ),
    );
    const y = (barRect.top + barRect.bottom) / 2;
    for (let x = Math.ceil(tabsRight) + 4; x < barRect.right - 2; x += 4) {
      const hit = document.elementFromPoint(x, y);
      if (hit && bar.contains(hit) && !hit.closest('.dock-tab, button')) return { x, y };
    }
    return undefined;
  }, panelSelector(panelId));
  if (!point) throw new Error(`panel ${panelId} has no empty space in its tab bar`);
  return point;
}

/**
 * A point on the padding of one of `panelId`'s tabs, where a press starts a drag of that tab.
 * Simple mode marks the tab's title `drag-ignore`, and rc-dock checks only the exact element
 * pressed, so the padding is the one place a Simple-mode tab drag can still start.
 */
export async function tabPaddingPoint(page: Page, panelId: string, tabIndex = 0): Promise<Point> {
  const point = await page.evaluate(
    ([selector, index]) => {
      const tab = document.querySelectorAll(`${selector} .dock-bar .dock-tab`)[index];
      if (!tab) return undefined;
      const rect = tab.getBoundingClientRect();
      const y = (rect.top + rect.bottom) / 2;
      for (let x = Math.ceil(rect.left) + 1; x < rect.right - 1; x += 1) {
        const hit = document.elementFromPoint(x, y);
        // The tab's own drag element, not the tab bar around it, which is a drag element too
        const dragElement = hit?.closest('.drag-initiator');
        if (
          hit &&
          dragElement &&
          tab.contains(dragElement) &&
          !hit.classList.contains('drag-ignore') &&
          !hit.closest('.dock-tab-close-btn')
        )
          return { x, y };
      }
      return undefined;
    },
    [panelSelector(panelId), tabIndex] as const,
  );
  if (!point) throw new Error(`tab ${tabIndex} of panel ${panelId} has no padding to press on`);
  return point;
}

/**
 * The center of the visible part of the panel `panelId`. A panel can extend past the window edge:
 * when the window is narrower than the dock's minimum width, the dock overflows.
 */
export async function visibleCenterOf(page: Page, panelId: string): Promise<Point> {
  const point = await page.evaluate((selector) => {
    const panel = document.querySelector(selector);
    if (!panel) return undefined;
    const rect = panel.getBoundingClientRect();
    const left = Math.max(rect.left, 0);
    const right = Math.min(rect.right, window.innerWidth);
    const top = Math.max(rect.top, 0);
    const bottom = Math.min(rect.bottom, window.innerHeight);
    if (right <= left || bottom <= top) return undefined;
    return { x: (left + right) / 2, y: (top + bottom) / 2 };
  }, panelSelector(panelId));
  if (!point) throw new Error(`panel ${panelId} is not on screen`);
  return point;
}

/** How many tabs the panel `panelId` holds. */
export async function tabCountOf(page: Page, panelId: string): Promise<number> {
  return panelLocator(page, panelId).locator('.dock-bar .dock-tab').count();
}

/** The rc-dock ids of the floating panels, in DOM order. */
export async function floatPanelIds(page: Page): Promise<string[]> {
  return page
    .locator('.dock-fbox .dock-panel[data-dockid]')
    .evaluateAll((panels) => panels.map((panel) => panel.getAttribute('data-dockid') ?? ''));
}

/**
 * Run the renderer command `command`, which opens a floating panel, and answer that panel's id. The
 * command is not awaited, because a dialog's command answers only once the dialog closes; a
 * rejection is logged so a failure doesn't surface only as the timeout below.
 */
export async function openFloat(page: Page, command: string): Promise<string> {
  const before = await floatPanelIds(page);
  await page.evaluate((commandName) => {
    // The renderer exposes `papi` on `globalThis`, untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { papi } = window as unknown as {
      papi: { commands: { sendCommand: (name: string) => Promise<unknown> } };
    };
    papi.commands
      .sendCommand(commandName)
      .catch((error) => console.error(`${commandName} failed: ${error}`));
  }, command);
  let added: string | undefined;
  await expect(async () => {
    added = (await floatPanelIds(page)).find((id) => !before.includes(id));
    expect(added).toBeDefined();
  }).toPass({ timeout: 30_000 });
  if (!added) throw new Error(`${command} opened no floating panel`);
  return added;
}

/** Click a panel's "+" and return the id of the tab it added. */
export async function addNewTab(page: Page, panelId: string): Promise<string> {
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
