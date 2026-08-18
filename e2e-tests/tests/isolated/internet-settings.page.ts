import type { FrameLocator, Page } from '@playwright/test';

/** Opens the Internet & Connectivity settings panel from the profile popover. */
export async function openInternetSettings(mainPage: Page): Promise<void> {
  await mainPage.getByTestId('user-profile-popover-trigger').click();
  await mainPage.getByTestId('user-profile-action-network').click();
}

/**
 * Returns a FrameLocator scoped to the internet settings web view iframe.
 *
 * The filter matches on visible text so it tolerates multiple iframes; it does not wait for the
 * panel to finish loading — callers should await a stable element (e.g.,
 * `frame.locator('h2').toBeVisible()`) before interacting with the frame.
 */
export function internetSettingsFrame(mainPage: Page): FrameLocator {
  return mainPage.frameLocator('iframe').filter({ hasText: 'Internet & Connectivity' });
}
