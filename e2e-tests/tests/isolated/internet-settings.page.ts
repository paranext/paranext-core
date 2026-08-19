import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';
import { waitForAppReady } from '../../fixtures/helpers';

/** Opens the Internet & Connectivity settings panel from the profile popover. */
export async function openInternetSettings(mainPage: Page): Promise<void> {
  await mainPage.getByTestId('user-profile-popover-trigger').click();
  await mainPage.getByTestId('user-profile-action-network').click();
}

/**
 * Returns a FrameLocator scoped to the internet settings web view iframe.
 *
 * Matched on the iframe's `title`, which the web view provider sets from
 * `%internetSettings_webView_title%` ("Internet Settings" — the tab title, distinct from the
 * in-panel `%internetSettings_webView_title_2%` heading). `FrameLocator` has no `.filter()`, so
 * text-based narrowing is not an option here; this mirrors `iframe[title="Home"]` in
 * `fixtures/helpers.ts`.
 *
 * Does not wait for the panel to load — prefer {@link openInternetSettingsPanel}, which does.
 */
export function internetSettingsFrame(mainPage: Page): FrameLocator {
  return mainPage.frameLocator('iframe[title="Internet Settings"]');
}

/**
 * Waits for the app, opens the settings panel, and waits for its heading to render. Returns the
 * frame, ready to interact with. This is the entry point for every test that starts from an open
 * panel; use the lower-level helpers above only when a test needs to assert on something before or
 * during opening.
 */
export async function openInternetSettingsPanel(mainPage: Page): Promise<FrameLocator> {
  await waitForAppReady(mainPage);
  await openInternetSettings(mainPage);
  const frame = internetSettingsFrame(mainPage);
  await expect(frame.locator('h2')).toBeVisible({ timeout: 15_000 });
  return frame;
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
  await expect(internetUseRadio(frame, 'Unrestricted')).toBeEnabled({ timeout: 10_000 });
}

/** Expands the collapsed "Developer only" section that holds the server-environment radios. */
export async function expandDeveloperSection(frame: FrameLocator): Promise<void> {
  await frame.getByRole('button', { name: /Developer only/ }).click();
}

/** A server-environment radio inside the developer section. */
export function serverTypeRadio(
  frame: FrameLocator,
  server: 'production' | 'development' | 'test',
): Locator {
  return frame.getByTestId(`server-type-${server}`);
}
