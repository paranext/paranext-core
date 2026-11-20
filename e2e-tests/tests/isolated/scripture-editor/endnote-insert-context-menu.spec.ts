/**
 * The editor's right-click menu offers the same inserts as the Insert top menu (comment, footnote,
 * cross-reference, endnote — in that menu's order), and inserting an endnote creates a real `\fe`
 * note (caller `+`, the Paratext 9 shape) that survives the save and a chapter round trip.
 *
 * The right-click menu is the platform's own (see `platformContextMenu`): it renders in the app
 * window's top document and takes the keyboard as soon as it opens. So the keyboard checks here are
 * about where keys go while it is open — arrow keys and Enter run the highlighted item, while a
 * letter, or Enter with nothing highlighted, never reaches the Scripture text behind it. The Insert
 * top menu is driven through the visible UI too, which exercises its `menus.json` wiring a unit
 * test cannot reach.
 *
 * Every insert has to put the caret in a VERSE paragraph, because that is what an endnote is for:
 * `\fe` anchors at the caret's reference, and the paragraphs above `\c 1` — the `\id` line, `\h`,
 * `\toc*`, `\mt*` — are not verses. A right-click moves the caret to where it lands, so each insert
 * right-clicks inside a verse paragraph that holds no note yet.
 *
 * The book is written back with its starting bytes at the end, and the saved book compared with
 * them.
 *
 * One test() with test.step()s: the isolated fixture starts a new app for every test(), so the
 * steps share one launch. Run: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/endnote-insert-context-menu.spec.ts`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  contextMenuItem,
  EDITOR_HAMBURGER_SELECTOR,
  getEditorFrame,
  getSampleProjectBookUsfm,
  getSampleProjectChapterUsfm,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  platformContextMenu,
  readContextMenuLabels,
  readHighlightedContextMenuLabel,
  SAMPLE_WEB_PROJECT_ID,
  setSampleProjectBookUsfm,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true },
});

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };
/** The most ArrowDown presses the menu can need to reach its last item, with room to spare. */
const MAX_ARROW_PRESSES = 12;

test.describe('scripture editor endnote insert + context-menu parity', () => {
  test('right-click menu mirrors the Insert menu and inserts a \\fe endnote', async ({
    mainPage,
  }) => {
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').first().waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:2');

    // Scoped to the FIRST editor input, not every `.editor-input`: inserting a note opens it in
    // the footnotes pane's row editor, which carries an `.editor-input.marker-editable` of its own
    // and renders the note being edited — so a wider locator counts one inserted note twice.
    const mainEditor = editorFrame.locator('.editor-input.marker-editable').first();
    await expect(mainEditor).toContainText('word came to Jonah', { timeout: 60_000 });
    const originalBookUsfm = await getSampleProjectBookUsfm(JONAH_1);
    if (!originalBookUsfm) throw new Error('The sample project has no Jonah');
    const endnotes = mainEditor.locator('span.note.usfm_fe');
    /** The endnotes that landed where an endnote belongs — inside a body paragraph. */
    const endnotesInVerseParas = mainEditor.locator('p.usfm_p span.note.usfm_fe');
    const menu = platformContextMenu(mainPage);
    /** Every `\fe` in the saved chapter, whatever its caller: the same set `endnotes` counts. */
    const savedEndnoteCount = async () =>
      ((await getSampleProjectChapterUsfm(JONAH_1)) ?? '').match(/\\fe\s/g)?.length ?? 0;

    /**
     * A body paragraph that holds a verse and no note yet. Inserting into one takes it out of this
     * set, so each call lands in a paragraph that is still clear — which keeps a right-click at its
     * centre off a note caller.
     */
    const nextClearVersePara = () =>
      mainEditor.locator('p.usfm_p:has(span.verse):not(:has(span.note))').first();

    /** Right-clicks `target` and waits until the menu is open and holds the keyboard. */
    const openContextMenu = async (target = nextClearVersePara()) => {
      await expect(menu).toHaveCount(0);
      await expect(target).toBeVisible({ timeout: 30_000 });
      await target.click({ button: 'right' });
      await expect(menu).toBeVisible({ timeout: 15_000 });
      await expect
        .poll(() => menu.evaluate((element) => element.contains(document.activeElement)))
        .toBe(true);
    };

    /**
     * Watches the app window's `document` for the command palette ever appearing, from install
     * through whatever barrier the caller checks it after. A one-shot read taken right after a
     * keypress cannot see a palette still crossing the `papi.overlays.showCommandPalette` round
     * trip.
     *
     * @returns A check that disconnects the observer and asserts the palette was never seen.
     */
    const watchForStrayCommandPalette = async (): Promise<() => Promise<void>> => {
      await mainPage.evaluate(() => {
        // Stashed on `window` so the check below finds the same observer and flag; neither is part
        // of the standard DOM typings.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const w = window as unknown as {
          strayPaletteObserver?: MutationObserver;
          strayPaletteSeen?: boolean;
        };
        const markIfPresent = () => {
          if (document.querySelector('[data-overlay-command-palette]')) w.strayPaletteSeen = true;
        };
        w.strayPaletteSeen = false;
        markIfPresent();
        const observer = new MutationObserver(markIfPresent);
        observer.observe(document, { childList: true, subtree: true });
        w.strayPaletteObserver = observer;
      });

      return async () => {
        const seen = await mainPage.evaluate(() => {
          // See the install call above for why this cast is needed.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const w = window as unknown as {
            strayPaletteObserver?: MutationObserver;
            strayPaletteSeen?: boolean;
          };
          w.strayPaletteObserver?.disconnect();
          w.strayPaletteObserver = undefined;
          const result = w.strayPaletteSeen;
          w.strayPaletteSeen = undefined;
          return result;
        });
        expect(seen).toBe(false);
      };
    };

    await test.step('the right-click menu lists the Insert top menu’s inserts in that menu’s order', async () => {
      // The top menu renders inside the editor's frame. Its items' text carries their keycaps
      // after the label, so a label is read as the item's own text nodes.
      await editorFrame.locator(EDITOR_HAMBURGER_SELECTOR).first().click();
      const topMenuItems = editorFrame.getByRole('menuitem');
      await expect(topMenuItems.first()).toBeVisible({ timeout: 15_000 });
      const topMenuInsertLabels = (
        await topMenuItems.evaluateAll((items) =>
          items.map((item) =>
            Array.from(item.childNodes)
              .filter((node) => node.nodeType === Node.TEXT_NODE)
              .map((node) => node.textContent ?? '')
              .join('')
              .trim(),
          ),
        )
      ).filter((label) => label.startsWith('Insert '));
      await mainPage.keyboard.press('Escape');
      await expect(topMenuItems).toHaveCount(0, { timeout: 15_000 });
      expect(topMenuInsertLabels).toEqual([
        'Insert comment',
        'Insert footnote',
        'Insert cross-reference',
        'Insert endnote',
      ]);

      await openContextMenu();
      const contextInsertLabels = (await readContextMenuLabels(menu)).filter((label) =>
        label.startsWith('Insert '),
      );
      expect(contextInsertLabels).toEqual(topMenuInsertLabels);
      await mainPage.keyboard.press('Escape');
      await expect(menu).toHaveCount(0, { timeout: 15_000 });
    });

    await test.step('with the menu open, a letter or Enter with nothing highlighted changes no text', async () => {
      const paraCountBefore = await mainEditor.locator('p').count();
      const textBefore = await mainEditor.evaluate((element) => element.textContent);
      const endnotesBefore = await endnotes.count();

      await openContextMenu();
      // Opened by the mouse, the menu highlights nothing until a key or the pointer moves in it.
      expect(await readHighlightedContextMenuLabel(menu)).toBeUndefined();

      // `q` starts no item's label, so the menu's type-to-select has nothing to highlight, and
      // Enter then has nothing to run. Neither may reach the text behind the menu, which holds the
      // keyboard in the app window: Enter would split the paragraph, a letter would be typed into
      // it, and Enter in Standard view would open the command palette.
      const checkNoStrayPalette = await watchForStrayCommandPalette();
      await mainPage.keyboard.press('q');
      await mainPage.keyboard.press('Enter');
      await expect(menu).toBeVisible();
      expect(await readHighlightedContextMenuLabel(menu)).toBeUndefined();

      // Escape detaching the menu is the barrier for the reads below: a palette that had opened
      // over the menu would have claimed this Escape and left the menu open.
      await mainPage.keyboard.press('Escape');
      await expect(menu).toHaveCount(0, { timeout: 15_000 });
      await checkNoStrayPalette();
      expect(await mainEditor.locator('p').count()).toBe(paraCountBefore);
      expect(await mainEditor.evaluate((element) => element.textContent)).toBe(textBefore);
      expect(await endnotes.count()).toBe(endnotesBefore);
    });

    let endnotesExpected = 0;

    await test.step('arrow keys then Enter run the highlighted item: Insert endnote inserts a \\fe', async () => {
      const endnotesBefore = await endnotes.count();
      await openContextMenu();

      // The first ArrowDown highlights the first enabled item; walk down to Insert endnote.
      /* eslint-disable no-await-in-loop -- each press must land before the highlight is read */
      for (let presses = 0; presses < MAX_ARROW_PRESSES; presses += 1) {
        await mainPage.keyboard.press('ArrowDown');
        await expect.poll(() => readHighlightedContextMenuLabel(menu)).toBeDefined();
        if ((await readHighlightedContextMenuLabel(menu)) === 'Insert endnote') break;
      }
      /* eslint-enable no-await-in-loop */
      expect(await readHighlightedContextMenuLabel(menu)).toBe('Insert endnote');

      const checkNoStrayPalette = await watchForStrayCommandPalette();
      await mainPage.keyboard.press('Enter');
      // The note-count wait is the barrier for the palette check: the insert awaits a PAPI round
      // trip, so a palette opened by the same Enter would already have shown up.
      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await checkNoStrayPalette();
      // One anchored outside a verse still saves, so a count on its own never notices a caret that
      // never reached the text.
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
      endnotesExpected = endnotesBefore + 1;
    });

    await test.step('clicking "Insert endnote" in the right-click menu inserts a \\fe', async () => {
      const endnotesBefore = await endnotes.count();
      await openContextMenu();
      await (await contextMenuItem(menu, 'Insert endnote')).click();
      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
      await expect(mainEditor.locator('span.note.usfm_fe[data-caller="+"]')).toHaveCount(
        endnotesBefore + 1,
      );
      endnotesExpected = endnotesBefore + 1;
    });

    await test.step('the endnotes survive a save and chapter-navigation round trip', async () => {
      await expect.poll(savedEndnoteCount, { timeout: 20_000 }).toBe(endnotesExpected);
      // Navigating away forces a fresh read of the chapter on the way back, which is what makes
      // this falsifiable: re-counting in place asserts something already true before the echo.
      // Positive control first — Jonah 2:1's own text, which is nowhere in chapter 1 — so the count
      // runs against a rendered chapter rather than the empty mid-navigation editor.
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(mainEditor).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(0);

      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      await expect(mainEditor).toContainText('word came to Jonah', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(endnotesExpected, { timeout: 30_000 });
      await expect(endnotesInVerseParas).toHaveCount(endnotesExpected);
    });

    await test.step('inserting an endnote from the visible Insert top menu creates a \\fe note with the + caller', async () => {
      await nextClearVersePara().click();
      const endnotesBefore = await endnotes.count();

      const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR).first();
      await expect(hamburger).toBeVisible({ timeout: 15_000 });
      await hamburger.click();
      const insertEndnoteMenuItem = editorFrame.getByRole('menuitem', {
        name: /^Insert endnote/,
      });
      await expect(insertEndnoteMenuItem).toBeVisible({ timeout: 5_000 });
      await insertEndnoteMenuItem.click();

      await expect(endnotes).toHaveCount(endnotesBefore + 1, { timeout: 15_000 });
      await expect(mainEditor.locator('span.note.usfm_fe[data-caller="+"]')).toHaveCount(
        endnotesBefore + 1,
      );
      await expect(endnotesInVerseParas).toHaveCount(endnotesBefore + 1);
    });

    await test.step('the chapter is put back as it was', async () => {
      // Waits for the top-menu insert's own save first, so it cannot land after the rewrite.
      await expect.poll(savedEndnoteCount, { timeout: 20_000 }).toBe(endnotesExpected + 1);
      // Off the chapter first: an editor that edited the chapter moments ago holds back an
      // incoming change to it and writes its own copy back over it.
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(mainEditor).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
      // A book write, not a chapter write: a chapter write corrects the chapter marker's line, so
      // it cannot put the starting bytes back.
      await setSampleProjectBookUsfm(JONAH_1, originalBookUsfm);
      await expect
        .poll(() => getSampleProjectBookUsfm(JONAH_1), { timeout: 20_000 })
        .toBe(originalBookUsfm);
      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      await expect(mainEditor).toContainText('word came to Jonah', { timeout: 60_000 });
      await expect(endnotes).toHaveCount(0, { timeout: 30_000 });
      expect(await getSampleProjectBookUsfm(JONAH_1)).toBe(originalBookUsfm);
    });
  });
});
