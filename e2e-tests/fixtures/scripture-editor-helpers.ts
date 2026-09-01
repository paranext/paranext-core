import { type Page } from '@playwright/test';
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
/** Fixed GUID of the bundled sample WEB project (c-sharp/assets/WEB/Settings.xml <Guid>). */
export const SAMPLE_WEB_PROJECT_ID = '32664dc3288a28df2e2bb75ded887fc8f17a15fb';
const WEBSOCKET_PORT = 8876;
const COMMAND_TIMEOUT_MS = 30_000;
/**
 * Budget for anchors that gate on a cold app launch (extension host activation, Paratext PDP
 * factory registration, dock layout render). On the coldest first Electron launch after a fresh
 * dev-server start — ts-node transpiling the extension host, the C# data provider booting,
 * extensions activating — the Paratext factory has been observed taking over 60s to appear in
 * rpc.discover, so 60s budgets lose the race and fail runs that would have passed moments later.
 * Pure patience: these are polling waits, so warm launches return in seconds and a generous budget
 * costs green runs nothing.
 */
const LAUNCH_PHASE_TIMEOUT_MS = 120_000;

/**
 * Poll until the ProjectLookupService advertises the bundled sample WEB project. The generic
 * `waitForAtLeastOneProjectMetadata` is NOT sufficient here: other PDP factories (e.g. the lexical
 * reference resources SDBG/SDBH) can satisfy "at least one project" before the Paratext factory has
 * registered or finished installing the sample project into an empty isolated root — observed as a
 * `-32601 'object:platform.Paratext-pdpf.…' not found` failure on cold first launches.
 */
async function waitForSampleProjectMetadata(timeoutMs = LAUNCH_PHASE_TIMEOUT_MS): Promise<void> {
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
  await waitForPapiMethodRegistered(
    `command:${commandName}`,
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
  );
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
  // advertised — see waitForSampleProjectMetadata for why a generic any-project wait is racy, and
  // LAUNCH_PHASE_TIMEOUT_MS for why this factory in particular needs the cold-boot budget.
  await waitForPapiMethodRegistered(
    'object:platform.Paratext-pdpf.getProjectDataProviderId',
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
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
 * Shared engine for the open-editor helpers: waits for the dock layout's initial loadLayout() to
 * finish (signalled by the first iframe — the Home webview — appearing) so loadLayout can't wipe
 * the newly added editor tab, waits for `commandName` to register, then retries the open command up
 * to 5 times, each attempt waiting for the returned web view's iframe to attach.
 *
 * The generic `openResourceViewer` command routes to the FOCUSED window, so tests working with
 * multiple windows must focus the target window before calling this. The iframe appearing in `page`
 * is the placement proof the wait enforces: a freshly created web view keeps its raw id, so that id
 * existing in a window's document can only mean placement put it there.
 *
 * Mirrors `openCommentList` in `comment-test-helpers.ts`, including its loadLayout-race guard and
 * retry loop; see that helper for the full explanation of the race. The 60s per-request timeout
 * also follows `openCommentList`: under the simple-mode layout (five auto-loading webviews) a cold
 * xvfb startup makes the command response slow enough that a 30s timeout flakes.
 *
 * @param page The window the editor's iframe is expected to attach in
 * @param commandName The PAPI command that opens the editor, without the `command:` prefix
 * @param projectId The id of the project to open the editor for
 * @param editorDescription Human-readable editor name used in the "could not open" failure message
 * @param options Caller overrides — see {@link OpenScriptureEditorOptions}
 * @returns The opened editor's webViewId (usable as an `iframe[data-web-view-id="..."]` locator)
 */
async function openEditorViaCommand(
  page: Page,
  commandName: string,
  projectId: string,
  editorDescription: string,
  options: OpenScriptureEditorOptions = {},
): Promise<string> {
  if (!options.skipInitialLayoutGuard) {
    // Wait for the dock layout's initial loadLayout() to complete (signalled by the first iframe —
    // the Home webview — appearing) so loadLayout can't wipe the newly added editor tab.
    await page.waitForSelector('iframe', {
      state: 'attached',
      timeout: LAUNCH_PHASE_TIMEOUT_MS,
    });
  }

  await waitForPapiMethodRegistered(
    `command:${commandName}`,
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
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
      `command:${commandName}`,
      [projectId],
      WEBSOCKET_PORT,
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

  throw new Error(`Could not open ${editorDescription} for project ${projectId} after 5 attempts`);
}

/**
 * Opens the EDITABLE scripture editor for the given project, waits for its iframe to attach, and
 * returns the editor's webViewId (usable as an `iframe[data-web-view-id="..."]` locator).
 *
 * @param mainPage The Electron main window page
 * @param projectId The id of the project to open the editable Scripture editor for
 * @returns The editor's webViewId
 */
export async function openEditableScriptureEditorForProject(
  mainPage: Page,
  projectId: string,
): Promise<string> {
  return openEditorViaCommand(
    mainPage,
    'platformScriptureEditor.openScriptureEditor',
    projectId,
    'an editable Scripture editor',
  );
}

/**
 * Escapes regex metacharacters so a reference can be embedded in a pattern literally. References
 * carry `.` (in abbreviations) and other metacharacters that would otherwise widen the match.
 */
function escapeForRegExp(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

/**
 * Navigate the main toolbar's book-chapter-verse control (drives scroll group A).
 *
 * Commits with Enter only AFTER cmdk's highlighted (`data-selected`) item is the top match for the
 * typed reference: cmdk moves its highlight asynchronously after the input changes, so an immediate
 * Enter can race it and activate the previously-highlighted book instead (observed as "typed EXO
 * 2:3, still on Genesis 1:1"). The `\b` anchor keeps a wrong-chapter highlight from false-matching
 * (e.g. "Mark 4\b" accepts "Mark 4:1" but rejects "Mark 40:1").
 *
 * Pass `reference` with the ENGLISH book name ("Exodus 2:3", not "EXO 2:3"): the top-match item
 * renders through `formatScrRef(..., 'English')`, so a book CODE never matches its own item.
 */
export async function navigateToolbarBcv(mainPage: Page, reference: string): Promise<void> {
  await mainPage.locator('button[aria-label="book-chapter-trigger"]').first().click();
  const input = mainPage.locator('[data-radix-popper-content-wrapper] input');
  await input.fill(reference);
  const highlightedTopMatch = mainPage.locator(
    '[data-radix-popper-content-wrapper] [cmdk-item][data-selected="true"]',
    { hasText: new RegExp(`${escapeForRegExp(reference)}\\b`, 'i') },
  );
  await highlightedTopMatch.waitFor({ timeout: 10_000 });
  await input.press('Enter');
  // The popover closing confirms the commit was accepted before callers assert on the outcome.
  await input.waitFor({ state: 'hidden', timeout: 10_000 });
}

/**
 * Wait for the Home dock tab so PAPI commands land in a ready app. (Not the canonical
 * `waitForAppReady` from fixtures/helpers.ts — this additionally proves the normal Home layout
 * rendered, which DEV_NOISY=false launches depend on.)
 */
export async function waitForHomeTab(mainPage: Page): Promise<void> {
  await mainPage
    .locator('.dock-tab', { hasText: 'Home' })
    .first()
    .waitFor({ timeout: LAUNCH_PHASE_TIMEOUT_MS });
}

/**
 * Opens a Scripture editor (resource viewer) for the given project and waits for its iframe to
 * attach.
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
 * @param page The window the editor's iframe is expected to attach in
 * @param projectId The id of the project to open a Scripture editor for
 * @param options Caller overrides — see {@link OpenScriptureEditorOptions}
 * @returns The web view id of the opened editor
 */
export async function openScriptureEditorForProject(
  page: Page,
  projectId: string,
  options: OpenScriptureEditorOptions = {},
): Promise<string> {
  return openEditorViaCommand(
    page,
    'platformScriptureEditor.openResourceViewer',
    projectId,
    'a Scripture editor',
    options,
  );
}
