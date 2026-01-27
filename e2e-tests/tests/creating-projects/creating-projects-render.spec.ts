import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('Creating Projects - Render Smoke Tests', () => {
  test('should open the New Project dialog via PAPI command', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Open the New Project dialog via PAPI command
    const webViewId = await papiClient.sendCommand<string | undefined>(
      'paratextProjectCreation.showNewProject',
    );

    expect(webViewId).toBeTruthy();

    // The dialog opens as a floating dock tab with title "New Project"
    const newProjectTab = mainPage.locator('.dock-tab', { hasText: /New Project/i });
    await expect(newProjectTab).toBeVisible({ timeout: 10_000 });
  });

  test('should render the General tab with form fields', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    await papiClient.sendCommand('paratextProjectCreation.showNewProject');

    // Wait for the web view content to load
    const webViewFrame = mainPage.frameLocator('iframe[title="New Project"]').first();

    // General tab should be visible by default with key form elements
    await expect(
      webViewFrame.getByRole('tab', { name: /General/i }).or(webViewFrame.getByText(/General/i)),
    ).toBeVisible({ timeout: 15_000 });

    // Take screenshot for evidence
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/creating-projects-general-tab.png',
    });
  });

  test('should render all expected tabs', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    await papiClient.sendCommand('paratextProjectCreation.showNewProject');

    const webViewFrame = mainPage.frameLocator('iframe[title="New Project"]').first();

    // Wait for tabs to render
    await expect(
      webViewFrame.getByRole('tab', { name: /General/i }).or(webViewFrame.getByText(/General/i)),
    ).toBeVisible({ timeout: 15_000 });

    // Check each expected tab exists
    const expectedTabs = ['General', 'Books', 'Associations', 'Notes', 'Advanced'];
    for (const tabName of expectedTabs) {
      const tab = webViewFrame
        .getByRole('tab', { name: new RegExp(tabName, 'i') })
        .or(webViewFrame.getByText(new RegExp(tabName, 'i')));
      await expect(tab).toBeVisible({ timeout: 5_000 });
    }
  });

  test('should not have console errors when dialog opens', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await papiClient.sendCommand('paratextProjectCreation.showNewProject');

    // Wait for dialog to fully render
    await mainPage.waitForTimeout(3000);

    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(
      (err) =>
        !err.includes('DevTools') &&
        !err.includes('source map') &&
        !err.includes('Failed to load resource') &&
        !err.includes('net::ERR_') &&
        !err.includes('localhost'),
    );

    if (criticalErrors.length > 0) {
      console.log('Critical console errors in New Project dialog:', criticalErrors);
    }

    expect(criticalErrors).toHaveLength(0);
  });

  test('should navigate between tabs without errors', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await papiClient.sendCommand('paratextProjectCreation.showNewProject');

    const webViewFrame = mainPage.frameLocator('iframe[title="New Project"]').first();

    // Wait for initial render
    await expect(
      webViewFrame.getByRole('tab', { name: /General/i }).or(webViewFrame.getByText(/General/i)),
    ).toBeVisible({ timeout: 15_000 });

    // Click through each tab
    const tabsToClick = ['Books', 'Advanced', 'General'];
    for (const tabName of tabsToClick) {
      const tab = webViewFrame
        .getByRole('tab', { name: new RegExp(tabName, 'i') })
        .or(webViewFrame.getByText(new RegExp(tabName, 'i')).first());
      await tab.click();
      await mainPage.waitForTimeout(500);
    }

    // Take screenshot after tab navigation
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/creating-projects-after-tabs.png',
    });

    // No new console errors from tab navigation
    const criticalErrors = consoleErrors.filter(
      (err) =>
        !err.includes('DevTools') &&
        !err.includes('source map') &&
        !err.includes('Failed to load resource') &&
        !err.includes('net::ERR_') &&
        !err.includes('localhost'),
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
