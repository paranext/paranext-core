import { type Frame, type Page } from '@playwright/test';
import {
  LAUNCH_PHASE_TIMEOUT_MS,
  requireIsolatedProjectRoot,
  SAMPLE_WEB_PROJECT_ID,
  sendPapiRequestOnce,
  waitForPapiMethodRegistered,
} from './helpers';

// Re-exported so the specs that reach for it through this module keep working: it is defined in
// helpers.ts, which is the lower-level module and the single home for it.
export { SAMPLE_WEB_PROJECT_ID };

/** Options accepted by {@link openScriptureEditorForProject}. */
export interface OpenScriptureEditorOptions {
  /**
   * Skip the wait for an existing iframe that guards against the initial loadLayout race. Pass true
   * only for a window whose initial layout demonstrably finished loading through some other signal
   * — e.g. a secondary window that already passed a dock-content probe (an empty-dock probe, or —
   * for a window that docks Home on the fly rather than starting truly empty — a probe that waited
   * for that Home tab specifically). Either probe already proves the initial loadLayout race is
   * over, which is what this guard exists to prove in the first place.
   */
  skipInitialLayoutGuard?: boolean;
}
const WEBSOCKET_PORT = 8876;
const COMMAND_TIMEOUT_MS = 30_000;

/**
 * Names of the three content-zoom commands (registered in
 * `src/main/services/web-view.service-router.ts`). Restated here rather than imported from
 * `@shared/models/content-zoom.model`'s `CONTENT_ZOOM_COMMANDS`: `e2e-tests/tsconfig.json` carries
 * no path aliases, so e2e specs cannot reach core source and this is the one place the literal is
 * kept.
 */
export const CONTENT_ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
} as const;

/**
 * The `<iframe data-web-view-id>` element's content frame — a real `Frame`, not a `FrameLocator`,
 * so `evaluate` can read the CSS custom properties the platform writes onto the pane's own
 * `documentElement`.
 */
export async function getEditorFrame(page: Page, webViewId: string): Promise<Frame> {
  const handle = await page.locator(`iframe[data-web-view-id="${webViewId}"]`).elementHandle();
  const frame = await handle?.contentFrame();
  if (!frame) throw new Error(`Editor iframe ${webViewId} has no content frame`);
  return frame;
}

/**
 * Reads one zoom area's effective factor straight off the CSS custom property the platform writes
 * as an inline style on the pane's `documentElement` (`pushContentZoom`'s
 * `root.style.setProperty`), so it is readable from inside the frame without going through any DOM
 * measurement. `areaId` is `''` for the `main` area.
 */
export async function readFactor(frame: Frame, areaId: string): Promise<number> {
  const value = await frame.evaluate(
    (variableName) =>
      getComputedStyle(document.documentElement).getPropertyValue(variableName).trim(),
    `--platform-content-zoom-${areaId || 'main'}`,
  );
  return Number(value);
}

/**
 * Sends a PAPI command from the renderer, exactly as a menu entry would (`window.papi` is exposed
 * on `globalThis` but not typed there). Used both for the three content-zoom commands (with an area
 * id) and for `platformScriptureEditor.toggleFootnotes` (without one).
 */
export async function sendCommandWithId(
  page: Page,
  commandName: string,
  webViewId: string,
  areaId?: string,
): Promise<void> {
  await page.evaluate(
    ([cmd, id, area]) => {
      // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
      // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const win = window as unknown as {
        papi: { commands: { sendCommand: (c: string, ...a: unknown[]) => Promise<unknown> } };
      };
      return area === undefined
        ? win.papi.commands.sendCommand(cmd, id)
        : win.papi.commands.sendCommand(cmd, id, area);
    },
    [commandName, webViewId, areaId] as const,
  );
}

/**
 * Shows the footnotes pane, tolerating that it may already be visible: Power mode's footnotes
 * auto-show/hide (`resolveFootnotesPaneAutoVisibility`) shows the pane by itself for any chapter
 * that has notes — so sending `toggleFootnotes` unconditionally would just as often HIDE an
 * already-auto-shown pane.
 */
export async function ensureFootnotesVisible(
  page: Page,
  frame: Frame,
  webViewId: string,
): Promise<void> {
  const footnotesRoot = frame.locator(
    '[data-platform-content-zoom-root="footnotes"]:not([data-platform-content-zoom-popup])',
  );
  if ((await footnotesRoot.count()) === 0) {
    await sendCommandWithId(page, 'platformScriptureEditor.toggleFootnotes', webViewId);
  }
  await footnotesRoot.waitFor({ state: 'attached', timeout: 20_000 });
}
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
 *
 * Writes project data, so it refuses to run unless the app was launched with `isolatedProjectRoot:
 * true`: there is no restore, and the sample project's id is the one the backend installs into a
 * developer's real project root too.
 */
export async function makeSampleProjectEditable(): Promise<void> {
  requireIsolatedProjectRoot();
  const pdpId = await getSampleProjectDataProviderId();
  await sendPapiRequestOnce<boolean>(
    `object:${pdpId}.setSetting`,
    ['platform.isEditable', true],
    WEBSOCKET_PORT,
    COMMAND_TIMEOUT_MS,
  );
}

/**
 * Resolves the sample WEB project's data provider id once the Paratext factory has registered AND
 * the sample project is installed and advertised — see waitForSampleProjectMetadata for why a
 * generic any-project wait is racy, and LAUNCH_PHASE_TIMEOUT_MS for why this factory in particular
 * needs the cold-boot budget.
 */
async function getSampleProjectDataProviderId(): Promise<string> {
  await waitForPapiMethodRegistered(
    'object:platform.Paratext-pdpf.getProjectDataProviderId',
    WEBSOCKET_PORT,
    LAUNCH_PHASE_TIMEOUT_MS,
  );
  await waitForSampleProjectMetadata();
  return sendPapiRequestOnce<string>(
    'object:platform.Paratext-pdpf.getProjectDataProviderId',
    [SAMPLE_WEB_PROJECT_ID],
    WEBSOCKET_PORT,
    COMMAND_TIMEOUT_MS,
  );
}

/** The book/chapter selector the chapter USFM data type takes; `verseNum` is ignored for chapters. */
export interface SampleChapterRef {
  book: string;
  chapterNum: number;
  verseNum: number;
}

/**
 * Rewrites one chapter of the sample WEB project through its data provider — read the chapter's
 * USFM, pass it through `transform`, write the result back — so a spec can put markers the sample
 * text does not contain in front of real verses. Writes project data, so it refuses to run unless
 * the app was launched with `isolatedProjectRoot: true`: without that option it would rewrite the
 * developer's own copy of the sample project, with no restore.
 *
 * Going through PAPI rather than editing the SFM file on disk means the write lands the same way an
 * editor save does: the provider re-parses it and every open editor for the chapter is notified.
 */
export async function rewriteSampleProjectChapterUsfm(
  chapter: SampleChapterRef,
  transform: (usfm: string) => string,
): Promise<void> {
  requireIsolatedProjectRoot();
  const pdpId = await getSampleProjectDataProviderId();
  const usfm = await sendPapiRequestOnce<string | undefined>(
    `object:${pdpId}.getChapterUSFM`,
    [chapter],
    WEBSOCKET_PORT,
    COMMAND_TIMEOUT_MS,
  );
  if (!usfm)
    throw new Error(`Sample project has no USFM for ${chapter.book} ${chapter.chapterNum}`);
  await sendPapiRequestOnce(
    `object:${pdpId}.setChapterUSFM`,
    [chapter, transform(usfm)],
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
 * Commits with Enter only AFTER the top-match row displays the typed reference: the control parses
 * the input asynchronously, so an immediate Enter can race the parse and commit the previous
 * reference (observed as "typed EXO 2:3, still on Genesis 1:1"). The `(?!\d)` anchor keeps a
 * wrong-chapter row from false-matching — "Mark 4" accepts "Mark 4:1" but rejects "Mark 40:1".
 *
 * A `\b` anchor cannot do that job here. The row renders the reference and the book id as adjacent
 * spans with no whitespace between them, so `hasText` sees one run of "Jonah 1:1JON" — a digit
 * followed by a letter, which is not a word boundary, so `\b` never matches any verse-level
 * reference. `(?!\d)` asserts what the anchor is actually for: the number must have ended.
 *
 * Deliberately NOT keyed on cmdk's `data-selected` highlight: that highlight sits on a cell of the
 * chapter preview grid below this row, never on the row itself, and Enter submits the row's
 * reference rather than whatever cmdk has highlighted.
 *
 * Pass `reference` with the ENGLISH book name ("Exodus 2:3", not "EXO 2:3"): the row renders the
 * book name localized, and the app under test runs in English, so a book CODE never matches.
 */
export async function navigateToolbarBcv(mainPage: Page, reference: string): Promise<void> {
  await mainPage.locator('button[aria-label="book-chapter-trigger"]').first().click();
  const input = mainPage.locator('[data-radix-popper-content-wrapper] input');
  await input.fill(reference);
  const topMatchRow = mainPage.locator('[data-radix-popper-content-wrapper] [cmdk-item]', {
    hasText: new RegExp(`${escapeForRegExp(reference)}(?!\\d)`, 'i'),
  });
  await topMatchRow.first().waitFor({ timeout: 10_000 });
  await input.press('Enter');
  // The popover closing confirms the commit was accepted before callers assert on the outcome.
  await input.waitFor({ state: 'hidden', timeout: 10_000 });
}

/**
 * `SIMPLE_COLUMN_MIN_WIDTH_PX` from `simple-layout.data.ts`, plus room for the rounding the dock's
 * flex weights introduce. Assert it as an upper bound on the editor column's width after a drag to
 * the floor, so a spec states that the drag really reached the floor rather than stopping somewhere
 * comfortable.
 */
export const COLUMN_FLOOR_CEILING_PX = 310;

/** Width of the Simple-mode editor column (the middle dock panel), rounded to whole pixels. */
export async function getEditorColumnWidth(mainPage: Page): Promise<number> {
  return mainPage
    .locator('.dock-panel')
    .nth(1)
    .evaluate((el) => Math.round(el.getBoundingClientRect().width));
}

/**
 * Drags the divider between the editor column and the resources column to the left by `distancePx`,
 * in steps rc-dock will track. Pass `Number.POSITIVE_INFINITY` to drag as far as the window allows:
 * the dock clamps the column at its floor, which is the state the column-floor specs are about.
 */
export async function dragEditorColumnDividerLeft(
  mainPage: Page,
  distancePx: number,
): Promise<void> {
  // The second divider is the one between the editor column and the resources column.
  const divider = mainPage.locator('.dock-divider').nth(1);
  const dividerBox = await divider.boundingBox();
  if (!dividerBox) throw new Error('The editor/resources divider has no bounding box');
  const startX = dividerBox.x + dividerBox.width / 2;
  const y = dividerBox.y + dividerBox.height / 2;
  const targetX = Math.max(1, startX - distancePx);
  await mainPage.mouse.move(startX, y);
  await mainPage.mouse.down();
  // Stepped, and with a small first nudge: rc-dock's drag manager starts tracking on the first
  // move that differs from where the press landed, so a single jump to the target does nothing.
  const dragPath = [startX - 5];
  for (let x = startX - 5; x > targetX; x -= 40) dragPath.push(Math.max(x - 40, targetX));
  // Sequenced through a promise chain rather than an await-in-loop: the moves have to arrive in
  // order.
  await dragPath.reduce(
    (previous, x) => previous.then(() => mainPage.mouse.move(x, y)),
    Promise.resolve(),
  );
  await mainPage.mouse.up();
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
          // `.first()` because `isVisible()` runs in strict mode: two matches — a Radix portal
          // duplicating the trigger while a menu is open, say — would throw rather than answer, and
          // the catch below would read that as "not the editor frame" and skip the frame that
          // actually had it, every poll, until the helper reported the opposite of what happened.
          const isVisible = await frame.locator(EDITOR_HAMBURGER_SELECTOR).first().isVisible();
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
