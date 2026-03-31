/**
 * Comprehensive dialog rendering test. Exercises every dialog type in both modal (overlay) and
 * non-modal (floating dock tab) form using a single isolated app instance. Each step verifies:
 *
 * - Modal: centered overlay with backdrop, correct ARIA attributes, expected buttons/content,
 *   component renders without errors, and dismissal returns the correct value to the caller.
 * - Non-modal: floating dock tab with expected buttons/content, component renders without errors, and
 *   dismissal returns the correct value to the caller.
 */

import { Page } from '@playwright/test';
import WebSocket from 'ws';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Send a PAPI `dialog:showDialog` JSON-RPC command over WebSocket. Returns a promise that resolves
 * with the dialog result once the user dismisses it. Uses a generous timeout because the dialog
 * stays open until Playwright interacts with it.
 */
function showDialogViaWebSocket<T = unknown>(
  dialogType: string,
  options: Record<string, unknown> = {},
  port = 8876,
): Promise<T | undefined> {
  return new Promise<T | undefined>((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}`);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error(`showDialog("${dialogType}") timed out after 60 s`));
    }, 60_000);

    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'dialog:showDialog',
          params: [dialogType, options],
        }),
      );
    });

    ws.on('message', (data) => {
      let parsed: { id?: number; error?: unknown; result?: unknown };
      try {
        parsed = JSON.parse(data.toString());
      } catch (err) {
        clearTimeout(timeout);
        ws.close();
        reject(err);
        return;
      }
      if (parsed.id !== 1) return; // ignore notifications
      clearTimeout(timeout);
      ws.close();
      if (parsed.error) {
        reject(new Error(`PAPI error: ${JSON.stringify(parsed.error)}`));
      } else {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        resolve(parsed.result as T | undefined);
      }
    });

    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/** Locate the modal overlay dialog element in the main page. */
function modalDialog(page: Page) {
  return page.locator('[data-overlay-modal-dialog]');
}

/** Locate the semi-transparent modal backdrop. */
function modalBackdrop(page: Page) {
  return page.locator('.overlay-modal-backdrop');
}

/**
 * For non-modal dialogs that open as floating dock tabs, find the panel whose tab title contains
 * the given text. Returns a locator for the tab's content panel.
 */
function floatingTabContent(page: Page, titleSubstring: string) {
  // rc-dock floating panels have class `dock-panel`. Find the one whose tab button matches.
  return page
    .locator('.dock-panel')
    .filter({ has: page.locator(`.dock-tab-btn:has-text("${titleSubstring}")`) });
}

// ---------------------------------------------------------------------------
// Test
// ---------------------------------------------------------------------------

test('all dialog types render correctly in modal and non-modal form', async ({ mainPage }) => {
  await waitForAppReady(mainPage);

  // =========================================================================
  // Alert Dialog
  // =========================================================================

  await test.step('alert dialog - modal', async () => {
    const resultPromise = showDialogViaWebSocket<true>('platform.alert', {
      title: 'Test Alert',
      prompt: 'This is a modal alert',
      okLabel: 'Acknowledged',
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });

    // Structure: centered overlay with backdrop and correct ARIA
    await expect(dialog).toHaveAttribute('role', 'alertdialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(modalBackdrop(mainPage)).toBeVisible();

    // Content rendered correctly
    await expect(dialog).toContainText('Test Alert');
    await expect(dialog).toContainText('This is a modal alert');

    // Expected button
    const okButton = dialog.locator('button', { hasText: 'Acknowledged' });
    await expect(okButton).toBeVisible();

    // No Cancel button on alert dialogs
    expect(await dialog.locator('button').count()).toBe(1);

    // Dismiss and verify return value
    await okButton.click();
    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    expect(await resultPromise).toBe(true);
  });

  await test.step('alert dialog - non-modal (floating tab)', async () => {
    const resultPromise = showDialogViaWebSocket<true>('platform.alert', {
      title: 'Tab Alert',
      prompt: 'This is a non-modal alert',
      okLabel: 'Got It',
    });

    // Non-modal dialogs open as floating dock tabs
    const panel = floatingTabContent(mainPage, 'Tab Alert');
    await expect(panel).toBeVisible({ timeout: 10_000 });

    // No modal overlay should be present
    await expect(modalDialog(mainPage)).not.toBeVisible();

    // Content rendered correctly inside the tab
    await expect(panel).toContainText('This is a non-modal alert');
    const okButton = panel.locator('button', { hasText: 'Got It' });
    await expect(okButton).toBeVisible();

    // Dismiss and verify return value
    await okButton.click();
    await expect(panel).not.toBeVisible({ timeout: 3_000 });
    expect(await resultPromise).toBe(true);
  });

  // =========================================================================
  // Confirm Dialog
  // =========================================================================

  await test.step('confirm dialog - modal (OK)', async () => {
    const resultPromise = showDialogViaWebSocket<boolean>('platform.confirm', {
      title: 'Confirm Action',
      prompt: 'Proceed with this action?',
      okLabel: 'Yes',
      cancelLabel: 'No',
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await expect(dialog).toHaveAttribute('role', 'alertdialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(modalBackdrop(mainPage)).toBeVisible();

    await expect(dialog).toContainText('Confirm Action');
    await expect(dialog).toContainText('Proceed with this action?');

    // Both OK and Cancel buttons
    const yesButton = dialog.locator('button', { hasText: 'Yes' });
    const noButton = dialog.locator('button', { hasText: 'No' });
    await expect(yesButton).toBeVisible();
    await expect(noButton).toBeVisible();

    // Click OK -> returns true
    await yesButton.click();
    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    expect(await resultPromise).toBe(true);
  });

  await test.step('confirm dialog - modal (Cancel)', async () => {
    const resultPromise = showDialogViaWebSocket<boolean>('platform.confirm', {
      title: 'Cancel Test',
      prompt: 'Will you cancel?',
      okLabel: 'Confirm',
      cancelLabel: 'Abort',
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });

    // Click Cancel -> returns undefined
    await dialog.locator('button', { hasText: 'Abort' }).click();
    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    expect(await resultPromise).toBe(false);
  });

  await test.step('confirm dialog - modal (Escape dismissal)', async () => {
    const resultPromise = showDialogViaWebSocket<boolean>('platform.confirm', {
      title: 'Escape Test',
      prompt: 'Press Escape to dismiss',
      okLabel: 'OK',
      cancelLabel: 'Cancel',
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });

    // Escape dismissal goes through handleOpenChange, a different code path from button clicks
    await mainPage.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    // eslint-disable-next-line no-null/no-null
    expect(await resultPromise).toBeNull();
  });

  await test.step('confirm dialog - non-modal (floating tab)', async () => {
    const resultPromise = showDialogViaWebSocket<boolean>('platform.confirm', {
      title: 'Tab Confirm',
      prompt: 'Non-modal confirm test',
      okLabel: 'Accept',
      cancelLabel: 'Decline',
    });

    const panel = floatingTabContent(mainPage, 'Tab Confirm');
    await expect(panel).toBeVisible({ timeout: 10_000 });
    await expect(modalDialog(mainPage)).not.toBeVisible();

    await expect(panel).toContainText('Non-modal confirm test');
    const acceptButton = panel.locator('button', { hasText: 'Accept' });
    const declineButton = panel.locator('button', { hasText: 'Decline' });
    await expect(acceptButton).toBeVisible();
    await expect(declineButton).toBeVisible();

    await acceptButton.click();
    await expect(panel).not.toBeVisible({ timeout: 3_000 });
    expect(await resultPromise).toBe(true);
  });

  // =========================================================================
  // Select Project Dialog
  // =========================================================================

  await test.step('select project dialog - modal', async () => {
    const resultPromise = showDialogViaWebSocket<string>('platform.selectProject', {
      title: 'Pick a Project',
      prompt: 'Choose one project',
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await expect(modalBackdrop(mainPage)).toBeVisible();
    await expect(dialog).toContainText('Choose one project');

    // Wait for project list to load (should show at least one project button)
    const projectButtons = dialog.locator('.project-list button');
    await expect(projectButtons.first()).toBeVisible({ timeout: 15_000 });

    // The project list can be taller than the 85vh modal viewport. Playwright
    // considers the element "outside of the viewport" even when it's scrollable
    // inside the fixed-position modal, so force the click.
    await projectButtons.first().click({ force: true });
    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    const result = await resultPromise;
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  await test.step('select project dialog - non-modal (floating tab)', async () => {
    const resultPromise = showDialogViaWebSocket<string>('platform.selectProject', {
      prompt: 'Choose a project from the tab',
    });

    // Default title is a localize key - wait for the panel that contains the prompt instead
    const panel = mainPage
      .locator('.dock-panel')
      .filter({ hasText: 'Choose a project from the tab' });
    await expect(panel).toBeVisible({ timeout: 10_000 });
    await expect(modalDialog(mainPage)).not.toBeVisible();

    // Wait for project list to load
    const projectButtons = panel.locator('.project-list button');
    await expect(projectButtons.first()).toBeVisible({ timeout: 15_000 });

    await projectButtons.first().click();
    await expect(panel).not.toBeVisible({ timeout: 3_000 });
    const result = await resultPromise;
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  // =========================================================================
  // Select Multiple Projects Dialog
  // =========================================================================

  await test.step('select multiple projects dialog - modal', async () => {
    const resultPromise = showDialogViaWebSocket<string[]>('platform.selectMultipleProjects', {
      title: 'Select Projects',
      prompt: 'Check one or more',
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await expect(modalBackdrop(mainPage)).toBeVisible();
    await expect(dialog).toContainText('Check one or more');

    // Wait for projects to load, then toggle the first project.
    // Use force:true because Playwright can't click inside scrollable fixed modals.
    const projectButtons = dialog.locator('.project-list button');
    await expect(projectButtons.first()).toBeVisible({ timeout: 15_000 });
    await projectButtons.first().click({ force: true });

    // Click the submit button using its specific CSS class
    const submitButton = dialog.locator('.select-multiple-projects-submit-button button');
    await submitButton.click({ force: true });

    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    const result = await resultPromise;
    expect(Array.isArray(result)).toBe(true);
    // Array.isArray guard above ensures result is string[]
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect((result as string[]).length).toBeGreaterThanOrEqual(1);
  });

  await test.step('select multiple projects dialog - non-modal (floating tab)', async () => {
    const resultPromise = showDialogViaWebSocket<string[]>('platform.selectMultipleProjects', {
      prompt: 'Multi-select from tab',
    });

    const panel = mainPage.locator('.dock-panel').filter({ hasText: 'Multi-select from tab' });
    await expect(panel).toBeVisible({ timeout: 10_000 });
    await expect(modalDialog(mainPage)).not.toBeVisible();

    const projectButtons = panel.locator('.project-list button');
    await expect(projectButtons.first()).toBeVisible({ timeout: 15_000 });
    await projectButtons.first().click();

    const submitButton = panel.locator('.select-multiple-projects-submit-button button');
    await submitButton.click();

    await expect(panel).not.toBeVisible({ timeout: 3_000 });
    const result = await resultPromise;
    expect(Array.isArray(result)).toBe(true);
    // Array.isArray guard above ensures result is string[]
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect((result as string[]).length).toBeGreaterThanOrEqual(1);
  });

  // =========================================================================
  // Select Books Dialog
  // =========================================================================

  await test.step('select books dialog - modal', async () => {
    const resultPromise = showDialogViaWebSocket<string[]>('platform.selectBooks', {
      title: 'Pick Books',
      prompt: 'Select some books',
      selectedBookIds: ['GEN', 'EXO'],
      modal: true,
    });

    const dialog = modalDialog(mainPage);
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await expect(modalBackdrop(mainPage)).toBeVisible();
    await expect(dialog).toContainText('Select some books');

    // Verify book checklist renders (Genesis and Exodus should be pre-selected)
    await expect(dialog.getByText('Genesis')).toBeVisible({ timeout: 5_000 });
    await expect(dialog.getByText('Exodus')).toBeVisible();

    // Submit with pre-selected books using the dialog's specific submit button class.
    // Use force:true because Playwright can't click inside scrollable fixed modals.
    const submitButton = dialog.locator('.select-books-dialog-submit-button');
    await submitButton.click({ force: true });

    await expect(dialog).not.toBeVisible({ timeout: 3_000 });
    const result = await resultPromise;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain('GEN');
    expect(result).toContain('EXO');
  });

  await test.step('select books dialog - non-modal (floating tab)', async () => {
    const resultPromise = showDialogViaWebSocket<string[]>('platform.selectBooks', {
      prompt: 'Books from tab',
      selectedBookIds: ['MAT'],
    });

    const panel = mainPage.locator('.dock-panel').filter({ hasText: 'Books from tab' });
    await expect(panel).toBeVisible({ timeout: 10_000 });
    await expect(modalDialog(mainPage)).not.toBeVisible();

    // Verify checklist renders
    await expect(panel.getByText('Matthew')).toBeVisible({ timeout: 5_000 });

    const submitButton = panel.locator('.select-books-dialog-submit-button');
    await submitButton.click();

    await expect(panel).not.toBeVisible({ timeout: 3_000 });
    const result = await resultPromise;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain('MAT');
  });
});
