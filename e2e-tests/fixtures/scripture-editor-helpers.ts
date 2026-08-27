import { type Frame, type Page } from '@playwright/test';
import { sendPapiRequestOnce, waitForPapiMethodRegistered } from './helpers';

/** Options accepted by {@link openScriptureEditorForProject}. */
export interface OpenScriptureEditorOptions {
  /**
   * Skip the wait for an existing iframe that guards against the initial loadLayout race. Pass true
   * only for a window whose initial layout demonstrably finished loading through some other signal
   * — e.g. an empty secondary window that already passed an empty-dock probe. Such a window never
   * gets an initial iframe, so for it the guard would time out instead of protect.
   */
  skipInitialLayoutGuard?: boolean;
}

/**
 * Opens a Scripture editor (resource viewer) for the given project, waits for its iframe to attach
 * in the given window, and returns the new editor's web view id.
 *
 * The top toolbar's BookChapterControl is disabled until a scripture-navigable web view is open
 * (nothing to navigate), and a fresh test profile opens none on its own — so tests that exercise
 * the top control open an editor first, then assert the enabled state as a hard expectation.
 *
 * The generic `openResourceViewer` command routes to the FOCUSED window, so tests working with
 * multiple windows must focus the target window before calling this. The iframe appearing in `page`
 * is the placement proof the wait enforces: a freshly created web view keeps its raw id, so that id
 * existing in a window's document can only mean placement put it there.
 *
 * Mirrors `openCommentList` in `comment-test-helpers.ts`, including its loadLayout-race guard and
 * retry loop; see that helper for the full explanation of the race.
 *
 * @param page The window the editor's iframe is expected to attach in
 * @param projectId The id of the project to open a Scripture editor for
 * @returns The web view id of the opened editor
 */
export async function openScriptureEditorForProject(
  page: Page,
  projectId: string,
  options: OpenScriptureEditorOptions = {},
): Promise<string> {
  if (!options.skipInitialLayoutGuard) {
    // Wait for the dock layout's initial loadLayout() to complete (signalled by the first iframe —
    // the Home webview — appearing) so loadLayout can't wipe the newly added editor tab
    await page.waitForSelector('iframe', { state: 'attached', timeout: 30_000 });
  }

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

    const editorIframeFound = await page
      .locator(`iframe[data-web-view-id="${editorId}"]`)
      .waitFor({ state: 'attached', timeout: attempt < 4 ? 8_000 : 20_000 })
      .then(() => true)
      .catch(() => false);
    if (editorIframeFound) return editorId;
  }
  /* eslint-enable no-await-in-loop, no-continue */

  throw new Error(`Could not open a Scripture editor for project ${projectId} after 5 attempts`);
}

/**
 * The scripture editor's hamburger ("Project") menu button.
 *
 * The Find panel's own project picker carries the SAME `aria-label="Project"`, so a bare
 * `button[aria-label="Project"]` scan can land on the Find frame instead of the editor's — Find is
 * a permanent tab and is already mounted. `ProjectSelector` renders its trigger with
 * `role="combobox"`; the editor hamburger is a `DropdownMenuTrigger` and is not, so excluding the
 * combobox role separates them.
 */
export const EDITOR_HAMBURGER_SELECTOR = 'button[aria-label="Project"]:not([role="combobox"])';

/**
 * Find the scripture editor's frame by scanning all web-view iframes for the one that contains the
 * Project hamburger button.
 *
 * We cannot use `nth(0)` because other webviews (the home page with DEV_NOISY=false, or helloRock3
 * frames with DEV_NOISY=true) may be present before the scripture editor in the iframe list.
 */
export async function findScriptureEditorFrame(page: Page, timeout = 30_000): Promise<Frame> {
  const deadline = Date.now() + timeout;

  const checkFrames = async (): Promise<Frame | undefined> =>
    // Using reduce to iterate without for-of (linter requirement). Each step checks a frame and
    // short-circuits once a match is found.
    page
      .frames()
      .filter((f) => f !== page.mainFrame())
      .reduce<Promise<Frame | undefined>>(async (accPromise, frame) => {
        const acc = await accPromise;
        if (acc) return acc;
        try {
          const isVisible = await frame.locator(EDITOR_HAMBURGER_SELECTOR).isVisible();
          if (isVisible) return frame;
        } catch {
          // Frame may not be accessible yet — keep polling
        }
        return undefined;
      }, Promise.resolve(undefined));

  while (Date.now() < deadline) {
    // Polling loop: each check depends on the previous result
    // eslint-disable-next-line no-await-in-loop
    const found = await checkFrames();
    if (found) return found;
    // Polling loop: wait between frame-scan attempts must be sequential
    // eslint-disable-next-line no-await-in-loop
    await page.waitForTimeout(500);
  }
  throw new Error(`Scripture editor not found: no Project button visible after ${timeout}ms`);
}
