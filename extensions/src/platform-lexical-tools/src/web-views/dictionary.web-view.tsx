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
  usePromise,
} from 'platform-bible-react';
import { useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import { Entry } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { DictionaryEntryDisplay } from '../components/dictionary/dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  DictionaryScope,
  getFormatGlossesStringFromDictionaryEntrySenses,
  useIsWideScreen,
} from '../utils/dictionary.utils';
import { DictionaryList } from '../components/dictionary/dictionary-list.component';

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

  const lexicalService = useDataProvider('platformLexicalTools.lexicalReferenceService');
  const isWideScreen = useIsWideScreen();

  const scrollToTop = () => {
    dictionaryEntryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getEntriesById = useCallback(() => {
    if (!lexicalService) return Promise.resolve(undefined);
    return lexicalService.getEntriesById({});
  }, [lexicalService]);

  const [entriesById, isLoadingEntriesById] = usePromise(getEntriesById, undefined);

  // Return all defined entries filtered by scrRef and searchQuery
  const allEntriesByScrRef = useMemo(() => {
    if (!entriesById) return [];
    // First filter entries by scrRef and scope
    const filteredByScrRef = Object.values(entriesById ?? {})
      .flat()
      .filter((entry): entry is Entry => {
        if (!entry) return false;
        return Object.values(entry.senses).some(
          (sense) =>
            sense?.occurrences &&
            Object.values(sense.occurrences).some(
              (occurrences) =>
                occurrences?.some(
                  (occurrence) =>
                    occurrence.verseRef.book === scrRef.book &&
                    occurrence.verseRef.chapterNum === scrRef.chapterNum &&
                    (scope === 'verse' ? occurrence.verseRef.verseNum === scrRef.verseNum : true),
                ), // TODO: Filter by section
            ),
        );
      });

    // Then filter the result by searchQuery
    const search = searchQuery.toLowerCase();
    return filteredByScrRef.filter((entry) => {
      const matchesSearch =
        entry.lemma.toLowerCase().includes(search) ||
        entry.strongsCodes.some((code) => code.toLowerCase().includes(search)) ||
        getFormatGlossesStringFromDictionaryEntrySenses(entry, scrRef)
          .toLowerCase()
          .includes(search);
      return matchesSearch;
    });
  }, [entriesById, searchQuery, scrRef, scope]);

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
      {allEntriesByScrRef.length === 0 && !isLoadingEntriesById && (
        <div className="tw-m-4 tw-flex tw-justify-center">
          <Label>{localizedStrings['%platformLexicalTools_dictionary_noResults%']}</Label>
        </div>
      )}
      {allEntriesByScrRef.length === 1 && (
        <div ref={dictionaryEntryRef} className="tw-overflow-y-auto tw-p-4">
          <DictionaryEntryDisplay
            scriptureReferenceToFilterBy={scrRef}
            isDrawer={!isWideScreen}
            dictionaryEntry={allEntriesByScrRef[0]}
            onSelectOccurrence={onSelectOccurrence}
            onClickScrollToTop={scrollToTop}
          />
        </div>
      )}
      {allEntriesByScrRef.length > 1 && (
        <DictionaryList
          dictionaryData={allEntriesByScrRef}
          scriptureReferenceToFilterBy={scrRef}
          onSelectOccurrence={onSelectOccurrence}
          onCharacterPress={onCharacterPress}
        />
      )}
    </div>
  );
};
