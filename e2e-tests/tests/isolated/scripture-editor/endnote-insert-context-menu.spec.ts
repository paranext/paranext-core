/**
 * PT-4195: the editor right-click menu offers the same inserts as the Insert top-menu (footnote,
 * cross-reference, end note, comment — in that order), and "Insert end note" creates a real `\fe`
 * note (caller `+`, PT9 shape) that survives the PDP save/USFM echo round-trip.
 *
 * The context menu is the Lexical ContextMenuPlugin portal INSIDE the editor iframe
 * (`.typeahead-popover` with `li[role="option"]`), not the app's Radix PAPI menu.
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated scripture-editor`.
 */
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

test.describe('scripture editor endnote insert + context-menu parity', () => {
  test('right-click menu mirrors the Insert menu and inserts a \\fe endnote', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:2');

    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    const contextMenu = editorFrame.locator('.typeahead-popover');

    await test.step('context menu lists the four Insert-menu inserts in Insert-menu order', async () => {
      // ContextMenuPlugin suppresses the menu when the right-click target IS the content-editable
      // root, so aim at a paragraph inside it.
      await editorInput.locator('p').first().click();
      await editorInput.locator('p').first().click({ button: 'right' });
      await expect(contextMenu).toBeAttached({ timeout: 15_000 });
      const optionTexts = await contextMenu.locator('[role="option"]').allTextContents();
      const insertOptions = optionTexts.filter((text) => text.startsWith('Insert'));
      expect(insertOptions).toEqual([
        'Insert footnote',
        'Insert cross-reference',
        'Insert end note',
        'Insert comment',
      ]);
    });

    await test.step('Insert end note creates a \\fe note with the + caller', async () => {
      await contextMenu.locator('[role="option"]', { hasText: 'Insert end note' }).click();
      const endnote = editorFrame.locator('span.note.usfm_fe');
      await expect(endnote).toBeAttached({ timeout: 15_000 });
      await expect(endnote).toHaveAttribute('data-caller', '+');
      // The footnote editor auto-opens for a newly inserted note; close it so the echo settles
      // with the editor focused.
      await mainPage.keyboard.press('Escape');
    });

    await test.step('the endnote survives the debounced save/USFM echo round-trip', async () => {
      // The PDP echoes saved USFM back through the editor (~700ms debounce + round-trip). If the
      // note did not round-trip through USFM, the echo would drop this node.
      await mainPage.waitForTimeout(5_000);
      await expect(editorFrame.locator('span.note.usfm_fe')).toBeAttached();
    });
  });
});
