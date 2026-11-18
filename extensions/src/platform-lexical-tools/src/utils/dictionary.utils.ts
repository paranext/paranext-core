import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { Entry, Occurrence, Sense } from 'platform-lexical-tools';
import { LocalizeKey } from 'platform-bible-utils';
import { markupToPlainText } from './definition-markup.utils';

// Regex to remove any parenthetical statements (including nested)
const REMOVE_PARENTHETICAL_STATEMENTS_REGEX = /\([^()]*\)/g;

/**
 * The Dictionary tab's title key, shared between the web view provider (which sets the tab's raw
 * title and initial tooltip) and the web view itself (which keeps the tooltip's resolved value
 * current as the interface language changes) so the two can't resolve different keys.
 */
export const DICTIONARY_TITLE_KEY: LocalizeKey = '%platformLexicalTools_dictionary_title_sdbhSdbg%';

/** Type for the dictionary scope */
export type DictionaryScope = 'chapter' | 'section' | 'verse';

/** Type for the occurrence view */
export type DictionaryOccurrenceView = 'chapter' | 'all';

/** Type for the project options */
export type DictionaryProjectOption = { projectId: string | undefined; projectShortName: string };

/**
 * Whether a reference is in the part of the Bible the dictionary list is filtered to: the verse in
 * verse scope, the chapter otherwise. Both the list's selection and the dimming of senses use this
 * rule, so they cannot disagree.
 *
 * @param verseRef - The reference to check.
 * @param scrRef - The current reference.
 * @param scope - The scope the dictionary list is filtered by.
 * @returns `true` if `verseRef` is in scope.
 */
export function isReferenceInScope(
  verseRef: SerializedVerseRef,
  scrRef: SerializedVerseRef,
  scope: DictionaryScope,
): boolean {
  return (
    verseRef.book === scrRef.book &&
    verseRef.chapterNum === scrRef.chapterNum &&
    (scope !== 'verse' || verseRef.verseNum === scrRef.verseNum)
  );
}

/**
 * Whether a sense occurs where the dictionary list is filtered to (see {@link isReferenceInScope}).
 * Senses that do not are less relevant, and are dimmed.
 *
 * @param sense - The sense to check.
 * @param scrRef - The current reference. Every sense is in scope when there is none.
 * @param scope - The scope the dictionary list is filtered by.
 * @returns `true` if the sense has an occurrence in scope.
 */
export function isSenseInScope(
  sense: Sense,
  scrRef: SerializedVerseRef | undefined,
  scope: DictionaryScope,
): boolean {
  if (!scrRef) return true;
  return Object.values(sense.occurrences).some((occurrences) =>
    occurrences?.some(({ verseRef }) => isReferenceInScope(verseRef, scrRef, scope)),
  );
}

/**
 * Takes a dictionary entry and returns an array of its glosses, with parenthetical statements
 * removed and individual glosses separated by commas. Not intended for a long term solution, will
 * not play well with other data.
 *
 * @param dictionaryEntry - The dictionary entry to format.
 * @param scrRef - If provided, only glosses of senses in scope (see {@link isSenseInScope}) are
 *   included.
 * @param scope - The scope the dictionary list is filtered by.
 * @returns An array of glosses.
 */
export function getFormatGlossesStringFromDictionaryEntrySenses(
  dictionaryEntry: Entry,
  scrRef?: SerializedVerseRef,
  scope: DictionaryScope = 'chapter',
): string {
  const senses = Object.values(dictionaryEntry.senses).filter(
    (sense): sense is Sense => !!sense && isSenseInScope(sense, scrRef, scope),
  );

  return [
    ...new Set(
      senses.flatMap(
        (sense) =>
          sense?.glosses?.flatMap((gloss) =>
            markupToPlainText(gloss)
              .replace(REMOVE_PARENTHETICAL_STATEMENTS_REGEX, '')
              .split(',')
              .map((g) => g.trim())
              .filter(Boolean),
          ) ?? [],
      ),
    ),
  ].join(', ');
}

/**
 * Helper function to collect and filter all occurrences from a dictionary entry. De-duplicates
 * occurrences by verseRef.
 */
function deduplicateOccurrencesByVerseRef(occurrences: Occurrence[]): Occurrence[] {
  const seen = new Set<string>();
  return occurrences.filter((occurrence) => {
    const key = JSON.stringify(occurrence.verseRef);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getAllOccurrencesFromDictionaryEntry(
  dictionaryEntry: Entry,
  scrRef?: SerializedVerseRef,
): Occurrence[] {
  const occurrences: Occurrence[] = [];
  Object.values(dictionaryEntry.senses).forEach((sense) => {
    if (!sense?.occurrences) return;
    Object.values(sense.occurrences)
      .filter((arr): arr is Occurrence[] => Array.isArray(arr))
      .forEach((arr) => occurrences.push(...arr));
  });

  const filtered = scrRef
    ? occurrences.filter(
        (occ) => occ.verseRef.book === scrRef.book && occ.verseRef.chapterNum === scrRef.chapterNum,
      )
    : occurrences;

  return deduplicateOccurrencesByVerseRef(filtered);
}

/**
 * Calculates the total number of occurrences for all senses within a dictionary entry.
 *
 * @param dictionaryEntry - The dictionary entry containing senses to be counted.
 * @returns The total count of occurrences across all senses in the entry.
 */
export function getCombinedOccurrencesCountFromDictionaryEntrySenses(
  dictionaryEntry: Entry,
  scrRef?: SerializedVerseRef,
): number {
  return getAllOccurrencesFromDictionaryEntry(dictionaryEntry, scrRef).length;
}

function getChapterOrAllOccurrencesForSense(
  sense: Sense,
  scrRef?: SerializedVerseRef,
): Occurrence[] {
  const occurrences: Occurrence[] = [];
  if (!sense?.occurrences) return [];
  Object.values(sense.occurrences ?? {})
    .filter((arr): arr is Occurrence[] => Array.isArray(arr))
    .forEach((arr) => occurrences.push(...arr));

  return scrRef
    ? occurrences.filter(
        (occ) => occ.verseRef.book === scrRef.book && occ.verseRef.chapterNum === scrRef.chapterNum,
      )
    : occurrences;
}

/** Orders occurrences as they appear in the Bible */
function compareOccurrences(a: Occurrence, b: Occurrence): number {
  return (
    Canon.bookIdToNumber(a.verseRef.book) - Canon.bookIdToNumber(b.verseRef.book) ||
    a.verseRef.chapterNum - b.verseRef.chapterNum ||
    a.verseRef.verseNum - b.verseRef.verseNum ||
    a.wordNum - b.wordNum
  );
}

/**
 * Gathers the occurrences of several senses, one per verse, in Bible order.
 *
 * @param senses - The senses whose occurrences to gather.
 * @param scrRef - If provided, only occurrences in this book and chapter are included.
 * @returns The occurrences in Bible order.
 */
export function getDeduplicatedOccurrencesFromSenses(
  senses: Sense[],
  scrRef?: SerializedVerseRef,
): Occurrence[] {
  const occurrences = senses.flatMap((sense) => getChapterOrAllOccurrencesForSense(sense, scrRef));
  return deduplicateOccurrencesByVerseRef(occurrences.sort(compareOccurrences));
}
