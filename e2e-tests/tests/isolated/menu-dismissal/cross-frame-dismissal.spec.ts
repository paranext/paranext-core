import type { Frame, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/comment.fixture';
import {
  waitForAppReady,
  waitForOpenWebViewIdByType,
  waitForOverlayGone,
} from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  openEditableScriptureEditorForProject,
} from '../../../fixtures/scripture-editor-helpers';
import {
  clickCommentsTab,
  cleanupCommentTestProject,
  createCommentTestProject,
  openCommentListPanel,
  type CommentTestProject,
} from '../../../fixtures/comment-test-helpers';

// Launch fixture (not the cdp connect fixture): the running app scans the projects folder exactly
// once at startup, so the test project MUST exist on disk before the app launches. comment.fixture
// launches Electron lazily (after beforeAll), so the project is present for the startup scan. Same
// worker-scoped launch fixture the verse-navigation spec uses; it also starts the app in Simple
// mode, whose Column 3 Comments tab supplies the web-view Select the Select variant opens (the
// "All comments" preset filter).

// The top toolbar's BookChapterControl trigger is the first one in the DOM
const BCV_TRIGGER = '[aria-label="book-chapter-trigger"]';
// The control's search box is a plain input inside the Radix popper (it renders no cmdk input)
const BCV_SEARCH_INPUT = '[data-radix-popper-content-wrapper] input';
const OPEN_MENU = '[role=menu][data-state=open]';
const TOOLBAR_LOGO = 'img[alt="Application Logo"]';
// Long enough for a late close or focus return to land before a "stays open" assertion repeats
const SETTLE_MS = 300;
// Fixed web view type of the Simple layout's Column 3 Comments tab (its id is minted per launch)
const COMMENT_LIST_PANEL_WEBVIEW_TYPE = 'legacyCommentManager.commentListPanel';
// The Comments tab's "All comments" preset filter: a Select trigger inside the Comments web view
const COMMENT_PRESET_FILTER = '[data-testid="comment-preset-filter"]';
const SELECT_CONTENT = '[data-slot="select-content"]';

test.use({ commentAppOwner: 'menu-dismissal' });

interface Point {
  x: number;
  y: number;
}

/**
 * A point inside the editor iframe: horizontal centre, 75 % down. Low in the frame so an open
 * top-toolbar popper (which hangs over the upper part of the editor column) cannot cover it;
 * asserted to hit the iframe itself rather than a popper in the main document.
 */
async function getEditorClickPoint(mainPage: Page, editorFrame: Frame): Promise<Point> {
  const iframeElement = await editorFrame.frameElement();
  const box = await iframeElement.boundingBox();
  if (!box) throw new Error('Editor iframe has no bounding box');
  const point = { x: box.x + box.width / 2, y: box.y + box.height * 0.75 };
  const hit = await mainPage.evaluate(({ x, y }) => {
    const element = document.elementFromPoint(x, y);
    return {
      tagName: element?.tagName ?? 'none',
      inPopper: !!element?.closest('[data-radix-popper-content-wrapper]'),
    };
  }, point);
  expect(hit.tagName).toBe('IFRAME');
  expect(hit.inPopper).toBe(false);
  return point;
}

/**
 * The application logo at the start of the main toolbar: a non-interactive image inside the
 * toolbar's no-drag area, so a real click on it reaches the page (a click on the window-drag region
 * is taken by the OS). Asserted to be plain main-document chrome that is not in the drag region.
 */
async function getToolbarLogoPoint(mainPage: Page): Promise<Point> {
  const box = await mainPage.locator(TOOLBAR_LOGO).first().boundingBox();
  if (!box) throw new Error('Toolbar logo has no bounding box');
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  const hit = await mainPage.evaluate(({ x, y }) => {
    const element = document.elementFromPoint(x, y);
    // The effective app region is the nearest ancestor's that is not `none`; a profile without a
    // drag area reports `none` everywhere.
    let appRegion = 'none';
    for (let current = element; current; current = current.parentElement) {
      const style = getComputedStyle(current);
      const value =
        style.getPropertyValue('app-region') || style.getPropertyValue('-webkit-app-region');
      if (value && value !== 'none') {
        appRegion = value;
        break;
      }
    }
    return {
      tagName: element?.tagName ?? 'none',
      interactive: !!element?.closest('button, a, input, [role=menuitem], [role=combobox]'),
      appRegion,
    };
  }, point);
  expect(hit.tagName).toBe('IMG');
  expect(hit.interactive).toBe(false);
  expect(hit.appRegion).not.toBe('drag');
  return point;
}

/** Clicks the logo and proves the press reached the page with the logo as its target */
async function clickToolbarLogo(mainPage: Page, point: Point): Promise<void> {
  await mainPage.evaluate(() => {
    document.addEventListener(
      'pointerdown',
      (event) => {
        document.documentElement.dataset.e2eLogoPress =
          event.target instanceof HTMLImageElement && event.target.alt === 'Application Logo'
            ? 'logo'
            : 'other';
      },
      { capture: true, once: true },
    );
  });
  await mainPage.mouse.click(point.x, point.y);
  await expect
    .poll(async () => mainPage.evaluate(() => document.documentElement.dataset.e2eLogoPress))
    .toBe('logo');
  await mainPage.evaluate(() => {
    delete document.documentElement.dataset.e2eLogoPress;
  });
}

test.describe('menus dismiss when the click lands in another frame', () => {
  let project: CommentTestProject;

  test.beforeAll(async () => {
    // Disposable project copy, created before the fixture launches Electron (see top comment)
    project = await createCommentTestProject([]);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  /** Opens the editable editor and returns its frame */
  async function openEditor(mainPage: Page): Promise<Frame> {
    await waitForAppReady(mainPage);
    await openEditableScriptureEditorForProject(mainPage, project.projectId);
    await expect(mainPage.locator(BCV_TRIGGER).first()).toBeEnabled({ timeout: 15_000 });
    return findScriptureEditorFrame(mainPage);
  }

  test('top toolbar BCV picker closes on a click inside the editor', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);

    await mainPage.locator(BCV_TRIGGER).first().click();
    await expect(mainPage.locator(BCV_SEARCH_INPUT)).toBeVisible();
    // Measured with the picker open so the guard proves its popper does not cover the point
    const editorPoint = await getEditorClickPoint(mainPage, editorFrame);

    await mainPage.mouse.click(editorPoint.x, editorPoint.y);
    await expect(mainPage.locator(BCV_SEARCH_INPUT)).toBeHidden();
  });

  test('Platform menu closes on a click inside the editor', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);

    await mainPage.getByRole('menuitem', { name: 'Platform' }).first().click();
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
    const editorPoint = await getEditorClickPoint(mainPage, editorFrame);

    await mainPage.mouse.click(editorPoint.x, editorPoint.y);
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(0);
  });

  test('editor hamburger closes on a click on the main toolbar', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);
    const toolbarLogo = await getToolbarLogoPoint(mainPage);

    await editorFrame.locator("button[aria-label='Project']").first().click();
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(1);

    await clickToolbarLogo(mainPage, toolbarLogo);
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(0);
  });

  test('inline markers menu closes on a click on the main toolbar', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);
    const toolbarLogo = await getToolbarLogoPoint(mainPage);

    // Typing the backslash in the text opens the inline markers menu
    await editorFrame.locator('[contenteditable=true]').first().click();
    const poppers = editorFrame.locator('[data-radix-popper-content-wrapper]');
    const poppersBefore = await poppers.count();
    await mainPage.keyboard.press('\\');
    // The popper that appears after the backslash is the markers menu (the last one in the frame),
    // so a stray tooltip popper cannot stand in for it.
    await expect(poppers).toHaveCount(poppersBefore + 1);
    const markersMenu = await poppers.last().elementHandle();
    if (!markersMenu) throw new Error('Markers menu popper not found');

    await clickToolbarLogo(mainPage, toolbarLogo);
    await expect.poll(async () => markersMenu.isVisible()).toBe(false);
  });

  test('opening a toolbar menu closes an open editor hamburger', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);

    await editorFrame.locator("button[aria-label='Project']").first().click();
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(1);

    await mainPage.getByRole('menuitem', { name: 'Platform' }).first().click();
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(0);
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
    // Settle, then assert again so a late close or refocus would be caught
    await mainPage.waitForTimeout(SETTLE_MS);
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
  });

  test('opening a toolbar menu closes an open web-view Select and stays open', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    const commentsPanelId = await waitForOpenWebViewIdByType(
      mainPage,
      COMMENT_LIST_PANEL_WEBVIEW_TYPE,
    );
    await openCommentListPanel(project.projectId);
    const commentsFrame = mainPage.frameLocator(`iframe[data-web-view-id="${commentsPanelId}"]`);
    const presetFilter = commentsFrame.locator(COMMENT_PRESET_FILTER);
    // A dock rebuild (the workspace-updating overlay) can still reset the active tab, so wait it
    // out and retry the tab click until the filter shows
    await expect(async () => {
      await waitForOverlayGone(mainPage, 60_000);
      await clickCommentsTab(mainPage, commentsPanelId, 5_000);
      await expect(presetFilter).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 180_000 });
    await waitForOverlayGone(mainPage, 30_000);

    await presetFilter.click();
    const selectContent = commentsFrame.locator(SELECT_CONTENT);
    await expect(selectContent).toBeVisible({ timeout: 10_000 });
    await expect(commentsFrame.getByRole('listbox')).toHaveCount(1);
    await expect(presetFilter).toHaveAttribute('aria-expanded', 'true');

    const platformTrigger = mainPage.getByRole('menuitem', { name: 'Platform' }).first();
    await platformTrigger.click();
    await expect(selectContent).toHaveCount(0);
    await expect(commentsFrame.getByRole('listbox')).toHaveCount(0);

    // A Select close that refocused its trigger would pull focus back into the web view and close
    // the menu just opened, which nothing reopens; check at two settle points so a late refocus is
    // caught too
    const assertPlatformMenuStillOpen = async () => {
      await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
      await expect(platformTrigger).toHaveAttribute('aria-expanded', 'true');
      const triggerIsFocused = await presetFilter.evaluate(
        (trigger) => trigger.ownerDocument.activeElement === trigger,
      );
      expect(triggerIsFocused).toBe(false);
    };
    await mainPage.waitForTimeout(SETTLE_MS);
    await assertPlatformMenuStillOpen();
    await mainPage.waitForTimeout(500);
    await assertPlatformMenuStillOpen();
  });

  test.describe('controls', () => {
    test('a click inside the open BCV picker keeps it open', async ({ mainPage }) => {
      await openEditor(mainPage);

      await mainPage.locator(BCV_TRIGGER).first().click();
      const searchInput = mainPage.locator(BCV_SEARCH_INPUT);
      await expect(searchInput).toBeVisible();

      await searchInput.click();
      await expect(searchInput).toBeVisible();
      // Settle, then assert again so a late close or refocus would be caught
      await mainPage.waitForTimeout(SETTLE_MS);
      await expect(searchInput).toBeVisible();
    });

    test('a main-frame click still closes the Platform menu', async ({ mainPage }) => {
      await openEditor(mainPage);
      const toolbarLogo = await getToolbarLogoPoint(mainPage);

      await mainPage.getByRole('menuitem', { name: 'Platform' }).first().click();
      await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);

      await clickToolbarLogo(mainPage, toolbarLogo);
      await expect(mainPage.locator(OPEN_MENU)).toHaveCount(0);
    });
  });
});
