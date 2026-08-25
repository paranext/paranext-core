import type { FrameLocator, Page } from '@playwright/test';

/** Opens the Internet & Connectivity settings panel from the profile popover. */
export async function openInternetSettings(mainPage: Page): Promise<void> {
  await mainPage.getByTestId('user-profile-popover-trigger').click();
  await mainPage.getByTestId('user-profile-action-network').click();
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
