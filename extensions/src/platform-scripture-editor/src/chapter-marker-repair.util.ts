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

import { MarkerContent, MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import { resolveUsjToSaveToPdp } from './debounced-pdp-save.util';

/** USJ `type` of a `\c` chapter marker node. */
const CHAPTER_TYPE = 'chapter';
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

/** The outcome of a repair pass: the document to use, and whether it differs from what came in. */
export interface ChapterMarkerRepairResult {
  /** The repaired document, or the input document unchanged when nothing needed repairing. */
  usj: Usj;
  /** Whether {@link usj} differs from the document handed in — i.e. whether a repair was made. */
  didRepair: boolean;
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
 */
function withoutNestedChapters(item: MarkerContent): MarkerContent {
  if (!isMarkerObject(item)) return item;
  const { content } = item;
  if (!content) return item;
  const repairedContent = content
    .filter((child) => !isChapterObject(child))
    .map((child) => withoutNestedChapters(child));
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
 * A result carrying `repairedContent`, reporting a repair only when that content actually differs
 * from what the document already holds.
 */
function toRepairResult(usj: Usj, repairedContent: MarkerContent[]): ChapterMarkerRepairResult {
  const didRepair = JSON.stringify(repairedContent) !== JSON.stringify(usj.content);
  return { usj: didRepair ? { ...usj, content: repairedContent } : usj, didRepair };
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
 * @param usj - The chapter document as the editor holds it.
 * @param expectedChapterNum - The chapter that document is supposed to be.
 */
export function repairChapterMarkers(
  usj: Usj,
  expectedChapterNum: number,
): ChapterMarkerRepairResult {
  // Without a real chapter number there is nothing to repair the document toward.
  if (expectedChapterNum < 1) return { usj, didRepair: false };

  const expected = String(expectedChapterNum);
  // Nested chapter markers go first and unconditionally: they are never legal USJ, they reach the
  // writer as a `\c` all the same, and they must not survive even the paths below that leave the
  // document's own top-level markers alone.
  const strippedContent = usj.content.map((item) => withoutNestedChapters(item));

  const chapterEntries: ChapterEntry[] = [];
  strippedContent.forEach((item, index) => {
    if (isChapterObject(item)) chapterEntries.push({ index, chapterObject: item });
  });

  // An introduction-only chapter 1 (e.g. Jude) legitimately carries no chapter marker at all, so
  // there is no marker to place — but a nested one may still have been stripped above.
  if (expectedChapterNum === 1 && chapterEntries.length === 0) {
    return toRepairResult(usj, strippedContent);
  }

  const anchor = chooseAnchor(strippedContent, chapterEntries, expectedChapterNum);
  const repairedChapterObject: MarkerObject = anchor
    ? { ...anchor.chapterObject, number: expected }
    : { type: CHAPTER_TYPE, marker: 'c', number: expected };

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

  return toRepairResult(usj, [
    ...survivors.slice(0, insertIndex),
    repairedChapterObject,
    ...survivors.slice(insertIndex),
  ]);
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
}

/**
 * Decides what a chapter save should write and whether the editor's own document must be corrected
 * first.
 *
 * The repair runs BEFORE the compare against what the PDP already holds, so a repair that lands the
 * document back on the PDP's content still reports `repairedUsj` (the editor is still holding a
 * document Paratext would reject, and the user still needs telling) while reporting nothing to
 * save.
 *
 * @param usjFromEditor - The editor's settled document.
 * @param usjFromPdp - What the PDP currently holds for this chapter, if anything.
 * @param expectedChapterNum - The chapter the editor is editing.
 */
export function prepareUsjForChapterSave(
  usjFromEditor: Usj,
  usjFromPdp: Usj | undefined,
  expectedChapterNum: number,
): ChapterSavePreparation {
  const { usj: repaired, didRepair } = repairChapterMarkers(usjFromEditor, expectedChapterNum);
  return {
    repairedUsj: didRepair ? repaired : undefined,
    usjToSave: resolveUsjToSaveToPdp(repaired, usjFromPdp),
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
 * @param preparation - What {@link prepareUsjForChapterSave} returned for this save.
 * @param savedChapterKey - The chapter this save was scheduled for.
 * @param currentChapterKey - The chapter the editor is showing now.
 * @param applyRepairToEditor - Puts the repaired document back into the editor. Must not throw.
 * @param notifyRepair - Tells the user the chapter marker was corrected.
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
  applyRepairToEditor: (usj: Usj) => void;
  notifyRepair: () => void;
}): Usj | undefined {
  const { repairedUsj, usjToSave } = preparation;
  if (repairedUsj) {
    if (savedChapterKey === currentChapterKey) applyRepairToEditor(repairedUsj);
    notifyRepair();
  }
  return usjToSave;
}
