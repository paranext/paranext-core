/**
 * E2E tests for the Internet & Connectivity settings UI.
 *
 * Covers:
 *
 * - Opening via profile popover
 * - Radio row visibility (3 active with descriptions, 1 coming-soon with a badge)
 * - Reset and Save and restart button state (disabled when no changes, enabled after change)
 * - Reset restores original selection (buttons become disabled again)
 * - Developer section expand/collapse
 *
 * "Save and restart" is NOT tested here — it triggers a real app restart. onSaveAndRestart callback
 * wiring is covered by unit tests.
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import {
  connectivityOptions,
  internetSettingsButtons,
  internetSettingsFrame,
  internetSettingsHeading,
  openInternetSettings,
  openUserProfilePopover,
  selectTheOtherConnectivityOption,
  waitForInternetSettingsPanel,
} from './internet-settings.page';

test.describe('Internet & Connectivity settings', () => {
  test('profile popover shows the "Internet & connectivity" label and opens settings panel', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // The button label is %userProfile_networkSettings_2% (superseding "Network settings")
    await expect(await openUserProfilePopover(mainPage)).toContainText('Internet & connectivity');

    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await waitForInternetSettingsPanel(frame);
    // %internetSettings_webView_title_2%
    await expect(internetSettingsHeading(frame)).toContainText('Internet & connectivity');
    await expect(frame.locator('p').first()).toContainText('only apply to the Paratext app');
  });

  test('shows 3 active radio rows with descriptions and 1 coming-soon row with a badge', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await waitForInternetSettingsPanel(frame);
    const { unrestricted, sensitiveLocations, allInternetDisabled, configureProxy } =
      connectivityOptions(frame);

    await expect(unrestricted).toBeEnabled({ timeout: 10_000 });
    await expect(sensitiveLocations).toBeEnabled();
    await expect(allInternetDisabled).toBeEnabled();
    await expect(configureProxy).toBeDisabled();

    // Descriptions render without hover, and each says what its option actually does
    await expect(
      frame.getByText(/Allows Paratext to use the internet for all services/),
    ).toBeVisible();
    // %paratextRegistration_description_internetUse_option_VpnRequired_details_2%
    await expect(
      frame.getByText(/Where that location is flagged as sensitive — or cannot be confirmed/),
    ).toBeVisible();
    // %paratextRegistration_description_internetUse_option_Disabled_details%
    await expect(
      frame.getByText(/Blocks all internet access within the Paratext app/),
    ).toBeVisible();

    await expect(frame.getByText('Coming soon')).toHaveCount(1);
    // %paratextRegistration_internetUse_footer_2%
    await expect(frame.getByText(/are planned for future updates/)).toBeVisible();
  });

  test('Reset and Save and restart are disabled until settings load and change is made', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await waitForInternetSettingsPanel(frame);

    // Wait for the form to finish loading (buttons become present but disabled)
    const { saveAndRestart, discardChanges } = internetSettingsButtons(frame);

    await expect(saveAndRestart).toBeDisabled({ timeout: 10_000 });
    await expect(discardChanges).toBeDisabled();
  });

  test('selecting a different option enables Reset and Save and restart', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await waitForInternetSettingsPanel(frame);

    const { saveAndRestart, discardChanges } = internetSettingsButtons(frame);
    await expect(saveAndRestart).toBeDisabled({ timeout: 10_000 });

    await selectTheOtherConnectivityOption(frame);

    await expect(saveAndRestart).toBeEnabled();
    await expect(discardChanges).toBeEnabled();
  });

  test('Reset button restores original selection and disables both buttons', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await waitForInternetSettingsPanel(frame);

    const { saveAndRestart, discardChanges } = internetSettingsButtons(frame);
    await expect(saveAndRestart).toBeDisabled({ timeout: 10_000 });

    // Change selection
    const originalOption = await selectTheOtherConnectivityOption(frame);
    await expect(originalOption).not.toBeChecked();
    await expect(saveAndRestart).toBeEnabled();

    // Click Reset — should restore original state
    await discardChanges.click();

    // The selection the panel loaded with comes back, and with no unsaved changes left both
    // buttons disable again. The selection assertion is what makes this a reset test rather than a
    // button-state test: clearing the dirty flag without restoring the radio would satisfy the
    // button assertions alone.
    await expect(originalOption).toBeChecked({ timeout: 5_000 });
    await expect(saveAndRestart).toBeDisabled({ timeout: 5_000 });
    await expect(discardChanges).toBeDisabled();
  });

  test('developer section is collapsed by default and expands on click', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openInternetSettings(mainPage);

    const frame = internetSettingsFrame(mainPage);
    await waitForInternetSettingsPanel(frame);

    // Toggle items are not visible initially
    await expect(frame.getByTestId('server-type-production')).not.toBeVisible({ timeout: 5_000 });

    // Click the Developer only header
    await frame.getByRole('button', { name: /Developer only/ }).click();

    // Toggle items become visible
    await expect(frame.getByTestId('server-type-production')).toBeVisible({ timeout: 5_000 });
    await expect(frame.getByTestId('server-type-quality-assurance')).toBeVisible();
    await expect(frame.getByTestId('server-type-development')).toBeVisible();
    await expect(frame.getByTestId('server-type-test')).toBeVisible();
  });
});
