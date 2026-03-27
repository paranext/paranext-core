import { Frame, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { findHelloRock3Frame } from './overlay-helpers';

/** Right-click the .title element and wait for the context menu to appear in the parent doc. */
async function openContextMenu(mainPage: Page, frame: Frame) {
  await frame.locator('.title').click({ button: 'right' });
  const menu = mainPage.locator('[role="menu"]');
  await expect(menu).toBeVisible({ timeout: 10_000 });
  return menu;
}

test('overlay context menu rendering and interaction', async ({ mainPage }) => {
  await waitForAppReady(mainPage);
  const frame = await findHelloRock3Frame(mainPage);

  await test.step('opens with expected items on right-click in WebView', async () => {
    const menu = await openContextMenu(mainPage, frame);

    // Verify expected menu items from hello-rock3's contextMenu contributions
    await expect(menu.getByRole('menuitem', { name: 'Open Scripture Editor' })).toBeVisible();

    // Verify submenu trigger exists
    await expect(menu.locator('[role="menuitem"]', { hasText: 'More Actions' })).toBeVisible();

    // Clean up
    await mainPage.keyboard.press('Escape');
  });

  await test.step('dismissed on Escape key', async () => {
    const menu = await openContextMenu(mainPage, frame);

    await mainPage.keyboard.press('Escape');
    await expect(menu).not.toBeVisible({ timeout: 3_000 });
  });

  await test.step('submenu expands to show sub-items', async () => {
    const menu = await openContextMenu(mainPage, frame);

    // Move the mouse directly to the submenu trigger using low-level mouse.move().
    // This bypasses Radix DropdownMenu's tendency to detach/reattach portal elements
    // during Playwright's actionability-checked hover(), which causes "element not stable" errors.
    const submenuTrigger = menu.locator('[role="menuitem"]', { hasText: 'More Actions' });
    await expect(submenuTrigger).toBeVisible({ timeout: 3_000 });
    const box = await submenuTrigger.boundingBox();
    if (!box) throw new Error('Submenu trigger has no bounding box');
    await mainPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    // Submenu content appears (Radix portals it separately, creating a second [role="menu"])
    // The "More Actions" submenu contains "Say Hello" and "Show Alert"
    const submenu = mainPage.locator('[role="menu"]').filter({ hasText: 'Say Hello' });
    await expect(submenu).toBeVisible({ timeout: 5_000 });

    // Verify submenu items
    await expect(submenu.getByRole('menuitem', { name: 'Say Hello' })).toBeVisible();
    await expect(submenu.getByRole('menuitem', { name: 'Show Alert' })).toBeVisible();

    // Clean up
    await mainPage.keyboard.press('Escape');
  });

  await test.step('keyboard navigation highlights items', async () => {
    const menu = await openContextMenu(mainPage, frame);

    // Arrow down should highlight menu items (Radix sets data-highlighted attribute)
    await mainPage.keyboard.press('ArrowDown');
    const highlightedItem = menu.locator('[data-highlighted]');
    await expect(highlightedItem).toBeVisible({ timeout: 2_000 });

    // Arrow down again to move highlight to next item
    await mainPage.keyboard.press('ArrowDown');
    await expect(highlightedItem).toBeVisible();

    // Escape to dismiss
    await mainPage.keyboard.press('Escape');
    await expect(menu).not.toBeVisible({ timeout: 3_000 });
  });

  // This step is last because clicking "Open Scripture Editor" opens a new dock tab,
  // which could steal focus from the Hello Rock3 tab and break subsequent steps.
  await test.step('clicking a menu item dismisses the menu', async () => {
    const menu = await openContextMenu(mainPage, frame);

    // Click "Open Scripture Editor" - a simple action item
    await menu.getByRole('menuitem', { name: 'Open Scripture Editor' }).click();

    // Menu should be dismissed after item selection
    await expect(menu).not.toBeVisible({ timeout: 5_000 });
  });
});
