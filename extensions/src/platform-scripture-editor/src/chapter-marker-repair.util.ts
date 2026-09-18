/**
 * Keeps the `\c` marker in an edited chapter document agreeing with the chapter that document IS,
 * so the document can be written at all.
 *
 * Paratext refuses to write a chapter whose chapter marker disagrees with the chapter being written
 * (`ScrText.ValidateChapterNumber`): a wrong number, a second marker typed mid-chapter, and a
 * deleted marker are all hard rejections. The rejection does not remove the offending marker from
 * the editor, so once the document is in that state EVERY later save of that chapter is rejected
 * too — a chapter that silently stops saving, not a single lost keystroke. The fix is therefore to
 * repair the document on the way out rather than to stop the user from typing the edit.
 *
 * This is the USJ-level port of Paratext 9's `UsfmEditorTextLoader.FixChapterNumbers`, which does
 * the same job over USFM text, and it keeps that algorithm's behaviour — including its treatment of
 * chapter 1, where an introduction may legally sit before the chapter marker, or the chapter marker
 * may be absent altogether.
 */

import {
  MarkerContent,
  MarkerObject,
  Usj,
  usjJsonPathFromIndexes,
} from '@eten-tech-foundation/scripture-utilities';
import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import { resolveUsjToSaveToPdp } from './debounced-pdp-save.util';
import { deepEqualAcrossIframes } from './platform-scripture-editor.utils';

/** USJ `type` of a `\c` chapter marker node. */
const CHAPTER_TYPE = 'chapter';
/** The USFM marker a chapter node carries. */
const CHAPTER_MARKER = 'c';
/** USJ `type` of a paragraph node. */
const PARA_TYPE = 'para';
/**
 * Every USFM introduction paragraph marker begins with `i` (`\ip`, `\imt`, `\is`, `\iot`, …), so
 * the prefix alone identifies one.
 */
const INTRODUCTION_MARKER_PREFIX = 'i';

/** A chapter marker node found in a document's top-level content, with where it was found. */
interface ChapterEntry {
  /** Index of this chapter node in the document's top-level `content`. */
  index: number;
  chapterObject: MarkerObject;
}

/**
 * Where a chapter marker the repair removed from inside a top-level item used to sit — the index
 * path from that item down to the removed marker's parent, and the boundary in that parent's
 * repaired content the marker occupied.
 */
interface NestedRemoval {
  /** Content indexes from the top-level item down to the removed marker's parent. */
  parentIndexes: number[];
  /** The removed marker's index among its parent's repaired content. */
  childIndex: number;
}

/**
 * The caret target for a RESTORED chapter marker: the end of the document's text, rather than a
 * position in the repaired document.
 *
 * A restore means the editor was holding a chapter with no marker at all — a chapter the book has
 * not reached yet being typed into, or a chapter whose content was wiped — so the user is building
 * the chapter up and was typing at its end. The new marker is the wrong place for the caret: keys
 * typed there become part of the chapter number, which the next repair corrects straight back out.
 */
export const CARET_AT_DOCUMENT_END = 'end-of-document';

/** Where the caret belongs once a repaired document is in the editor. */
export type ChapterMarkerCaretTarget = SelectionRange | typeof CARET_AT_DOCUMENT_END;

/** The outcome of a repair pass: the document to use, and whether it differs from what came in. */
export interface ChapterMarkerRepairResult {
  /** The repaired document, or the input document unchanged when nothing needed repairing. */
  usj: Usj;
  /** Whether {@link usj} differs from the document handed in — i.e. whether a repair was made. */
  didRepair: boolean;
  /**
   * Where the caret belongs once {@link usj} is in the editor, or `undefined` when no repair was
   * made. Addresses the REPAIRED document: the editor is handed that document wholesale, which
   * regenerates every node key and leaves it with no caret at all, so the caret is placed afresh at
   * the site of the correction rather than carried across.
   */
  caretTarget: ChapterMarkerCaretTarget | undefined;
}

/** Whether `item` is a marker node rather than a bare text string. */
function isMarkerObject(item: MarkerContent | undefined): item is MarkerObject {
  return typeof item === 'object';
}

/** Whether `item` is a chapter marker node. */
function isChapterObject(item: MarkerContent): item is MarkerObject {
  return isMarkerObject(item) && item.type === CHAPTER_TYPE;
}

/**
 * Whether `item` is an introduction paragraph — the one kind of content that may legally sit
 * between the start of a chapter-1 document and its chapter marker.
 */
function isIntroductionPara(item: MarkerContent | undefined): boolean {
  return (
    isMarkerObject(item) &&
    item.type === PARA_TYPE &&
    (item.marker?.startsWith(INTRODUCTION_MARKER_PREFIX) ?? false)
  );
}

/**
 * `item` with any chapter marker node nested inside its content removed, at any depth. A chapter
 * marker is only ever legal as a top-level sibling, so one that has been typed inside a paragraph
 * is removed wherever it is found.
 *
 * Nodes are rebuilt only along the path where something was actually removed, so an untouched
 * subtree comes back as the very same object.
 *
 * @param item The top-level content item to clean.
 * @param parentIndexes Content indexes from the top-level item down to `item`, for reporting a
 *   removal's place; `[]` for the top-level item itself.
 * @param reportRemoval Called with each removal's place, outermost-first and in content order.
 */
function withoutNestedChapters(
  item: MarkerContent,
  parentIndexes: number[],
  reportRemoval: (removal: NestedRemoval) => void,
): MarkerContent {
  if (!isMarkerObject(item)) return item;
  const { content } = item;
  if (!content) return item;
  const repairedContent: MarkerContent[] = [];
  content.forEach((child) => {
    // The index the child lands on once earlier removals are gone — for a removed child, the
    // boundary in the repaired content where it used to be.
    const repairedIndex = repairedContent.length;
    if (isChapterObject(child)) {
      reportRemoval({ parentIndexes, childIndex: repairedIndex });
      return;
    }
    repairedContent.push(
      withoutNestedChapters(child, [...parentIndexes, repairedIndex], reportRemoval),
    );
  });
  const isUnchanged =
    repairedContent.length === content.length &&
    repairedContent.every((child, index) => child === content[index]);
  return isUnchanged ? item : { ...item, content: repairedContent };
}

/**
 * The chapter marker node to keep, of however many the document holds, or `undefined` when it holds
 * none and one must be synthesized.
 *
 * For any chapter after the first, the document must begin with its chapter marker, so the first
 * one found is the one that survives. Chapter 1 is the special case: an introduction sits ahead of
 * the chapter marker, and a marker typed into that introduction is as plausible as the real one, so
 * the survivor is the first marker NOT followed by an introduction paragraph — falling back to the
 * last marker in the document when every earlier one is followed by introduction material.
 */
function chooseAnchor(
  content: MarkerContent[],
  chapterEntries: ChapterEntry[],
  expectedChapterNum: number,
): ChapterEntry | undefined {
  if (expectedChapterNum > 1) return chapterEntries[0];
  return (
    chapterEntries.slice(0, -1).find((entry) => !isIntroductionPara(content[entry.index + 1])) ??
    chapterEntries[chapterEntries.length - 1]
  );
}

/**
 * The caret position immediately after a chapter marker's number.
 *
 * The editor renders an editable marker as a glyph of on-screen bytes — a backslash, the marker
 * name, a separator, the number, and a trailing space — held in the marker's first content item, so
 * the position just past the number is the length of everything ahead of it.
 *
 * @param chapterIndexes Content indexes addressing the chapter marker itself.
 */
function caretAfterChapterNumber(
  chapterIndexes: number[],
  marker: string,
  number: string,
): SelectionRange {
  return {
    start: {
      jsonPath: usjJsonPathFromIndexes([...chapterIndexes, 0]),
      offset: 1 + marker.length + 1 + number.length,
    },
  };
}

/** The caret position at the boundary a removed chapter marker used to occupy. */
function caretAtRemovalBoundary(parentIndexes: number[], childIndex: number): SelectionRange {
  return { start: { jsonPath: usjJsonPathFromIndexes(parentIndexes), offset: childIndex } };
}

/**
 * A result carrying `repairedContent`, reporting a repair only when that content actually differs
 * from what the document already holds.
 */
function toRepairResult(
  usj: Usj,
  repairedContent: MarkerContent[],
  caretTarget: ChapterMarkerCaretTarget | undefined,
): ChapterMarkerRepairResult {
  // The across-iframes comparison rather than `deepEqual`: a false "these differ" here reports a
  // repair that was not made, which pushes the document back into the editor and toasts the user on
  // every save of an ordinary edit.
  const didRepair = !deepEqualAcrossIframes(repairedContent, usj.content);
  return {
    usj: didRepair ? { ...usj, content: repairedContent } : usj,
    didRepair,
    caretTarget: didRepair ? caretTarget : undefined,
  };
}

/**
 * The given chapter document with exactly one correctly numbered chapter marker in the one place it
 * belongs, so Paratext will accept the write (see the module comment for why a document that fails
 * that check poisons every later save of the chapter).
 *
 * Extra chapter markers are dropped, a missing one is restored, a nested one is removed, and the
 * surviving marker keeps its other fields (`sid`, `altnumber`, `pubnumber`) so publication and
 * alternate numbering survive the repair. The input document is never mutated; when nothing needs
 * repairing it is returned as-is.
 *
 * @param usj The chapter document as the editor holds it.
 * @param expectedChapterNum The chapter that document is supposed to be.
 */
export function repairChapterMarkers(
  usj: Usj,
  expectedChapterNum: number,
): ChapterMarkerRepairResult {
  // Without a real chapter number there is nothing to repair the document toward.
  if (expectedChapterNum < 1) return { usj, didRepair: false, caretTarget: undefined };

  const expected = String(expectedChapterNum);
  // Nested chapter markers go first and unconditionally: they are never legal USJ, they reach the
  // writer as a `\c` all the same, and they must not survive even the paths below that leave the
  // document's own top-level markers alone.
  /** Where the FIRST nested chapter marker the strip removed used to sit, if it removed any. */
  let firstNestedRemoval: { topLevelIndex: number; removal: NestedRemoval } | undefined;
  const strippedContent = usj.content.map((item, index) =>
    withoutNestedChapters(item, [], (removal) => {
      if (!firstNestedRemoval) firstNestedRemoval = { topLevelIndex: index, removal };
    }),
  );

  const chapterEntries: ChapterEntry[] = [];
  strippedContent.forEach((item, index) => {
    if (isChapterObject(item)) chapterEntries.push({ index, chapterObject: item });
  });

  /**
   * The caret target for the first nested marker the strip removed, addressed through
   * `toRepairedIndex` because the top level is rebuilt around the surviving marker.
   */
  function nestedRemovalCaretTarget(
    toRepairedIndex: (index: number) => number,
  ): SelectionRange | undefined {
    if (!firstNestedRemoval) return undefined;
    const { topLevelIndex, removal } = firstNestedRemoval;
    return caretAtRemovalBoundary(
      [toRepairedIndex(topLevelIndex), ...removal.parentIndexes],
      removal.childIndex,
    );
  }

  // An introduction-only chapter 1 (e.g. Jude) legitimately carries no chapter marker at all, so
  // there is no marker to place — but a nested one may still have been stripped above, and the top
  // level is left exactly as it came in.
  if (expectedChapterNum === 1 && chapterEntries.length === 0) {
    return toRepairResult(
      usj,
      strippedContent,
      nestedRemovalCaretTarget((index) => index),
    );
  }

  const anchor = chooseAnchor(strippedContent, chapterEntries, expectedChapterNum);
  const repairedChapterObject: MarkerObject = anchor
    ? { ...anchor.chapterObject, number: expected }
    : { type: CHAPTER_TYPE, marker: CHAPTER_MARKER, number: expected };

  const survivors = strippedContent.filter((item) => !isChapterObject(item));
  // Chapter 1 keeps its marker where the user has it, since the introduction ahead of it is the
  // author's; every other chapter puts its marker at the very start of the document. Nothing may
  // precede it there, not even an `\id` book node typed into the chapter: Paratext refuses a
  // chapter after the first that holds any content ahead of its chapter marker ("Text present
  // before chapter marker."), so a marker placed behind one would produce another document the
  // writer will not take.
  const insertIndex =
    expectedChapterNum === 1 && anchor
      ? strippedContent.slice(0, anchor.index).filter((item) => !isChapterObject(item)).length
      : 0;

  /** Where a top-level item that survived the repair ended up. */
  function mapTopLevelIndex(index: number): number {
    const amongSurvivors = strippedContent
      .slice(0, index)
      .filter((item) => !isChapterObject(item)).length;
    return amongSurvivors >= insertIndex ? amongSurvivors + 1 : amongSurvivors;
  }

  // The correction the user is standing in front of is the one their caret belongs in: a renumbered
  // marker takes the caret to just past its number, as deleting the errant text by hand would have.
  // A restored marker has no number the user typed, so the caret goes back to the end of the text
  // they were typing ({@link CARET_AT_DOCUMENT_END}). Only when the repair left every surviving
  // number alone does the caret go to the place a removed marker used to occupy — and a marker
  // removed from the very end of the document has no such place, so the surviving marker takes the
  // caret instead.
  const removedTopLevelEntry = chapterEntries.find((entry) => entry.index !== anchor?.index);
  const followingItemIndex =
    removedTopLevelEntry && removedTopLevelEntry.index + 1 < strippedContent.length
      ? removedTopLevelEntry.index + 1
      : undefined;
  const caretAtChapterNumber = caretAfterChapterNumber(
    [insertIndex],
    repairedChapterObject.marker ?? CHAPTER_MARKER,
    expected,
  );
  let caretTarget: ChapterMarkerCaretTarget | undefined;
  if (!anchor) {
    caretTarget = CARET_AT_DOCUMENT_END;
  } else if (anchor.chapterObject.number !== expected) {
    caretTarget = caretAtChapterNumber;
  } else if (followingItemIndex !== undefined) {
    caretTarget = caretAtRemovalBoundary([mapTopLevelIndex(followingItemIndex)], 0);
  } else {
    caretTarget = nestedRemovalCaretTarget(mapTopLevelIndex) ?? caretAtChapterNumber;
  }

  return toRepairResult(
    usj,
    [...survivors.slice(0, insertIndex), repairedChapterObject, ...survivors.slice(insertIndex)],
    caretTarget,
  );
}

/** What a chapter save should do with the document the editor is holding. */
export interface ChapterSavePreparation {
  /**
   * The repaired document, when the editor's document needed repairing — the editor must be put
   * back onto this, and the user told, whether or not anything is written to the PDP.
   */
  repairedUsj: Usj | undefined;
  /** The document to write to the PDP, or `undefined` when it already holds this content. */
  usjToSave: Usj | undefined;
  /**
   * Where the caret belongs once {@link repairedUsj} is in the editor. See
   * {@link ChapterMarkerRepairResult.caretTarget}.
   */
  caretTarget: ChapterMarkerCaretTarget | undefined;
}

/**
 * Decides what a chapter save should write and whether the editor's own document must be corrected
 * first.
 *
 * Only a document that has MOVED away from what the PDP holds is repaired. A document still equal
 * to the PDP's is the PDP's own content, displayed — nothing in it came from the user, so there is
 * nothing of the user's to repair, and correcting stored content belongs to the backend backstop
 * (`ChapterMarkerCorrection`) rather than to a view that happens to be showing it. A legitimately
 * blank chapter is what makes this gate matter rather than merely tidy: it carries no `\c` node at
 * all — the state `EmptyChapterView` is built around — so without the gate every chapter after the
 * first would be "repaired" into a bare chapter marker, written to the project, and announced as a
 * correction, on being opened and with no edit behind it.
 *
 * Once past that gate the repair runs BEFORE the compare against what the PDP holds, so a repair
 * that lands the document back on the PDP's content still reports `repairedUsj` (the editor is
 * still holding a document Paratext would reject, and the user still needs telling) while reporting
 * nothing to save.
 *
 * @param usjFromEditor The editor's settled document.
 * @param usjFromPdp What the PDP currently holds for this chapter, if anything.
 * @param expectedChapterNum The chapter the editor is editing.
 */
export function prepareUsjForChapterSave(
  usjFromEditor: Usj,
  usjFromPdp: Usj | undefined,
  expectedChapterNum: number,
): ChapterSavePreparation {
  if (!resolveUsjToSaveToPdp(usjFromEditor, usjFromPdp))
    return { repairedUsj: undefined, usjToSave: undefined, caretTarget: undefined };

  const {
    usj: repaired,
    didRepair,
    caretTarget,
  } = repairChapterMarkers(usjFromEditor, expectedChapterNum);
  return {
    repairedUsj: didRepair ? repaired : undefined,
    usjToSave: resolveUsjToSaveToPdp(repaired, usjFromPdp),
    caretTarget,
  };
}

/**
 * Carries out what {@link prepareUsjForChapterSave} decided: corrects the editor's own document when
 * the save still targets the chapter on screen, tells the user either way, and hands back the
 * document to write.
 *
 * The push-back into the editor is not bookkeeping — without it the bad marker stays on screen, so
 * every later save repairs it again and reports it again, forever. It is skipped only when the
 * chapter being saved is no longer the chapter being shown: a save can fire after the user has
 * navigated away (a trailing save, a chapter-switch flush) through the closure captured for the
 * chapter the content was typed in, and pushing that chapter's document into the editor would
 * overwrite the chapter the user is now looking at. The user is still told, because the correction
 * was still made to what gets written.
 *
 * `applyRepairToEditor` is responsible for its own failures: the PDP write has to run even when the
 * editor refuses the repaired document, because it is that write which un-poisons the chapter.
 *
 * @param preparation What {@link prepareUsjForChapterSave} returned for this save.
 * @param savedChapterKey The chapter this save was scheduled for.
 * @param currentChapterKey The chapter the editor is showing now.
 * @param applyRepairToEditor Puts the repaired document back into the editor and the caret back
 *   where the correction was made. Must not throw.
 * @param notifyRepair Tells the user the chapter marker was corrected.
 * @returns The document to write to the PDP, or `undefined` when there is nothing to write.
 */
export function applyChapterSavePreparation({
  preparation,
  savedChapterKey,
  currentChapterKey,
  applyRepairToEditor,
  notifyRepair,
}: {
  preparation: ChapterSavePreparation;
  savedChapterKey: string;
  currentChapterKey: string;
  applyRepairToEditor: (usj: Usj, caretTarget: ChapterMarkerCaretTarget | undefined) => void;
  notifyRepair: () => void;
}): Usj | undefined {
  const { repairedUsj, usjToSave, caretTarget } = preparation;
  if (repairedUsj) {
    if (savedChapterKey === currentChapterKey) applyRepairToEditor(repairedUsj, caretTarget);
    notifyRepair();
  }
  return usjToSave;
}
