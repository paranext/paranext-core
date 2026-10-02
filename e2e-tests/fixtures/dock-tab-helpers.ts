/**
 * Helpers shared by the e2e specs that read rc-dock's tab bars and drag its tabs in a real window:
 * the drag-manager and drop-indicator selectors, the tab-bar reader, the tab and panel locators,
 * the drag start, and the "+" button's new tab.
 */
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

export function panelSelector(panelId: string): string {
  return `.dock-panel[data-dockid="${panelId}"]`;
}

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
 * Press on a tab and move just far enough for rc-dock to start a drag. rc-dock listens to pointer
 * events and starts a drag only after a few pixels of movement. Target geometry must be read only
 * after this: the "+" button moves once a drag starts.
 */
export async function startDrag(page: Page, webViewId: string): Promise<void> {
  const box = await tabButton(page, webViewId).boundingBox();
  if (!box) throw new Error(`tab ${webViewId} has no box`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 6, box.y + box.height / 2, { steps: 3 });
  await expect(page.locator(DRAGGING_LAYER)).toBeAttached({ timeout: 5_000 });
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
