/**
 * E2E for the Simple-mode Comments panel's per-pane content zoom: Ctrl+wheel and the tab's own
 * "Zoom in" / "Zoom out" / "Reset zoom to default" menu items scale the panel, and the level is
 * remembered under the panel's project identity (the `notes` kind), the same identity a project's
 * tab list opens at.
 *
 * Own Electron app (`commentAppOwner`): a shared app would carry over whatever layout change
 * another comment spec left behind, and the fixture only starts a fresh worker when the option
 * value differs.
 */
import { type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/comment.fixture';
import {
  areaBox,
  ctrlWheel,
  INDICATOR_SELECTOR,
  readContentZoomMemory,
} from '../../../fixtures/content-zoom-helpers';
import {
  DEFAULT_WEBSOCKET_PORT,
  sendPapiRequestOnce,
  waitForAppReady,
  waitForOpenWebViewIdByType,
  waitForOverlayGone,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';
import {
  type CommentTestProject,
  cleanupCommentTestProject,
  createCommentTestProject,
  createCommentThreads,
} from '../../../fixtures/comment-test-helpers';
import { getEditorFrame, readFactor } from '../../../fixtures/scripture-editor-helpers';

const SETTINGS_TIMEOUT_MS = 60_000;
const OPEN_PANEL_TIMEOUT_MS = 150_000;

/**
 * `webViewType` of the Comment List Panel tab in Column 3 of the simple layout. Source:
 * src/renderer/components/docking/simple-layout.data.ts
 */
const COMMENT_LIST_PANEL_WEBVIEW_TYPE = 'legacyCommentManager.commentListPanel';

/**
 * Click the Comments panel's tab in Column 3, handling the rc-tabs overflow case where the tab is
 * attached but clipped by the scrollable tab bar (same approach as `comments-tab.spec.ts`'s
 * `clickCommentsTab`, reused here rather than re-derived).
 */
async function clickCommentsPanelTab(
  mainPage: Page,
  panelId: string,
  actionTimeoutMs = 30_000,
): Promise<void> {
  const tabTitle = mainPage.locator(`.platform-tab-title[data-web-view-id="${panelId}"]`);
  if (await tabTitle.isVisible()) {
    await tabTitle.click({ timeout: actionTimeoutMs });
    return;
  }
  const dockBar = mainPage.locator('.dock-bar').filter({ has: tabTitle });
  await dockBar.locator('.dock-nav-more').hover({ timeout: actionTimeoutMs });
  await mainPage
    .locator('[role="listbox"] [role="option"]')
    .filter({ has: mainPage.locator(`[data-web-view-id="${panelId}"]`) })
    .click({ timeout: 5_000 });
}

/** Points the (worker-scoped, singleton) Comment List Panel at `projectId`. */
async function openCommentListPanel(projectId: string): Promise<void> {
  await waitForPapiMethodRegistered(
    'command:legacyCommentManager.openCommentListPanel',
    DEFAULT_WEBSOCKET_PORT,
    SETTINGS_TIMEOUT_MS,
  );
  await sendPapiRequestOnce(
    'command:legacyCommentManager.openCommentListPanel',
    [projectId],
    DEFAULT_WEBSOCKET_PORT,
    OPEN_PANEL_TIMEOUT_MS,
  );
}

// Own this spec's Electron app: a different owner string from any other comment spec, so the
// fixture starts a fresh worker rather than inheriting another spec's layout/panel state.
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

    await openCommentListPanel(projectA.projectId);
    await clickCommentsPanelTab(mainPage, panelId);

    const panelFrame = await getEditorFrame(mainPage, panelId);
    await expect(panelFrame.locator('body')).toContainText('Project A comment zoom marker', {
      timeout: 90_000,
    });

    await expect.poll(() => readFactor(panelFrame, '')).toBe(1);

    const scopeTrigger = panelFrame.locator('[data-testid="comment-scope-filter"]');
    const scopeBoxBaseline = await scopeTrigger.boundingBox();
    if (!scopeBoxBaseline) throw new Error('Scope filter trigger not found');

    await test.step('wheel over the panel scales it and leaves the scope-filter row untouched', async () => {
      const card = panelFrame.locator(`[role="option"][id="${projectACardThreadId}"]`);
      const cardBoxBefore = await card.boundingBox();
      if (!cardBoxBefore) throw new Error('Comment card not found');

      const box = await areaBox(panelFrame, '');
      await ctrlWheel(mainPage, box, -120);
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);

      const cardBoxAfter = await card.boundingBox();
      if (!cardBoxAfter) throw new Error('Comment card not found after zoom');
      // A tight tolerance around the actual 1.1 factor: a wide band would also accept a ratio of
      // 1.0, so a missing marker that left the whole-iframe fallback scaling nothing would pass
      // unnoticed.
      const ratio = cardBoxAfter.height / cardBoxBefore.height;
      expect(ratio).toBeCloseTo(1.1, 1);

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
      // not on rc-dock's own `.dock-tab` ancestor — the same element `clickCommentsPanelTab`'s
      // left-click path above targets.
      const tab = mainPage.locator(`.platform-tab-title[data-web-view-id="${panelId}"]`);
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

    // The ladder above ends on a reset, which deletes the memory key rather than writing the
    // default back — so re-establish a non-default level here for the re-point check below to
    // have something to remember.
    await test.step('re-establish a non-default level for project A', async () => {
      const box = await areaBox(panelFrame, '');
      await ctrlWheel(mainPage, box, -120);
      await expect.poll(() => readFactor(panelFrame, '')).toBe(1.1);
      await expect
        .poll(
          async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedProjectAId}:main`],
        )
        .toBe(1.1);
    });

    await test.step("a re-pointed panel shows the new project's level, and project A's again on return", async () => {
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
    });
  });
});
