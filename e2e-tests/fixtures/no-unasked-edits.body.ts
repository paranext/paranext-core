/**
 * The running app makes no edit to Scripture that the user did not ask for — the shared body of the
 * `no-unasked-edits-*` specs, one spec per editable view (isolated specs are one test() per file,
 * so each view needs its own file; the spec files only pick the view), plus
 * {@link runPreviewWritesNothing} for Power mode's read-only Preview and
 * {@link runFootnotesPaneRowEdits} for the footnotes pane's row editor.
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
 * 4. **An edit changes only what it edits.** Real gestures — typing with a space in the middle of a
 *    verse, pasting plain text from the OS clipboard, copying a range that holds a character span
 *    or a footnote and pasting it into another verse, deleting a selection that runs into a
 *    character span. After each save, the book differs from the save before it ONLY inside the
 *    verse the gesture was aimed at: every other verse, every chapter line and the book header are
 *    byte-identical ({@link describeChangesOutside} names whatever else moved). Where the result is
 *    unambiguous, the aimed verse must also read exactly as the gesture implies. Undo then restores
 *    the file byte for byte.
 *
 * Step 2 cannot be byte-identity against the installed file today, because the bundled WEB is not
 * in the form ParatextData writes (LF line endings, trailing spaces, doubled spaces) and the first
 * save normalizes it. That normalization is pinned exactly rather than tolerated: anything else
 * changing fails, and so does the normalization going away — update the pin then, with the data
 * fidelity catalog (`.context/standards/Scripture-Data-Fidelity-Catalog.md`, rows S-2 and E-1).
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
 * The chapters and gestures run as test.step()s sharing one Electron instance (a second instance
 * against the shared renderer dev server has a documented dock-tab failure mode — see
 * isolated.fixture.ts), and every comparison is a soft assertion so one finding does not hide the
 * next.
 */
import fs from 'fs';
import path from 'path';
import { type ElectronApplication, type Locator, type Page } from '@playwright/test';
import { test, expect } from './isolated.fixture';
import { TEXT_NOTE_CALLER_SELECTOR } from './content-zoom-helpers';
import { requireIsolatedProjectRoot, waitForAppReady } from './helpers';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
  waitForSampleProjectMetadata,
} from './scripture-editor-helpers';
import { unifiedUsfmDiff } from './usfm-line-diff';
import { describeChangesOutside, getUsfmUnit } from './usfm-units';

// #region The views

/** One editable view of the Scripture editor, and how a spec gets the app into it. */
export interface EditableViewCase {
  /** Names the view in step titles and failure messages. */
  name: string;
  /** The interface mode the app is launched in. */
  interfaceMode: 'power' | 'simple';
  /**
   * What the editor's root must match once the view is showing — the positive check that the run is
   * measuring the view it names, since a wrong view would pass every byte comparison too.
   */
  rootSelector: string;
  /**
   * Whether markers are editable text in this view (Standard). A selection that crosses a marker
   * then selects the marker's own bytes too, so what a deletion across one should save differs.
   */
  areMarkersText: boolean;
}

/** Power mode's default view: markers inline as editable text, notes collapsed to callers. */
export const POWER_STANDARD_VIEW: EditableViewCase = {
  name: 'Power mode, Standard view',
  interfaceMode: 'power',
  rootSelector: '.editor-input.marker-editable',
  areMarkersText: true,
};

/** Simple mode's editable view: the paragraph-structure preset, markers hidden, a marker gutter. */
export const SIMPLE_PARAGRAPH_STRUCTURE_VIEW: EditableViewCase = {
  name: 'Simple mode, paragraph-structure view',
  interfaceMode: 'simple',
  rootSelector: '.editor-input.marker-hidden.psc-gutter-markers',
  areMarkersText: false,
};

/** The `test.use()` options a spec for a view in `view.interfaceMode` needs. */
export function noUnaskedEditsTestOptions(view: Pick<EditableViewCase, 'interfaceMode'>) {
  return {
    interfaceMode: view.interfaceMode,
    // Past first run, so Simple mode starts in the app rather than the setup wizard.
    seedSettings: view.interfaceMode === 'simple' ? { 'platform.firstRunComplete': true } : {},
    // DEV_NOISY=false keeps the normal layouts.
    electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  };
}

// #endregion

// #region Timing and keys

/** The bundled sample project the backend copies, file for file, into the isolated root. */
const BUNDLED_WEB_DIR = path.resolve(__dirname, '../../c-sharp/assets/WEB');

/** Folder the backend installs the sample project into, under the project root. */
const INSTALLED_WEB_FOLDER = 'WEB';

/**
 * How long a freshly opened chapter is left alone before checking that nothing was written. The
 * editor's save debounce is 700ms (`PDP_SAVE_DEBOUNCE_MS`); this is several of those plus the PDP's
 * own write, so a load-triggered save would have landed.
 */
const LOAD_QUIET_MS = 5_000;

/** How long a gesture's save gets to reach the disk. */
const SAVE_LANDED_TIMEOUT_MS = 30_000;

/** A file counts as settled once it has not changed for this long. */
const SETTLED_QUIET_MS = 3_000;

/**
 * How long the editor gets to pick up a selection set on the DOM before a key acts on it. Lexical
 * adopts the DOM selection on the document's `selectionchange` event, which fires asynchronously.
 */
const SELECTION_ADOPTED_MS = 300;

/** The most undo presses a gesture's undo may take before the file must be back to its bytes. */
const MAX_UNDO_PRESSES = 3;

/** The one character typed by steps 2 and 3. ASCII, so it is one byte in the file. */
const TYPED_CHARACTER = 'Q';

/** Written to the OS clipboard before a copy, so the copy's own bytes are what a poll observes. */
const CLIPBOARD_SENTINEL = 'NOUNASKEDEDITSSENTINELNOTCOPIED';

// The OS's own editing chords, spelled per platform (macOS uses Meta).
const isMac = process.platform === 'darwin';
/** The OS's copy chord. */
export const COPY_KEY = isMac ? 'Meta+C' : 'Control+C';
/** The OS's cut chord. */
export const CUT_KEY = isMac ? 'Meta+X' : 'Control+X';
/** The OS's paste chord. */
export const PASTE_KEY = isMac ? 'Meta+V' : 'Control+V';
const UNDO_KEY = isMac ? 'Meta+Z' : 'Control+Z';
const DOC_END_KEY = isMac ? 'Meta+ArrowDown' : 'Control+End';

// #endregion

// #region The chapters and gestures

/**
 * A place in the editor's text, written as text that occurs exactly once among the editor's text
 * nodes with a `|` where the caret goes: `'make the |way'` is the boundary before "way". The same
 * text, `|` removed, must occur in the book's USFM for the verse, so expectations can be computed
 * from the bytes.
 */
export type TextPoint = string;

/** What a gesture needs to act on the open editor. */
interface GestureContext {
  mainPage: Page;
  electronApp: ElectronApplication;
  editorInput: Locator;
}

/**
 * An exact expectation for one aimed verse: `[from, to]` replacements applied to the verse's text
 * as saved before the gesture. Each `from` must occur exactly once in that text.
 */
type UnitReplacements = Record<string, Array<[string, string]>>;

/** One user gesture whose save must stay inside the verses it was aimed at. */
interface LocalEdit {
  /** Step title. */
  label: string;
  /** Labels (see `splitUsfmUnits`) of the only units the gesture may change. */
  units: string[];
  /**
   * A recorded finding this gesture hits in some views, pinned exactly in place of `expected`
   * there: any other result fails, and so does the fix — remove the pin then, with the finding.
   */
  knownDeviation?: KnownDeviation;
  /** Performs the gesture on the open chapter. */
  perform(context: GestureContext): Promise<void>;
  /**
   * What the aimed verses must read after the save, for `view`, given the book as saved before the
   * gesture; `undefined` when the gesture's result in that view is only judged for locality.
   */
  expected?(view: EditableViewCase, bookBefore: string): UnitReplacements | undefined;
}

/** A finding a gesture is known to hit, and exactly what it saves while the finding stands. */
interface KnownDeviation {
  /** The finding's ID, as the data-fidelity catalog records it. */
  finding: string;
  /** One line: what is wrong. */
  summary: string;
  /** Whether `view` hits the finding. */
  applies(view: EditableViewCase): boolean;
  /** What the aimed verses read while the finding stands. */
  expected(bookBefore: string): UnitReplacements;
}

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
  /** Gestures for step 4, in order; each starts from the file the previous one left. */
  localEdits: LocalEdit[];
}

/**
 * The text before and after a {@link TextPoint}'s caret. Throws unless the point has exactly one
 * `|`, so a point whose text contains a `|` of its own (an attribute separator) fails loudly
 * instead of putting the caret in the wrong place.
 */
function splitPoint(point: TextPoint): [string, string] {
  const parts = point.split('|');
  if (parts.length !== 2)
    throw new Error(`${JSON.stringify(point)} must contain exactly one | marking the caret`);
  return [parts[0], parts[1]];
}

/** `point`, once {@link splitPoint} has confirmed it has exactly one caret. */
function checkedPoint(point: TextPoint): TextPoint {
  splitPoint(point);
  return point;
}

/** The `|`-free text of a {@link TextPoint}. */
function pointText(point: TextPoint): string {
  return splitPoint(point).join('');
}

/** `point`'s text with `inserted` at its caret. */
function insertAtPoint(point: TextPoint, inserted: string): string {
  return splitPoint(point).join(inserted);
}

/**
 * The bytes of `unitText` between two points — what a copy of that range must carry as USFM. Both
 * points must lie in `unitText`, the start before the end.
 */
function usfmBetween(unitText: string, from: TextPoint, to: TextPoint): string {
  const start = unitText.indexOf(pointText(from));
  const end = unitText.indexOf(pointText(to));
  if (start < 0 || end < 0)
    throw new Error(`Range ${from} … ${to} does not lie in ${JSON.stringify(unitText)}`);
  return unitText.slice(start + splitPoint(from)[0].length, end + splitPoint(to)[0].length);
}

/**
 * Selects from `from` to `to` (or puts the caret at `from`) by setting the DOM selection inside the
 * editor, which the editor adopts as its own. Fails when a point's text is missing or occurs more
 * than once, naming it, so an anchor that stops being unique fails loudly instead of aiming the
 * gesture somewhere else.
 */
export async function selectInEditor(editorInput: Locator, from: TextPoint, to: TextPoint = from) {
  await editorInput.evaluate(
    (root, points) => {
      // Runs in the page, so it cannot call `splitPoint`; the points were checked by it below.
      const locate = (point: string) => {
        const caret = point.indexOf('|');
        const text = point.split('|').join('');
        const hits: Array<{ node: Text; offset: number }> = [];
        const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          // SHOW_TEXT yields only Text nodes.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const textNode = node as Text;
          for (
            let at = textNode.data.indexOf(text);
            at >= 0;
            at = textNode.data.indexOf(text, at + 1)
          )
            hits.push({ node: textNode, offset: at + caret });
        }
        if (hits.length !== 1)
          throw new Error(
            `${JSON.stringify(text)} occurs ${hits.length} times in the editor's text nodes; a gesture's anchor must occur exactly once`,
          );
        return hits[0];
      };
      const start = locate(points.from);
      const end = locate(points.to);
      if (root instanceof HTMLElement) root.focus({ preventScroll: true });
      root.ownerDocument
        .getSelection()
        ?.setBaseAndExtent(start.node, start.offset, end.node, end.offset);
    },
    { from: checkedPoint(from), to: checkedPoint(to) },
  );
  await editorInput.page().waitForTimeout(SELECTION_ADOPTED_MS);
}

/** Types `text` at `point`. */
function typeAt(point: TextPoint, text: string) {
  return async ({ mainPage, editorInput }: GestureContext) => {
    await selectInEditor(editorInput, point);
    await mainPage.keyboard.type(text);
  };
}

/**
 * Puts `text` on the OS clipboard as plain text, the way another application would, and pastes it
 * at `point`.
 */
function pastePlainTextAt(point: TextPoint, text: string) {
  return async ({ electronApp, editorInput }: GestureContext) => {
    await electronApp.evaluate(({ clipboard }, plain) => clipboard.writeText(plain), text);
    await selectInEditor(editorInput, point);
    await editorInput.press(PASTE_KEY);
  };
}

/** Copies the range `from`…`to` through the OS clipboard and pastes it at `destination`. */
function copyRangeAndPasteAt(from: TextPoint, to: TextPoint, destination: TextPoint) {
  return async ({ electronApp, editorInput }: GestureContext) => {
    await electronApp.evaluate(
      ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
      CLIPBOARD_SENTINEL,
    );
    await selectInEditor(editorInput, from, to);
    await editorInput.press(COPY_KEY);
    // The copy reaches the OS clipboard asynchronously; the sentinel makes the poll measure it.
    await expect
      .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
        message: `copying ${from} … ${to} never reached the OS clipboard`,
        timeout: 15_000,
      })
      .not.toBe(CLIPBOARD_SENTINEL);
    await selectInEditor(editorInput, destination);
    await editorInput.press(PASTE_KEY);
  };
}

/** Selects `from`…`to` and deletes it with the Delete key. */
function deleteRange(from: TextPoint, to: TextPoint) {
  return async ({ editorInput }: GestureContext) => {
    await selectInEditor(editorInput, from, to);
    await editorInput.press('Delete');
  };
}

// Jonah 1:6 carries two footnotes; the typing lands in the text between them, once mid-text and
// once right after the first note (the boundary a caret can resolve into the note from).
const JONAH_TYPE_POINT = 'Maybe |your God';
const JONAH_TYPED = 'ab cd ';
const JONAH_AFTER_NOTE_POINT = '| Maybe your God';
const JONAH_AFTER_NOTE_TYPED = 'ef';
/** Jonah 1:6's first footnote and the text after it, as saved at rest. */
const JONAH_AFTER_NOTE_USFM = 'or, gods\\f* Maybe your God';

// Matthew 3's gestures. Each anchor's text occurs once in the chapter, notes included.
const MATTHEW_POETRY_POINT = 'make the |way of the Lord';
const MATTHEW_TYPED = 'zq kx ';
const MATTHEW_PASTE_POINT = 'God is able |to raise';
const MATTHEW_PASTED = 'PASTED plain words ';
// 3:3: the end of the last poetry line, right before its cross reference.
const BEFORE_XREF_POINT = 'paths straight!”|';
const BEFORE_XREF_TYPED = 'gh';
/** Matthew 3:3's last poetry line and the start of its cross reference, as saved at rest. */
const BEFORE_XREF_USFM = 'paths straight!”\\x + ';
// 3:15: inside the `\wj` span.
const INSIDE_WJ_POINT = 'the fitting |way for us';
const INSIDE_WJ_TYPED = 'mn op ';
// 3:15: from before "him, " across the whole `\wj` span to after " Then ".
const WJ_COPY_FROM = 'said to |him, ';
const WJ_COPY_TO = ' Then |he allowed';
const WJ_PASTE_POINT = 'the water: |and behold';
// 3:13: from "Galilee" across the footnote after "Jordan" to the end of " to John".
const NOTE_COPY_FROM = 'from |Galilee to the';
const NOTE_COPY_TO = ' to John|, to be';
const NOTE_PASTE_POINT = 'saying, |“I need';
// 3:15: from before "him, " into the `\wj` span, through "“Allow ".
const WJ_DELETE_FROM = 'said to |him, ';
const WJ_DELETE_TO = '“Allow |it now';

/** Matthew 3:15's text from the start of the delete range through the first word it keeps. */
const WJ_DELETE_SPAN_USFM = 'said to him, \\wj “Allow it now';
/** Matthew 3:15's `\wj` closer and the text after it. */
const WJ_CLOSER_USFM = 'righteousness.”\\wj* Then';

/**
 * The exact expectation for typing `typed` at `point` in `unit`: the bytes appear there, nothing
 * else.
 */
function typingExpectation(unit: string, point: TextPoint, typed: string): UnitReplacements {
  return { [unit]: [[pointText(point), insertAtPoint(point, typed)]] };
}

/**
 * The copy-and-paste gestures' exact expectation: the destination verse gains the source range's
 * USFM bytes at the paste point, character span or footnote included. `transformCopied` rewrites
 * those bytes for a {@link KnownDeviation} pin.
 */
function copyPasteExpectation(
  destinationUnit: string,
  bookBefore: string,
  sourceUnit: string,
  from: TextPoint,
  to: TextPoint,
  destination: TextPoint,
  transformCopied: (copied: string) => string = (copied) => copied,
): UnitReplacements {
  const source = getUsfmUnit(bookBefore, sourceUnit);
  if (source === undefined) throw new Error(`The book has no unit ${sourceUnit}`);
  return {
    [destinationUnit]: [
      [
        pointText(destination),
        insertAtPoint(destination, transformCopied(usfmBetween(source, from, to))),
      ],
    ],
  };
}

const CHAPTERS: ChapterCase[] = [
  {
    label: 'Jonah 1 — book header, paragraphs and footnotes',
    reference: 'Jonah 1:1',
    chapterNum: 1,
    bookFile: '32JONengWEBUS.SFM',
    renderedText: 'three days and three nights',
    localEdits: [
      {
        label: 'typing with a space between two footnotes (1:6)',
        units: ['1:6'],
        perform: typeAt(JONAH_TYPE_POINT, JONAH_TYPED),
        expected: () => typingExpectation('1:6', JONAH_TYPE_POINT, JONAH_TYPED),
      },
      {
        label: 'typing right after a footnote (1:6)',
        units: ['1:6'],
        perform: typeAt(JONAH_AFTER_NOTE_POINT, JONAH_AFTER_NOTE_TYPED),
        expected: () => ({
          '1:6': [
            [
              JONAH_AFTER_NOTE_USFM,
              JONAH_AFTER_NOTE_USFM.replace('\\f*', `\\f*${JONAH_AFTER_NOTE_TYPED}`),
            ],
          ],
        }),
      },
    ],
  },
  {
    label: 'Matthew 3 — poetry, cross reference, footnotes and a \\wj span',
    reference: 'Matthew 3:1',
    chapterNum: 3,
    bookFile: '41MATengWEBUS.SFM',
    renderedText: 'with whom I am well pleased',
    localEdits: [
      {
        label: 'typing with a space mid-verse in a poetry line (3:3)',
        units: ['3:3'],
        perform: typeAt(MATTHEW_POETRY_POINT, MATTHEW_TYPED),
        expected: () => typingExpectation('3:3', MATTHEW_POETRY_POINT, MATTHEW_TYPED),
      },
      {
        label: 'typing at the end of a poetry line, right before its cross reference (3:3)',
        units: ['3:3'],
        perform: typeAt(BEFORE_XREF_POINT, BEFORE_XREF_TYPED),
        expected: () => ({
          '3:3': [[BEFORE_XREF_USFM, BEFORE_XREF_USFM.replace('”', `”${BEFORE_XREF_TYPED}`)]],
        }),
      },
      {
        label: 'pasting plain text from the OS clipboard mid-verse (3:9)',
        units: ['3:9'],
        perform: pastePlainTextAt(MATTHEW_PASTE_POINT, MATTHEW_PASTED),
        expected: () => typingExpectation('3:9', MATTHEW_PASTE_POINT, MATTHEW_PASTED),
      },
      {
        label: 'typing with a space inside the \\wj span (3:15)',
        units: ['3:15'],
        perform: typeAt(INSIDE_WJ_POINT, INSIDE_WJ_TYPED),
        expected: () => typingExpectation('3:15', INSIDE_WJ_POINT, INSIDE_WJ_TYPED),
      },
      {
        label: 'copying a range holding a \\wj span (3:15) and pasting it into 3:16',
        units: ['3:16'],
        perform: copyRangeAndPasteAt(WJ_COPY_FROM, WJ_COPY_TO, WJ_PASTE_POINT),
        expected: (_view, bookBefore) =>
          copyPasteExpectation(
            '3:16',
            bookBefore,
            '3:15',
            WJ_COPY_FROM,
            WJ_COPY_TO,
            WJ_PASTE_POINT,
          ),
      },
      {
        label: 'copying a range holding a footnote (3:13) and pasting it into 3:14',
        units: ['3:14'],
        perform: copyRangeAndPasteAt(NOTE_COPY_FROM, NOTE_COPY_TO, NOTE_PASTE_POINT),
        expected: (_view, bookBefore) =>
          copyPasteExpectation(
            '3:14',
            bookBefore,
            '3:13',
            NOTE_COPY_FROM,
            NOTE_COPY_TO,
            NOTE_PASTE_POINT,
          ),
      },
      {
        label: 'deleting a selection that runs into the \\wj span (3:15)',
        units: ['3:15'],
        // Hidden markers: the selection holds text only, so the opener stays and the span keeps
        // its remaining words. Standard: the selection holds the opener's glyph too, so its bytes
        // go — and only its bytes: the closer was not selected, so it stays.
        // Standard view removing the unselected closer as well is a known deviation from Paratext 9,
        // which keeps the closer as an unmatched marker; its status and ruling are catalog row EV-2
        // in `Scripture-Data-Fidelity-Catalog.md`. A change that keeps the closer fails this pin;
        // remove the pin then.
        knownDeviation: {
          finding: 'EV-2',
          summary:
            "Standard view: deleting a selection that holds a char opener also deletes the span's unselected closer (`$charNodeDeletionTransform` unwraps the span)",
          applies: (view) => view.areMarkersText,
          expected: () => ({
            '3:15': [
              [WJ_DELETE_SPAN_USFM, 'said to it now'],
              [WJ_CLOSER_USFM, WJ_CLOSER_USFM.replace('\\wj*', '')],
            ],
          }),
        },
        perform: deleteRange(WJ_DELETE_FROM, WJ_DELETE_TO),
        expected: (view) => ({
          '3:15': [
            [WJ_DELETE_SPAN_USFM, view.areMarkersText ? 'said to it now' : 'said to \\wj it now'],
          ],
        }),
      },
    ],
  },
];

// #endregion

// #region Byte comparison

/**
 * The installed LF-only book file as the app leaves it after its first save of `chapterNum` — the
 * known first-save normalization, pinned exactly:
 *
 * - **Every line of the book, in every chapter, gets a CRLF line ending.** `PutText` writes the whole
 *   book file with CRLF, so the first save of one chapter rewrites every line of a book stored with
 *   LF endings — chapters the user never opened included. Content is unchanged. Catalog row E-1.
 * - **Within the saved chapter only, hand-authored whitespace is regularized**: trailing spaces at a
 *   line end are dropped (the WEB's `\c 1` line and most verse lines end in spaces) and runs of
 *   spaces collapse to one (the WEB puts two spaces between a footnote's `\fr 1:1` and its `\ft`),
 *   and a line holding nothing but spaces goes altogether (Tobit's `\c 1` is followed by one).
 *   ParatextData's `NormalizeUsfm`/`RegularizeSpaces` on the USX → USFM leg; catalog row S-2.
 *   Chapter 1's save spans the book header too.
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
      .flatMap((line, index) => {
        if (index < start || index >= end) return [line];
        const normalized = line.replace(/ +$/, '').replace(/ {2,}/g, ' ');
        // The last element is what follows the file's final line break, not a line.
        return normalized === '' && index < lines.length - 1 ? [] : [normalized];
      })
      .join('\r\n'),
    'utf8',
  );
}

export function installedBookPath(bookFile: string): string {
  return path.join(requireIsolatedProjectRoot(), INSTALLED_WEB_FOLDER, bookFile);
}

/**
 * Each chapter's book file as installed, by file name. Fails unless each is the bundled copy, so
 * the capture is the form under test and not something the app already rewrote.
 */
function captureInstalledBooks(
  chapters: ReadonlyArray<Pick<ChapterCase, 'bookFile'>> = CHAPTERS,
): Map<string, Buffer> {
  return new Map(
    chapters.map((chapter) => {
      const installed = fs.readFileSync(installedBookPath(chapter.bookFile));
      expect(
        installed.equals(fs.readFileSync(path.join(BUNDLED_WEB_DIR, chapter.bookFile))),
        `${chapter.bookFile} in the isolated root should be the bundled copy`,
      ).toBe(true);
      return [chapter.bookFile, installed];
    }),
  );
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

/** Attaches both versions of a book to the report whole, for triage beyond what a diff shows. */
async function attachBoth(
  bookFile: string,
  first: Buffer,
  second: Buffer,
  firstLabel: string,
  secondLabel: string,
): Promise<void> {
  await test.info().attach(`${bookFile}.${firstLabel}`, { body: first, contentType: 'text/plain' });
  await test
    .info()
    .attach(`${bookFile}.${secondLabel}`, { body: second, contentType: 'text/plain' });
}

/**
 * Soft-asserts the two are byte-identical. On a mismatch, the message carries the diff and both
 * files are attached to the report whole.
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
  if (drift) await attachBoth(bookFile, expected, actual, expectedLabel, actualLabel);
  expect.soft(drift, message).toBe('');
}

/**
 * Soft-asserts that `after` differs from `before` only inside `units`, naming every other unit that
 * moved.
 */
async function expectChangesOnlyIn(
  bookFile: string,
  before: Buffer,
  after: Buffer,
  units: readonly string[],
  beforeLabel: string,
  afterLabel: string,
  message: string,
): Promise<void> {
  const stray = describeChangesOutside(before.toString('utf8'), after.toString('utf8'), units);
  if (stray) await attachBoth(bookFile, before, after, beforeLabel, afterLabel);
  expect.soft(stray, message).toBe('');
}

/**
 * Waits until the file's bytes stop matching `previous` — a save reached the disk — and then until
 * they have held still for {@link SETTLED_QUIET_MS}, so a second write still in flight is not
 * missed. Returns the settled bytes, or `undefined` if no write landed within the timeout.
 */
export async function waitForSaveToSettle(
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

// #endregion

// #region Steps

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
  await editorInput.press(DOC_END_KEY);
  await mainPage.keyboard.type(TYPED_CHARACTER);
  const afterEdit = await waitForSaveToSettle(mainPage, bookPath, before);
  if (!afterEdit)
    throw new Error(
      `${chapter.bookFile}: typing "${TYPED_CHARACTER}" in ${chapter.reference} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`,
    );

  await editorInput.press(UNDO_KEY);
  const afterUndo = await waitForSaveToSettle(mainPage, bookPath, afterEdit);
  return { afterEdit, afterUndo };
}

/** Steps 1–3: loading writes nothing; the first save normalizes exactly; at rest, undo is exact. */
async function runLoadAndUndoSteps(
  mainPage: Page,
  editorInput: Locator,
  chapter: ChapterCase,
  installed: Buffer,
): Promise<Buffer> {
  const bookPath = installedBookPath(chapter.bookFile);
  const installedMtimeMs = fs.statSync(bookPath).mtimeMs;

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

/**
 * Step 4 for one gesture: perform it, check its save stayed inside the aimed verses (and reads as
 * expected, where that is unambiguous), then undo until the file is back to its bytes. Returns the
 * file as the gesture's undo left it.
 */
async function runLocalEdit(
  context: GestureContext,
  view: EditableViewCase,
  chapter: ChapterCase,
  edit: LocalEdit,
  before: Buffer,
): Promise<Buffer> {
  const { mainPage, editorInput } = context;
  const bookPath = installedBookPath(chapter.bookFile);
  const where = `${chapter.bookFile} (${view.name}): ${edit.label}`;

  const startedAt = Date.now();
  await edit.perform(context);
  const performedAt = Date.now();
  const afterEdit = await waitForSaveToSettle(mainPage, bookPath, before);
  const savedAt = Date.now();
  if (!afterEdit) {
    expect
      .soft(afterEdit, `${where} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`)
      .toBeDefined();
    return before;
  }

  await expectChangesOnlyIn(
    chapter.bookFile,
    before,
    afterEdit,
    edit.units,
    'before-gesture',
    'after-gesture',
    `${where} changed text outside ${edit.units.join(', ')}`,
  );

  const beforeText = before.toString('utf8');
  // What the gesture saved, for triage and the report whether or not an expectation judges it.
  edit.units.forEach((unit) =>
    test.info().annotations.push({
      type: 'saved',
      description: `${where}: ${unit} = ${JSON.stringify(getUsfmUnit(afterEdit.toString('utf8'), unit))}`,
    }),
  );
  const deviation = edit.knownDeviation?.applies(view) ? edit.knownDeviation : undefined;
  if (deviation)
    test.info().annotations.push({
      type: 'known deviation',
      description: `${where}: ${deviation.finding} — ${deviation.summary}`,
    });
  const expectation = deviation
    ? deviation.expected(beforeText)
    : edit.expected?.(view, beforeText);
  Object.entries(expectation ?? {}).forEach(([unit, replacements]) => {
    const unitBefore = getUsfmUnit(beforeText, unit);
    if (unitBefore === undefined) throw new Error(`${where}: the book has no unit ${unit}`);
    const expectedUnit = replacements.reduce((text, [from, to]) => {
      if (text.split(from).length !== 2)
        throw new Error(`${where}: ${JSON.stringify(from)} does not occur exactly once in ${unit}`);
      return text.replace(from, to);
    }, unitBefore);
    expect
      .soft(
        getUsfmUnit(afterEdit.toString('utf8'), unit),
        deviation
          ? `${where}: ${unit} no longer reads as finding ${deviation.finding} pins it (${deviation.summary}); if it now reads as the gesture implies, the finding is fixed — remove the pin`
          : `${where}: ${unit} does not read as the gesture implies`,
      )
      .toBe(expectedUnit);
  });

  // Undo until the file is back to its bytes; each intermediate save must stay local too.
  let current = afterEdit;
  let presses = 0;
  // Sequential: each press waits for its own save before deciding whether another is needed.
  /* eslint-disable no-await-in-loop */
  while (!current.equals(before) && presses < MAX_UNDO_PRESSES) {
    await editorInput.press(UNDO_KEY);
    presses += 1;
    const next = await waitForSaveToSettle(mainPage, bookPath, current);
    if (!next) break;
    current = next;
    await expectChangesOnlyIn(
      chapter.bookFile,
      before,
      current,
      edit.units,
      'before-gesture',
      `after-undo-${presses}`,
      `${where}: undo press ${presses} changed text outside ${edit.units.join(', ')}`,
    );
  }
  /* eslint-enable no-await-in-loop */
  test.info().annotations.push({
    type: 'timing',
    description: `${where}: gesture ${performedAt - startedAt}ms, its save settled ${savedAt - performedAt}ms later, ${presses} undo press(es) settled ${Date.now() - savedAt}ms later`,
  });
  await expectSameBytes(
    chapter.bookFile,
    before,
    current,
    'before-gesture',
    'after-undo',
    `${where}: ${presses} undo press(es) did not restore the file byte for byte`,
  );
  return current;
}

// #endregion

/**
 * The whole test body for one view: launch-state gates, open the editor in `view`, then steps 1–4
 * for each chapter, then a final check that nothing reached a book after its step finished.
 */
export async function runNoUnaskedEdits(
  { mainPage, electronApp }: { mainPage: Page; electronApp: ElectronApplication },
  view: EditableViewCase,
): Promise<void> {
  // Heavy isolated test: its own Electron instance, then two chapters each waiting out several
  // save debounces and disk settles per gesture. `setTimeout` replaces the budget outright.
  test.setTimeout(900_000);

  if (view.interfaceMode === 'power') await waitForHomeTab(mainPage);
  // Simple mode's layout has no Home tab; this also suppresses the onboarding tour.
  else await waitForAppReady(mainPage);
  await makeSampleProjectEditableExpectingOnlyThat();

  // Capture every book file before any editor is opened.
  const installedBooks = captureInstalledBooks();

  const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
  const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
  await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
  // `.first()`: a footnote popover renders an editor input of its own.
  const editorInput = editorFrame.locator('.editor-input').first();
  const context: GestureContext = { mainPage, electronApp, editorInput };

  const settledBooks = new Map<string, Buffer>();
  const runChapter = (chapter: ChapterCase) =>
    test.step(`${view.name}: ${chapter.label}`, async () => {
      const installed = installedBooks.get(chapter.bookFile);
      if (!installed) throw new Error(`No capture for ${chapter.bookFile}`);

      await navigateToolbarBcv(mainPage, chapter.reference);
      await expect(editorInput).toContainText(chapter.renderedText, { timeout: 60_000 });
      // The positive view check: the bytes below are this view's, not some other view's.
      await expect
        .poll(
          () => editorInput.evaluate((root, selector) => root.matches(selector), view.rootSelector),
          {
            message: `the editor should be showing ${view.name} (${view.rootSelector})`,
            timeout: 30_000,
          },
        )
        .toBe(true);

      const atRest = await test.step('loading writes nothing; first save; at rest', () =>
        runLoadAndUndoSteps(mainPage, editorInput, chapter, installed));
      // Chained, not concurrent: each gesture starts from the file the previous one left.
      const settled = await chapter.localEdits.reduce(async (previous, edit) => {
        const before = await previous;
        return test.step(edit.label, () => runLocalEdit(context, view, chapter, edit, before));
      }, Promise.resolve(atRest));
      settledBooks.set(chapter.bookFile, settled);
    });
  await runChapter(CHAPTERS[0]);
  await runChapter(CHAPTERS[1]);

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
}

// #region Power mode's read-only Preview

/** The tab title's suffix for a read-only text (`%webView_platformScriptureEditor_title_format%`). */
const READ_ONLY_TITLE = '(Read-only)';

/** Power mode's chord that switches between Standard view and Preview (Control on macOS too). */
const VIEW_TOGGLE_KEY = 'Control+e';

/** Jonah 2, visited between Jonah 1 and Matthew 3 so the run moves by chapter as well as by book. */
const JONAH_2 = { reference: 'Jonah 2:1', renderedText: 'the bottoms of the mountains' };

/** A range the Preview run copies, and text the copy must carry so the run knows it happened. */
interface PreviewCopy {
  from: TextPoint;
  to: TextPoint;
  copied: string;
}

/** One chapter of the Preview run: {@link CHAPTERS}' chapter, and the ranges copied in it. */
interface PreviewChapterCase {
  chapter: ChapterCase;
  /** Plain text first, then a range across a footnote or a character span. */
  copies: [PreviewCopy, PreviewCopy];
}

const PREVIEW_CHAPTERS: PreviewChapterCase[] = [
  {
    chapter: CHAPTERS[0],
    copies: [
      { from: 'went down to |Joppa', to: 'found a ship| going', copied: 'Joppa, and found a ship' },
      // 1:6, across its first footnote.
      { from: 'call on |your God', to: 'Maybe your God|', copied: 'Maybe your God' },
    ],
  },
  {
    chapter: CHAPTERS[1],
    copies: [
      { from: NOTE_COPY_FROM, to: NOTE_COPY_TO, copied: 'Galilee to the Jordan' },
      { from: WJ_COPY_FROM, to: WJ_COPY_TO, copied: 'Allow it now' },
    ],
  },
];

/** Every file of the installed project, by path relative to its folder. */
type ProjectSnapshot = Map<string, { bytes: Buffer; mtimeMs: number }>;

function snapshotInstalledProject(): ProjectSnapshot {
  const projectDir = path.join(requireIsolatedProjectRoot(), INSTALLED_WEB_FOLDER);
  const snapshot: ProjectSnapshot = new Map();
  const walk = (dir: string) =>
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile())
        snapshot.set(path.relative(projectDir, fullPath), {
          bytes: fs.readFileSync(fullPath),
          mtimeMs: fs.statSync(fullPath).mtimeMs,
        });
    });
  walk(projectDir);
  return snapshot;
}

function isSameSnapshot(first: ProjectSnapshot, second: ProjectSnapshot): boolean {
  return (
    first.size === second.size &&
    [...first].every(([file, { bytes, mtimeMs }]) => {
      const other = second.get(file);
      return !!other && other.mtimeMs === mtimeMs && other.bytes.equals(bytes);
    })
  );
}

/** The longest a run waits for the project to go quiet before taking a baseline. */
const PROJECT_SETTLE_TIMEOUT_MS = 60_000;

/**
 * The installed project once no file of it has changed for {@link LOAD_QUIET_MS}: for a baseline
 * taken after an edit, whose save can be followed by a second write still in flight.
 */
async function snapshotSettledProject(page: Page): Promise<ProjectSnapshot> {
  const deadline = Date.now() + PROJECT_SETTLE_TIMEOUT_MS;
  let current = snapshotInstalledProject();
  let quietSince = Date.now();
  // Sequential polling of the folder: each snapshot decides whether to take another.
  /* eslint-disable no-await-in-loop */
  while (Date.now() - quietSince < LOAD_QUIET_MS) {
    if (Date.now() > deadline)
      throw new Error(
        `The installed project kept changing for ${PROJECT_SETTLE_TIMEOUT_MS}ms before the editor opened`,
      );
    await page.waitForTimeout(250);
    const next = snapshotInstalledProject();
    if (!isSameSnapshot(current, next)) {
      current = next;
      quietSince = Date.now();
    }
  }
  /* eslint-enable no-await-in-loop */
  return current;
}

/**
 * Soft-asserts that no file of the installed project was added, removed, rewritten or touched since
 * `before` was taken, naming each one that was; a changed file's diff is in the message and both
 * versions are attached to the report. `exceptFiles`, paths relative to the project folder, are
 * left out: a caller that expects those files to change judges them on its own.
 */
async function expectProjectUnchanged(
  before: ProjectSnapshot,
  when: string,
  exceptFiles: readonly string[] = [],
): Promise<void> {
  const after = snapshotInstalledProject();
  const changes: string[] = [];
  await Promise.all(
    [...before].map(async ([file, { bytes, mtimeMs }]) => {
      if (exceptFiles.includes(file)) return;
      const now = after.get(file);
      if (!now) changes.push(`${file}: removed`);
      else if (!now.bytes.equals(bytes)) {
        await attachBoth(file, bytes, now.bytes, 'before', when);
        changes.push(`${file}: changed\n${describeByteDrift(bytes, now.bytes, 'before', when)}`);
      } else if (now.mtimeMs !== mtimeMs)
        changes.push(`${file}: rewritten with the same bytes (modification time moved)`);
    }),
  );
  [...after.keys()]
    .filter((file) => !before.has(file) && !exceptFiles.includes(file))
    .forEach((file) => changes.push(`${file}: added`));
  expect.soft(changes.sort().join('\n\n'), `${when} wrote to the project`).toBe('');
}

/** The project settings file, the one file making the project editable saves. */
const SETTINGS_FILE = 'Settings.xml';

/** Where ParatextData keeps the settings file a save replaced. */
const SETTINGS_BACKUP_FILE = `${SETTINGS_FILE}.BAK`;

/** Every file of the bundled sample project, by name. */
function readBundledProject(): Map<string, Buffer> {
  return new Map(
    fs
      .readdirSync(BUNDLED_WEB_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => [entry.name, fs.readFileSync(path.join(BUNDLED_WEB_DIR, entry.name))]),
  );
}

/**
 * The bundled settings file as ParatextData saves it once the project is editable: the editable
 * flag set, and every line break written as CRLF where the bundled file has LF.
 */
function editableSettings(bundledSettings: Buffer): Buffer {
  const text = bundledSettings.toString('utf8');
  if (!text.includes('<Editable>F</Editable>'))
    throw new Error(`The bundled ${SETTINGS_FILE} should say the project is not editable`);
  return Buffer.from(
    text.replace(/\r?\n/g, '\r\n').replace('<Editable>F</Editable>', '<Editable>T</Editable>'),
    'utf8',
  );
}

/**
 * Soft-asserts that each file in `expected` has exactly those bytes in the installed project,
 * naming each one that does not; with `andNoOtherFiles`, also names every installed file not in
 * it.
 */
async function expectInstalledBytes(
  expected: ReadonlyMap<string, Buffer>,
  when: string,
  andNoOtherFiles: boolean,
): Promise<void> {
  const installed = snapshotInstalledProject();
  const changes: string[] = [];
  await Promise.all(
    [...expected].map(async ([file, bytes]) => {
      const now = installed.get(file);
      if (!now) changes.push(`${file}: missing`);
      else if (!now.bytes.equals(bytes)) {
        await attachBoth(file, bytes, now.bytes, 'expected', when);
        changes.push(`${file}: differs\n${describeByteDrift(bytes, now.bytes, 'expected', when)}`);
      }
    }),
  );
  if (andNoOtherFiles)
    [...installed.keys()]
      .filter((file) => !expected.has(file))
      .forEach((file) => changes.push(`${file}: added`));
  expect.soft(changes.sort().join('\n\n'), `${when}: the project is not as expected`).toBe('');
}

/**
 * Makes the installed sample editable, checking that the app wrote nothing else to it, and returns
 * the project as that left it — the baseline for a run, taken straight away.
 *
 * The backend installs the sample as a byte-for-byte copy of the bundled one, so until it is made
 * editable every file must still have the bundled bytes: any difference is a write the app made by
 * itself while starting. One that lands later shows up in the Preview run, which compares the whole
 * project with this baseline after every step. Making it editable is one save of the settings file,
 * which keeps the file it replaced as a `.BAK`; every other file keeps its bytes and its
 * modification time.
 */
async function makeSampleProjectEditableExpectingOnlyThat(): Promise<ProjectSnapshot> {
  await waitForSampleProjectMetadata();
  const bundled = readBundledProject();
  const bundledSettings = bundled.get(SETTINGS_FILE);
  if (!bundledSettings) throw new Error(`The bundled sample has no ${SETTINGS_FILE}`);
  await expectInstalledBytes(bundled, 'after the app started', true);

  const beforeEditable = snapshotInstalledProject();
  await makeSampleProjectEditable();
  await expectProjectUnchanged(beforeEditable, 'making the project editable', [
    SETTINGS_FILE,
    SETTINGS_BACKUP_FILE,
  ]);
  await expectInstalledBytes(
    new Map([
      [SETTINGS_FILE, editableSettings(bundledSettings)],
      [SETTINGS_BACKUP_FILE, bundledSettings],
    ]),
    'after making the project editable',
    false,
  );
  return snapshotInstalledProject();
}

/**
 * The Preview run's whole test body: Power mode's formatted view is a read-only Preview, and no
 * gesture made in it — reading, navigating, scrolling, clicking, selecting, copying, opening a
 * footnote from its caller, switching to Standard view and back, or trying to edit — writes
 * anything to the project. After every step, every file of the installed project must have the
 * bytes and the modification time it had before the editor opened, and the attempted edits must
 * leave the editor's text as it was.
 */
export async function runPreviewWritesNothing({
  mainPage,
  electronApp,
}: {
  mainPage: Page;
  electronApp: ElectronApplication;
}): Promise<void> {
  // Heavy isolated test: its own Electron instance, then several quiet waits per chapter.
  test.setTimeout(600_000);

  await waitForHomeTab(mainPage);
  // Editable, so Preview is read-only because of the view and not because of the project.
  const before = await makeSampleProjectEditableExpectingOnlyThat();
  captureInstalledBooks();

  const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID, {
    editorOptions: { viewType: 'formatted' },
  });
  const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
  await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
  // `.first()`: a footnotes pane row renders an editor input of its own.
  const editorInput = editorFrame.locator('.editor-input').first();
  // `data-web-view-id` is on `.platform-tab-title` (`platform-tab-title.component.tsx`).
  const tabTitle = mainPage.locator(`.platform-tab-title[data-web-view-id="${editorId}"]`);
  const footnotesPane = editorFrame.locator('[data-footnotes-pane]');
  // The footnote editor popover is the one pop-up that holds an editor of its own.
  const footnotePopover = editorFrame
    .locator('[data-slot="popover-content"]')
    .filter({ has: editorFrame.locator('.editor-input') });

  /** The positive view check: the run is measuring Preview, read-only, and not some other view. */
  const expectPreview = async () => {
    await expect(editorInput).toHaveClass(/\bmarker-hidden\b/, { timeout: 20_000 });
    await expect(editorInput).toHaveAttribute('contenteditable', 'false');
    await expect(tabTitle).toContainText(READ_ONLY_TITLE, { timeout: 20_000 });
  };
  const goTo = async (reference: string, renderedText: string) => {
    await navigateToolbarBcv(mainPage, reference);
    await expect(editorInput).toContainText(renderedText, { timeout: 60_000 });
  };
  const clickText = (text: string) => editorInput.getByText(text, { exact: false }).first().click();

  const runChapter = ({ chapter, copies }: PreviewChapterCase) =>
    test.step(`Preview: ${chapter.label}`, async () => {
      await goTo(chapter.reference, chapter.renderedText);
      await expectPreview();
      await mainPage.waitForTimeout(LOAD_QUIET_MS);
      await expectProjectUnchanged(before, `opening ${chapter.reference}`);

      await test.step('scrolling, clicking, selecting and copying', async () => {
        await editorInput.hover();
        await mainPage.mouse.wheel(0, 3_000);
        await mainPage.waitForTimeout(SELECTION_ADOPTED_MS);
        await mainPage.mouse.wheel(0, -3_000);
        await clickText(chapter.renderedText);
        await editorInput.getByText(chapter.renderedText, { exact: false }).first().dblclick();
        // Chained, not concurrent: each copy must land on the clipboard before the next one.
        await copies.reduce(async (previous, copy) => {
          await previous;
          await electronApp.evaluate(
            ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
            CLIPBOARD_SENTINEL,
          );
          await selectInEditor(editorInput, copy.from, copy.to);
          await mainPage.keyboard.press(COPY_KEY);
          await expect
            .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
              message: `copying ${copy.from} … ${copy.to} in Preview never reached the OS clipboard`,
              timeout: 15_000,
            })
            .toContain(copy.copied);
        }, Promise.resolve());
        await mainPage.waitForTimeout(LOAD_QUIET_MS);
        await expectProjectUnchanged(
          before,
          `scrolling, clicking, selecting and copying in ${chapter.reference}`,
        );
      });

      await test.step('a footnote caller opens its note in the footnotes pane', async () => {
        // Power mode shows the pane by itself for a chapter with notes; hide it so the caller's
        // click is what shows it.
        if ((await footnotesPane.count()) > 0)
          await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
        await expect(footnotesPane).toHaveCount(0, { timeout: 20_000 });
        await editorFrame.locator(TEXT_NOTE_CALLER_SELECTOR).first().click();
        await expect(footnotesPane).toHaveCount(1, { timeout: 20_000 });
        await expect(footnotesPane.locator('[role="option"][aria-selected="true"]')).toHaveCount(
          1,
          { timeout: 20_000 },
        );
        await expect(footnotePopover).toHaveCount(0);
        await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
        await expect(footnotesPane).toHaveCount(0, { timeout: 20_000 });
        await mainPage.waitForTimeout(LOAD_QUIET_MS);
        await expectProjectUnchanged(before, `opening a footnote in ${chapter.reference}`);
      });

      await test.step('trying to edit changes nothing', async () => {
        await clickText(chapter.renderedText);
        const textBefore = await editorInput.textContent();
        // Each attempt would change the text on its own if it took, so no two can cancel out.
        await selectInEditor(editorInput, copies[1].from, copies[1].to);
        await mainPage.keyboard.press('Delete');
        await clickText(chapter.renderedText);
        await mainPage.keyboard.press('Backspace');
        await mainPage.keyboard.press('Enter');
        await mainPage.keyboard.type(TYPED_CHARACTER);
        await electronApp.evaluate(
          ({ clipboard }, plain) => clipboard.writeText(plain),
          MATTHEW_PASTED,
        );
        await mainPage.keyboard.press(PASTE_KEY);
        // Past the save debounce and the PDP's write, as for a freshly opened chapter.
        await mainPage.waitForTimeout(LOAD_QUIET_MS);
        expect
          .soft(
            await editorInput.textContent(),
            `${chapter.reference}: Delete, Backspace, Enter, typing or pasting changed Preview's text`,
          )
          .toBe(textBefore);
        await expectPreview();
        await expectProjectUnchanged(before, `trying to edit ${chapter.reference}`);
      });
    });

  await runChapter(PREVIEW_CHAPTERS[0]);

  await test.step('Preview: to Jonah 2 and back by chapter', async () => {
    await goTo(JONAH_2.reference, JONAH_2.renderedText);
    await goTo(PREVIEW_CHAPTERS[0].chapter.reference, PREVIEW_CHAPTERS[0].chapter.renderedText);
    await expectPreview();
    await mainPage.waitForTimeout(LOAD_QUIET_MS);
    await expectProjectUnchanged(before, 'moving to Jonah 2 and back');
  });

  await runChapter(PREVIEW_CHAPTERS[1]);

  await test.step('Preview: to Standard view and back', async () => {
    const { renderedText } = PREVIEW_CHAPTERS[1].chapter;
    await clickText(renderedText);
    await mainPage.keyboard.press(VIEW_TOGGLE_KEY);
    await expect(editorInput).toHaveClass(/\bmarker-editable\b/, { timeout: 20_000 });
    await expect(editorInput).toHaveAttribute('contenteditable', 'true');
    await mainPage.waitForTimeout(LOAD_QUIET_MS);
    await expectProjectUnchanged(before, 'switching to Standard view');
    await clickText(renderedText);
    await mainPage.keyboard.press(VIEW_TOGGLE_KEY);
    await expectPreview();
    await mainPage.waitForTimeout(LOAD_QUIET_MS);
    await expectProjectUnchanged(before, 'switching back to Preview');
  });
}

// #endregion

// #region The footnotes pane's row editor

/** How a row-editing session is left — each of the ways the user can move on from a note. */
type RowLeave = 'Escape' | 'clicking the text' | 'closing the pane';

/** One footnote the pane run edits in its row editor. */
interface FootnoteRowCase {
  /** Step title. */
  label: string;
  /**
   * Text that occurs in this footnote and nowhere else in its book, clear of every point this run
   * types or pastes at so it still matches after each edit. It picks the note's pane row, and the
   * note's bytes in the book are the `\f …\f*` run around it.
   */
  anchor: string;
  /** Where typing goes, inside the note's `\ft` text; unique in the row editor and in the note. */
  typePoint: TextPoint;
  /** How the no-change session, the typing and its deletion are each left. */
  leaves: { unchanged: RowLeave; typed: RowLeave; deleted: RowLeave };
  /** A range of the note's own `\ft` text copied and pasted back at `destination`, in the row. */
  copyPaste?: { from: TextPoint; to: TextPoint; destination: TextPoint };
}

interface FootnoteChapterCase {
  /** Step title. */
  label: string;
  /** English reference for the toolbar navigation. */
  reference: string;
  /** The chapter the editor saves. */
  chapterNum: number;
  /** The book's file name in the WEB project. */
  bookFile: string;
  /** Text near the end of the chapter, proving the chapter's own content has rendered. */
  renderedText: string;
  /**
   * A place in the Scripture text, away from any note caller: the first save of the chapter is made
   * here, and a click here is how a row-editing session is left by clicking the text.
   */
  textPoint: TextPoint;
  notes: FootnoteRowCase[];
}

/**
 * The footnotes {@link runFootnotesPaneRowEdits} edits. The WEB sample has no no-break space (`~`)
 * anywhere, so none of them carries one.
 */
const FOOTNOTE_CHAPTERS: FootnoteChapterCase[] = [
  {
    label: 'Matthew 4 — footnotes beside a \\wj span and ending in a space',
    reference: 'Matthew 4:1',
    chapterNum: 4,
    bookFile: '41MATengWEBUS.SFM',
    renderedText: 'from beyond the Jordan followed him',
    textPoint: 'casting a |net into',
    notes: [
      {
        // 4:10: `\wj “Get behind me,\wj*\f + … \f* \wj Satan!` — the note sits between two spans.
        label: 'the 4:10 footnote, between two \\wj spans',
        anchor: 'instead of “Get behind me”',
        typePoint: 'read “Go |away”',
        leaves: { unchanged: 'Escape', typed: 'Escape', deleted: 'clicking the text' },
        copyPaste: { from: 'away” |instead', to: 'instead |of', destination: 'instead |of' },
      },
      {
        // 4:18: `\ft TR reads “Jesus” instead of “he” \f*` — a space before the closer.
        label: 'the 4:18 footnote, whose text ends in a space',
        anchor: 'instead of “he”',
        typePoint: 'TR reads |“Jesus”',
        leaves: { unchanged: 'clicking the text', typed: 'clicking the text', deleted: 'Escape' },
      },
    ],
  },
  {
    // A book without a leading number: the toolbar's match row runs a numbered book's reference
    // into its book code (`2 Thessalonians 2:12TH`), which `navigateToolbarBcv` cannot pick.
    label: 'Tobit 1 — a footnote holding an \\fqa span',
    reference: 'Tobit 1:1',
    chapterNum: 1,
    bookFile: '68TOBengWEBUS.SFM',
    renderedText: 'cupbearer, keeper of the signet',
    textPoint: 'save my wife |Anna and',
    notes: [
      {
        // 1:2: `\ft That is, \fqa Shalmaneser. \ft Compare 2 Kings 17:3, 23. \f*` — the second
        // `\ft` opens right after an unclosed `\fqa`, and a space precedes the closer.
        label: 'the 1:2 footnote, \\ft text after an \\fqa span',
        anchor: 'Shalmaneser.',
        typePoint: 'Compare |2 Kings',
        leaves: { unchanged: 'closing the pane', typed: 'closing the pane', deleted: 'Escape' },
      },
    ],
  },
];

/** The `\f …\f*` run, as offsets into `bookText`, around the one occurrence of `anchor`. */
function footnoteExtent(bookText: string, anchor: string): { start: number; end: number } {
  const at = bookText.indexOf(anchor);
  if (at < 0 || bookText.indexOf(anchor, at + 1) >= 0)
    throw new Error(`${JSON.stringify(anchor)} must occur exactly once in the book`);
  const start = bookText.lastIndexOf('\\f ', at);
  const closer = bookText.indexOf('\\f*', at);
  if (start < 0 || closer < 0) throw new Error(`${JSON.stringify(anchor)} is not inside a \\f`);
  return { start, end: closer + '\\f*'.length };
}

/**
 * `book` with `inserted` at `point` inside the footnote around `anchor`, and nothing else changed —
 * what the book must read once the typing at that point is saved. Also returns the byte offset of
 * the insertion, for the report.
 */
function withInsertionInFootnote(
  book: Buffer,
  anchor: string,
  point: TextPoint,
  inserted: string,
): { bytes: Buffer; byteOffset: number } {
  const text = book.toString('utf8');
  const { start, end } = footnoteExtent(text, anchor);
  const note = text.slice(start, end);
  const at = note.indexOf(pointText(point));
  if (at < 0 || note.indexOf(pointText(point), at + 1) >= 0)
    throw new Error(`${JSON.stringify(pointText(point))} must occur exactly once in ${note}`);
  const offset = start + at + splitPoint(point)[0].length;
  return {
    bytes: Buffer.from(text.slice(0, offset) + inserted + text.slice(offset), 'utf8'),
    byteOffset: Buffer.byteLength(text.slice(0, offset), 'utf8'),
  };
}

/** `point` once `inserted` has been typed at it, with the caret after what was typed. */
function pointAfterInsertion(point: TextPoint, inserted: string): TextPoint {
  const [before, after] = splitPoint(point);
  return `${before}${inserted}|${after}`;
}

/** `point` once `inserted` has been typed at it, with the caret before what was typed. */
function pointBeforeInsertion(point: TextPoint, inserted: string): TextPoint {
  const [before, after] = splitPoint(point);
  return `${before}|${inserted}${after}`;
}

/**
 * Clicks the Scripture text at `point` with the mouse, as the user would: the point's text is
 * scrolled into view inside the editor's frame, and the click lands on the character after the
 * caret, in page coordinates.
 */
async function clickTextAt(
  mainPage: Page,
  editorId: string,
  editorInput: Locator,
  point: TextPoint,
) {
  const [before, after] = splitPoint(point);
  const inFrame = await editorInput.evaluate(
    (root, { text, caret }) => {
      const hits: Array<{ node: Text; offset: number }> = [];
      const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        // SHOW_TEXT yields only Text nodes.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const textNode = node as Text;
        for (
          let at = textNode.data.indexOf(text);
          at >= 0;
          at = textNode.data.indexOf(text, at + 1)
        )
          hits.push({ node: textNode, offset: at + caret });
      }
      if (hits.length !== 1)
        throw new Error(`${JSON.stringify(text)} occurs ${hits.length} times in the editor's text`);
      const { node, offset } = hits[0];
      node.parentElement?.scrollIntoView({ block: 'center' });
      const range = root.ownerDocument.createRange();
      range.setStart(node, offset);
      range.setEnd(node, offset + 1);
      const rect = range.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    },
    { text: before + after, caret: before.length },
  );
  const frameBox = await mainPage.locator(`iframe[data-web-view-id="${editorId}"]`).boundingBox();
  if (!frameBox) throw new Error('The editor frame has no bounding box');
  await mainPage.mouse.click(frameBox.x + inFrame.x, frameBox.y + inFrame.y);
}

/**
 * The footnotes pane run's whole test body. In `view`, for each footnote of
 * {@link FOOTNOTE_CHAPTERS}, the footnotes pane's row editor (the inline note editor a pane row
 * becomes when clicked) changes the book file only as the user asked:
 *
 * 1. **Opening a row and leaving it writes nothing.** Before the chapter has ever been saved: click
 *    the row, let the editor settle, leave it — by Escape, by clicking the Scripture text, or by
 *    closing the pane. Every file of the project keeps its bytes and its modification time.
 * 2. **Typing changes only what was typed.** Once the chapter is at rest (one main-text edit and its
 *    deletion, which must leave exactly the known first-save normalization): type one character at
 *    a known point in the note's `\ft` text and leave. The book is the at-rest book with exactly
 *    that byte inserted at that point in that note; its `.BAK` holds the book as it was before the
 *    save, and every other file is untouched. Reopen the row, delete the character, leave: the book
 *    is byte-identical to the at-rest book.
 * 3. **Copy and paste of the note's own text adds only the paste.** Copy a range of the note's `\ft`
 *    text in the row and paste it back right after itself: the book gains exactly those bytes
 *    there. Reopen the row, select the pasted text, delete it, leave: byte-identical again.
 *
 * Expectations are computed from the bytes on disk, never from what the editor shows.
 */
export async function runFootnotesPaneRowEdits(
  { mainPage, electronApp }: { mainPage: Page; electronApp: ElectronApplication },
  view: EditableViewCase,
): Promise<void> {
  // Heavy isolated test: its own Electron instance, then several quiet waits and saves per note.
  test.setTimeout(900_000);

  if (view.interfaceMode === 'power') await waitForHomeTab(mainPage);
  else await waitForAppReady(mainPage);
  await makeSampleProjectEditableExpectingOnlyThat();
  const installedBooks = captureInstalledBooks(FOOTNOTE_CHAPTERS);

  const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
  const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
  await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
  // `.first()`: the pane's row editor renders an editor input of its own, after the text's.
  const editorInput = editorFrame.locator('.editor-input').first();
  const footnotesPane = editorFrame.locator('[data-footnotes-pane]');
  const editingRow = footnotesPane.locator('li[data-state="editing"]');
  const rowEditor = editingRow.locator('.editor-input');
  // The close button floats over the list as the pane's only direct child button.
  const paneCloseButton = footnotesPane.locator(':scope > button');

  const showPane = async () => {
    if ((await footnotesPane.count()) === 0)
      await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
    await expect(footnotesPane).toHaveCount(1, { timeout: 20_000 });
  };

  /**
   * Opens `note`'s row editor with a click on its row, runs `act` in it, and leaves by `leave`;
   * returns once the row is a plain row again.
   */
  const editRow = async (
    chapter: FootnoteChapterCase,
    note: FootnoteRowCase,
    leave: RowLeave,
    act: () => Promise<void>,
  ) => {
    await showPane();
    await footnotesPane.locator('li[role="option"]').filter({ hasText: note.anchor }).click();
    await expect(rowEditor).toContainText(note.anchor, { timeout: 20_000 });
    // The row editor places its caret over a timeout and an animation frame after it loads.
    await mainPage.waitForTimeout(SELECTION_ADOPTED_MS * 2);
    await act();
    if (leave === 'Escape') await mainPage.keyboard.press('Escape');
    else if (leave === 'clicking the text')
      await clickTextAt(mainPage, editorId, editorInput, chapter.textPoint);
    else await paneCloseButton.click();
    await expect(editingRow).toHaveCount(0, { timeout: 20_000 });
  };

  const settledBooks = new Map<string, Buffer>();

  const runChapter = (chapter: FootnoteChapterCase) =>
    test.step(`${view.name}: ${chapter.label}`, async () => {
      const installed = installedBooks.get(chapter.bookFile);
      if (!installed) throw new Error(`No capture for ${chapter.bookFile}`);
      const bookPath = installedBookPath(chapter.bookFile);

      await navigateToolbarBcv(mainPage, chapter.reference);
      await expect(editorInput).toContainText(chapter.renderedText, { timeout: 60_000 });
      await expect
        .poll(
          () => editorInput.evaluate((root, selector) => root.matches(selector), view.rootSelector),
          {
            message: `the editor should be showing ${view.name} (${view.rootSelector})`,
            timeout: 30_000,
          },
        )
        .toBe(true);
      const beforeOpening = await snapshotSettledProject(mainPage);

      // Chained, not concurrent: one row editor at a time.
      const forEachNote = (run: (note: FootnoteRowCase) => Promise<void>) =>
        chapter.notes.reduce(async (previous, note) => {
          await previous;
          await run(note);
        }, Promise.resolve());

      await forEachNote((note) =>
        test.step(`${note.label}: opening its row and leaving by ${note.leaves.unchanged} writes nothing`, async () => {
          await editRow(chapter, note, note.leaves.unchanged, async () => {
            await selectInEditor(rowEditor, note.typePoint);
            await mainPage.keyboard.press('ArrowRight');
            await mainPage.keyboard.press('ArrowLeft');
          });
          await mainPage.waitForTimeout(LOAD_QUIET_MS);
          await expectProjectUnchanged(
            beforeOpening,
            `opening ${note.label} in the row editor and leaving it by ${note.leaves.unchanged}`,
          );
        }),
      );

      const atRest =
        await test.step('the first save of the chapter, from the Scripture text', async () => {
          await selectInEditor(editorInput, chapter.textPoint);
          await mainPage.keyboard.type(TYPED_CHARACTER);
          const afterTyping = await waitForSaveToSettle(mainPage, bookPath, installed);
          if (!afterTyping)
            throw new Error(
              `${chapter.bookFile}: typing in the Scripture text never saved to disk`,
            );
          await selectInEditor(
            editorInput,
            pointAfterInsertion(chapter.textPoint, TYPED_CHARACTER),
          );
          await mainPage.keyboard.press('Backspace');
          const afterDeleting = await waitForSaveToSettle(mainPage, bookPath, afterTyping);
          if (!afterDeleting)
            throw new Error(
              `${chapter.bookFile}: deleting in the Scripture text never saved to disk`,
            );
          await expectSameBytes(
            chapter.bookFile,
            expectedAfterFirstSave(installed, chapter.chapterNum),
            afterDeleting,
            'installed-with-known-first-save-normalization',
            'after-first-edit-and-delete',
            `${chapter.bookFile}: the first save of ${chapter.reference} changed more (or less) than the known first-save normalization`,
          );
          return afterDeleting;
        });
      const atRestProject = await snapshotSettledProject(mainPage);

      // ParatextData keeps the book as it was before each save in a `.BAK` beside it.
      const backupFile = `${chapter.bookFile}.BAK`;

      /**
       * Runs one row session that must save `expected`, then checks the book is exactly that, its
       * backup is exactly the book before the save, and no other file of the project moved. Returns
       * the book as saved.
       */
      const expectRowSave = async (
        where: string,
        before: Buffer,
        expected: Buffer,
        session: () => Promise<void>,
      ): Promise<Buffer> => {
        await session();
        const saved = await waitForSaveToSettle(mainPage, bookPath, before);
        if (!saved) {
          expect
            .soft(saved, `${where} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`)
            .toBeDefined();
          return before;
        }
        await expectSameBytes(chapter.bookFile, expected, saved, 'expected', 'saved', where);
        await expectSameBytes(
          backupFile,
          before,
          fs.readFileSync(
            path.join(requireIsolatedProjectRoot(), INSTALLED_WEB_FOLDER, backupFile),
          ),
          'book-before-the-save',
          'backup',
          `${where}: the book's backup is not the book as it was before the save`,
        );
        await expectProjectUnchanged(atRestProject, where, [chapter.bookFile, backupFile]);
        return saved;
      };

      await forEachNote((note) =>
        test.step(`${note.label}: typing in its \\ft text changes only that byte`, async () => {
          const typed = withInsertionInFootnote(
            atRest,
            note.anchor,
            note.typePoint,
            TYPED_CHARACTER,
          );
          test.info().annotations.push({
            type: 'typed',
            description: `${chapter.bookFile} (${view.name}): ${note.label}: "${TYPED_CHARACTER}" expected at byte ${typed.byteOffset}`,
          });
          const afterTyping = await expectRowSave(
            `${chapter.bookFile} (${view.name}): typing "${TYPED_CHARACTER}" at ${note.typePoint} in ${note.label} and leaving by ${note.leaves.typed}`,
            atRest,
            typed.bytes,
            () =>
              editRow(chapter, note, note.leaves.typed, async () => {
                await selectInEditor(rowEditor, note.typePoint);
                await mainPage.keyboard.type(TYPED_CHARACTER);
              }),
          );
          await expectRowSave(
            `${chapter.bookFile} (${view.name}): deleting the typed "${TYPED_CHARACTER}" in ${note.label} and leaving by ${note.leaves.deleted}`,
            afterTyping,
            atRest,
            () =>
              editRow(chapter, note, note.leaves.deleted, async () => {
                await selectInEditor(
                  rowEditor,
                  pointAfterInsertion(note.typePoint, TYPED_CHARACTER),
                );
                await mainPage.keyboard.press('Backspace');
              }),
          );
        }),
      );

      await forEachNote(async (note) => {
        const { copyPaste } = note;
        if (!copyPaste) return;
        await test.step(`${note.label}: pasting a copy of its own \\ft text adds only the paste`, async () => {
          const { start, end } = footnoteExtent(atRest.toString('utf8'), note.anchor);
          const copied = usfmBetween(
            atRest.toString('utf8').slice(start, end),
            copyPaste.from,
            copyPaste.to,
          );
          const pasted = withInsertionInFootnote(
            atRest,
            note.anchor,
            copyPaste.destination,
            copied,
          );
          const afterPaste = await expectRowSave(
            `${chapter.bookFile} (${view.name}): copying ${JSON.stringify(copied)} in ${note.label} and pasting it at ${copyPaste.destination}`,
            atRest,
            pasted.bytes,
            () =>
              editRow(chapter, note, 'closing the pane', async () => {
                await electronApp.evaluate(
                  ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
                  CLIPBOARD_SENTINEL,
                );
                await selectInEditor(rowEditor, copyPaste.from, copyPaste.to);
                await mainPage.keyboard.press(COPY_KEY);
                await expect
                  .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
                    message: `copying ${copyPaste.from} … ${copyPaste.to} in the row editor never reached the OS clipboard`,
                    timeout: 15_000,
                  })
                  .not.toBe(CLIPBOARD_SENTINEL);
                test.info().annotations.push({
                  type: 'copied',
                  description: `${note.label} (${view.name}): text/plain ${JSON.stringify(
                    await electronApp.evaluate(({ clipboard }) => clipboard.readText()),
                  )}`,
                });
                await selectInEditor(rowEditor, copyPaste.destination);
                await mainPage.keyboard.press(PASTE_KEY);
              }),
          );
          await expectRowSave(
            `${chapter.bookFile} (${view.name}): deleting the pasted ${JSON.stringify(copied)} in ${note.label}`,
            afterPaste,
            atRest,
            () =>
              editRow(chapter, note, 'Escape', async () => {
                await selectInEditor(
                  rowEditor,
                  pointBeforeInsertion(copyPaste.destination, copied),
                  pointAfterInsertion(copyPaste.destination, copied),
                );
                await mainPage.keyboard.press('Delete');
              }),
          );
        });
      });

      settledBooks.set(chapter.bookFile, fs.readFileSync(bookPath));
      await expectSameBytes(
        chapter.bookFile,
        atRest,
        fs.readFileSync(bookPath),
        'at-rest',
        'after-its-notes',
        `${chapter.bookFile}: the book does not read as it did at rest once every note's edit was taken back`,
      );
    });

  await FOOTNOTE_CHAPTERS.reduce(async (previous, chapter) => {
    await previous;
    await runChapter(chapter);
  }, Promise.resolve());

  // Leaving a chapter flushes any pending save; nothing may reach a book after its step finished.
  await Promise.all(
    FOOTNOTE_CHAPTERS.map(async (chapter) => {
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
}

// #endregion
