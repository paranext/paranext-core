import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';
import { isPopoverTriggerExpanded, waitForAppReady } from '../../fixtures/helpers';

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

/**
 * Waits for the app, opens the settings panel, and returns the frame, ready to interact with. This
 * is the entry point for every test that starts from an open panel; use the lower-level helpers
 * above only when a test needs to assert on something before or during opening.
 */
export async function openInternetSettingsPanel(mainPage: Page): Promise<FrameLocator> {
  await waitForAppReady(mainPage);
  await openInternetSettings(mainPage);
  return internetSettingsFrame(mainPage);
}

/** A radio button in the internet-access option list, by its visible label. */
export function internetUseRadio(frame: FrameLocator, label: string | RegExp): Locator {
  return frame.getByRole('radio', { name: label });
}

/**
 * The description tooltip revealed by hovering an option row. Each description lives here rather
 * than in always-visible body copy, so an empty locator means nothing is currently revealed.
 *
 * Targets the visible content, NOT `getByRole('tooltip')` — Radix puts that role on a
 * visually-hidden copy it renders for screen readers, so a role query would match even when the
 * tooltip is painted behind something and invisible.
 */
export function descriptionTooltip(frame: FrameLocator): Locator {
  return frame.locator('[data-slot="tooltip-content"]');
}

/** The "Save and restart" button. Disabled until the form has unsaved changes. */
export function saveAndRestartButton(frame: FrameLocator): Locator {
  return frame.getByRole('button', { name: 'Save and restart' });
}

/** The "Discard changes" button. Disabled until the form has unsaved changes. */
export function discardChangesButton(frame: FrameLocator): Locator {
  return frame.getByRole('button', { name: 'Discard changes' });
}

/**
 * Waits for the initial settings fetch to finish.
 *
 * Gated on an active radio becoming enabled, which is only true once loading ends — the form passes
 * `isFormDisabled` (true while fetching) straight to the option list. Deliberately NOT gated on the
 * Save/Discard buttons being disabled: that holds both while fetching and when loaded-unmodified,
 * so it cannot distinguish the two and would let a test click a radio before the fetch lands, only
 * for the arriving value to overwrite it.
 */
export async function waitForSettingsLoaded(frame: FrameLocator): Promise<void> {
  await expect(selectableConnectivityOptions(frame).unrestricted).toBeEnabled({ timeout: 10_000 });
}

/** Expands the collapsed "Developer only" section that holds the server-environment radios. */
export async function expandDeveloperSection(frame: FrameLocator): Promise<void> {
  await frame.getByRole('button', { name: /Developer only/ }).click();
}

/** A server-environment radio inside the developer section. */
export function serverTypeRadio(
  frame: FrameLocator,
  server: 'production' | 'quality-assurance' | 'development' | 'test',
): Locator {
  return frame.getByTestId(`server-type-${server}`);
}
