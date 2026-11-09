/**
 * Typing a marker through the `\` palette makes the marker, not literal text. The palette's Space
 * commit writes the typed marker's bytes (`\nd `) into the document and the editor turns them into
 * the marker as it settles, so this is the end-to-end check of that hand-off: unit tests cover the
 * editor and the key routing separately, and only the running app puts them together.
 *
 * ONE test() per spec file (isolated-fixture / second-Electron-instance constraint — see
 * standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  findScriptureEditorFrame,
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
    const palette = mainPage.locator('[data-overlay-command-palette]').first();
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

    await test.step('typed straight through, without waiting for the palette', async () => {
      await mainPage.keyboard.press('End');
      await mainPage.keyboard.type('\\nd Rx');
      await expect.poll(() => isInNdSpan('Rx'), { timeout: 20_000 }).toBe(true);
      expect(await hasVerse('92')).toBe(false);
      await mainPage.keyboard.press('End');
      await mainPage.keyboard.type('\\v 92 Y');
      await expect.poll(() => hasVerse('92'), { timeout: 20_000 }).toBe(true);
    });
  });
});
