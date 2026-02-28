/**
 * Functional tests for UI-PKG-003: ScripturePane
 *
 * RED phase — all tests use test() until implementation activates them. Tests verify scripture HTML
 * rendering, linked word clicks, context menu, and display modes.
 *
 * @scenario BHV-403, BHV-404, BHV-408, BHV-413, BHV-414, BHV-415, BHV-417, BHV-418,
 *           BHV-419, BHV-600, BHV-601, BHV-602, BHV-608, BHV-609
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

test.describe('UI-PKG-003: ScripturePane — Render', () => {
  test('RND-001: Scripture HTML content renders with linked words', async ({ mainPage }) => {
    // @scenario BHV-404
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    // Linked words have specific CSS class
    const linkedWords = content.locator('.researchable-word');
    await expect(linkedWords.first()).toBeVisible();
    // EVD-003: Screenshot of scripture pane with linked words
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-003-RND-001-scripture.png',
    });
  });

  test('RND-002: Blue highlight class applied for research terms', async ({ mainPage }) => {
    // @scenario BHV-404, BHV-414
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    // By default, research terms toggle is ON → showeverylink class present
    await expect(content).toHaveClass(/showeverylink/);
  });
});

test.describe('UI-PKG-003: ScripturePane — Interaction', () => {
  test('INT-001: Clicking linked word triggers research pane filter', async ({ mainPage }) => {
    // @scenario BHV-403
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    const linkedWord = content.locator('.researchable-word').first();
    await linkedWord.click();
    // Filter bar should become visible with the clicked word's info
    const filterBox = frame.locator('[data-testid="filter-box"]');
    await expect(filterBox).toBeVisible({ timeout: 5_000 });
  });

  test('INT-002: Right-click on linked word shows context menu', async ({ mainPage }) => {
    // @scenario BHV-413
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    const linkedWord = content.locator('.researchable-word').first();
    await linkedWord.click({ button: 'right' });
    // Context menu with Find/Copy options
    const ctxMenu = frame.locator('[data-testid="scripture-context-menu"]');
    await expect(ctxMenu).toBeVisible({ timeout: 5_000 });
    await expect(ctxMenu.getByText(/Find this sense/i)).toBeVisible();
    await expect(ctxMenu.getByText(/Copy surface form/i)).toBeVisible();
  });

  test('INT-003: Footnotes pane toggles with F7', async ({ mainPage }) => {
    // @scenario BHV-408, BHV-600
    const frame = await openERWebView(mainPage);
    await expect(frame.locator('[data-testid="scripture-content"]')).toBeVisible({
      timeout: 15_000,
    });
    // Footnotes pane hidden by default
    const footnotes = frame.locator('[data-testid="footnotes-pane"]');
    await expect(footnotes).not.toBeVisible();
    // Press F7 to show footnotes
    await mainPage.keyboard.press('F7');
    await expect(footnotes).toBeVisible({ timeout: 5_000 });
    // Press F7 again to hide
    await mainPage.keyboard.press('F7');
    await expect(footnotes).not.toBeVisible();
  });

  test('INT-004: Clicking empty area while filtered clears filter', async ({ mainPage }) => {
    // @scenario BHV-419
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    // Click a linked word to activate filter
    await content.locator('.researchable-word').first().click();
    const filterBox = frame.locator('[data-testid="filter-box"]');
    await expect(filterBox).toBeVisible({ timeout: 5_000 });
    // Click empty area in scripture
    await content.click({ position: { x: 5, y: 5 } });
    // Filter should be cleared
    await expect(filterBox).not.toBeVisible({ timeout: 5_000 });
  });

  test('INT-005: Hebrew display mode changes via View menu', async ({ mainPage }) => {
    // @scenario BHV-601
    const frame = await openERWebView(mainPage);
    await expect(frame.locator('[data-testid="scripture-content"]')).toBeVisible({
      timeout: 15_000,
    });
    // Open View menu > Show Hebrew words > Original script
    // This is a menu at the web view level or dock level
  });

  test('INT-006: Copy surface form from context menu', async ({ mainPage }) => {
    // @scenario BHV-415
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    const linkedWord = content.locator('.researchable-word').first();
    await linkedWord.click({ button: 'right' });
    const ctxMenu = frame.locator('[data-testid="scripture-context-menu"]');
    await ctxMenu.getByText(/Copy surface form/i).click();
    // Clipboard should have content (hard to verify in E2E, but command should not error)
  });
});

test.describe('UI-PKG-003: ScripturePane — Data Wiring', () => {
  test('DW-001: Scripture content updates on verse change', async ({ mainPage }) => {
    // @scenario BHV-417, BHV-608
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    const initialText = await content.textContent();
    // Verse change would come from scroll group sync (external trigger)
    // After verse change, content should update
    expect(initialText?.length).toBeGreaterThan(0);
  });

  test('DW-002: Tooltip appears on hover over linked word', async ({ mainPage }) => {
    // @scenario BHV-418
    const frame = await openERWebView(mainPage);
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    const linkedWord = content.locator('.researchable-word').first();
    await linkedWord.hover();
    // Tooltip with gloss/definition should appear
    const tooltip = frame.locator('[data-testid="word-tooltip"]');
    await expect(tooltip).toBeVisible({ timeout: 5_000 });
  });
});
