/**
 * The editor right-click menu offers the same inserts as the Insert top-menu (footnote,
 * cross-reference, end note, comment — in that order), and inserting an end note creates a real
 * `\fe` note (caller `+`, PT9 shape) that survives the PDP save/USFM echo round-trip.
 *
 * The context menu is the Lexical ContextMenuPlugin portal INSIDE the editor iframe (the
 * `.typeahead-popover.auto-embed-menu` portal, with `li[role="option"]` items), not the app's Radix
 * PAPI menu. The plugin nests a second `.typeahead-popover` inside that portal, so the outer
 * `auto-embed-menu` class is what makes the locator unambiguous.
 *
 * The menu's CONTENTS are asserted here, and so is selecting an item BY KEYBOARD — arrow keys to
 * the item, then Enter. That path needs the real app: the menu claims Enter from a capture-phase
 * listener on the editor iframe's `document`, while this web view claims it from one on `window`,
 * and only the real two-listener stack shows which of them the press reaches.
 *
 * Selecting the item by MOUSE is deliberately not asserted: the editor re-renders while the menu is
 * open, re-creating that portal, so the item detaches mid-click and any such assertion is flaky by
 * construction — a pre-existing trait of this menu that affects the shipped footnote and
 * cross-reference items identically. The keyboard path is unaffected by that churn (the highlight
 * is plugin state, and an auto-retrying locator re-queries the re-created item), so it is asserted
 * here. The insert is additionally driven through the registered `insertEndnoteAtSelection`
 * command, the same web-view callback the menu item invokes.
 *
 * Two constraints shape the step order below.
 *
 * 1. Every insert has to put the caret in a VERSE paragraph, because that is what an end note is for:
 *    `\fe` anchors at the caret's reference, and the paragraphs above `\c 1` — the `\id` line,
 *    `\h`, `\toc*`, `\mt*` — are not verses. The chapter's FIRST paragraph is the `\id` line, so
 *    reaching a verse takes a locator that says so.
 * 2. Inserting a note auto-opens the footnote editor over that paragraph, and that popover is a
 *    CONTROLLED Radix `Popover` with no `onOpenChange` (see `showFootnoteEditor` in the web view),
 *    so neither Escape nor a click outside dismisses it. Its own buttons close it, and so does a
 *    chapter change — which is why the chapter round trip runs BETWEEN the two inserts rather than
 *    after both: it is what clears the popover off the second insert's paragraph.
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
    /** The endnotes that landed where an end note belongs — inside a body paragraph. */
    const endnotesInVerseParas = mainEditor.locator('p.usfm_p span.note.usfm_fe');

    /**
     * A body paragraph that holds a verse and no note yet. Inserting into one takes it out of this
     * set, so each call lands in a paragraph that is still clear — which is what keeps a click at
     * the paragraph's centre off a note caller, where it would open that note's editor instead of
     * moving the caret.
     */
    const nextClearVersePara = () =>
      mainEditor.locator('p.usfm_p:has(span.verse):not(:has(span.note))').first();

    // ContextMenuPlugin suppresses the menu when the right-click target IS the content-editable
    // root, so aim at a paragraph inside it. The right-click also moves the caret there, which is
    // what puts the keyboard-driven insert below inside a verse.
    const openContextMenu = async (target = nextClearVersePara()) => {
      await target.click({ button: 'right' });
      await expect(contextMenu).toBeAttached({ timeout: 15_000 });
    };
    // Every option's text, in menu order — the built-in Cut/Copy/Paste entries first, then the
    // host's insert items. Captured once and used by both steps below.
    let optionTexts: string[] = [];
    // Endnote count the chapter must hold once the insert has landed, set by the insert step and
    // re-checked after the save/echo round-trip.
    let endnotesExpected = 0;

    await test.step('context menu lists the four Insert-menu inserts in Insert-menu order', async () => {
      const versePara = nextClearVersePara();
      await expect(versePara).toBeVisible({ timeout: 30_000 });
      await versePara.click();
      await openContextMenu(versePara);
      optionTexts = await contextMenu.locator('[role="option"]').allTextContents();
      const insertOptions = optionTexts.filter((text) => text.startsWith('Insert'));
      expect(insertOptions).toEqual([
        'Insert footnote',
        'Insert cross-reference',
        'Insert end note',
        'Insert comment',
      ]);
    });

    await test.step('the menu shows all of itself, and says so when it cannot', async () => {
      // Re-opened rather than reused from the step above: the plugin closes the menu on a scroll of
      // anything but itself, and the chapter is still settling, so an already-open menu is not
      // something a later step can rely on.
      await openContextMenu();
      // The popover markup is shared with the marker typeahead, whose `ul` is capped at 200px and
      // scrolls. This menu is a short fixed list that must show all of itself: it has no filter to
      // narrow the list with.
      const listOverflow = await contextMenu.locator('ul').evaluate((ul) => ({
        scrollHeight: ul.scrollHeight,
        clientHeight: ul.clientHeight,
      }));
      expect(listOverflow.scrollHeight).toBeLessThanOrEqual(listOverflow.clientHeight + 1);

      // …and when the panel IS too short for the whole list, the fold has to be visible. The rule
      // this menu inherits hides the scrollbar, which suits the filterable marker typeahead and
      // leaves this one with nothing on screen saying there is more. Measured by forcing the
      // overflow with an inline cap — what is under test is how a clipped list looks, not how it
      // came to be clipped — and reading the gutter the scrollbar takes.
      const scrollbarGutterPx = await contextMenu.locator('ul').evaluate((ul: HTMLElement) => {
        const previousMaxHeight = ul.style.maxHeight;
        ul.style.maxHeight = '40px';
        const gutter = ul.offsetWidth - ul.clientWidth;
        ul.style.maxHeight = previousMaxHeight;
        return gutter;
      });
      expect(scrollbarGutterPx).toBeGreaterThan(0);
    });

    await test.step('arrow keys then Enter invoke the highlighted item, not the Enter palette', async () => {
      const endNoteIndex = optionTexts.indexOf('Insert end note');
      expect(endNoteIndex).toBeGreaterThanOrEqual(0);
      const endnotesBefore = await endnotes.count();

      // A freshly opened menu has nothing highlighted, so the first ArrowDown highlights option 0
      // and reaching option N takes N + 1 presses.
      await openContextMenu();
      for (let i = 0; i <= endNoteIndex; i += 1) {
        await mainPage.keyboard.press('ArrowDown');
      }
      await expect(contextMenu.locator('li.selected')).toHaveText('Insert end note');

      await mainPage.keyboard.press('Enter');

      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      // The Enter-triggered paragraph marker palette must NOT have opened: while the menu holds a
      // highlighted item, the web view stands down and the menu owns Enter.
      await expect(mainPage.locator('[data-overlay-command-palette]')).toHaveCount(0);
      // The note has to have landed where an end note belongs. One anchored outside a verse still
      // saves, so a count on its own never notices a caret that never reached the text.
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
      endnotesExpected = endnotesBefore + 1;
    });

    await test.step('the endnote survives a save and chapter-navigation round-trip', async () => {
      // Navigating away flushes the pending save and forces a fresh PDP read of the chapter on the
      // way back, which is what makes this step falsifiable: waiting in place and re-counting
      // asserts something already true before the echo lands, so an echo that never happened would
      // pass it.
      //
      // Positive control first — Jonah 2:1's own text, which appears nowhere in chapter 1 — so the
      // count below runs against a RENDERED chapter rather than the empty mid-navigation editor
      // (same rationale as type-through-save-echo.spec.ts).
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(mainEditor).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(0);

      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      await expect(mainEditor).toContainText('word came to Jonah', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(endnotesExpected, { timeout: 30_000 });
      await expect(endnotesInVerseParas).toHaveCount(endnotesExpected);
      // The chapter change is also what closed the footnote editor the insert opened, which leaves
      // the chapter clickable again for the step below.
      await expect(editorInput).toHaveCount(1);
    });

    await test.step('inserting an end note creates a \\fe note with the + caller', async () => {
      expect(optionTexts).toContain('Insert end note');
      await nextClearVersePara().click();

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
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
    });
  });
});
