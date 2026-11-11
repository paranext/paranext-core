/**
 * The running app makes no edit to Scripture that the user did not ask for — the shared body of the
 * `no-unasked-edits-*` specs, one spec per editable view (isolated specs are one test() per file,
 * so each view needs its own file; the spec files only pick the view), plus
 * {@link runPreviewWritesNothing} for Power mode's read-only Preview,
 * {@link runFootnotesPaneRowEdits} for the footnotes pane's row editor and
 * {@link runInvisibleCharacters} for whitespace and invisible characters under either setting of the
 * project's `AllowInvisibleChars`.
 *
 * Every other fidelity test exercises one leg of the save path in isolation. This one drives the
 * whole composition in the real app — C# USFM → USX, the USX parse into the editor, the editor's
 * save, USJ → USX, the PDP's USX fragmenter and `PutText` — and judges it by the only thing that
 * matters to the user: the book file on disk. Per chapter:
 *
 * 1. **Loading never writes.** Opening the editor and the chapter writes nothing to the book file: not
 *    a byte, not its modification time.
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
 *
 * **Every write is recorded, so no step waits to prove a negative.** A {@link ProjectWriteRecorder}
 * samples the project's files for the whole run, and each step is a {@link WritePhase} that says
 * which writes it asks for. A step that saves goes on as soon as its save has landed; a step that
 * saves nothing goes on at once. A write that lands later than its step — a second write chained to
 * a save, or a load that writes after all — lands inside a later step's interval, where nothing
 * asked for it, and fails there — even in a step that asks for a save, since a write that lands
 * sooner after the step began than the editor's save debounce, with another write to the file after
 * it, is not that step's save; the step after the last one gets a single quiet window
 * ({@link BACKSTOP_QUIET_MS}) for the same purpose. The recording is judged at the end of the run
 * ({@link ProjectWriteRecorder.finishAndVerify}); what each save holds is judged the moment it
 * lands.
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
import {
  describeByteDrift,
  describeUnaskedWrites,
  hasSaveLanded,
  type RecordedWrite,
  savedAs,
  secondsOf,
  type WritePhase,
  type WriteRule,
  type WriteScope,
  writesToJudge,
} from './project-write-judging';
import { describeChangesOutside, getUsfmUnit, splitUsfmUnits } from './usfm-units';

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

/**
 * The `test.use()` options a spec for a view in `view.interfaceMode` needs; `seedProjectRoot` fills
 * the isolated project root before the app starts (`prepareProjectRoot`).
 */
export function noUnaskedEditsTestOptions(
  view: Pick<EditableViewCase, 'interfaceMode'>,
  seedProjectRoot?: (projectRoot: string) => void,
) {
  return {
    interfaceMode: view.interfaceMode,
    // Past first run, so Simple mode starts in the app rather than the setup wizard.
    seedSettings: view.interfaceMode === 'simple' ? { 'platform.firstRunComplete': true } : {},
    // DEV_NOISY=false keeps the normal layouts.
    electronLaunchOptions: {
      isolatedProjectRoot: true,
      envOverrides: { DEV_NOISY: 'false' },
      ...(seedProjectRoot ? { prepareProjectRoot: seedProjectRoot } : {}),
    },
  };
}

// #endregion

// #region Timing and keys

/** The bundled sample project the backend copies, file for file, into the isolated root. */
const BUNDLED_WEB_DIR = path.resolve(__dirname, '../../c-sharp/assets/WEB');

/** Folder the backend installs the sample project into, under the project root. */
const INSTALLED_WEB_FOLDER = 'WEB';

/** The editor web view's source, where its save debounce is declared. */
const EDITOR_WEB_VIEW_SOURCE = path.resolve(
  __dirname,
  '../../extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
);

/**
 * Reads `PDP_SAVE_DEBOUNCE_MS` from the editor web view's source, which does not export it. Throws
 * if the declaration is missing or not a plain number, so a change to how the editor declares its
 * debounce fails loudly here instead of leaving {@link ECHO_SETTLED_MS}, the backstop's margin over
 * it and the recording's handling of a write that lands too early to be its step's save all
 * silently wrong.
 */
function readEditorSaveDebounceMs(): number {
  const source = fs.readFileSync(EDITOR_WEB_VIEW_SOURCE, 'utf8');
  const match = /const PDP_SAVE_DEBOUNCE_MS\s*=\s*(\d[\d_]*)\s*;/.exec(source);
  if (!match)
    throw new Error(
      `Could not find "const PDP_SAVE_DEBOUNCE_MS = <number>;" in ${EDITOR_WEB_VIEW_SOURCE}; update readEditorSaveDebounceMs to match how the editor declares its save debounce`,
    );
  return Number(match[1].replace(/_/g, ''));
}

/**
 * The editor's trailing-edge save debounce, read from the editor's own source. It is the only
 * deliberate delay between an edit (or a load) and the write it causes, so a step's own save lands
 * at least this long after the step begins — unless something other than the debounce sends it
 * sooner: the editor saves at once when a write's echo comes back while it holds newer edits, and
 * flushes a pending save on a window blur, a chapter switch or an incoming update about to replace
 * the text. A write that lands sooner is therefore taken as the step's save only when no other
 * write to the file follows it in the step ({@link describeUnaskedWrites}). The cutoff is
 * approximate to within one recorder poll ({@link RECORDER_POLL_MS}): a write is timed by the sample
 * that saw it, so one that landed just under the debounce can be timed just over it — the lenient
 * side, so it cannot cause a false failure.
 */
const EDITOR_SAVE_DEBOUNCE_MS = readEditorSaveDebounceMs();

/**
 * One round trip between the editor and the .NET backend on a loaded machine, about half a second:
 * a save's way through the extension host to `PutText`, or a write's echo coming back to the
 * editor.
 */
const SAVE_ROUND_TRIP_MS = 500;

/**
 * The longest an editor-caused write takes to reach disk after what caused it: one editor save
 * debounce plus two round trips.
 */
const SAVE_PATH_MS = EDITOR_SAVE_DEBOUNCE_MS + 2 * SAVE_ROUND_TRIP_MS;

/**
 * How long a freshly opened chapter is left alone before the first gesture ({@link SAVE_PATH_MS}),
 * so a save the load triggers reaches disk before typing starts. Without it such a save could be
 * coalesced into the first typing save and go unnoticed.
 */
const LOAD_WRITE_WINDOW_MS = SAVE_PATH_MS;

/**
 * How long after a step has acted its own save has to land ({@link SAVE_PATH_MS}).
 * {@link ProjectWriteRecorder.waitForSave} gives a write that landed too soon to be the step's save
 * (see {@link EDITOR_SAVE_DEBOUNCE_MS}) this long to be followed by the save it may stand in front
 * of, before taking it as the step's save itself.
 */
const OWN_SAVE_WINDOW_MS = SAVE_PATH_MS;

/**
 * How long a run leaves the editor alone once a save has landed, before the next gesture: one round
 * trip, so the write's echo has reached the editor and been applied or deferred, as it would have
 * during a user's pause. Nothing the test can observe marks the echo's arrival (a deferred echo
 * changes nothing on screen), so this is a deliberate pause; any write the echo causes is in the
 * recording either way, and judged there.
 */
const ECHO_ARRIVAL_MS = SAVE_ROUND_TRIP_MS;

/**
 * How long after a save lands every write that follows from it has landed too: its echo comes back
 * (a round trip), and the editor either pushes back (a round trip) or starts a follow-up edit (a
 * second debounce, then a round trip); one more debounce is headroom. Only for the step that must
 * type on after a save's echo has been handled — everywhere else a write that lands this late is
 * the recording's to catch, so nothing waits this long.
 */
const ECHO_SETTLED_MS = EDITOR_SAVE_DEBOUNCE_MS + 2 * SAVE_ROUND_TRIP_MS + EDITOR_SAVE_DEBOUNCE_MS;

/**
 * The one quiet window of a run, after its last step: the time a write the last step causes late (a
 * stalled backend, a timer the analysis above missed) has to land, so the recording judges it.
 * Every earlier step's late write lands inside a later step's interval instead. Longer than
 * {@link ECHO_SETTLED_MS}, so it covers a whole save chain with room to spare.
 */
const BACKSTOP_QUIET_MS = 5_000;

/** How long a gesture's save gets to reach the disk. */
const SAVE_LANDED_TIMEOUT_MS = 30_000;

/**
 * How often the {@link ProjectWriteRecorder} samples the project's files, on top of a sample
 * whenever the folder reports a change (which WSL and Windows do not report reliably).
 */
const RECORDER_POLL_MS = 100;

/**
 * How long an edit that took in Preview gets to show in the editor's text before the check that the
 * text did not change. The editor renders an applied update within a frame or two; a write the edit
 * causes is the recording's to catch, however late.
 */
const EDIT_RENDERED_MS = 300;

/**
 * How long the editor gets to pick up a selection set on the DOM before a key acts on it, where no
 * event marks it (the footnote row editor's own caret placement). Lexical adopts the DOM selection
 * on the document's `selectionchange` event, which fires asynchronously.
 */
const SELECTION_ADOPTED_MS = 300;

/**
 * The longest a selection set on the DOM waits for the document's `selectionchange` event before
 * going on without it. The event fires within a task of the change, so this only bounds a change
 * the browser chose not to report.
 */
const SELECTION_CHANGE_FALLBACK_MS = 1_000;

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
  /**
   * Whether the gesture types several keys. On a slow machine a save can then land between two of
   * them, holding the start of what is typed, so the recording accepts that state on the way to the
   * gesture's result ({@link isPartwayThroughTyping}). A gesture that edits in one go (a paste, a
   * deletion) leaves it unset: any save other than its result is then a write nobody asked for.
   */
  isTyping?: boolean;
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
async function selectInEditor(editorInput: Locator, from: TextPoint, to: TextPoint = from) {
  await editorInput.evaluate(
    async (root, { fallbackMs, ...points }) => {
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
      const document = root.ownerDocument;
      const selection = document.getSelection();
      // An unchanged selection fires no `selectionchange`, and the editor already holds it.
      const isUnchanged =
        document.activeElement === root &&
        selection?.anchorNode === start.node &&
        selection.anchorOffset === start.offset &&
        selection.focusNode === end.node &&
        selection.focusOffset === end.offset;
      if (root instanceof HTMLElement) root.focus({ preventScroll: true });
      selection?.setBaseAndExtent(start.node, start.offset, end.node, end.offset);
      if (isUnchanged) return;
      // Lexical adopts the selection in its own `selectionchange` listener, registered before this
      // one, and commits that update before the next frame.
      await new Promise<void>((resolve) => {
        const fallback = setTimeout(resolve, fallbackMs);
        document.addEventListener(
          'selectionchange',
          () => {
            clearTimeout(fallback);
            requestAnimationFrame(() => resolve());
          },
          { once: true },
        );
      });
    },
    {
      from: checkedPoint(from),
      to: checkedPoint(to),
      fallbackMs: SELECTION_CHANGE_FALLBACK_MS,
    },
  );
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
        isTyping: true,
        perform: typeAt(JONAH_TYPE_POINT, JONAH_TYPED),
        expected: () => typingExpectation('1:6', JONAH_TYPE_POINT, JONAH_TYPED),
      },
      {
        label: 'typing right after a footnote (1:6)',
        units: ['1:6'],
        isTyping: true,
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
        isTyping: true,
        perform: typeAt(MATTHEW_POETRY_POINT, MATTHEW_TYPED),
        expected: () => typingExpectation('3:3', MATTHEW_POETRY_POINT, MATTHEW_TYPED),
      },
      {
        label: 'typing at the end of a poetry line, right before its cross reference (3:3)',
        units: ['3:3'],
        isTyping: true,
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
        isTyping: true,
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

function installedBookPath(bookFile: string): string {
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

/** `book` with the text of each unit in `unitTexts` (by label) replaced; every other unit as is. */
function withUnitTexts(book: string, unitTexts: ReadonlyMap<string, string>): string {
  return splitUsfmUnits(book)
    .map((unit) => unitTexts.get(unit.label) ?? unit.text)
    .join('');
}

/**
 * Whether `partway` is `base` with the start of what `full` inserts into it, at the place `full`
 * inserts it — what a save that lands partway through typing that insertion holds. Every place the
 * insertion could sit is tried, since text either side of it can repeat what is typed.
 */
function holdsStartOfInsertion(base: string, full: string, partway: string): boolean {
  const insertedLength = full.length - base.length;
  const typedLength = partway.length - base.length;
  if (typedLength <= 0 || typedLength >= insertedLength) return false;
  let at = 0;
  let found = false;
  // `full` must start with `base.slice(0, at)` for the insertion to sit at `at`.
  while (!found && at <= base.length && (at === 0 || full[at - 1] === base[at - 1])) {
    found =
      full.slice(at + insertedLength) === base.slice(at) &&
      partway === base.slice(0, at) + full.slice(at, at + typedLength) + base.slice(at);
    at += 1;
  }
  return found;
}

/**
 * Whether `partway` is a book a typing gesture can save on its way from `before` to `result`: no
 * unit outside `units` changed, and each aimed unit reads as before, as the result, or as before
 * with the start of what the gesture types ({@link holdsStartOfInsertion}).
 */
function isPartwayThroughTyping(
  before: string,
  result: string,
  partway: string,
  units: readonly string[],
): boolean {
  if (describeChangesOutside(before, partway, units) !== '') return false;
  return units.every((unit) => {
    const unitBefore = getUsfmUnit(before, unit) ?? '';
    const unitResult = getUsfmUnit(result, unit) ?? '';
    const unitPartway = getUsfmUnit(partway, unit);
    return (
      unitPartway !== undefined &&
      (unitPartway === unitBefore ||
        unitPartway === unitResult ||
        holdsStartOfInsertion(unitBefore, unitResult, unitPartway))
    );
  });
}

// #endregion

// #region The write recording

/** The installed project's folder. */
function installedProjectDir(): string {
  return path.join(requireIsolatedProjectRoot(), INSTALLED_WEB_FOLDER);
}

/** One file as the recorder last read it. */
interface FileVersion {
  bytes: Buffer;
  mtimeMs: number;
  /** The stat fields any write changes; a sample that finds them unchanged does not read again. */
  statKey: string;
}

/** Every file of the project folder, by path relative to it; a folder that vanished holds none. */
function listProjectFiles(dir: string, relativeTo: string = dir): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listProjectFiles(fullPath, relativeTo);
    return entry.isFile() ? [path.relative(relativeTo, fullPath)] : [];
  });
}

function keyOfStats(stats: fs.Stats): string {
  return `${stats.ino}:${stats.size}:${stats.mtimeMs}:${stats.ctimeMs}`;
}

/** The file's {@link FileVersion.statKey}, or `undefined` while it is not there to stat. */
function statKeyOf(filePath: string): string | undefined {
  try {
    const stats = fs.statSync(filePath, { throwIfNoEntry: false });
    return stats?.isFile() ? keyOfStats(stats) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Reads the file's bytes and modification time through one handle, so both come from the same
 * version even while a save replaces the file (ParatextData writes a new file and moves it into
 * place, which leaves an open handle on the old one). `undefined` while the file is not there.
 */
function readFileVersion(filePath: string): FileVersion | undefined {
  let handle: number;
  try {
    handle = fs.openSync(filePath, 'r');
  } catch {
    return undefined;
  }
  try {
    const stats = fs.fstatSync(handle);
    return { bytes: fs.readFileSync(handle), mtimeMs: stats.mtimeMs, statKey: keyOfStats(stats) };
  } catch {
    return undefined;
  } finally {
    fs.closeSync(handle);
  }
}

/** Calls `onChange` whenever the folder reports a change; `undefined` where it cannot watch. */
function watchFolder(dir: string, onChange: () => void): fs.FSWatcher | undefined {
  try {
    const watcher = fs.watch(dir, { persistent: false }, onChange);
    // A failed watcher only costs the extra samples; the poller never depends on it.
    watcher.on('error', () => watcher.close());
    return watcher;
  } catch {
    return undefined;
  }
}

/**
 * Records every write that lands on the installed project's files for the whole of a run, so a step
 * goes on as soon as its own save has landed: any write that follows the save is judged by the step
 * whose interval it lands in.
 *
 * It samples every file of the project folder every {@link RECORDER_POLL_MS} and whenever the folder
 * reports a change, reading a file again only when its stat fields moved, and logs each write with
 * the time and the {@link WritePhase} it landed in. The run begins a phase per step, right before
 * the step acts; {@link ProjectWriteRecorder.beginPhase} samples first, so whatever had landed by
 * then belongs to the phase before. At the end, {@link ProjectWriteRecorder.finishAndVerify} waits
 * out the one backstop window and judges every phase's writes against what it asked for.
 *
 * ParatextData saves a file by writing a temporary copy beside it, then moving the file to its
 * `.BAK` and the copy into place, so a sample can find the file or its backup briefly missing and
 * the copy briefly present. A file that goes missing and comes back is one write, judged by what it
 * came back holding; a file of the baseline that is gone at the end of the run was removed, in the
 * phase it went missing in; and a file that came and went — the temporary copy — was never part of
 * the project and is not judged.
 */
class ProjectWriteRecorder {
  /** The scope of every phase begun from now on; see {@link WritePhase.scope}. */
  scope: WriteScope;

  private readonly projectDir = installedProjectDir();

  private readonly startedAt = Date.now();

  /** The project's files when the recording started. */
  private readonly baseline: ReadonlyMap<string, FileVersion>;

  /** Every file the last sample found, as it found it. */
  private readonly present = new Map<string, FileVersion>();

  /** Files that were there and are not now: what each last held, and when it went missing. */
  private readonly missing = new Map<string, { version: FileVersion; phase: number; at: number }>();

  private readonly writes: RecordedWrite[] = [];

  private readonly phases: WritePhase[] = [];

  private readonly timer: NodeJS.Timeout;

  private readonly watcher: fs.FSWatcher | undefined;

  private sampleError: unknown;

  private isStopped = false;

  /**
   * Starts recording, taking the project as it is now as the baseline.
   *
   * @param firstPhase Label of the phase that runs until the first `beginPhase`; it asks for no
   *   write.
   * @param scope The files phases judge, until {@link ProjectWriteRecorder.scope} is changed
   */
  constructor(firstPhase: string, scope: WriteScope) {
    this.scope = scope;
    listProjectFiles(this.projectDir).forEach((file) => {
      const version = readFileVersion(path.join(this.projectDir, file));
      if (version) this.present.set(file, version);
    });
    this.baseline = new Map(this.present);
    this.phases.push({ label: firstPhase, scope, writes: new Map(), startedAt: 0 });
    this.timer = setInterval(() => this.sample(), RECORDER_POLL_MS);
    this.timer.unref();
    this.watcher = watchFolder(this.projectDir, () => this.sample());
  }

  /**
   * Ends the phase running now and begins the next step's, which asks for `writes` and no other
   * write to a file in {@link ProjectWriteRecorder.scope}.
   */
  beginPhase(label: string, writes: ReadonlyMap<string, WriteRule> = new Map()): void {
    this.sample();
    this.phases.push({ label, scope: this.scope, writes, startedAt: Date.now() - this.startedAt });
  }

  /** The file's bytes now, or `undefined` while it is not there (mid-save, or never created). */
  current(file: string): Buffer | undefined {
    this.sample();
    return this.present.get(file)?.bytes;
  }

  /** The file's bytes as the recorder last saw them, even while a save has it briefly missing. */
  lastSeen(file: string): Buffer | undefined {
    this.sample();
    return (this.present.get(file) ?? this.missing.get(file)?.version)?.bytes;
  }

  /**
   * Waits for the running phase's save to land on `file`: for its bytes to stop being `from` and,
   * when `result` is given, to become `result` — or anything else `isPartway` does not accept,
   * since that is already a finding and the caller judges it. Bytes other than `result` that a
   * write landed sooner after the phase began than the editor's save debounce (or before it began)
   * are taken only once {@link OWN_SAVE_WINDOW_MS} has passed since this call with no write after
   * them: until then the phase's own save may still land after them ({@link WriteRule}). Once it has
   * landed, leaves the editor alone for `pauseAfterMs` ({@link ECHO_ARRIVAL_MS} unless given).
   * Returns what landed, the latest bytes if only a partway state did within
   * {@link SAVE_LANDED_TIMEOUT_MS}, or `undefined` if no write changed the file at all. The bytes
   * returned can come from a write an earlier phase made after `from` was taken; that write is
   * still judged in the phase it landed in by {@link ProjectWriteRecorder.finishAndVerify}, so the
   * run fails naming that phase, though the caller's own check may fail first, less precisely.
   */
  async waitForSave(
    page: Page,
    file: string,
    {
      from,
      result,
      isPartway,
      pauseAfterMs = ECHO_ARRIVAL_MS,
    }: {
      from: Buffer;
      result?: Buffer;
      isPartway?: (bytes: Buffer) => boolean;
      pauseAfterMs?: number;
    },
  ): Promise<Buffer | undefined> {
    const phaseStartedAt = this.phases[this.phases.length - 1].startedAt;
    const earlyWritesTakenAt = Date.now() + OWN_SAVE_WINDOW_MS;
    const hasLanded = (bytes: Buffer | undefined): bytes is Buffer =>
      hasSaveLanded(
        bytes,
        { from, result, isPartway },
        {
          lastWrite: this.lastWriteTo(file),
          phaseStartedAt,
          saveDebounceMs: EDITOR_SAVE_DEBOUNCE_MS,
          hasOwnSaveWindowPassed: Date.now() >= earlyWritesTakenAt,
        },
      );
    const deadline = Date.now() + SAVE_LANDED_TIMEOUT_MS;
    let now = this.current(file);
    // Sequential sampling: each sample decides whether to take another.
    /* eslint-disable no-await-in-loop */
    while (!hasLanded(now) && Date.now() <= deadline) {
      await page.waitForTimeout(RECORDER_POLL_MS);
      now = this.current(file);
    }
    /* eslint-enable no-await-in-loop */
    if (!hasLanded(now)) {
      const latest = this.lastSeen(file);
      return latest && !latest.equals(from) ? latest : undefined;
    }
    await page.waitForTimeout(pauseAfterMs);
    return now;
  }

  /**
   * Ends the recording: waits out {@link BACKSTOP_QUIET_MS} for a late write of the last step, takes
   * a last sample, and soft-asserts, phase by phase, that every write that landed in the phase's
   * interval is one it asked for ({@link describeUnaskedWrites}). Each failure names the step, its
   * interval in the recording and every unasked write in it. The whole recording goes into the
   * report as `phases` and `writes` annotations, for timing and triage.
   */
  async finishAndVerify(page: Page): Promise<void> {
    await page.waitForTimeout(BACKSTOP_QUIET_MS);
    this.sample();
    const endedAt = Date.now() - this.startedAt;
    this.stop();
    if (this.sampleError !== undefined)
      expect
        .soft(String(this.sampleError), 'the write recorder could not sample the project folder')
        .toBe('');

    const writes = writesToJudge(this.writes, this.baseline, this.missing);

    const endOf = (index: number) =>
      index + 1 < this.phases.length ? this.phases[index + 1].startedAt : endedAt;
    test.info().annotations.push(
      {
        type: 'phases',
        description: this.phases
          .map(
            (phase, index) =>
              `+${secondsOf(phase.startedAt)} s (${secondsOf(endOf(index) - phase.startedAt)} s) ${phase.label}`,
          )
          .join('\n'),
      },
      {
        type: 'writes',
        description:
          writes
            .map(
              (write) =>
                `+${secondsOf(write.at)} s ${write.file} ${write.kind}` +
                `${write.after ? ` (${write.after.length} bytes)` : ''} in "${this.phases[write.phase].label}"`,
            )
            .join('\n') || '(none)',
      },
    );
    this.phases.forEach((phase, index) => {
      const unasked = describeUnaskedWrites(
        phase,
        writes.filter((write) => write.phase === index),
        this.phases[index - 1],
        EDITOR_SAVE_DEBOUNCE_MS,
      );
      expect
        .soft(
          unasked.join('\n\n'),
          `writes "${phase.label}" did not ask for, between +${secondsOf(phase.startedAt)} s and +${secondsOf(endOf(index))} s of the recording`,
        )
        .toBe('');
    });
  }

  /** Stops sampling; safe to call more than once, and from a `finally` after a failed run. */
  stop(): void {
    if (this.isStopped) return;
    this.isStopped = true;
    clearInterval(this.timer);
    this.watcher?.close();
  }

  /** The last write recorded on `file`, as of the last sample. */
  private lastWriteTo(file: string): RecordedWrite | undefined {
    return this.writes.filter((write) => write.file === file).at(-1);
  }

  /** Samples every file of the project once, recording each write since the last sample. */
  private sample(): void {
    if (this.isStopped) return;
    try {
      this.sampleFolder();
    } catch (error) {
      this.sampleError ??= error;
    }
  }

  private sampleFolder(): void {
    const at = Date.now() - this.startedAt;
    const phase = this.phases.length - 1;
    const seen = new Set<string>();
    listProjectFiles(this.projectDir).forEach((file) => {
      const fullPath = path.join(this.projectDir, file);
      const known = this.present.get(file);
      const statKey = statKeyOf(fullPath);
      if (statKey === undefined) return;
      if (known?.statKey === statKey) {
        seen.add(file);
        return;
      }
      const version = readFileVersion(fullPath);
      if (!version) return;
      seen.add(file);
      const previous = known ?? this.missing.get(file)?.version;
      this.missing.delete(file);
      this.present.set(file, version);
      const write = { file, at, phase, before: previous?.bytes, after: version.bytes };
      if (!previous) this.writes.push({ ...write, kind: 'added' });
      else if (!previous.bytes.equals(version.bytes))
        this.writes.push({ ...write, kind: 'changed' });
      else if (previous.mtimeMs !== version.mtimeMs)
        this.writes.push({ ...write, kind: 'rewritten' });
    });
    [...this.present].forEach(([file, version]) => {
      if (seen.has(file)) return;
      this.present.delete(file);
      this.missing.set(file, { version, phase, at });
    });
  }
}

// #endregion

// #region Steps

/** The phase rules for a step that saves `file` once, and no other file in scope. */
function savesOnly(
  file: string,
  result?: Buffer,
  isPartway?: (bytes: Buffer) => boolean,
): ReadonlyMap<string, WriteRule> {
  return new Map([[file, savedAs(result, isPartway)]]);
}

/**
 * Types {@link TYPED_CHARACTER} at the end of the chapter text and waits for that save to land on
 * disk, then undoes it and waits for that save too; each is a phase of `recorder` that asks for
 * that one save of the book. Hard-fails when the edit never saves (there would be nothing to undo);
 * returns `afterUndo: undefined` when the undo never saves.
 */
async function editThenUndo(
  recorder: ProjectWriteRecorder,
  mainPage: Page,
  editorInput: Locator,
  chapter: ChapterCase,
  before: Buffer,
  where: string,
): Promise<{ afterEdit: Buffer; afterUndo: Buffer | undefined }> {
  recorder.beginPhase(`${where}: typing "${TYPED_CHARACTER}"`, savesOnly(chapter.bookFile));
  await editorInput.click();
  await editorInput.press(DOC_END_KEY);
  await mainPage.keyboard.type(TYPED_CHARACTER);
  const afterEdit = await recorder.waitForSave(mainPage, chapter.bookFile, { from: before });
  if (!afterEdit)
    throw new Error(
      `${chapter.bookFile}: typing "${TYPED_CHARACTER}" in ${chapter.reference} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`,
    );

  recorder.beginPhase(`${where}: undoing it`, savesOnly(chapter.bookFile));
  await editorInput.press(UNDO_KEY);
  const afterUndo = await recorder.waitForSave(mainPage, chapter.bookFile, { from: afterEdit });
  return { afterEdit, afterUndo };
}

/**
 * Steps 1–3: loading writes nothing; the first save normalizes exactly; at rest, undo is exact.
 *
 * Step 1's evidence is the recording: the phases that opened the editor and the chapter ask for no
 * write, so any write since the recording started is judged there. The check here is that the book
 * as the steps find it is still the installed one.
 *
 * @param expectedFirstSave What the first save and its undo leave in the file, where that is more
 *   than {@link expectedAfterFirstSave} says.
 */
async function runLoadAndUndoSteps(
  recorder: ProjectWriteRecorder,
  mainPage: Page,
  editorInput: Locator,
  chapter: ChapterCase,
  installed: Buffer,
  where: string,
  expectedFirstSave: Buffer = expectedAfterFirstSave(installed, chapter.chapterNum),
): Promise<Buffer> {
  // 1. Loading never writes. Still inside the caller's no-write "opening" phase: give a save the
  // load might trigger time to land there, rather than merge into the typing save below, where it
  // would pass as that save's normalization. A write that never comes cannot be waited on.
  await mainPage.waitForTimeout(LOAD_WRITE_WINDOW_MS);
  const afterLoad = recorder.lastSeen(chapter.bookFile) ?? Buffer.alloc(0);
  await expectSameBytes(
    chapter.bookFile,
    installed,
    afterLoad,
    'installed',
    'after-opening',
    `${chapter.bookFile}: opening ${chapter.reference} changed the book file`,
  );

  // 2. First save, then undo.
  const first = await editThenUndo(
    recorder,
    mainPage,
    editorInput,
    chapter,
    afterLoad,
    `${where}: the first save`,
  );
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
    expectedFirstSave,
    first.afterUndo,
    'installed-with-known-first-save-normalization',
    'after-first-edit-and-undo',
    `${chapter.bookFile}: the first save of ${chapter.reference} changed more (or less) than the known first-save normalization`,
  );

  // 3. At rest, an edit undone leaves nothing behind.
  const second = await editThenUndo(
    recorder,
    mainPage,
    editorInput,
    chapter,
    first.afterUndo,
    `${where}: at rest`,
  );
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
 *
 * The gesture is one phase of `recorder`: where the aimed verses' result is known, the phase asks
 * for the book to become exactly that (by way of {@link isPartwayThroughTyping}'s states for a
 * typing gesture), and the wait ends when it does; otherwise it asks for one save, which is judged
 * here. Each undo press is a phase that asks for one save.
 */
async function runLocalEdit(
  recorder: ProjectWriteRecorder,
  context: GestureContext,
  view: EditableViewCase,
  chapter: ChapterCase,
  edit: LocalEdit,
  before: Buffer,
): Promise<Buffer> {
  const { mainPage, editorInput } = context;
  const { bookFile } = chapter;
  const where = `${bookFile} (${view.name}): ${edit.label}`;

  const beforeText = before.toString('utf8');
  const deviation = edit.knownDeviation?.applies(view) ? edit.knownDeviation : undefined;
  const expectation = deviation
    ? deviation.expected(beforeText)
    : edit.expected?.(view, beforeText);
  const expectedUnits = new Map(
    Object.entries(expectation ?? {}).map(([unit, replacements]) => {
      const unitBefore = getUsfmUnit(beforeText, unit);
      if (unitBefore === undefined) throw new Error(`${where}: the book has no unit ${unit}`);
      const expectedUnit = replacements.reduce((text, [from, to]) => {
        if (text.split(from).length !== 2)
          throw new Error(
            `${where}: ${JSON.stringify(from)} does not occur exactly once in ${unit}`,
          );
        return text.replace(from, to);
      }, unitBefore);
      return [unit, expectedUnit];
    }),
  );
  // The whole book the gesture must save, when the expectation covers every unit it may change.
  const resultText = edit.units.every((unit) => expectedUnits.has(unit))
    ? withUnitTexts(beforeText, expectedUnits)
    : undefined;
  const result = resultText === undefined ? undefined : Buffer.from(resultText, 'utf8');
  const isPartway =
    edit.isTyping && resultText !== undefined
      ? (bytes: Buffer) =>
          isPartwayThroughTyping(beforeText, resultText, bytes.toString('utf8'), edit.units)
      : undefined;

  recorder.beginPhase(`${where}: the gesture`, savesOnly(bookFile, result, isPartway));
  const startedAt = Date.now();
  await edit.perform(context);
  const performedAt = Date.now();
  const afterEdit = await recorder.waitForSave(mainPage, bookFile, {
    from: before,
    result,
    isPartway,
  });
  const savedAt = Date.now();
  if (!afterEdit) {
    expect
      .soft(afterEdit, `${where} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`)
      .toBeDefined();
    return before;
  }

  await expectChangesOnlyIn(
    bookFile,
    before,
    afterEdit,
    edit.units,
    'before-gesture',
    'after-gesture',
    `${where} changed text outside ${edit.units.join(', ')}`,
  );

  // What the gesture saved, for triage and the report whether or not an expectation judges it.
  edit.units.forEach((unit) =>
    test.info().annotations.push({
      type: 'saved',
      description: `${where}: ${unit} = ${JSON.stringify(getUsfmUnit(afterEdit.toString('utf8'), unit))}`,
    }),
  );
  if (deviation)
    test.info().annotations.push({
      type: 'known deviation',
      description: `${where}: ${deviation.finding} — ${deviation.summary}`,
    });
  expectedUnits.forEach((expectedUnit, unit) =>
    expect
      .soft(
        getUsfmUnit(afterEdit.toString('utf8'), unit),
        deviation
          ? `${where}: ${unit} no longer reads as finding ${deviation.finding} pins it (${deviation.summary}); if it now reads as the gesture implies, the finding is fixed — remove the pin`
          : `${where}: ${unit} does not read as the gesture implies`,
      )
      .toBe(expectedUnit),
  );

  // Undo until the file is back to its bytes; each intermediate save must stay local too.
  let current = afterEdit;
  let presses = 0;
  // Sequential: each press waits for its own save before deciding whether another is needed.
  /* eslint-disable no-await-in-loop */
  while (!current.equals(before) && presses < MAX_UNDO_PRESSES) {
    recorder.beginPhase(`${where}: undo press ${presses + 1}`, savesOnly(bookFile));
    await editorInput.press(UNDO_KEY);
    presses += 1;
    const next = await recorder.waitForSave(mainPage, bookFile, { from: current });
    if (!next) break;
    current = next;
    await expectChangesOnlyIn(
      bookFile,
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
    description: `${where}: gesture ${performedAt - startedAt}ms, its save landed ${savedAt - performedAt}ms later (with the ${ECHO_ARRIVAL_MS}ms echo pause), ${presses} undo press(es) landed ${Date.now() - savedAt}ms later`,
  });
  await expectSameBytes(
    bookFile,
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
 * for each chapter, all under one {@link ProjectWriteRecorder} that judges both books' writes, then
 * a final check that nothing reached a book after its step finished.
 */
export async function runNoUnaskedEdits(
  { mainPage, electronApp }: { mainPage: Page; electronApp: ElectronApplication },
  view: EditableViewCase,
): Promise<void> {
  // Heavy isolated test: its own Electron instance, then two chapters of saves and undos.
  // `setTimeout` replaces the budget outright.
  test.setTimeout(900_000);

  if (view.interfaceMode === 'power') await waitForHomeTab(mainPage);
  // Simple mode's layout has no Home tab; this also suppresses the onboarding tour.
  else await waitForAppReady(mainPage);
  await makeSampleProjectEditableExpectingOnlyThat();

  // Recording from before any editor is opened; the book files are the only ones judged.
  const recorder = new ProjectWriteRecorder(
    `${view.name}: opening the editor`,
    CHAPTERS.map((chapter) => chapter.bookFile),
  );
  try {
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
        const where = `${chapter.bookFile} (${view.name})`;

        recorder.beginPhase(`${where}: opening ${chapter.reference}`);
        await navigateToolbarBcv(mainPage, chapter.reference);
        await expect(editorInput).toContainText(chapter.renderedText, { timeout: 60_000 });
        // The positive view check: the bytes below are this view's, not some other view's.
        await expect
          .poll(
            () =>
              editorInput.evaluate((root, selector) => root.matches(selector), view.rootSelector),
            {
              message: `the editor should be showing ${view.name} (${view.rootSelector})`,
              timeout: 30_000,
            },
          )
          .toBe(true);

        const atRest = await test.step('loading writes nothing; first save; at rest', () =>
          runLoadAndUndoSteps(recorder, mainPage, editorInput, chapter, installed, where));
        // Chained, not concurrent: each gesture starts from the file the previous one left.
        const settled = await chapter.localEdits.reduce(async (previous, edit) => {
          const before = await previous;
          return test.step(edit.label, () =>
            runLocalEdit(recorder, context, view, chapter, edit, before),
          );
        }, Promise.resolve(atRest));
        settledBooks.set(chapter.bookFile, settled);
      });
    await runChapter(CHAPTERS[0]);
    await runChapter(CHAPTERS[1]);

    // Leaving a chapter flushes any pending save; nothing may reach a book after its step finished.
    await recorder.finishAndVerify(mainPage);
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
  } finally {
    recorder.stop();
  }
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
  const projectDir = installedProjectDir();
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
 *
 * `seededFiles`, by file name, are the files a spec wrote over the bundled ones before the app
 * started (`prepareProjectRoot`): those bytes are expected in their place.
 */
async function makeSampleProjectEditableExpectingOnlyThat(
  seededFiles: ReadonlyMap<string, Buffer> = new Map(),
): Promise<ProjectSnapshot> {
  await waitForSampleProjectMetadata();
  const bundled = new Map([...readBundledProject(), ...seededFiles]);
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
 * anything to the project. Every step is a phase of one {@link ProjectWriteRecorder} that asks for
 * no write, so no file of the installed project may change its bytes or its modification time, or
 * be added or removed, at any point from before the editor opened to the end of the run; and the
 * attempted edits must leave the editor's text as it was.
 */
export async function runPreviewWritesNothing({
  mainPage,
  electronApp,
}: {
  mainPage: Page;
  electronApp: ElectronApplication;
}): Promise<void> {
  // Heavy isolated test: its own Electron instance, then two chapters of gestures.
  test.setTimeout(600_000);

  await waitForHomeTab(mainPage);
  // Editable, so Preview is read-only because of the view and not because of the project.
  const before = await makeSampleProjectEditableExpectingOnlyThat();
  const recorder = new ProjectWriteRecorder('Preview: opening the editor', 'project');
  try {
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
    const clickText = (text: string) =>
      editorInput.getByText(text, { exact: false }).first().click();

    const runChapter = ({ chapter, copies }: PreviewChapterCase) =>
      test.step(`Preview: ${chapter.label}`, async () => {
        recorder.beginPhase(`Preview: opening ${chapter.reference}`);
        await goTo(chapter.reference, chapter.renderedText);
        await expectPreview();

        await test.step('scrolling, clicking, selecting and copying', async () => {
          recorder.beginPhase(
            `Preview: scrolling, clicking, selecting and copying in ${chapter.reference}`,
          );
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
        });

        await test.step('a footnote caller opens its note in the footnotes pane', async () => {
          recorder.beginPhase(`Preview: opening a footnote in ${chapter.reference}`);
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
        });

        await test.step('trying to edit changes nothing', async () => {
          recorder.beginPhase(`Preview: trying to edit ${chapter.reference}`);
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
          await mainPage.waitForTimeout(EDIT_RENDERED_MS);
          expect
            .soft(
              await editorInput.textContent(),
              `${chapter.reference}: Delete, Backspace, Enter, typing or pasting changed Preview's text`,
            )
            .toBe(textBefore);
          await expectPreview();
        });
      });

    await runChapter(PREVIEW_CHAPTERS[0]);

    await test.step('Preview: to Jonah 2 and back by chapter', async () => {
      recorder.beginPhase('Preview: moving to Jonah 2 and back');
      await goTo(JONAH_2.reference, JONAH_2.renderedText);
      await goTo(PREVIEW_CHAPTERS[0].chapter.reference, PREVIEW_CHAPTERS[0].chapter.renderedText);
      await expectPreview();
    });

    await runChapter(PREVIEW_CHAPTERS[1]);

    await test.step('Preview: to Standard view and back', async () => {
      const { renderedText } = PREVIEW_CHAPTERS[1].chapter;
      recorder.beginPhase('Preview: switching to Standard view');
      await clickText(renderedText);
      await mainPage.keyboard.press(VIEW_TOGGLE_KEY);
      await expect(editorInput).toHaveClass(/\bmarker-editable\b/, { timeout: 20_000 });
      await expect(editorInput).toHaveAttribute('contenteditable', 'true');
      recorder.beginPhase('Preview: switching back to Preview');
      await clickText(renderedText);
      await mainPage.keyboard.press(VIEW_TOGGLE_KEY);
      await expectPreview();
    });

    await recorder.finishAndVerify(mainPage);
    await expectProjectUnchanged(before, 'the end of the run');
  } finally {
    recorder.stop();
  }
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
 * Expectations are computed from the bytes on disk, never from what the editor shows. One
 * {@link ProjectWriteRecorder} judges every file of the project for the whole run: each step is a
 * phase that asks for exactly its save of the book and of the book's `.BAK`, or for no write.
 */
export async function runFootnotesPaneRowEdits(
  { mainPage, electronApp }: { mainPage: Page; electronApp: ElectronApplication },
  view: EditableViewCase,
): Promise<void> {
  // Heavy isolated test: its own Electron instance, then several saves per note.
  test.setTimeout(900_000);

  if (view.interfaceMode === 'power') await waitForHomeTab(mainPage);
  else await waitForAppReady(mainPage);
  await makeSampleProjectEditableExpectingOnlyThat();
  const recorder = new ProjectWriteRecorder(`${view.name}: opening the editor`, 'project');
  try {
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
        const { bookFile } = chapter;
        // ParatextData keeps the book as it was before each save in a `.BAK` beside it.
        const backupFile = `${bookFile}.BAK`;
        const where = `${bookFile} (${view.name})`;
        /** A phase's rules for one save of the book from `before` to `result`, and of its backup. */
        const bookSave = (before: Buffer, result?: Buffer): ReadonlyMap<string, WriteRule> =>
          new Map([
            [bookFile, savedAs(result)],
            [backupFile, savedAs(before)],
          ]);

        recorder.beginPhase(`${where}: opening ${chapter.reference}`);
        await navigateToolbarBcv(mainPage, chapter.reference);
        await expect(editorInput).toContainText(chapter.renderedText, { timeout: 60_000 });
        await expect
          .poll(
            () =>
              editorInput.evaluate((root, selector) => root.matches(selector), view.rootSelector),
            {
              message: `the editor should be showing ${view.name} (${view.rootSelector})`,
              timeout: 30_000,
            },
          )
          .toBe(true);

        // Chained, not concurrent: one row editor at a time.
        const forEachNote = (run: (note: FootnoteRowCase) => Promise<void>) =>
          chapter.notes.reduce(async (previous, note) => {
            await previous;
            await run(note);
          }, Promise.resolve());

        await forEachNote((note) =>
          test.step(`${note.label}: opening its row and leaving by ${note.leaves.unchanged} writes nothing`, async () => {
            recorder.beginPhase(
              `${where}: opening ${note.label} in the row editor and leaving it by ${note.leaves.unchanged}`,
            );
            await editRow(chapter, note, note.leaves.unchanged, async () => {
              await selectInEditor(rowEditor, note.typePoint);
              await mainPage.keyboard.press('ArrowRight');
              await mainPage.keyboard.press('ArrowLeft');
            });
          }),
        );

        const atRest =
          await test.step('the first save of the chapter, from the Scripture text', async () => {
            recorder.beginPhase(
              `${where}: the first save, typing "${TYPED_CHARACTER}" in the Scripture text`,
              bookSave(installed),
            );
            await selectInEditor(editorInput, chapter.textPoint);
            await mainPage.keyboard.type(TYPED_CHARACTER);
            const afterTyping = await recorder.waitForSave(mainPage, bookFile, {
              from: installed,
            });
            if (!afterTyping)
              throw new Error(`${bookFile}: typing in the Scripture text never saved to disk`);
            recorder.beginPhase(
              `${where}: the first save, deleting the typed "${TYPED_CHARACTER}"`,
              bookSave(afterTyping),
            );
            await selectInEditor(
              editorInput,
              pointAfterInsertion(chapter.textPoint, TYPED_CHARACTER),
            );
            await mainPage.keyboard.press('Backspace');
            const afterDeleting = await recorder.waitForSave(mainPage, bookFile, {
              from: afterTyping,
            });
            if (!afterDeleting)
              throw new Error(`${bookFile}: deleting in the Scripture text never saved to disk`);
            await expectSameBytes(
              bookFile,
              expectedAfterFirstSave(installed, chapter.chapterNum),
              afterDeleting,
              'installed-with-known-first-save-normalization',
              'after-first-edit-and-delete',
              `${bookFile}: the first save of ${chapter.reference} changed more (or less) than the known first-save normalization`,
            );
            return afterDeleting;
          });

        /**
         * Runs one row session as a phase that asks for the book to become exactly `expected`, its
         * backup to become the book before the save, and no other write; checks the book and its
         * backup as soon as the save lands. Returns the book as saved.
         */
        const expectRowSave = async (
          label: string,
          before: Buffer,
          expected: Buffer,
          session: () => Promise<void>,
        ): Promise<Buffer> => {
          recorder.beginPhase(label, bookSave(before, expected));
          await session();
          const saved = await recorder.waitForSave(mainPage, bookFile, {
            from: before,
            result: expected,
          });
          if (!saved) {
            expect
              .soft(saved, `${label} never saved to disk within ${SAVE_LANDED_TIMEOUT_MS}ms`)
              .toBeDefined();
            return before;
          }
          await expectSameBytes(bookFile, expected, saved, 'expected', 'saved', label);
          await expectSameBytes(
            backupFile,
            before,
            recorder.lastSeen(backupFile) ?? Buffer.alloc(0),
            'book-before-the-save',
            'backup',
            `${label}: the book's backup is not the book as it was before the save`,
          );
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
              description: `${where}: ${note.label}: "${TYPED_CHARACTER}" expected at byte ${typed.byteOffset}`,
            });
            const afterTyping = await expectRowSave(
              `${where}: typing "${TYPED_CHARACTER}" at ${note.typePoint} in ${note.label} and leaving by ${note.leaves.typed}`,
              atRest,
              typed.bytes,
              () =>
                editRow(chapter, note, note.leaves.typed, async () => {
                  await selectInEditor(rowEditor, note.typePoint);
                  await mainPage.keyboard.type(TYPED_CHARACTER);
                }),
            );
            await expectRowSave(
              `${where}: deleting the typed "${TYPED_CHARACTER}" in ${note.label} and leaving by ${note.leaves.deleted}`,
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
              `${where}: copying ${JSON.stringify(copied)} in ${note.label} and pasting it at ${copyPaste.destination}`,
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
              `${where}: deleting the pasted ${JSON.stringify(copied)} in ${note.label}`,
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

        const settled = recorder.lastSeen(bookFile) ?? Buffer.alloc(0);
        settledBooks.set(bookFile, settled);
        await expectSameBytes(
          bookFile,
          atRest,
          settled,
          'at-rest',
          'after-its-notes',
          `${bookFile}: the book does not read as it did at rest once every note's edit was taken back`,
        );
      });

    await FOOTNOTE_CHAPTERS.reduce(async (previous, chapter) => {
      await previous;
      await runChapter(chapter);
    }, Promise.resolve());

    // Leaving a chapter flushes any pending save; nothing may reach a book after its step finished.
    await recorder.finishAndVerify(mainPage);
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
  } finally {
    recorder.stop();
  }
}

// #endregion

// #region Whitespace and invisible characters

/**
 * The project's `AllowInvisibleChars` (`platformScripture.allowInvisibleCharacters`, Paratext 9's
 * "allow invisible characters"): `on` stores a no-break space in the USFM as U+00A0 itself and `~`
 * as an ordinary tilde; `off`, the default, spells a no-break space `~`.
 */
export type InvisibleCharactersSetting = 'on' | 'off';

const NO_BREAK_SPACE = ' ';

/** Each character the run seeds, types and pastes, by the name its messages use. */
const INVISIBLE_CHARACTERS = {
  'no-break space U+00A0': NO_BREAK_SPACE,
  'tilde ~': '~',
  'zero-width space U+200B': '​',
  'zero-width non-joiner U+200C': '‌',
  'zero-width joiner U+200D': '‍',
  'word joiner U+2060': '⁠',
  'narrow no-break space U+202F': ' ',
  'thin space U+2009': ' ',
  'en space U+2002': ' ',
  'em space U+2003': ' ',
  'hair space U+200A': ' ',
  'ideographic space U+3000': '　',
  'left-to-right mark U+200E': '‎',
  'right-to-left mark U+200F': '‏',
  'soft hyphen U+00AD': '­',
  'zero-width no-break space U+FEFF': '﻿',
} as const;

type InvisibleCharacterName = keyof typeof INVISIBLE_CHARACTERS;

/** The editor's internal stand-in for a stored no-break space; it must never leave the editor. */
const NBSP_STAND_IN = '\u001A';

/** Escapes every character outside printable ASCII, so a message shows which one it is. */
function visible(text: string): string {
  return text.replace(
    /[^\x20-\x7E]/g,
    (character) => `<U+${character.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}>`,
  );
}

/** How the project's USFM spells a no-break space under `setting`. */
function noBreakSpaceSpelling(setting: InvisibleCharactersSetting): string {
  return setting === 'on' ? NO_BREAK_SPACE : '~';
}

/**
 * The book the run seeds and the chapter it edits: Jonah 3 is plain prose — paragraphs and verses,
 * no notes or character spans — so every difference is about the characters.
 */
const INVISIBLE_CHAPTER: ChapterCase = {
  label: 'Jonah 3 — seeded with whitespace and invisible characters',
  reference: 'Jonah 3:1',
  chapterNum: 3,
  bookFile: '32JONengWEBUS.SFM',
  renderedText: 'he didn',
  localEdits: [],
};

/** Another chapter of the same book, to navigate to and back; the edits never touch it. */
const INVISIBLE_OTHER_CHAPTER = { reference: 'Jonah 4:1', renderedText: 'sun beat on' };

/**
 * Where the seeded characters go: each verse of the bundled Jonah 3 whose text is replaced, with
 * the replacement for `setting`. Every seeded character sits between two non-space characters, so
 * no whitespace run forms around it and Paratext's whitespace regularization leaves it alone. With
 * the setting off, `~` is the file's no-break space; with it on, the no-break space is U+00A0 and
 * the second `~` is an ordinary tilde.
 */
function seededVerses(
  setting: InvisibleCharactersSetting,
): Array<{ unit: string; bundled: string; seeded: string }> {
  const c = INVISIBLE_CHARACTERS;
  return [
    {
      unit: '3:5',
      bundled:
        'The people of Nineveh believed God; and they proclaimed a fast and put on sackcloth, from their greatest even to their least.',
      seeded:
        `The people${noBreakSpaceSpelling(setting)}of${c['zero-width space U+200B']}Nineveh ` +
        `believed${c['narrow no-break space U+202F']}God; and${c['thin space U+2009']}they ` +
        `proclaimed${c['en space U+2002']}a fast and${c['em space U+2003']}put ` +
        `on${c['hair space U+200A']}sackcloth, from${c['ideographic space U+3000']}their greatest even to their least.`,
    },
    {
      unit: '3:6',
      bundled:
        'The news reached the king of Nineveh, and he arose from his throne, took off his royal robe, covered himself with sackcloth, and sat in ashes.',
      seeded:
        `The news reached the king of Nine${c['zero-width non-joiner U+200C']}veh, and he ` +
        `a${c['zero-width joiner U+200D']}rose from his throne, took${c['word joiner U+2060']}off ` +
        `his royal${c['tilde ~']}robe, covered him${c['soft hyphen U+00AD']}self ` +
        `with${c['left-to-right mark U+200E']} sackcloth, and sat${c['right-to-left mark U+200F']} ` +
        `in a${c['zero-width no-break space U+FEFF']}shes.`,
    },
    {
      unit: '4:1',
      bundled: 'But it displeased Jonah exceedingly, and he was angry.',
      seeded: `But it displeased Jonah exceed${c['zero-width no-break space U+FEFF']}ingly, and he was angry.`,
    },
  ];
}

/** The bundled book with {@link seededVerses} in place. */
function seededBook(setting: InvisibleCharactersSetting): Buffer {
  const text = seededVerses(setting).reduce(
    (book, { bundled, seeded }) => {
      if (book.split(bundled).length !== 2)
        throw new Error(`The bundled book should hold ${JSON.stringify(bundled)} exactly once`);
      return book.replace(bundled, seeded);
    },
    fs.readFileSync(path.join(BUNDLED_WEB_DIR, INVISIBLE_CHAPTER.bookFile), 'utf8'),
  );
  return Buffer.from(text, 'utf8');
}

/** `book` with every zero-width no-break space gone from chapter `chapterNum`, and only there. */
function withoutZeroWidthNoBreakSpacesInChapter(book: Buffer, chapterNum: number): Buffer {
  const lines = book.toString('utf8').split('\n');
  const start = lines.findIndex((line) => new RegExp(`^\\\\c ${chapterNum}(?!\\d)`).test(line));
  if (start < 0) throw new Error(`No \\c ${chapterNum} line in the book`);
  const next = lines.findIndex((line, index) => index > start && /^\\c \d+/.test(line));
  const end = next < 0 ? lines.length : next;
  return Buffer.from(
    lines
      .map((line, index) =>
        index >= start && index < end
          ? line.replaceAll(INVISIBLE_CHARACTERS['zero-width no-break space U+FEFF'], '')
          : line,
      )
      .join('\n'),
    'utf8',
  );
}

/** The bundled settings file with `AllowInvisibleChars` turned on, as Paratext 9 writes it. */
function settingsAllowingInvisibleCharacters(): Buffer {
  const text = fs.readFileSync(path.join(BUNDLED_WEB_DIR, SETTINGS_FILE), 'utf8');
  if (text.includes('AllowInvisibleChars'))
    throw new Error(`The bundled ${SETTINGS_FILE} should not set AllowInvisibleChars`);
  return Buffer.from(
    text.replace(
      '<Editable>F</Editable>\n',
      '<Editable>F</Editable>\n  <AllowInvisibleChars>T</AllowInvisibleChars>\n',
    ),
    'utf8',
  );
}

/** The files the run writes over the bundled sample before the app starts, by file name. */
function invisibleCharactersSeededFiles(setting: InvisibleCharactersSetting): Map<string, Buffer> {
  const files = new Map([[INVISIBLE_CHAPTER.bookFile, seededBook(setting)]]);
  if (setting === 'on') files.set(SETTINGS_FILE, settingsAllowingInvisibleCharacters());
  return files;
}

/**
 * The `test.use()` options of an invisible-characters spec: {@link noUnaskedEditsTestOptions}, and
 * the sample installed into the isolated root before the app starts with the seeded book (and, for
 * `on`, the setting) in place. The backend installs the sample only into a root with no project, so
 * this writes the whole project.
 */
export function invisibleCharactersTestOptions(
  view: Pick<EditableViewCase, 'interfaceMode'>,
  setting: InvisibleCharactersSetting,
) {
  return noUnaskedEditsTestOptions(view, (projectRoot) => {
    const projectDir = path.join(projectRoot, INSTALLED_WEB_FOLDER);
    fs.mkdirSync(projectDir, { recursive: true });
    const seeded = invisibleCharactersSeededFiles(setting);
    readBundledProject().forEach((bytes, file) =>
      fs.writeFileSync(path.join(projectDir, file), seeded.get(file) ?? bytes),
    );
  });
}

/**
 * Where each character is typed and pasted: the middle of a word of Jonah 3 (each point's text
 * occurs once in the chapter), so no whitespace run forms around it.
 */
const INSERTION_POINTS: Array<{ name: InvisibleCharacterName; unit: string; point: TextPoint }> = [
  { name: 'no-break space U+00A0', unit: '3:1', point: 'the sec|ond time' },
  { name: 'tilde ~', unit: '3:2', point: 'and pre|ach to it' },
  { name: 'zero-width space U+200B', unit: '3:3', point: 'an exceed|ingly great' },
  { name: 'zero-width non-joiner U+200C', unit: '3:4', point: 'be over|thrown' },
  { name: 'zero-width joiner U+200D', unit: '3:7', point: 'a procla|mation' },
  { name: 'word joiner U+2060', unit: '3:7', point: 'and pub|lished' },
  { name: 'narrow no-break space U+202F', unit: '3:7', point: 'his no|bles' },
  { name: 'thin space U+2009', unit: '3:7', point: 'nor fl|ock' },
  { name: 'en space U+2002', unit: '3:8', point: 'cry might|ily' },
  { name: 'em space U+2003', unit: '3:8', point: 'the vio|lence' },
  { name: 'hair space U+200A', unit: '3:8', point: 'turn every|one' },
  { name: 'ideographic space U+3000', unit: '3:9', point: 'his fi|erce' },
  { name: 'left-to-right mark U+200E', unit: '3:9', point: 'not per|ish' },
  { name: 'right-to-left mark U+200F', unit: '3:10', point: 'their wor|ks' },
  { name: 'soft hyphen U+00AD', unit: '3:10', point: 'the disas|ter' },
  { name: 'zero-width no-break space U+FEFF', unit: '3:10', point: 'God sa|w their' },
];

/** The gesture that puts a character into the text. */
type InsertionGesture = 'typed' | 'pasted';

/**
 * What the file must hold where `name` was entered by `gesture`, as Paratext 9 saves it, in either
 * view:
 *
 * - A zero-width no-break space (U+FEFF) is dropped, in either setting: Paratext 9's editor uses it
 *   only to position its caret and removes every one from the text it saves.
 * - A no-break space typed as a character with the setting off is a space: the author's no-break
 *   space is typed as `~`, and Paratext 9 saves every U+00A0 left in its view as a space unless the
 *   project allows invisible characters. Pasted, it is the project's no-break space.
 * - Any other no-break space is spelled as the project stores one (`~` off, U+00A0 on), and every
 *   other character is saved as itself.
 */
function savedInsertion(
  setting: InvisibleCharactersSetting,
  gesture: InsertionGesture,
  name: InvisibleCharacterName,
): string {
  const character = INVISIBLE_CHARACTERS[name];
  if (name === 'zero-width no-break space U+FEFF') return '';
  if (character !== NO_BREAK_SPACE) return character;
  return setting === 'off' && gesture === 'typed' ? ' ' : noBreakSpaceSpelling(setting);
}

/**
 * Counts the places where the editor's text holds one character between `point`'s two halves — what
 * was entered there; the halves may sit in different text nodes. With `select`, and exactly one
 * place, also selects that character by setting the DOM selection, and waits for the editor to
 * adopt it.
 */
async function findEnteredCharacter(
  editorInput: Locator,
  point: TextPoint,
  select: boolean,
): Promise<number> {
  const [before, after] = splitPoint(point);
  return editorInput.evaluate(
    async (root, { halves, shouldSelect, fallbackMs }) => {
      const nodes: Text[] = [];
      const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode())
        // SHOW_TEXT yields only Text nodes.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        nodes.push(node as Text);
      const text = nodes.map((node) => node.data).join('');
      const starts: number[] = [];
      for (let at = text.indexOf(halves.before); at >= 0; at = text.indexOf(halves.before, at + 1))
        if (text.startsWith(halves.after, at + halves.before.length + 1)) starts.push(at);
      if (starts.length !== 1 || !shouldSelect) return starts.length;
      // Maps an offset in the joined text to a node and an offset in it.
      const locate = (offset: number) => {
        let remaining = offset;
        const index = nodes.findIndex((node) => {
          if (remaining < node.data.length) return true;
          remaining -= node.data.length;
          return false;
        });
        return { node: nodes[index], offset: remaining };
      };
      const start = locate(starts[0] + halves.before.length);
      const end = locate(starts[0] + halves.before.length + 1);
      const document = root.ownerDocument;
      const selection = document.getSelection();
      // An unchanged selection fires no `selectionchange`, and the editor already holds it.
      const isUnchanged =
        document.activeElement === root &&
        selection?.anchorNode === start.node &&
        selection.anchorOffset === start.offset &&
        selection.focusNode === end.node &&
        selection.focusOffset === end.offset;
      if (root instanceof HTMLElement) root.focus({ preventScroll: true });
      selection?.setBaseAndExtent(start.node, start.offset, end.node, end.offset);
      if (isUnchanged) return 1;
      // Lexical adopts the selection in its own `selectionchange` listener, registered before this
      // one, and commits that update before the next frame.
      await new Promise<void>((resolve) => {
        const fallback = setTimeout(resolve, fallbackMs);
        document.addEventListener(
          'selectionchange',
          () => {
            clearTimeout(fallback);
            requestAnimationFrame(() => resolve());
          },
          { once: true },
        );
      });
      return 1;
    },
    { halves: { before, after }, shouldSelect: select, fallbackMs: SELECTION_CHANGE_FALLBACK_MS },
  );
}

/**
 * Selects the one character the editor's text holds between `point`'s two halves — what was entered
 * there — by setting the DOM selection, which the editor adopts. Returns how many places matched;
 * selects only when exactly one did.
 */
async function selectEnteredCharacter(editorInput: Locator, point: TextPoint): Promise<number> {
  return findEnteredCharacter(editorInput, point, true);
}

/**
 * Waits until the editor's text holds one character between `point`'s two halves. A paste reads the
 * clipboard after the key press has returned, so the next clipboard write has to wait for this or
 * the editor pastes that next payload instead.
 */
async function waitForEnteredCharacter(editorInput: Locator, point: TextPoint): Promise<void> {
  await expect
    .poll(() => findEnteredCharacter(editorInput, point, false), {
      message: `the character pasted at ${JSON.stringify(point)} never reached the editor`,
      timeout: 15_000,
    })
    .toBe(1);
}

/**
 * `book` with the characters of {@link INSERTION_POINTS} whose index `isEntered` accepts saved at
 * their points as {@link savedInsertion} says, and every other point as it is.
 */
function withEnteredCharacters(
  book: string,
  setting: InvisibleCharactersSetting,
  gesture: InsertionGesture,
  isEntered: (index: number) => boolean,
): string {
  const unitTexts = new Map<string, string>();
  INSERTION_POINTS.forEach(({ name, unit, point }, index) => {
    if (!isEntered(index)) return;
    const text = unitTexts.get(unit) ?? getUsfmUnit(book, unit) ?? '';
    unitTexts.set(
      unit,
      text.replace(pointText(point), insertAtPoint(point, savedInsertion(setting, gesture, name))),
    );
  });
  return withUnitTexts(book, unitTexts);
}

/** Whether `bytes` is one of `states`. */
function isOneOf(states: readonly Buffer[]): (bytes: Buffer) => boolean {
  return (bytes) => states.some((state) => state.equals(bytes));
}

/**
 * Enters every character of {@link INSERTION_POINTS} at its point by `gesture` — typed through the
 * keyboard (`~` as a key press; the others as the text input a keyboard layout or an input method
 * delivers) or pasted as plain text from the OS clipboard — and checks the save: each aimed verse
 * gains exactly the bytes Paratext 9 would save for it at its point ({@link savedInsertion}), and
 * nothing else in the book moves. Then deletes each one that was saved with the Delete key and
 * checks the file is back to its bytes.
 *
 * Entering and deleting are each a phase of `recorder` that asks for the book to reach its exact
 * result. The characters go in one after another, more than a debounce apart on a slow machine, so
 * a save can land partway; the phase accepts each state that holds the first characters of the
 * sequence and no others ({@link withEnteredCharacters}), and nothing else.
 */
async function enterAndDeleteEachCharacter(
  recorder: ProjectWriteRecorder,
  context: GestureContext,
  view: EditableViewCase,
  setting: InvisibleCharactersSetting,
  gesture: InsertionGesture,
  before: Buffer,
): Promise<Buffer> {
  const { mainPage, electronApp, editorInput } = context;
  const { bookFile } = INVISIBLE_CHAPTER;
  const where = `${bookFile} (${view.name}, AllowInvisibleChars ${setting})`;
  const beforeText = before.toString('utf8');
  const stateOf = (isEntered: (index: number) => boolean) =>
    Buffer.from(withEnteredCharacters(beforeText, setting, gesture, isEntered), 'utf8');
  const entryStates = INSERTION_POINTS.map((_point, count) => stateOf((index) => index <= count));
  const entered = entryStates[entryStates.length - 1];

  recorder.beginPhase(
    `${where}: entering the ${gesture} characters`,
    savesOnly(bookFile, entered, isOneOf(entryStates)),
  );
  const startedAt = Date.now();
  // Chained: each character is entered at its own point before the next is aimed.
  await INSERTION_POINTS.reduce(async (previous, { name, point }) => {
    await previous;
    const character = INVISIBLE_CHARACTERS[name];
    if (gesture === 'pasted')
      await electronApp.evaluate(({ clipboard }, plain) => clipboard.writeText(plain), character);
    await selectInEditor(editorInput, point);
    if (gesture === 'typed') {
      await mainPage.keyboard.type(character);
      return;
    }
    await mainPage.keyboard.press(PASTE_KEY);
    // A zero-width no-break space is not waited for: the editor may keep it out of its text. It is
    // entered last, so no clipboard write follows it to race its paste.
    if (name !== 'zero-width no-break space U+FEFF')
      await waitForEnteredCharacter(editorInput, point);
  }, Promise.resolve());

  const enteredAt = Date.now();
  const afterEntry = await recorder.waitForSave(mainPage, bookFile, {
    from: before,
    result: entered,
    isPartway: isOneOf(entryStates),
  });
  const savedAt = Date.now();
  if (!afterEntry) {
    expect
      .soft(afterEntry, `${where}: the ${gesture} characters never saved to disk`)
      .toBeDefined();
    return before;
  }
  const units = [...new Set(INSERTION_POINTS.map(({ unit }) => unit))];
  await expectChangesOnlyIn(
    bookFile,
    before,
    afterEntry,
    units,
    'before-entering',
    `after-${gesture}`,
    `${where}: entering the ${gesture} characters changed text outside ${units.join(', ')}`,
  );
  const afterText = afterEntry.toString('utf8');
  INSERTION_POINTS.forEach(({ name, unit, point }) => {
    const saved = savedInsertion(setting, gesture, name);
    const unitBefore = getUsfmUnit(beforeText, unit) ?? '';
    if (unitBefore.split(pointText(point)).length !== 2)
      throw new Error(`${where}: ${JSON.stringify(pointText(point))} is not once in ${unit}`);
    const unitAfter = getUsfmUnit(afterText, unit) ?? '';
    const [head, tail] = splitPoint(point);
    // What now lies between the point's two halves.
    const headAt = unitAfter.indexOf(head);
    const tailAt = headAt < 0 ? -1 : unitAfter.indexOf(tail, headAt + head.length);
    const savedThere =
      tailAt < 0 ? '(the point is gone)' : unitAfter.slice(headAt + head.length, tailAt);
    expect
      .soft(
        visible(savedThere),
        `${where}: ${gesture} ${name} should save as ${JSON.stringify(visible(saved))} at ${JSON.stringify(point)}`,
      )
      .toBe(visible(saved));
  });
  // Exactly: every aimed verse reads as its insertions imply, and nothing else in it moved.
  const enteredText = entered.toString('utf8');
  units.forEach((unit) =>
    expect
      .soft(
        visible(getUsfmUnit(afterText, unit) ?? ''),
        `${where}: ${unit} does not read as the ${gesture} characters imply`,
      )
      .toBe(visible(getUsfmUnit(enteredText, unit) ?? '')),
  );

  // Delete each one again; one that was dropped left nothing to delete. Each deletion state keeps
  // every character but the first ones deleted.
  const deletable = INSERTION_POINTS.flatMap(({ name }, index) =>
    savedInsertion(setting, gesture, name) === '' ? [] : [index],
  );
  const deletionStates = deletable.map((_index, count) =>
    stateOf((index) => !deletable.slice(0, count + 1).includes(index)),
  );
  recorder.beginPhase(
    `${where}: deleting the ${gesture} characters`,
    savesOnly(bookFile, before, isOneOf(deletionStates)),
  );
  const notFound: string[] = [];
  const deletingAt = Date.now();
  // Chained: each deletion is aimed at the text the one before it left.
  await INSERTION_POINTS.reduce(async (previous, { name, point }) => {
    await previous;
    if (savedInsertion(setting, gesture, name) === '') return;
    const matches = await selectEnteredCharacter(editorInput, point);
    if (matches === 1) await mainPage.keyboard.press('Delete');
    else notFound.push(`${name} at ${JSON.stringify(point)}: ${matches} matches`);
  }, Promise.resolve());
  expect
    .soft(notFound.join('\n'), `${where}: some ${gesture} characters could not be found to delete`)
    .toBe('');
  const deletedAt = Date.now();
  const afterDelete = await recorder.waitForSave(mainPage, bookFile, {
    from: afterEntry,
    result: before,
    isPartway: isOneOf(deletionStates),
  });
  test.info().annotations.push({
    type: 'timing',
    description: `${where}: ${gesture}: entering ${enteredAt - startedAt}ms, its save landed ${savedAt - enteredAt}ms later, checks ${deletingAt - savedAt}ms, deleting ${deletedAt - deletingAt}ms, its save landed ${Date.now() - deletedAt}ms later (each with the ${ECHO_ARRIVAL_MS}ms echo pause)`,
  });
  const current = afterDelete ?? afterEntry;
  await expectSameBytes(
    bookFile,
    before,
    current,
    'before-entering',
    `after-deleting-${gesture}`,
    afterDelete
      ? `${where}: deleting the ${gesture} characters did not restore the file byte for byte`
      : `${where}: deleting the ${gesture} characters never saved to disk`,
  );
  return current;
}

/**
 * Copies a seeded verse's text through the OS clipboard and checks what reached it: the seeded
 * characters as the view gives them out, and never the editor's internal stand-in.
 */
async function copySeededVerse(
  context: GestureContext,
  view: EditableViewCase,
  setting: InvisibleCharactersSetting,
  copy: { unit: string; from: TextPoint; to: TextPoint },
  bookText: string,
): Promise<void> {
  const { electronApp, editorInput } = context;
  const where = `${view.name}, AllowInvisibleChars ${setting}: copying ${copy.unit}`;
  const unitText = getUsfmUnit(bookText, copy.unit);
  if (unitText === undefined) throw new Error(`The book has no unit ${copy.unit}`);
  // Every view copies a no-break space as the project spells it, as Paratext 9 does: Standard view
  // copies the USFM bytes, and a hidden-marker view, which copies the text as shown, writes a
  // stored no-break space as `~` with the setting off and as U+00A0 with it on.
  const expected = usfmBetween(unitText, copy.from, copy.to);

  await electronApp.evaluate(
    ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
    CLIPBOARD_SENTINEL,
  );
  await selectInEditor(editorInput, copy.from, copy.to);
  await editorInput.press(COPY_KEY);
  await expect
    .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
      message: `${where} never reached the OS clipboard`,
      timeout: 15_000,
    })
    .not.toBe(CLIPBOARD_SENTINEL);
  const { text, html } = await electronApp.evaluate(({ clipboard }) => ({
    text: clipboard.readText(),
    html: clipboard.readHTML(),
  }));
  expect.soft(visible(text), `${where}: the copied plain text`).toBe(visible(expected));
  expect
    .soft(text.includes(NBSP_STAND_IN), `${where}: the plain text holds the editor's stand-in`)
    .toBe(false);
  expect
    .soft(html.includes(NBSP_STAND_IN), `${where}: the html holds the editor's stand-in`)
    .toBe(false);
}

/** The copies {@link copySeededVerse} makes: each spans one seeded verse's characters. */
const SEEDED_COPIES = [
  { unit: '3:5', from: 'The |people', to: 'even to |their least' },
  { unit: '3:6', from: 'king of |Nine', to: '|shes.' },
];

/**
 * The whitespace-and-invisible-characters run's whole test body, for `view` with the project's
 * `AllowInvisibleChars` `setting`. The bundled WEB has none of these characters, so the run seeds
 * them into Jonah 3 before the app starts ({@link invisibleCharactersTestOptions}), then:
 *
 * 1. **Opening and navigating writes nothing.** Open the chapter, go to another and back: no file of
 *    the project changes.
 * 2. **An edit saves the chapter without a stored zero-width no-break space.** Copying first gives
 *    every seeded character out, that one included. Then the first save and an undo, then the same
 *    at rest ({@link runLoadAndUndoSteps}): as in Paratext 9, the save the edit caused drops U+FEFF
 *    from the chapter it rewrites and no further, so the one in the next chapter stays. Every other
 *    seeded character comes back exactly as seeded, with only the known first-save normalization
 *    around them.
 * 3. **Each character typed, then pasted, saves as Paratext 9 saves it.** In the middle of a word, so
 *    no whitespace rule applies: a no-break space saves as the project spells it (`~` with the
 *    setting off, U+00A0 with it on) — but one typed with the setting off is a space — a zero-width
 *    no-break space is dropped, and every other character saves as itself ({@link savedInsertion});
 *    deleting each restores the file.
 * 4. **Copying gives the characters out.** With the chapter loaded again, so the editor holds what the
 *    file does, a copy of each seeded verse puts them on the clipboard as Paratext 9 does — a
 *    no-break space as the project spells it — never as the editor's internal stand-in (U+001A).
 * 5. **Typing goes on at the caret through a save that drops one.** Two keys in the next chapter, its
 *    save landing between them: both save side by side, and that chapter's U+FEFF goes.
 */
export async function runInvisibleCharacters(
  { mainPage, electronApp }: { mainPage: Page; electronApp: ElectronApplication },
  view: EditableViewCase,
  setting: InvisibleCharactersSetting,
): Promise<void> {
  test.setTimeout(600_000);

  if (view.interfaceMode === 'power') await waitForHomeTab(mainPage);
  else await waitForAppReady(mainPage);
  const seeded = invisibleCharactersSeededFiles(setting);
  await makeSampleProjectEditableExpectingOnlyThat(seeded);
  const installed = seeded.get(INVISIBLE_CHAPTER.bookFile);
  if (!installed) throw new Error('No seeded book');
  const { bookFile } = INVISIBLE_CHAPTER;
  const where = `${view.name}, AllowInvisibleChars ${setting}`;

  // Every file of the project is judged while the editor opens and navigates; from the first copy
  // on, the book file is.
  const recorder = new ProjectWriteRecorder(`${where}: opening the editor`, 'project');
  try {
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    const editorInput = editorFrame.locator('.editor-input').first();
    const context: GestureContext = { mainPage, electronApp, editorInput };

    const goTo = async (reference: string, renderedText: string) => {
      await navigateToolbarBcv(mainPage, reference);
      await expect(editorInput).toContainText(renderedText, { timeout: 60_000 });
    };

    await test.step(`${where}: opening and navigating writes nothing`, async () => {
      recorder.beginPhase(`${where}: opening ${INVISIBLE_CHAPTER.reference}`);
      await goTo(INVISIBLE_CHAPTER.reference, INVISIBLE_CHAPTER.renderedText);
      await expect
        .poll(
          () => editorInput.evaluate((root, selector) => root.matches(selector), view.rootSelector),
          { message: `the editor should be showing ${view.name}`, timeout: 30_000 },
        )
        .toBe(true);
      recorder.beginPhase(`${where}: going to ${INVISIBLE_OTHER_CHAPTER.reference}`);
      await goTo(INVISIBLE_OTHER_CHAPTER.reference, INVISIBLE_OTHER_CHAPTER.renderedText);
      recorder.beginPhase(`${where}: going back to ${INVISIBLE_CHAPTER.reference}`);
      await goTo(INVISIBLE_CHAPTER.reference, INVISIBLE_CHAPTER.renderedText);
    });

    recorder.scope = [bookFile];
    await test.step(`${where}: copying before any edit gives every stored character out`, async () => {
      recorder.beginPhase(`${where}: copying before any edit`);
      // Chained: both copies go through the one OS clipboard.
      await SEEDED_COPIES.reduce(async (previous, copy) => {
        await previous;
        await copySeededVerse(context, view, setting, copy, installed.toString('utf8'));
      }, Promise.resolve());
    });

    const atRest =
      await test.step(`${where}: an edit drops a stored U+FEFF from the chapter it saves`, () =>
        runLoadAndUndoSteps(
          recorder,
          mainPage,
          editorInput,
          INVISIBLE_CHAPTER,
          installed,
          `${bookFile} (${where})`,
          expectedAfterFirstSave(
            withoutZeroWidthNoBreakSpacesInChapter(installed, INVISIBLE_CHAPTER.chapterNum),
            INVISIBLE_CHAPTER.chapterNum,
          ),
        ));

    const afterTyped =
      await test.step(`${where}: each character typed saves as Paratext 9 saves it`, () =>
        enterAndDeleteEachCharacter(recorder, context, view, setting, 'typed', atRest));
    const afterPasted =
      await test.step(`${where}: each character pasted saves as Paratext 9 saves it`, () =>
        enterAndDeleteEachCharacter(recorder, context, view, setting, 'pasted', afterTyped));

    await test.step(`${where}: copying gives the characters out`, async () => {
      recorder.beginPhase(`${where}: reloading ${INVISIBLE_CHAPTER.reference} and copying`);
      // The editor holds a dropped U+FEFF until the chapter next loads.
      await goTo(INVISIBLE_OTHER_CHAPTER.reference, INVISIBLE_OTHER_CHAPTER.renderedText);
      await goTo(INVISIBLE_CHAPTER.reference, INVISIBLE_CHAPTER.renderedText);
      // Chained: both copies go through the one OS clipboard.
      await SEEDED_COPIES.reduce(async (previous, copy) => {
        await previous;
        await copySeededVerse(context, view, setting, copy, afterPasted.toString('utf8'));
      }, Promise.resolve());
    });

    await test.step(`${where}: typing goes on at the caret through a save that drops a U+FEFF`, async () => {
      const zeroWidthNoBreakSpace = INVISIBLE_CHARACTERS['zero-width no-break space U+FEFF'];
      recorder.beginPhase(`${where}: going to ${INVISIBLE_OTHER_CHAPTER.reference}`);
      await goTo(INVISIBLE_OTHER_CHAPTER.reference, INVISIBLE_OTHER_CHAPTER.renderedText);
      recorder.beginPhase(
        `${where}: typing "x" in ${INVISIBLE_OTHER_CHAPTER.reference}`,
        savesOnly(bookFile),
      );
      await selectInEditor(editorInput, 'he was |angry.');
      await mainPage.keyboard.type('x');
      // The second key must come after the first key's save has come back to the editor, which
      // nothing on screen marks, so the wait after that save lands is the whole save chain's.
      const afterFirstKey = await recorder.waitForSave(mainPage, bookFile, {
        from: afterPasted,
        pauseAfterMs: ECHO_SETTLED_MS,
      });
      recorder.beginPhase(
        `${where}: typing "y" in ${INVISIBLE_OTHER_CHAPTER.reference}`,
        savesOnly(bookFile),
      );
      // The caret is not placed again: the second key lands wherever the save's echo left it.
      await mainPage.keyboard.type('y');
      const afterSecondKey = await recorder.waitForSave(mainPage, bookFile, {
        from: afterFirstKey ?? afterPasted,
      });
      const text = (afterSecondKey ?? afterFirstKey ?? afterPasted).toString('utf8');
      const beforeNextChapter = (book: string) => book.slice(0, book.indexOf('\\c 4'));
      expect
        .soft(visible(text), `${where}: both keys should save at the caret, one after the other`)
        .toContain('exceedingly, and he was xyangry.');
      expect
        .soft(text.includes(zeroWidthNoBreakSpace), `${where}: the save should have dropped U+FEFF`)
        .toBe(false);
      expect
        .soft(
          visible(beforeNextChapter(text)),
          `${where}: an edit in Jonah 4 should not change the chapters before it`,
        )
        .toBe(visible(beforeNextChapter(afterPasted.toString('utf8'))));
    });

    await recorder.finishAndVerify(mainPage);
  } finally {
    recorder.stop();
  }
}

// #endregion
