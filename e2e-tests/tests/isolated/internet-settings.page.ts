import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';
import { isPopoverTriggerExpanded } from '../../fixtures/helpers';

/**
 * Open the user-profile popover and return its "Internet & connectivity" action.
 *
 * The trigger toggles, so the click is only issued while the popover itself is closed and then
 * retried: a click that lands before the toolbar button is interactive (or while a dock rebuild is
 * putting the overlay back up) leaves the popover shut, and a blind second click would close one
 * that did open.
 *
 * Gated on the trigger's `aria-expanded` (see {@link isPopoverTriggerExpanded}), not on whether
 * `action` has rendered yet: the popover can be open with its content still mounting — the action's
 * own render, or a `PopoverContent` animation — so gating the click on the action's visibility
 * instead would read that in-between moment as "still closed" and re-click a popover that had, in
 * fact, just opened, closing the very thing this function is trying to open.
 */
export async function openUserProfilePopover(mainPage: Page): Promise<Locator> {
  const action = mainPage.getByTestId('user-profile-action-network');
  const trigger = mainPage.getByTestId('user-profile-popover-trigger');
  await expect(async () => {
    if (!isPopoverTriggerExpanded(await trigger.getAttribute('aria-expanded')))
      await trigger.click({ timeout: 5_000 });
    await expect(action).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 30_000 });
  return action;
}

/**
 * Opens the Internet & Connectivity settings panel from the profile popover.
 *
 * Retries the whole open-and-click, with the panel's own heading as the success condition: a dock
 * rebuild after startup re-renders the toolbar and takes the open popover down with it, so an
 * action button that was there a moment ago can be detached by the time the click lands. Reopening
 * is the recovery — the click cannot be retried against a popover that no longer exists.
 */
export async function openInternetSettings(mainPage: Page): Promise<void> {
  await expect(async () => {
    const action = await openUserProfilePopover(mainPage);
    await action.click({ timeout: 5_000 });
    await expect(internetSettingsFrame(mainPage).locator('h2')).toBeVisible({ timeout: 15_000 });
  }).toPass({ timeout: 90_000 });
}

/**
 * Returns a FrameLocator scoped to the internet settings web view iframe.
 *
 * Matched on the iframe's title attribute, case-insensitively and on the stable word alone: the web
 * view provider still names itself with the deprecated `%internetSettings_webView_title%`
 * ("Internet Settings") while its replacement key reads "Internet & connectivity", so anything
 * matching the full phrase or its capitalization breaks on whichever key wins.
 *
 * Does not wait for the panel to finish loading — callers should await a stable element (e.g.,
 * `frame.locator('h2').toBeVisible()`) before interacting with the frame.
 */
export function internetSettingsFrame(mainPage: Page): FrameLocator {
  return mainPage.frameLocator('iframe[title*="Internet" i]');
}

/** The panel's heading, which is also what says the web view has finished loading. */
export function internetSettingsHeading(frame: FrameLocator): Locator {
  return frame.locator('h2');
}

/** Waits for the panel to finish loading. Every test needs this before touching the form. */
export async function waitForInternetSettingsPanel(frame: FrameLocator): Promise<void> {
  await expect(internetSettingsHeading(frame)).toBeVisible({ timeout: 15_000 });
}

/** Every connectivity option, in the order the panel lists them. */
export function connectivityOptions(frame: FrameLocator): {
  unrestricted: Locator;
  sensitiveLocations: Locator;
  allInternetDisabled: Locator;
  configureProxy: Locator;
} {
  return {
    // %paratextRegistration_description_internetUse_option_Enabled_2%
    unrestricted: frame.getByRole('radio', { name: 'Unrestricted' }),
    // %paratextRegistration_description_internetUse_option_VpnRequired_3%
    sensitiveLocations: frame.getByRole('radio', {
      name: 'Block internet when in sensitive locations',
    }),
    // %paratextRegistration_description_internetUse_option_Disabled_2%
    allInternetDisabled: frame.getByRole('radio', { name: 'Disable all Internet access' }),
    // %paratextRegistration_description_internetUse_option_ProxyOnly_2%
    configureProxy: frame.getByRole('radio', { name: /Configure proxy/ }),
  };
}

/** The panel's form buttons. */
export function internetSettingsButtons(frame: FrameLocator): {
  saveAndRestart: Locator;
  discardChanges: Locator;
} {
  return {
    saveAndRestart: frame.getByRole('button', { name: 'Save and restart' }),
    discardChanges: frame.getByRole('button', { name: 'Discard changes' }),
  };
}

/**
 * The option the panel loaded with. Any of the four can be it: these settings live in
 * ParatextData's own machine-wide storage, shared with a co-installed Paratext 9, so a developer
 * box can start on a value no test would ever select.
 */
async function checkedConnectivityOption(frame: FrameLocator): Promise<Locator> {
  const options = Object.values(connectivityOptions(frame));
  const checkedStates = await Promise.all(options.map((option) => option.isChecked()));
  const checkedIndex = checkedStates.findIndex(Boolean);
  if (checkedIndex === -1)
    throw new Error('No connectivity option is selected; the panel may not have loaded.');
  return options[checkedIndex];
}

/**
 * Select a connectivity option other than the current one, so the form genuinely holds an unsaved
 * change. Clicking a fixed option would be a no-op wherever that option was already selected.
 *
 * Only toggles between "Unrestricted" and "Block internet when in sensitive locations". Selecting
 * "Disable all Internet access" would be one accidental save away from cutting ParatextData — and a
 * co-installed Paratext 9 — off the internet on the developer's machine. Nothing here is persisted;
 * only "Save and restart" writes.
 *
 * @returns The radio that was selected before the click, so a test can assert a reset restores it
 */
export async function selectTheOtherConnectivityOption(frame: FrameLocator): Promise<Locator> {
  const { unrestricted, sensitiveLocations } = connectivityOptions(frame);
  await expect(unrestricted).toBeEnabled({ timeout: 10_000 });
  const original = await checkedConnectivityOption(frame);
  const target = (await unrestricted.isChecked()) ? sensitiveLocations : unrestricted;
  await target.click();
  await expect(target).toBeChecked();
  return original;
}
