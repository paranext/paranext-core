import { type Page } from '@playwright/test';
import { test, expect } from '../../fixtures/cdp.fixture';
import {
  sendPapiRequestOnce,
  waitForAppReady,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  type CommentTestProject,
} from '../../fixtures/comment-test-helpers';

// The top toolbar's BookChapterControl trigger is the first one in the DOM (the toolbar
// renders above the dock layout)
const BCV_TRIGGER = '[aria-label="book-chapter-trigger"]';

/** Chapter:verse tail of the trigger label, e.g. "GEN 5:3" -> { chapterNum: 5, verseNum: 3 } */
function parseChapterVerse(label: string): { chapterNum: number; verseNum: number } {
  const match = label.trim().match(/(\d+):(\d+)\s*$/);
  if (!match) throw new Error(`Could not parse reference label "${label}"`);
  return { chapterNum: Number(match[1]), verseNum: Number(match[2]) };
}

/**
 * Opens a Scripture editor for the given project and waits for its iframe to attach.
 *
 * The top BookChapterControl is disabled until a scripture-navigable web view is open (nothing to
 * navigate), and a fresh test profile opens none on its own — this spec used to sample the disabled
 * state once and self-skip, which silently skipped ALL of its coverage on fresh profiles. Opening
 * an editor first makes the enabled state a hard expectation instead.
 *
 * Mirrors `openCommentList` in `comment-test-helpers.ts`, including its loadLayout-race guard and
 * retry loop; see that helper for the full explanation of the race.
 */
async function openScriptureEditorForProject(mainPage: Page, projectId: string): Promise<void> {
  // Wait for the dock layout's initial loadLayout() to complete (signalled by the first iframe —
  // the Home webview — appearing) so loadLayout can't wipe the newly added editor tab
  await mainPage.waitForSelector('iframe', { state: 'attached', timeout: 30_000 });

  await waitForPapiMethodRegistered('command:platformScriptureEditor.openResourceViewer');

  // Sequential retry loop: each attempt must await the PAPI response and iframe appearance before
  // deciding whether to retry (see openCommentList for the dock-layout race this covers).
  /* eslint-disable no-await-in-loop, no-continue */
  for (let attempt = 0; attempt < 5; attempt += 1) {
    if (attempt > 0) {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1_000);
      });
    }

    const editorId = await sendPapiRequestOnce<string | undefined>(
      'command:platformScriptureEditor.openResourceViewer',
      [projectId],
      undefined,
      60_000,
    );
    if (!editorId) continue;

    const editorIframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${editorId}"]`)
      .waitFor({ state: 'attached', timeout: attempt < 4 ? 8_000 : 20_000 })
      .then(() => true)
      .catch(() => false);
    if (editorIframeFound) return;
  }
  /* eslint-enable no-await-in-loop, no-continue */

  throw new Error(`Could not open a Scripture editor for project ${projectId} after 5 attempts`);
}

test.describe('verse navigation keyboard shortcuts', () => {
  let project: CommentTestProject;

  test.beforeAll(async () => {
    // Disposable copy of the bundled WEB project for the editor these tests navigate. The helper
    // is comment-flavored only in name — it creates a plain project copy with a unique id.
    project = await createCommentTestProject([]);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test('top toolbar BookChapterControl navigates to a typed reference', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openScriptureEditorForProject(mainPage, project.projectId);

    const trigger = mainPage.locator(BCV_TRIGGER).first();
    await expect(trigger).toBeVisible({ timeout: 15_000 });
    // The open editor becomes the navigation target, so the top control MUST enable. This is an
    // assertion (not a skip-if-disabled) so a regression fails loudly instead of skipping the
    // whole spec's coverage.
    await expect(trigger).toBeEnabled({ timeout: 15_000 });

    // Navigate to a reference that is NOT the app default (GEN 1:1) first, so the assertion
    // proves the submit flow actually changes state — asserting only the default reference
    // could pass even if submit silently broke.
    await trigger.click();
    let searchInput = mainPage.locator('[cmdk-input]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('EXO 2:3');
    await mainPage.keyboard.press('Enter');
    await expect(trigger).toContainText('2:3');
    const exodusLabel = (await trigger.innerText()).trim();

    // Now navigate back to GEN 1:1 — a second real transition (book, chapter, and verse all
    // change), asserting both the chapter:verse tail and the Genesis book name
    await trigger.click();
    searchInput = mainPage.locator('[cmdk-input]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('GEN 1:1');
    await mainPage.keyboard.press('Enter');
    await expect(trigger).toContainText('1:1');
    await expect(trigger).toContainText(/Genesis|GEN/);
    const genesisLabel = (await trigger.innerText()).trim();
    expect(genesisLabel).not.toBe(exodusLabel);
  });

  // SKIPPED: Playwright's `keyboard.press` over CDP uses `Input.dispatchKeyEvent`, which injects
  // key events at the renderer-process level. Electron's `before-input-event` (where these
  // shortcuts are handled in src/main/main.ts) fires in the BROWSER process, before OS-level
  // input reaches the renderer — synthetic CDP key events never pass through it. Verified
  // empirically against the running app: F8, Control+ArrowDown, and Control+b all left the
  // reference label unchanged and never opened the Book Chapter Control, while the same
  // navigation through the UI (click trigger -> type -> Enter) works. Exercising these shortcuts
  // end-to-end requires OS-level input injection (e.g. xdotool X11 key events into the Xvfb
  // display), which is not available in this environment. The shortcut-to-command mapping is
  // covered by unit tests in src/main/verse-navigation-shortcuts.util.test.ts, and the shortcuts
  // are covered by manual verification. Do NOT delete these assertions — they document the
  // intended end-to-end behavior and can be re-enabled if OS-level injection becomes available.
  test.skip('F8/Ctrl+F8 and Ctrl+Down/Ctrl+Up navigate; F9/Ctrl+F9 change book; Ctrl+B opens the control', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openScriptureEditorForProject(mainPage, project.projectId);

    const trigger = mainPage.locator(BCV_TRIGGER).first();
    await expect(trigger).toBeVisible({ timeout: 15_000 });
    // Same hard expectation as the enabled test above: with an editor open, the control enables
    await expect(trigger).toBeEnabled({ timeout: 15_000 });

    // Normalize to a known reference via the UI so navigation targets are predictable
    await trigger.click();
    const searchInput = mainPage.locator('[cmdk-input]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('GEN 1:1');
    await mainPage.keyboard.press('Enter');
    await expect(trigger).toContainText('1:1');
    const baseLabel = (await trigger.innerText()).trim();

    // Next / previous chapter
    await mainPage.keyboard.press('F8');
    await expect(trigger).toContainText('2:1');
    await mainPage.keyboard.press('Control+F8');
    await expect(trigger).toHaveText(baseLabel);

    // Next / previous verse
    await mainPage.keyboard.press('Control+ArrowDown');
    await expect(trigger).toContainText('1:2');
    await mainPage.keyboard.press('Control+ArrowUp');
    await expect(trigger).toHaveText(baseLabel);

    // Next / previous book (GEN -> EXO 1:1 -> GEN 1:1)
    await mainPage.keyboard.press('F9');
    const afterNextBook = (await trigger.innerText()).trim();
    expect(afterNextBook).not.toBe(baseLabel);
    expect(parseChapterVerse(afterNextBook)).toEqual({ chapterNum: 1, verseNum: 1 });
    await mainPage.keyboard.press('Control+F9');
    await expect(trigger).toHaveText(baseLabel);

    // Ctrl+B opens the control with the search input focused
    await mainPage.keyboard.press('Control+b');
    await expect(mainPage.locator('[cmdk-input]')).toBeVisible();
    await expect(mainPage.locator('[cmdk-input]')).toBeFocused();
    await mainPage.keyboard.press('Escape');
  });
});
