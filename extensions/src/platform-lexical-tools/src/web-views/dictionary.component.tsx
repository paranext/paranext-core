import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  ErrorPopover,
  Label,
  SearchBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from 'platform-bible-react';
import { Entry, LexicalEntriesById } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { LanguageStrings } from 'platform-bible-utils';
import { DictionaryEntryDisplay } from '../components/dictionary/dictionary-entry-display.component';
import {
  DictionaryScope,
  getFormatGlossesStringFromDictionaryEntrySenses,
} from '../utils/dictionary.utils';
import { DictionaryList } from '../components/dictionary/dictionary-list.component';

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

/** Result of a scope-filtered entries read. */
export type DictionaryEntriesResult = {
  /** Entries mapped by ID for the requested scope/reference. */
  entriesById: LexicalEntriesById;
  /** A user-facing error message if the read failed, otherwise `undefined`. */
  error?: string;
};

/** Props for the {@link Dictionary} presentational component. */
export type DictionaryProps = {
  /** Localized strings for the dictionary; resolve via `DICTIONARY_LOCALIZED_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** Current Scripture reference (from the webview scroll group) used to scope and filter entries. */
  scrRef: SerializedVerseRef;
  /** Called when the user selects an occurrence; navigates the scroll group to that reference. */
  onSelectOccurrence: (scrRefOfOccurrence: SerializedVerseRef) => void;
  /**
   * Retrieve the entries for the current scope and Scripture reference. This is a callback (not a
   * prop) because the read depends on values (`scope`, `scrRef`) resolved inside this component.
   * Implementations should resolve a {@link PlatformError} into the `error` field.
   */
  getEntries: (
    scope: DictionaryScope,
    scrRef: SerializedVerseRef,
  ) => Promise<DictionaryEntriesResult>;
  /**
   * Retrieve the full (unfiltered) data for a displayed entry, used to show all occurrences across
   * Scripture. This is a callback because the entry to fetch is resolved inside this component.
   */
  getFullEntry: (entry: Entry) => Promise<Entry | undefined>;
};

/**
 * Presentational dictionary panel. It owns the orchestration (scope/search/selection state, the
 * search-text filtering, and the "single entry vs. list" derivation) so the app webview and
 * Storybook share the same logic; only the data (props) and the PAPI-backed reads (callbacks)
 * differ between them.
 */
export function Dictionary({
  localizedStrings,
  scrRef = DEFAULT_SCR_REF,
  onSelectOccurrence,
  getEntries,
  getFullEntry,
}: DictionaryProps) {
  const [scope, setScope] = useState<DictionaryScope>('chapter');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(undefined);

  // ref.current expects null and not undefined when we pass it to the search input
  // eslint-disable-next-line no-null/no-null
  const searchInputRef = useRef<HTMLInputElement>(null);
  // ref.current expects null and not undefined when we pass it to the div
  // eslint-disable-next-line no-null/no-null
  const dictionaryEntryRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    dictionaryEntryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Load entries for the current scope/reference (verse reference filtering is done by the
  // data source; only search-text filtering happens here) ---

  const [entriesById, setEntriesById] = useState<LexicalEntriesById | undefined>(undefined);
  const [entriesError, setEntriesError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isActive = true;
    setEntriesById(undefined);
    setEntriesError(undefined);
    const load = async () => {
      const result = await getEntries(scope, scrRef);
      if (!isActive) return;
      if (result.error) {
        setEntriesError(result.error);
        setEntriesById({});
      } else {
        setEntriesById(result.entriesById);
      }
    };
    load().catch(() => {
      if (!isActive) return;
      setEntriesById({});
    });
    return () => {
      isActive = false;
    };
  }, [getEntries, scope, scrRef]);

  // `undefined` means "not yet fetched" so we can show the loading state, matching the original.
  const isLoadingEntriesById = !entriesError && entriesById === undefined;

  // Return all defined entries filtered by searchQuery
  const entriesFiltered = useMemo(() => {
    if (!entriesById) return [];

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

  // Clear the selected entry if it is no longer in the filtered list (e.g. after a chapter change)
  useEffect(() => {
    if (
      selectedEntry &&
      !entriesFiltered.some(
        (e) =>
          e.id === selectedEntry.id &&
          e.lexicalReferenceTextId === selectedEntry.lexicalReferenceTextId,
      )
    ) {
      setSelectedEntry(undefined);
    }
  }, [entriesFiltered, selectedEntry]);

  // Entry displayed in DictionaryEntryDisplay: always the single entry, or whatever is selected in the list
  const displayedEntry = entriesFiltered.length === 1 ? entriesFiltered[0] : selectedEntry;

  // Fetch the full (unfiltered) data for the displayed entry
  const [fullDisplayedEntry, setFullDisplayedEntry] = useState<Entry | undefined>(undefined);

  useEffect(() => {
    if (!displayedEntry) {
      setFullDisplayedEntry(undefined);
      return undefined;
    }
    let isActive = true;
    const load = async () => {
      const entry = await getFullEntry(displayedEntry);
      if (isActive) setFullDisplayedEntry(entry);
    };
    load().catch(() => {
      if (isActive) setFullDisplayedEntry(undefined);
    });
    return () => {
      isActive = false;
    };
  }, [getFullEntry, displayedEntry]);

  const onCharacterPress = useCallback((character: string) => {
    searchInputRef.current?.focus();
    setSearchQuery(character);
  }, []);

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
    <div className="tw:flex tw:flex-col tw:h-[100dvh]">
      <div className="tw:sticky tw:bg-background tw:top-0 tw:z-10 tw:shrink-0 tw:p-2 tw:border-b tw:h-auto">
        <div className="tw:flex tw:items-center tw:gap-2">
          <div className="tw:max-w-56">
            <Select
              value={scope}
              // value is always a string but we need it to be DictionaryScope
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              onValueChange={(value: string) => setScope(value as DictionaryScope)}
            >
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
          <div className="tw:w-full tw:max-w-72">
            <SearchBar
              ref={searchInputRef}
              value={searchQuery}
              onSearch={setSearchQuery}
              placeholder={localizedStrings['%platformLexicalTools_dictionary_searchDictionary%']}
              isFullWidth
            />
          </div>
        </div>
      </div>
      {isLoadingEntriesById && (
        <div className="tw:flex-1 tw:p-2 tw:space-y-4">
          {[...Array(10)].map((_, index) => (
            <Skeleton
              // There are no other unique identifiers for these items
              // eslint-disable-next-line react/no-array-index-key
              key={`dictionary-list-item-skeleton-${index}`}
              className="tw:h-14 tw:w-full"
            />
          ))}
        </div>
      )}
      {entriesError && (
        <div className="tw:m-4 tw:flex tw:items-center tw:gap-2">
          <Label>{localizedStrings['%platformLexicalTools_dictionary_dataLoadError%']}</Label>
          <ErrorPopover errorDetails={entriesError} localizedStrings={localizedStrings}>
            <Button variant="link" className="tw:h-auto tw:p-0">
              {localizedStrings['%settings_errorMessages_viewError%']}
            </Button>
          </ErrorPopover>
        </div>
      )}
      {entriesFiltered.length === 0 && !isLoadingEntriesById && !entriesError && (
        <div className="tw:m-4 tw:flex tw:justify-center">
          <Label>{localizedStrings['%platformLexicalTools_dictionary_noResults%']}</Label>
        </div>
      )}
      {entriesFiltered.length === 1 && (
        <div ref={dictionaryEntryRef} className="tw:overflow-y-auto tw:p-4">
          <DictionaryEntryDisplay
            localizedStrings={localizedStrings}
            scriptureReferenceToFilterBy={scrRef}
            isDrawer={false}
            dictionaryEntry={fullDisplayedEntry ?? entriesFiltered[0]}
            onSelectOccurrence={onSelectOccurrence}
            onClickScrollToTop={scrollToTop}
          />
        </div>
      )}
      {entriesFiltered.length > 1 && (
        <DictionaryList
          localizedStrings={localizedStrings}
          dictionaryData={entriesFiltered}
          scriptureReferenceToFilterBy={scrRef}
          scope={scope}
          selectedEntry={selectedEntry}
          onSelectOccurrence={onSelectOccurrence}
          onCharacterPress={onCharacterPress}
          onEntrySelected={setSelectedEntry}
          fullSelectedEntry={fullDisplayedEntry}
        />
      )}
    </div>
  );
}

export default Dictionary;
