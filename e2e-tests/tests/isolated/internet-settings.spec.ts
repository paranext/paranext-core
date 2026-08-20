/**
 * E2E tests for the Internet & Connectivity settings UI.
 *
 * Covers:
 *
 * - Opening via profile popover
 * - Radio row visibility (2 active, 3 coming-soon with badges) and hover-revealed descriptions
 * - Reset and Save and restart button state (disabled when no changes, enabled after change)
 * - Reset restores original selection (buttons become disabled again)
 * - Developer section expand/collapse and its Production/Development radio buttons
 *
 * "Save and restart" is NOT tested here — it triggers a real app restart. onSaveAndRestart callback
 * wiring is covered by unit tests.
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import {
  descriptionTooltip,
  discardChangesButton,
  expandDeveloperSection,
  internetSettingsFrame,
  internetUseRadio,
  openInternetSettingsPanel,
  saveAndRestartButton,
  serverTypeRadio,
  waitForSettingsLoaded,
} from './internet-settings.page';

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
    // Lowercase "connectivity" — this is %internetSettings_webView_title_2%, and toContainText is
    // case-sensitive for plain strings.
    await expect(frame.locator('h2')).toContainText('Internet & connectivity');
    await expect(frame.locator('p').first()).toContainText('only apply to the Paratext app');
  });

  test('shows 2 active radio rows and 3 coming-soon rows with badges', async ({ mainPage }) => {
    const frame = await openInternetSettingsPanel(mainPage);
    await waitForSettingsLoaded(frame);

    // Both active rows have enabled radio buttons
    await expect(internetUseRadio(frame, 'Unrestricted')).toBeEnabled();
    await expect(
      internetUseRadio(frame, /Disable access to some Bible translation services/),
    ).toBeEnabled();

    // Each description still reaches the panel, but only as the screen-reader copy — never as body
    // copy, and no tooltip is open until the pointer settles on a row. (`sr-only` is a 1x1 clipped
    // box that Playwright counts as visible, so assert on element type rather than visibility.)
    const enabledDescription = /Allows Paratext to use the internet for all services/;
    await expect(frame.getByText(enabledDescription)).toHaveCount(1);
    await expect(frame.locator('p').filter({ hasText: enabledDescription })).toHaveCount(0);
    await expect(descriptionTooltip(frame)).toHaveCount(0);

    // Coming-soon rows have disabled radio buttons
    await expect(internetUseRadio(frame, /Disable ALL internet access/)).toBeDisabled();
    await expect(
      internetUseRadio(frame, /Block internet when in sensitive locations/),
    ).toBeDisabled();
    await expect(internetUseRadio(frame, /Configure proxy/)).toBeDisabled();

    // Three "Coming soon" badges appear
    await expect(frame.getByText('Coming soon')).toHaveCount(3);

    // The "Disabled options are planned for future updates" footer was removed (PT-4363): the
    // per-row "Coming soon" badges above already carry that meaning, and dropping the line keeps
    // the first-run wizard's Next button in view.
    await expect(frame.getByText(/Disabled options are planned for future updates/)).toHaveCount(0);
  });

  test('hovering a row reveals its description in a tooltip', async ({ mainPage }) => {
    const frame = await openInternetSettingsPanel(mainPage);
    await waitForSettingsLoaded(frame);

    // Nothing is revealed until the pointer settles on a row.
    await expect(descriptionTooltip(frame)).toHaveCount(0);

    // The whole row is the hover target, so hovering the radio button is enough.
    await internetUseRadio(frame, 'Unrestricted').hover();

    // toBeVisible, not just present: this is the assertion that would catch the tooltip painting
    // behind a higher-stacking ancestor.
    await expect(descriptionTooltip(frame)).toBeVisible();
    await expect(descriptionTooltip(frame)).toContainText(
      /Allows Paratext to use the internet for all services/,
    );
  });

  test('Reset and Save and restart are disabled until settings load and change is made', async ({
    mainPage,
  }) => {
    const frame = await openInternetSettingsPanel(mainPage);
    await waitForSettingsLoaded(frame);

    // Loaded and unmodified: both buttons are rendered but disabled.
    await expect(saveAndRestartButton(frame)).toBeDisabled();
    await expect(discardChangesButton(frame)).toBeDisabled();
  });

  test('selecting a different option enables Reset and Save and restart', async ({ mainPage }) => {
    const frame = await openInternetSettingsPanel(mainPage);
    await waitForSettingsLoaded(frame);

    // Default is VpnRequired; clicking Unrestricted (option 1) makes a change.
    await internetUseRadio(frame, 'Unrestricted').click();

    await expect(saveAndRestartButton(frame)).toBeEnabled();
    await expect(discardChangesButton(frame)).toBeEnabled();
  });

  test('Reset button restores original selection and disables both buttons', async ({
    mainPage,
  }) => {
    const frame = await openInternetSettingsPanel(mainPage);
    await waitForSettingsLoaded(frame);

    // Change selection
    await internetUseRadio(frame, 'Unrestricted').click();
    await expect(saveAndRestartButton(frame)).toBeEnabled();

    // Click Reset — should restore original state
    await discardChangesButton(frame).click();

    // Both buttons become disabled again (no unsaved changes)
    await expect(saveAndRestartButton(frame)).toBeDisabled({ timeout: 5_000 });
    await expect(discardChangesButton(frame)).toBeDisabled();
  });

  test('developer section is collapsed by default and expands on click', async ({ mainPage }) => {
    const frame = await openInternetSettingsPanel(mainPage);
    await waitForSettingsLoaded(frame);

    // Server radios are not visible initially
    await expect(serverTypeRadio(frame, 'production')).not.toBeVisible({ timeout: 5_000 });

    await expandDeveloperSection(frame);

    // Server radios become visible
    await expect(serverTypeRadio(frame, 'production')).toBeVisible({ timeout: 5_000 });
    await expect(serverTypeRadio(frame, 'development')).toBeVisible();
    await expect(serverTypeRadio(frame, 'test')).toBeVisible();
    // They are radio buttons, not the toggle-group pills this section used to render.
    await expect(serverTypeRadio(frame, 'production')).toHaveRole('radio');
    await expect(serverTypeRadio(frame, 'development')).toHaveRole('radio');
    await expect(serverTypeRadio(frame, 'test')).toHaveRole('radio');
  });
});
