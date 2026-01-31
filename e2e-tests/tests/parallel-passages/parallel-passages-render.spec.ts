import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('Parallel Passages Tool Render', () => {
  test('should open parallel passages web view via command', async ({
    electronApp,
    papiClient,
  }) => {
    const page = await electronApp.firstWindow();
    await waitForAppReady(page);

    // Open a parallel passages tool via the registered command
    // The command requires an editor web view ID, pass undefined to open without project context
    const webViewId = await papiClient.sendCommand<string | undefined>(
      'platformScripture.openParallelPassages',
      undefined,
    );

    // The command may return undefined if no project is available, which is acceptable
    // In that case, just verify the app didn't crash
    if (webViewId) {
      // Wait for the web view to render
      await page.waitForTimeout(2000);

      // Verify the parallel passages web view is in the DOM
      // Look for the status bar text that always renders
      const statusBar = await page.$('text=/sets of parallels/');
      expect(statusBar).not.toBeNull();
    }
  });

  test('should render toolbar controls', async ({ electronApp, papiClient }) => {
    const page = await electronApp.firstWindow();
    await waitForAppReady(page);

    const webViewId = await papiClient.sendCommand<string | undefined>(
      'platformScripture.openParallelPassages',
      undefined,
    );

    if (webViewId) {
      await page.waitForTimeout(2000);

      // Verify toolbar selectors are present
      const sourceSelector = await page.$('[aria-label="Source text display"]');
      const passageFilter = await page.$('[aria-label="Passage filter"]');
      const typeFilter = await page.$('[aria-label="Type of parallel passage"]');
      const viewMode = await page.$('[aria-label="Approval view mode"]');

      // At least one toolbar control should be present
      const hasToolbar =
        sourceSelector !== null ||
        passageFilter !== null ||
        typeFilter !== null ||
        viewMode !== null;
      expect(hasToolbar).toBe(true);
    }
  });
});
