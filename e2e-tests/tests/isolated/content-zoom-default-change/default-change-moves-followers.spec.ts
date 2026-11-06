/**
 * E2E for a LIVE change to the Settings default (`platform.webViewContentZoom`, the setting
 * `content-zoom-default-level.spec.ts` seeds before launch): panes with their own remembered level
 * ("own-level" panes) are untouched, and panes with none ("follower" panes) move to the new default
 * — silently, with no zoom indicator, since a settings-driven change is not a user zoom gesture on
 * the pane it lands in.
 *
 * `web-view-content-zoom.service.ts`'s `repushAllPanes` (run from the `platform.webViewContentZoom`
 * subscription) is the mechanism: it re-pushes every open pane's effective level — its own, else
 * the new default — with no `indicator` argument, so `pushContentZoom` never calls the bootstrap's
 * `showIndicator`.
 *
 * Both panes belong to the same disposable comment-test project — the "own-level"/"follower"
 * distinction this spec is about comes from the pane's AREA key (`editor:<id>:main` vs.
 * `notes:<id>:main`), never from which project it belongs to, so one project is enough. This also
 * sidesteps a real conflict: `createCommentTestProject` writes its project into the real Paratext 9
 * Projects folder, which is scanned once at app startup and which an `isolatedProjectRoot` launch
 * never sees (that option redirects the app at an empty temp root instead) — the sample WEB project
 * and a `createCommentTestProject` copy cannot both be reachable from the same launch.
 *
 * Runs against the real (non-isolated) project root: `npm run test:e2e:isolated
 * content-zoom-default-change`.
 */
import { type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  type CommentTestProject,
  cleanupCommentTestProject,
  createCommentTestProject,
  createCommentThreads,
  openCommentList,
} from '../../../fixtures/comment-test-helpers';
import { INDICATOR_SELECTOR, zoomAreaTo } from '../../../fixtures/content-zoom-helpers';
import { waitForOpenWebViewIdByType } from '../../../fixtures/helpers';
import {
  getEditorFrame,
  openEditableScriptureEditorForProject,
  readFactor,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/** `webViewType` of the comment list web view (`legacyCommentManager.main.ts`). */
const COMMENT_LIST_WEBVIEW_TYPE = 'legacyCommentManager.commentList';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
});

/**
 * Writes `platform.webViewContentZoom` (the Settings default) straight through the renderer's PAPI,
 * the live counterpart to `content-zoom-default-level.spec.ts`'s pre-launch `seedSettings` — that
 * spec seeds the default before the app starts (there is nothing yet to move); this one changes it
 * while panes are already open, which is what moving a FOLLOWER pane needs.
 */
async function setDefaultZoomSetting(page: Page, factor: number): Promise<void> {
  await page.evaluate((value) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // `readContentZoomMemory` in content-zoom-helpers.ts).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { set: (key: string, value: number) => Promise<boolean> } };
    };
    return win.papi.settings.set('platform.webViewContentZoom', value);
  }, factor);
}

test.describe('a live Settings-default change moves only follower panes', () => {
  let project: CommentTestProject;

  test.beforeAll(async () => {
    project = await createCommentTestProject([], '_default_change');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test('an own-level editor pane is untouched; a default-level comment list follows, silently', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);

    // The comment-test project is already editable (`createCommentTestProject` flips the flag on
    // its copy), so no separate "make it editable" step is needed here.
    const editorId = await openEditableScriptureEditorForProject(mainPage, project.projectId);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await test.step('the editor takes its own level, no longer following the default', async () => {
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1.4);
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.4);
    });

    await createCommentThreads(project, ['GEN 1:1'], ['Default-change follower marker']);
    await openCommentList(mainPage, project);
    const listId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
    const listFrame = await getEditorFrame(mainPage, listId);
    await expect(listFrame.locator('body')).toContainText('Default-change follower marker', {
      timeout: 90_000,
    });

    await test.step('the comment list opens at the (unseeded) default, with no level of its own', async () => {
      await expect.poll(() => readFactor(listFrame, '')).toBe(1);
    });

    await test.step('changing the Settings default moves the comment list, not the editor', async () => {
      await setDefaultZoomSetting(mainPage, 1.15);

      // The follower moves to the new default...
      await expect.poll(() => readFactor(listFrame, '')).toBe(1.15);
      // ...while the own-level editor is exactly where it was.
      expect(await readFactor(editorFrame, '')).toBe(1.4);
    });

    await test.step('the moved pane shows no indicator — the change came from Settings, not a gesture', async () => {
      // Never asserted on the editor here: it was deliberately zoomed by a real gesture earlier in
      // this same test, so its badge legitimately carries that gesture's `data-area="main"` already —
      // checking it again would conflate "never shown" with "not shown for THIS change".
      const listIndicator = listFrame.locator(INDICATOR_SELECTOR);
      await expect(listIndicator).not.toHaveAttribute('data-area', /.*/);
    });
  });
});
