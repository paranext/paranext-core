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
import {
  ctrlWheel,
  expectPopupBesideTriggerAndInsideFrame,
  INDICATOR_SELECTOR,
  readContentZoomMemory,
  readIndicatorText,
  zoomAreaTo,
} from '../../../fixtures/content-zoom-helpers';
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

/** Locates a rendered comment thread card by its thread id (the id `createCommentThreads` returns). */
function cardLocator(frame: Frame, threadId: string) {
  return frame.locator(`[role="option"][id="${threadId}"]`);
}

/**
 * Slack allowed on `cardTopWithinView`'s lower bound to absorb sub-pixel rounding of zoomed client
 * rects, not the card's actual scroll position.
 */
const CARD_TOP_TOLERANCE_PX = 4;

/**
 * `id` of the comment list's sticky header (`COMMENT_LIST_STICKY_HEADER_ELEMENT_ID`,
 * `extensions/src/legacy-comment-manager/src/comment-list.component.tsx`) — the notice plus the
 * filter toolbar. Production measures this same element's height for its own scroll padding
 * (`comment-list.web-view.tsx`'s `scrollToTarget`), so `cardTopWithinView` anchors on it too rather
 * than on the filter toolbar alone.
 */
const COMMENT_LIST_STICKY_HEADER_ELEMENT_ID = 'comment-list-sticky-header';

/**
 * How far a card's top sits below the visible top of the list, in the card's own (zoomed) pixels.
 * The visible top is the bottom edge of the sticky header: the list's own container never clips
 * (the web-view document is what scrolls, and the zoom root travels with the content), so neither
 * the zoom root's box nor the bare viewport is the right anchor — the header covers the top of the
 * viewport, and the zoom root's top moves with every scroll. Both rectangles are read in one
 * `evaluate` so they cannot be a tick apart. The result is signed: a negative value means the
 * card's top sits ABOVE the header (scrolled past it), which `toBeInViewport` alone would not
 * catch, since the header overlays the card inside the viewport rather than clipping it out.
 * Callers must check both directions — see `CARD_TOP_TOLERANCE_PX`.
 */
async function cardTopWithinView(
  frame: Frame,
  card: ReturnType<typeof cardLocator>,
): Promise<number> {
  const cardId = await card.getAttribute('id');
  if (!cardId) throw new Error('Comment card has no id');
  return frame.evaluate(
    ({ id, headerId }) => {
      const header = document.getElementById(headerId);
      const element = document.querySelector(`[role="option"][id="${id}"]`);
      if (!header || !element) throw new Error(`Sticky header or card "${id}" not found`);
      return element.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
    },
    { id: cardId, headerId: COMMENT_LIST_STICKY_HEADER_ELEMENT_ID },
  );
}

/** A card's rendered height in its own (zoomed) pixels. */
async function cardHeight(card: ReturnType<typeof cardLocator>): Promise<number> {
  return card.evaluate((element) => element.getBoundingClientRect().height);
}

/**
 * Waits for a BCV-sync scroll to settle with the card's top inside the visible band: at or below
 * the sticky toolbar's bottom edge (within {@link CARD_TOP_TOLERANCE_PX}) and no further down than
 * the card's own height.
 *
 * Both bounds are checked inside ONE poll on purpose. The scroll is animated and still running when
 * the navigation call returns, so a poll on a single bound is satisfied by a position the card is
 * merely passing through: scrolling down to a later verse the distance starts far positive, and
 * scrolling back up to an earlier one it starts far negative — each already satisfies the opposite
 * bound on the first sample. The polled value is a phrase rather than a boolean so a failure names
 * which way the card missed.
 */
async function expectCardSettledBelowToolbar(
  frame: Frame,
  card: ReturnType<typeof cardLocator>,
): Promise<void> {
  await expect
    .poll(
      async () => {
        const top = await cardTopWithinView(frame, card);
        const height = await cardHeight(card);
        if (top < -CARD_TOP_TOLERANCE_PX)
          return `hidden under the toolbar by ${Math.round(-top)}px`;
        if (top > height) return `${Math.round(top)}px below the toolbar, past its own height`;
        return 'below the toolbar';
      },
      { timeout: 15_000 },
    )
    .toBe('below the toolbar');
}

/**
 * Closes a dock tab by web view id. `data-web-view-id` is set on `.platform-tab-title`
 * (`platform-tab-title.component.tsx`), not on rc-dock's own `.dock-tab` element, so the close
 * button is found via its ancestor rather than a `.dock-tab[data-web-view-id]` selector that never
 * matches anything.
 *
 * `dispatchEvent` rather than a real hover+click: on a crowded tab strip the close button can sit
 * outside the visible/scrollable area, and `rc-dock` renders a `.dock-tab-hit-area` sibling over
 * the same region for drag/drop hit-testing, either of which can make Playwright's actionability
 * check report the button as covered or non-actionable for a real click (see `closeFindPanel` in
 * `find/replace.spec.ts`, which uses the same `dispatchEvent` for the same reason).
 */
async function closeDockTab(page: Page, webViewId: string): Promise<void> {
  const tabTitle = page.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`);
  const dockTab = tabTitle.locator('xpath=ancestor::*[contains(@class,"dock-tab")][1]');
  await dockTab.locator('.dock-tab-close-btn').dispatchEvent('click');
  await expect(tabTitle).not.toBeVisible({ timeout: 10_000 });
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

    // Threads span several chapters so the BCV-sync step has a distinguishable target, and the six
    // after GEN 3:1 guarantee at least a zoomed viewport's worth of content below that target — a
    // thread at the very end of the list can never be scrolled to the top of the view.
    const threadIds = await createCommentThreads(
      projectA,
      [
        'GEN 1:1',
        'GEN 1:5',
        'GEN 2:1',
        'GEN 3:1',
        'GEN 4:1',
        'GEN 5:1',
        'GEN 6:1',
        'GEN 7:1',
        'GEN 8:1',
        'GEN 9:1',
      ],
      [
        'Zoom test comment 1',
        'Zoom test comment 2',
        'Zoom test comment 3',
        'Zoom test comment 4',
        'Zoom test comment 5',
        'Zoom test comment 6',
        'Zoom test comment 7',
        'Zoom test comment 8',
        'Zoom test comment 9',
        'Zoom test comment 10',
      ],
    );
    await openCommentList(mainPage, projectA);
    const listId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
    const editorId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_EDITOR_WEBVIEW_TYPE);
    const listFrame = await getEditorFrame(mainPage, listId);
    // Set by the "reopening" step below; closed by the next step before it opens project B's list,
    // so that list's own `waitForOpenWebViewIdByType` (a bare find by type) cannot resolve to this
    // one instead of the fresh id project B's list opens with.
    let reopenedListId: string | undefined;

    // Baseline: a fresh pane's cards read the Settings default (1), unscaled.
    await expect.poll(() => readFactor(listFrame, '')).toBe(1);
    const scopeTrigger = listFrame.locator('[data-testid="comment-scope-filter"]');
    const toolbarBoxBaseline = await scopeTrigger.boundingBox();
    if (!toolbarBoxBaseline) throw new Error('Filter toolbar not found');

    await test.step('Ctrl+wheel over the list scales only the cards', async () => {
      const cardBefore = cardLocator(listFrame, threadIds[0]);
      const cardBoxBefore = await cardBefore.boundingBox();
      if (!cardBoxBefore) throw new Error('Comment card not found');

      // Aimed at the first card rather than the zoom area's own box: the area is taller than the
      // pane, so its centre point can lie outside the window and the wheel event would land nowhere.
      await ctrlWheel(mainPage, cardBoxBefore, -120);
      await expect.poll(() => readFactor(listFrame, '')).toBe(1.1);

      const cardBoxAfter = await cardBefore.boundingBox();
      if (!cardBoxAfter) throw new Error('Comment card not found after zoom');
      // A tight tolerance around the actual 1.1 factor: a wide band (e.g. 0.99–1.21) would also
      // accept a ratio of 1.0, so a missing marker that left the whole-iframe fallback scaling
      // nothing would pass unnoticed.
      const ratio = cardBoxAfter.height / cardBoxBefore.height;
      expect(ratio).toBeCloseTo(1.1, 1);

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

    await test.step('the card menu and the assign popover follow the list zoom and stay beside their buttons', async () => {
      const card = cardLocator(listFrame, threadIds[0]);
      await card.click();
      const menuTrigger = card.locator('button[aria-haspopup="menu"]').first();
      const assignTrigger = card.locator('button[aria-haspopup="dialog"]').first();
      await expect(menuTrigger).toBeVisible();

      const measureMenuItem = async () => {
        await menuTrigger.click();
        const menu = listFrame.locator('[data-slot="dropdown-menu-content"]');
        await expect(menu).toBeVisible();
        const item = menu.locator('[data-slot="dropdown-menu-item"]').first();
        const box = await item.boundingBox();
        if (!box) throw new Error('Menu item has no box');
        return { menu, height: box.height };
      };

      // Assign popover: only when the thread offers assignment to this user.
      const canAssign = await assignTrigger.isEnabled();
      const assign = listFrame.locator('[data-slot="popover-content"]');
      /** Opens the assign popover, checks it, and returns its first entry's height. */
      const measureAssignItem = async () => {
        await assignTrigger.click();
        await expect(assign).toBeVisible();
        await expect(assign).toHaveAttribute('data-platform-content-zoom-root', '');
        await expectPopupBesideTriggerAndInsideFrame(listFrame, assign, assignTrigger);
        const box = await assign.locator('[data-slot="command-item"]').first().boundingBox();
        if (!box) throw new Error('Assign entry has no box');
        // The assign popover stops its own Escape, so the card stays expanded.
        await mainPage.keyboard.press('Escape');
        await expect(assign).toBeHidden();
        return box.height;
      };

      await zoomAreaTo(mainPage, listFrame, listId, 'main', 1);
      const atDefault = await measureMenuItem();
      await mainPage.keyboard.press('Escape');
      // The card's dropdown menu has no Escape handler of its own, so the keypress bubbles to the
      // list container's "Escape collapses the last-interacted thread" handler
      // (`handleKeyDownWithEscape` in comment-list.component.tsx) and closes the card along with
      // the menu. Re-select it so the trigger exists for the next measurement.
      await card.click();
      const assignAtDefault = canAssign ? await measureAssignItem() : undefined;

      const factors = [1.5, 2];
      // Sequential zoom steps: each factor's zoom, measurement and pop-up assertion must complete
      // before the next factor is applied.
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < factors.length; i += 1) {
        const factor = factors[i];
        await zoomAreaTo(mainPage, listFrame, listId, 'main', factor);
        const zoomed = await measureMenuItem();
        expect(zoomed.height / atDefault.height).toBeCloseTo(factor, 1);
        await expectPopupBesideTriggerAndInsideFrame(listFrame, zoomed.menu, menuTrigger);
        await mainPage.keyboard.press('Escape');
        // Same collapse-on-Escape side effect as above; re-select for the next measurement.
        await card.click();
        if (assignAtDefault !== undefined)
          expect((await measureAssignItem()) / assignAtDefault).toBeCloseTo(factor, 1);
      }
      /* eslint-enable no-await-in-loop */

      if (!canAssign) {
        // Recorded so a fixture change that removes assignable users is visible in the report.
        test.info().annotations.push({
          type: 'skipped-substep',
          description: 'assign popover: no assignable users in the fixture project',
        });
      }

      // Leave the level where the following steps expect it (1.1, set by the wheel step above).
      await zoomAreaTo(mainPage, listFrame, listId, 'main', 1.1);
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

      // Scrolling down to a later verse, then back up to the FIRST card — the direction that a
      // sticky header hides the target under, since the scroll stops where the card's top reaches
      // the top of the scroll container rather than the top of the visible content.
      const gen3Card = cardLocator(listFrame, threadIds[3]);
      await navigateToolbarBcv(mainPage, 'Genesis 3:1');
      await expect(gen3Card).toBeInViewport({ timeout: 15_000 });
      await expectCardSettledBelowToolbar(listFrame, gen3Card);

      const gen1Card = cardLocator(listFrame, threadIds[0]);
      await navigateToolbarBcv(mainPage, 'Genesis 1:1');
      await expect(gen1Card).toBeInViewport({ timeout: 15_000 });
      await expectCardSettledBelowToolbar(listFrame, gen1Card);
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

      await closeDockTab(mainPage, listId);
      await openCommentList(mainPage, projectA);
      reopenedListId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
      const reopenedListFrame = await getEditorFrame(mainPage, reopenedListId);
      await expect.poll(() => readFactor(reopenedListFrame, '')).toBe(1.2);
    });

    await test.step("a different project's comment list inherits nothing from the first", async () => {
      if (!reopenedListId)
        throw new Error('test setup: no reopened list id from the previous step');
      // Close project A's list first: project B's own list must start at the default independent of
      // A, and leaving A's list open would let `waitForOpenWebViewIdByType` below (a bare find by
      // type) resolve to A's still-open id instead of the fresh one project B's list opens with.
      await closeDockTab(mainPage, reopenedListId);
      await createCommentThreads(projectB, ['GEN 1:1'], ['Zoom test comment for project B']);
      await openCommentList(mainPage, projectB);
      const projectBListId = await waitForOpenWebViewIdByType(mainPage, COMMENT_LIST_WEBVIEW_TYPE);
      const projectBListFrame = await getEditorFrame(mainPage, projectBListId);
      await expect.poll(() => readFactor(projectBListFrame, '')).toBe(1);
    });
  });
});
