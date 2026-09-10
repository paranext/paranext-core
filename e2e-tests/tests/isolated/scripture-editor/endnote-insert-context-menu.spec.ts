/**
 * PT-4195: the editor right-click menu offers the same inserts as the Insert top-menu (footnote,
 * cross-reference, end note, comment — in that order), and inserting an end note creates a real
 * `\fe` note (caller `+`, PT9 shape) that survives the PDP save/USFM echo round-trip.
 *
 * The context menu is the Lexical ContextMenuPlugin portal INSIDE the editor iframe (the
 * `.typeahead-popover.auto-embed-menu` portal, with `li[role="option"]` items), not the app's Radix
 * PAPI menu. The plugin nests a second `.typeahead-popover` inside that portal, so the outer
 * `auto-embed-menu` class is what makes the locator unambiguous.
 *
 * The menu's CONTENTS are asserted here; the insert itself is driven through the registered
 * `insertEndnoteAtSelection` command, which is the same web-view callback the menu item invokes.
 * Selecting the item by mouse is deliberately not asserted: the editor re-renders while the menu is
 * open, re-creating that portal, so the item detaches mid-click and any such assertion is flaky by
 * construction — a pre-existing trait of this menu that affects the shipped footnote and
 * cross-reference items identically. That the item dispatches to this callback is pinned by
 * `createInsertContextMenuItems`' unit test, and clicking it is on the hand-QA list.
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
  sendPapiCommandWhenRegistered,
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
    const contextMenu = editorFrame.locator('.typeahead-popover.auto-embed-menu');

    // Scoped to the FIRST editor input, not the whole iframe and not every `.editor-input`: the
    // footnote editor auto-opens on insert, carries an `.editor-input.marker-editable` of its own
    // (see marker-palette-trigger-focus.spec.ts), and renders the note being edited — so a wider
    // locator counts one inserted note twice.
    const mainEditor = editorInput.first();
    const endnotes = mainEditor.locator('span.note.usfm_fe');

    // ContextMenuPlugin suppresses the menu when the right-click target IS the content-editable
    // root, so aim at a paragraph inside it.
    const openContextMenu = async () => {
      await editorInput.locator('p').first().click({ button: 'right' });
      await expect(contextMenu).toBeAttached({ timeout: 15_000 });
    };
    // Every option's text, in menu order — the built-in Cut/Copy/Paste entries first, then the
    // host's insert items. Captured once and used by both steps below.
    let optionTexts: string[] = [];
    // Endnote count the chapter must hold once the insert has landed, set by the insert step and
    // re-checked after the save/echo round-trip.
    let endnotesExpected = 0;

    await test.step('context menu lists the four Insert-menu inserts in Insert-menu order', async () => {
      await editorInput.locator('p').first().click();
      await openContextMenu();
      optionTexts = await contextMenu.locator('[role="option"]').allTextContents();
      const insertOptions = optionTexts.filter((text) => text.startsWith('Insert'));
      expect(insertOptions).toEqual([
        'Insert footnote',
        'Insert cross-reference',
        'Insert end note',
        'Insert comment',
      ]);
    });

    await test.step('inserting an end note creates a \\fe note with the + caller', async () => {
      expect(optionTexts).toContain('Insert end note');
      // Put the caret back in the text: the right-click above opened the menu, and the insert needs
      // a selection in the editor to act on.
      await mainPage.keyboard.press('Escape');
      await editorInput.locator('p').first().click();

      // Counted here, immediately before the insert, NOT at spec start: the chapter's content is
      // still settling when the editor first attaches, and a retry re-opens a project an earlier
      // attempt may already have written an endnote into. Both make an early baseline read low.
      const endnotesBefore = await endnotes.count();

      await sendPapiCommandWhenRegistered(
        'platformScriptureEditor.insertEndnoteAtSelection',
        editorId,
      );

      // Count-based: the chapter may already contain endnotes, so assert this insert added one
      // rather than that any `\fe` exists.
      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await expect(mainEditor.locator('span.note.usfm_fe[data-caller="+"]')).toHaveCount(
        endnotesBefore + 1,
      );
      // The footnote editor auto-opens for a newly inserted note; close it so the echo settles
      // with the editor focused.
      await mainPage.keyboard.press('Escape');
      endnotesExpected = endnotesBefore + 1;
    });

    await test.step('the endnote survives the debounced save/USFM echo round-trip', async () => {
      // The PDP echoes saved USFM back through the editor (~700ms debounce + round-trip). If the
      // note did not round-trip through USFM, the echo would drop this node.
      await mainPage.waitForTimeout(5_000);
      await expect(endnotes).toHaveCount(endnotesExpected);
    });
  });
});
