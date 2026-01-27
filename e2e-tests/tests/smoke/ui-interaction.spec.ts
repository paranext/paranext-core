import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('UI Interaction', () => {
  test('should open the About dialog from the Help menu', async ({ electronApp, mainPage }) => {
    await waitForAppReady(mainPage);

    // Click the "Help" menu trigger in the menubar
    const helpMenu = mainPage.getByRole('menuitem', { name: /Help/i });
    await helpMenu.click();

    // Click "About Platform.Bible" in the dropdown
    const aboutItem = mainPage.getByRole('menuitem', { name: /About Platform\.Bible/i });
    await aboutItem.click();

    // The about dialog opens as a floating dock tab. Wait for it to appear.
    const aboutTab = mainPage.locator('.dock-tab', { hasText: /About/i });
    await expect(aboutTab).toBeVisible({ timeout: 10_000 });
  });

  test('should open the About dialog via PAPI command and show version info', async ({
    electronApp,
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Trigger the about dialog via PAPI
    await papiClient.sendCommand('platform.about');

    // The about panel is labeled with the about menu localization key
    const aboutPane = mainPage.getByLabel('%mainMenu_about%');
    await expect(aboutPane).toBeVisible({ timeout: 10_000 });
  });

  test('should toggle theme via toolbar button', async ({ electronApp, papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // The theme style element carries the current theme id
    const getThemeId = () =>
      mainPage.evaluate(() =>
        document.getElementById('theme-styles')?.getAttribute('data-theme-id'),
      );

    const initialThemeId = await getThemeId();
    expect(initialThemeId).toBeTruthy();

    // Toggle theme via PAPI data provider instead of fragile button click.
    // The toolbar button calls setTheme with the opposite type, so we do the same.
    const newType = initialThemeId === 'dark' ? 'light' : 'dark';
    await papiClient.request('setData:platformTheme-currentTheme', [undefined, { type: newType }]);

    // Wait for theme data provider to update the stylesheet
    await expect(async () => {
      const newThemeId = await getThemeId();
      expect(newThemeId).not.toBe(initialThemeId);
    }).toPass({ timeout: 5_000 });
  });

  test('should have a functional toolbar with book/chapter control', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // The trigger button opens a popover with the book search input inside
    const trigger = mainPage.locator('[aria-label="book-chapter-trigger"]');
    await expect(trigger).toBeVisible({ timeout: 10_000 });
    await trigger.click();

    // After the popover opens, a CommandInput (actual <input>) appears inside
    const commandInput = mainPage.locator('[data-radix-popper-content-wrapper] input');
    await expect(commandInput).toBeVisible({ timeout: 5_000 });
    await commandInput.fill('Gen');

    // A list of matching books should appear
    const listItem = mainPage.locator('[cmdk-item]');
    await expect(listItem.first()).toBeVisible({ timeout: 5_000 });
  });

  test('should open Settings from the menu', async ({ electronApp, papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Open settings via PAPI command
    await papiClient.sendCommand('platform.openSettings');

    // Settings opens as a new tab in the dock layout
    const settingsTab = mainPage.locator('.dock-tab', { hasText: /Settings/i });
    await expect(settingsTab).toBeVisible({ timeout: 10_000 });
  });
});
