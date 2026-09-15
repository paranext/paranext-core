/**
 * E2E for the comment list's per-pane content zoom: Ctrl+wheel and the
 * `platform.webViewContentZoom*` commands scale the comment cards while the filter toolbar stays
 * fixed, the level is remembered per project, a same-project editor keeps an independent level, and
 * BCV-driven scroll sync still lands on the right card once the list is zoomed.
 *
 * ONE test() per spec file, matching every other suite built on the worker-scoped comment fixture:
 * a second Electron instance against the shared renderer dev server has a documented dock-tab
 * failure mode. Sub-scenarios are test.step()s sharing the one instance.
 *
 * `npm run test:e2e:isolated notes-content-zoom`
 */
import { type Frame, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/comment.fixture';
import {
  type CommentTestProject,
  createCommentTestProject,
  cleanupCommentTestProject,
  createCommentThreads,
  openCommentList,
} from '../../../fixtures/comment-test-helpers';
import { waitForAppReady, waitForOpenWebViewIdByType } from '../../../fixtures/helpers';
import {
  CONTENT_ZOOM_COMMANDS,
  getEditorFrame,
  navigateToolbarBcv,
  readFactor,
  sendCommandWithId,
} from '../../../fixtures/scripture-editor-helpers';

test.use({ commentAppOwner: 'notes-content-zoom-list' });

/** `webViewType` of the comment list web view (`legacyCommentManager.main.ts`). */
const COMMENT_LIST_WEBVIEW_TYPE = 'legacyCommentManager.commentList';

/**
 * `webViewType` of the Scripture editor web views (`SCRIPTURE_EDITOR_WEBVIEW_TYPE`,
 * `src/shared/models/web-view.model.ts`).
 */
const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/**
 * Setting key the memory-key-shape assertion reads directly
 * (`src/renderer/services/web-view-content-zoom.service.ts`).
 */
const CONTENT_ZOOM_MEMORY_SETTING = 'platform.webViewContentZoomMemory';

/**
 * The `id` the platform's zoom indicator badge is created with
 * (`web-view-content-zoom.bootstrap-script.ts`).
 */
const INDICATOR_SELECTOR = '#platform-content-zoom-indicator';

/** Bounding box (main-frame-relative) of one zoom area's marked root element. */
async function areaBox(
  frame: Frame,
  areaId: string,
): Promise<{ x: number; y: number; width: number; height: number }> {
  const box = await frame.locator(`[data-platform-content-zoom-root="${areaId}"]`).boundingBox();
  if (!box) throw new Error(`Zoom area "${areaId}" has no bounding box`);
  return box;
}

/**
 * Ctrl+wheel over the centre of `box` (main-frame-relative coordinates, as `areaBox` returns).
 * `deltaY: -120` zooms in, `+120` zooms out. Does not itself wait for the effect — callers poll the
 * resulting factor, never a bare timeout, since geometry inside a zoomed frame moves and a fixed
 * wait would race the debounced write.
 */
async function ctrlWheel(
  page: Page,
  box: { x: number; y: number; width: number; height: number },
  deltaY: number,
): Promise<void> {
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, deltaY);
  await page.keyboard.up('Control');
}

/** Reads the `platform.webViewContentZoomMemory` setting straight from the renderer. */
async function readContentZoomMemory(page: Page): Promise<Record<string, number>> {
  return page.evaluate((settingKey) => {
    // The renderer exposes `papi` on `globalThis`, untyped here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { get: (key: string) => Promise<Record<string, number>> } };
    };
    return win.papi.settings.get(settingKey);
  }, CONTENT_ZOOM_MEMORY_SETTING);
}

/** Indicator text with whitespace stripped, so the narrow no-break space before `%` doesn't matter. */
async function readIndicatorText(frame: Frame): Promise<string | undefined> {
  const text = await frame.locator(INDICATOR_SELECTOR).textContent();
  return text?.replace(/\s/gu, '');
}

/** Locates a rendered comment thread card by its thread id (the id `createCommentThreads` returns). */
function cardLocator(frame: Frame, threadId: string) {
  return frame.locator(`[role="option"][id="${threadId}"]`);
}

test.describe('comment list content zoom', () => {
  let projectA: CommentTestProject;
  let projectB: CommentTestProject;

  test.beforeAll(async () => {
    projectA = await createCommentTestProject([], 'A');
    projectB = await createCommentTestProject([], 'B');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(projectA);
    cleanupCommentTestProject(projectB);
  });

  test('Ctrl+wheel and the zoom commands scale the comment cards, remember the level per project, and stay BCV-synced once zoomed', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, several zoom gestures each waiting on a debounced
    // write, plus a BCV-driven scroll-sync check). Give it Playwright's 3x "slow" budget.
    test.slow();

    await waitForAppReady(mainPage);

    const threadIds = await createCommentThreads(
      projectA,
      ['GEN 1:1', 'GEN 1:5', 'GEN 2:1', 'GEN 3:1'],
      ['Zoom test comment 1', 'Zoom test comment 2', 'Zoom test comment 3', 'Zoom test comment 4'],
    );
    await openCommentList(mainPage, projectA);
    const listId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
    const editorId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_EDITOR_WEBVIEW_TYPE);
    const listFrame = await getEditorFrame(mainPage, listId);

    // Baseline: a fresh pane's cards read the Settings default (1), unscaled.
    await expect.poll(() => readFactor(listFrame, '')).toBe(1);
    const scopeTrigger = listFrame.locator('[data-testid="comment-scope-filter"]');
    const toolbarBoxBaseline = await scopeTrigger.boundingBox();
    if (!toolbarBoxBaseline) throw new Error('Filter toolbar not found');

    await test.step('Ctrl+wheel over the list scales only the cards', async () => {
      const cardBefore = cardLocator(listFrame, threadIds[0]);
      const cardBoxBefore = await cardBefore.boundingBox();
      if (!cardBoxBefore) throw new Error('Comment card not found');

      const listBox = await areaBox(listFrame, '');
      await ctrlWheel(mainPage, listBox, -120);
      await expect.poll(() => readFactor(listFrame, '')).toBe(1.1);

      const cardBoxAfter = await cardBefore.boundingBox();
      if (!cardBoxAfter) throw new Error('Comment card not found after zoom');
      const ratio = cardBoxAfter.height / cardBoxBefore.height;
      expect(ratio).toBeGreaterThan(1.1 * 0.9);
      expect(ratio).toBeLessThan(1.1 * 1.1);

      const toolbarBoxZoomed = await scopeTrigger.boundingBox();
      if (!toolbarBoxZoomed) throw new Error('Filter toolbar not found after zoom');
      expect(Math.abs(toolbarBoxZoomed.height - toolbarBoxBaseline.height)).toBeLessThanOrEqual(2);
    });

    await test.step('the zoom indicator carries the area and the current percentage', async () => {
      await expect
        .poll(() => listFrame.locator(INDICATOR_SELECTOR).getAttribute('data-area'), {
          timeout: 2_000,
        })
        .toBe('main');
      await expect.poll(() => readIndicatorText(listFrame), { timeout: 2_000 }).toBe('110%');
    });

    await test.step('memory key shape — keyed by project identity under the notes namespace', async () => {
      const normalizedId = projectA.projectId.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedId}:main`])
        .toBe(1.1);
      const memory = await readContentZoomMemory(mainPage);
      expect(Object.keys(memory).some((key) => key.startsWith(`editor:${normalizedId}:`))).toBe(
        false,
      );
    });

    await test.step("the same project's editor keeps its own level, independent of the list", async () => {
      const editorFrame = await getEditorFrame(mainPage, editorId);
      expect(await readFactor(editorFrame, '')).toBe(1);
      expect(await readFactor(listFrame, '')).toBe(1.1);

      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);
      expect(await readFactor(listFrame, '')).toBe(1.1);

      const normalizedId = projectA.projectId.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`editor:${normalizedId}:main`])
        .toBe(1.1);
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedId}:main`])
        .toBe(1.1);

      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);
      expect(await readFactor(listFrame, '')).toBe(1.1);
    });

    await test.step('the reset command returns the list to the default and drops its memory entry', async () => {
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, listId, 'main');
      await expect.poll(() => readFactor(listFrame, '')).toBe(1);
      await expect
        .poll(() => readIndicatorText(listFrame), { timeout: 2_000 })
        .toBe('Default·100%');

      const normalizedId = projectA.projectId.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedId}:main`])
        .toBeUndefined();
    });

    await test.step('BCV-sync scroll still lands on the right card once the list is zoomed to 150%', async () => {
      // Zoom the list back up to 1.5 through the command ladder, polling the factor after each step
      // so the loop below never races the debounced write.
      const steps = [1.1, 1.2, 1.3, 1.4, 1.5];
      // Sequential zoom-in commands: each step's effect must land before the next is sent.
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < steps.length; i += 1) {
        await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, listId, 'main');
        await expect.poll(() => readFactor(listFrame, '')).toBe(steps[i]);
      }
      /* eslint-enable no-await-in-loop */

      const zoomRootBox = await areaBox(listFrame, '');
      const gen3Card = cardLocator(listFrame, threadIds[3]);
      await navigateToolbarBcv(mainPage, 'Genesis 3:1');
      await expect(gen3Card).toBeInViewport({ timeout: 15_000 });
      const gen3Box = await gen3Card.boundingBox();
      if (!gen3Box) throw new Error('GEN 3:1 card not found');
      expect(Math.abs(gen3Box.y - zoomRootBox.y)).toBeLessThanOrEqual(gen3Box.height);

      const gen1Card = cardLocator(listFrame, threadIds[0]);
      await navigateToolbarBcv(mainPage, 'Genesis 1:1');
      await expect(gen1Card).toBeInViewport({ timeout: 15_000 });
      const gen1Box = await gen1Card.boundingBox();
      if (!gen1Box) throw new Error('GEN 1:1 card not found');
      expect(Math.abs(gen1Box.y - zoomRootBox.y)).toBeLessThanOrEqual(gen1Box.height);
    });

    await test.step('reopening the comment list restores the remembered level without any gesture', async () => {
      // Step back down from 1.5 to 1.2, the level this step verifies survives a close/reopen.
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.out, listId, 'main');
      await expect.poll(() => readFactor(listFrame, '')).toBe(1.4);
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.out, listId, 'main');
      await expect.poll(() => readFactor(listFrame, '')).toBe(1.3);
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.out, listId, 'main');
      await expect.poll(() => readFactor(listFrame, '')).toBe(1.2);

      const normalizedId = projectA.projectId.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`notes:${normalizedId}:main`])
        .toBe(1.2);

      await mainPage.locator(`.dock-tab[data-web-view-id="${listId}"] .dock-tab-close-btn`).click();
      await openCommentList(mainPage, projectA);
      const reopenedListId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
      const reopenedListFrame = await getEditorFrame(mainPage, reopenedListId);
      await expect.poll(() => readFactor(reopenedListFrame, '')).toBe(1.2);
    });

    await test.step("a different project's comment list inherits nothing from the first", async () => {
      await createCommentThreads(projectB, ['GEN 1:1'], ['Zoom test comment for project B']);
      await openCommentList(mainPage, projectB);
      const projectBListId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
      const projectBListFrame = await getEditorFrame(mainPage, projectBListId);
      await expect.poll(() => readFactor(projectBListFrame, '')).toBe(1);
    });
  });
});
