import { useEffect, useMemo, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';

import { ERROR_POPOVER_STRING_KEYS } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { DICTIONARY_TITLE_KEY, DictionaryScope } from './dictionary.utils';

/**
 * The parts of the reader's reference that decide what is in scope: the book, the chapter, and the
 * verse only in verse scope (otherwise 0). The scroll group gives a new reference object on every
 * verse move, so depending on this instead keeps a verse move within the chapter from redoing work
 * or resetting a selection in chapter scope.
 *
 * @param scrRef - The reader's reference, if any.
 * @param scope - The scope the dictionary list is filtered by.
 * @returns A reference that changes only when what is in scope does.
 */
export function useScopeReference(
  scrRef: SerializedVerseRef | undefined,
  scope: DictionaryScope,
): SerializedVerseRef | undefined {
  const book = scrRef?.book;
  const chapterNum = scrRef?.chapterNum;
  const verseNum = scope === 'verse' ? scrRef?.verseNum : 0;
  return useMemo(
    () =>
      book === undefined || chapterNum === undefined || verseNum === undefined
        ? undefined
        : { book, chapterNum, verseNum },
    [book, chapterNum, verseNum],
  );
}

export const DICTIONARY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  ...ERROR_POPOVER_STRING_KEYS,
  DICTIONARY_TITLE_KEY,
  '%platformLexicalTools_dictionary_allOccurrencesLabel%',
  '%platformLexicalTools_dictionary_backToList%',
  '%platformLexicalTools_dictionary_definitionLabel%',
  '%platformLexicalTools_dictionary_domainTaxonomyLabel%',
  '%platformLexicalTools_dictionary_entryNotFound%',
  '%platformLexicalTools_dictionary_hideLessRelevantSenses%',
  '%platformLexicalTools_dictionary_noResults%',
  '%platformLexicalTools_dictionary_occurrencesInChapterLabel%',
  '%platformLexicalTools_dictionary_occurrencesInVerseLabel%',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%',
  '%platformLexicalTools_dictionary_occurrencesToggleAll%',
  '%platformLexicalTools_dictionary_occurrencesToggleChapter%',
  '%platformLexicalTools_dictionary_searchDictionary%',
  '%platformLexicalTools_dictionary_sensesLabel%',
  '%platformLexicalTools_dictionary_showLessRelevantSenses%',
  '%platformLexicalTools_dictionary_scopeSelector_chapter%',
  '%platformLexicalTools_dictionary_scopeSelector_section%',
  '%platformLexicalTools_dictionary_scopeSelector_verse%',
  '%platformLexicalTools_dictionary_sdbgCopyright%',
  '%platformLexicalTools_dictionary_sdbhCopyright%',
  '%platformLexicalTools_dictionary_strongsCodeLabel%',
  '%platformLexicalTools_dictionary_trackProjectDropdownLabel%',
  '%platformLexicalTools_dictionary_dataLoadError%',
  '%settings_errorMessages_viewError%',
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
