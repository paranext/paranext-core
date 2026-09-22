/**
 * Power-mode counterpart to `comments-panel-content-zoom.spec.ts`'s "the tab menu drives the same
 * ladder as the wheel" step: the tab context menu's real "Zoom in" / "Zoom out" / "Reset zoom to
 * default" items are a generic dock-tab feature (`platform-tab-title.component.tsx`,
 * `tab-menu.util.ts`), not something the Comments panel's Simple-mode Column 3 placement grants it
 * — so the same ladder must hold wherever the panel's web view is opened.
 *
 * `comments-panel-content-zoom.spec.ts` cannot itself run in Power mode: it is built on
 * `comment.fixture`, which hardcodes `platform.interfaceMode: 'simple'` with no override (see
 * `e2e-tests/CLAUDE.md`, "State that leaks between runs" — `comment.fixture` silently ignores
 * `test.use({ interfaceMode })`). This spec instead uses `isolated.fixture` in Power mode and
 * points the SAME panel web view type at a project through the SAME
 * `legacyCommentManager.openCommentListPanel` command — the panel is a dock tab like any other once
 * opened, independent of the column layout Simple mode wraps it in.
 *
 * No Simple-mode counterpart is added for a Scripture-editor tab-menu case here: no e2e in this
 * repo drives the real tab context menu's zoom items for the editor's own tab in EITHER mode (every
 * editor content-zoom spec sends the `platform.webViewContentZoom*` commands directly — see
 * `content-zoom.spec.ts`'s own "the explicit command stands in for 'the Zoom menu' here"), so there
 * is no existing Power-only editor case to duplicate into Simple.
 *
 * `npm run test:e2e:isolated notes-content-zoom`
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { areaBox, ctrlWheel } from '../../../fixtures/content-zoom-helpers';
import { waitForOpenWebViewIdByType } from '../../../fixtures/helpers';
import {
  type CommentTestProject,
  cleanupCommentTestProject,
  createCommentTestProject,
  createCommentThreads,
  openCommentListPanel,
} from '../../../fixtures/comment-test-helpers';
import {
  getEditorFrame,
  readFactor,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/**
 * `webViewType` of the Comment List Panel. Source:
 * src/renderer/components/docking/simple-layout.data.ts
 */
const COMMENT_LIST_PANEL_WEBVIEW_TYPE = 'legacyCommentManager.commentListPanel';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('Comments panel content zoom in Power mode', () => {
  test.setTimeout(300_000);

  let project: CommentTestProject;

  test.beforeAll(async () => {
    project = await createCommentTestProject([], '_power_tab_menu');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test('the tab context menu drives the same Zoom in / Zoom out / Reset ladder as the wheel', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await createCommentThreads(project, ['GEN 1:1'], ['Power tab-menu marker']);
    await openCommentListPanel(project.projectId);
    const panelId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_PANEL_WEBVIEW_TYPE);
    const panelFrame = await getEditorFrame(mainPage, panelId);
    await expect(panelFrame.locator('body')).toContainText('Power tab-menu marker', {
      timeout: 90_000,
    });

    await expect.poll(() => readFactor(panelFrame, '')).toBe(1);

    await test.step('the wheel establishes a non-default baseline', async () => {
      const box = await areaBox(panelFrame, '');
      await ctrlWheel(mainPage, box, -120);
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);
    });

    const tab = mainPage.locator(`.platform-tab-title[data-web-view-id="${panelId}"]`);
    await test.step('the tab context menu drives the same ladder as the wheel', async () => {
      await tab.click({ button: 'right' });
      await mainPage.getByRole('menuitem', { name: 'Zoom in' }).click();
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.2);

      await tab.click({ button: 'right' });
      await mainPage.getByRole('menuitem', { name: 'Zoom out' }).click();
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);

      await tab.click({ button: 'right' });
      await mainPage.getByRole('menuitem', { name: 'Reset zoom to default' }).click();
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1);
    });
  });
});
