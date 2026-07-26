/**
 * E2E tests for the Internet & Connectivity settings UI.
 *
 * Covers:
 *
 * - Opening via profile popover
 * - Radio row visibility (2 active with descriptions, 3 coming-soon with badges)
 * - Reset and Save and restart button state (disabled when no changes, enabled after change)
 * - Reset restores original selection (buttons become disabled again)
 * - Developer section expand/collapse
 *
 * "Save and restart" is NOT tested here — it triggers a real app restart. onSaveAndRestart callback
 * wiring is covered by unit tests.
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { internetSettingsFrame, openInternetSettings } from './internet-settings.page';

test.describe('Internet & Connectivity settings', () => {
  test('profile popover shows "Internet and connectivity" label and opens settings panel', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await mainPage.getByTestId('user-profile-popover-trigger').click();

    // The button label should read "Internet and connectivity" (not "Network settings")
    await expect(mainPage.getByTestId('user-profile-action-network')).toContainText(
      'Internet and connectivity',
    );

    await mainPage.getByTestId('user-profile-action-network').click();

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });
    await expect(frame.locator('h2')).toContainText('Internet & Connectivity');
    await expect(frame.locator('p').first()).toContainText('only apply to the Paratext app');
  });

  test('shows 2 active radio rows with descriptions and 3 coming-soon rows with badges', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    // Active rows have enabled radio buttons
    await expect(frame.getByRole('radio', { name: 'Unrestricted' })).toBeEnabled({
      timeout: 10_000,
    });
    await expect(
      frame.getByRole('radio', { name: /Disable access to some Bible translation services/ }),
    ).toBeEnabled();

    // Active rows have always-visible description text (no hover required)
    await expect(
      frame.getByText(/Allows Paratext to use the internet for all services/),
    ).toBeVisible();
    await expect(frame.getByText(/Disables access to Registry, Send\/Receive/)).toBeVisible();

    // Coming-soon rows have disabled radio buttons
    await expect(frame.getByRole('radio', { name: /Disable ALL internet access/ })).toBeDisabled();
    await expect(
      frame.getByRole('radio', { name: /Block internet when in sensitive locations/ }),
    ).toBeDisabled();
    await expect(frame.getByRole('radio', { name: /Configure proxy/ })).toBeDisabled();

    // Three "Coming soon" badges appear
    await expect(frame.getByText('Coming soon')).toHaveCount(3);

    // Footer text is present
    await expect(frame.getByText(/Disabled options are planned for future updates/)).toBeVisible();
  });

  test('Reset and Save and restart are disabled until settings load and change is made', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    // Wait for the form to finish loading (buttons become present but disabled)
    const saveButton = frame.getByRole('button', { name: 'Save and restart' });
    const resetButton = frame.getByRole('button', { name: 'Reset' });

    await expect(saveButton).toBeDisabled({ timeout: 10_000 });
    await expect(resetButton).toBeDisabled();
  });

  test('selecting a different option enables Reset and Save and restart', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    const saveButton = frame.getByRole('button', { name: 'Save and restart' });
    const resetButton = frame.getByRole('button', { name: 'Reset' });
    await expect(saveButton).toBeDisabled({ timeout: 10_000 });

    // Default is VpnRequired; clicking Unrestricted (option 1) makes a change.
    await frame.getByRole('radio', { name: 'Unrestricted' }).click();

    await expect(saveButton).toBeEnabled();
    await expect(resetButton).toBeEnabled();
  });

  test('Reset button restores original selection and disables both buttons', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    const saveButton = frame.getByRole('button', { name: 'Save and restart' });
    const resetButton = frame.getByRole('button', { name: 'Reset' });
    await expect(saveButton).toBeDisabled({ timeout: 10_000 });

    // Change selection
    await frame.getByRole('radio', { name: 'Unrestricted' }).click();
    await expect(saveButton).toBeEnabled();

    // Click Reset — should restore original state
    await resetButton.click();

    // Both buttons become disabled again (no unsaved changes)
    await expect(saveButton).toBeDisabled({ timeout: 5_000 });
    await expect(resetButton).toBeDisabled();
  });

  test('developer section is collapsed by default and expands on click', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });

    // Toggle items are not visible initially
    await expect(frame.getByTestId('server-type-production')).not.toBeVisible({ timeout: 5_000 });

    // Click the Developer only header
    await frame.getByRole('button', { name: /Developer only/ }).click();

    // Toggle items become visible
    await expect(frame.getByTestId('server-type-production')).toBeVisible({ timeout: 5_000 });
    await expect(frame.getByTestId('server-type-development')).toBeVisible();
  });
});
