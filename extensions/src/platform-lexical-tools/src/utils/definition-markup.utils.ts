import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef } from 'platform-bible-utils';

/** How a piece of styled text is emphasized */
export type TextStyle = 'italic' | 'underline' | 'bold';

/** A piece of a dictionary definition or gloss, ready to display */
export type DefinitionSegment =
  | { kind: 'text'; text: string; style?: TextStyle }
  | { kind: 'entryLink'; text: string; dictionaryId: string; targetLemma: string }
  | { kind: 'scriptureLink'; text: string; verseRef: SerializedVerseRef }
  | { kind: 'lineBreak' };

/**
 * Matches the markup MARBLE writes in definitions and glosses:
 *
 * - `{L:display<DICTIONARY:target>}` links to other entries
 * - `{A:abbreviation}`, shown as its text
 * - `{N:note}` markers, which are removed
 * - `{S:BBBCCCVVVWWWWW}` Bible references: book, chapter and verse numbers, then the word position.
 *   One marker can hold several references separated by spaces, or a range separated by `-`.
 * - `{D:code}` domain codes, shown as the code
 * - `|i…|i*`, `|u…|u*` and `|b…|b*` italic, underlined and bold text
 * - A run of `|` on its own, which is a line break
 */
const DEFINITION_MARKUP_REGEX =
  /\{L:(?<linkText>[^<}]*)<(?<dictionaryId>[A-Za-z-]+):(?<target>[^>}]*)>\}|\{A:(?<abbreviation>[^}]*)\}|\{N:[^}]*\}|\{S:(?<bibleRefs>\d{14}(?:[ -]\d{14})*)\}|\{D:(?<domainCode>[^}]*)\}|\|(?<styleMarker>[iub])(?<styledText>.*?)\|\k<styleMarker>\*|(?<lineBreak>\s*\|+(?![iub*])\s*)/g;

const TEXT_STYLES: { [marker: string]: TextStyle } = { i: 'italic', u: 'underline', b: 'bold' };

/** Some link targets end in a numeric code that is not part of the lemma, e.g. `Βηθζαθά:000000` */
const TARGET_NUMERIC_SUFFIX_REGEX = /:\d+$/;

/** How the separators between references in one `{S:…}` marker are shown */
const BIBLE_REF_SEPARATORS: { [separator: string]: string } = { ' ': '; ', '-': '–' };

/**
 * Reads one 14-digit MARBLE Bible reference: 3-digit book number, 3-digit chapter, 3-digit verse,
 * then 5 digits for the word, which is not needed to go to the verse.
 *
 * @returns The verse, or `undefined` if the book number is unknown.
 */
function toVerseRef(bibleRef: string): SerializedVerseRef | undefined {
  const book = Canon.bookNumberToId(parseInt(bibleRef.slice(0, 3), 10), '');
  if (!book) return undefined;
  return {
    book,
    chapterNum: parseInt(bibleRef.slice(3, 6), 10),
    verseNum: parseInt(bibleRef.slice(6, 9), 10),
  };
}

/**
 * Splits a definition or gloss into text, links and line breaks, resolving its embedded markup.
 * Unknown markers and malformed markup are left as literal text.
 *
 * @param definition - Definition or gloss text as stored in the lexical reference text.
 * @returns The segments of the text in reading order.
 */
export function parseDefinitionMarkup(definition: string): DefinitionSegment[] {
  const decoded = definition.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  const segments: DefinitionSegment[] = [];
  let textStart = 0;

  const addText = (text: string, style?: TextStyle) => {
    if (text) segments.push(style ? { kind: 'text', text, style } : { kind: 'text', text });
  };

  Array.from(decoded.matchAll(DEFINITION_MARKUP_REGEX)).forEach((match) => {
    addText(decoded.slice(textStart, match.index));
    textStart = match.index + match[0].length;

    const groups = match.groups ?? {};
    if (groups.dictionaryId !== undefined) {
      const targetLemma = groups.target.replace(TARGET_NUMERIC_SUFFIX_REGEX, '');
      // With no target there is no entry to open
      if (!targetLemma) addText(groups.linkText);
      else
        segments.push({
          kind: 'entryLink',
          text: groups.linkText,
          dictionaryId: groups.dictionaryId,
          targetLemma,
        });
    } else if (groups.abbreviation !== undefined) addText(groups.abbreviation);
    else if (groups.bibleRefs !== undefined) {
      const bibleRefs = groups.bibleRefs.split(/[ -]/);
      const verseRefs = bibleRefs.map(toVerseRef);
      if (verseRefs.some((verseRef) => !verseRef)) addText(match[0]);
      else
        verseRefs.forEach((verseRef, index) => {
          if (!verseRef) return;
          if (index > 0) {
            // Each reference is 14 digits, so its separator follows the previous reference
            const separator = groups.bibleRefs[index * 15 - 1];
            addText(BIBLE_REF_SEPARATORS[separator]);
          }
          segments.push({
            kind: 'scriptureLink',
            text: formatScrRef(verseRef, 'English'),
            verseRef,
          });
        });
    } else if (groups.domainCode !== undefined) addText(groups.domainCode);
    else if (groups.styleMarker !== undefined)
      addText(groups.styledText, TEXT_STYLES[groups.styleMarker]);
    else if (groups.lineBreak !== undefined) segments.push({ kind: 'lineBreak' });
  });

  addText(decoded.slice(textStart));
  return segments;
}

/**
 * Reduces a definition or gloss to its readable text, for places that show plain text, such as the
 * list of entries. Line breaks become `/`.
 *
 * @param text - Definition or gloss text as stored in the lexical reference text.
 * @returns The text without its markup.
 */
export function markupToPlainText(text: string): string {
  return parseDefinitionMarkup(text)
    .map((segment) => (segment.kind === 'lineBreak' ? ' / ' : segment.text))
    .join('');
}
