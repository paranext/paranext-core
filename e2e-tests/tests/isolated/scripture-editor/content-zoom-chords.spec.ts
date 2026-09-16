/**
 * Keyboard-chord cases for content zoom (Ctrl+`=`/`+`, Ctrl+`-`, Ctrl+`0`) over a Scripture editor
 * pane: one on the main text area, one on a footnote area to prove area targeting. These chords are
 * handled by the in-iframe `keydown` listener in `web-view-content-zoom.bootstrap-script.ts`;
 * `main.ts`'s `before-input-event` handler does not claim them. CDP's `Input.dispatchKeyEvent`
 * (`mainPage.keyboard.press`) is OS-level input that lands on whatever holds focus, including
 * inside an iframe, so it reaches that listener — see `marker-palette-trigger-focus.spec.ts` for
 * the same in-iframe CDP precedent. The handler picks the area from the FOCUSED element
 * (`targetFor`), so the footnotes case puts keyboard focus in the footnotes pane rather than
 * clicking it.
 */
import { type Frame } from '@playwright/test';
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

/**
 * A cold first launch installs the sample project into an empty isolated root and starts the .NET
 * data provider before the editor renders any text, so the container stays hidden well past the 60s
 * the warm case needs. Fits inside the `test.slow()` budget each case takes below.
 */
const EDITOR_CONTAINER_TIMEOUT_MS = 120_000;

/**
 * The zoom area the pane's focused element sits in — the same `closest()` lookup the in-iframe
 * chord handler runs on `document.activeElement` (`targetFor` in
 * `src/renderer/services/web-view-content-zoom.bootstrap-script.ts`). `undefined` when focus is
 * outside every marked area; `'main'` for the marker a view writes with an empty value.
 */
async function readFocusedAreaId(frame: Frame): Promise<string | undefined> {
  return frame.evaluate(() => {
    const root = document.activeElement?.closest('[data-platform-content-zoom-root]');
    if (!root) return undefined;
    return root.getAttribute('data-platform-content-zoom-root') || 'main';
  });
}

test.describe('scripture editor content zoom — keyboard chords', () => {
  test('Ctrl+= zooms the text area in two steps, Ctrl+- zooms out, Ctrl+0 resets', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame
      .locator('.editor-container')
      .waitFor({ timeout: EDITOR_CONTAINER_TIMEOUT_MS });
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

  test('the same chords affect only the footnotes area when focus is in the footnotes pane', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame
      .locator('.editor-container')
      .waitFor({ timeout: EDITOR_CONTAINER_TIMEOUT_MS });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    // The chapter's text is on screen before focus is placed, so a late load cannot pull focus back
    // into the editor between the focus step below and the chord.
    await expect(
      editorFrame.locator('.editor-container span[data-marker="v"][data-number="1"]').first(),
    ).toBeVisible({ timeout: 60_000 });

    await ensureFootnotesVisible(mainPage, editorFrame, editorId);
    // Jonah 1 carries footnote callers at verses 1, 6 (twice) and 9
    // (`c-sharp/assets/WEB/32JONengWEBUS.SFM`), so the pane has real rows to put focus on.
    const footnotesList = editorFrame.locator(
      '[data-platform-content-zoom-root="footnotes"] [role="listbox"]',
    );
    await expect(footnotesList).toBeVisible({ timeout: 20_000 });
    // Keyboard, not a click: clicking a row selects that note, and selecting a note sends the caret
    // back into the editor text (`handleFootnoteSelected` -> `selectNote` in
    // `platform-scripture-editor.web-view.tsx`), so the chord would resolve the main area from
    // `document.activeElement`. Arrowing onto a row moves focus into the pane without selecting,
    // which is what "in a footnote" means for this read-only list.
    await footnotesList.focus();
    await mainPage.keyboard.press('ArrowDown');
    await expect.poll(() => readFocusedAreaId(editorFrame)).toBe('footnotes');

    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1.1);
    expect(await readFactor(editorFrame, '')).toBe(1);

    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1);
  });
});
