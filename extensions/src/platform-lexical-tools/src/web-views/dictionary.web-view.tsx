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
// import papi from '@papi/frontend';
// import { isPlatformError } from 'platform-bible-utils';
// import { TrackProjectDropdown } from '../components/dictionary/track-project-dropdown.component';
import { DictionaryEntryDisplay } from '../components/dictionary/dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  useIsWideScreen,
} from '../utils/dictionary.util';
import { DictionaryList } from '../components/dictionary/dictionary-list.component';

globalThis.webViewComponent = function Dictionary({
  projectId,
  // updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  // TODO: Implement 'section' scope, see comment line 115
  const [scope, setScope] = useWebViewState<DictionaryScope>('scope', 'chapter');
  const [searchQuery, setSearchQuery] = useWebViewState<string>('searchQuery', '');
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  // TODO: If projectId, sync scrRef
  const [scrRef] = useWebViewScrollGroupScrRef();
  const isWideScreen = useIsWideScreen();

  // const [entriesByOccurrence, , isLoadingEntriesByOccurrence] = useData(
  //   'platformLexicalTools.lexicalReferenceService',
  // ).EntriesByOccurrence({}, {});
  // console.log(entriesByOccurrence);

  // Gets the project IDs and names for all available, editable scripture projects
  // const [projectIdsAndNames] = usePromise(
  //   useCallback(async () => {
  //     const projectOptions: DictionaryProjectOption[] = [];

  //     // Fetch projects metadata to get ids
  //     const allMetadata = await papi.projectLookup.getMetadataForAllProjects();

  //     // Map through all metadata to get ids and names
  //     await Promise.all(
  //       allMetadata.map(async (metadata) => {
  //         const shortName = await getProjectShortName(metadata.id);
  //         if (!shortName) return;
  //         projectOptions.push({ projectId: metadata.id, projectShortName: shortName });
  //       }),
  //     );

  //     return projectOptions;
  //   }, []),
  //   useMemo(() => [], []),
  // );

  const lexicalService = useDataProvider('platformLexicalTools.lexicalReferenceService');

  // const getEntriesById = useCallback(() => {
  //   if (!lexicalService) return Promise.resolve(undefined);
  //   return lexicalService.getEntriesById({});
  // }, [lexicalService]);

  // const [entriesByOccurrence] = usePromise(getEntriesById, undefined);
  // console.log('entriesByOccurrence', entriesByOccurrence);

  // const filterEntriesBySearchQuery = useCallback(
  //   (entries: Entry[]): Entry[] =>
  //     Object.values(entries ?? {})
  //       .flat()
  //       .filter(
  //         (entry): entry is Entry =>
  //           entry !== undefined &&
  //           (entry.lemma.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //             entry.strongsCodes.some((code) =>
  //               code.toLowerCase().includes(searchQuery.toLowerCase()),
  //             ) ||
  //             getFormatGlossesStringFromDictionaryEntrySenses(entry)
  //               .toLowerCase()
  //               .includes(searchQuery.toLowerCase())),
  //       ),
  //   [searchQuery],
  // );

  // const filterEntriesBySensesScrRef = useCallback(() => {

  // })

  // // All defined entries filtered by searchQuery and scrRef
  // const allEntries: Entry[] = useMemo(() => {
  //   if (!entriesByOccurrence) return []; // || isPlatformError(entriesByOccurrence)

  // }, [entriesByOccurrence]);
  // console.log('allEntries', allEntries);

  // TODO: Use getEntriesByOccurrence here instead?
  const getEntriesForScrRefById = useCallback(() => {
    if (!lexicalService) return Promise.resolve(undefined);
    return lexicalService.getEntriesById({
      // sourceTextId: projectId, TODO: Do I need this?
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: scope === 'verse' ? scrRef.verseNum : undefined,
    });
  }, [lexicalService, scope, scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  const [entriesById] = usePromise(getEntriesForScrRefById, undefined);

  // Return all defined entries filtered by searchQuery
  const allEntries = useMemo(
    () =>
      Object.values(entriesById ?? {})
        .flat()
        .filter(
          (entry): entry is Entry =>
            entry !== undefined &&
            (entry.lemma.toLowerCase().includes(searchQuery.toLowerCase()) ||
              entry.strongsCodes.some((code) =>
                code.toLowerCase().includes(searchQuery.toLowerCase()),
              ) ||
              getFormatGlossesStringFromDictionaryEntrySenses(entry)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())),
        ),
    [entriesById, searchQuery],
  );

  // const handleSelectProject = useCallback(
  //   (newProjectId: string) => {
  //     updateWebViewDefinition({
  //       projectId: newProjectId,
  //     });
  //   },
  //   [updateWebViewDefinition],
  // );

  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-sticky tw-top-0 tw-z-10 tw-bg-white tw-flex tw-items-center tw-gap-2 tw-p-2 tw-border-b">
        <div className="tw-max-w-56 tw-flex-1">
          <Select value={scope} onValueChange={setScope}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chapter">
                {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_chapter%']}
              </SelectItem>
              {/* TODO: Implement section scope when lexical data from scripture projects available */}
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
        <div className="tw-max-w-72 tw-flex-1">
          <SearchBar
            value={searchQuery}
            onSearch={setSearchQuery}
            placeholder={localizedStrings['%platformLexicalTools_dictionary_searchDictionary%']}
            isFullWidth={false}
          />
        </div>
        {/* TODO: Implement project selection when lexical data from scripture projects available */}
        {/* <div className="tw-basis-1/3 tw-flex-1">
          <TrackProjectDropdown
            projectOptions={projectIdsAndNames}
            projectToTrack={projectId}
            handleTrackProjectChange={handleSelectProject}
          />
        </div> */}
      </div>
      {allEntries.length === 0 && (
        <div className="tw-m-4 tw-flex tw-justify-center">
          <Label>{localizedStrings['%platformLexicalTools_dictionary_noResults%']}</Label>
        </div>
      )}
      {allEntries.length === 1 && (
        <DictionaryEntryDisplay isDrawer={!isWideScreen} dictionaryEntry={allEntries[0]} />
      )}
      {allEntries.length > 1 && <DictionaryList dictionaryData={allEntries} />}
    </div>
  );
};
