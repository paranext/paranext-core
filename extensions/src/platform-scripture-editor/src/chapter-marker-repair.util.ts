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
  isUsjClosingMarkerLocation,
  isUsjMarkerLocation,
  isUsjPropertyValueLocation,
  isUsjTextContentLocation,
  MarkerContent,
  MarkerObject,
  PropertyJsonPath,
  Usj,
  UsjDocumentLocation,
  usjJsonPathFromIndexes,
} from '@eten-tech-foundation/scripture-utilities';
import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';
import { resolveUsjToSaveToPdp } from './debounced-pdp-save.util';
import { deepEqualAcrossIframes } from './platform-scripture-editor.utils';

/** USJ `type` of a `\c` chapter marker node. */
const CHAPTER_TYPE = 'chapter';
/** The USFM marker a chapter node carries. */
const CHAPTER_MARKER = 'c';
/** USJ `type` of a paragraph node. */
const PARA_TYPE = 'para';
/**
 * USJ `type`s of marker nodes that run inside a paragraph rather than standing as blocks of their
 * own. Anything not listed is treated as a block, so content of a kind not anticipated here is left
 * where it is rather than moved into a paragraph.
 */
const INLINE_TYPES = new Set(['char', 'verse', 'note', 'ms', 'figure', 'optbreak', 'ref']);
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
 * Where a top-level item of the stripped document ended up in the repaired one: either still a
 * top-level item of its own, or joined onto the end of the paragraph a removed chapter marker had
 * cut it off from.
 */
interface Placement {
  /**
   * Content indexes addressing the item in the repaired document. A text item joined onto text the
   * paragraph already ended with addresses that combined text.
   */
  indexes: number[];
  /**
   * For a text item joined into a paragraph, where its own text starts within the text `indexes`
   * addresses.
   */
  textOffset?: number;
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
 *
 * The one restore that does not mean that is the user deleting the marker itself from a chapter
 * with text, e.g. by backspacing the chapter line away. They were working on the chapter line, not
 * typing at the end, so {@link prepareUsjForChapterSave} sends that caret back to the end of the
 * restored chapter line instead.
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

/** Whether `item` is a paragraph node. */
function isParaObject(item: MarkerContent | undefined): item is MarkerObject {
  return isMarkerObject(item) && item.type === PARA_TYPE;
}

/** Whether `item` is content that runs inside a paragraph — text or an inline marker. */
function isInlineItem(item: MarkerContent): boolean {
  return !isMarkerObject(item) || INLINE_TYPES.has(item.type);
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
 * The path to `property` of the marker `indexes` addresses.
 *
 * @param indexes Content indexes addressing a marker; never empty.
 * @param property The property's name.
 */
function propertyPath(indexes: number[], property: string): PropertyJsonPath {
  return `$.${indexes.map((index) => `content[${index}]`).join('.')}['${property}']`;
}

/**
 * The caret position immediately after a chapter marker's number: the end of its `number` value.
 *
 * @param chapterIndex Where the chapter marker sits in the document's top-level content.
 * @param number The chapter marker's number.
 */
function caretAfterChapterNumber(chapterIndex: number, number: string): SelectionRange {
  return {
    start: {
      jsonPath: propertyPath([chapterIndex], 'number'),
      propertyOffset: number.length,
    },
  };
}

/**
 * The caret position in front of the item at `childIndex` among the content `parentIndexes`
 * addresses in `content`, spelled as the location model spells it: the start of a text, the
 * location of a marker, or, when nothing follows, the end of the line — the end of the text, verse
 * number or closing marker before it, or the end of the marker name of a paragraph with nothing in
 * it.
 *
 * @param content A document's top-level content.
 * @param parentIndexes Content indexes addressing the item whose content holds the position; `[]`
 *   for the top level.
 * @param childIndex The position's boundary among that content.
 */
function caretBeforeChild(
  content: MarkerContent[],
  parentIndexes: number[],
  childIndex: number,
): SelectionRange {
  let parent: MarkerContent | undefined;
  let siblings: MarkerContent[] | undefined = content;
  parentIndexes.forEach((index) => {
    parent = siblings?.[index];
    siblings = isMarkerObject(parent) ? parent.content : undefined;
  });
  const pathTo = (index: number) => usjJsonPathFromIndexes([...parentIndexes, index]);
  const child = siblings?.[childIndex];
  if (typeof child === 'string') return { start: { jsonPath: pathTo(childIndex), offset: 0 } };
  if (child) return { start: { jsonPath: pathTo(childIndex) } };
  const previous = siblings?.[childIndex - 1];
  if (typeof previous === 'string')
    return { start: { jsonPath: pathTo(childIndex - 1), offset: previous.length } };
  if (isMarkerObject(previous)) {
    if (previous.number !== undefined)
      return {
        start: {
          jsonPath: propertyPath([...parentIndexes, childIndex - 1], 'number'),
          propertyOffset: previous.number.length,
        },
      };
    // The closing marker: a backslash, the marker, and a `*`.
    const closerLength = (previous.marker ?? '').length + 2;
    return { start: { jsonPath: pathTo(childIndex - 1), closingMarkerOffset: closerLength } };
  }
  if (isMarkerObject(parent) && parent.marker !== undefined)
    return {
      start: {
        jsonPath: propertyPath(parentIndexes, 'marker'),
        propertyOffset: parent.marker.length,
      },
    };
  return { start: { jsonPath: usjJsonPathFromIndexes(parentIndexes) } };
}

/**
 * `para` with `item` appended, as a copy. Text joining text the paragraph already ends with is
 * combined into that one text item, as the editor holds a run of text as one node.
 *
 * @param para The paragraph to append to.
 * @param paraIndex Where `para` sits in the repaired document's top-level content.
 * @param item The item to append.
 * @returns The extended paragraph, and where `item` ended up.
 */
function appendToParagraph(
  para: MarkerObject,
  paraIndex: number,
  item: MarkerContent,
): { para: MarkerObject; placement: Placement } {
  const paraContent = [...(para.content ?? [])];
  const lastIndex = paraContent.length - 1;
  const last = paraContent[lastIndex];
  let placement: Placement;
  if (typeof item === 'string' && typeof last === 'string') {
    paraContent[lastIndex] = last + item;
    placement = { indexes: [paraIndex, lastIndex], textOffset: last.length };
  } else {
    paraContent.push(item);
    placement = {
      indexes: [paraIndex, paraContent.length - 1],
      textOffset: typeof item === 'string' ? 0 : undefined,
    };
  }
  return { para: { ...para, content: paraContent }, placement };
}

/**
 * The caret position at the start of an item the repair kept, wherever it ended up: the start of a
 * top-level text, at the start of a top-level marker's content, or in front of an item joined into
 * a paragraph.
 *
 * @param content The repaired document's top-level content.
 * @param placement Where the item ended up.
 */
function caretAtStartOf(
  content: MarkerContent[],
  { indexes, textOffset }: Placement,
): SelectionRange {
  if (textOffset !== undefined)
    return { start: { jsonPath: usjJsonPathFromIndexes(indexes), offset: textOffset } };
  if (indexes.length === 1 && isMarkerObject(content[indexes[0]]))
    return caretBeforeChild(content, indexes, 0);
  return caretBeforeChild(content, indexes.slice(0, -1), indexes[indexes.length - 1]);
}

/** A caret address inside a top-level item: the item's index, and the rest of the path below it. */
const TOP_LEVEL_CARET_PATH_REGEX = /^\$\.content\[(\d+)\](.*)$/;

/** A path below a top-level item: the content indexes it goes through, then any property. */
const PATH_BELOW_ITEM_REGEX = /^((?:\.content\[\d+\])*)(?:\['([^']+)'\])?$/;

/**
 * `location` in top-level item `newIndex` instead of the one it is in, at the same place within it,
 * or `undefined` for a kind of location this does not move.
 *
 * @param location A location inside a top-level item.
 * @param pathBelowItem `location`'s path below that item.
 * @param newIndex Where the item now is.
 */
function locationInItemAt(
  location: UsjDocumentLocation,
  pathBelowItem: string,
  newIndex: number,
): UsjDocumentLocation | undefined {
  const match = PATH_BELOW_ITEM_REGEX.exec(pathBelowItem);
  if (!match) return undefined;
  const indexes = [newIndex, ...[...match[1].matchAll(/\d+/g)].map(([digits]) => Number(digits))];
  const property = match[2];
  if (property !== undefined)
    return isUsjPropertyValueLocation(location)
      ? { jsonPath: propertyPath(indexes, property), propertyOffset: location.propertyOffset }
      : undefined;
  const jsonPath = usjJsonPathFromIndexes(indexes);
  if (isUsjTextContentLocation(location)) return { jsonPath, offset: location.offset };
  if (isUsjClosingMarkerLocation(location))
    return { jsonPath, closingMarkerOffset: location.closingMarkerOffset };
  return isUsjMarkerLocation(location) ? { jsonPath } : undefined;
}

/**
 * `caret`'s start, with the place in front of a top-level marker that follows a top-level line of
 * text spelled as the end of that text instead. The two are the same place, and the editor reports
 * the place in front of the marker, but only the text is the line the user is typing in.
 */
function caretStartInTopLevelText(
  caret: SelectionRange,
  content: MarkerContent[],
): SelectionRange['start'] {
  const { start } = caret;
  const match = TOP_LEVEL_CARET_PATH_REGEX.exec(start.jsonPath);
  if (!match || match[2] !== '' || Object.keys(start).length !== 1) return start;
  const previous = content[Number(match[1]) - 1];
  if (typeof previous !== 'string') return start;
  return {
    jsonPath: usjJsonPathFromIndexes([Number(match[1]) - 1]),
    offset: previous.length,
  };
}

/**
 * Where the caret goes when it was in the top-level line the stored chapter marker stood on, and
 * the repair moved that line: the same place in that line, wherever the line now is. That line is
 * what is left of a chapter line whose bytes stopped being a chapter marker (`c 2`, `\ 2` once the
 * `c` is deleted, which is a paragraph with no marker name, or `\sc 2` once an `s` is typed into
 * the `\c`), text typed ahead of the marker, or the paragraph a chapter line merged into (a
 * selection from the chapter line into that paragraph, typed over). The restored marker goes above
 * it, and the user is still typing in it.
 *
 * The editor reports the caret in the document it saves, which is the document the repair works on,
 * so the caret keeps its exact place in the line and only the line's index changes.
 *
 * @param caret The editor's caret when the save was made, if it had one.
 * @param content The document's top-level content, in the coordinates `caret` addresses.
 * @param placements Where each item of `content` ended up in the repaired document.
 * @param chapterLineIndex Where in `content` the stored chapter marker stood, if it is known.
 */
function caretInMovedText(
  caret: SelectionRange | undefined,
  content: MarkerContent[],
  placements: Map<number, Placement>,
  chapterLineIndex: number | undefined,
): SelectionRange | undefined {
  if (!caret || chapterLineIndex === undefined) return undefined;
  if (caret.end && !deepEqualAcrossIframes(caret.end, caret.start)) return undefined;
  const start = caretStartInTopLevelText(caret, content);
  const match = TOP_LEVEL_CARET_PATH_REGEX.exec(start.jsonPath);
  if (!match || Number(match[1]) !== chapterLineIndex) return undefined;
  const placement = placements.get(chapterLineIndex);
  if (!placement || placement.textOffset !== undefined || placement.indexes.length !== 1)
    return undefined;
  const [newIndex] = placement.indexes;
  if (newIndex === chapterLineIndex) return undefined;
  const moved = locationInItemAt(start, match[2], newIndex);
  return moved && { start: moved };
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
 * Extra chapter markers are dropped (the text that followed one in the paragraph it was typed into
 * goes back into that paragraph), a missing one is restored, a nested one is removed, and the
 * surviving marker keeps its other fields (`sid`, `altnumber`, `pubnumber`) so publication and
 * alternate numbering survive the repair. The input document is never mutated; when nothing needs
 * repairing it is returned as-is.
 *
 * @param usj The chapter document as the editor holds it.
 * @param expectedChapterNum The chapter that document is supposed to be.
 * @param caret The editor's caret, if it has one; see {@link caretInMovedText}.
 * @param chapterLineIndex Where in the document's content the stored chapter marker stood, if it is
 *   known; see {@link caretInMovedText}.
 */
export function repairChapterMarkers(
  usj: Usj,
  expectedChapterNum: number,
  caret?: SelectionRange,
  chapterLineIndex?: number,
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
   * `toRepairedIndexes` because the top level is rebuilt around the surviving marker.
   */
  function nestedRemovalCaretTarget(
    repairedContent: MarkerContent[],
    toRepairedIndexes: (index: number) => number[],
  ): SelectionRange | undefined {
    if (!firstNestedRemoval) return undefined;
    const { topLevelIndex, removal } = firstNestedRemoval;
    return caretBeforeChild(
      repairedContent,
      [...toRepairedIndexes(topLevelIndex), ...removal.parentIndexes],
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
      nestedRemovalCaretTarget(strippedContent, (index) => [index]),
    );
  }

  const anchor = chooseAnchor(strippedContent, chapterEntries, expectedChapterNum);
  const repairedChapterObject: MarkerObject = anchor
    ? { ...anchor.chapterObject, number: expected }
    : { type: CHAPTER_TYPE, marker: CHAPTER_MARKER, number: expected };

  // Chapter 1 keeps its marker where the user has it, since the introduction ahead of it is the
  // author's; every other chapter puts its marker at the very start of the document. Nothing may
  // precede it there, not even an `\id` book node typed into the chapter: Paratext refuses a
  // chapter after the first that holds any content ahead of its chapter marker ("Text present
  // before chapter marker."), so a marker placed behind one would produce another document the
  // writer will not take.
  const keepsAnchorInPlace = expectedChapterNum === 1 && !!anchor;
  const repairedContent: MarkerContent[] = keepsAnchorInPlace ? [] : [repairedChapterObject];
  let insertIndex = 0;
  /** Where each non-chapter item of `strippedContent` ended up, by its index there. */
  const placements = new Map<number, Placement>();
  /**
   * The paragraph that text following a removed chapter marker rejoins, while that text lasts.
   *
   * Paratext 9 removes a chapter marker's own bytes and nothing else, so whatever followed the
   * marker on its line runs on in the paragraph the marker was typed into. The editor holds a
   * chapter marker typed mid-paragraph as the paragraph cut short, the marker, and the rest of the
   * paragraph's text standing outside any paragraph; that text goes back into the paragraph.
   */
  let rejoinParaIndex: number | undefined;
  strippedContent.forEach((item, index) => {
    if (isChapterObject(item)) {
      if (keepsAnchorInPlace && index === anchor?.index) {
        insertIndex = repairedContent.length;
        repairedContent.push(repairedChapterObject);
        rejoinParaIndex = undefined;
        return;
      }
      const lastIndex = repairedContent.length - 1;
      if (rejoinParaIndex === undefined && isParaObject(repairedContent[lastIndex]))
        rejoinParaIndex = lastIndex;
      return;
    }
    const rejoinPara = rejoinParaIndex === undefined ? undefined : repairedContent[rejoinParaIndex];
    if (rejoinParaIndex !== undefined && isParaObject(rejoinPara) && isInlineItem(item)) {
      const { para, placement } = appendToParagraph(rejoinPara, rejoinParaIndex, item);
      repairedContent[rejoinParaIndex] = para;
      placements.set(index, placement);
      return;
    }
    rejoinParaIndex = undefined;
    placements.set(index, { indexes: [repairedContent.length] });
    repairedContent.push(item);
  });

  /** Content indexes addressing a non-chapter item of `strippedContent` in the repaired document. */
  function indexesOfItem(index: number): number[] {
    return placements.get(index)?.indexes ?? [index];
  }

  // The correction the user is standing in front of is the one their caret belongs in: a renumbered
  // marker takes the caret to just past its number, as deleting the errant text by hand would have.
  // A restored marker has no number the user typed, so the caret goes back to the end of the text
  // they were typing ({@link CARET_AT_DOCUMENT_END}). Only when the repair left every surviving
  // number alone does the caret go to the place a removed marker used to occupy: the start of the
  // first item after it that the repair keeps, wherever that item ended up. A marker with nothing but
  // removed markers after it ended the document and has no such place, so the surviving marker takes
  // the caret instead.
  const removedTopLevelEntry = chapterEntries.find((entry) => entry.index !== anchor?.index);
  const followingItemPlacement = removedTopLevelEntry
    ? placements.get(
        strippedContent.findIndex(
          (item, index) => index > removedTopLevelEntry.index && !isChapterObject(item),
        ),
      )
    : undefined;
  const caretAtChapterNumber = caretAfterChapterNumber(insertIndex, expected);
  // A line the user is typing in that the repair only moved keeps their caret, ahead of all these.
  const movedTextCaret = caretInMovedText(caret, strippedContent, placements, chapterLineIndex);
  let caretTarget: ChapterMarkerCaretTarget | undefined;
  if (movedTextCaret) {
    caretTarget = movedTextCaret;
  } else if (!anchor) {
    caretTarget = CARET_AT_DOCUMENT_END;
  } else if (anchor.chapterObject.number !== expected) {
    caretTarget = caretAtChapterNumber;
  } else if (followingItemPlacement) {
    caretTarget = caretAtStartOf(repairedContent, followingItemPlacement);
  } else {
    caretTarget = nestedRemovalCaretTarget(repairedContent, indexesOfItem) ?? caretAtChapterNumber;
  }

  return toRepairResult(usj, repairedContent, caretTarget);
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
 * Whether the editor's document is the stored chapter with its chapter marker deleted and nothing
 * else changed — the user removed the marker itself, rather than typing into a chapter that never
 * had one.
 */
function isStoredChapterWithoutItsMarker(usjFromEditor: Usj, usjFromPdp: Usj | undefined): boolean {
  if (!usjFromPdp) return false;
  const storedContentWithoutMarkers = usjFromPdp.content.filter((item) => !isChapterObject(item));
  if (storedContentWithoutMarkers.length === usjFromPdp.content.length) return false;
  return areUsjContentsEqualExceptWhitespace(
    { ...usjFromPdp, content: storedContentWithoutMarkers },
    usjFromEditor,
  );
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
 * @param caret The editor's caret, if it has one, so a line of text the repair moves keeps it.
 */
export function prepareUsjForChapterSave(
  usjFromEditor: Usj,
  usjFromPdp: Usj | undefined,
  expectedChapterNum: number,
  caret?: SelectionRange,
): ChapterSavePreparation {
  const editorUsjToSave = resolveUsjToSaveToPdp(usjFromEditor, usjFromPdp);
  if (!editorUsjToSave)
    return { repairedUsj: undefined, usjToSave: undefined, caretTarget: undefined };

  const isMarkerDeleted = isStoredChapterWithoutItsMarker(usjFromEditor, usjFromPdp);
  // The line the stored marker stood on is what is left of it, unless the marker was deleted
  // outright and the text after it moved up into its place.
  const storedChapterIndex = usjFromPdp?.content.findIndex(isChapterObject) ?? -1;
  const {
    usj: repaired,
    didRepair,
    caretTarget,
  } = repairChapterMarkers(
    usjFromEditor,
    expectedChapterNum,
    caret,
    isMarkerDeleted || storedChapterIndex < 0 ? undefined : storedChapterIndex,
  );
  // A restored marker always goes at the start (chapter 1, which may lack one, is never restored).
  const restoredMarkerCaret = caretAfterChapterNumber(0, String(expectedChapterNum));
  return {
    repairedUsj: didRepair ? repaired : undefined,
    usjToSave: didRepair ? resolveUsjToSaveToPdp(repaired, usjFromPdp) : editorUsjToSave,
    caretTarget:
      caretTarget === CARET_AT_DOCUMENT_END && isMarkerDeleted ? restoredMarkerCaret : caretTarget,
  };
}

/** What a chapter save goes on to do once {@link applyChapterSavePreparation} has run. */
export interface ChapterSaveApplication {
  /** The document to write to the PDP, or `undefined` when there is nothing to write. */
  usjToSave: Usj | undefined;
  /**
   * Whether the user is to be told about the repair once {@link usjToSave} has been written: the
   * repair was not put on screen, so the write is the first place it takes effect. Told only then,
   * because a write can still be refused — the chapter it belongs to may no longer be the one
   * selected — and a notice that a correction was made would then describe nothing.
   */
  shouldAnnounceRepairOnWrite: boolean;
}

/**
 * Carries out what {@link prepareUsjForChapterSave} decided: corrects the editor's own document when
 * the save still targets the chapter on screen, and hands back the document to write.
 *
 * The push-back into the editor is not bookkeeping — without it the bad marker stays on screen, so
 * every later save repairs it again and reports it again, forever. It is skipped in three cases:
 *
 * - The chapter being saved is no longer the chapter being shown. A save can fire after the user has
 *   navigated away (a trailing save, a chapter-switch flush) through the closure captured for the
 *   chapter the content was typed in, and pushing that chapter's document into the editor would
 *   overwrite the chapter the user is now looking at.
 * - The user is still typing. A save can run mid-typing (the PDP sync saves as soon as a delivery
 *   arrives), and replacing the document leaves the editor with no caret until it has loaded, so
 *   the keys that follow land wherever the browser leaves them — at the end of the chapter,
 *   deleting or adding text there. The save that follows once typing pauses makes the same repair
 *   and pushes it back then.
 * - The user has a marker palette or a note editor open over the editor. Replacing the document
 *   regenerates every node, which ends that session under them: a palette's pick lands at a caret
 *   that may no longer mean the same place, and a note editor's own save no longer finds its note.
 *   The next save after the session closes makes the same repair and pushes it back then.
 *
 * The user is told about a repair as soon as it has actually taken effect, wherever that is first:
 * straight away when the editor was corrected, since the correction is then on screen whatever
 * becomes of the write (a write dropped because another is still running never comes back to
 * announce anything, and the next save finds the chapter already correct); otherwise once its
 * document is written (see {@link ChapterSaveApplication.shouldAnnounceRepairOnWrite}).
 *
 * `applyRepairToEditor` is responsible for its own failures: the PDP write has to run even when the
 * editor refuses the repaired document, because it is that write which un-poisons the chapter.
 *
 * @param preparation What {@link prepareUsjForChapterSave} returned for this save.
 * @param savedChapterKey The chapter this save was scheduled for.
 * @param currentChapterKey The chapter the editor is showing now.
 * @param isUserEditing Whether the document must not be replaced under the user: they edited it too
 *   recently, or have a marker palette or note editor open over it.
 * @param applyRepairToEditor Puts the repaired document back into the editor and the caret back
 *   where the correction was made. Must not throw.
 * @param notifyRepair Tells the user the chapter marker was corrected.
 */
export function applyChapterSavePreparation({
  preparation,
  savedChapterKey,
  currentChapterKey,
  isUserEditing,
  applyRepairToEditor,
  notifyRepair,
}: {
  preparation: ChapterSavePreparation;
  savedChapterKey: string;
  currentChapterKey: string;
  isUserEditing: boolean;
  applyRepairToEditor: (usj: Usj, caretTarget: ChapterMarkerCaretTarget | undefined) => void;
  notifyRepair: () => void;
}): ChapterSaveApplication {
  const { repairedUsj, usjToSave, caretTarget } = preparation;
  if (!repairedUsj) return { usjToSave, shouldAnnounceRepairOnWrite: false };

  const shouldPushBack = savedChapterKey === currentChapterKey && !isUserEditing;
  if (shouldPushBack) {
    applyRepairToEditor(repairedUsj, caretTarget);
    notifyRepair();
  }
  return { usjToSave, shouldAnnounceRepairOnWrite: !!usjToSave && !shouldPushBack };
}
