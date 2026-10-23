/**
 * Puts the caret back after a document the editor was holding has been replaced.
 *
 * Replacing the document (`EditorRef.setUsj`) regenerates every node, so the caret the user was
 * typing with does not survive it and a fresh one has to be placed against the document that
 * replaced it. The editor reports no signal for having loaded one, and the load is asynchronous, so
 * a caret placed too early addresses the outgoing document: `setSelection` either lands nowhere —
 * leaving the caret wherever it was, which after `focus()` is the END of the chapter, where the
 * user's next Backspace deletes text they cannot see — or, worse, resolves against the outgoing
 * tree and is thrown away by the load that follows.
 *
 * So the caret is placed only once the editor is holding the document it addresses, and the
 * placement is read back to confirm it took. Until then it is retried, briefly, rather than guessed
 * at with one fixed delay.
 */

import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import {
  indexesFromUsjJsonPath,
  isUsjTextContentLocation,
  usjJsonPathFromIndexes,
  type MarkerContent,
  type Usj,
  type UsjDocumentLocation,
} from '@eten-tech-foundation/scripture-utilities';
import { USFM_MARKERS_MAP_PARATEXT_3_0, UsjReaderWriter } from 'platform-bible-utils';
import { correctEditorUsjVersion, deepEqualAcrossIframes } from './platform-scripture-editor.utils';

/** How often a caret placement that could not be made yet is retried. */
const CARET_RESTORE_RETRY_MS = 50;
/**
 * How long placements are retried before the attempt is abandoned.
 *
 * Long enough for a slow load of a long chapter, short enough that a caret can never appear under a
 * user who has given up waiting and put one somewhere themselves.
 */
const CARET_RESTORE_TIMEOUT_MS = 2000;

/** What a scheduled caret restore did, for the caller to report. */
export type CaretRestoreOutcome = 'restored' | 'abandoned';

/** What a settled caret restore hands its caller. */
export interface CaretRestoreResult {
  outcome: CaretRestoreOutcome;
  /** What the editor threw, when that is what ended the restore. */
  error?: unknown;
}

/** The editor operations a caret restore needs, so it can be driven in a test. */
export interface CaretRestoreEditor {
  /**
   * Whether the editor is holding the document the caret addresses. The caret is placed only when
   * this is true.
   */
  hasLoadedDocument: () => boolean;
  /** Places the caret. Makes no guarantee it took — see {@link CaretRestoreEditor.isCaretAt}. */
  setSelection: (selection: SelectionRange) => void;
  /**
   * Whether a placement at `target` took, read from where the caret now is. See
   * {@link isCaretPlacedAt} for reading the locations the editor reports.
   */
  isCaretAt: (target: SelectionRange) => boolean;
  /**
   * Gives the editor DOM focus. Called only once the caret is in place, because an editor focused
   * with no selection takes the end of the document instead — which is exactly what a restore with
   * no target wants, once the document it addresses has loaded.
   */
  focus: () => void;
}

/**
 * How a caret restore is scheduled, so a test can drive it without waiting.
 *
 * Generic in the handle its `setTimeout` hands back, so a stand-in is free to use whatever it likes
 * for one rather than having to pass off a number as a platform timer.
 */
export interface CaretRestoreTimers<THandle = ReturnType<typeof setTimeout>> {
  now: () => number;
  setTimeout: (callback: () => void, delayMs: number) => THandle;
  clearTimeout: (handle: THandle) => void;
}

/** The platform's own clock and timers, which every caller outside a test uses. */
export const PLATFORM_CARET_RESTORE_TIMERS: CaretRestoreTimers = {
  now: () => Date.now(),
  setTimeout: (callback, delayMs) => setTimeout(callback, delayMs),
  clearTimeout: (handle) => {
    clearTimeout(handle);
  },
};

/** A scheduled caret restore. */
export interface ScheduledCaretRestore {
  /** Stops the restore. Safe to call after it has finished, and more than once. */
  cancel: () => void;
}

/** USFM that is a line break and nothing else. */
const LINE_BREAK_ONLY_REGEX = /^[^\S\n]*\n\s*$/;

/**
 * `location`, with the one alias the location model allows spelled the canonical way: a position at
 * the end of a text that a marker follows is that marker's own location.
 */
function canonicalLocation(usj: Usj, location: UsjDocumentLocation): UsjDocumentLocation {
  if (!isUsjTextContentLocation(location)) return location;
  const indexes = indexesFromUsjJsonPath(location.jsonPath);
  const textIndex = indexes[indexes.length - 1];
  let siblings: MarkerContent[] | undefined = usj.content;
  indexes.slice(0, -1).forEach((index) => {
    const parent: MarkerContent | undefined = siblings?.[index];
    siblings = typeof parent === 'object' ? parent.content : undefined;
  });
  const text = siblings?.[textIndex];
  const next = siblings?.[textIndex + 1];
  if (typeof text !== 'string' || location.offset !== text.length || typeof next !== 'object')
    return location;
  return { jsonPath: usjJsonPathFromIndexes([...indexes.slice(0, -1), textIndex + 1]) };
}

/**
 * Whether the editor's caret, read back after placing it at `target`, shows that the placement
 * took. It took when the caret is at `target`'s own USFM position, however either is spelled: the
 * editor reports a caret held at the end of a text that a marker follows as the text's end rather
 * than as that marker's location, and holds two texts side by side as one. It also took when the
 * caret is at the start of the line after `target`, with nothing but the line break between them: a
 * view that hides markers cannot show a caret at the end of a line such as a chapter number's, and
 * puts it there instead. That is a different position, so this is not a location equality.
 *
 * @param usj The document both locations address.
 * @param caret Where the editor reports the caret.
 * @param target Where the caret was placed.
 * @param bookId The book `usj` is in, for a document with no `\id` of its own.
 */
export function isCaretPlacedAt(
  usj: Usj,
  caret: UsjDocumentLocation,
  target: UsjDocumentLocation,
  bookId: string,
): boolean {
  if (deepEqualAcrossIframes(canonicalLocation(usj, caret), canonicalLocation(usj, target)))
    return true;
  try {
    const usjReaderWriter = new UsjReaderWriter(correctEditorUsjVersion(usj), {
      markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
    });
    const indexOf = (location: UsjDocumentLocation) =>
      usjReaderWriter.usfmVerseLocationToIndexInUsfm(
        usjReaderWriter.usjDocumentLocationToUsfmVerseRefVerseLocation(location, bookId),
      );
    const [caretIndex, targetIndex] = [indexOf(caret), indexOf(target)];
    if (caretIndex === targetIndex) return true;
    // Native, as the indexes are: `UsjReaderWriter` counts the USFM in UTF-16 code units.
    return (
      caretIndex > targetIndex &&
      LINE_BREAK_ONLY_REGEX.test(usjReaderWriter.toUsfm().slice(targetIndex, caretIndex))
    );
  } catch {
    return false;
  }
}

/**
 * Places the caret at `target` once the editor holds the document that target addresses, retrying
 * until it does. With no `target`, the caret belongs at the end of the document, which is where
 * focusing an editor that has just loaded a document (and so has no selection) puts it — so the
 * restore then only focuses, once the load has happened.
 *
 * The selection is set BEFORE the editor is focused, because focusing an editor that has no
 * selection puts the caret at the end of the document — which is both wrong and destructive, since
 * the keys that follow edit the end of the chapter rather than where the user was working.
 *
 * @param target Where the caret belongs, in the coordinates of the document being loaded, or
 *   `undefined` for the end of that document.
 * @param editor The editor to place it in.
 * @param isStillWanted Asked before every attempt: false abandons the restore (the user has
 *   navigated away, or left the editor for another part of the app).
 * @param onSettled Called once with what happened, for the caller to log.
 * @param timers The clock and timer queue to schedule on — {@link PLATFORM_CARET_RESTORE_TIMERS}
 *   outside a test.
 * @returns A handle that cancels the restore — a second repair replaces the first rather than
 *   stacking behind it.
 */
export function scheduleCaretRestore<THandle = ReturnType<typeof setTimeout>>({
  target,
  editor,
  isStillWanted,
  onSettled,
  timers,
}: {
  target: SelectionRange | undefined;
  editor: CaretRestoreEditor;
  isStillWanted: () => boolean;
  onSettled?: (result: CaretRestoreResult) => void;
  timers: CaretRestoreTimers<THandle>;
}): ScheduledCaretRestore {
  const deadline = timers.now() + CARET_RESTORE_TIMEOUT_MS;
  let handle: THandle | undefined;

  const attempt = () => {
    handle = undefined;
    if (!isStillWanted()) return;

    try {
      if (editor.hasLoadedDocument()) {
        if (!target) {
          editor.focus();
          onSettled?.({ outcome: 'restored' });
          return;
        }
        editor.setSelection(target);
        // Read back rather than assumed: a placement against a document the editor is not holding
        // reports nothing and changes nothing, and that silence is the whole reason for the retry.
        if (editor.isCaretAt(target)) {
          editor.focus();
          onSettled?.({ outcome: 'restored' });
          return;
        }
      }
    } catch (error) {
      // An editor that threw once will throw again on the same call, so this stops rather than
      // retrying it every 50 ms for the rest of the window.
      onSettled?.({ outcome: 'abandoned', error });
      return;
    }

    if (timers.now() >= deadline) {
      onSettled?.({ outcome: 'abandoned' });
      return;
    }
    handle = timers.setTimeout(attempt, CARET_RESTORE_RETRY_MS);
  };

  handle = timers.setTimeout(attempt, CARET_RESTORE_RETRY_MS);

  return {
    cancel: () => {
      if (handle !== undefined) timers.clearTimeout(handle);
      handle = undefined;
    },
  };
}
