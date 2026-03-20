import { useCallback, useMemo, useRef } from 'react';
import {
  Label,
  SearchBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from 'platform-bible-react';
import { useData, useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import { Entry, LexicalEntriesById, LexicalReferenceSelector } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { DictionaryEntryDisplay } from '../components/dictionary/dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  DictionaryScope,
  getFormatGlossesStringFromDictionaryEntrySenses,
} from '../utils/dictionary.utils';
import { DictionaryList } from '../components/dictionary/dictionary-list.component';
import { logger } from '@papi/frontend';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';

const ENTRIES_DEFAULT: LexicalEntriesById = {};

globalThis.webViewComponent = function Dictionary({
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [scope, setScope] = useWebViewState<DictionaryScope>('scope', 'chapter');
  const [searchQuery, setSearchQuery] = useWebViewState<string>('searchQuery', '');
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // ref.current expects null and not undefined when we pass it to the search input
  // eslint-disable-next-line no-null/no-null
  const searchInputRef = useRef<HTMLInputElement>(null);
  // ref.current expects null and not undefined when we pass it to the div
  // eslint-disable-next-line no-null/no-null
  const dictionaryEntryRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    dictionaryEntryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create selector for filtering entries by verse reference
  const selector: LexicalReferenceSelector = useMemo(
    () => ({
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      ...(scope === 'verse' && { verseNum: scrRef.verseNum }),
    }),
    [scrRef.book, scrRef.chapterNum, scrRef.verseNum, scope],
  );

  const [entriesByIdPossiblyError] = useData(
    'platformLexicalTools.lexicalReferenceService',
  ).EntriesById(selector, ENTRIES_DEFAULT);
  // Handle a PlatformError if one comes in instead of lexical data
  const entriesById = useMemo(() => {
    if (!isPlatformError(entriesByIdPossiblyError)) return entriesByIdPossiblyError;

    const errorMessage = getErrorMessage(entriesByIdPossiblyError);
    logger.error(`Error getting entries by ID: ${errorMessage}`);
    return ENTRIES_DEFAULT;
  }, [entriesByIdPossiblyError]);

  const isLoadingEntriesById = entriesById === ENTRIES_DEFAULT;

  // Return all defined entries filtered by searchQuery
  const entriesFiltered = useMemo(() => {
    if (entriesById === ENTRIES_DEFAULT) return [];

    // Filter entries by searchQuery (verse reference filtering is now done on backend)
    const search = searchQuery.toLowerCase();
    return Object.values(entriesById ?? {})
      .flat()
      .filter((entry): entry is Entry => {
        if (!entry) return false;
        const matchesSearch =
          entry.lemma.toLowerCase().includes(search) ||
          entry.strongsCodes.some((code) => code.toLowerCase().includes(search)) ||
          getFormatGlossesStringFromDictionaryEntrySenses(entry, scrRef)
            .toLowerCase()
            .includes(search);
        return matchesSearch;
      });
  }, [entriesById, searchQuery, scrRef]);

  const onSelectOccurrence = useCallback(
    (scrRefOfOccurrence: SerializedVerseRef) => {
      setScrRef(scrRefOfOccurrence);
    },
    [setScrRef],
  );

  const onCharacterPress = useCallback(
    (character: string) => {
      searchInputRef.current?.focus();
      setSearchQuery(character);
    },
    [setSearchQuery],
  );

  // TODO: Implement project selection when lexical data from scripture projects available
  // const handleSelectProject = useCallback(
  //   (newProjectId: string) => {
  //     updateWebViewDefinition({
  //       projectId: newProjectId,
  //     });
  //   },
  //   [updateWebViewDefinition],
  // );

  return (
    <div className="tw-flex tw-flex-col tw-h-[100dvh]">
      <div className="tw-sticky tw-bg-background tw-top-0 tw-z-10 tw-shrink-0 tw-p-2 tw-border-b tw-h-auto">
        <div className="tw-flex tw-items-center tw-gap-2">
          <div className="tw-max-w-56">
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chapter">
                  {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_chapter%']}
                </SelectItem>
                {/* TODO: Implement project selection when lexical data from scripture projects available */}
                {/* {projectId !== undefined && (
                  <SelectItem value="section">
                    {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_section%']}
                  </SelectItem>
                )} */}
                <SelectItem value="verse">
                  {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_verse%']}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="tw-max-w-72">
            <SearchBar
              ref={searchInputRef}
              value={searchQuery}
              onSearch={setSearchQuery}
              placeholder={localizedStrings['%platformLexicalTools_dictionary_searchDictionary%']}
              isFullWidth={false}
            />
          </div>
        </div>
      </div>
      {isLoadingEntriesById && (
        <div className="tw-flex-1 tw-p-2 tw-space-y-4">
          {[...Array(10)].map((_, index) => (
            <Skeleton
              // There are no other unique identifiers for these items
              // eslint-disable-next-line react/no-array-index-key
              key={`dictionary-list-item-skeleton-${index}`}
              className="tw-h-14 tw-w-full"
            />
          ))}
        </div>
      )}
      {entriesFiltered.length === 0 && !isLoadingEntriesById && (
        <div className="tw-m-4 tw-flex tw-justify-center">
          <Label>{localizedStrings['%platformLexicalTools_dictionary_noResults%']}</Label>
        </div>
      )}
      {entriesFiltered.length === 1 && (
        <div ref={dictionaryEntryRef} className="tw-overflow-y-auto tw-p-4">
          <DictionaryEntryDisplay
            scriptureReferenceToFilterBy={scrRef}
            isDrawer={false}
            dictionaryEntry={entriesFiltered[0]}
            onSelectOccurrence={onSelectOccurrence}
            onClickScrollToTop={scrollToTop}
          />
        </div>
      )}
      {entriesFiltered.length > 1 && (
        <DictionaryList
          dictionaryData={entriesFiltered}
          scriptureReferenceToFilterBy={scrRef}
          onSelectOccurrence={onSelectOccurrence}
          onCharacterPress={onCharacterPress}
        />
      )}
    </div>
  );
};
