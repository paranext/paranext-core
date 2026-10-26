/**
 * Typing `\` `f` Space at the end of a paragraph in Standard view inserts a footnote and puts the
 * caret in that footnote's row in the footnotes pane, the same as `\` `f` Enter (and Paratext 9's
 * marker dropdown, where Space on a note marker runs Insert Footnote).
 *
 * The order of three things decides where the caret ends up: the palette closing, the overlay
 * service handing focus back to the main editor as it does, and the note going in (which opens the
 * pane's row editor). The handback has to come first, because focus leaving the row editor ends its
 * editing session. Only the real app has the palette in the renderer frame, the editor in the web
 * view's iframe and the overlay service's handback, so this is asserted end to end.
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/note-palette-space-focuses-pane.spec.ts`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  clickBeforeGlyph,
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const FOOTNOTES_PANE_SELECTOR = '[data-footnotes-pane]';

test.describe('Standard view marker palette: Space on a note marker', () => {
  test('`\\` `f` Space at a paragraph end puts the caret in the new footnote in the pane', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:2');

    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toContainText('preach against it', { timeout: 60_000 });
    const pane = editorFrame.locator(FOOTNOTES_PANE_SELECTOR);
    await expect(pane).toHaveCount(0);
    // The marker palette renders in the renderer (parent doc), not the editor iframe.
    const palette = mainPage.locator('[data-overlay-command-palette]').first();

    // Jonah 1: `\p \v 1 … \v 2 … before me.”` then `\p \v 3 …`.
    const verse2Para = editorInput.locator('p:has(span[data-marker="v"][data-number="2"])');
    const verse3Para = editorInput.locator('p:has(span[data-marker="v"][data-number="3"])');
    const frame = await getEditorFrame(mainPage, editorId);

    await test.step('the caret sits at the end of the verse 2 paragraph', async () => {
      await clickBeforeGlyph(verse3Para.locator('span.opening').first());
      await mainPage.keyboard.press('ArrowLeft');
      const atParagraphEnd = await frame.evaluate(() => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return false;
        const { anchorNode, anchorOffset } = selection;
        const para = anchorNode?.parentElement?.closest('p');
        if (!anchorNode || !para?.lastChild) return false;
        if (!para.querySelector('span[data-marker="v"][data-number="2"]')) return false;
        const rest = document.createRange();
        rest.setStart(anchorNode, anchorOffset);
        rest.setEndAfter(para.lastChild);
        return rest.toString().trim() === '';
      });
      expect(atParagraphEnd).toBe(true);
    });

    await test.step('`\\` `f` Space inserts a footnote and opens the pane', async () => {
      const notesBefore = await verse2Para.locator('.note').count();
      await mainPage.keyboard.press('\\');
      await expect(palette).toBeAttached({ timeout: 15_000 });
      await mainPage.keyboard.press('f');
      await mainPage.keyboard.press(' ');
      await expect(palette).not.toBeAttached({ timeout: 10_000 });
      await expect(pane).toHaveCount(1, { timeout: 20_000 });
      await expect
        .poll(() => verse2Para.locator('.note').count(), { timeout: 10_000 })
        .toBeGreaterThan(notesBefore);
    });

    await test.step('the caret is in the pane, and typing lands in the new footnote', async () => {
      await expect
        .poll(
          () =>
            frame.evaluate(
              (paneSelector) => !!document.activeElement?.closest(paneSelector),
              FOOTNOTES_PANE_SELECTOR,
            ),
          { timeout: 10_000 },
        )
        .toBe(true);
      await mainPage.keyboard.type('zqx');
      await expect(pane).toContainText('zqx', { timeout: 10_000 });
    });
  });
});
