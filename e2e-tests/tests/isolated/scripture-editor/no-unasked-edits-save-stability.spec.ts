/**
 * The running app makes no edit to Scripture that the user did not ask for.
 *
 * Every other fidelity test exercises one leg of the save path in isolation. This one drives the
 * whole composition in the real app — C# USFM → USX, the USX parse into the editor, the editor's
 * save, USJ → USX, the PDP's USX fragmenter and `PutText` — and judges it by the only thing that
 * matters to the user: the book file on disk. Per chapter:
 *
 * 1. **Loading never writes.** Open the chapter and wait well past the 700ms save debounce: the book
 *    file is byte-identical and its modification time unchanged.
 * 2. **First save, then undo.** Type one character, wait for that save to reach the disk, press
 *    Ctrl+Z, wait for that save too. The undo takes back exactly the typed character and nothing
 *    else. Against the file as installed, the result differs by exactly
 *    {@link expectedAfterFirstSave}'s known first-save normalization and nothing more.
 * 3. **At rest, an edit undone leaves nothing behind.** The same cycle again, now that the book is in
 *    the form the app saves: byte-identical to the file as it was before the cycle.
 *
 * Step 2 cannot be byte-identity against the installed file today, because the bundled WEB is not
 * in the form ParatextData writes (LF line endings, trailing spaces, doubled spaces) and the first
 * save normalizes it. That normalization is pinned exactly rather than tolerated: anything else
 * changing fails, and so does the normalization going away — update the pin then, with the data
 * fidelity catalog (`.context/standards/Scripture-Data-Fidelity-Catalog.md`).
 *
 * The baseline is the file as installed — the bundled WEB is copied verbatim into the isolated
 * project root, and a positive control checks the two agree, so a capture of the wrong file cannot
 * make a comparison pass. A mismatch fails with a unified diff whose lines are JSON string
 * literals, so dropped trailing spaces, collapsed space runs and CR/LF changes are all visible.
 * That diff is the finding: never loosen a comparison here to make it pass.
 *
 * Two chapters, for conversion surface: Jonah 1 (the book header, paragraphs, footnotes with
 * `\fr`/`\ft`) and Matthew 3 (poetry `\q1`/`\q2`, a cross reference, footnotes and a `\wj`
 * character span). Each chapter is a separate book file, so one chapter's result cannot mask the
 * other's.
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped, and a second Electron
 * instance against the shared renderer dev server has a documented dock-tab failure mode — see
 * isolated.fixture.ts). The chapters run as test.step()s sharing the one instance, and every
 * comparison is a soft assertion so one finding does not hide the next.
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/no-unasked-edits-save-stability.spec.ts`.
 */
import fs from 'fs';
import path from 'path';
import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { requireIsolatedProjectRoot } from '../../../fixtures/helpers';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import { unifiedUsfmDiff } from '../../../fixtures/usfm-line-diff';

// Power mode so the editor opens in Standard view (marker-editable), the view whose save path
// carries the most conversion. DEV_NOISY=false keeps the normal Home layout.
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** The bundled sample project the backend copies, file for file, into the isolated root. */
const BUNDLED_WEB_DIR = path.resolve(__dirname, '../../../../c-sharp/assets/WEB');

/** Folder the backend installs the sample project into, under the project root. */
const INSTALLED_WEB_FOLDER = 'WEB';

/**
 * How long a freshly opened chapter is left alone before checking that nothing was written. The
 * editor's save debounce is 700ms (`PDP_SAVE_DEBOUNCE_MS`); this is several of those plus the PDP's
 * own write, so a load-triggered save would have landed.
 */
const LOAD_QUIET_MS = 5_000;

/** How long a keystroke's save gets to reach the disk. */
const SAVE_LANDED_TIMEOUT_MS = 30_000;

/** A file counts as settled once it has not changed for this long. */
const SETTLED_QUIET_MS = 3_000;

/** The one character typed. ASCII, so it is one byte in the file. */
const TYPED_CHARACTER = 'Q';

interface ChapterCase {
  /** Step title. */
  label: string;
  /** English reference for the toolbar navigation (the control renders English book names). */
  reference: string;
  /** The chapter the editor saves. */
  chapterNum: number;
  /** The book's file name in the WEB project. */
  bookFile: string;
  /** Text near the end of the chapter, proving the chapter's own content has rendered. */
  renderedText: string;
}

const CHAPTERS: ChapterCase[] = [
  {
    label: 'Jonah 1 — book header, paragraphs and footnotes',
    reference: 'Jonah 1:1',
    chapterNum: 1,
    bookFile: '32JONengWEBUS.SFM',
    renderedText: 'three days and three nights',
  },
  {
    label: 'Matthew 3 — poetry, cross reference, footnotes and a \\wj span',
    reference: 'Matthew 3:1',
    chapterNum: 3,
    bookFile: '41MATengWEBUS.SFM',
    renderedText: 'with whom I am well pleased',
  },
];

/**
 * The installed LF-only book file as the app leaves it after its first save of `chapterNum` — the
 * known first-save normalization, pinned exactly:
 *
 * - **Every line of the book, in every chapter, gets a CRLF line ending.** `PutText` writes the whole
 *   book file with CRLF, so the first save of one chapter rewrites every line of a book stored with
 *   LF endings — chapters the user never opened included. Content is unchanged.
 * - **Within the saved chapter only, hand-authored whitespace is regularized**: trailing spaces at a
 *   line end are dropped (the WEB's `\c 1` line and most verse lines end in spaces) and runs of
 *   spaces collapse to one (the WEB puts two spaces between a footnote's `\fr 1:1` and its `\ft`).
 *   ParatextData's `NormalizeUsfm`/`RegularizeSpaces` on the USX → USFM leg; data fidelity catalog
 *   row S-2. Chapter 1's save spans the book header too.
 *
 * Neither occurs in a book ParatextData itself wrote, which is why step 3 expects byte identity.
 */
function expectedAfterFirstSave(installed: Buffer, chapterNum: number): Buffer {
  const lines = installed.toString('utf8').split('\n');
  const isChapterLine = (line: string) => /^\\c \d+/.test(line);
  const chapterLine = lines.findIndex((line) =>
    new RegExp(`^\\\\c ${chapterNum}(?!\\d)`).test(line),
  );
  if (chapterLine < 0) throw new Error(`No \\c ${chapterNum} line in the installed book`);
  const start = chapterNum === 1 ? 0 : chapterLine;
  const nextChapter = lines.findIndex((line, index) => index > chapterLine && isChapterLine(line));
  const end = nextChapter < 0 ? lines.length : nextChapter;
  return Buffer.from(
    lines
      .map((line, index) =>
        index >= start && index < end ? line.replace(/ +$/, '').replace(/ {2,}/g, ' ') : line,
      )
      .join('\r\n'),
    'utf8',
  );
}

function installedBookPath(bookFile: string): string {
  return path.join(requireIsolatedProjectRoot(), INSTALLED_WEB_FOLDER, bookFile);
}

/** `withInsertion` is `without` with exactly `inserted` added at one place, and nothing else. */
function isSingleInsertion(withInsertion: Buffer, without: Buffer, inserted: string): boolean {
  const insertedBytes = Buffer.from(inserted, 'utf8');
  if (withInsertion.length !== without.length + insertedBytes.length) return false;
  let offset = 0;
  while (offset < without.length && withInsertion[offset] === without[offset]) offset += 1;
  return (
    withInsertion.subarray(offset, offset + insertedBytes.length).equals(insertedBytes) &&
    withInsertion.subarray(offset + insertedBytes.length).equals(without.subarray(offset))
  );
}

function describeLineEndings(bytes: Buffer): string {
  const text = bytes.toString('utf8');
  const crlf = text.split('\r\n').length - 1;
  return `${crlf} CRLF, ${text.split('\n').length - 1 - crlf} bare LF`;
}

/**
 * Everything a failure message needs to show how `after` differs from `before`: the byte lengths,
 * the line endings, the first differing byte with hex context either side, and a unified diff of
 * the decoded text. Returns `''` when the bytes are identical.
 */
function describeByteDrift(before: Buffer, after: Buffer, beforeLabel: string, afterLabel: string) {
  if (before.equals(after)) return '';
  let offset = 0;
  while (offset < before.length && offset < after.length && before[offset] === after[offset])
    offset += 1;
  const hexAround = (bytes: Buffer) =>
    bytes.subarray(Math.max(0, offset - 16), offset + 16).toString('hex');
  return [
    `${beforeLabel}: ${before.length} bytes (${describeLineEndings(before)}); ` +
      `${afterLabel}: ${after.length} bytes (${describeLineEndings(after)})`,
    `first differing byte at offset ${offset}`,
    `  ${beforeLabel} hex around it: ${hexAround(before)}`,
    `  ${afterLabel} hex around it:  ${hexAround(after)}`,
    unifiedUsfmDiff(before.toString('utf8'), after.toString('utf8'), beforeLabel, afterLabel) ||
      '(the decoded text is identical; the difference is in bytes UTF-8 decoding hides)',
  ].join('\n');
}

/**
 * Soft-asserts the two are byte-identical. On a mismatch, the message carries the diff and both
 * files are attached to the report whole, for triage beyond what the diff shows.
 */
async function expectSameBytes(
  bookFile: string,
  expected: Buffer,
  actual: Buffer,
  expectedLabel: string,
  actualLabel: string,
  message: string,
): Promise<void> {
  const drift = describeByteDrift(expected, actual, expectedLabel, actualLabel);
  if (drift) {
    await test
      .info()
      .attach(`${bookFile}.${expectedLabel}`, { body: expected, contentType: 'text/plain' });
    await test
      .info()
      .attach(`${bookFile}.${actualLabel}`, { body: actual, contentType: 'text/plain' });
  }
  expect.soft(drift, message).toBe('');
}

/**
 * Waits until the file's bytes stop matching `previous` — a save reached the disk — and then until
 * they have held still for {@link SETTLED_QUIET_MS}, so a second write still in flight is not
 * missed. Returns the settled bytes, or `undefined` if no write landed within the timeout.
 */
async function waitForSaveToSettle(
  page: Page,
  filePath: string,
  previous: Buffer,
): Promise<Buffer | undefined> {
  const deadline = Date.now() + SAVE_LANDED_TIMEOUT_MS;
  let current = fs.readFileSync(filePath);
  // Sequential polling of the file: each read decides whether to read again.
  /* eslint-disable no-await-in-loop */
  while (current.equals(previous)) {
    if (Date.now() > deadline) return undefined;
    await page.waitForTimeout(250);
    current = fs.readFileSync(filePath);
  }
  let quietSince = Date.now();
  while (Date.now() - quietSince < SETTLED_QUIET_MS) {
    await page.waitForTimeout(250);
    const next = fs.readFileSync(filePath);
    if (!next.equals(current)) {
      current = next;
      quietSince = Date.now();
    }
  }
  /* eslint-enable no-await-in-loop */
  return current;
}

/**
 * Types {@link TYPED_CHARACTER} at the end of the chapter text, waits for that save to settle on
 * disk, undoes it, and waits for that save too. Hard-fails when the edit never saves (there would
 * be nothing to undo); returns `afterUndo: undefined` when the undo never saves.
 */
async function editThenUndo(
  mainPage: Page,
  editorInput: Locator,
  chapter: ChapterCase,
  before: Buffer,
): Promise<{ afterEdit: Buffer; afterUndo: Buffer | undefined }> {
  const bookPath = installedBookPath(chapter.bookFile);
  await editorInput.click();
  await editorInput.press('Control+End');
  await mainPage.keyboard.type(TYPED_CHARACTER);
  const afterEdit = await waitForSaveToSettle(mainPage, bookPath, before);
  if (!afterEdit)
    throw new Error(
      `${chapter.bookFile}: typing "${TYPED_CHARACTER}" in ${chapter.reference} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`,
    );

  await mainPage.keyboard.press('Control+z');
  const afterUndo = await waitForSaveToSettle(mainPage, bookPath, afterEdit);
  return { afterEdit, afterUndo };
}

async function runChapterCase(
  mainPage: Page,
  editorInput: Locator,
  chapter: ChapterCase,
  installed: Buffer,
): Promise<Buffer> {
  const bookPath = installedBookPath(chapter.bookFile);
  const installedMtimeMs = fs.statSync(bookPath).mtimeMs;

  await navigateToolbarBcv(mainPage, chapter.reference);
  await expect(editorInput).toContainText(chapter.renderedText, { timeout: 60_000 });

  // 1. Loading never writes.
  await mainPage.waitForTimeout(LOAD_QUIET_MS);
  const afterLoad = fs.readFileSync(bookPath);
  await expectSameBytes(
    chapter.bookFile,
    installed,
    afterLoad,
    'installed',
    'after-opening',
    `${chapter.bookFile}: opening ${chapter.reference} and waiting ${LOAD_QUIET_MS}ms changed the book file`,
  );
  expect
    .soft(
      fs.statSync(bookPath).mtimeMs,
      `${chapter.bookFile}: opening ${chapter.reference} rewrote the book file (modification time moved)`,
    )
    .toBe(installedMtimeMs);

  // 2. First save, then undo.
  const first = await editThenUndo(mainPage, editorInput, chapter, afterLoad);
  if (!first.afterUndo) {
    await expectSameBytes(
      chapter.bookFile,
      afterLoad,
      first.afterEdit,
      'before-first-edit',
      'left-by-first-edit',
      `${chapter.bookFile}: the undo never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms, so the edit was left behind`,
    );
    return first.afterEdit;
  }
  expect
    .soft(
      isSingleInsertion(first.afterEdit, first.afterUndo, TYPED_CHARACTER),
      `${chapter.bookFile}: the undo should take back exactly the typed "${TYPED_CHARACTER}" and nothing else\n` +
        `${describeByteDrift(first.afterUndo, first.afterEdit, 'after-first-undo', 'after-first-edit')}`,
    )
    .toBe(true);
  await expectSameBytes(
    chapter.bookFile,
    expectedAfterFirstSave(installed, chapter.chapterNum),
    first.afterUndo,
    'installed-with-known-first-save-normalization',
    'after-first-edit-and-undo',
    `${chapter.bookFile}: the first save of ${chapter.reference} changed more (or less) than the known first-save normalization`,
  );

  // 3. At rest, an edit undone leaves nothing behind.
  const second = await editThenUndo(mainPage, editorInput, chapter, first.afterUndo);
  const settled = second.afterUndo ?? second.afterEdit;
  await expectSameBytes(
    chapter.bookFile,
    first.afterUndo,
    settled,
    'at-rest',
    'after-second-edit-and-undo',
    second.afterUndo
      ? `${chapter.bookFile}: typing "${TYPED_CHARACTER}" and undoing it in a book at rest did not restore the file byte for byte`
      : `${chapter.bookFile}: the second undo never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms, so the edit was left behind`,
  );
  return settled;
}

test.describe('the app makes no unasked edits to Scripture', () => {
  test('opening a chapter writes nothing, and an edit undone restores the file byte for byte', async ({
    mainPage,
  }) => {
    // Heavy isolated test: its own Electron instance, then two chapters each waiting out several
    // save debounces and disk settles.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    // Capture every book file before any editor is opened.
    const installedBooks = new Map(
      CHAPTERS.map((chapter) => {
        const installed = fs.readFileSync(installedBookPath(chapter.bookFile));
        // Positive control: the capture is the bundled file, so it is the form under test and not
        // something the app already rewrote.
        expect(
          installed.equals(fs.readFileSync(path.join(BUNDLED_WEB_DIR, chapter.bookFile))),
          `${chapter.bookFile} in the isolated root should be the bundled copy`,
        ).toBe(true);
        return [chapter.bookFile, installed];
      }),
    );

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    const editorInput = editorFrame.locator('.editor-input.marker-editable');

    const settledBooks = new Map<string, Buffer>();
    const runStep = (chapter: ChapterCase) =>
      test.step(chapter.label, async () => {
        const installed = installedBooks.get(chapter.bookFile);
        if (!installed) throw new Error(`No capture for ${chapter.bookFile}`);
        settledBooks.set(
          chapter.bookFile,
          await runChapterCase(mainPage, editorInput, chapter, installed),
        );
      });
    await runStep(CHAPTERS[0]);
    await runStep(CHAPTERS[1]);

    // Leaving a chapter flushes any pending save; nothing may reach a book after its step settled.
    await Promise.all(
      CHAPTERS.map(async (chapter) => {
        const settled = settledBooks.get(chapter.bookFile);
        if (!settled) return;
        await expectSameBytes(
          chapter.bookFile,
          settled,
          fs.readFileSync(installedBookPath(chapter.bookFile)),
          'when-its-step-finished',
          'at-the-end-of-the-run',
          `${chapter.bookFile}: the book file changed after its own step finished`,
        );
      }),
    );
  });
});
