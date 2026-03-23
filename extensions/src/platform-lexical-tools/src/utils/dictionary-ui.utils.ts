import { useEffect, useState } from 'react';

import { ERROR_POPOVER_STRING_KEYS } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';

export const DICTIONARY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  ...ERROR_POPOVER_STRING_KEYS,
  '%platformLexicalTools_dictionary_allOccurrencesLabel%',
  '%platformLexicalTools_dictionary_backToList%',
  '%platformLexicalTools_dictionary_definitionLabel%',
  '%platformLexicalTools_dictionary_domainTaxonomyLabel%',
  '%platformLexicalTools_dictionary_noResults%',
  '%platformLexicalTools_dictionary_occurrencesInChapterLabel%',
  '%platformLexicalTools_dictionary_occurrencesInVerseLabel%',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%',
  '%platformLexicalTools_dictionary_occurrencesToggleAll%',
  '%platformLexicalTools_dictionary_occurrencesToggleChapter%',
  '%platformLexicalTools_dictionary_searchDictionary%',
  '%platformLexicalTools_dictionary_sensesLabel%',
  '%platformLexicalTools_dictionary_scopeSelector_chapter%',
  '%platformLexicalTools_dictionary_scopeSelector_section%',
  '%platformLexicalTools_dictionary_scopeSelector_verse%',
  '%platformLexicalTools_dictionary_strongsCodeLabel%',
  '%platformLexicalTools_dictionary_sdbgCopyright%',
  '%platformLexicalTools_dictionary_sdbhCopyright%',
  '%platformLexicalTools_dictionary_trackProjectDropdownLabel%',
  '%platformLexicalTools_dictionary_dataLoadError%',
  '%platformLexicalTools_dictionary_viewErrorDetails%',
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
