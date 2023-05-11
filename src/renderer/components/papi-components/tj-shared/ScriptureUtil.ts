import {
  CustomElement,
  FormattedText,
  ScriptureChapterContent,
  ScriptureContent,
  ScriptureContentChunk,
  ScriptureReference,
} from './ScriptureTypes';
import { isString, isValidValue } from './Util';

const scrBookNames: string[][] = [
  ['ERR', 'ERROR'],
  ['GEN', 'Genesis'],
  ['EXO', 'Exodus'],
  ['LEV', 'Leviticus'],
  ['NUM', 'Numbers'],
  ['DEU', 'Deuteronomy'],
  ['JOS', 'Joshua'],
  ['JDG', 'Judges'],
  ['RUT', 'Ruth'],
  ['1SA', '1 Samuel'],
  ['2SA', '2 Samuel'],
  ['1KI', '1 Kings'],
  ['2KI', '2 Kings'],
  ['1CH', '1 Chronicles'],
  ['2CH', '2 Chronicles'],
  ['EZR', 'Ezra'],
  ['NEH', 'Nehemiah'],
  ['EST', 'Esther'],
  ['JOB', 'Job'],
  ['PSA', 'Psalm', 'Psalms'],
  ['PRO', 'Proverbs'],
  ['ECC', 'Ecclesiastes'],
  ['SNG', 'Song of Songs', 'Song of Solomon'],
  ['ISA', 'Isaiah'],
  ['JER', 'Jeremiah'],
  ['LAM', 'Lamentations'],
  ['EZK', 'Ezekiel'],
  ['DAN', 'Daniel'],
  ['HOS', 'Hosea'],
  ['JOL', 'Joel'],
  ['AMO', 'Amos'],
  ['OBA', 'Obadiah'],
  ['JON', 'Jonah'],
  ['MIC', 'Micah'],
  ['NAM', 'Nahum'],
  ['HAB', 'Habakkuk'],
  ['ZEP', 'Zephaniah'],
  ['HAG', 'Haggai'],
  ['ZEC', 'Zechariah'],
  ['MAL', 'Malachi'],
  ['MAT', 'Matthew'],
  ['MRK', 'Mark'],
  ['LUK', 'Luke'],
  ['JHN', 'John'],
  ['ACT', 'Acts'],
  ['ROM', 'Romans'],
  ['1CO', '1 Corinthians'],
  ['2CO', '2 Corinthians'],
  ['GAL', 'Galatians'],
  ['EPH', 'Ephesians'],
  ['PHP', 'Philippians'],
  ['COL', 'Colossians'],
  ['1TH', '1 Thessalonians'],
  ['2TH', '2 Thessalonians'],
  ['1TI', '1 Timothy'],
  ['2TI', '2 Timothy'],
  ['TIT', 'Titus'],
  ['PHM', 'Philemon'],
  ['HEB', 'Hebrews'],
  ['JAS', 'James'],
  ['1PE', '1 Peter'],
  ['2PE', '2 Peter'],
  ['1JN', '1 John'],
  ['2JN', '2 John'],
  ['3JN', '3 John'],
  ['JUD', 'Jude'],
  ['REV', 'Revelation'],
];
export const FIRST_SCR_BOOK_NUM = 1;
export const LAST_SCR_BOOK_NUM = scrBookNames.length - 1;
export const FIRST_SCR_CHAPTER_NUM = 1;
export const FIRST_SCR_VERSE_NUM = 0;

export const getBookNumFromName = (bookName: string): number => {
  return scrBookNames.findIndex((bookNames) => bookNames.includes(bookName));
};

export const getAllBookNamesFromNum = (bookNum: number): string[] => {
  return [
    ...scrBookNames[bookNum < FIRST_SCR_BOOK_NUM || bookNum > LAST_SCR_BOOK_NUM ? 0 : bookNum],
  ];
};

export const getBookShortNameFromNum = (bookNum: number): string => {
  return scrBookNames[bookNum < FIRST_SCR_BOOK_NUM || bookNum > LAST_SCR_BOOK_NUM ? 0 : bookNum][0];
};

export const getBookLongNameFromNum = (bookNum: number): string => {
  return scrBookNames[bookNum < FIRST_SCR_BOOK_NUM || bookNum > LAST_SCR_BOOK_NUM ? 0 : bookNum][1];
};

export const offsetBook = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  book: Math.max(FIRST_SCR_BOOK_NUM, Math.min(scrRef.book + offset, LAST_SCR_BOOK_NUM)),
  chapter: 1,
  verse: 1,
});

export const offsetChapter = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  ...scrRef,
  chapter: Math.max(FIRST_SCR_CHAPTER_NUM, scrRef.chapter + offset),
  verse: 1,
});

export const offsetVerse = (scrRef: ScriptureReference, offset: number): ScriptureReference => ({
  ...scrRef,
  verse: Math.max(FIRST_SCR_VERSE_NUM, scrRef.verse + offset),
});

/** Parse a verse number from a string */
export const parseVerse = (verseText: string): number | undefined => {
  const verseNum = parseInt(verseText, 10);
  return isValidValue(verseNum) ? verseNum : undefined;
};

/** Parse a chapter number from a string */
export const parseChapter = (chapterText: string): number | undefined => {
  // For now, this is the same as parseVerse. Maybe there could be other constraints in the future
  return parseVerse(chapterText);
};

const regexpScrRefFull = /(\d )?([a-zA-Z ]+) ([^:]+):(.+)/;
const regexpScrRefChapter = /([^ ]+) ([^:]+)/;
const regexpScrRefBook = /(\d )?([a-zA-Z ]+)/;
export const getScrRefFromText = (
  refText: string,
  defaultChapter = 1,
  defaultVerse = 1,
): ScriptureReference => {
  // No text entered. Return error
  if (!refText) return { book: -1, chapter: -1, verse: -1 };
  const scrRefMatchFull = refText.match(regexpScrRefFull);

  // If we have the whole reference, use it
  if (scrRefMatchFull && scrRefMatchFull.length === 5)
    return {
      book: getBookNumFromName(
        `${scrRefMatchFull[1] ? scrRefMatchFull[1] : ''}${scrRefMatchFull[2]}`,
      ),
      chapter: parseInt(scrRefMatchFull[3], 10),
      verse: parseInt(scrRefMatchFull[4], 10),
    };

  const scrRefMatchChapter = refText.match(regexpScrRefChapter);
  // If we have the reference to the chapter, use it
  if (scrRefMatchChapter && scrRefMatchChapter.length === 3)
    return {
      book: getBookNumFromName(
        `${scrRefMatchChapter[1] ? scrRefMatchChapter[1] : ''}${scrRefMatchChapter[2]}`,
      ),
      chapter: parseInt(scrRefMatchChapter[3], 10),
      verse: defaultVerse,
    };

  const scrRefMatchBook = refText.match(regexpScrRefBook);
  // If we have the reference to the book, use it
  if (scrRefMatchBook && scrRefMatchBook.length === 2)
    return {
      book: getBookNumFromName(
        `${scrRefMatchBook[1] ? scrRefMatchBook[1] : ''}${scrRefMatchBook[2]}`,
      ),
      chapter: defaultChapter,
      verse: defaultVerse,
    };

  // Nothing matched. Return error
  return { book: -1, chapter: -1, verse: -1 };
};

export const getTextFromScrRef = (scrRef: ScriptureReference): string =>
  `${getBookLongNameFromNum(scrRef.book)} ${scrRef.chapter}${
    scrRef.verse >= 0 ? `:${scrRef.verse}` : ''
  }`;

export const areScrRefsEqual = (
  scrRef1: ScriptureReference | string,
  scrRef2: ScriptureReference | string,
): boolean => {
  if (scrRef1 === scrRef2) return true;

  const scrRef1Final: ScriptureReference = isString(scrRef1)
    ? getScrRefFromText(scrRef1 as string)
    : (scrRef1 as ScriptureReference);
  const scrRef2Final: ScriptureReference = isString(scrRef2)
    ? getScrRefFromText(scrRef2 as string)
    : (scrRef2 as ScriptureReference);
  return (
    scrRef1Final.book === scrRef2Final.book &&
    scrRef1Final.chapter === scrRef2Final.chapter &&
    scrRef1Final.verse === scrRef2Final.verse
  );
};

// SLATE SCRIPTURE UTIL FUNCTIONS //

export const ScriptureContentIsElement = (content: ScriptureContent): content is CustomElement =>
  (content as CustomElement).type !== undefined;

export const ScriptureContentIsText = (content: ScriptureContent): content is FormattedText =>
  (content as FormattedText).text !== undefined;

export const ScriptureElementHasChildren = (content: CustomElement) =>
  content.children && content.children.length > 0;

/**
 * Gets the first matching element depth-first in the supplied Scripture contents.
 * TODO: Guarantee this successfully finds the last match if reverse is true. Currently it considers
 * the element as you're stepping down before it considers the bottom element, so it could not find the first match
 * @param contents Scripture contents to search
 * @param match function that determines what to search for. Returns true if the element matches
 * @param reverse whether to look from the end instead of from the start. Defaults to false or searching forward from the start
 * @returns first matching element if found, undefined otherwise
 */
export const getElementInScriptureContents = (
  contents: ScriptureContent[],
  match: (e: CustomElement) => boolean,
  reverse = false,
): CustomElement | undefined => {
  if (!contents) return undefined;

  // Find first top-level element (skip text nodes)
  let firstElement: CustomElement | undefined;
  let firstElementIndex = reverse ? contents.length - 1 : 0;
  while (reverse ? firstElementIndex >= 0 : firstElementIndex < contents.length) {
    if (ScriptureContentIsElement(contents[firstElementIndex])) {
      firstElement = contents[firstElementIndex] as CustomElement;
      break;
    }
    if (reverse) firstElementIndex -= 1;
    else firstElementIndex += 1;
  }

  // If there are no elements in the content, there is not a match
  if (!firstElement) return undefined;

  const root = { children: contents } as CustomElement;

  // Get the first content entry and step down depth-first through the content to find a match
  const nodesOnPath: ScriptureContent[] = [root, firstElement];
  while (nodesOnPath.length > 1) {
    // Get the deepest node so far
    const node = nodesOnPath[nodesOnPath.length - 1];

    if (ScriptureContentIsElement(node)) {
      // Check to see if the current element is a match
      if (match(node)) {
        // Found the first matching element!
        return node;
      }
      // Not a match, so try its children
      if (ScriptureElementHasChildren(node))
        // Element has children, so try children
        nodesOnPath.push(node.children[reverse ? node.children.length - 1 : 0]);
    }

    // This node is not the first match and has no children, so walk up the tree trying siblings
    if (!ScriptureContentIsElement(node) || !ScriptureElementHasChildren(node)) {
      // Try next sibling of the current node if available. Otherwise try parent's next sibling, etc
      do {
        const finalNode = nodesOnPath[nodesOnPath.length - 1];

        // Remove this final node
        nodesOnPath.pop();

        if (nodesOnPath.length > 0) {
          const parentNode = nodesOnPath[nodesOnPath.length - 1] as CustomElement;

          // Get the index of the finalNode in the parentNode
          const finalNodeIndex = parentNode.children.findIndex(
            (childNode) => childNode === finalNode,
          );

          // Add the final node's next (previous if reverse) sibling if available
          if (
            finalNodeIndex >= 0 &&
            (reverse ? finalNodeIndex > 0 : finalNodeIndex < parentNode.children.length - 1)
          ) {
            nodesOnPath.push(
              parentNode.children[reverse ? finalNodeIndex - 1 : finalNodeIndex + 1],
            );
            break;
          }
        }
      } while (nodesOnPath.length > 0);
    }
  }

  return undefined;
};

/**
 * Find the last verse number in the Scripture contents
 * @param contents Scripture content to search for verse number
 * @param defaultVerse the verse to return if no verse found. Defaults to 0
 * @returns verse number or defaultVerse if not found
 */
export const getLastVerseInScriptureContents = (contents: ScriptureContent[], defaultVerse = 0) => {
  const matchingNode = getElementInScriptureContents(contents, (e) => e.type === 'verse', true);
  // For now, let's just assume the first child in the verse is the verse number instead of getting the whole text representation of all children
  if (matchingNode && ScriptureElementHasChildren(matchingNode)) {
    const verse = parseVerse((matchingNode.children[0] as FormattedText).text);
    if (isValidValue(verse)) return verse;
  }
  return defaultVerse;
};

// Scripture Chunking functions

/**
 * Splits the contents of the Scripture chapter supplied into chunks of size chunkSize
 * @param scrChapter the chapter contents to split into chunks
 * @param chunkSize max number of Scripture contents to put in each chunk
 * @returns array of Scripture content chunks which together make up the chapter
 */
export const chunkScriptureChapter = (
  scrChapter: ScriptureChapterContent,
  chunkSize: number,
): ScriptureContentChunk[] => {
  const chapterChunks: ScriptureContentChunk[] = [];
  let prevFinalVerse = 0;
  for (let i = 0; i < Math.ceil(scrChapter.contents.length / chunkSize); i++) {
    const chunkContents = scrChapter.contents.slice(i * chunkSize, i * chunkSize + chunkSize);
    const finalVerse = getLastVerseInScriptureContents(chunkContents);
    chapterChunks.push({
      chapter: scrChapter.chapter,
      chunkNum: i,
      startingVerse: prevFinalVerse + 1,
      finalVerse,
      contents: chunkContents,
    });
    prevFinalVerse = finalVerse;
  }
  return chapterChunks;
};

/**
 * Combines chunks of Scripture content into the content of a scripture Chapter.
 * Note: this does not currently respect the chunks' chunkNum order. It just assembles in the array order.
 * @param scrChapterChunks array of Scripture content chunks which together make up a chapter
 * @param chapter the chapter number to assemble
 * @returns Assembled Scripture chapter whose content is the combined chunks
 */
export const unchunkScriptureContent = (
  scrChapterChunks: ScriptureContentChunk[],
  chapter: number,
): ScriptureChapterContent => ({
  chapter,
  contents: scrChapterChunks.flatMap((chapterChunk) => chapterChunk.contents),
});
