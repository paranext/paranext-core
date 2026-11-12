/**
 * End-to-end cover for the RESTORE cases of the chapter-marker save-boundary repair: a chapter
 * document whose `\c` marker is missing, or whose bytes stopped being a marker, which the repair
 * gives a marker before the write. (A marker that is present but WRONG is
 * `chapter-marker-repair.spec.ts`.) Paratext refuses a later chapter without its marker or its
 * number ("No chapter marker present."), so the repair puts them back, pushes the document back
 * into the editor and tells the user. The push-back leaves the editor with no caret, and where it
 * goes back is what only the running app can show:
 *
 * - A marker backspaced away: the user was working on the chapter line, so the caret goes back there
 *   — just past the number. Two speeds reach two different repairs. Backspacing the whole marker
 *   faster than the save debounce removes the chapter before anything is saved, so the repair
 *   RESTORES it. Backspacing the number one key at a time, pausing each time, saves a chapter whose
 *   number is gone, so the repair RENUMBERS it. The number was still mid-edit in the editor when
 *   the repair put it back, which is what once made the push-back a no-op: the numberless marker
 *   stayed on screen, the caret went to the end of the chapter, and the next keys deleted text
 *   there.
 * - A blank chapter typed into: a chapter the book has not reached yet has no text at all, Power mode
 *   shows it as the ordinary empty editor, and what the user types there builds a document with no
 *   chapter marker. A restore there puts the caret back at the end of the text the user was typing.
 *   Anywhere in the new marker would be worse than no caret: keys typed there become part of the
 *   chapter number, and the next repair corrects them straight back out, silently.
 * - A chapter line whose bytes stop being a chapter marker, which Paratext 9 keeps as they are: it
 *   saves the bytes it holds and puts a chapter marker back above them. So the editor saves what
 *   the user left on the line as text, the repair restores the marker at the top of the chapter,
 *   and the user's text stays below it with the caret where it was. Five edits reach it: deleting
 *   the `c` of `\c 2` leaves `\ 2`, which is not a marker; typing an `s` into `\c 4` leaves `\sc
 *   4`, a character style whose caret stays in its marker; typing ahead of the `\` leaves text
 *   before the marker, so the text moves to the line below it (in chapter 1, where a paragraph
 *   comes before the marker, it joins the end of that paragraph instead, as the save and the reload
 *   put it); and selecting from the chapter line into the paragraph below and typing over it merges
 *   the two, so the paragraph moves below the restored marker with the caret still after the
 *   typing.
 *
 * Each test() launches its own Electron instance, and each edits the project's USFM on disk in a
 * way the next could not start from: the first rewrites Ruth 2, the second cuts Jonah back to its
 * first chapter, the third rewrites Ruth 1 to 4 and Jonah 2. The first test also holds the one step
 * bound to a clock (five Backspaces inside the save debounce), so it stays a test of its own.
 *
 * Keys go through `mainPage.keyboard` once a click has put the focus in the editor (`locator.press`
 * focuses its target first and is slow per key, and can take over a second a key on a cold
 * launch).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  chapterMarkerCorrectionMessage,
  clickChapterMarkerGlyph,
  getChapterUsfmFromProvider,
  getSampleProjectDataProviderId,
  openSampleEditorInStandardView,
  PDP_REQUEST_TIMEOUT_MS,
  WEBSOCKET_PORT,
} from '../../../fixtures/chapter-marker-helpers';
import { sendPapiRequestOnce } from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import { installToastProbe, recordedToasts } from '../../../fixtures/toast-recorder';

// Power mode: the editable Standard view whose chapter line these tests edit; Simple mode would
// replace a blank chapter with the "Add chapter number" view. DEV_NOISY=false keeps the normal Home
// layout (see preview-read-only-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** The editor's save debounce (`PDP_SAVE_DEBOUNCE_MS` in the scripture editor's web view). */
const SAVE_DEBOUNCE_MS = 700;

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };

// All-caps tokens that appear nowhere in the WEB text, so a `toContainText` match is unambiguous.
const TYPED_TOKEN = 'ZZTYPEDINBLANK';
const NEXT_TOKEN = 'ZZTYPEDNEXT';

test.describe('scripture editor chapter-marker restore', () => {
  test('puts a backspaced chapter marker back and leaves the caret on the chapter line', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates). Playwright's 3x "slow"
    // budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    const pdpId = await getSampleProjectDataProviderId();
    const getRuth2Usfm = () => getChapterUsfmFromProvider(pdpId, 'RUT', 2);
    // The chapter's text after its marker, whitespace-normalized: saving through the editor
    // rewrites the file's line-end spacing, and only the text has to survive.
    const textAfterMarker = (usfm: string) =>
      usfm
        .replace(/^\\c 2\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();

    const { editorFrame, editorInput } = await openSampleEditorInStandardView(mainPage);
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');

    /**
     * The chapter line as the web view's own document shows it — its text, with the separator's
     * no-break space read as a plain one — and where the caret is: whether it sits in the chapter
     * marker's glyph, and how many characters of that node follow it.
     */
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    const readChapterLine = async () =>
      editorEvalFrame.evaluate(() => {
        const glyph = (
          document.querySelector('p.chapter[data-marker="c"]')?.textContent ?? ''
        ).replace(/\s/g, ' ');
        const selection = document.getSelection();
        const node = selection?.anchorNode;
        if (!selection || !node || node.nodeType !== Node.TEXT_NODE)
          return { glyph, where: 'no-text-caret', charsAfterCaret: -1 };
        return {
          glyph,
          where: node.parentElement?.closest('p.chapter[data-marker="c"]')
            ? 'chapter-marker-glyph'
            : 'text',
          charsAfterCaret: (node.textContent ?? '').length - selection.anchorOffset,
        };
      });
    // Just past the number, as for any corrected marker: one glyph byte follows the caret.
    const CARET_PAST_THE_NUMBER = {
      glyph: '\\c 2 ',
      where: 'chapter-marker-glyph',
      charsAfterCaret: 1,
    };

    await installToastProbe(mainPage);

    // Ruth 2's own text, not just a chapter numbered 2: any chapter 2 would match that.
    await navigateToolbarBcv(mainPage, 'Ruth 2:1');
    await expect(editorInput).toContainText('Naomi had a relative of her husband', {
      timeout: 60_000,
    });
    await expect(chapterMarker).toHaveAttribute('data-number', '2');
    const storedText = textAfterMarker(await getRuth2Usfm());

    await test.step('the whole marker is backspaced away', async () => {
      // Every byte of `\c 2 ` — five keys, faster than the save debounce — so the chapter is gone
      // before anything is saved. The click leaves the focus in the editor, so the keys go through
      // `mainPage.keyboard`: `locator.press` focuses its target first and can take over a second a
      // key on a cold launch, which lets a save repair the marker partway through and leaves the
      // last keys deleting the repaired one down to a `\` the editor no longer reads as a chapter.
      await clickChapterMarkerGlyph(chapterMarker);
      await mainPage.keyboard.press('End');
      const startedAt = Date.now();
      for (let press = 0; press < 5; press += 1) {
        // Sequential on purpose: each Backspace acts on what the previous one left.
        // eslint-disable-next-line no-await-in-loop
        await mainPage.keyboard.press('Backspace');
      }
      expect(
        Date.now() - startedAt,
        'the five Backspaces must all land inside the save debounce',
      ).toBeLessThan(SAVE_DEBOUNCE_MS);
    });

    await test.step('the marker is restored and the user is told', async () => {
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(
          expect.arrayContaining([
            expect.stringContaining(chapterMarkerCorrectionMessage(2, 'Ruth')),
          ]),
        );
      await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 30_000 });
    });

    await test.step('the caret comes back to the end of the chapter line', async () => {
      await expect.poll(readChapterLine, { timeout: 20_000 }).toEqual(CARET_PAST_THE_NUMBER);
    });

    await test.step('the number, backspaced a key at a time, comes back each time', async () => {
      for (let press = 0; press < 3; press += 1) {
        // Sequential on purpose: each Backspace waits out the save and correction of the last one.
        // eslint-disable-next-line no-await-in-loop
        await editorInput.press('Backspace');
        // Until the save, the number is gone and the caret sits where it was, so this waits for
        // the correction itself rather than passing on the keystroke.
        // eslint-disable-next-line no-await-in-loop
        await expect.poll(readChapterLine, { timeout: 20_000 }).toEqual(CARET_PAST_THE_NUMBER);
      }
    });

    await test.step('the chapter is saved with its marker and all of its text', async () => {
      await expect.poll(getRuth2Usfm, { timeout: 30_000 }).toMatch(/^\\c 2\s/);
      expect(textAfterMarker(await getRuth2Usfm())).toBe(storedText);
    });
  });

  // Skipped until the product race it hits is fixed (Bug drafted, ticket key pending): the
  // correction can repeat for most of a second while the typing is still arriving, and its last
  // round puts the caret after the chapter number instead of after the typed text.
  test.fixme(
    'restores the marker of a blank chapter typed into, and leaves the caret where the typing was',
    {
      annotation: {
        type: 'fixme',
        description:
          'Ticket pending: a chapter-marker correction can repeat while the user types and leave the caret on the chapter line (fails ~1 run in 15)',
      },
    },
    async ({ mainPage }) => {
      // Heavy isolated test (own Electron instance, backend-readiness gates, deliberately-paced
      // typing). Playwright's 3x "slow" budget.
      test.slow();

      await waitForHomeTab(mainPage);
      await makeSampleProjectEditable();

      const pdpId = await getSampleProjectDataProviderId();
      const getJonah2Usfm = () => getChapterUsfmFromProvider(pdpId, 'JON', 2);

      // Cut Jonah back to its first chapter, so Jonah 2 is a chapter the book has not reached yet.
      // Written as a BOOK, which the chapter-marker correction never touches — a chapter write of
      // empty USFM would be given its marker straight back.
      const bookUsfm = await sendPapiRequestOnce<string>(
        `object:${pdpId}.getBookUSFM`,
        [JONAH_1],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );
      const chapter2Start = bookUsfm.indexOf('\\c 2');
      expect(chapter2Start).toBeGreaterThan(0);
      expect(
        await sendPapiRequestOnce<boolean>(
          `object:${pdpId}.setBookUSFM`,
          [JONAH_1, bookUsfm.slice(0, chapter2Start)],
          WEBSOCKET_PORT,
          PDP_REQUEST_TIMEOUT_MS,
        ),
      ).toBe(true);
      expect(await getJonah2Usfm()).toBe('');

      const { editorFrame, editorInput } = await openSampleEditorInStandardView(mainPage);
      const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');

      /**
       * Where the caret is, as the web view's own document sees it: whether it sits in the chapter
       * marker's glyph, the text of the node it sits in, and how many characters of that node
       * follow it. Read from the DOM selection rather than inferred from where the next keystroke
       * lands, since that keystroke would change the thing being probed.
       */
      const editorEvalFrame = await findScriptureEditorFrame(mainPage);
      const readCaret = async () =>
        editorEvalFrame.evaluate(() => {
          const selection = document.getSelection();
          const node = selection?.anchorNode;
          if (!selection || !node || node.nodeType !== Node.TEXT_NODE)
            return { where: 'no-text-caret', text: '', charsAfterCaret: -1 };
          const text = node.textContent ?? '';
          return {
            where: node.parentElement?.closest('p.chapter[data-marker="c"]')
              ? 'chapter-marker-glyph'
              : 'text',
            text,
            charsAfterCaret: text.length - selection.anchorOffset,
          };
        });

      await installToastProbe(mainPage);

      // Land on Jonah 1 first so the blank chapter can be told apart from an editor still loading:
      // Jonah 1's text on screen, then gone, is the positive control for "Jonah 2 is empty".
      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect(editorInput).toContainText('word came to Jonah the son of Amittai', {
        timeout: 60_000,
      });
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(editorInput).not.toContainText('word came to Jonah', { timeout: 60_000 });
      await expect(chapterMarker).toHaveCount(0);

      await test.step('typing into the blank chapter gives it its marker, and the user is told', async () => {
        await editorInput.click();
        await editorInput.pressSequentially(TYPED_TOKEN, { delay: 50 });

        await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 30_000 });
        await expect(editorInput).toContainText(TYPED_TOKEN);
        await expect
          .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
          .toEqual(
            expect.arrayContaining([
              expect.stringContaining(chapterMarkerCorrectionMessage(2, 'Jonah')),
            ]),
          );
      });

      await test.step('the caret comes back to the end of the text being typed', async () => {
        await expect
          .poll(readCaret, { timeout: 20_000 })
          .toEqual({ where: 'text', text: TYPED_TOKEN, charsAfterCaret: 0 });
      });

      await test.step('the next keystrokes continue that text rather than the chapter number', async () => {
        // No click first: this is the user carrying on typing across the correction.
        await editorInput.pressSequentially(NEXT_TOKEN, { delay: 50 });

        await expect(editorInput).toContainText(`${TYPED_TOKEN}${NEXT_TOKEN}`, { timeout: 20_000 });
        await expect(chapterMarker).toHaveAttribute('data-number', '2');
      });

      await test.step('the chapter is saved with its marker and everything typed', async () => {
        await expect
          .poll(getJonah2Usfm, { timeout: 30_000 })
          .toMatch(new RegExp(`^\\\\c 2\\s[\\s\\S]*${TYPED_TOKEN}${NEXT_TOKEN}`));
      });
    },
  );

  // Skipped for the same product race as the blank-chapter test above (ticket key pending): after
  // typing over a selection that starts in the chapter line, the caret can end outside the line
  // the typing went into.
  test.fixme(
    'keeps what is left on a chapter line below a restored marker, with the caret in it',
    {
      annotation: {
        type: 'fixme',
        description:
          'Ticket pending: a chapter-marker correction can repeat while the user types and leave the caret outside the typed line (fails ~1 run in 25)',
      },
    },
    async ({ mainPage }) => {
      // Heavy isolated test (own Electron instance, backend-readiness gates). Playwright's 3x "slow"
      // budget.
      test.slow();

      await waitForHomeTab(mainPage);
      await makeSampleProjectEditable();

      const pdpId = await getSampleProjectDataProviderId();
      const getRuthUsfm = (chapterNum: number) =>
        getChapterUsfmFromProvider(pdpId, 'RUT', chapterNum);

      const { editorFrame, editorInput } = await openSampleEditorInStandardView(mainPage);
      const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');

      /**
       * The chapter line and the line after it, as the web view's own document shows them, with the
       * separator's no-break space read as a plain one — and whether the caret is in that next
       * line, and what of that line comes before it.
       */
      const editorEvalFrame = await findScriptureEditorFrame(mainPage);
      const readLines = async () =>
        editorEvalFrame.evaluate(() => {
          const chapterLine = document.querySelector('p.chapter[data-marker="c"]');
          const nextLine = chapterLine?.nextElementSibling;
          const selection = document.getSelection();
          const caretNode = selection?.anchorNode;
          const caretInNextLine = !!caretNode && !!nextLine?.contains(caretNode);
          // What of the line comes before the caret, so the check does not depend on whether the
          // browser spells the position as a text offset or as an offset among the line's children.
          let textBeforeCaret = '';
          if (caretInNextLine && nextLine && caretNode && selection) {
            const range = document.createRange();
            range.setStart(nextLine, 0);
            range.setEnd(caretNode, selection.anchorOffset);
            textBeforeCaret = range.toString().replace(/\s/g, ' ');
          }
          return {
            chapterLine: (chapterLine?.textContent ?? '').replace(/\s/g, ' '),
            nextLine: (nextLine?.textContent ?? '').replace(/\s/g, ' '),
            caretInNextLine,
            textBeforeCaret,
          };
        });

      await installToastProbe(mainPage);

      await test.step('deleting the c of \\c 2 leaves \\ 2', async () => {
        await navigateToolbarBcv(mainPage, 'Ruth 2:1');
        await expect(editorInput).toContainText('Naomi had a relative of her husband', {
          timeout: 60_000,
        });
        await expect(chapterMarker).toHaveAttribute('data-number', '2');

        // `\c 2 ` with the caret at its end; three keys left puts it just past the `c`.
        await clickChapterMarkerGlyph(chapterMarker);
        await mainPage.keyboard.press('End');
        for (let press = 0; press < 3; press += 1) {
          // Sequential on purpose: each key moves from where the previous one left the caret.
          // eslint-disable-next-line no-await-in-loop
          await mainPage.keyboard.press('ArrowLeft');
        }
        await mainPage.keyboard.press('Backspace');
      });

      await test.step('the marker is restored above \\ 2, which keeps the caret', async () => {
        await expect
          .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
          .toEqual(
            expect.arrayContaining([
              expect.stringContaining(chapterMarkerCorrectionMessage(2, 'Ruth')),
            ]),
          );
        // `\\ 2` is a paragraph with no marker name, as ParatextData reads it. The caret stays where
        // it was, just past the `\\`, at the end of that empty name.
        await expect.poll(readLines, { timeout: 20_000 }).toEqual({
          chapterLine: '\\c 2 ',
          nextLine: '\\ 2',
          caretInNextLine: true,
          textBeforeCaret: '\\',
        });
        await expect.poll(() => getRuthUsfm(2), { timeout: 30_000 }).toMatch(/^\\c 2\s+\\ 2\s+\\p/);
      });

      await test.step('typing ahead of the \\ of \\c 3 puts the typing below the marker', async () => {
        await navigateToolbarBcv(mainPage, 'Ruth 3:1');
        await expect(chapterMarker).toHaveAttribute('data-number', '3', { timeout: 60_000 });
        await clickChapterMarkerGlyph(chapterMarker);
        await mainPage.keyboard.press('Home');
        await mainPage.keyboard.type('X');
      });

      await test.step('the typing lands below the marker, with the caret after it', async () => {
        await expect
          .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
          .toEqual(
            expect.arrayContaining([
              expect.stringContaining(chapterMarkerCorrectionMessage(3, 'Ruth')),
            ]),
          );
        await expect.poll(readLines, { timeout: 20_000 }).toEqual({
          chapterLine: '\\c 3 ',
          nextLine: 'X',
          caretInNextLine: true,
          textBeforeCaret: 'X',
        });
        await expect.poll(() => getRuthUsfm(3), { timeout: 30_000 }).toMatch(/^\\c 3\s+X\s+\\p/);
      });

      await test.step('\\ 2 loads back as itself and saves as itself', async () => {
        await navigateToolbarBcv(mainPage, 'Ruth 2:1');
        await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 60_000 });
        await expect
          .poll(async () => (await readLines()).nextLine, { timeout: 20_000 })
          .toBe('\\ 2');
        // An edit to the line makes the chapter save again, from what was loaded.
        await editorFrame.locator('p.chapter[data-marker="c"] + *').click();
        await mainPage.keyboard.press('End');
        await mainPage.keyboard.type('9');
        await expect
          .poll(() => getRuthUsfm(2), { timeout: 30_000 })
          .toMatch(/^\\c 2\s+\\ 29\s+\\p/);
      });

      await test.step('typing an s into \\c 4 leaves \\sc 4, which keeps the caret', async () => {
        await navigateToolbarBcv(mainPage, 'Ruth 4:1');
        await expect(chapterMarker).toHaveAttribute('data-number', '4', { timeout: 60_000 });
        await clickChapterMarkerGlyph(chapterMarker);
        await mainPage.keyboard.press('Home');
        await mainPage.keyboard.press('ArrowRight');
        await mainPage.keyboard.type('s');

        await expect
          .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
          .toEqual(
            expect.arrayContaining([
              expect.stringContaining(chapterMarkerCorrectionMessage(4, 'Ruth')),
            ]),
          );
        // `\sc` is a character style, so the line is the number in small caps, and the caret stays
        // between the `s` and the `c` of its marker.
        await expect.poll(readLines, { timeout: 20_000 }).toEqual({
          chapterLine: '\\c 4 ',
          nextLine: '\\sc 4 ',
          caretInNextLine: true,
          textBeforeCaret: '\\s',
        });
        await expect.poll(() => getRuthUsfm(4), { timeout: 30_000 }).toMatch(/^\\c 4\s+\\sc 4/);
      });

      await test.step('typing ahead of the \\ of \\c 1 joins the line before it', async () => {
        await navigateToolbarBcv(mainPage, 'Ruth 1:1');
        await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 60_000 });
        await clickChapterMarkerGlyph(chapterMarker);
        await mainPage.keyboard.press('Home');
        await mainPage.keyboard.type('X');

        // The text joins `\mt1 Ruth` once it settles, which is where the save and the reload put it:
        // text standing behind a line break with no marker of its own belongs to the paragraph
        // before it.
        const readLineBeforeChapter = async () =>
          editorEvalFrame.evaluate(() => {
            const line = document.querySelector(
              'p.chapter[data-marker="c"]',
            )?.previousElementSibling;
            const selection = document.getSelection();
            const caretNode = selection?.anchorNode;
            let textBeforeCaret = '';
            if (line && caretNode && selection && line.contains(caretNode)) {
              const range = document.createRange();
              range.setStart(line, 0);
              range.setEnd(caretNode, selection.anchorOffset);
              textBeforeCaret = range.toString().replace(/\s/g, ' ');
            }
            return { line: (line?.textContent ?? '').replace(/\s/g, ' '), textBeforeCaret };
          });
        await expect
          .poll(readLineBeforeChapter, { timeout: 20_000 })
          .toEqual({ line: '\\mt1 Ruth X', textBeforeCaret: '\\mt1 Ruth X' });
        await expect
          .poll(() => getRuthUsfm(1), { timeout: 30_000 })
          .toMatch(/\\mt1 Ruth X\s+\\c 1/);
      });

      await test.step('typing over a selection from \\c 2 into the text below keeps the caret', async () => {
        await navigateToolbarBcv(mainPage, 'Jonah 2:1');
        await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 60_000 });
        await expect(editorInput).toContainText('Then Jonah prayed to Yahweh', { timeout: 60_000 });
        // Focus the editor, then select from the start of the chapter line to just after "Then ".
        await clickChapterMarkerGlyph(chapterMarker);
        const didSelect = await editorEvalFrame.evaluate(() => {
          const chapterLine = document.querySelector('p.chapter[data-marker="c"]');
          const walker = document.createTreeWalker(
            chapterLine?.nextElementSibling ?? document.body,
            NodeFilter.SHOW_TEXT,
          );
          let textNode = walker.nextNode();
          while (textNode && !textNode.textContent?.includes('Then Jonah'))
            textNode = walker.nextNode();
          const glyphText = chapterLine?.querySelector('span')?.firstChild;
          if (!textNode?.textContent || !glyphText) return false;
          const offset = textNode.textContent.indexOf('Then Jonah') + 'Then '.length;
          document.getSelection()?.setBaseAndExtent(glyphText, 0, textNode, offset);
          return true;
        });
        expect(didSelect).toBe(true);
        await mainPage.keyboard.type('ab');

        await expect
          .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
          .toEqual(
            expect.arrayContaining([
              expect.stringContaining(chapterMarkerCorrectionMessage(2, 'Jonah')),
            ]),
          );
        // The caret is back after the typing, in the paragraph below the restored marker.
        await expect
          .poll(
            async () => {
              const { chapterLine, caretInNextLine, textBeforeCaret } = await readLines();
              return {
                chapterLine,
                caretInNextLine,
                endsWithTyping: textBeforeCaret.endsWith('ab'),
              };
            },
            { timeout: 20_000 },
          )
          .toEqual({ chapterLine: '\\c 2 ', caretInNextLine: true, endsWithTyping: true });
        // A key typed now lands in the text, not in the paragraph's marker.
        await mainPage.keyboard.type('c');
        await expect
          .poll(() => getChapterUsfmFromProvider(pdpId, 'JON', 2), { timeout: 30_000 })
          .toMatch(/^\\c 2\s+\\p\s+abcJonah prayed/);
      });
    },
  );
});
