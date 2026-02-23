/**
 * === NEW IN PT10 === Reason: Playwright render smoke test for the Select Texts dialog (SCR-002).
 * Verifies that the openSelectTexts command opens a web view containing the Select Texts component.
 * Maps to: UI-PKG-001
 */
import { test, expect } from '../../fixtures/app.fixture';
import { sendPapiCommand, waitForAppReady } from '../../fixtures/helpers';

test.describe('Text Collection - Select Texts Dialog', () => {
  test('should open Select Texts web view via PAPI command', async ({ mainPage }) => {
    // Wait for the platform UI to be fully ready
    await waitForAppReady(mainPage);

    // Open the Select Texts dialog via PAPI command
    const webViewId = await sendPapiCommand<string | undefined>(
      'platformScripture.openSelectTexts',
    );
    expect(webViewId).toBeTruthy();

    // Wait for the iframe with title "Select Texts" to appear in the DOM
    const selectTextsFrame = mainPage.frameLocator('iframe[title="Select Texts"]');
    const dialogTestId = selectTextsFrame.locator('[data-testid="select-texts-dialog"]');
    await expect(dialogTestId).toBeAttached({ timeout: 15_000 });
  });

  test('should render All and Selected labels', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await sendPapiCommand<string | undefined>('platformScripture.openSelectTexts');

    const selectTextsFrame = mainPage.frameLocator('iframe[title="Select Texts"]');

    // Verify the "All:" and "Selected:" labels are present
    const allLabel = selectTextsFrame.locator('text=All:');
    await expect(allLabel).toBeVisible({ timeout: 15_000 });

    const selectedLabel = selectTextsFrame.locator('text=Selected:');
    await expect(selectedLabel).toBeVisible({ timeout: 15_000 });
  });
});
