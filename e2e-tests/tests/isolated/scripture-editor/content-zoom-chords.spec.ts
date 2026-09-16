/**
 * Keyboard-chord cases for content zoom (Ctrl+`=`/`+`, Ctrl+`-`, Ctrl+`0`) over a Scripture editor
 * pane: one on the main text area, one on a footnote area to prove area targeting. `main.ts` no
 * longer claims these chords app-wide — its `before-input-event` handler has no zoom branches, and
 * app-wide zoom now runs through `adjustZoomFactor` behind `platform.zoomIn`/`platform.zoomOut` —
 * so the chord reaches the web view. CDP's `Input.dispatchKeyEvent` (`mainPage.keyboard.press`) is
 * OS-level input that lands on whatever holds focus, including inside an iframe, so it drives the
 * in-iframe `keydown` listener in `web-view-content-zoom.bootstrap-script.ts` that is now the
 * handler for these chords — see `marker-palette-trigger-focus.spec.ts` for the same in-iframe CDP
 * precedent.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  ensureFootnotesVisible,
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor content zoom — keyboard chords', () => {
  test('Ctrl+= zooms the text area in two steps, Ctrl+- zooms out, Ctrl+0 resets', async ({
    mainPage,
  }) => {
    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    const verseLocator = editorFrame
      .locator('.editor-container span[data-marker="v"][data-number="1"]')
      .first();
    await expect(verseLocator).toBeVisible({ timeout: 60_000 });
    await verseLocator.click();

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);

    await mainPage.keyboard.press('Control+-');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
  });

  test('the same chords affect only the footnotes area when the caret is in a footnote', async ({
    mainPage,
  }) => {
    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');

    await ensureFootnotesVisible(mainPage, editorFrame, editorId);
    const footnotesRoot = editorFrame.locator('[data-platform-content-zoom-root="footnotes"]');
    await footnotesRoot.click({ force: true });

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1.1);
    expect(await readFactor(editorFrame, '')).toBe(1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1);
  });
});
