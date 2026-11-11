/**
 * Typing a marker through the `\` palette makes the marker, not literal text. The palette's Space
 * commit writes the typed marker's bytes (`\nd `) into the document and the editor turns them into
 * the marker as it settles, so this is the end-to-end check of that hand-off: unit tests cover the
 * editor and the key routing separately, and only the running app puts them together.
 *
 * It also checks that `\` opens the palette over a selection and that Escape dismisses a palette
 * opened from the editor.
 *
 * The same markers typed straight through, without waiting for the palette to appear, are covered
 * by marker-palette-typed-through.spec.ts.
 *
 * The second test covers `\` `f` Space at the end of a paragraph in Standard view: it inserts a
 * footnote and puts the caret in that footnote's row in the footnotes pane, the same as `\` `f`
 * Enter (and Paratext 9's marker dropdown, where Space on a note marker runs Insert Footnote). The
 * order of three things decides where the caret ends up: the palette closing, the overlay service
 * handing focus back to the main editor as it does, and the note going in (which opens the pane's
 * row editor). The handback has to come first, because focus leaving the row editor ends its
 * editing session. Only the real app has the palette in the renderer frame, the editor in the web
 * view's iframe and the overlay service's handback, so this is asserted end to end.
 *
 * Each `test()` starts its own Electron instance: the first leaves typed text and a verse in Jonah
 * 1, which the second's paragraph-end caret would have to tolerate. The scenarios inside a test run
 * as test.step()s on its one instance. Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { getMarkerPalette, openMarkerPalette } from '../../../fixtures/marker-palette.page';
import {
  clickBeforeGlyph,
  findScriptureEditorFrame,
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

test.describe('scripture editor marker palette typed commit', () => {
  test('a marker typed through the palette becomes that marker', async ({ mainPage }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    await expect(editorInput).toContainText('word came to Jonah the son of Amittai', {
      timeout: 60_000,
    });

    // The marker palette renders in the renderer (parent doc), not the editor iframe.
    const palette = getMarkerPalette(mainPage);
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    /** Whether a `\nd` span holds the given text, so that text is styled as `\nd`. */
    const isInNdSpan = async (text: string) =>
      editorEvalFrame.evaluate(
        (typed) =>
          Array.from(
            document.querySelectorAll('.editor-input.marker-editable span.char[data-marker="nd"]'),
          ).some((span) => span.textContent?.includes(typed)),
        text,
      );
    /** Whether the editor holds a verse with the given number. Jonah 1 ends at verse 17. */
    const hasVerse = async (number: string) =>
      editorEvalFrame.evaluate(
        (verseNumber) =>
          !!document.querySelector(
            `.editor-input.marker-editable [data-marker="v"][data-number="${verseNumber}"]`,
          ),
        number,
      );

    /** Types `\`, the marker and Space through the palette, then `after` at the caret it leaves. */
    const typeMarker = async (marker: string, after: string) => {
      await mainPage.keyboard.press('\\');
      await expect(palette).toBeAttached({ timeout: 15_000 });
      await mainPage.keyboard.type(marker);
      await mainPage.keyboard.press('Space');
      await expect(palette).not.toBeAttached({ timeout: 10_000 });
      await mainPage.keyboard.type(after);
    };

    await test.step('text typed after \\nd goes into the \\nd span', async () => {
      // Into the verse text, after the footnote.
      await editorInput
        .getByText('word came to Jonah the son of Amittai', { exact: false })
        .click();
      await typeMarker('nd', 'Qx');
      await expect.poll(() => isInNdSpan('Qx'), { timeout: 20_000 }).toBe(true);
    });

    await test.step('a number typed after \\v becomes the verse number', async () => {
      expect(await hasVerse('91')).toBe(false);
      await mainPage.keyboard.press('End');
      await typeMarker('v', '91 Z');
      await expect.poll(() => hasVerse('91'), { timeout: 20_000 }).toBe(true);
    });

    await test.step('a selection + backslash opens the marker palette', async () => {
      // The editor still holds focus after the last commit; select the caret's line.
      await mainPage.keyboard.press('Home');
      await mainPage.keyboard.press('Shift+End');
      const selectedText = await editorEvalFrame.evaluate(
        () => window.getSelection()?.toString() ?? '',
      );
      expect(selectedText.length).toBeGreaterThan(0);
      await openMarkerPalette(mainPage);
    });

    await test.step('Escape dismisses the marker palette opened from the editor', async () => {
      await mainPage.keyboard.press('Escape');
      await expect(palette).not.toBeAttached({ timeout: 10_000 });
    });
  });

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
    const palette = getMarkerPalette(mainPage);

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
