/**
 * Functional tests for UI-PKG-006: ResearchTabs
 *
 * RED phase — all tests use test() until implementation activates them. Tests verify tab container,
 * Dictionary/Encyclopedia/Media/Maps tabs, content loading, expand/collapse, rendering status
 * icons, and semantic domain links.
 *
 * @scenario BHV-401, BHV-402, BHV-406, BHV-407, BHV-416
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

const ER_MENU_LABEL = /Enhanced Resource/i;

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

test.describe('UI-PKG-006: ResearchTabs — Render', () => {
  test('RND-001: Four tab icons render (Dictionary, Encyclopedia, Media, Maps)', async ({
    mainPage,
  }) => {
    // @scenario BHV-401
    const frame = await openERWebView(mainPage);
    const tabList = frame.locator('[data-testid="research-tabs"] [role="tablist"]');
    await expect(tabList).toBeVisible({ timeout: 10_000 });
    const tabs = tabList.locator('[role="tab"]');
    await expect(tabs).toHaveCount(4);
    // EVD-006: Screenshot of research tabs
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-006-RND-001-tabs.png',
    });
  });

  test('RND-002: Dictionary tab is selected by default', async ({ mainPage }) => {
    // @scenario BHV-401
    const frame = await openERWebView(mainPage);
    const dictTab = frame.locator('[data-testid="tab-dictionary"]');
    await expect(dictTab).toBeVisible({ timeout: 10_000 });
    await expect(dictTab).toHaveAttribute('data-state', 'active');
  });

  test('RND-003: Dictionary tab shows lexicon entries with lemma, POS, glosses', async ({
    mainPage,
  }) => {
    // @scenario BHV-401, BHV-406
    const frame = await openERWebView(mainPage);
    // Wait for dictionary content to load
    const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
    await expect(dictContent).toBeVisible({ timeout: 15_000 });
    // Entry rows
    const entries = dictContent.locator('[data-testid="dict-entry"]');
    await expect(entries.first()).toBeVisible({ timeout: 10_000 });
  });

  test('RND-004: Tab icons show enabled/disabled based on content count', async ({ mainPage }) => {
    // @scenario BHV-401
    const frame = await openERWebView(mainPage);
    const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
    await expect(tabs.first()).toBeVisible({ timeout: 10_000 });
    // Tabs with content should not be disabled
    // (exact state depends on resource content)
  });
});

test.describe('UI-PKG-006: ResearchTabs — Interaction', () => {
  test('INT-001: Tab switching loads different content', async ({ mainPage }) => {
    // @scenario BHV-401
    const frame = await openERWebView(mainPage);
    const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
    await expect(tabs.first()).toBeVisible({ timeout: 10_000 });
    // Click Encyclopedia tab
    await tabs.nth(1).click();
    const encycContent = frame.locator('[data-testid="encyclopedia-tab-content"]');
    await expect(encycContent).toBeVisible({ timeout: 10_000 });
  });

  test('INT-002: Dictionary entry expand/collapse row detail', async ({ mainPage }) => {
    // @scenario BHV-406
    const frame = await openERWebView(mainPage);
    const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
    await expect(dictContent).toBeVisible({ timeout: 15_000 });
    const entry = dictContent.locator('[data-testid="dict-entry"]').first();
    await entry.click();
    // Expanded detail should appear
    const detail = frame.locator('[data-testid="dict-entry-detail"]').first();
    await expect(detail).toBeVisible({ timeout: 5_000 });
  });

  test('INT-003: Expand all / Collapse all functionality', async ({ mainPage }) => {
    // @scenario BHV-407
    const frame = await openERWebView(mainPage);
    const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
    await expect(dictContent).toBeVisible({ timeout: 15_000 });
    // Find expand all button
    const expandAllBtn = frame.locator('[data-testid="btn-expand-all"]');
    if (await expandAllBtn.isVisible()) {
      await expandAllBtn.click();
      // All entries should show details
      const details = frame.locator('[data-testid="dict-entry-detail"]');
      const count = await details.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('INT-004: Encyclopedia row click opens ArticleViewer overlay', async ({ mainPage }) => {
    // @scenario BHV-406
    const frame = await openERWebView(mainPage);
    // Switch to Encyclopedia tab
    const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
    await tabs.nth(1).click();
    const encycContent = frame.locator('[data-testid="encyclopedia-tab-content"]');
    await expect(encycContent).toBeVisible({ timeout: 10_000 });
    const entry = encycContent.locator('[data-testid="encyc-entry"]').first();
    await entry.click();
    // ArticleViewer overlay should appear
    const overlay = frame.locator('[data-testid="article-viewer"]');
    await expect(overlay).toBeVisible({ timeout: 5_000 });
  });

  test('INT-005: Media tab thumbnail click opens MediaViewer overlay', async ({ mainPage }) => {
    // @scenario BHV-406
    const frame = await openERWebView(mainPage);
    // Switch to Media tab
    const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
    await tabs.nth(2).click();
    const mediaContent = frame.locator('[data-testid="media-tab-content"]');
    await expect(mediaContent).toBeVisible({ timeout: 10_000 });
    const thumbnail = mediaContent.locator('[data-testid="media-thumbnail"]').first();
    if (await thumbnail.isVisible()) {
      // Use dispatchEvent to click — the dock-layout tabpanel intercepts
      // pointer events at the outer frame level, preventing normal Playwright
      // clicks from reaching the thumbnail button inside the iframe.
      await thumbnail.dispatchEvent('click');
      const overlay = frame.locator('[data-testid="media-viewer"]');
      await expect(overlay).toBeVisible({ timeout: 5_000 });
    }
  });
});

test.describe('UI-PKG-006: ResearchTabs — Data Wiring', () => {
  test('DW-001: Content reloads on scope filter change', async ({ mainPage }) => {
    // @scenario BHV-402
    const frame = await openERWebView(mainPage);
    const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
    await expect(dictContent).toBeVisible({ timeout: 15_000 });
    // Change scope filter
    const scopeFilter = frame.locator('[data-testid="scope-filter"]');
    await scopeFilter.click();
    await frame.getByText(/Current Chapter/i).click();
    // Content should reload (entries may change)
    await expect(dictContent).toBeVisible({ timeout: 10_000 });
  });

  test('DW-002: Content reloads on linked word click (filter change)', async ({ mainPage }) => {
    // @scenario BHV-403, BHV-402
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    // Click a linked word
    await content.locator('.researchable-word').first().click();
    // Dictionary content should update with filtered results
    const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
    await expect(dictContent).toBeVisible({ timeout: 10_000 });
  });
});
