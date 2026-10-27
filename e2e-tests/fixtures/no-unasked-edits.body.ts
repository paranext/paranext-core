/**
 * The running app makes no edit to Scripture that the user did not ask for — the shared body of the
 * `no-unasked-edits-*` specs, one spec per editable view (isolated specs are one test() per file,
 * so each view needs its own file; the spec files only pick the view).
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
import { requireIsolatedProjectRoot, waitForAppReady } from './helpers';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
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
   * `OpenEditorOptions.viewType` for the open command; omitted to take the interface mode's own
   * default (Standard in Power mode, the paragraph-structure preset in Simple mode).
   */
  viewType?: 'formatted';
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

/** Power mode's formatted view: markers hidden, no paragraph-marker gutter. */
export const POWER_FORMATTED_VIEW: EditableViewCase = {
  name: 'Power mode, formatted view',
  interfaceMode: 'power',
  viewType: 'formatted',
  rootSelector: '.editor-input.marker-hidden:not(.psc-gutter-markers)',
  areMarkersText: false,
};

/** Simple mode's editable view: the paragraph-structure preset, markers hidden, a marker gutter. */
export const SIMPLE_PARAGRAPH_STRUCTURE_VIEW: EditableViewCase = {
  name: 'Simple mode, paragraph-structure view',
  interfaceMode: 'simple',
  rootSelector: '.editor-input.marker-hidden.psc-gutter-markers',
  areMarkersText: false,
};

/** The `test.use()` options a spec for `view` needs. */
export function noUnaskedEditsTestOptions(view: EditableViewCase) {
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
const COPY_KEY = isMac ? 'Meta+C' : 'Control+C';
const PASTE_KEY = isMac ? 'Meta+V' : 'Control+V';
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
type TextPoint = string;

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

/** The `|`-free text of a {@link TextPoint}. */
function pointText(point: TextPoint): string {
  return point.replace('|', '');
}

/** `point`'s text with `inserted` at its caret. */
function insertAtPoint(point: TextPoint, inserted: string): string {
  return point.replace('|', inserted);
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
  return unitText.slice(start + from.indexOf('|'), end + to.indexOf('|'));
}

/**
 * Selects from `from` to `to` (or puts the caret at `from`) by setting the DOM selection inside the
 * editor, which the editor adopts as its own. Fails when a point's text is missing or occurs more
 * than once, naming it, so an anchor that stops being unique fails loudly instead of aiming the
 * gesture somewhere else.
 */
async function selectInEditor(editorInput: Locator, from: TextPoint, to: TextPoint = from) {
  await editorInput.evaluate(
    (root, points) => {
      const locate = (point: string) => {
        const caret = point.indexOf('|');
        const text = point.replace('|', '');
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
    { from, to },
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
        // TODO(PT-4921): the html flavor carries `closed="false"`; then remove this pin.
        knownDeviation: {
          finding: 'CB-3',
          summary:
            'a footnote pasted in a hidden-marker view gains explicit `\\fr*`/`\\ft*` closers: the paste reads the copy\'s text/html, whose char spans do not carry `closed="false"`',
          applies: (view) => !view.areMarkersText,
          expected: (bookBefore) =>
            copyPasteExpectation(
              '3:14',
              bookBefore,
              '3:13',
              NOTE_COPY_FROM,
              NOTE_COPY_TO,
              NOTE_PASTE_POINT,
              (copied) =>
                copied
                  .replace('\\fr 3:13 \\ft ', '\\fr 3:13 \\fr*\\ft ')
                  .replace('River\\f*', 'River\\ft*\\f*'),
            ),
        },
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
 *   spaces collapse to one (the WEB puts two spaces between a footnote's `\fr 1:1` and its `\ft`).
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

  const editorId = await openEditableScriptureEditorForProject(
    mainPage,
    SAMPLE_WEB_PROJECT_ID,
    view.viewType ? { editorOptions: { viewType: view.viewType } } : {},
  );
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
