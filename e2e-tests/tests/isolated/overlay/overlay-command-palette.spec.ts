import { Frame, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { findHelloRock3Frame } from './overlay-helpers';

/** Click the command palette trigger button and wait for the palette to appear in the parent doc. */
async function openCommandPalette(mainPage: Page, frame: Frame) {
  const trigger = frame.locator('[data-testid="command-palette-trigger"]');
  await expect(trigger).toBeVisible({ timeout: 10_000 });
  await trigger.click();

  const palette = mainPage.locator('[data-overlay-command-palette]');
  await expect(palette).toBeVisible({ timeout: 10_000 });
  return palette;
}

test('overlay command palette rendering and interaction', async ({ mainPage }) => {
  await waitForAppReady(mainPage);
  const frame = await findHelloRock3Frame(mainPage);

  await test.step('opens with expected items', async () => {
    const palette = await openCommandPalette(mainPage, frame);

    // Verify search input is present
    const input = palette.locator('input[cmdk-input]');
    await expect(input).toBeVisible();

    // Verify expected items
    await expect(palette.locator('[cmdk-item]', { hasText: 'Paragraph (p)' })).toBeVisible();
    await expect(palette.locator('[cmdk-item]', { hasText: 'Poetry Line 1' })).toBeVisible();
    await expect(palette.locator('[cmdk-item]', { hasText: 'Section Heading' })).toBeVisible();
    await expect(palette.locator('[cmdk-item]', { hasText: 'Footnote (ft)' })).toBeVisible();

    // Clean up
    await mainPage.keyboard.press('Escape');
  });

  await test.step('search filters items', async () => {
    const palette = await openCommandPalette(mainPage, frame);

    // Type to filter
    const input = palette.locator('input[cmdk-input]');
    await input.fill('Poetry');

    // Poetry items should be visible
    await expect(palette.locator('[cmdk-item]', { hasText: 'Poetry Line 1' })).toBeVisible();
    await expect(palette.locator('[cmdk-item]', { hasText: 'Poetry Line 2' })).toBeVisible();

    // Non-matching items should be hidden
    await expect(palette.locator('[cmdk-item]', { hasText: 'Paragraph (p)' })).not.toBeVisible();
    await expect(palette.locator('[cmdk-item]', { hasText: 'Footnote (ft)' })).not.toBeVisible();

    // Clean up
    await mainPage.keyboard.press('Escape');
  });

  await test.step('selecting an item dismisses the palette', async () => {
    const palette = await openCommandPalette(mainPage, frame);

    // Click an item
    await palette.locator('[cmdk-item]', { hasText: 'Paragraph (p)' }).click();

    // Palette should be dismissed
    await expect(palette).not.toBeVisible({ timeout: 5_000 });
  });

  await test.step('Escape dismisses the palette', async () => {
    const palette = await openCommandPalette(mainPage, frame);

    await mainPage.keyboard.press('Escape');
    await expect(palette).not.toBeVisible({ timeout: 3_000 });
  });

  await test.step('keyboard navigation works', async () => {
    const palette = await openCommandPalette(mainPage, frame);

    // Arrow down to navigate
    await mainPage.keyboard.press('ArrowDown');
    await mainPage.keyboard.press('ArrowDown');

    // Enter to select
    await mainPage.keyboard.press('Enter');

    // Palette should be dismissed after selection
    await expect(palette).not.toBeVisible({ timeout: 5_000 });
  });
});
