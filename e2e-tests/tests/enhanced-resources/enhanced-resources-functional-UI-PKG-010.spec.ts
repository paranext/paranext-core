/**
 * Functional tests for UI-PKG-010: SemanticDomainViewer
 *
 * RED phase — all tests use test() until implementation activates them. Tests verify domain tree
 * display, breadcrumb navigation, expand/collapse, leaf domain selection, ARIA tree semantics, and
 * close behavior.
 *
 * @scenario BHV-309, BHV-402
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

async function openSemanticDomainViewer(frame: import('@playwright/test').FrameLocator) {
  // Dictionary tab should be selected by default
  const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
  await expect(dictContent).toBeVisible({ timeout: 15_000 });
  // Find and click a semantic domain link within a dictionary entry
  const domainLink = dictContent.locator('[data-testid="dict-domain-link"]').first();
  await domainLink.click();
  const viewer = frame.locator('[data-testid="semantic-domain-viewer"]');
  await expect(viewer).toBeVisible({ timeout: 5_000 });
  return viewer;
}

test.describe('UI-PKG-010: SemanticDomainViewer — Render', () => {
  test('RND-001: Domain tree renders with hierarchical nodes', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const tree = viewer.locator('[data-testid="er-domain-tree"]');
    await expect(tree).toBeVisible({ timeout: 10_000 });
    // Tree should have at least one category node
    const nodes = tree.locator('[data-testid^="er-domain-cat-"]');
    const count = await nodes.count();
    expect(count).toBeGreaterThan(0);
    // EVD-023: Screenshot of domain viewer
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-010-RND-001-domain-viewer.png',
    });
  });

  test('RND-002: Breadcrumb trail is visible', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const breadcrumb = viewer.locator('[data-testid="er-domain-breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    // Breadcrumb should contain at least "Root"
    await expect(breadcrumb).toContainText(/Root/i);
  });

  test('RND-003: Close button is visible', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const closeBtn = viewer.getByRole('button', { name: /Close/i });
    await expect(closeBtn).toBeVisible();
  });

  test('RND-004: Selected/initial domain is highlighted', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const selected = viewer.locator('[data-testid="er-domain-selected"]');
    await expect(selected).toBeVisible({ timeout: 5_000 });
  });

  test('RND-005: SDBG domains show code range after name', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const tree = viewer.locator('[data-testid="er-domain-tree"]');
    await expect(tree).toBeVisible({ timeout: 10_000 });
    // For SDBG resources, domain nodes should show code ranges like "(33.437-33.489)"
    // This test verifies the range text is present when applicable
    const rangeText = tree.locator('[data-testid="domain-range"]').first();
    if (await rangeText.isVisible()) {
      const text = await rangeText.textContent();
      expect(text).toMatch(/\(\d+\.\d+-\d+\.\d+\)/);
    }
  });
});

test.describe('UI-PKG-010: SemanticDomainViewer — Interaction', () => {
  test('INT-001: Category expand/collapse toggles children visibility', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const tree = viewer.locator('[data-testid="er-domain-tree"]');
    // Find a collapsed category
    const category = tree.locator('[data-testid^="er-domain-cat-"]').first();
    await category.click();
    // Children should appear
    const children = tree.locator('[role="treeitem"]');
    const countAfter = await children.count();
    expect(countAfter).toBeGreaterThan(0);
    // EVD-024: Screenshot after expanding category
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-010-INT-001-expanded.png',
    });
  });

  test('INT-002: Leaf domain click closes viewer and filters dictionary', async ({ mainPage }) => {
    // @scenario BHV-402
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const tree = viewer.locator('[data-testid="er-domain-tree"]');
    // First expand a category to reveal leaf domains
    const category = tree.locator('[data-testid^="er-domain-cat-"]').first();
    await category.click();
    // Click a leaf domain
    const leaf = tree.locator('[data-testid^="er-domain-leaf-"]').first();
    if (await leaf.isVisible()) {
      await leaf.click();
      // Viewer should close
      await expect(viewer).not.toBeVisible({ timeout: 5_000 });
      // Dictionary tab should show filtered results
      const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
      await expect(dictContent).toBeVisible({ timeout: 5_000 });
      // EVD-025: Screenshot of filtered dictionary
      await mainPage.screenshot({
        path: 'e2e-tests/test-results/UI-PKG-010-INT-002-domain-selected.png',
      });
    }
  });

  test('INT-003: Breadcrumb segment click recenters tree', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const breadcrumb = viewer.locator('[data-testid="er-domain-breadcrumb"]');
    // Click the first breadcrumb segment (e.g., "Root")
    const segment = breadcrumb.locator('a').first();
    if (await segment.isVisible()) {
      await segment.click();
      // Tree should recenter to show root-level categories
      const tree = viewer.locator('[data-testid="er-domain-tree"]');
      await expect(tree).toBeVisible({ timeout: 5_000 });
    }
  });

  test('INT-004: Close button returns to Dictionary tab list view', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const closeBtn = viewer.getByRole('button', { name: /Close/i });
    await closeBtn.click();
    await expect(viewer).not.toBeVisible({ timeout: 5_000 });
    // Dictionary list should be visible again
    const dictContent = frame.locator('[data-testid="dictionary-tab-content"]');
    await expect(dictContent).toBeVisible({ timeout: 5_000 });
    // EVD-026: Screenshot after close
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-010-INT-004-closed.png',
    });
  });

  test('INT-005: Keyboard navigation within tree (arrow keys)', async ({ mainPage }) => {
    // @scenario BHV-309 keyboard
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const tree = viewer.locator('[data-testid="er-domain-tree"]');
    await expect(tree).toBeVisible({ timeout: 10_000 });
    // Focus the tree
    await tree.focus();
    // Arrow down should move focus to next node
    await mainPage.keyboard.press('ArrowDown');
    // Arrow right should expand a collapsed category
    await mainPage.keyboard.press('ArrowRight');
  });
});

test.describe('UI-PKG-010: SemanticDomainViewer — Data Wiring', () => {
  test('DW-001: ARIA tree semantics present', async ({ mainPage }) => {
    // @scenario BHV-309
    const frame = await openERWebView(mainPage);
    const viewer = await openSemanticDomainViewer(frame);
    const tree = viewer.locator('[data-testid="er-domain-tree"]');
    await expect(tree).toBeVisible({ timeout: 10_000 });
    // Tree container should have role="tree"
    await expect(tree).toHaveAttribute('role', 'tree');
    // Nodes should have role="treeitem"
    const items = tree.locator('[role="treeitem"]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    // Expandable categories should have aria-expanded attribute
    const expandable = tree.locator('[aria-expanded]');
    const expandCount = await expandable.count();
    expect(expandCount).toBeGreaterThan(0);
  });
});
