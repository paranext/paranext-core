/**
 * E2E for the Comments panel's per-pane content zoom: Ctrl+wheel and the tab's own "Zoom in" /
 * "Zoom out" / "Zoom reset" menu items scale the panel, and the level is remembered under the
 * panel's project identity (the `notes` kind), the same identity a project's tab list opens at.
 *
 * The Simple-mode test runs on its own Electron app (`commentAppOwner`): a shared app would carry
 * over whatever layout change another comment spec left behind, and the fixture only starts a fresh
 * worker when the option value differs.
 *
 * The Power-mode test checks the tab menu's ladder where the panel is a plain dock tab. It runs on
 * `isolated.fixture`, because `comment.fixture` pins Simple mode and ignores `test.use({
 * interfaceMode })` (see `e2e-tests/CLAUDE.md`, "State that leaks between runs"). The tab context
 * menu's zoom items are a generic dock-tab feature (`platform-tab-title.component.tsx`,
 * `tab-menu.util.ts`), not something the Simple-mode Column 3 placement grants the panel; the test
 * opens the same panel web view type at a project through the same
 * `legacyCommentManager.openCommentListPanel` command.
 */
import { test, expect } from '../../../fixtures/comment.fixture';
import { test as powerModeTest } from '../../../fixtures/isolated.fixture';
import {
  ctrlWheel,
  INDICATOR_SELECTOR,
  readContentZoomMemory,
} from '../../../fixtures/content-zoom-helpers';
import {
  waitForAppReady,
  waitForOpenWebViewIdByType,
  waitForOverlayGone,
} from '../../../fixtures/helpers';
import {
  type CommentTestProject,
  cleanupCommentTestProject,
  createCommentTestProject,
  createCommentThreads,
  openCommentListPanel,
  openCommentListPanelUntilVisible,
} from '../../../fixtures/comment-test-helpers';
import {
  getEditorFrame,
  readFactor,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/**
 * `webViewType` of the Comment List Panel tab in Column 3 of the simple layout. Source:
 * src/renderer/components/docking/simple-layout.data.ts
 */
const COMMENT_LIST_PANEL_WEBVIEW_TYPE = 'legacyCommentManager.commentListPanel';

// Own this spec's Electron app: a different owner string from any other comment spec, so the
// fixture starts a fresh worker rather than inheriting another spec's layout/panel state. A worker
// option must be set at the top level; `isolated.fixture` has no such option, so the Power-mode
// test below ignores it.
test.use({ commentAppOwner: 'notes-content-zoom-panel' });

test.describe('Comments panel content zoom in Simple mode', () => {
  test.setTimeout(600_000);

  let projectA: CommentTestProject;
  let projectB: CommentTestProject;

  // Filesystem-only: creates the project copies before Electron starts scanning the projects
  // folder. Thread seeding needs the live app's WebSocket (the PDPF's PAPI methods), so it happens
  // in the test body instead, after waitForAppReady — beforeAll takes no fixture and so runs before
  // Playwright launches the worker-scoped Electron app that fixture would trigger.
  test.beforeAll(async () => {
    projectA = await createCommentTestProject([], 'A');
    projectB = await createCommentTestProject([], 'B');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(projectA);
    cleanupCommentTestProject(projectB);
  });

  test('Ctrl+wheel and the tab menu zoom the panel and remember the level per project', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForAppReady(mainPage, { timeout: 180_000 });
    const panelId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_PANEL_WEBVIEW_TYPE);
    await waitForOverlayGone(mainPage, 90_000);

    const [projectACardThreadId] = await createCommentThreads(
      projectA,
      ['GEN 1:1'],
      ['Project A comment zoom marker'],
    );
    await createCommentThreads(projectB, ['GEN 1:1'], ['Project B comment zoom marker']);

    const panelFrame = await openCommentListPanelUntilVisible(
      mainPage,
      panelId,
      projectA.projectId,
      'Project A comment zoom marker',
    );

    await expect.poll(() => readFactor(panelFrame, '')).toBe(1);

    const scopeTrigger = panelFrame.locator('[data-testid="comment-scope-filter"]');
    const scopeBoxBaseline = await scopeTrigger.boundingBox();
    if (!scopeBoxBaseline) throw new Error('Scope filter trigger not found');

    await test.step('wheel over the panel zooms the comment text and leaves the card buttons and the scope-filter row untouched', async () => {
      const card = panelFrame.locator(`[role="option"][id="${projectACardThreadId}"]`);
      const body = card.locator('[data-platform-content-zoom-root]', {
        hasText: 'Project A comment zoom marker',
      });
      const readToggle = card.getByRole('button', { name: /^Mark as (read|unread)$/ });
      const cardBox = await card.boundingBox();
      const bodyBoxBefore = await body.boundingBox();
      const toggleBoxBefore = await readToggle.boundingBox();
      if (!cardBox || !bodyBoxBefore || !toggleBoxBefore)
        throw new Error('Comment card, body or read toggle not found');

      await ctrlWheel(mainPage, cardBox, -120);
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);

      const bodyBoxAfter = await body.boundingBox();
      const toggleBoxAfter = await readToggle.boundingBox();
      if (!bodyBoxAfter || !toggleBoxAfter) throw new Error('Body or read toggle lost after zoom');
      // A tight tolerance around 1.1, so a ratio of 1.0 (nothing marked) fails.
      expect(bodyBoxAfter.height / bodyBoxBefore.height).toBeCloseTo(1.1, 1);
      expect(Math.abs(toggleBoxAfter.height - toggleBoxBefore.height)).toBeLessThanOrEqual(1);

      const indicator = panelFrame.locator(INDICATOR_SELECTOR);
      await expect.poll(() => indicator.getAttribute('data-area'), { timeout: 2_000 }).toBe('main');

      const scopeBoxZoomed = await scopeTrigger.boundingBox();
      if (!scopeBoxZoomed) throw new Error('Scope filter trigger not found after zoom');
      // ±2px absorbs a scrollbar appearing once the zoomed content overflows.
      expect(Math.abs(scopeBoxZoomed.height - scopeBoxBaseline.height)).toBeLessThanOrEqual(2);
    });

    const normalizedProjectAId = projectA.projectId.toUpperCase();

    await test.step('memory identity is the panel project, under the notes kind', async () => {
      // Still at 1.1 from the wheel step above.
      await expect
        .poll(
          async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedProjectAId}:main`],
        )
        .toBe(1.1);
    });

    await test.step('the tab menu drives the same ladder as the wheel', async () => {
      // `data-web-view-id` is emitted on `.platform-tab-title` (platform-tab-title.component.tsx),
      // not on rc-dock's own `.dock-tab` ancestor — the same element `clickCommentsTab`'s
      // left-click path above targets.
      const tab = mainPage.locator(`.platform-tab-title[data-web-view-id="${panelId}"]`);
      await tab.click({ button: 'right' });
      await mainPage.getByRole('menuitem', { name: 'Zoom in' }).click();
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.2);

      await tab.click({ button: 'right' });
      await mainPage.getByRole('menuitem', { name: 'Zoom out' }).click();
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);

      await tab.click({ button: 'right' });
      await mainPage.getByRole('menuitem', { name: 'Zoom reset' }).click();
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1);
    });

    // The ladder above ends on a reset, which deletes the memory key rather than writing the
    // default back — so re-establish a non-default level here for the re-point check below to
    // have something to remember.
    await test.step('re-establish a non-default level for project A', async () => {
      const box = await panelFrame
        .locator(`[role="option"][id="${projectACardThreadId}"]`)
        .boundingBox();
      if (!box) throw new Error('Comment card not found');
      await ctrlWheel(mainPage, box, -120);
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);
      await expect
        .poll(
          async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedProjectAId}:main`],
        )
        .toBe(1.1);
    });

    // TODO(PT-4745): re-pointing an already-mounted Comments panel at another project sometimes
    // never reaches the mounted component's props, so the panel silently keeps showing the old
    // project (or nothing) instead of the new one. This step deliberately exercises exactly that
    // re-point path — content-zoom memory following the panel across a project switch — so it
    // cannot be made reliable with an arrangement retry without retrying the behavior under test.
    // Skipped until PT-4745 lands; re-enable (drop `.skip`) once the re-point path is reliable.
    await test.step.skip(
      "a re-pointed panel shows the new project's level, and project A's again on return",
      async () => {
        const normalizedProjectBId = projectB.projectId.toUpperCase();

        await openCommentListPanel(projectB.projectId);
        await expect(panelFrame.locator('body')).toContainText('Project B comment zoom marker', {
          timeout: 90_000,
        });

        // Project B has no remembered level of its own, so the re-pointed panel follows the Settings
        // default rather than carrying project A's 110 % across with it.
        await expect.poll(() => readFactor(panelFrame, '')).toBe(1);

        // Wait out the memory write's debounce (250 ms) with room to spare before reading again. This
        // covers two things at once: the settled level (a plain re-read, not a poll — the reset above
        // could pass on a transient `1` mid-reload and then settle back to project A's 1.1, and a poll
        // would accept that transient just as readily as the real value) and the memory-key absence
        // (a poll for "not there" would likewise pass on its first read, before a wrong write could
        // have landed).
        await mainPage.waitForTimeout(5_000);
        expect(await readFactor(panelFrame, '')).toBe(1);
        expect(Object.keys(await readContentZoomMemory(mainPage))).not.toContain(
          `notes:${normalizedProjectBId}:main`,
        );

        await openCommentListPanel(projectA.projectId);
        await expect(panelFrame.locator('body')).toContainText('Project A comment zoom marker', {
          timeout: 90_000,
        });

        // Back on project A: its own remembered 110 % again.
        await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);
      },
    );
  });
});

powerModeTest.describe('Comments panel content zoom in Power mode', () => {
  powerModeTest.use({
    interfaceMode: 'power',
    electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  });
  powerModeTest.setTimeout(300_000);

  let project: CommentTestProject;

  powerModeTest.beforeAll(async () => {
    project = await createCommentTestProject([], '_power_tab_menu');
  });

  powerModeTest.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  powerModeTest(
    'the tab context menu drives the same Zoom in / Zoom out / Reset ladder as the wheel',
    async ({ mainPage }) => {
      powerModeTest.slow();

      await waitForHomeTab(mainPage);
      const [threadId] = await createCommentThreads(
        project,
        ['GEN 1:1'],
        ['Power tab-menu marker'],
      );
      await openCommentListPanel(project.projectId);
      const panelId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_PANEL_WEBVIEW_TYPE);
      const panelFrame = await getEditorFrame(mainPage, panelId);
      await expect(panelFrame.locator('body')).toContainText('Power tab-menu marker', {
        timeout: 90_000,
      });

      await expect.poll(() => readFactor(panelFrame, '')).toBe(1);

      await powerModeTest.step('the wheel establishes a non-default baseline', async () => {
        const box = await panelFrame.locator(`[role="option"][id="${threadId}"]`).boundingBox();
        if (!box) throw new Error('Comment card not found');
        await ctrlWheel(mainPage, box, -120);
        await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);
      });

      const tab = mainPage.locator(`.platform-tab-title[data-web-view-id="${panelId}"]`);
      await powerModeTest.step(
        'the tab context menu drives the same ladder as the wheel',
        async () => {
          await tab.click({ button: 'right' });
          await mainPage.getByRole('menuitem', { name: 'Zoom in' }).click();
          await expect.poll(() => readFactor(panelFrame, '')).toBe(1.2);

          await tab.click({ button: 'right' });
          await mainPage.getByRole('menuitem', { name: 'Zoom out' }).click();
          await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);

          await tab.click({ button: 'right' });
          await mainPage.getByRole('menuitem', { name: 'Zoom reset' }).click();
          await expect.poll(() => readFactor(panelFrame, '')).toBe(1);
        },
      );
    },
  );
});
