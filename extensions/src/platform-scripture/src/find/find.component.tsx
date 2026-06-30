import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Replace,
  ReplaceAll,
  TextSearch,
  X,
} from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RecentSearches,
  Scope,
  SCOPE_SELECTOR_STRING_KEYS,
  ScopeSelector,
  Skeleton,
  Sonner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ScopeWithRange } from 'platform-bible-react/experimental';
import {
  formatReplacementString,
  LanguageStrings,
  LocalizedStringValue,
} from 'platform-bible-utils';
import { FindJobStatus, WordRestriction } from 'platform-scripture';
import React, { useCallback, useMemo, useRef } from 'react';
import { FindFilters } from './find-filters.component';
import { LocalizedBookData, SearchTextType } from './find-types';
import {
  FindLogger,
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './search-result.component';
import { SearchResultsInBook } from './search-results-in-book.component';

/** Localization keys used by the {@link Find} component itself (excludes child component keys). */
export const FIND_LOCALIZED_STRING_KEYS = [
  '%general_countOfTotal%',
  '%webView_find_allText%',
  '%webView_find_allText_tooltip%',
  '%webView_find_allowRegex%',
  '%webView_find_cancelSearch%',
  '%webView_find_capitalization%',
  '%webView_find_errorOccurred%',
  '%webView_find_findTab%',
  '%webView_find_matchCase%',
  '%webView_find_matchContentIn%',
  '%webView_find_nextResult%',
  '%webView_find_noResultsFound%',
  '%webView_find_pattern%',
  '%webView_find_preserveCase%',
  '%webView_find_preserveCase_tooltip%',
  '%webView_find_previousResult%',
  '%webView_find_recent%',
  '%webView_find_replace%',
  '%webView_find_replaceAll%',
  '%webView_find_replaceTab%',
  '%webView_find_replaceTerm_placeholder%',
  '%webView_find_replace_structureProtectedError%',
  '%webView_find_replace_structureProtectedMarkerTooltip%',
  '%webView_find_replace_structureProtectedNote%',
  '%webView_find_restrictions%',
  '%webView_find_restrictions_endOfWord%',
  '%webView_find_restrictions_none%',
  '%webView_find_restrictions_startOfWord%',
  '%webView_find_restrictions_wholeWord%',
  '%webView_find_result%',
  '%webView_find_searchPlaceholder%',
  '%webView_find_showing%',
  '%webView_find_showingResults%',
  '%webView_find_showingResultsOfMore%',
  '%webView_find_showRecentSearches%',
  '%webView_find_toggleFilters%',
  '%webView_find_verseTextOnly%',
] as const;

/**
 * A search result paired with its index in the complete (ungrouped) results array, as produced by
 * grouping the results by book.
 */
export type BookResultEntry = { result: HidableFindResult; originalIndex: number };

/** Props for the {@link Find} presentational component. */
export type FindProps = {
  /** Localized strings for the find/replace UI; resolve via {@link FIND_LOCALIZED_STRING_KEYS}. */
  localizedStrings: LanguageStrings;
  /** Localized strings for the {@link ScopeSelector}; resolve via `SCOPE_SELECTOR_STRING_KEYS`. */
  scopeSelectorLocalizedStrings: LanguageStrings;
  /**
   * Localized strings for the search-result cards; resolve via
   * `SEARCH_RESULT_LOCALIZED_STRING_KEYS`.
   */
  searchResultLocalizedStrings: {
    [localizedKey in (typeof SEARCH_RESULT_LOCALIZED_STRING_KEYS)[number]]?: LocalizedStringValue;
  };

  // Search/replace input + filter state
  /** The current search term. */
  searchTerm: string;
  /** Recent search terms shown in the recent-searches dropdown. */
  recentSearches: string[];
  /** The currently selected scope (chapter/book/selectedBooks). */
  scope: Scope;
  /** The current scroll-group verse ref, used to label the chapter/book scope (e.g. "Genesis 1"). */
  verseRef: SerializedVerseRef;
  /** The string of present books (from the `booksPresent` project setting) for the scope selector. */
  booksPresent: string;
  /** Ids of the books selected for the `selectedBooks` scope. */
  selectedBookIds: string[];
  /** Map of available book ids to their localized display names. */
  localizedBookData: Map<string, LocalizedBookData>;
  /** Whether to match case in the search. */
  shouldMatchCase: boolean;
  /** Which text to match (all text / verse text only). */
  searchTextType: SearchTextType;
  /** The word-boundary restriction for matches. */
  wordRestriction: WordRestriction;
  /** Whether the search string is treated as a regular expression. */
  isRegexAllowed: boolean;

  // Mode + replace state
  /** Whether the UI is in find or replace mode. */
  activeMode: 'find' | 'replace';
  /** The replacement term entered in replace mode. */
  replaceTerm: string;
  /** Whether to preserve the case of the matched text when replacing. */
  preserveCase: boolean;
  /** True while a replace operation (and its mandatory re-find) is executing. */
  isReplacing: boolean;
  /** Whether the project's structure is currently protected (replace restrictions apply). */
  isStructureProtected?: boolean;
  /**
   * Whether the current replacement text itself contains a paragraph/verse marker — guaranteed to
   * be rejected while protected, so Replace is proactively disabled.
   */
  isReplacementStructureChanging?: boolean;

  // Results state
  /** All current search results (including hidden/replaced ones). */
  results: HidableFindResult[];
  /** Search results grouped by book id, each paired with its original index. */
  resultsByBook: Map<string, BookResultEntry[]>;
  /** The index (into `results`) of the focused result, or `undefined`. */
  focusedResultIndex: number | undefined;
  /** The current find-job status, or `undefined` when no search has run. */
  searchStatus: FindJobStatus | undefined;
  /** The find-job error message, if the status is `errored`. */
  searchError: string | undefined;
  /** Percent complete of the running search (0-100). */
  searchProgress: number;
  /** Total number of results the job reports (may exceed loaded results). */
  totalNumberOfResults: number;
  /** Number of results the user has hidden/dismissed. */
  numberOfHiddenResults: number;
  /**
   * Whether the current search was auto-triggered after a replace. Used to suppress the progress
   * bar for that housekeeping search.
   */
  isPostReplaceSearch: boolean;

  // Action callbacks
  /** Called when the search term changes. */
  onSearchTermChange: (term: string) => void;
  /** Called to start a search. `isExplicitSearch` is true for Enter/Find-button-initiated searches. */
  onStartSearch: (isExplicitSearch?: boolean) => void;
  /** Called to stop the current search. `shouldClearResults` clears results and resets state. */
  onStopSearch: (shouldClearResults?: boolean) => void;
  /** Called when the user changes the scope. */
  setScope: (scope: Scope) => void;
  /** Called when the selected books for the `selectedBooks` scope change. */
  onSelectedBookIdsChange: (bookIds: string[]) => void;
  /** Called when the match-content-in (text type) filter changes. */
  setSearchTextType: (value: SearchTextType) => void;
  /** Called when the word-restriction filter changes. */
  setWordRestriction: (value: WordRestriction) => void;
  /** Called when the match-case filter changes. */
  setShouldMatchCase: (value: boolean) => void;
  /** Called when the allow-regex filter changes. */
  setIsRegexAllowed: (value: boolean) => void;
  /** Called when the user toggles find/replace mode. */
  onToggleMode: (mode: 'find' | 'replace') => void;
  /** Called when the replacement term changes. */
  onReplaceTermChange: (term: string) => void;
  /** Called when the preserve-case checkbox changes. */
  onPreserveCaseChange: (value: boolean) => void;
  /** Called when the user focuses a result (by clicking or keyboard navigation). */
  onFocusedResultChange: (searchResult: HidableFindResult, index: number) => void;
  /** Called when the user hides/dismisses a result, by its original index. */
  onHideResult: (index: number) => void;
  /** Called when the user replaces a single result, by its original index (defaults to focused). */
  onReplace: (resultIndex?: number) => void;
  /** Called when the user replaces all visible results. */
  onReplaceAll: () => void;
  /** Called to cancel/revert the pending replace operation. */
  onCancelReplace: () => void;
  /** Called when the results container scrolls (drives progressive loading). */
  onResultsScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  /** Retrieves the USJ for a book so each result's verse context can be computed. */
  getBookUsj: (bookId: string) => Promise<Usj | undefined>;
  /**
   * Optional logger for unexpected USJ load/parse failures while building verse context. The
   * webview supplies the PAPI logger; stories may omit it. The component stays `@papi`-free.
   */
  logger?: FindLogger;
};

/**
 * Presentational find/replace UI. It owns the rendering and the presentational derivations (visible
 * results, focused-result navigation, scope display text, results message) but no async logic. The
 * container (webview or story) owns the find-job lifecycle, replace/revert, version-history
 * commits, and editor navigation, passing data in as props and operations in as callbacks.
 */
export function Find({
  localizedStrings,
  scopeSelectorLocalizedStrings,
  searchResultLocalizedStrings,
  searchTerm,
  recentSearches,
  scope,
  verseRef,
  booksPresent,
  selectedBookIds,
  localizedBookData,
  shouldMatchCase,
  searchTextType,
  wordRestriction,
  isRegexAllowed,
  activeMode,
  replaceTerm,
  preserveCase,
  isReplacing,
  isStructureProtected = false,
  isReplacementStructureChanging = false,
  results,
  resultsByBook,
  focusedResultIndex,
  searchStatus,
  searchError,
  searchProgress,
  totalNumberOfResults,
  numberOfHiddenResults,
  isPostReplaceSearch,
  onSearchTermChange,
  onStartSearch,
  onStopSearch,
  setScope,
  onSelectedBookIdsChange,
  setSearchTextType,
  setWordRestriction,
  setShouldMatchCase,
  setIsRegexAllowed,
  onToggleMode,
  onReplaceTermChange,
  onPreserveCaseChange,
  onFocusedResultChange,
  onHideResult,
  onReplace,
  onReplaceAll,
  onCancelReplace,
  onResultsScroll,
  getBookUsj,
  logger,
}: FindProps) {
  // useRef requires null as the initial value when used with a DOM element ref
  // eslint-disable-next-line no-null/no-null
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const areFiltersActive =
    shouldMatchCase || wordRestriction !== 'none' || searchTextType !== 'all' || isRegexAllowed;

  const visibleResults = useMemo(
    () =>
      results
        .map((result, index) => ({ result, originalIndex: index }))
        .filter(({ result }) => !result.isHidden),
    [results],
  );

  const focusedVisibleIndex = useMemo(
    () =>
      focusedResultIndex === undefined
        ? -1
        : visibleResults.findIndex((vr) => vr.originalIndex === focusedResultIndex),
    [visibleResults, focusedResultIndex],
  );

  const handlePreviousResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedVisibleIndex <= 0) {
      // No result focused (index -1) or already at first → wrap to last
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const last = visibleResults.at(-1)!;
      onFocusedResultChange(last.result, last.originalIndex);
      return;
    }
    const prev = visibleResults[focusedVisibleIndex - 1];
    onFocusedResultChange(prev.result, prev.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange]);

  const handleNextResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedVisibleIndex >= visibleResults.length - 1) {
      // Already at last result → wrap to first
      onFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
      return;
    }
    const next = visibleResults[focusedVisibleIndex + 1];
    onFocusedResultChange(next.result, next.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange]);

  const handleFirstResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    onFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
  }, [visibleResults, onFocusedResultChange]);

  const handleLastResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    // `at(-1)` returns `undefined` only on an empty array; the early return above guarantees
    // that the array is non-empty
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const last = visibleResults.at(-1)!;
    onFocusedResultChange(last.result, last.originalIndex);
  }, [visibleResults, onFocusedResultChange]);

  const getPageSize = useCallback(() => {
    const container = resultsContainerRef.current;
    if (!container) return 1;
    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll<HTMLElement>('[role="button"]:not([hidden])');
    const count = Array.from(cards).filter((card) => {
      const rect = card.getBoundingClientRect();
      return rect.bottom > containerRect.top && rect.top < containerRect.bottom;
    }).length;
    return Math.max(1, count);
  }, []);

  const handlePageUpResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    const pageSize = getPageSize();
    const currentIndex = Math.max(0, focusedVisibleIndex);
    const newIndex = Math.max(0, currentIndex - pageSize);
    const target = visibleResults[newIndex];
    onFocusedResultChange(target.result, target.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange, getPageSize]);

  const handlePageDownResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    const pageSize = getPageSize();
    const currentIndex = Math.max(0, focusedVisibleIndex);
    const newIndex = Math.min(visibleResults.length - 1, currentIndex + pageSize);
    const target = visibleResults[newIndex];
    onFocusedResultChange(target.result, target.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange, getPageSize]);

  const handleResultsKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handlePreviousResult();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleNextResult();
          break;
        case 'Home':
          e.preventDefault();
          handleFirstResult();
          break;
        case 'End':
          e.preventDefault();
          handleLastResult();
          break;
        case 'PageUp':
          e.preventDefault();
          handlePageUpResult();
          break;
        case 'PageDown':
          e.preventDefault();
          handlePageDownResult();
          break;
        default:
          break;
      }
    },
    [
      handlePreviousResult,
      handleNextResult,
      handleFirstResult,
      handleLastResult,
      handlePageUpResult,
      handlePageDownResult,
    ],
  );

  const resultsMessage = useMemo(() => {
    if (!results) return '';
    if (results.length === 0) {
      return localizedStrings['%webView_find_noResultsFound%'];
    }
    const l10nKey =
      searchStatus === 'exceeded'
        ? '%webView_find_showingResultsOfMore%'
        : (numberOfHiddenResults > 0 && '%webView_find_showingResults%') || '%webView_find_result%';

    return formatReplacementString(localizedStrings[l10nKey], {
      visibleNumber: (results.length - numberOfHiddenResults).toString(),
      totalNumber: totalNumberOfResults.toString(),
    });
  }, [results, numberOfHiddenResults, totalNumberOfResults, searchStatus, localizedStrings]);

  /** Text shown in the scope popover trigger, e.g. "Genesis 1" or "Genesis, Exodus, John" */
  const scopeDisplayText = useMemo(() => {
    switch (scope) {
      case 'chapter': {
        const bookName = localizedBookData.get(verseRef.book)?.localizedId ?? verseRef.book;
        return `${bookName} ${verseRef.chapterNum}`;
      }
      case 'book':
        return localizedBookData.get(verseRef.book)?.localizedId ?? verseRef.book;
      case 'selectedBooks':
        if (selectedBookIds.length === 0) return '…';
        return selectedBookIds.map((id) => localizedBookData.get(id)?.localizedId ?? id).join(', ');
      default:
        return '';
    }
  }, [scope, selectedBookIds, verseRef, localizedBookData]);

  return (
    <div className="pr-twp tw:mx-auto tw:flex tw:flex-col tw:gap-4 tw:p-4 tw:min-w-[10rem] tw:max-h-screen">
      {/* Header with searchbar and filters */}
      <div className="tw:space-y-3">
        {/* Find/Replace mode toggle */}
        <ToggleGroup
          type="single"
          value={activeMode}
          onValueChange={(value) => {
            if (value === 'find' || value === 'replace') onToggleMode(value);
          }}
          className="tw:w-fit tw:rounded-lg tw:bg-muted tw:p-1"
        >
          <ToggleGroupItem
            value="find"
            className="tw:data-[state=on]:!bg-background tw:data-[state=on]:!text-foreground tw:data-[state=on]:shadow-sm tw:data-[state=off]:text-muted-foreground"
          >
            {localizedStrings['%webView_find_findTab%']}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="replace"
            className="tw:data-[state=on]:!bg-background tw:data-[state=on]:!text-foreground tw:data-[state=on]:shadow-sm tw:data-[state=off]:text-muted-foreground"
          >
            {localizedStrings['%webView_find_replaceTab%']}
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Find input row */}
        <div className="tw:flex tw:gap-2 tw:flex-wrap">
          <div className="tw:relative tw:flex-1">
            <TextSearch className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
            <Input
              id="search-term"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onStartSearch(true);
                }
              }}
              placeholder={localizedStrings['%webView_find_searchPlaceholder%']}
              className={`tw:w-full tw:min-w-16 tw:text-ellipsis tw:!pl-8 scripture-font ${searchTerm ? 'tw:!pe-8' : 'tw:!pr-4'}`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  onSearchTermChange('');
                  onStopSearch(true);
                }}
                className="tw:absolute tw:end-2 tw:top-1/2 tw:-translate-y-1/2 tw:text-muted-foreground tw:hover:text-foreground tw:bg-transparent tw:border-0 tw:p-0 tw:cursor-pointer"
              >
                <X className="tw:h-4 tw:w-4" />
              </button>
            )}
          </div>
          <RecentSearches
            classNameForItems="scripture-font"
            recentSearches={recentSearches}
            onSearchItemSelect={onSearchTermChange}
            ariaLabel={localizedStrings['%webView_find_showRecentSearches%']}
            groupHeading={localizedStrings['%webView_find_recent%']}
            buttonClassName="tw:h-10 tw:w-10"
            buttonVariant="outline"
          />

          <FindFilters
            areFiltersActive={areFiltersActive}
            searchTextType={searchTextType}
            setSearchTextType={setSearchTextType}
            wordRestriction={wordRestriction}
            setWordRestriction={setWordRestriction}
            shouldMatchCase={shouldMatchCase}
            setShouldMatchCase={setShouldMatchCase}
            isRegexAllowed={isRegexAllowed}
            setIsRegexAllowed={setIsRegexAllowed}
            localizedStrings={{
              toggleFilters: localizedStrings['%webView_find_toggleFilters%'],
              matchContentIn: localizedStrings['%webView_find_matchContentIn%'],
              allText: localizedStrings['%webView_find_allText%'],
              allTextTooltip: localizedStrings['%webView_find_allText_tooltip%'],
              verseTextOnly: localizedStrings['%webView_find_verseTextOnly%'],
              restrictions: localizedStrings['%webView_find_restrictions%'],
              restrictionNone: localizedStrings['%webView_find_restrictions_none%'],
              restrictionWholeWord: localizedStrings['%webView_find_restrictions_wholeWord%'],
              restrictionStartOfWord: localizedStrings['%webView_find_restrictions_startOfWord%'],
              restrictionEndOfWord: localizedStrings['%webView_find_restrictions_endOfWord%'],
              capitalization: localizedStrings['%webView_find_capitalization%'],
              matchCase: localizedStrings['%webView_find_matchCase%'],
              pattern: localizedStrings['%webView_find_pattern%'],
              allowRegex: localizedStrings['%webView_find_allowRegex%'],
            }}
          />
        </div>

        {/* Replace input row — shown in Replace mode */}
        {activeMode === 'replace' && (
          <>
            <div className="tw:relative tw:flex-1">
              <ArrowRight className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
              <Input
                id="replace-term"
                value={replaceTerm}
                onChange={(e) => onReplaceTermChange(e.target.value)}
                placeholder={localizedStrings['%webView_find_replaceTerm_placeholder%']}
                className="tw:w-full tw:min-w-16 tw:!pl-8 tw:!pr-4 scripture-font"
              />
            </div>
            {isStructureProtected && (
              <p className="tw:text-xs tw:text-muted-foreground">
                {localizedStrings['%webView_find_replace_structureProtectedNote%']}
              </p>
            )}
            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:flex-wrap">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Checkbox
                  id="preserve-case"
                  checked={preserveCase}
                  onCheckedChange={(checked) => onPreserveCaseChange(checked === true)}
                />
                <Label htmlFor="preserve-case" className="tw:cursor-pointer">
                  {localizedStrings['%webView_find_preserveCase%']}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="tw:h-3.5 tw:w-3.5 tw:text-muted-foreground tw:cursor-default" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="tw:max-w-xs tw:whitespace-pre-line">
                        {localizedStrings['%webView_find_preserveCase_tooltip%']}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* When the buttons are disabled for structure protection they are not focusable,
                        so make the wrapper focusable and named while disabled to keep the explanatory
                        tooltip reachable for keyboard and screen-reader users. */}
                    <div
                      className="tw:flex tw:gap-2"
                      role={
                        isStructureProtected && isReplacementStructureChanging ? 'group' : undefined
                      }
                      // Disabled buttons cannot host their own tooltip; the wrapper must be focusable to surface the structure-protection explanation to keyboard and screen-reader users
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                      tabIndex={
                        isStructureProtected && isReplacementStructureChanging ? 0 : undefined
                      }
                      aria-label={
                        isStructureProtected && isReplacementStructureChanging
                          ? localizedStrings[
                              '%webView_find_replace_structureProtectedMarkerTooltip%'
                            ]
                          : undefined
                      }
                    >
                      <Button
                        variant="outline"
                        onClick={onReplaceAll}
                        disabled={
                          visibleResults.length === 0 ||
                          searchStatus === 'running' ||
                          isReplacing ||
                          (isStructureProtected && isReplacementStructureChanging)
                        }
                      >
                        <ReplaceAll className="tw:h-4 tw:w-4" />
                        {localizedStrings['%webView_find_replaceAll%']}
                      </Button>
                      <Button
                        onClick={() => onReplace()}
                        disabled={
                          focusedResultIndex === undefined ||
                          searchStatus === 'running' ||
                          isReplacing ||
                          (isStructureProtected && isReplacementStructureChanging)
                        }
                      >
                        <Replace className="tw:h-4 tw:w-4" />
                        {localizedStrings['%webView_find_replace%']}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {isStructureProtected && isReplacementStructureChanging && (
                    <TooltipContent>
                      <p className="tw:max-w-xs tw:whitespace-pre-line">
                        {localizedStrings['%webView_find_replace_structureProtectedMarkerTooltip%']}
                      </p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        )}

        {/* Scope selector row */}
        <div className="tw:flex tw:items-center tw:justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="tw:h-auto tw:gap-1 tw:px-2 tw:py-1 tw:font-normal"
              >
                <span className="tw:text-sm tw:text-muted-foreground">
                  {localizedStrings['%webView_find_showing%']}
                </span>
                <span className="tw:text-sm tw:font-medium">{scopeDisplayText}</span>
                <ChevronDown className="tw:h-3 tw:w-3 tw:text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="tw:w-auto tw:p-3">
              <ScopeSelector
                scope={scope}
                availableScopes={['chapter', 'book', 'selectedBooks']}
                // ScopeSelector's onScopeChange takes the wider ScopeWithRange (the
                // markers-checklist work added a 'range' scope). Find never enables
                // 'range' (not in availableScopes), so this narrowing wrapper just
                // guards that contract before forwarding to the narrow setScope.
                onScopeChange={(newScope: ScopeWithRange) => {
                  if (newScope === 'range') return;
                  setScope(newScope);
                }}
                availableBookInfo={booksPresent}
                selectedBookIds={selectedBookIds}
                onSelectedBookIdsChange={onSelectedBookIdsChange}
                localizedStrings={scopeSelectorLocalizedStrings}
                localizedBookNames={localizedBookData}
              />
            </PopoverContent>
          </Popover>
          {visibleResults.length > 0 && (
            <div className="tw:flex tw:items-center tw:gap-1">
              <span className="tw:text-sm tw:text-muted-foreground tw:tabular-nums">
                {formatReplacementString(localizedStrings['%general_countOfTotal%'], {
                  count: focusedVisibleIndex >= 0 ? String(focusedVisibleIndex + 1) : '–',
                  total: String(visibleResults.length),
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="tw:h-7 tw:w-7"
                disabled={visibleResults.length === 0}
                onClick={handlePreviousResult}
                aria-label={localizedStrings['%webView_find_previousResult%']}
              >
                <ChevronUp className="tw:h-4 tw:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="tw:h-7 tw:w-7"
                disabled={visibleResults.length === 0}
                onClick={handleNextResult}
                aria-label={localizedStrings['%webView_find_nextResult%']}
              >
                <ChevronDown className="tw:h-4 tw:w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Placeholder */}
      {results && results.length === 0 && searchStatus === 'running' && (
        <div className="tw:space-y-2">
          {Array.from({ length: 5 }).map((_value, index) => (
            // As this is a placeholder, it is safe to use the index as a key
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index}>
              <CardContent className="tw:flex tw:items-center tw:space-x-4 tw:p-4">
                <div className="tw:space-y-2">
                  <Skeleton className="tw:h-4 tw:w-[250px]" />
                  <Skeleton className="tw:h-4 tw:w-[200px]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search Results */}
      {/* This div is a scroll container that handles keyboard navigation (arrow keys) between search
          results. It needs onKeyDown for result navigation and onScroll for progressive loading, but
          it has no single semantic ARIA role (it's not a listbox, grid, etc.) that would satisfy the
          rule without being misleading. The child result rows are the interactive elements. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={resultsContainerRef}
        className="tw:min-h-48 tw:flex-1 tw:space-y-2 tw:overflow-y-auto tw:pe-2"
        // This div is a keyboard-navigable scroll container; tabIndex is required to receive focus for arrow-key navigation between results
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onScroll={onResultsScroll}
        onKeyDown={handleResultsKeyDown}
      >
        {(() => {
          // Only the first book that has a replaced result gets the cancel handler.
          // All replaced rows share one pending operation, so only one Cancel button
          // should appear to avoid implying per-row granularity.
          let cancelHandlerAssigned = false;
          return [...resultsByBook.entries()].map(([bookId, bookResults]) => {
            const bookHasReplaced = bookResults.some(({ result }) => result.isReplaced);
            const cancelReplace =
              !cancelHandlerAssigned && bookHasReplaced ? onCancelReplace : undefined;
            if (cancelReplace) cancelHandlerAssigned = true;
            return (
              <SearchResultsInBook
                key={bookId}
                getBookUsj={getBookUsj}
                bookId={bookId}
                results={bookResults.map(({ result }) => result)}
                localizedBookData={localizedBookData}
                focusedResultIndex={bookResults.findIndex(
                  ({ originalIndex }) => originalIndex === focusedResultIndex,
                )}
                onResultClick={(result, indexInBookResults) =>
                  onFocusedResultChange(result, bookResults[indexInBookResults].originalIndex)
                }
                onHideResult={(indexInBookResults) =>
                  onHideResult(bookResults[indexInBookResults].originalIndex)
                }
                onReplace={(indexInBookResults) =>
                  onReplace(bookResults[indexInBookResults].originalIndex)
                }
                onCancelReplace={cancelReplace}
                localizedStrings={searchResultLocalizedStrings}
                isReplaceMode={activeMode === 'replace'}
                isReplacing={isReplacing}
                logger={logger}
              />
            );
          });
        })()}
      </div>

      {/* Status bar */}
      {searchStatus && (
        <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:border-t tw:pt-4">
          {searchStatus === 'running' && (activeMode !== 'replace' || !isPostReplaceSearch) && (
            <div className="tw:flex tw:items-center tw:gap-4">
              <Progress value={searchProgress} className="tw:w-64" />
              <Button onClick={() => onStopSearch(false)}>
                {localizedStrings['%webView_find_cancelSearch%']}
              </Button>
            </div>
          )}
          {(searchStatus === 'completed' ||
            searchStatus === 'stopped' ||
            searchStatus === 'exceeded') &&
            results && <p className="tw:font-light tw:text-center">{resultsMessage}</p>}
          {searchStatus === 'errored' && searchError && (
            <p className="tw:font-light tw:text-center">
              {formatReplacementString(localizedStrings['%webView_find_errorOccurred%'], {
                error: searchError,
              })}
            </p>
          )}
        </div>
      )}
      <Sonner />
    </div>
  );
}

export default Find;

// Re-export the scope-selector key constant so the webview/story can resolve those strings.
export { SCOPE_SELECTOR_STRING_KEYS };
