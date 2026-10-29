import type { Frame, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/comment.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  openEditableScriptureEditorForProject,
} from '../../../fixtures/scripture-editor-helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  type CommentTestProject,
} from '../../../fixtures/comment-test-helpers';

// Launch fixture (not the cdp connect fixture): the running app scans the projects folder exactly
// once at startup, so the test project MUST exist on disk before the app launches. comment.fixture
// launches Electron lazily (after beforeAll), so the project is present for the startup scan. Same
// worker-scoped launch fixture the verse-navigation spec uses; "comment" is only its historical
// name.

// The top toolbar's BookChapterControl trigger is the first one in the DOM
const BCV_TRIGGER = '[aria-label="book-chapter-trigger"]';
// The control's search box is a plain input inside the Radix popper (it renders no cmdk input)
const BCV_SEARCH_INPUT = '[data-radix-popper-content-wrapper] input';
const OPEN_MENU = '[role=menu][data-state=open]';

test.use({ commentAppOwner: 'menu-dismissal' });

interface Point {
  x: number;
  y: number;
}

/** Centre of the editor iframe element, in main-page coordinates */
async function getEditorCentre(editorFrame: Frame): Promise<Point> {
  const iframeElement = await editorFrame.frameElement();
  const box = await iframeElement.boundingBox();
  if (!box) throw new Error('Editor iframe has no bounding box');
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/**
 * An empty spot on the main window's top toolbar (right edge minus 200 px, vertical centre),
 * asserted to be plain main-document chrome: not an iframe and not an interactive control.
 */
async function getToolbarEmptySpot(mainPage: Page): Promise<Point> {
  const toolbar = mainPage.locator('[role=menubar]').first();
  const box = await toolbar.boundingBox();
  if (!box) throw new Error('Top toolbar has no bounding box');
  const point = { x: box.x + box.width - 200, y: box.y + box.height / 2 };
  const hit = await mainPage.evaluate(({ x, y }) => {
    const element = document.elementFromPoint(x, y);
    return {
      tagName: element?.tagName ?? 'none',
      interactive: !!element?.closest('button, a, input, [role=menuitem], [role=combobox]'),
    };
  }, point);
  expect(hit.tagName).not.toBe('IFRAME');
  expect(hit.tagName).not.toBe('none');
  expect(hit.interactive).toBe(false);
  return point;
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
    const editorCentre = await getEditorCentre(editorFrame);

    await mainPage.locator(BCV_TRIGGER).first().click();
    await expect(mainPage.locator(BCV_SEARCH_INPUT)).toBeVisible();

    await mainPage.mouse.click(editorCentre.x, editorCentre.y);
    await expect(mainPage.locator(BCV_SEARCH_INPUT)).toBeHidden();
  });

  test('Platform menu closes on a click inside the editor', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);
    const editorCentre = await getEditorCentre(editorFrame);

    await mainPage.getByRole('menuitem', { name: 'Platform' }).first().click();
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);

    await mainPage.mouse.click(editorCentre.x, editorCentre.y);
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(0);
  });

  test('editor hamburger closes on a click on the main toolbar', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);
    const toolbarSpot = await getToolbarEmptySpot(mainPage);

    await editorFrame.locator("button[aria-label='Project']").first().click();
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(1);

    await mainPage.mouse.click(toolbarSpot.x, toolbarSpot.y);
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(0);
  });

  test('inline markers menu closes on a click on the main toolbar', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);
    const toolbarSpot = await getToolbarEmptySpot(mainPage);

    // Typing the backslash in the text opens the inline markers menu
    await editorFrame.locator('[contenteditable=true]').first().click();
    await mainPage.keyboard.press('\\');
    const markersMenu = editorFrame.locator('[data-radix-popper-content-wrapper]');
    await expect(markersMenu.first()).toBeVisible();

    await mainPage.mouse.click(toolbarSpot.x, toolbarSpot.y);
    await expect(markersMenu).toHaveCount(0);
  });

  test('opening a toolbar menu closes an open editor hamburger', async ({ mainPage }) => {
    const editorFrame = await openEditor(mainPage);

    await editorFrame.locator("button[aria-label='Project']").first().click();
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(1);

    await mainPage.getByRole('menuitem', { name: 'Platform' }).first().click();
    await expect(editorFrame.locator(OPEN_MENU)).toHaveCount(0);
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
  });

  test.describe('controls', () => {
    test('a click inside the open BCV picker keeps it open', async ({ mainPage }) => {
      await openEditor(mainPage);

      await mainPage.locator(BCV_TRIGGER).first().click();
      const searchInput = mainPage.locator(BCV_SEARCH_INPUT);
      await expect(searchInput).toBeVisible();

      await searchInput.click();
      await expect(searchInput).toBeVisible();
    });

    test('a main-frame click still closes the Platform menu', async ({ mainPage }) => {
      await openEditor(mainPage);
      const toolbarSpot = await getToolbarEmptySpot(mainPage);

      await mainPage.getByRole('menuitem', { name: 'Platform' }).first().click();
      await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);

      await mainPage.mouse.click(toolbarSpot.x, toolbarSpot.y);
      await expect(mainPage.locator(OPEN_MENU)).toHaveCount(0);
    });
  });
});
