/**
 * Markers typed straight through the `\` palette, without waiting for it to appear, still become
 * those markers. At Playwright's typing speed every key arrives before the palette has mounted, so
 * this pins the palette session's handling of keys typed ahead of its own list — and the next
 * marker typed right after one the session has already applied. It first types the two markers of
 * marker-palette-typed-commit.spec.ts through a visible palette, because the failures below only
 * show up after palettes that were just open and closed.
 *
 * Marked `fixme` until PT-5050 is fixed: at this speed a second `\` can be dropped by the overlay
 * service's debounce, and a palette that mounts after its session ended takes focus from the keys
 * that follow. Each makes the test fail about one run in four.
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

test.describe('scripture editor marker palette typed through', () => {
  test.fixme(
    'markers typed straight through, without waiting for the palette, become those markers',
    {
      annotation: {
        type: 'fixme',
        description:
          'PT-5050: keys typed while the marker palette is still opening can be lost (fails ~1 run in 4)',
      },
    },
    async ({ mainPage }) => {
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

      const editorEvalFrame = await findScriptureEditorFrame(mainPage);
      /** Whether a `\nd` span holds the given text, so that text is styled as `\nd`. */
      const isInNdSpan = async (text: string) =>
        editorEvalFrame.evaluate(
          (typed) =>
            Array.from(
              document.querySelectorAll(
                '.editor-input.marker-editable span.char[data-marker="nd"]',
              ),
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

      // The marker palette renders in the renderer (parent doc), not the editor iframe.
      const palette = mainPage.locator('[data-overlay-command-palette]').first();
      /** Types `\`, the marker and Space through the palette, then `after` at the caret it leaves. */
      const typeMarker = async (marker: string, after: string) => {
        await mainPage.keyboard.press('\\');
        await expect(palette).toBeAttached({ timeout: 15_000 });
        await mainPage.keyboard.type(marker);
        await mainPage.keyboard.press('Space');
        await expect(palette).not.toBeAttached({ timeout: 10_000 });
        await mainPage.keyboard.type(after);
      };

      // First the two markers through a visible palette (see the file comment): typed straight
      // through from a fresh caret, the markers below went in correctly in 10 runs of 10.
      await editorInput
        .getByText('word came to Jonah the son of Amittai', { exact: false })
        .click();
      await typeMarker('nd', 'Qx');
      await expect.poll(() => isInNdSpan('Qx'), { timeout: 20_000 }).toBe(true);
      await mainPage.keyboard.press('End');
      await typeMarker('v', '91 Z');
      await expect.poll(() => hasVerse('91'), { timeout: 20_000 }).toBe(true);

      await mainPage.keyboard.press('End');
      await mainPage.keyboard.type('\\nd Rx');
      await expect.poll(() => isInNdSpan('Rx'), { timeout: 20_000 }).toBe(true);
      expect(await hasVerse('92')).toBe(false);
      await mainPage.keyboard.press('End');
      await mainPage.keyboard.type('\\v 92 Y');
      await expect.poll(() => hasVerse('92'), { timeout: 20_000 }).toBe(true);
    },
  );
});
