import { type Page } from '@playwright/test';
import { sendPapiRequestOnce, waitForPapiMethodRegistered } from './helpers';

/** Fixed GUID of the bundled sample WEB project (c-sharp/assets/WEB/Settings.xml <Guid>). */
export const SAMPLE_WEB_PROJECT_ID = '32664dc3288a28df2e2bb75ded887fc8f17a15fb';
const WEBSOCKET_PORT = 8876;
const COMMAND_TIMEOUT_MS = 30_000;

/**
 * Poll until the ProjectLookupService advertises the bundled sample WEB project. The generic
 * `waitForAtLeastOneProjectMetadata` is NOT sufficient here: other PDP factories (e.g. the lexical
 * reference resources SDBG/SDBH) can satisfy "at least one project" before the Paratext factory has
 * registered or finished installing the sample project into an empty isolated root — observed as a
 * `-32601 'object:platform.Paratext-pdpf.…' not found` failure on cold first launches.
 */
async function waitForSampleProjectMetadata(timeoutMs = 60_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      // Sequential polling: each attempt must finish (or time out) before the next.
      // eslint-disable-next-line no-await-in-loop
      const result = await sendPapiRequestOnce<{ id?: string }[]>(
        'object:ProjectLookupService.getMetadataForAllProjects',
        [],
        WEBSOCKET_PORT,
        Math.min(10_000, Math.max(1_000, timeoutMs - (Date.now() - start))),
      );
      // Project ids are hex GUIDs whose casing differs between surfaces; compare caseless.
      if (
        Array.isArray(result) &&
        result.some((project) => project?.id?.toLowerCase() === SAMPLE_WEB_PROJECT_ID)
      )
        return;
    } catch {
      /* ProjectLookupService or PDP factories not ready yet */
    }
    // Sequential polling: back off before the next attempt.
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2_000);
    });
  }
  throw new Error(`Sample WEB project metadata did not appear within ${timeoutMs}ms`);
}

/** Send one PAPI command over a short-lived WebSocket JSON-RPC connection. */
export async function sendPapiCommandWhenRegistered(
  commandName: string,
  ...args: unknown[]
): Promise<unknown> {
  // The extension host can still be activating extensions when the app shell renders; wait for
  // this exact command to be registered so the request cannot fail with method-not-found.
  await waitForPapiMethodRegistered(`command:${commandName}`, WEBSOCKET_PORT, 60_000);
  return sendPapiRequestOnce(`command:${commandName}`, args, WEBSOCKET_PORT, COMMAND_TIMEOUT_MS);
}

/**
 * Make the installed sample WEB project editable. Its Settings.xml ships `<Editable>F</Editable>`,
 * so `openScriptureEditor` would silently fall back to a read-only editor (main.ts overrides
 * isReadOnly from `platform.isEditable`) — and a read-only Lexical editor never moves the caret on
 * click, so caret-driven behavior cannot be exercised without this. Flipping the setting through
 * the PDP (same write path as the Project Settings UI) keeps the change inside the isolated temp
 * project root.
 */
export async function makeSampleProjectEditable(): Promise<void> {
  // Wait until the Paratext factory has registered AND the sample project is installed and
  // advertised — see waitForSampleProjectMetadata for why a generic any-project wait is racy.
  await waitForPapiMethodRegistered(
    'object:platform.Paratext-pdpf.getProjectDataProviderId',
    WEBSOCKET_PORT,
    60_000,
  );
  await waitForSampleProjectMetadata();
  const pdpId = await sendPapiRequestOnce<string>(
    'object:platform.Paratext-pdpf.getProjectDataProviderId',
    [SAMPLE_WEB_PROJECT_ID],
    WEBSOCKET_PORT,
    COMMAND_TIMEOUT_MS,
  );
  await sendPapiRequestOnce<boolean>(
    `object:${pdpId}.setSetting`,
    ['platform.isEditable', true],
    WEBSOCKET_PORT,
    COMMAND_TIMEOUT_MS,
  );
}

/**
 * Opens the EDITABLE scripture editor for the given project, waits for its iframe to attach, and
 * returns the editor's webViewId (usable as an `iframe[data-web-view-id="..."]` locator).
 *
 * Mirrors {@link openScriptureEditorForProject} (which opens the read-only resource viewer) and
 * `openCommentList` Phase A in `comment-test-helpers.ts`, including the loadLayout-race guard and
 * retry loop; see `openCommentList` for the full explanation of the race. The 60s per-request
 * timeout follows `openCommentList`: under the simple-mode layout (five auto-loading webviews) a
 * cold xvfb startup makes the command response slow enough that a 30s timeout flakes.
 *
 * @param mainPage The Electron main window page
 * @param projectId The id of the project to open the editable Scripture editor for
 * @returns The editor's webViewId
 */
export async function openEditableScriptureEditorForProject(
  mainPage: Page,
  projectId: string,
): Promise<string> {
  // Wait for the dock layout's initial loadLayout() to complete (signalled by the first iframe
  // appearing) so loadLayout can't wipe the newly added editor tab.
  await mainPage.waitForSelector('iframe', { state: 'attached', timeout: 30_000 });

  await waitForPapiMethodRegistered(
    'command:platformScriptureEditor.openScriptureEditor',
    WEBSOCKET_PORT,
    60_000,
  );

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
      'command:platformScriptureEditor.openScriptureEditor',
      [projectId],
      WEBSOCKET_PORT,
      60_000,
    );
    if (!editorId) continue;

    const editorIframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${editorId}"]`)
      .waitFor({ state: 'attached', timeout: attempt < 4 ? 8_000 : 20_000 })
      .then(() => true)
      .catch(() => false);
    if (editorIframeFound) return editorId;
  }
  /* eslint-enable no-await-in-loop, no-continue */

  throw new Error(
    `Could not open an editable Scripture editor for project ${projectId} after 5 attempts`,
  );
}

/** Navigate the main toolbar's book-chapter-verse control (drives scroll group A). */
export async function navigateToolbarBcv(mainPage: Page, reference: string): Promise<void> {
  await mainPage.locator('button[aria-label="book-chapter-trigger"]').first().click();
  const input = mainPage.locator('[data-radix-popper-content-wrapper] input');
  await input.fill(reference);
  await input.press('Enter');
}

/**
 * Wait for the Home dock tab so PAPI commands land in a ready app. (Not the canonical
 * `waitForAppReady` from fixtures/helpers.ts — this additionally proves the normal Home layout
 * rendered, which DEV_NOISY=false launches depend on.)
 */
export async function waitForHomeTab(mainPage: Page): Promise<void> {
  await mainPage.locator('.dock-tab', { hasText: 'Home' }).first().waitFor({ timeout: 90_000 });
}

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
