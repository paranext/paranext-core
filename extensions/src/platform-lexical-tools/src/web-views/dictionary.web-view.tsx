import { useCallback, useMemo } from 'react';
import {
  Label,
  SearchBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  usePromise,
} from 'platform-bible-react';
import { useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import { DictionaryScope, Entry } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { DictionaryEntryDisplay } from '../components/dictionary/dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  useIsWideScreen,
} from '../utils/dictionary.util';
import { DictionaryList } from '../components/dictionary/dictionary-list.component';

// TODO: Implement 'section' scope, see comment line 115
// TODO: If projectId, sync scrRef

globalThis.webViewComponent = function Dictionary({
  projectId,
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [scope, setScope] = useWebViewState<DictionaryScope>('scope', 'chapter');
  const [searchQuery, setSearchQuery] = useWebViewState<string>('searchQuery', '');
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  const lexicalService = useDataProvider('platformLexicalTools.lexicalReferenceService');
  const isWideScreen = useIsWideScreen();

  const getEntriesById = useCallback(() => {
    if (!lexicalService) return Promise.resolve(undefined);
    return lexicalService.getEntriesById({});
  }, [lexicalService]);

  const [entriesById] = usePromise(getEntriesById, undefined);

  // Return all defined entries filtered by scrRef and searchQuery
  const allEntriesByScrRef = useMemo(() => {
    // First filter entries by scrRef and scope
    const filteredByScrRef = Object.values(entriesById ?? {})
      .flat()
      .filter((entry): entry is Entry => {
        if (!entry) return false;
        return Object.values(entry.senses).some(
          (sense) =>
            sense?.occurrences &&
            Object.values(sense.occurrences).some((occurrences) =>
              occurrences?.some(
                (occurrence) =>
                  occurrence.verseRef.book === scrRef.book &&
                  occurrence.verseRef.chapterNum === scrRef.chapterNum &&
                  (scope === 'verse' ? occurrence.verseRef.verseNum === scrRef.verseNum : true),
              ),
            ),
        );
      });

    // Then filter the result by searchQuery
    const search = searchQuery.toLowerCase();
    return filteredByScrRef.filter((entry) => {
      const matchesSearch =
        entry.lemma.toLowerCase().includes(search) ||
        entry.strongsCodes.some((code) => code.toLowerCase().includes(search)) ||
        getFormatGlossesStringFromDictionaryEntrySenses(entry).toLowerCase().includes(search);
      return matchesSearch;
    });
  }, [entriesById, searchQuery, scope, scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  const onSelectOccurrence = useCallback(
    (scrRefOfOccurrence: SerializedVerseRef) => {
      setScrRef(scrRefOfOccurrence);
    },
    [setScrRef],
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
    <div className="tw-flex tw-flex-col tw-h-full">
      <div className="tw-sticky tw-top-0 tw-z-10 tw-shrink-0 tw-p-2 tw-border-b">
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
                {projectId !== undefined && (
                  <SelectItem value="section">
                    {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_section%']}
                  </SelectItem>
                )}
                <SelectItem value="verse">
                  {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_verse%']}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="tw-max-w-72">
            <SearchBar
              value={searchQuery}
              onSearch={setSearchQuery}
              placeholder={localizedStrings['%platformLexicalTools_dictionary_searchDictionary%']}
              isFullWidth={false}
            />
          </div>
        </div>
      </div>
      {allEntriesByScrRef.length === 0 && (
        <div className="tw-m-4 tw-flex tw-justify-center">
          <Label>{localizedStrings['%platformLexicalTools_dictionary_noResults%']}</Label>
        </div>
      )}
      {allEntriesByScrRef.length === 1 && (
        <DictionaryEntryDisplay
          scriptureReferenceToFilterBy={scrRef}
          isDrawer={!isWideScreen}
          dictionaryEntry={allEntriesByScrRef[0]}
          onSelectOccurrence={onSelectOccurrence}
        />
      )}
      {allEntriesByScrRef.length > 1 && (
        <DictionaryList
          dictionaryData={allEntriesByScrRef}
          scriptureReferenceToFilterBy={scrRef}
          onSelectOccurrence={onSelectOccurrence}
        />
      )}
    </div>
  );
};
