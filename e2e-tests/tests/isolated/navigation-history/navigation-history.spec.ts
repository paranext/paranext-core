import { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

const isMac = process.platform === 'darwin';
const BACK_KEY = isMac ? 'Meta+BracketLeft' : 'Alt+ArrowLeft';
const FORWARD_KEY = isMac ? 'Meta+BracketRight' : 'Alt+ArrowRight';

/**
 * Navigate the top toolbar BCV control to a typed reference (e.g. 'MRK 4').
 *
 * After typing, the control shows a "top match" CommandItem rendered with the book ID and
 * chapter:verse (e.g. typing "MRK 4" shows an item "MRK 4:1" — the full English book name only
 * appears on the trigger after committing). Commit with Enter, but only AFTER cmdk's highlighted
 * (`data-selected`) item is the top match: cmdk moves its highlight asynchronously after the input
 * changes, so an immediate Enter can race it and activate the previously-highlighted book instead
 * (observed flake). Mouse-clicking the item is also unreliable — the list auto-scrolls (deferred
 * `setTimeout(0)` + smooth scroll) on every input change, which can shift the layout under the
 * pointer between Playwright's stability check and the actual click (observed to hit the
 * next-chapter quick-nav button instead).
 *
 * @param expectedRef Display-text pattern of the committed reference on the trigger (e.g. /Mark
 *   4\b/i — word-boundary anchored so e.g. "Mark 40" cannot false-pass), asserted at the end to
 *   confirm the navigation landed.
 */
async function navigateToRef(mainPage: Page, refText: string, expectedRef: RegExp) {
  const trigger = mainPage.locator('[aria-label="book-chapter-trigger"]');
  await expect(trigger).toBeVisible({ timeout: 10_000 });
  await trigger.click();
  const commandInput = mainPage.locator('[data-radix-popper-content-wrapper] input');
  await expect(commandInput).toBeVisible({ timeout: 5_000 });
  await commandInput.fill(refText);
  // Wait for cmdk to highlight the top match (its text starts with the typed reference, e.g.
  // "MRK 4" → "MRK 4:1"). Only then is Enter guaranteed to activate it. The `\b` anchor keeps a
  // wrong-chapter highlight from false-passing: "MRK 4\b" accepts "MRK 4:1" but rejects
  // "MRK 12:1" (and a hypothetical "MRK 40:1").
  const highlightedTopMatch = mainPage.locator(
    '[data-radix-popper-content-wrapper] [cmdk-item][data-selected="true"]',
    { hasText: new RegExp(`${refText}\\b`, 'i') },
  );
  await expect(highlightedTopMatch).toBeVisible({ timeout: 5_000 });
  await commandInput.press('Enter');
  await expect(commandInput).not.toBeVisible({ timeout: 5_000 });
  await expect(trigger).toContainText(expectedRef, { timeout: 10_000 });
}

test.describe('Reference history', () => {
  // Dismiss any lingering Radix popover/dropdown before each test. An open Radix menu sets
  // `pointer-events: none` on <body>, so an overlay left behind by a previous (possibly failed)
  // test would make every later click time out with "<html> intercepts pointer events". Same
  // guard pattern as manage-books-functional-WP-002.spec.ts.
  //
  // Then close all non-Home dock tabs. An open scripture editor shares the toolbar's scroll
  // group; when the toolbar navigates to a book the editor's project does not contain, the editor
  // echoes back a clamped reference (current book + new chapter) ~250ms later, overwriting the
  // just-committed navigation and polluting the history under test (observed: "EXO 5" committed
  // EXO 5:1, then an echo set GEN 5:1). Closing the tabs removes the echo source; the toolbar's
  // own history behavior is what these tests cover. dispatchEvent('click') on the close button
  // avoids pointer-interception issues (same pattern as ui-interaction.spec.ts).
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.keyboard.press('Escape');
    await mainPage.keyboard.press('Escape');

    // Closing a tab re-layouts the dock, so close one at a time and re-query.
    const closeButtons = mainPage.locator('.dock-tab:not(:has-text("Home")) .dock-tab-close-btn');
    for (let i = 0; i < 20; i += 1) {
      // Sequential by nature: each close changes the tab list the next iteration queries.
      // eslint-disable-next-line no-await-in-loop
      const remaining = await closeButtons.count();
      if (remaining === 0) break;
      // Sequential by nature: each close changes the tab list the next iteration queries.
      // eslint-disable-next-line no-await-in-loop
      await closeButtons.first().dispatchEvent('click');
      // Wait for the dock to actually drop the tab before re-querying.
      // eslint-disable-next-line no-await-in-loop
      await expect(closeButtons).toHaveCount(remaining - 1, { timeout: 5_000 });
    }
  });

  test('back/forward buttons navigate the visited references', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    const backButton = mainPage.getByTestId('navigation-history-back-button');
    const forwardButton = mainPage.getByTestId('navigation-history-forward-button');
    const bcvTrigger = mainPage.locator('[aria-label="book-chapter-trigger"]');

    await expect(backButton).toBeVisible({ timeout: 10_000 });

    await navigateToRef(mainPage, 'MRK 4', /Mark 4\b/i);
    await navigateToRef(mainPage, 'LUK 2', /Luke 2\b/i);

    await expect(backButton).toBeEnabled();
    await backButton.click();
    await expect(bcvTrigger).toContainText(/Mark 4\b/i, { timeout: 10_000 });

    await expect(forwardButton).toBeEnabled();
    await forwardButton.click();
    await expect(bcvTrigger).toContainText(/Luke 2\b/i, { timeout: 10_000 });
    await expect(forwardButton).toBeDisabled();
  });

  test('right-click history menu jumps multiple steps', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const bcvTrigger = mainPage.locator('[aria-label="book-chapter-trigger"]');

    await navigateToRef(mainPage, 'GEN 1', /Genesis 1\b/i);
    await navigateToRef(mainPage, 'EXO 5', /Exodus 5\b/i);
    await navigateToRef(mainPage, 'MRK 4', /Mark 4\b/i);

    // History persists across tests in this shared app session (session-only by design — see
    // reference-history.util.ts), so the back stack can legitimately contain more than one
    // "Genesis 1:1" entry (e.g. the scroll group's initial seed plus this test's own visit).
    // Match tolerantly with `.first()` (the nearest — i.e. most recently visited — match, which is
    // also the correct one to jump to for "two steps back" here) rather than requiring a unique
    // match, per the shared-session caveat for this suite.
    await mainPage.getByTestId('navigation-history-back-button').click({ button: 'right' });
    const twoBack = mainPage.getByRole('menuitem', { name: /Genesis 1\b/i }).first();
    await expect(twoBack).toBeVisible({ timeout: 5_000 });
    await twoBack.click();
    await expect(bcvTrigger).toContainText(/Genesis 1\b/i, { timeout: 10_000 });

    // The skipped entries are now on the forward stack
    await mainPage.getByTestId('navigation-history-forward-button').click({ button: 'right' });
    await expect(mainPage.getByRole('menuitem', { name: /Exodus 5\b/i }).first()).toBeVisible({
      timeout: 5_000,
    });
    await mainPage.keyboard.press('Escape');
  });

  test('keyboard shortcuts navigate back and forward', async ({ mainPage }) => {
    // KNOWN ENVIRONMENT LIMITATION (verified, not a product defect): Alt+Left/Alt+Right are
    // handled by Electron's main-process `before-input-event` listener (src/main/main.ts), which
    // is fed from native OS keyboard events. Keys dispatched via Playwright's CDP
    // `Input.dispatchKeyEvent` (what `cdp.fixture`'s `connectOverCDP` + `page.keyboard.press` use)
    // do not reliably surface to that listener with correct modifier state. Verified directly:
    // (1) the identical PAPI command invoked over the WebSocket
    // (`command:platform.navigateLeftInReferenceHistory`) DOES navigate scroll group 0 and the
    // toolbar DOES reflect it — so the feature itself and the scroll-group wiring are correct;
    // (2) the pre-existing, unrelated Ctrl+Tab tab-switch shortcut (same `before-input-event`
    // handler, `src/main/main.ts`) ALSO has no effect when sent via `page.keyboard.press` in this
    // same session, confirming this is not specific to reference history. Mouse-driven navigation
    // (the two tests above) and plain-key input inside web content (Enter to submit the BCV
    // popover) both work fine via CDP — only main-process global accelerators are affected.
    // Skipping rather than fighting the harness, per the task's guidance.
    //
    // UNSKIP CONDITION: unskip if this suite ever runs via `_electron.launch` (which delivers
    // native OS key events, e.g. through isolated.fixture) or the harness gains a way to dispatch
    // keys that reach the main process's `before-input-event` listener.
    test.skip(
      true,
      'Alt+Left/Alt+Right are handled by a main-process before-input-event listener; keys ' +
        'dispatched via CDP (cdp.fixture) do not reliably reach it with correct modifier state ' +
        'in this environment. Unskip if this suite ever runs via _electron.launch (native OS ' +
        'key events) or the harness gains main-process key dispatch. See comment above for ' +
        'how this was verified.',
    );

    await waitForAppReady(mainPage);
    const bcvTrigger = mainPage.locator('[aria-label="book-chapter-trigger"]');

    await navigateToRef(mainPage, 'MRK 4', /Mark 4\b/i);
    await navigateToRef(mainPage, 'LUK 2', /Luke 2\b/i);

    await mainPage.keyboard.press(BACK_KEY);
    await expect(bcvTrigger).toContainText(/Mark 4\b/i, { timeout: 10_000 });
    await mainPage.keyboard.press(FORWARD_KEY);
    await expect(bcvTrigger).toContainText(/Luke 2\b/i, { timeout: 10_000 });
  });
});
