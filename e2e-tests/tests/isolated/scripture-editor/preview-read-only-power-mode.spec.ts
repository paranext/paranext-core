/**
 * Power mode's two views: Ctrl+E toggles the editable Standard view and Preview, the formatted
 * view, which is read-only in Power. Preview's tab title carries "(Read-only)", and entering it in
 * an editable project shows a notice saying how to edit. In Preview a footnote caller jumps to its
 * note in the footnotes pane instead of opening a popover, and comments can still be added. Ctrl+E
 * also ends an open footnote row edit, keeping what was typed in it, and the editor's Preview menu
 * item (`platformScriptureEditor.setViewPreview`) shows the same read-only Preview. A round trip
 * through Preview clears the text's undo history, which the undo step pins.
 *
 * Jonah 1 carries footnote callers at verses 1, 6 (twice) and 9
 * (`c-sharp/assets/WEB/32JONengWEBUS.SFM`), and verse 2 holds "that great city".
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/preview-read-only-power-mode.spec.ts`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { TEXT_NOTE_CALLER_SELECTOR } from '../../../fixtures/content-zoom-helpers';
import {
  ensureFootnotesVisible,
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  preConfigurePreviewNoticeDismissals,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const FOOTNOTES_PANE_SELECTOR = '[data-footnotes-pane]';

/** The tab title's suffix for an editable text (`%webView_platformScriptureEditor_title_format%`). */
const EDITABLE_TITLE = '(Editable)';

/** The tab title's suffix for a read-only text, Preview in Power among them. */
const READ_ONLY_TITLE = '(Read-only)';

/** What the notice says on entering Preview in an editable project, after the project's name. */
const PREVIEW_NOTICE_TEXT = 'is read-only. To edit, switch to Standard view.';

test.describe('Power-mode Standard view and Preview', () => {
  let restorePreviewNoticeDismissals: (() => void) | undefined;

  // A "Don't show again today" clicked in an earlier run or in the dev app would hide the notice
  // step 2 waits for, and the notifier reads those choices only at startup.
  test.beforeAll(() => {
    restorePreviewNoticeDismissals = preConfigurePreviewNoticeDismissals({});
  });

  test.afterAll(() => {
    restorePreviewNoticeDismissals?.();
  });

  test('Ctrl+E toggles Standard view and a read-only Preview', async ({ mainPage }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, several view switches).
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').first().waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    // The main text comes first; a footnotes pane row editor renders an `.editor-input` of its own.
    const mainInput = editorFrame.locator('.editor-input').first();
    await expect(mainInput).toContainText('that great city', { timeout: 60_000 });
    const text = mainInput.getByText('that great city', { exact: false }).first();
    // `data-web-view-id` is on `.platform-tab-title` (`platform-tab-title.component.tsx`).
    const tabTitle = mainPage.locator(`.platform-tab-title[data-web-view-id="${editorId}"]`);
    const pane = editorFrame.locator(FOOTNOTES_PANE_SELECTOR);
    const editingRow = pane.locator('li[data-state="editing"]');
    // The footnote editor popover is the one pop-up that holds an editor of its own.
    const footnotePopover = editorFrame.locator('[data-slot="popover-content"]').filter({
      has: editorFrame.locator('.editor-input'),
    });

    const expectStandardView = async () => {
      await expect(mainInput).toHaveClass(/\bmarker-editable\b/, { timeout: 20_000 });
      await expect(mainInput).toHaveAttribute('contenteditable', 'true');
      await expect(tabTitle).toContainText(EDITABLE_TITLE, { timeout: 20_000 });
      await expect(tabTitle).not.toContainText(READ_ONLY_TITLE);
    };
    const expectPreview = async () => {
      await expect(mainInput).toHaveClass(/\bmarker-hidden\b/, { timeout: 20_000 });
      await expect(mainInput).toHaveAttribute('contenteditable', 'false');
      await expect(tabTitle).toContainText(READ_ONLY_TITLE, { timeout: 20_000 });
    };
    /** Presses Ctrl+E with the caret in the Scripture text, so the editor's own keydown gets it. */
    const pressCtrlEInText = async () => {
      await text.click();
      await mainPage.keyboard.press('Control+e');
    };

    /** Waits until keyboard focus is inside the footnotes pane. */
    const expectFocusInPane = async () => {
      await expect
        .poll(
          () =>
            editorFrame.evaluate(
              (paneSelector) => !!document.activeElement?.closest(paneSelector),
              FOOTNOTES_PANE_SELECTOR,
            ),
          { timeout: 10_000 },
        )
        .toBe(true);
    };

    await test.step('starts editable in Standard view', async () => {
      await expect(editorFrame.locator('.editor-input.marker-editable')).toBeAttached({
        timeout: 20_000,
      });
      await expectStandardView();
    });

    await test.step('Ctrl+E shows a read-only Preview with its notice', async () => {
      await pressCtrlEInText();
      await expect(editorFrame.locator('.editor-input.marker-hidden')).toBeAttached({
        timeout: 20_000,
      });
      await expect(mainInput).toHaveAttribute('contenteditable', 'false');

      const textBefore = await mainInput.textContent();
      await text.click();
      await mainPage.keyboard.type('x');

      // The title and the notice come back through PAPI, so by the time they show, a keystroke
      // the text took would long have landed in it.
      await expect(tabTitle).toContainText(READ_ONLY_TITLE, { timeout: 20_000 });
      const notice = mainPage.locator('[data-sonner-toast]', { hasText: PREVIEW_NOTICE_TEXT });
      await expect(notice).toBeVisible({ timeout: 20_000 });
      await expect(notice).toContainText("Don't show again today");
      expect(await mainInput.textContent()).toBe(textBefore);
    });

    await test.step('a footnote caller jumps to the note in the pane', async () => {
      if ((await pane.count()) > 0)
        await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
      await expect(pane).toHaveCount(0, { timeout: 20_000 });

      await editorFrame.locator(TEXT_NOTE_CALLER_SELECTOR).first().click();
      await expect(pane).toHaveCount(1, { timeout: 20_000 });
      // The first caller in the text is the first note, so its row is the one selected.
      const selectedRow = pane.locator('[role="option"][aria-selected="true"]');
      await expect(selectedRow).toHaveCount(1, { timeout: 20_000 });
      await expect(pane.locator('[role="option"]').first()).toHaveAttribute(
        'aria-selected',
        'true',
      );
      await expectFocusInPane();
      // Checked once the pane has answered the click, so a popover the click opened would be up.
      await expect(footnotePopover).toHaveCount(0);
      await expect(editingRow).toHaveCount(0);
    });

    await test.step('comments can still be added', async () => {
      const commentEditor = editorFrame
        .locator('[data-slot="popover-content"]')
        .filter({ hasNot: editorFrame.locator('.editor-input') })
        .last();
      await text.dblclick();
      await mainPage.keyboard.press('Control+Shift+N');
      await expect(commentEditor).toBeVisible({ timeout: 20_000 });
      // The comment editor takes focus shortly after it opens, and only its focused text box
      // closes it on Escape.
      await expect(commentEditor.locator('[contenteditable="true"]')).toBeFocused();
      await mainPage.keyboard.press('Escape');
      await expect(commentEditor).toBeHidden();
    });

    await test.step('Ctrl+E returns to editable Standard view', async () => {
      await pressCtrlEInText();
      await expectStandardView();
    });

    // Switching views reloads the editor's document with the new view's options, and that reload
    // clears the undo history: `LoadStatePlugin` in `@eten-tech-foundation/platform-editor` sends
    // Lexical's `CLEAR_HISTORY_COMMAND` whenever its view options change. This step pins that, with
    // a control showing undo works when the view does not change. If a view switch ever keeps the
    // history, the typing should be undone after the round trip and this step must change with it.
    await test.step('a round trip through Preview clears the undo history', async () => {
      const undoButton = editorFrame
        .locator('.scripture-editor-tab-nav')
        .getByRole('button', { name: 'Undo', exact: true });

      // Control: with no view switch, Ctrl+Z undoes the typing.
      await expect(mainInput).not.toContainText('zq');
      await text.click();
      await mainPage.keyboard.type('zq');
      await expect(mainInput).toContainText('zq');
      await expect(undoButton).toBeEnabled();
      await mainPage.keyboard.press('Control+z');
      await expect(mainInput).not.toContainText('zq', { timeout: 10_000 });

      await mainPage.keyboard.type('zq');
      await expect(mainInput).toContainText('zq');
      await expect(undoButton).toBeEnabled();

      await pressCtrlEInText();
      await expectPreview();
      await pressCtrlEInText();
      await expectStandardView();

      // The editor reports an empty history, and Ctrl+Z leaves the typing in place.
      await expect(undoButton).toBeDisabled({ timeout: 10_000 });
      await text.click();
      await mainPage.keyboard.press('Control+z');
      await expect(mainInput).toContainText('zq');
    });

    await test.step('Ctrl+E ends an open footnote row edit', async () => {
      await ensureFootnotesVisible(mainPage, editorFrame, editorId);
      // Standard view edits a note in its footnotes pane row; a caller click opens that row's editor
      // with the caret at the end of the note.
      await editorFrame.locator(TEXT_NOTE_CALLER_SELECTOR).first().click();
      await expect(editingRow).toHaveCount(1, { timeout: 20_000 });
      await expect(editingRow.locator('.editor-input')).toBeAttached();
      await expectFocusInPane();
      await mainPage.keyboard.type('qjx');
      await expect(editingRow).toContainText('qjx', { timeout: 10_000 });

      await mainPage.keyboard.press('Control+e');
      await expectPreview();
      await expect(editingRow).toHaveCount(0, { timeout: 20_000 });
      await expect(pane.locator('.editor-input')).toHaveCount(0);
      // The row edit ended with what was typed in it kept.
      await expect(pane).toContainText('qjx');
    });

    await test.step("the menu's Preview item does the same", async () => {
      await sendCommandWithId(mainPage, 'platformScriptureEditor.setViewStandard', editorId);
      await expectStandardView();

      await sendCommandWithId(mainPage, 'platformScriptureEditor.setViewPreview', editorId);
      await expect(editorFrame.locator('.editor-input.marker-hidden')).toBeAttached({
        timeout: 20_000,
      });
      await expect(tabTitle).toContainText(READ_ONLY_TITLE, { timeout: 20_000 });
    });
  });
});
