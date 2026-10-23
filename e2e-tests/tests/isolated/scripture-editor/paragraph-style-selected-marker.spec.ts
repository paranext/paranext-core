/**
 * Picking a paragraph style while a paragraph's gutter marker is selected must retag THAT
 * paragraph, and keep its marker selected — not the paragraph the caret was in before the marker
 * was selected.
 *
 * A selected marker has no text range, so `EditorRef.getSelection()` reports nothing. The
 * dropdown's popover takes focus from the editor, and the host puts back the caret it captured at
 * focus-out when the selection looks lost; treating a selected marker as lost restored the older
 * caret over it and retagged the wrong paragraph. Unit tests pin the host's rules; this spec pins
 * what they cannot — that the marker selection survives the popover taking focus in a real window.
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
  unlockSampleProjectStructure,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'simple' selects the gutter (paragraph-structure) view, the only view whose
// paragraph markers can be selected. See gutter-marker-no-overlap.spec.ts for the other options.
test.use({
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** Psalm 1:1 opens with a `\q1` line followed by two `\q2` lines. */
const CARET_LINE_TEXT = 'Blessed is the man';
const SELECTED_LINE_TEXT = 'nor stand on the path of sinners';
/** A marker neither line has, so whichever line changes is unambiguous. */
const NEW_MARKER = 'p';

test.describe('paragraph style picked with a gutter marker selected', () => {
  test('retags the selected paragraph, not the one the caret was in before', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await makeSampleProjectEditable();
    // Simple mode locks paragraph structure by default, which disables the paragraph-style dropdown.
    await unlockSampleProjectStructure();
    // The Simple layout opens a read-only editor itself, and the open command replaces it with an
    // editable one. Replacing it before the layout has placed it fails, so wait for it first.
    await findScriptureEditorFrame(mainPage, 120_000);
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-input').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Psalms 1:1');

    const caretLine = editorFrame.locator('.para.usfm_q1', { hasText: CARET_LINE_TEXT });
    const selectedLine = editorFrame.locator('.para', { hasText: SELECTED_LINE_TEXT });
    await expect(selectedLine).toHaveClass(/\busfm_q2\b/, { timeout: 60_000 });

    // The bug's precondition is a caret in another paragraph saved for the host to restore. The host
    // saves the caret only as focus leaves the editor, so put it in the first line and open and
    // close the dropdown there, as a user glancing at the styles would.
    const trigger = editorFrame.locator('[aria-label="Paragraph style"]');
    await caretLine.getByText(CARET_LINE_TEXT).first().click();
    await expect(trigger).toContainText('q1');
    await expect(trigger).toBeEnabled();
    await trigger.click();
    await mainPage.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    const selectedGlyph = selectedLine.locator(':scope > .marker');
    await selectedGlyph.click();
    await expect(selectedGlyph).toHaveAttribute('aria-selected', 'true');
    // Positive control: the toolbar names the selected line's marker, so the pick below starts
    // from the marker selection rather than from the caret.
    await expect(trigger).toContainText('q2');

    await trigger.click();
    await editorFrame
      .getByRole('option')
      .filter({ has: editorFrame.getByText(NEW_MARKER, { exact: true }) })
      .first()
      .click();

    await expect(selectedLine).toHaveClass(new RegExp(`\\busfm_${NEW_MARKER}\\b`));
    await expect(caretLine).toHaveCount(1);
    await expect(selectedLine.locator(':scope > .marker')).toHaveAttribute('aria-selected', 'true');
  });
});
