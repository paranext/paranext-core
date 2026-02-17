import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('Creating Projects - Render Smoke Test', () => {
  test('should open Create New Project web view and render basic content', async ({
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Open the Create New Project dialog via PAPI command
    await papiClient.sendCommand('platformProjects.openProjectProperties');

    // Wait for the web view to render within the dock layout.
    // The project properties web view renders inside an iframe (web view container).
    // Look for the dock tab that contains the project properties title.
    const projectTab = mainPage.locator('.dock-tab', { hasText: /Create New Project/i });
    await expect(projectTab).toBeVisible({ timeout: 15_000 });

    // Verify the web view panel is present in the dock layout
    const dockPanel = mainPage.locator('.dock-panel', {
      has: mainPage.locator('iframe'),
    });
    await expect(dockPanel.first()).toBeVisible({ timeout: 10_000 });
  });
});
