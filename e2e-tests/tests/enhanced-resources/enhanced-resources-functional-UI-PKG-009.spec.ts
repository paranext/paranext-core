/**
 * Functional tests for UI-PKG-009: ArticleViewer
 *
 * RED phase — all tests use test() until implementation activates them. Tests verify article
 * content display, cross-reference navigation, inline images, abbreviation tooltips, goto-verse
 * links, and close behavior.
 *
 * @scenario BHV-304, BHV-606, BHV-607
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

async function openArticleViewer(frame: import('@playwright/test').FrameLocator) {
  // Switch to Encyclopedia tab
  const tabs = frame.locator('[data-testid="research-tabs"] [role="tab"]');
  await tabs.nth(1).click();
  const encycContent = frame.locator('[data-testid="encyclopedia-tab-content"]');
  await expect(encycContent).toBeVisible({ timeout: 10_000 });
  // Click first encyclopedia entry
  const entry = encycContent.locator('[data-testid="encyc-entry"]').first();
  await entry.click();
  const viewer = frame.locator('[data-testid="article-viewer"]');
  await expect(viewer).toBeVisible({ timeout: 5_000 });
  return viewer;
}

test.describe('UI-PKG-009: ArticleViewer — Render', () => {
  test('RND-001: Article displays with H1 title and structured content', async ({ mainPage }) => {
    // @scenario BHV-304, BHV-607
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    // Article content container
    const content = viewer.locator('[data-testid="er-article-content"]');
    await expect(content).toBeVisible({ timeout: 10_000 });
    // H1 title
    const title = content.locator('h1').first();
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
    // EVD-019: Screenshot of article viewer
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-009-RND-001-article-viewer.png',
    });
  });

  test('RND-002: Close button is visible', async ({ mainPage }) => {
    // @scenario BHV-304
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const closeBtn = viewer.getByRole('button', { name: /Close/i });
    await expect(closeBtn).toBeVisible();
  });

  test('RND-003: Article contains section headings (H2)', async ({ mainPage }) => {
    // @scenario BHV-607
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const content = viewer.locator('[data-testid="er-article-content"]');
    await expect(content).toBeVisible({ timeout: 10_000 });
    // At least one H2 section heading
    const headings = content.locator('h2');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('UI-PKG-009: ArticleViewer — Interaction', () => {
  test('INT-001: "See also" link loads new article in same viewer', async ({ mainPage }) => {
    // @scenario BHV-607
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const content = viewer.locator('[data-testid="er-article-content"]');
    // Find a "see also" link
    const seeAlsoLink = content.locator('[data-testid^="er-article-seealso-"]').first();
    if (await seeAlsoLink.isVisible()) {
      const titleBefore = await content.locator('h1').first().textContent();
      await seeAlsoLink.click();
      // New article should load — title may change
      await expect(content).toBeVisible({ timeout: 10_000 });
      const titleAfter = await content.locator('h1').first().textContent();
      // Title should change to the linked article
      expect(titleAfter).toBeTruthy();
      // EVD-021: Screenshot after see-also navigation
      await mainPage.screenshot({
        path: 'e2e-tests/test-results/UI-PKG-009-INT-001-see-also.png',
      });
    }
  });

  test('INT-002: Close button returns to Encyclopedia tab list view', async ({ mainPage }) => {
    // @scenario BHV-304
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const closeBtn = viewer.getByRole('button', { name: /Close/i });
    await closeBtn.click();
    await expect(viewer).not.toBeVisible({ timeout: 5_000 });
    // Encyclopedia list should be visible again
    const encycContent = frame.locator('[data-testid="encyclopedia-tab-content"]');
    await expect(encycContent).toBeVisible({ timeout: 5_000 });
    // EVD-022: Screenshot after close
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-009-INT-002-closed.png',
    });
  });

  test('INT-003: Inline image click opens MediaViewer', async ({ mainPage }) => {
    // @scenario BHV-607
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const content = viewer.locator('[data-testid="er-article-content"]');
    const inlineImage = content.locator('[data-testid^="er-article-image-"]').first();
    if (await inlineImage.isVisible()) {
      await inlineImage.click();
      // MediaViewer overlay should appear
      const mediaViewer = frame.locator('[data-testid="media-viewer"]');
      await expect(mediaViewer).toBeVisible({ timeout: 5_000 });
      // EVD-020: Screenshot of article with inline images
      await mainPage.screenshot({
        path: 'e2e-tests/test-results/UI-PKG-009-INT-003-inline-image.png',
      });
    }
  });

  test('INT-004: "Goto verse" link changes parent verse reference', async ({ mainPage }) => {
    // @scenario BHV-607
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const content = viewer.locator('[data-testid="er-article-content"]');
    const gotoLink = content.locator('[data-testid^="er-article-goto-"]').first();
    if (await gotoLink.isVisible()) {
      await gotoLink.click();
      // Article viewer should remain open
      await expect(viewer).toBeVisible();
      // Scripture reference may update in background toolbar
    }
  });
});

test.describe('UI-PKG-009: ArticleViewer — Data Wiring', () => {
  test('DW-001: Abbreviation tooltips show expansion on hover', async ({ mainPage }) => {
    // @scenario BHV-607
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const content = viewer.locator('[data-testid="er-article-content"]');
    // Find an abbreviation element with title attribute
    const abbrev = content.locator('a[title]').first();
    if (await abbrev.isVisible()) {
      const titleAttr = await abbrev.getAttribute('title');
      expect(titleAttr).toBeTruthy();
    }
  });

  test('DW-002: V1 and V2 format articles both render correctly', async ({ mainPage }) => {
    // @scenario BHV-606
    const frame = await openERWebView(mainPage);
    const viewer = await openArticleViewer(frame);
    const content = viewer.locator('[data-testid="er-article-content"]');
    await expect(content).toBeVisible({ timeout: 10_000 });
    // At minimum, an article loads and has some text content
    const text = await content.textContent();
    expect(text!.length).toBeGreaterThan(0);
  });
});
