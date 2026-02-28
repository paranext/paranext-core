/**
 * Functional tests for UI-PKG-002: MarbleFormLayout
 *
 * RED phase — all tests use test.fixme() until implementation activates them. Tests verify the main
 * split-pane layout, tab container, and state persistence.
 *
 * @scenario BHV-400, BHV-401, BHV-405, BHV-409, BHV-605
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

const ER_MENU_LABEL = /Enhanced Resource/i;

/** Open an ER web view and return the frame locator */
async function openERWebView(mainPage: import('@playwright/test').Page) {
  await waitForAppReady(mainPage);
  const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
  await menuTrigger.click();
  await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
  await expect(mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL })).toBeVisible({
    timeout: 15_000,
  });
  return mainPage.frameLocator('iframe[title*="Enhanced Resource"]');
}

test.describe('UI-PKG-002: MarbleFormLayout — Render', () => {
  test.fixme(
    'RND-001: Main layout renders with split pane (scripture top, research bottom)',
    async ({ mainPage }) => {
      // @scenario BHV-400
      const frame = await openERWebView(mainPage);
      await expect(frame.locator('[data-testid="er-split-pane"]')).toBeVisible({
        timeout: 10_000,
      });
      await expect(frame.locator('[data-testid="scripture-pane-container"]')).toBeVisible();
      await expect(frame.locator('[data-testid="research-pane-container"]')).toBeVisible();
      // EVD-002: Screenshot of default layout
      await mainPage.screenshot({
        path: 'e2e-tests/test-results/UI-PKG-002-RND-001-layout.png',
      });
    },
  );

  test.fixme('RND-002: Tab container renders with 4 tab icons', async ({ mainPage }) => {
    // @scenario BHV-401
    const frame = await openERWebView(mainPage);
    const tabContainer = frame.locator('[data-testid="research-tabs"]');
    await expect(tabContainer).toBeVisible({ timeout: 10_000 });
    // 4 tabs: Dictionary, Encyclopedia, Media, Maps
    const tabButtons = tabContainer.locator('[role="tab"]');
    await expect(tabButtons).toHaveCount(4);
  });

  test.fixme('RND-003: Resizable split pane has draggable divider', async ({ mainPage }) => {
    // @scenario BHV-400
    const frame = await openERWebView(mainPage);
    const splitter = frame.locator('[data-testid="main-splitter"]');
    await expect(splitter).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('UI-PKG-002: MarbleFormLayout — Interaction', () => {
  test.fixme('INT-001: Dragging splitter changes pane proportions', async ({ mainPage }) => {
    // @scenario BHV-400
    const frame = await openERWebView(mainPage);
    const splitter = frame.locator('[data-testid="main-splitter"]');
    const box = await splitter.boundingBox();
    if (!box) throw new Error('Splitter not found');
    // Drag splitter down by 100px
    await mainPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await mainPage.mouse.down();
    await mainPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 100);
    await mainPage.mouse.up();
    // Verify position changed (research pane should be smaller)
    const newBox = await splitter.boundingBox();
    expect(newBox!.y).toBeGreaterThan(box.y);
  });

  test.fixme('INT-002: Zoom in/out works with Ctrl+Plus/Minus', async ({ mainPage }) => {
    // @scenario BHV-405
    const frame = await openERWebView(mainPage);
    const scripturePaneEl = frame.locator('[data-testid="scripture-pane-container"]');
    await expect(scripturePaneEl).toBeVisible({ timeout: 10_000 });
    // Zoom in
    await mainPage.keyboard.press('Control++');
    // Zoom out
    await mainPage.keyboard.press('Control+-');
    // Reset zoom
    await mainPage.keyboard.press('Control+0');
  });

  test.fixme('INT-003: Tab switching shows different tab content', async ({ mainPage }) => {
    // @scenario BHV-401
    const frame = await openERWebView(mainPage);
    const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
    // Click second tab (Encyclopedia)
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute('data-state', 'active');
  });
});

test.describe('UI-PKG-002: MarbleFormLayout — Data Wiring', () => {
  test.fixme('DW-001: Scripture content loads on open', async ({ mainPage }) => {
    // @scenario BHV-409
    const frame = await openERWebView(mainPage);
    // Scripture pane should have HTML content (not empty)
    const scriptureContent = frame.locator('[data-testid="scripture-content"]');
    await expect(scriptureContent).toBeVisible({ timeout: 15_000 });
    const text = await scriptureContent.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test.fixme('DW-002: State persisted across close/reopen via memento', async ({ mainPage }) => {
    // @scenario BHV-409 memento persistence
    const frame = await openERWebView(mainPage);
    // Click Encyclopedia tab
    const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
    await tabs.nth(1).click();
    // Close ER
    const closeBtn = mainPage.locator('.dock-tab >> text="×"').first();
    await closeBtn.click();
    // Reopen ER
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
    const frame2 = mainPage.frameLocator('iframe[title*="Enhanced Resource"]');
    // Encyclopedia tab should still be active
    const tabs2 = frame2.locator('[data-testid="research-tabs"] [role="tab"]');
    await expect(tabs2.nth(1)).toHaveAttribute('data-state', 'active');
  });
});
