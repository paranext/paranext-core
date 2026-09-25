/**
 * E2E for content zoom's live sharing between two ALREADY-OPEN panes of one project: zooming one
 * editor tab moves a second, already-open editor tab of the same project to the same level with no
 * reopen, and resetting the first returns both to the default — all silently (no indicator on the
 * pane that did not receive the gesture).
 *
 * This is a different guarantee from the "reopen and inherit the remembered level" steps in
 * `content-zoom.spec.ts` and `comment-list-content-zoom.spec.ts`: those open a SECOND pane only
 * AFTER the first has already written its level, so they exercise the SEED path (a fresh pane reads
 * memory once, on open). Here both panes are open BEFORE the zoom gesture, so the follower's factor
 * has to change while it is already rendered — the LIVE sync path (`syncSiblingsFromMemory` in
 * `web-view-content-zoom.service.ts`, run from the `platform.webViewContentZoomMemory`
 * subscription), never exercised end-to-end anywhere else in this suite.
 *
 * The source's own doc comment on `syncSiblingsFromMemory` states the contract this spec pins:
 * "every open pane whose entries changed is brought in line, silently (no indicator; the pane the
 * user acted on already showed one)" and "an area whose key `previousMemory` had and `memory` no
 * longer does gives up its own level, which is how a reset in one pane returns its siblings with
 * it."
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated content-zoom-live-sharing`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { INDICATOR_SELECTOR, zoomAreaTo } from '../../../fixtures/content-zoom-helpers';
import {
  CONTENT_ZOOM_COMMANDS,
  getEditorFrame,
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  openScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('content zoom shares live between two already-open tabs of one project', () => {
  test('zooming one editor tab moves the other with no reopen; a reset returns both', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    // Two INDEPENDENT panes of the same project, both open before any zoom gesture: the editable
    // editor and a read-only viewer, exactly as `content-zoom.spec.ts`'s own closing step opens a
    // second pane of the same project — but there that pane opens AFTER the first has already
    // written its level (the seed path); here both exist first, so the assertions below can only
    // pass through the live sync path.
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    const viewerId = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const viewerFrame = await getEditorFrame(mainPage, viewerId);
    await viewerFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
    await expect.poll(() => readFactor(viewerFrame, '')).toBe(1);

    await test.step('zooming the editor moves the already-open viewer, with no indicator on it', async () => {
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1.3);
      // The viewer never received a gesture of its own — poll rather than a bare read, since the
      // sync rides the same debounced memory write the zoom itself waits on.
      await expect.poll(() => readFactor(viewerFrame, '')).toBe(1.3);

      const viewerIndicator = viewerFrame.locator(INDICATOR_SELECTOR);
      await expect(viewerIndicator).not.toHaveAttribute('data-area', /.*/);
    });

    await test.step('resetting the editor returns both panes to the default', async () => {
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
      // The reset deletes the shared memory key rather than writing the default back — the viewer's
      // own level (never its own; it only ever mirrored the editor's) must give it up too.
      await expect.poll(() => readFactor(viewerFrame, '')).toBe(1);

      const viewerIndicator = viewerFrame.locator(INDICATOR_SELECTOR);
      await expect(viewerIndicator).not.toHaveAttribute('data-area', /.*/);
    });
  });
});
