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

  await test.step('a click away dismisses the palette and returns focus to its web view', async () => {
    const palette = await openCommandPalette(mainPage, frame);
    // This palette opens without an anchor, so it is centred on a backdrop covering the window
    const backdrop = mainPage.locator('[data-overlay-command-palette-backdrop]');
    await expect(backdrop).toBeVisible();
    const box = await backdrop.boundingBox();
    if (!box) throw new Error('The palette backdrop has no bounding box');

    // Press well away from the palette and hold briefly, like a real click
    await mainPage.mouse.click(box.x + 40, box.y + box.height - 40, { delay: 120 });

    await expect(palette).not.toBeVisible({ timeout: 3_000 });
    // Focus goes back to the web view that opened the palette, not to the document body
    await expect
      .poll(async () => mainPage.evaluate(() => document.activeElement?.tagName), {
        timeout: 3_000,
      })
      .toBe('IFRAME');
    await expect.poll(async () => frame.evaluate(() => document.hasFocus())).toBe(true);
  });

  await test.step('a click away from a passive palette leaves focus in its web view', async () => {
    const webViewId = await (await frame.frameElement()).getAttribute('data-web-view-id');
    if (!webViewId) throw new Error('The Hello Rock3 frame has no web view id');

    // A passive palette leaves focus in the web view that opened it, as the marker palette leaves
    // it in the editor. Give the web view focus first, then open a centred passive palette for it.
    await mainPage.evaluate((id) => {
      document.querySelector<HTMLIFrameElement>(`iframe[data-web-view-id="${id}"]`)?.focus();
    }, webViewId);
    await expect.poll(async () => frame.evaluate(() => document.hasFocus())).toBe(true);
    await mainPage.evaluate((id) => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
      const { papi } = window as unknown as {
        papi: {
          overlays: {
            showCommandPalette: (
              request: { items: { id: string; label: string }[]; passive: boolean },
              requesterId: string,
            ) => Promise<string | undefined>;
          };
        };
      };
      // Not awaited: the promise settles only when the palette closes
      papi.overlays
        .showCommandPalette({ items: [{ id: 'p', label: 'Paragraph (p)' }], passive: true }, id)
        .catch(() => {});
    }, webViewId);

    const palette = mainPage.locator('[data-overlay-command-palette]');
    await expect(palette).toBeVisible({ timeout: 10_000 });
    const backdrop = mainPage.locator('[data-overlay-command-palette-backdrop]');
    await expect(backdrop).toBeVisible();
    // Opening a passive palette must not have taken focus from the web view
    await expect.poll(async () => frame.evaluate(() => document.hasFocus())).toBe(true);
    // Stay clear of the overlay service's creation grace, so its focus tracking is live
    await mainPage.waitForTimeout(500);

    const box = await backdrop.boundingBox();
    if (!box) throw new Error('The palette backdrop has no bounding box');
    await mainPage.mouse.click(box.x + 40, box.y + box.height - 40, { delay: 120 });

    await expect(palette).not.toBeVisible({ timeout: 3_000 });
    await expect
      .poll(async () => mainPage.evaluate(() => document.activeElement?.tagName), {
        timeout: 3_000,
      })
      .toBe('IFRAME');
    await expect.poll(async () => frame.evaluate(() => document.hasFocus())).toBe(true);
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
