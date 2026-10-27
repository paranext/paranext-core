import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page-object helpers for the Standard-view marker palettes opened by `\` and Enter in the editor.
 *
 * The palette is a command-palette overlay rendered in the renderer's own document, not in the
 * editor's iframe, so it is found from the main page. It takes keyboard focus on its list, and the
 * keys typed while it is open filter the list rather than reaching the document.
 */

/** The open marker palette. */
export function markerPalette(mainPage: Page): Locator {
  return mainPage.locator('[data-overlay-command-palette]').first();
}

/**
 * Presses `\` at the editor's caret and waits for the palette to open.
 *
 * @returns The open palette.
 */
export async function openMarkerPalette(mainPage: Page): Promise<Locator> {
  const palette = markerPalette(mainPage);
  await mainPage.keyboard.press('\\');
  await expect(palette).toBeAttached({ timeout: 15_000 });
  return palette;
}

/**
 * Picks `marker` from the open palette: types it, then presses Enter to commit the highlighted
 * entry. The palette ranks an exact match first, so typing the whole marker highlights it.
 */
export async function pickFromMarkerPalette(mainPage: Page, marker: string): Promise<void> {
  await mainPage.keyboard.type(marker);
  await mainPage.keyboard.press('Enter');
  await expect(markerPalette(mainPage)).not.toBeAttached({ timeout: 10_000 });
}
