/**
 * E2E for how content zoom behaves across panes that are open at the same time, and for which panes
 * take part in it at all:
 *
 * - Live sharing between two ALREADY-OPEN panes of one project: zooming one editor tab moves a
 *   second, already-open editor tab of the same project to the same level with no reopen, and
 *   resetting the first returns both to the default — all silently (no indicator on the pane that
 *   did not receive the gesture).
 * - A LIVE change to the Settings default (`platform.webViewContentZoom`): panes with their own
 *   remembered level ("own-level" panes) are untouched, and panes with none ("follower" panes) move
 *   to the new default, silently.
 * - Only zoomable panes zoom, and only they offer zoom: a pane that shows no project text (Home) is
 *   never scaled by content zoom whatever the Settings default, its tab menu has no zoom items, and
 *   the zoom chord inside it changes nothing. In Simple mode such a tab has no tab menu at all, by
 *   mouse or by Shift+F10.
 *
 * Live sharing is a different guarantee from the "reopen and inherit the remembered level" steps in
 * `content-zoom.spec.ts` and `comment-list-content-zoom.spec.ts`: those open a SECOND pane only
 * AFTER the first has already written its level, so they exercise the SEED path (a fresh pane reads
 * memory once, on open). Here both panes are open BEFORE the zoom gesture, so the follower's factor
 * has to change while it is already rendered — the LIVE sync path (`syncSiblingsFromMemory` in
 * `web-view-content-zoom.service.ts`, run from the `platform.webViewContentZoomMemory`
 * subscription).
 *
 * The source's own doc comment on `syncSiblingsFromMemory` states the contract the sharing test
 * pins: "every open pane whose entries changed is brought in line, silently (no indicator; the pane
 * the user acted on already showed one)" and "an area whose key `previousMemory` had and `memory`
 * no longer does gives up its own level, which is how a reset in one pane returns its siblings with
 * it."
 *
 * The default change is `web-view-content-zoom.service.ts`'s `repushAllPanes` (run from the
 * `platform.webViewContentZoom` subscription): it re-pushes every open pane's effective level — its
 * own, else the new default — with no `indicator` argument, so `pushContentZoom` never calls the
 * bootstrap's `showIndicator`. The own-level/follower distinction comes from the pane's AREA key
 * (`editor:<id>:main` vs. `notes:<id>:main`), never from which project it belongs to, so both of
 * that test's panes belong to one disposable comment-test project.
 *
 * Home is the non-zoomable tab in both modes. Every fixed Simple Column-3 tab is declared zoomable,
 * and `platformGetResources.openHome` opens Home as a floating tab in Simple mode. Each mode has a
 * declared pane as its positive control: a Scripture editor in Power mode, and Find in Simple
 * mode's Column 3.
 *
 * The launch states differ, so each describe block starts its own app:
 *
 * - Live sharing: Power mode against an isolated project root (the bundled sample WEB is installed
 *   into the empty root);
 * - Default change: Power mode against the real (non-isolated) project root, because
 *   `createCommentTestProject` writes into the real Paratext 9 Projects folder, which is scanned
 *   once at app startup and which an `isolatedProjectRoot` launch never sees — the sample WEB
 *   project and a `createCommentTestProject` copy cannot both be reachable from one launch;
 * - Zoomable panes: Power mode, then Simple mode, each with the Settings default seeded before
 *   launch.
 *
 * `npm run test:e2e:isolated content-zoom-live-sharing`.
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
import {
  CONTENT_ZOOM_MEMORY_SETTING,
  INDICATOR_SELECTOR,
  setDefaultZoomSetting,
  zoomAreaTo,
} from '../../../fixtures/content-zoom-helpers';
import {
  waitForAppReady,
  waitForOpenWebViewIdByType,
  waitForOverlayGone,
} from '../../../fixtures/helpers';
import {
  CONTENT_ZOOM_COMMANDS,
  getEditorFrame,
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  openScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  sendPapiCommandWhenRegistered,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/** `webViewType` of the comment list web view (`legacyCommentManager.main.ts`). */
const COMMENT_LIST_WEBVIEW_TYPE = 'legacyCommentManager.commentList';
/** `webViewType` of Home (`extensions/src/platform-get-resources/src/main.ts`). */
const HOME_WEBVIEW_TYPE = 'platformGetResources.home';
/** `webViewType` of Find (`FIND_WEBVIEW_TYPE` in `src/shared/models/web-view.model.ts`). */
const FIND_WEBVIEW_TYPE = 'platformScripture.find';
/** The Settings default seeded before launch: far enough from 100 % that a scaled Home is obvious. */
const SEEDED_DEFAULT = 1.5;

/** The CSS `zoom` on a pane's host `<iframe>` element: `''` when content zoom never scaled it. */
async function hostZoomOf(page: Page, webViewId: string): Promise<string> {
  return page
    .locator(`iframe[data-web-view-id="${webViewId}"]`)
    .evaluate((element) => element.style.zoom);
}

test.describe('content zoom shares live between two already-open tabs of one project', () => {
  test.use({
    interfaceMode: 'power',
    electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  });

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

test.describe('a live Settings-default change moves only follower panes', () => {
  test.use({
    interfaceMode: 'power',
    // A pinned default and an emptied zoom memory, because a default or a remembered level from the
    // developer's own app would win over the unseeded default this test asserts on
    seedSettings: {
      'platform.webViewContentZoom': 1,
      [CONTENT_ZOOM_MEMORY_SETTING]: {},
    },
    electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  });

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

test.describe('only zoomable panes zoom and offer zoom: Power mode', () => {
  test.use({
    interfaceMode: 'power',
    // An emptied zoom memory, because a level the developer's own app remembered for the sample
    // project's text area would win over the seeded default
    seedSettings: {
      'platform.webViewContentZoom': SEEDED_DEFAULT,
      [CONTENT_ZOOM_MEMORY_SETTING]: {},
    },
    electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  });
  test.setTimeout(300_000);

  test('Home is never scaled and offers no zoom; a Scripture editor offers it', async ({
    mainPage,
  }) => {
    test.slow();
    await waitForHomeTab(mainPage);
    const homeId = await waitForOpenWebViewIdByType(mainPage, HOME_WEBVIEW_TYPE);
    const homeTab = mainPage.locator(`.platform-tab-title[data-web-view-id="${homeId}"]`);
    const homeFrame = await getEditorFrame(mainPage, homeId);
    const homeInput = homeFrame.locator('input').first();
    await homeInput.waitFor();

    const editorId = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // The editor may open over Home in the same tab stack; Home's geometry reads need it shown.
    await homeTab.click();
    await homeInput.waitFor();

    await test.step('the seeded default reached the declared pane (control)', async () => {
      await expect.poll(() => readFactor(editorFrame, '')).toBe(SEEDED_DEFAULT);
    });

    await test.step('Home renders at 100 % content zoom although the default is 150 %', async () => {
      // Home loaded at launch, long before the editor above, so any delayed whole-view scale (the
      // one-second stale-area wait) would have landed by now.
      expect(await hostZoomOf(mainPage, homeId)).toBe('');
      const before = await homeInput.boundingBox();
      expect(before).not.toBeNull();
      await setDefaultZoomSetting(mainPage, 1);
      // Control: the change reached a zoomable pane, so an unchanged Home below is the rule at work.
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
      expect((await homeInput.boundingBox())?.height).toBe(before?.height);
      expect(await hostZoomOf(mainPage, homeId)).toBe('');
    });

    await test.step('Ctrl+= inside Home changes nothing', async () => {
      await homeInput.click();
      const before = await homeInput.boundingBox();
      expect(before).not.toBeNull();
      await mainPage.keyboard.press('Control+Equal');
      expect(await hostZoomOf(mainPage, homeId)).toBe('');
      expect((await homeInput.boundingBox())?.height).toBe(before?.height);
    });

    await test.step("the Scripture editor's tab menu offers the zoom items (control)", async () => {
      await mainPage
        .locator(`.platform-tab-title[data-web-view-id="${editorId}"]`)
        .click({ button: 'right' });
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toBeVisible();
      await mainPage.keyboard.press('Escape');
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
    });

    await test.step("Home's tab menu has no zoom items and still offers Float tab", async () => {
      await homeTab.click({ button: 'right' });
      await expect(mainPage.getByRole('menuitem', { name: 'Float tab' })).toBeVisible();
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom out' })).toHaveCount(0);
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom reset' })).toHaveCount(0);
      await mainPage.keyboard.press('Escape');
    });
  });
});

test.describe('only zoomable panes zoom and offer zoom: Simple mode', () => {
  test.use({
    interfaceMode: 'simple',
    // Past first run, so Simple mode starts in the app rather than the setup wizard.
    seedSettings: {
      'platform.webViewContentZoom': SEEDED_DEFAULT,
      // Emptied for the same reason as in Power mode above
      [CONTENT_ZOOM_MEMORY_SETTING]: {},
      'platform.firstRunComplete': true,
    },
    electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  });
  test.setTimeout(300_000);

  test('a Home tab has no tab menu and is never scaled; Find in Column 3 offers zoom', async ({
    mainPage,
  }) => {
    test.slow();
    // Simple mode shows the onboarding tour over the whole window; this suppresses it and waits out
    // the initialization overlay, either of which would intercept every click below.
    await waitForAppReady(mainPage, { timeout: 180_000 });
    const findId = await waitForOpenWebViewIdByType(mainPage, FIND_WEBVIEW_TYPE);
    const findTab = mainPage.locator(`.platform-tab-title[data-web-view-id="${findId}"]`);

    await test.step('the declared Find tab opens a menu holding the zoom items (control)', async () => {
      // Retried: on a checkout with projects of its own, Simple mode opens one of them at start-up,
      // and its "Updating project view" overlay can come up after `waitForAppReady` and swallow
      // the clicks
      await expect(async () => {
        await waitForOverlayGone(mainPage, 30_000);
        await findTab.click();
        await findTab.click({ button: 'right' });
        await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toBeVisible({
          timeout: 5_000,
        });
      }).toPass({ timeout: 90_000 });
      await mainPage.keyboard.press('Escape');
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
    });

    await sendPapiCommandWhenRegistered('platformGetResources.openHome');
    const homeId = await waitForOpenWebViewIdByType(mainPage, HOME_WEBVIEW_TYPE);
    const homeTab = mainPage.locator(`.platform-tab-title[data-web-view-id="${homeId}"]`);
    await homeTab.waitFor();

    await test.step('Home renders at 100 % content zoom although the default is 150 %', async () => {
      const homeFrame = await getEditorFrame(mainPage, homeId);
      await homeFrame.locator('input').first().waitFor();
      // Home marks no area and is not declared, so no whole-iframe zoom is ever applied to it —
      // this poll's first sample already shows that; the timeout only bounds how long we wait for
      // the frame to render at all.
      await expect
        .poll(async () => hostZoomOf(mainPage, homeId), { intervals: [1_500], timeout: 5_000 })
        .toBe('');
    });

    await test.step('right-clicking the Home tab opens nothing', async () => {
      // An overlay swallowing the click would make "nothing opens" pass without testing anything
      await waitForOverlayGone(mainPage, 30_000);
      await homeTab.click({ button: 'right' });
      await expect(mainPage.getByRole('menu')).toHaveCount(0);
      await expect(mainPage.getByRole('menuitem', { name: 'Zoom in' })).toHaveCount(0);
    });

    await test.step('Shift+F10 on the focused Home tab opens nothing', async () => {
      await mainPage.locator('.dock-tab-btn', { has: homeTab }).focus();
      await mainPage.keyboard.press('Shift+F10');
      await expect(mainPage.getByRole('menu')).toHaveCount(0);
    });
  });
});
