import { SerializedVerseRef } from '@sillsdev/scripture';
import { LocalizeKey } from 'platform-bible-utils';
import { Entry, Occurrence, Sense } from 'platform-lexical-tools';
import { useEffect, useState } from 'react';

// Regex to remove any parenthetical statements (including nested)
const REMOVE_PARENTHETICAL_STATEMENTS_REGEX = /\([^()]*\)/g;

export const DICTIONARY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformLexicalTools_dictionary_allOccurrencesLabel%',
  '%platformLexicalTools_dictionary_backToList%',
  '%platformLexicalTools_dictionary_definitionLabel%',
  '%platformLexicalTools_dictionary_domainTaxonomyLabel%',
  '%platformLexicalTools_dictionary_noResults%',
  '%platformLexicalTools_dictionary_occurrencesInChapterLabel%',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%',
  '%platformLexicalTools_dictionary_searchDictionary%',
  '%platformLexicalTools_dictionary_sensesLabel%',
  '%platformLexicalTools_dictionary_scopeSelector_chapter%',
  '%platformLexicalTools_dictionary_scopeSelector_section%',
  '%platformLexicalTools_dictionary_scopeSelector_verse%',
  '%platformLexicalTools_dictionary_strongsCodeLabel%',
  '%platformLexicalTools_dictionary_trackProjectDropdownLabel%',
];

export function useIsWideScreen() {
  const [isWide, setIsWide] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    // Matches Tailwind css lg breakpoint
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Set initial state
    setIsWide(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isWide;
}

/**
 * Takes a dictionary entry and returns an array of its glosses, with parenthetical statements
 * removed and individual glosses separated by commas. Not intended for a long term solution, will
 * not play well with other data.
 *
 * @param dictionaryEntry - The dictionary entry to format.
 * @returns An array of glosses.
 */
export function getFormatGlossesStringFromDictionaryEntrySenses(
  dictionaryEntry: Entry,
  scrRef?: SerializedVerseRef,
): string {
  // If scrRef is provided, filter senses to those with occurrences in the current book/chapter
  const senses = scrRef
    ? Object.values(dictionaryEntry.senses).filter((sense) =>
        Object.values(sense?.occurrences ?? {}).some((arr) =>
          Array.isArray(arr)
            ? arr.some(
                (occ) =>
                  occ.verseRef.book === scrRef.book &&
                  occ.verseRef.chapterNum === scrRef.chapterNum,
              )
            : false,
        ),
      )
    : Object.values(dictionaryEntry.senses);

  return [
    ...new Set(
      senses.flatMap(
        (sense) =>
          sense?.glosses?.flatMap((gloss) =>
            gloss
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
 * Calculates the total number of occurrences for all senses within a dictionary entry.
 *
 * @param dictionaryEntry - The dictionary entry containing senses to be counted.
 * @returns The total count of occurrences across all senses in the entry.
 */
export function getCombinedOccurrencesCountFromDictionaryEntrySenses(
  dictionaryEntry: Entry,
  scrRef?: SerializedVerseRef,
): number {
  const allOccurrences: Occurrence[] = [];
  Object.values(dictionaryEntry.senses).forEach((sense) => {
    if (!sense?.occurrences) return;
    Object.values(sense.occurrences)
      .filter((arr): arr is Occurrence[] => Array.isArray(arr))
      .forEach((arr) => allOccurrences.push(...arr));
  });

  // Filter by bookNum and chapterNum if scrRef is provided
  const filteredOccurrences = scrRef
    ? allOccurrences.filter(
        (occ) => occ.verseRef.book === scrRef.book && occ.verseRef.chapterNum === scrRef.chapterNum,
      )
    : allOccurrences;

  // De-duplicate occurrences using Set and a unique key (e.g., JSON.stringify)
  const uniqueOccurrences = new Set(filteredOccurrences.map((occ) => JSON.stringify(occ)));
  return uniqueOccurrences.size;
}

export function getOccurrenceCountForSense(sense: Sense, scrRef?: SerializedVerseRef): number {
  if (!sense.occurrences) return 0;

  // Filter occurrences by bookNum and chapterNum if scrRef is provided
  const occurrences = scrRef
    ? Object.values(sense.occurrences)
        .flat()
        .filter(
          (occ): occ is Occurrence =>
            !!occ &&
            occ.verseRef.book === scrRef.book &&
            occ.verseRef.chapterNum === scrRef.chapterNum,
        )
    : Object.values(sense.occurrences)
        .flat()
        .filter((occ): occ is Occurrence => !!occ);

  const uniqueOccurrences = new Set(occurrences);
  return uniqueOccurrences.size;
}

export function getChapterOrAllOccurrencesForSense(
  sense: Sense,
  scrRef?: SerializedVerseRef,
): Occurrence[] {
  const allOccurrences: Occurrence[] = [];
  if (!sense?.occurrences) return [];
  Object.values(sense.occurrences)
    .filter((arr): arr is Occurrence[] => Array.isArray(arr))
    .forEach((arr) => allOccurrences.push(...arr));

  // Filter by bookNum and chapterNum if scrRef is provided
  const filteredOccurrences = scrRef
    ? allOccurrences.filter(
        (occ) => occ.verseRef.book === scrRef.book && occ.verseRef.chapterNum === scrRef.chapterNum,
      )
    : allOccurrences;

  // De-duplicate occurrences by verseRef using a Map
  const uniqueOccurrencesMap = new Map<string, Occurrence>();
  filteredOccurrences.forEach((occ) => {
    const key = JSON.stringify(occ.verseRef);
    if (!uniqueOccurrencesMap.has(key)) {
      uniqueOccurrencesMap.set(key, occ);
    }
  });
  return Array.from(uniqueOccurrencesMap.values());
}
