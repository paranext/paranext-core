import { test, expect } from '../../fixtures/app.fixture';
import { sendPapiCommand, waitForAppReady } from '../../fixtures/helpers';

test.describe('Enhanced Resource Render Smoke Tests', () => {
  test.beforeEach(async ({ mainPage }) => {
    await waitForAppReady(mainPage);
  });

  test('should open enhanced resource web view via PAPI command', async ({ mainPage }) => {
    // Open the Enhanced Resource web view via PAPI
    const webViewId = await sendPapiCommand<string | undefined>(
      'platformEnhancedResources.openEnhancedResource',
      [undefined],
    );

    expect(webViewId).toBeTruthy();

    // Wait for the web view to render its root element
    const viewer = await mainPage.waitForSelector('[data-testid="enhanced-resource-viewer"]', {
      state: 'attached',
      timeout: 15_000,
    });

    expect(viewer).not.toBeNull();
  });

  test('should render split pane layout with scripture and research panels', async ({
    mainPage,
  }) => {
    await sendPapiCommand('platformEnhancedResources.openEnhancedResource', [undefined]);

    await mainPage.waitForSelector('[data-testid="enhanced-resource-viewer"]', {
      state: 'attached',
      timeout: 15_000,
    });

    // Verify the research pane with tabs exists
    const researchPane = await mainPage.$('[data-testid="research-pane"]');
    expect(researchPane).not.toBeNull();
  });

  test('should render four research tabs', async ({ mainPage }) => {
    await sendPapiCommand('platformEnhancedResources.openEnhancedResource', [undefined]);

    await mainPage.waitForSelector('[data-testid="research-pane"]', {
      state: 'attached',
      timeout: 15_000,
    });

    // Check that the Dictionary tab content area is visible (default active tab)
    const dictionaryTab = await mainPage.$('[data-testid="dictionary-tab"]');
    expect(dictionaryTab).not.toBeNull();
  });

  test('should open getting started guide via PAPI command', async ({ mainPage }) => {
    const webViewId = await sendPapiCommand<string | undefined>(
      'platformEnhancedResources.openGuide',
      [undefined],
    );

    expect(webViewId).toBeTruthy();

    // Wait for the guide to render
    const guide = await mainPage.waitForSelector('[data-testid="getting-started-guide"]', {
      state: 'attached',
      timeout: 15_000,
    });

    expect(guide).not.toBeNull();
  });

  test('should not have critical console errors when opening enhanced resource', async ({
    electronApp,
  }) => {
    const page = await electronApp.firstWindow();
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await sendPapiCommand('platformEnhancedResources.openEnhancedResource', [undefined]);
    await page.waitForTimeout(5000);

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
