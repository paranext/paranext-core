import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';

/**
 * Open the user-profile popover and return its "Internet & connectivity" action.
 *
 * The trigger toggles, so the click is only issued while the action is absent and then retried: a
 * click that lands before the toolbar button is interactive (or while a dock rebuild is putting the
 * overlay back up) leaves the popover shut, and a blind second click would close one that did
 * open.
 */
export async function openUserProfilePopover(mainPage: Page): Promise<Locator> {
  const action = mainPage.getByTestId('user-profile-action-network');
  await expect(async () => {
    if (!(await action.isVisible()))
      await mainPage.getByTestId('user-profile-popover-trigger').click({ timeout: 5_000 });
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

/** The two connectivity options that are actually selectable (the rest are "Coming soon"). */
export function selectableConnectivityOptions(frame: FrameLocator): {
  unrestricted: Locator;
  someServicesDisabled: Locator;
} {
  return {
    // %paratextRegistration_description_internetUse_option_Enabled_2%
    unrestricted: frame.getByRole('radio', { name: 'Unrestricted' }),
    // %paratextRegistration_description_internetUse_option_VpnRequired_2%
    someServicesDisabled: frame.getByRole('radio', {
      name: 'Disable access to some Bible translation services',
    }),
  };
}

/**
 * Select whichever of the two selectable connectivity options is not the current one, so the form
 * genuinely holds an unsaved change.
 *
 * Which one that is depends on the machine: these settings live in ParatextData's own storage and
 * are shared with any co-installed Paratext 9, so a developer box can legitimately start on either.
 * Clicking a fixed option would be a no-op wherever that option was already selected. Nothing here
 * is persisted — only "Save and restart" writes.
 *
 * @returns The radio that was selected before the click, so a test can assert a reset restores it
 */
export async function selectTheOtherConnectivityOption(frame: FrameLocator): Promise<Locator> {
  const { unrestricted, someServicesDisabled } = selectableConnectivityOptions(frame);
  await expect(unrestricted).toBeEnabled({ timeout: 10_000 });
  const startedUnrestricted = await unrestricted.isChecked();
  const original = startedUnrestricted ? unrestricted : someServicesDisabled;
  const target = startedUnrestricted ? someServicesDisabled : unrestricted;
  await target.click();
  await expect(target).toBeChecked();
  return original;
}
