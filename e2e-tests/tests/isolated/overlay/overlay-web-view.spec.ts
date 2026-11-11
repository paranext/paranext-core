import { Frame, Locator, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { findHelloRock3Frame, DEFAULT_PERSON_NAME } from './overlay-helpers';

// Seeded through the fixture's own options rather than a preConfigureSettings call in a hook: a
// spec-level seed is overridden by the fixture's for any shared key, and is captured by the fixture
// as the "original" it later writes back into the developer's shared settings.
//
// - interfaceMode: power. Simple mode squeezes the DEV_NOISY test layout's web views into one
//   narrow side panel, where the Hello Rock3 dock tab sits under an overlapping web view iframe
//   (its click is intercepted) and the context menu's submenu has no room to open.
// - firstRunComplete: without it the app starts on the first-run wizard, a modal that aria-hides
//   the rest of the app and swallows pointer events.
//
// The English interface language every asserted string depends on ("Delete Person", "More
// Actions", "Show Alert", "OK") is seeded by the fixture itself.
test.use({
  // The steps drive the helloRock3 test extension's web view, which only noisy dev mode loads.
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'true' } },
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
  // The context-menu step drives a Radix submenu by pointer coordinates, so it needs the
  // hello-rock3 web view to sit in a pane wide enough for the submenu to open beside its trigger
  // rather than being flipped or clipped against the window edge.
  windowSize: { width: 1280, height: 800 },
});

/** The budget of the first test step: it includes the cold app start (the config's default) */
const COLD_START_TIMEOUT_MS = 120_000;

/** The budget of a step after the first: the app is already up, so the config's default */
const WARM_STEP_TIMEOUT_MS = 120_000;

/** The number of steps that run on an app the earlier steps already started */
const WARM_STEP_COUNT = 3;

/** Click the command palette trigger button and wait for the palette to appear in the parent doc. */
async function openCommandPalette(mainPage: Page, frame: Frame) {
  const trigger = frame.locator('[data-testid="command-palette-trigger"]');
  await expect(trigger).toBeVisible({ timeout: 10_000 });
  await trigger.click();

  const palette = mainPage.locator('[data-overlay-command-palette]');
  await expect(palette).toBeVisible({ timeout: 10_000 });
  return palette;
}

/**
 * Right-click the .title element and wait for the context menu to appear in the parent doc.
 *
 * Every step opens a fresh menu right after the previous step dismissed one, so this first waits
 * for that menu to be gone from the DOM — not merely hidden, which is all a step's own
 * `not.toBeVisible()` cleanup proves. A right-click that lands while the closing menu is still
 * mounted often opens no new menu.
 */
async function openContextMenu(mainPage: Page, frame: Frame) {
  const anyMenu = mainPage.locator('[role="menu"]');
  await expect(anyMenu).toHaveCount(0, { timeout: 5_000 });
  await frame.locator('.title').click({ button: 'right' });
  // The context menu is the first menu in the document; a submenu opened from it is portalled as a
  // second `[role="menu"]`, so the returned locator stays on the context menu itself.
  const menu = anyMenu.first();
  await expect(menu).toBeVisible({ timeout: 10_000 });
  return menu;
}

/**
 * Open the "More Actions" submenu of an open context menu and return the submenu.
 *
 * The mouse goes directly to the submenu trigger with low-level `mouse.move()`. That bypasses Radix
 * DropdownMenu's tendency to detach/reattach portal elements during Playwright's
 * actionability-checked `hover()`, which causes "element not stable" errors. Radix portals the
 * submenu separately, creating a second `[role="menu"]`; the "More Actions" submenu contains "Say
 * Hello" and "Show Alert".
 */
async function openMoreActionsSubmenu(mainPage: Page, menu: Locator) {
  const submenuTrigger = menu.locator('[role="menuitem"]', { hasText: 'More Actions' });
  await expect(submenuTrigger).toBeVisible({ timeout: 3_000 });
  const box = await submenuTrigger.boundingBox();
  if (!box) throw new Error('Submenu trigger has no bounding box');
  await mainPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  const submenu = mainPage.locator('[role="menu"]').filter({ hasText: 'Say Hello' });
  await expect(submenu).toBeVisible({ timeout: 5_000 });
  return submenu;
}

// The overlays below are each opened and closed within their own step, so they share one app start.
// The context-menu steps come last because clicking "Open Scripture Editor" opens a new dock tab,
// which could steal focus from the Hello Rock3 tab and break any step after it.
test('overlays opened from a web view render and respond', async ({ mainPage }) => {
  test.setTimeout(COLD_START_TIMEOUT_MS + WARM_STEP_COUNT * WARM_STEP_TIMEOUT_MS);
  await waitForAppReady(mainPage);
  const frame = await findHelloRock3Frame(mainPage);

  await test.step('overlay popover rendering and interaction', async () => {
    // The greeting element has cursor: help style and triggers a popover on hover.
    // The hello-rock3 code uses a 400ms hover delay before showing the popover.
    const greetingEl = frame.locator('[style*="cursor"]');
    await expect(greetingEl).toBeVisible({ timeout: 10_000 });

    await test.step('hover on greeting shows markdown popover with expected content', async () => {
      const popover = mainPage.locator('[data-overlay-popover]');
      // Hover + 400ms app delay is timing-sensitive under load; poll until the portaled popover appears.
      await expect(async () => {
        await greetingEl.hover();
        await expect(popover).toBeVisible({ timeout: 2_000 });
      }).toPass({ timeout: 15_000 });

      // Verify the popover content - a markdown type with person details.
      // Title is "About {name}" rendered as a markdown heading.
      await expect(popover).toContainText('About');
      await expect(popover).toContainText(DEFAULT_PERSON_NAME);

      // Markdown bold terms: Name, Greeting, Age
      await expect(popover).toContainText('Name');
      await expect(popover).toContainText('Greeting');
      await expect(popover).toContainText('Age');

      // Clean up: move mouse away to dismiss
      await frame.locator('.title').hover();
      await expect(popover).not.toBeVisible({ timeout: 5_000 });
    });

    await test.step('popover reappears after dismissal and re-hover', async () => {
      // Show the popover
      await greetingEl.hover();
      const popover = mainPage.locator('[data-overlay-popover]');
      await expect(popover).toBeVisible({ timeout: 10_000 });

      // Dismiss by moving away
      await frame.locator('.title').hover();
      await expect(popover).not.toBeVisible({ timeout: 5_000 });

      // Re-hover should show the popover again (verifies cleanup/re-trigger works)
      await greetingEl.hover();
      await expect(popover).toBeVisible({ timeout: 10_000 });

      // Clean up
      await frame.locator('.title').hover();
      await expect(popover).not.toBeVisible({ timeout: 5_000 });
    });
  });

  await test.step('overlay command palette rendering and interaction', async () => {
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

  await test.step('overlay modal dialog rendering and interaction via WebView triggers', async () => {
    // The delete button text contains the default person name from settings.json.
    const deleteButton = frame
      .locator('button')
      .filter({ hasText: new RegExp(DEFAULT_PERSON_NAME, 'i') });
    await expect(deleteButton).toBeVisible({ timeout: 10_000 });

    await test.step('confirm dialog shows with backdrop, correct content, and ARIA role', async () => {
      // Click the delete button inside the WebView to trigger a confirm dialog.
      await deleteButton.click();

      // The confirm dialog should render in the parent document
      const dialog = mainPage.locator('[data-overlay-modal-dialog]');
      await expect(dialog).toBeVisible({ timeout: 5_000 });

      // Verify correct ARIA role for confirm dialogs
      await expect(dialog).toHaveAttribute('role', 'alertdialog');
      await expect(dialog).toHaveAttribute('aria-modal', 'true');

      // Verify dialog content - localized title and message
      await expect(dialog).toContainText('Delete Person');
      await expect(dialog).toContainText('Are you sure you want to delete');

      // Verify OK (destructive) and Cancel buttons
      const okButton = dialog.locator('button', { hasText: 'Delete' });
      const cancelButton = dialog.locator('button', { hasText: 'Cancel' });
      await expect(okButton).toBeVisible();
      await expect(cancelButton).toBeVisible();

      // Verify the OK button has destructive styling (variant="destructive")
      await expect(okButton).toHaveClass(/destructive/i);

      // Verify backdrop is visible
      const backdrop = mainPage.locator('.overlay-modal-backdrop');
      await expect(backdrop).toBeVisible();

      // Clean up by cancelling
      await cancelButton.click();
      await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    });

    await test.step('Cancel button and Escape key both dismiss the dialog', async () => {
      // Test 1: Cancel button dismisses
      await deleteButton.click();
      let dialog = mainPage.locator('[data-overlay-modal-dialog]');
      await expect(dialog).toBeVisible({ timeout: 5_000 });

      await dialog.locator('button', { hasText: 'Cancel' }).click();
      await expect(dialog).not.toBeVisible({ timeout: 3_000 });

      // Test 2: Escape key dismisses
      await deleteButton.click();
      dialog = mainPage.locator('[data-overlay-modal-dialog]');
      await expect(dialog).toBeVisible({ timeout: 5_000 });

      await mainPage.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    });

    await test.step('alert dialog via context menu chaining', async () => {
      const menu = await openContextMenu(mainPage, frame);
      const submenu = await openMoreActionsSubmenu(mainPage, menu);

      // Click "Show Alert" via mouse.click
      const showAlertItem = submenu.getByRole('menuitem', { name: 'Show Alert' });
      await expect(showAlertItem).toBeVisible({ timeout: 3_000 });
      const alertBox = await showAlertItem.boundingBox();
      if (!alertBox) throw new Error('Show Alert item has no bounding box');
      await mainPage.mouse.click(alertBox.x + alertBox.width / 2, alertBox.y + alertBox.height / 2);

      // Context menu should be dismissed
      await expect(menu).not.toBeVisible({ timeout: 3_000 });

      // Alert dialog should appear (chaining: context menu -> modal dialog)
      const dialog = mainPage.locator('[data-overlay-modal-dialog]');
      await expect(dialog).toBeVisible({ timeout: 5_000 });

      // Verify it's an alert dialog
      await expect(dialog).toHaveAttribute('role', 'alertdialog');
      await expect(dialog).toContainText('Hello!');
      await expect(dialog).toContainText('This alert was triggered from the context menu');

      // Alert dialogs have only an OK button (no Cancel)
      const okButton = dialog.locator('button', { hasText: 'OK' });
      await expect(okButton).toBeVisible();

      // Clicking OK dismisses the alert
      await okButton.click();
      await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    });
  });

  await test.step('overlay context menu rendering and interaction', async () => {
    await test.step('opens with expected items on right-click in WebView', async () => {
      const menu = await openContextMenu(mainPage, frame);

      // Verify expected menu items from hello-rock3's contextMenu contributions
      await expect(menu.getByRole('menuitem', { name: 'Open Scripture Editor' })).toBeVisible();

      // Verify submenu trigger exists
      await expect(menu.locator('[role="menuitem"]', { hasText: 'More Actions' })).toBeVisible();

      // Clean up
      await mainPage.keyboard.press('Escape');
    });

    await test.step('dismissed on Escape key', async () => {
      const menu = await openContextMenu(mainPage, frame);

      await mainPage.keyboard.press('Escape');
      await expect(menu).not.toBeVisible({ timeout: 3_000 });
    });

    await test.step('submenu expands to show sub-items', async () => {
      const menu = await openContextMenu(mainPage, frame);
      const submenu = await openMoreActionsSubmenu(mainPage, menu);

      // Verify submenu items
      await expect(submenu.getByRole('menuitem', { name: 'Say Hello' })).toBeVisible();
      await expect(submenu.getByRole('menuitem', { name: 'Show Alert' })).toBeVisible();

      // Clean up
      await mainPage.keyboard.press('Escape');
    });

    await test.step('keyboard navigation highlights items', async () => {
      const menu = await openContextMenu(mainPage, frame);

      // Arrow down should highlight menu items (Radix sets data-highlighted attribute)
      await mainPage.keyboard.press('ArrowDown');
      const highlightedItem = menu.locator('[data-highlighted]');
      await expect(highlightedItem).toBeVisible({ timeout: 2_000 });

      // Arrow down again to move highlight to next item
      await mainPage.keyboard.press('ArrowDown');
      await expect(highlightedItem).toBeVisible();

      // Escape to dismiss
      await mainPage.keyboard.press('Escape');
      await expect(menu).not.toBeVisible({ timeout: 3_000 });
    });

    await test.step('clicking a menu item dismisses the menu', async () => {
      const menu = await openContextMenu(mainPage, frame);

      // Click "Open Scripture Editor" - a simple action item
      await menu.getByRole('menuitem', { name: 'Open Scripture Editor' }).click();

      // Menu should be dismissed after item selection
      await expect(menu).not.toBeVisible({ timeout: 5_000 });
    });
  });
});
