/**
 * Functional tests for UI-PKG-004: ERToolbar
 *
 * RED phase — all tests use test.fixme() until implementation activates them. Tests verify toolbar
 * buttons, highlight toggles, scope filter, tracked project, and overflow.
 *
 * @scenario BHV-402, BHV-403, BHV-404, BHV-412, BHV-414, BHV-604
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

test.describe('UI-PKG-004: ERToolbar — Render', () => {
  test.fixme(
    'RND-001: Toolbar renders with Research Terms toggle, project dropdown, and highlight buttons',
    async ({ mainPage }) => {
      // @scenario BHV-404, BHV-414
      const frame = await openERWebView(mainPage);
      const toolbar = frame.locator('[data-testid="er-toolbar"]');
      await expect(toolbar).toBeVisible({ timeout: 10_000 });
      // Research Terms toggle
      await expect(toolbar.locator('[data-testid="btn-research-terms"]')).toBeVisible();
      // Project dropdown
      await expect(toolbar.locator('[data-testid="tracked-project-dropdown"]')).toBeVisible();
      // Info icon
      await expect(toolbar.locator('[data-testid="info-icon-btn"]')).toBeVisible();
      // EVD-004: Screenshot of toolbar
      await mainPage.screenshot({
        path: 'e2e-tests/test-results/UI-PKG-004-RND-001-toolbar.png',
      });
    },
  );

  test.fixme(
    'RND-002: Found and Missing buttons disabled when no tracked project',
    async ({ mainPage }) => {
      // @scenario BHV-414
      const frame = await openERWebView(mainPage);
      const toolbar = frame.locator('[data-testid="er-toolbar"]');
      await expect(toolbar).toBeVisible({ timeout: 10_000 });
      // Without tracked project, Found and Missing should be disabled
      await expect(toolbar.locator('[data-testid="btn-found"]')).toBeDisabled();
      await expect(toolbar.locator('[data-testid="btn-missing"]')).toBeDisabled();
    },
  );

  test.fixme('RND-003: Scope filter dropdown defaults to "Current Verse"', async ({ mainPage }) => {
    // @scenario BHV-402
    const frame = await openERWebView(mainPage);
    const scopeFilter = frame.locator('[data-testid="scope-filter"]');
    await expect(scopeFilter).toBeVisible({ timeout: 10_000 });
    await expect(scopeFilter).toContainText(/Current Verse/i);
  });
});

test.describe('UI-PKG-004: ERToolbar — Interaction', () => {
  test.fixme(
    'INT-001: Research Terms toggle controls blue highlight CSS class',
    async ({ mainPage }) => {
      // @scenario BHV-414
      const frame = await openERWebView(mainPage);
      const btnRT = frame.locator('[data-testid="btn-research-terms"]');
      await expect(btnRT).toBeVisible({ timeout: 10_000 });
      // Default: ON
      await expect(btnRT).toHaveAttribute('data-state', 'on');
      // Click to turn OFF
      await btnRT.click();
      await expect(btnRT).toHaveAttribute('data-state', 'off');
      // Scripture pane should lose showeverylink class
      const content = frame.locator('[data-testid="scripture-content"]');
      await expect(content).not.toHaveClass(/showeverylink/);
    },
  );

  test.fixme('INT-002: Scope filter changes reload research tab content', async ({ mainPage }) => {
    // @scenario BHV-402
    const frame = await openERWebView(mainPage);
    const scopeFilter = frame.locator('[data-testid="scope-filter"]');
    await expect(scopeFilter).toBeVisible({ timeout: 10_000 });
    await scopeFilter.click();
    // Select "Current Chapter"
    const chapterOption = frame.getByText(/Current Chapter/i);
    await chapterOption.click();
    await expect(scopeFilter).toContainText(/Current Chapter/i);
  });

  test.fixme('INT-003: Info icon click toggles guide panel', async ({ mainPage }) => {
    // @scenario BHV-604
    const frame = await openERWebView(mainPage);
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    await expect(infoBtn).toBeVisible({ timeout: 10_000 });
    await infoBtn.click();
    // Guide content should become visible
    const guidePanel = frame.locator('[data-testid="guide-panel"]');
    await expect(guidePanel).toBeVisible({ timeout: 5_000 });
  });

  test.fixme('INT-004: Clear filter button clears active word filter', async ({ mainPage }) => {
    // @scenario BHV-403
    const frame = await openERWebView(mainPage);
    // First activate a filter by clicking a linked word
    const content = frame.locator('[data-testid="scripture-content"]');
    await expect(content).toBeVisible({ timeout: 15_000 });
    await content.locator('.researchable-word').first().click();
    const clearBtn = frame.locator('[data-testid="btn-clear-filter"]');
    await expect(clearBtn).toBeVisible({ timeout: 5_000 });
    await clearBtn.click();
    await expect(clearBtn).not.toBeVisible({ timeout: 5_000 });
  });

  test.fixme(
    'INT-005: Tracked project selection enables Found/Missing toggles',
    async ({ mainPage }) => {
      // @scenario BHV-414
      const frame = await openERWebView(mainPage);
      const dropdown = frame.locator('[data-testid="tracked-project-dropdown"]');
      await expect(dropdown).toBeVisible({ timeout: 10_000 });
      // Select a project
      await dropdown.click();
      const projectOption = frame.locator('[role="option"]').first();
      await projectOption.click();
      // Found and Missing should now be enabled
      await expect(frame.locator('[data-testid="btn-found"]')).toBeEnabled();
      await expect(frame.locator('[data-testid="btn-missing"]')).toBeEnabled();
    },
  );
});

test.describe('UI-PKG-004: ERToolbar — Data Wiring', () => {
  test.fixme(
    'DW-001: Filter box shows green when results found, orange when zero',
    async ({ mainPage }) => {
      // @scenario BHV-403
      const frame = await openERWebView(mainPage);
      const content = frame.locator('[data-testid="scripture-content"]');
      await expect(content).toBeVisible({ timeout: 15_000 });
      await content.locator('.researchable-word').first().click();
      const filterBox = frame.locator('[data-testid="filter-box"]');
      await expect(filterBox).toBeVisible({ timeout: 5_000 });
      // Check data-state attribute for result status (green = results, orange = none)
      const state = await filterBox.getAttribute('data-state');
      expect(state).toBeTruthy();
    },
  );
});
