/**
 * E2E for content zoom surviving a real app restart: the Scripture editor's `main` and `footnotes`
 * areas independently, and a project's comment list — each zoomed to a non-default level, the app
 * quit, and a fresh Electron process relaunched into the same profile before the pane is reopened.
 *
 * This is deliberately NOT the same guarantee `content-zoom.spec.ts` and
 * `comment-list-content-zoom.spec.ts` already cover when they reopen a pane (or a second pane of
 * the same project) inside the SAME Electron process: that only proves the in-memory service reads
 * back what it just wrote. A restart tears down the extension host and every in-memory cache with
 * it, so the level can only come back by round-tripping through the settings service's own file,
 * exactly as a user's real "close the app, come back tomorrow" experience does.
 *
 * Neither the Bible Texts panel nor the Text Collection grid is covered here. Both need either real
 * Marble/DBL resources (`tests/enhanced-resources/`, not runnable against this isolated fixture)
 * or, for the Bible Texts panel's synthetic-project workaround, a container/source project pair
 * that adds a second full app-restart round trip for a panel whose read path is already covered,
 * pane-agnostically, by `web-view-content-zoom.service.test.ts` ("seeds a new pane per area from
 * state, else memory, else the default") — see `bible-texts-panel-content-zoom.spec.ts`'s own file
 * header for that citation.
 *
 * Each test bypasses `fixtures/isolated.fixture` and drives
 * `launchElectronApp`/`teardownElectronApp` directly, the same two-phase-relaunch pattern
 * `multi-window/window-layout-persistence.spec.ts` uses: the fixture launches exactly one Electron
 * instance per `test()`, which cannot express "quit, then relaunch into what was just persisted."
 *
 * `npm run test:e2e:isolated content-zoom-restart`
 */
import fs from 'fs';
import { test, expect } from '@playwright/test';
import {
  type ElectronAppContext,
  isolatedFixtureBaseSettings,
  launchElectronApp,
  preConfigureSettings,
  teardownElectronApp,
  waitForAppReady,
  waitForOpenWebViewIdByType,
} from '../../../fixtures/helpers';
import {
  type CommentTestProject,
  cleanupCommentTestProject,
  createCommentTestProject,
  createCommentThreads,
  openCommentList,
} from '../../../fixtures/comment-test-helpers';
import {
  INDICATOR_SELECTOR,
  readContentZoomMemory,
  zoomAreaTo,
} from '../../../fixtures/content-zoom-helpers';
import {
  ensureFootnotesVisible,
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import {
  captureAppOutput,
  createStepLogger,
  quitAndExpectCleanExit,
} from '../multi-window/multi-window.util';

/** `webViewType` of the comment list web view (`legacyCommentManager.main.ts`). */
const COMMENT_LIST_WEBVIEW_TYPE = 'legacyCommentManager.commentList';

test.describe('content zoom survives an app restart', () => {
  test('the Scripture editor keeps its main and footnotes zoom levels, with no indicator on arrival', async () => {
    // Two full app launches (each up to ~180s on a cold profile) plus a graceful quit and a
    // scripture-editor session in each.
    test.setTimeout(600_000);
    const logStep = createStepLogger('content-zoom-restart-editor');
    const restoreSettings = preConfigureSettings(isolatedFixtureBaseSettings('power'));
    let ctx: ElectronAppContext | undefined;
    let profileDir: string | undefined;

    try {
      // #region Phase 1 — zoom both areas to distinct, non-default levels, then quit

      ctx = await launchElectronApp({
        isolatedProjectRoot: true,
        envOverrides: { DEV_NOISY: 'false' },
        preserveUserDataDir: true,
      });
      profileDir = ctx.userDataDir;
      const mainPage1 = await ctx.electronApp.firstWindow({ timeout: 90_000 });
      await waitForAppReady(mainPage1, { timeout: 180_000 });
      await waitForHomeTab(mainPage1);
      await makeSampleProjectEditable();

      const editorId1 = await openEditableScriptureEditorForProject(
        mainPage1,
        SAMPLE_WEB_PROJECT_ID,
      );
      const editorFrame1 = await getEditorFrame(mainPage1, editorId1);
      await editorFrame1.locator('.editor-container').waitFor({ timeout: 60_000 });
      await navigateToolbarBcv(mainPage1, 'Jonah 1:1');
      await ensureFootnotesVisible(mainPage1, editorFrame1, editorId1);

      // Distinct, non-default levels per area — a swap across the restart is as much a defect as a
      // dropped level, and only distinct values can show one.
      await zoomAreaTo(mainPage1, editorFrame1, editorId1, 'main', 1.3);
      await zoomAreaTo(mainPage1, editorFrame1, editorId1, 'footnotes', 1.2);

      const normalizedId = SAMPLE_WEB_PROJECT_ID.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage1))[`editor:${normalizedId}:main`])
        .toBe(1.3);
      await expect
        .poll(
          async () => (await readContentZoomMemory(mainPage1))[`editor:${normalizedId}:footnotes`],
        )
        .toBe(1.2);
      logStep('phase 1: main at 130%, footnotes at 120%, both landed in memory');

      const output1 = captureAppOutput(ctx.electronApp);
      await quitAndExpectCleanExit(ctx.electronApp, output1, logStep, 'phase 1');
      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion

      // #region Phase 2 — relaunch into the same profile; both levels come back with no gesture

      ctx = await launchElectronApp({
        isolatedProjectRoot: true,
        envOverrides: { DEV_NOISY: 'false' },
        userDataDir: profileDir,
      });
      const mainPage2 = await ctx.electronApp.firstWindow({ timeout: 90_000 });
      await waitForAppReady(mainPage2, { timeout: 180_000 });
      await waitForHomeTab(mainPage2);

      const editorId2 = await openEditableScriptureEditorForProject(
        mainPage2,
        SAMPLE_WEB_PROJECT_ID,
      );
      const editorFrame2 = await getEditorFrame(mainPage2, editorId2);
      await editorFrame2.locator('.editor-container').waitFor({ timeout: 60_000 });
      await navigateToolbarBcv(mainPage2, 'Jonah 1:1');
      await ensureFootnotesVisible(mainPage2, editorFrame2, editorId2);

      await expect.poll(() => readFactor(editorFrame2, '')).toBe(1.3);
      await expect.poll(() => readFactor(editorFrame2, 'footnotes')).toBe(1.2);
      logStep('phase 2: main restored at 130%, footnotes at 120%');

      // No indicator on arrival: `showIndicator` is only ever called for a direct user gesture
      // (`pushContentZoom`'s `indicator` argument is passed only from a wheel/chord/command handler,
      // never from the initial `applyContentZoomForWebView` push a fresh pane takes) — a pane that
      // opens already at a remembered level must not flash a badge nobody asked to see. The bootstrap
      // always creates the badge element on load, so its PRESENCE proves nothing; the check is that
      // it was never told an area or a level to show.
      const indicator2 = editorFrame2.locator(INDICATOR_SELECTOR);
      await expect(indicator2).not.toHaveAttribute('data-area', /.*/);

      const output2 = captureAppOutput(ctx.electronApp);
      await quitAndExpectCleanExit(ctx.electronApp, output2, logStep, 'phase 2');
      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion
    } finally {
      if (ctx) await teardownElectronApp(ctx);
      if (profileDir) fs.rmSync(profileDir, { recursive: true, force: true });
      restoreSettings();
    }
  });

  test("a project's comment list keeps its zoom level, with no indicator on arrival", async () => {
    // A comment test project plus two full app launches and a graceful quit.
    test.setTimeout(600_000);
    const logStep = createStepLogger('content-zoom-restart-comment-list');
    const restoreSettings = preConfigureSettings({
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'simple',
      'platform.firstRunComplete': true,
      'platform.showRegistrationReminderOnStartup': false,
    });
    let ctx: ElectronAppContext | undefined;
    let profileDir: string | undefined;
    let project: CommentTestProject | undefined;

    try {
      project = await createCommentTestProject([], '_restart');

      // #region Phase 1 — zoom the comment list to a non-default level, then quit

      ctx = await launchElectronApp({
        envOverrides: { DEV_NOISY: 'false' },
        preserveUserDataDir: true,
      });
      profileDir = ctx.userDataDir;
      const mainPage1 = await ctx.electronApp.firstWindow({ timeout: 90_000 });
      await waitForAppReady(mainPage1, { timeout: 180_000 });

      await createCommentThreads(project, ['GEN 1:1'], ['Restart persistence marker']);
      await openCommentList(mainPage1, project);
      const listId1 = await waitForOpenWebViewIdByType(mainPage1, COMMENT_LIST_WEBVIEW_TYPE);
      const listFrame1 = await getEditorFrame(mainPage1, listId1);
      await expect(listFrame1.locator('body')).toContainText('Restart persistence marker', {
        timeout: 90_000,
      });

      await zoomAreaTo(mainPage1, listFrame1, listId1, 'main', 1.4);
      const normalizedId = project.projectId.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage1))[`notes:${normalizedId}:main`])
        .toBe(1.4);
      logStep('phase 1: comment list at 140%, landed in memory');

      const output1 = captureAppOutput(ctx.electronApp);
      await quitAndExpectCleanExit(ctx.electronApp, output1, logStep, 'phase 1');
      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion

      // #region Phase 2 — relaunch into the same profile; the level comes back with no gesture

      ctx = await launchElectronApp({
        envOverrides: { DEV_NOISY: 'false' },
        userDataDir: profileDir,
      });
      const mainPage2 = await ctx.electronApp.firstWindow({ timeout: 90_000 });
      await waitForAppReady(mainPage2, { timeout: 180_000 });

      await openCommentList(mainPage2, project);
      const listId2 = await waitForOpenWebViewIdByType(mainPage2, COMMENT_LIST_WEBVIEW_TYPE);
      const listFrame2 = await getEditorFrame(mainPage2, listId2);
      await expect(listFrame2.locator('body')).toContainText('Restart persistence marker', {
        timeout: 90_000,
      });

      await expect.poll(() => readFactor(listFrame2, '')).toBe(1.4);
      logStep('phase 2: comment list restored at 140%');

      // Same "badge always exists, but never told a level" check as the editor test above.
      const indicator2 = listFrame2.locator(INDICATOR_SELECTOR);
      await expect(indicator2).not.toHaveAttribute('data-area', /.*/);

      const output2 = captureAppOutput(ctx.electronApp);
      await quitAndExpectCleanExit(ctx.electronApp, output2, logStep, 'phase 2');
      await teardownElectronApp(ctx);
      ctx = undefined;

      // #endregion
    } finally {
      if (ctx) await teardownElectronApp(ctx);
      if (profileDir) fs.rmSync(profileDir, { recursive: true, force: true });
      cleanupCommentTestProject(project);
      restoreSettings();
    }
  });
});
