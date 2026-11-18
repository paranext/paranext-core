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
  Sonner,
  sonner,
} from 'platform-bible-react';
import { Entry, LexicalEntriesById } from 'platform-lexical-tools';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import { DictionaryEntryDisplay } from '../components/dictionary/dictionary-entry-display.component';
import {
  DictionaryOccurrenceView,
  DictionaryScope,
  getFormatGlossesStringFromDictionaryEntrySenses,
  isReferenceInScope,
} from '../utils/dictionary.utils';
import { useScopeReference } from '../utils/dictionary-ui.utils';
import { DictionaryList } from '../components/dictionary/dictionary-list.component';

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

function isSameEntry(a: Entry, b: Entry): boolean {
  return a.id === b.id && a.lexicalReferenceTextId === b.lexicalReferenceTextId;
}

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
  /** Retrieve an entry by its lemma, used to open entries linked from definitions. */
  getEntryByLemma: (dictionaryId: string, lemma: string) => Promise<Entry | undefined>;
  /**
   * Whether an entry's senses that do not occur in scope are hidden. It is the reader's choice, so
   * it is kept by the host (the web view keeps it in its state) rather than here, where it would be
   * lost each time the list reloads.
   */
  areLessRelevantSensesHidden: boolean;
  /** Called when the reader hides or shows the less-relevant senses */
  onAreLessRelevantSensesHiddenChange: (areLessRelevantSensesHidden: boolean) => void;
  /** Whether an entry's occurrences are listed for the chapter or all of them; kept by the host */
  occurrenceView: DictionaryOccurrenceView;
  /** Called when the reader switches between the chapter's occurrences and all of them */
  onOccurrenceViewChange: (occurrenceView: DictionaryOccurrenceView) => void;
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
  getEntryByLemma,
  areLessRelevantSensesHidden,
  onAreLessRelevantSensesHiddenChange,
  occurrenceView,
  onOccurrenceViewChange,
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

  // An entry to keep open once the list for the reference the reader is going to has loaded. It is
  // a ref because the list it waits for is loaded by an effect, after the reference changes.
  const pendingSelectionRef = useRef<{ entry: Entry; scrRef: SerializedVerseRef } | undefined>(
    undefined,
  );

  const scrollToTop = () => {
    dictionaryEntryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Load entries for the current scope/reference (verse reference filtering is done by the
  // data source; only search-text filtering happens here) ---

  const [entriesById, setEntriesById] = useState<LexicalEntriesById | undefined>(undefined);
  const [entriesError, setEntriesError] = useState<string | undefined>(undefined);

  // `getEntries`'s selector always reads book+chapterNum but only reads verseNum in `'verse'` scope
  // (see dictionary.web-view.tsx), so verseNum is frozen to a sentinel (0) outside that scope —
  // mirroring legacy-comment-manager's comment-list.web-view.tsx — rather than depending on the
  // whole `scrRef` object, which also changes on every in-chapter verse move and would otherwise
  // needlessly reload the list (and reset the selected entry) on every one of those.
  //
  // Hidden pane: this reacts to scrRef the same whether or not the tab is visible (rc-dock keeps a
  // hidden pane's iframe mounted and running). That is deliberate, not deferred — the reaction is
  // data-driven (a PDP query, not a layout measurement), so it stays correct while hidden and shows
  // the right result the moment the tab is activated. The accepted cost is one query per actual
  // scope/book/chapter change for a tab nobody can currently see; per
  // .claude/rules/cross-view-sync-hidden-views.md this is a documented decision, not an oversight.
  const scopeVerseNum = scope === 'verse' ? scrRef.verseNum : 0;

  useEffect(() => {
    let isActive = true;
    setEntriesById(undefined);
    setEntriesError(undefined);
    // This load ends the wait of an entry that was already waiting when it started, even if it is
    // for another reference, because while an entry is waiting the selection is never cleared. An
    // entry that starts waiting while this load is under way waits for the list after it.
    const pendingSelection = pendingSelectionRef.current;
    const endPendingSelection = () => {
      if (pendingSelectionRef.current === pendingSelection) pendingSelectionRef.current = undefined;
    };
    const load = async () => {
      const result = await getEntries(scope, scrRef);
      if (!isActive) return;
      if (result.error) {
        setEntriesError(result.error);
        setEntriesById({});
      } else {
        setEntriesById(result.entriesById);
      }

      // Keep the entry the reader was looking at open, if it is listed here too
      endPendingSelection();
      if (pendingSelection && isReferenceInScope(pendingSelection.scrRef, scrRef, scope)) {
        setSelectedEntry(
          Object.values(result.entriesById)
            .flat()
            .find((listedEntry) => listedEntry && isSameEntry(listedEntry, pendingSelection.entry)),
        );
      }
    };
    load().catch(() => {
      if (!isActive) return;
      endPendingSelection();
      setEntriesById({});
    });
    return () => {
      isActive = false;
    };
    // `scrRef` itself is intentionally not a dependency — see the comment above `scopeVerseNum`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEntries, scope, scrRef.book, scrRef.chapterNum, scopeVerseNum]);

  // `undefined` means "not yet fetched" so we can show the loading state, matching the original.
  const isLoadingEntriesById = !entriesError && entriesById === undefined;

  // Only what decides the scope, so a verse move within the chapter does not re-read every gloss
  const scopeReference = useScopeReference(scrRef, scope);

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
          getFormatGlossesStringFromDictionaryEntrySenses(entry, scopeReference, scope)
            .toLowerCase()
            .includes(search);
        return matchesSearch;
      });
  }, [entriesById, searchQuery, scopeReference, scope]);

  // Clear the selected entry if it is no longer in the filtered list (e.g. after a chapter change).
  // While a list is loading, or an entry is waiting for the next list, it is not known yet.
  useEffect(() => {
    if (isLoadingEntriesById || pendingSelectionRef.current) return;
    if (selectedEntry && !entriesFiltered.some((e) => isSameEntry(e, selectedEntry)))
      setSelectedEntry(undefined);
  }, [entriesFiltered, selectedEntry, isLoadingEntriesById]);

  /**
   * Goes to an occurrence, keeping `entry` open there if it is listed there too. Used for the
   * occurrences of an entry and the Bible references in its definitions.
   */
  const selectOccurrenceKeepingEntry = useCallback(
    (entry: Entry, scrRefOfOccurrence: SerializedVerseRef) => {
      if (isReferenceInScope(scrRefOfOccurrence, scrRef, scope)) setSelectedEntry(entry);
      // The list for the occurrence has yet to load, so the entry is selected once it has
      else pendingSelectionRef.current = { entry, scrRef: scrRefOfOccurrence };
      onSelectOccurrence(scrRefOfOccurrence);
    },
    [onSelectOccurrence, scrRef, scope],
  );

  // Entry displayed in DictionaryEntryDisplay: always the single entry, or whatever is selected in the list
  const displayedEntry = entriesFiltered.length === 1 ? entriesFiltered[0] : selectedEntry;

  // Fetch the full (unfiltered) data for the displayed entry. Until it arrives, or if it cannot be
  // fetched, the entry is shown with only its senses in scope, and they are not numbered.
  const [fullEntry, setFullEntry] = useState<Entry | undefined>(undefined);
  const fullDisplayedEntry =
    displayedEntry && fullEntry && isSameEntry(fullEntry, displayedEntry) ? fullEntry : undefined;

  useEffect(() => {
    if (!displayedEntry) {
      setFullEntry(undefined);
      return undefined;
    }
    let isActive = true;
    const load = async () => {
      const entry = await getFullEntry(displayedEntry);
      if (isActive) setFullEntry(entry);
    };
    load().catch(() => {
      if (isActive) setFullEntry(undefined);
    });
    return () => {
      isActive = false;
    };
  }, [getFullEntry, displayedEntry]);

  // An entry opened from a definition link. It is kept apart from `selectedEntry` because it is
  // often outside the current scope, and `selectedEntry` is cleared when it leaves the list.
  const [linkedEntry, setLinkedEntry] = useState<Entry | undefined>(undefined);

  useEffect(() => {
    setLinkedEntry(undefined);
  }, [scope, scrRef.book, scrRef.chapterNum]);

  useEffect(() => {
    if (linkedEntry) dictionaryEntryRef.current?.scrollTo({ top: 0 });
  }, [linkedEntry]);

  const handleEntryLinkClick = useCallback(
    async (dictionaryId: string, lemma: string) => {
      // An empty lemma would look up every entry in the dictionary
      if (!lemma) return false;
      const entry = await getEntryByLemma(dictionaryId, lemma);
      if (entry) setLinkedEntry(entry);
      else
        sonner(
          formatReplacementString(
            localizedStrings['%platformLexicalTools_dictionary_entryNotFound%'],
            { lemma },
          ),
        );
      return !!entry;
    },
    [getEntryByLemma, localizedStrings],
  );

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

  if (linkedEntry)
    return (
      <div ref={dictionaryEntryRef} className="tw:h-[100dvh] tw:overflow-y-auto tw:p-4">
        <Sonner />
        <DictionaryEntryDisplay
          localizedStrings={localizedStrings}
          isDrawer={false}
          dictionaryEntry={linkedEntry}
          scriptureReferenceToFilterBy={scrRef}
          scope={scope}
          areLessRelevantSensesHidden={areLessRelevantSensesHidden}
          onAreLessRelevantSensesHiddenChange={onAreLessRelevantSensesHiddenChange}
          occurrenceView={occurrenceView}
          onOccurrenceViewChange={onOccurrenceViewChange}
          handleBackToListButton={() => setLinkedEntry(undefined)}
          onSelectOccurrence={(scrRefOfOccurrence) => {
            setLinkedEntry(undefined);
            selectOccurrenceKeepingEntry(linkedEntry, scrRefOfOccurrence);
          }}
          onClickScrollToTop={scrollToTop}
          onEntryLinkClick={handleEntryLinkClick}
        />
      </div>
    );

  return (
    <div className="tw:flex tw:flex-col tw:h-[100dvh]">
      <Sonner />
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
            scope={scope}
            isDrawer={false}
            dictionaryEntry={fullDisplayedEntry ?? entriesFiltered[0]}
            hasAllSenses={!!fullDisplayedEntry}
            areLessRelevantSensesHidden={areLessRelevantSensesHidden}
            onAreLessRelevantSensesHiddenChange={onAreLessRelevantSensesHiddenChange}
            occurrenceView={occurrenceView}
            onOccurrenceViewChange={onOccurrenceViewChange}
            onSelectOccurrence={(scrRefOfOccurrence) =>
              selectOccurrenceKeepingEntry(entriesFiltered[0], scrRefOfOccurrence)
            }
            onClickScrollToTop={scrollToTop}
            onEntryLinkClick={handleEntryLinkClick}
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
          onSelectOccurrence={(scrRefOfOccurrence) =>
            selectedEntry
              ? selectOccurrenceKeepingEntry(selectedEntry, scrRefOfOccurrence)
              : onSelectOccurrence(scrRefOfOccurrence)
          }
          onCharacterPress={onCharacterPress}
          onEntrySelected={setSelectedEntry}
          fullSelectedEntry={fullDisplayedEntry}
          areLessRelevantSensesHidden={areLessRelevantSensesHidden}
          onAreLessRelevantSensesHiddenChange={onAreLessRelevantSensesHiddenChange}
          occurrenceView={occurrenceView}
          onOccurrenceViewChange={onOccurrenceViewChange}
          onEntryLinkClick={handleEntryLinkClick}
        />
      )}
    </div>
  );
}

export default Dictionary;
