import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { findHelloRock3Frame, DEFAULT_PERSON_NAME } from './overlay-helpers';

test.describe('Overlay Modal Dialog', () => {
  test('confirm dialog shows with backdrop, correct content, and ARIA role', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    const frame = await findHelloRock3Frame(mainPage);

    // Click the delete button inside the WebView to trigger a confirm dialog.
    // The button text contains the default person name from settings.json.
    const deleteButton = frame
      .locator('button')
      .filter({ hasText: new RegExp(DEFAULT_PERSON_NAME, 'i') });
    await expect(deleteButton).toBeVisible({ timeout: 10_000 });
    await deleteButton.click();

    // The confirm dialog should render in the parent document
    const dialog = mainPage.locator('[data-overlay-modal-dialog]');
    await expect(dialog).toBeVisible({ timeout: 5_000 });

    // Verify correct ARIA role for confirm dialogs
    await expect(dialog).toHaveAttribute('role', 'alertdialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Verify dialog content
    await expect(dialog).toContainText('Delete Person');
    await expect(dialog).toContainText('Are you sure you want to delete');
    await expect(dialog).toContainText(DEFAULT_PERSON_NAME);

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

  test('Cancel button and Escape key both dismiss the dialog', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const frame = await findHelloRock3Frame(mainPage);

    const deleteButton = frame
      .locator('button')
      .filter({ hasText: new RegExp(DEFAULT_PERSON_NAME, 'i') });
    await expect(deleteButton).toBeVisible({ timeout: 10_000 });

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

  test('alert dialog via context menu chaining', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const frame = await findHelloRock3Frame(mainPage);

    // Right-click to open context menu
    await frame.locator('.title').click({ button: 'right' });
    const menu = mainPage.locator('[role="menu"]').first();
    await expect(menu).toBeVisible({ timeout: 10_000 });

    // Move mouse to "More Actions" submenu trigger using low-level mouse.move()
    const submenuTrigger = menu.locator('[role="menuitem"]', { hasText: 'More Actions' });
    await expect(submenuTrigger).toBeVisible({ timeout: 3_000 });
    const box = await submenuTrigger.boundingBox();
    if (!box) throw new Error('Submenu trigger has no bounding box');
    await mainPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    // Wait for submenu and click "Show Alert" using low-level mouse.click()
    // to avoid Radix portal re-render causing "element not stable" errors.
    const submenu = mainPage.locator('[role="menu"]').filter({ hasText: 'Show Alert' });
    await expect(submenu).toBeVisible({ timeout: 5_000 });
    const showAlertItem = submenu.getByRole('menuitem', { name: 'Show Alert' });
    await expect(showAlertItem).toBeVisible({ timeout: 3_000 });
    const alertBox = await showAlertItem.boundingBox();
    if (!alertBox) throw new Error('Show Alert item has no bounding box');
    await mainPage.mouse.click(alertBox.x + alertBox.width / 2, alertBox.y + alertBox.height / 2);

    // Context menu should be dismissed
    await expect(menu).not.toBeVisible({ timeout: 3_000 });

    // Alert dialog should appear (chaining: context menu → modal dialog)
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
