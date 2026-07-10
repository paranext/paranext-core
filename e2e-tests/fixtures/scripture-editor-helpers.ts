import { type Page } from '@playwright/test';
import { sendPapiRequestOnce, waitForPapiMethodRegistered } from './helpers';

/**
 * Opens a Scripture editor (resource viewer) for the given project and waits for its iframe to
 * attach.
 *
 * The top toolbar's BookChapterControl is disabled until a scripture-navigable web view is open
 * (nothing to navigate), and a fresh test profile opens none on its own — so tests that exercise
 * the top control open an editor first, then assert the enabled state as a hard expectation.
 *
 * Mirrors `openCommentList` in `comment-test-helpers.ts`, including its loadLayout-race guard and
 * retry loop; see that helper for the full explanation of the race.
 *
 * @param mainPage The Electron main window page
 * @param projectId The id of the project to open a Scripture editor for
 */
export async function openScriptureEditorForProject(
  mainPage: Page,
  projectId: string,
): Promise<void> {
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
