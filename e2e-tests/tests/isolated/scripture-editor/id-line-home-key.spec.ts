/**
 * Home on the `\id` line puts the caret after the read-only `\id JON ` glyph, never in front of it.
 *
 * The glyph is a `contenteditable="false"` island at the start of the line, so the browser's own
 * Home (and Ctrl+Home) lands the caret on the boundary BEFORE it, and the editor has to move it
 * past. Text typed in front of the glyph would render there while the save — which never writes the
 * glyph as its own node — puts it after the book code, so the line would change shape on the next
 * load. This drives the real keys in the real browser, the only place that boundary placement
 * happens.
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated scripture-editor`.
 */
import type { Locator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
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

// Distinctive all-caps tokens that never appear in the WEB text.
const HOME_TOKEN = 'HOMEKEYTOKEN';
const CTRL_HOME_TOKEN = 'CTRLHOMETOKEN';

/** The line's text with the glyph's trailing NBSP read as a plain space. */
async function lineText(line: Locator): Promise<string> {
  return (await line.textContent())?.replace(/\u00a0/g, ' ') ?? '';
}

test.describe('scripture editor \\id line', () => {
  test('Home and Ctrl+Home put the caret after the \\id glyph', async ({ mainPage }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    const idLine = editorInput.locator('.usfm_id').first();

    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    await expect(idLine).toBeAttached({ timeout: 60_000 });
    const original = await lineText(idLine);
    expect(original.startsWith('\\id JON ')).toBe(true);
    const originalContent = original.slice('\\id JON '.length);

    await test.step('Home then typing lands after the glyph', async () => {
      await idLine.click();
      await editorInput.press('End');
      await editorInput.press('Home');
      await editorInput.pressSequentially(HOME_TOKEN, { delay: 30 });
      await expect
        .poll(() => lineText(idLine), { timeout: 20_000 })
        .toBe(`\\id JON ${HOME_TOKEN}${originalContent}`);
    });

    await test.step('Ctrl+Home then typing lands after the glyph', async () => {
      await editorInput.press('Control+Home');
      await editorInput.pressSequentially(CTRL_HOME_TOKEN, { delay: 30 });
      await expect
        .poll(() => lineText(idLine), { timeout: 20_000 })
        .toBe(`\\id JON ${CTRL_HOME_TOKEN}${HOME_TOKEN}${originalContent}`);
    });

    await test.step('the saved line reads back the same', async () => {
      // Jonah 2 has no `\id` line; its verse text is the positive control that the chapter really
      // changed before returning re-reads chapter 1 from the saved file.
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(editorInput).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect
        .poll(() => lineText(idLine), { timeout: 20_000 })
        .toBe(`\\id JON ${CTRL_HOME_TOKEN}${HOME_TOKEN}${originalContent}`);
    });
  });
});
