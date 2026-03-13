import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
  useWebViewController,
} from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
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
  Spinner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useRecentSearches,
} from 'platform-bible-react';
import {
  formatReplacementString,
  getErrorMessage,
  groupBy,
  isPlatformError,
  LocalizeKey,
  Mutex,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import {
  FindJobStatus,
  FindJobStatusReport,
  FindOptions,
  FindScope,
  WordRestriction,
} from 'platform-scripture';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FindFilters } from './find/find-filters.component';
import { LocalizedBookData, SearchTextType } from './find/find-types';
import {
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './find/search-result.component';
import { SearchResultsInBook } from './find/search-results-in-book.component';

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_find_allowRegex%',
  '%webView_find_cancelSearch%',
  '%webView_find_errorOccurred%',
  '%webView_find_findButton%',
  '%webView_find_findInProject%',
  '%webView_find_matchCase%',
  '%webView_find_noResultsFound%',
  '%webView_find_scopeSummary_format%',
  '%webView_find_showRecentSearches%',
  '%webView_find_recent%',
  '%webView_find_scopeUndetermined%',
  '%webView_find_searchPlaceholder%',
  '%webView_find_result%',
  '%webView_find_showingResults%',
  '%webView_find_showingResultsOfMore%',
  '%webView_find_toggleFilters%',
  '%webView_find_matchContentIn%',
  '%webView_find_allText%',
  '%webView_find_allText_tooltip%',
  '%webView_find_verseTextOnly%',
  '%webView_find_restrictions%',
  '%webView_find_restrictions_none%',
  '%webView_find_restrictions_wholeWord%',
  '%webView_find_restrictions_startOfWord%',
  '%webView_find_restrictions_endOfWord%',
  '%webView_find_findTab%',
  '%webView_find_replaceTab%',
  '%webView_find_replace%',
  '%webView_find_replaceAll%',
  '%webView_find_preserveCase%',
  '%webView_find_preserveCase_tooltip%',
  '%webView_find_replaceTerm_placeholder%',
  '%webView_find_capitalization%',
  '%webView_find_pattern%',
  '%webView_find_showing%',
  '%webView_find_resultNavigation%',
  '%webView_find_previousResult%',
  '%webView_find_nextResult%',
];

const defaultBooksPresent: string = '';
const defaultProjectName = '';
const findPdpMutex = new Mutex();
const RESULTS_BATCH_SIZE = 100;
const SEARCH_DEBOUNCE_DELAY_MS = 500;

/**
 * Applies preserve-case transformation to the replacement text based on the casing of the matched
 * text:
 *
 * - ALL CAPS match → ALL CAPS replacement
 * - Title Case match (first letter capital) → Title Case replacement
 * - Otherwise → replacement as-is
 */
function applyPreserveCase(matchedText: string, replacementText: string): string {
  if (!replacementText || !matchedText) return replacementText;
  if (matchedText === matchedText.toUpperCase() && matchedText !== matchedText.toLowerCase()) {
    return replacementText.toUpperCase();
  }
  if (
    matchedText[0] === matchedText[0].toUpperCase() &&
    matchedText[0] !== matchedText[0].toLowerCase()
  ) {
    return replacementText[0].toUpperCase() + replacementText.slice(1);
  }
  return replacementText;
}

global.webViewComponent = function FindWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [searchTerm, setSearchTerm] = useWebViewState<string>('findSearchTerm', '');
  const [scope, setScope] = useWebViewState<Scope>('findScope', 'book');
  // These three state variables exist solely for the change-detection feature (booksToMonitor /
  // external change detection effect). They are not used for scope display text or
  // query-changed detection.
  const [monitoredScope, setMonitoredScope] = useState<Scope | undefined>();
  const [monitoredVerseRef, setMonitoredVerseRef] = useState<SerializedVerseRef | undefined>(
    undefined,
  );

  const [recentSearches, setRecentSearches] = useWebViewState<string[]>('findRecentSearches', []);

  const addRecentSearchItem = useRecentSearches(recentSearches, setRecentSearches);

  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
    'findSelectedBookIds',
    [],
  );
  const [monitoredBookIds, setMonitoredBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useWebViewState<boolean>(
    'findShouldMatchCase',
    false,
  );
  const [searchTextType, setSearchTextType] = useWebViewState<SearchTextType>(
    'findSearchTextType',
    'all',
  );
  const [wordRestriction, setWordRestriction] = useWebViewState<WordRestriction>(
    'findWordRestriction',
    'none',
  );
  const [isRegexAllowed, setIsRegexAllowed] = useWebViewState<boolean>('findIsRegexAllowed', false);

  const [activeMode, setActiveMode] = useWebViewState<'find' | 'replace'>('findActiveMode', 'find');
  const [replaceTerm, setReplaceTerm] = useWebViewState<string>('findReplaceTerm', '');
  const [preserveCase, setPreserveCase] = useWebViewState<boolean>('findPreserveCase', false);
  /**
   * True while a replace operation is executing (including the mandatory re-find afterward). Keeps
   * replace buttons disabled during the gap between replace() completing and searchStatus becoming
   * 'running', preventing the user from replacing with already-stale positions.
   */
  const [isReplacing, setIsReplacing] = useState(false);

  const [activeJobId, setActiveJobId] = useState<string>();
  const [searchProgress, setSearchProgress] = useState<number>(0);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);
  const [searchError, setSearchError] = useState<string | undefined>();

  const [results, setResults] = useState<HidableFindResult[]>([]);
  const loadedResultsLengthRef = useRef(0);
  const [numberOfHiddenResults, setNumberOfHiddenResults] = useState<number>(0);
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);

  /**
   * Search results grouped by book. Keys are book IDs and values are search results in that book
   * and their index in the original search results array
   */
  const resultsByBook = useMemo(() => {
    return groupBy(
      results,
      (result) => result.start.verseRef.book,
      (result, _key, index) => ({ result, originalIndex: index }),
    );
  }, [results]);

  const [verseRefSetting, setVerseRefSetting] = useWebViewScrollGroupScrRef();

  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );

  const findPdp = useProjectDataProvider('platformScripture.findInScripture', projectId);
  const replacePdp = useProjectDataProvider('platformScripture.replaceWithUsfm', projectId);

  // Project data provider for USFM Book data — used in Replace mode to detect external edits.
  // Only activated in Replace mode to avoid overhead.
  const usfmBookPdp = useProjectDataProvider(
    'platformScripture.USFM_Book',
    activeMode === 'replace' ? projectId : undefined,
  );

  const [localizedStrings, isLocalizedStringsLoading] = useLocalizedStrings(
    useMemo(() => LOCALIZED_STRINGS, []),
  );

  const [scopeSelectorLocalizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(SCOPE_SELECTOR_STRING_KEYS);
    }, []),
  );

  const [searchResultLocalizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(SEARCH_RESULT_LOCALIZED_STRING_KEYS);
    }, []),
  );

  const [projectNamePossiblyError] = useProjectSetting(
    projectId,
    'platform.name',
    defaultProjectName,
  );

  const projectName = useMemo(() => {
    if (isPlatformError(projectNamePossiblyError)) {
      logger.warn(`Error getting project name: ${getErrorMessage(projectNamePossiblyError)}`);
      return defaultProjectName;
    }
    return projectNamePossiblyError;
  }, [projectNamePossiblyError]);

  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // #region Get available books and their localizations

  const [booksPresentPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.booksPresent',
    defaultBooksPresent,
  );

  const booksPresent: string = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(`Error getting books present: ${getErrorMessage(booksPresentPossiblyError)}`);
      return defaultBooksPresent;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);

  const availableBooksIds = useMemo(() => {
    return Canon.allBookIds.filter(
      (bookId, index) =>
        booksPresent[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
    );
  }, [booksPresent]);

  const availableBooksLocalizationKeys = useMemo(() => {
    const keys: `%${string}%`[] = [];
    availableBooksIds.forEach((book) => {
      keys.push(`%LocalizedId.${book}%` as const);
      keys.push(`%Book.${book}%` as const);
    });
    return keys;
  }, [availableBooksIds]);

  const [localizedBookIdsAndShortNames] = useLocalizedStrings(availableBooksLocalizationKeys);

  const localizedBookData = useMemo(() => {
    const data = new Map<string, LocalizedBookData>();
    availableBooksIds.forEach((book) => {
      data.set(book, {
        localizedId: localizedBookIdsAndShortNames[`%LocalizedId.${book}%` as const],
        localizedName: localizedBookIdsAndShortNames[`%Book.${book}%` as const],
      });
    });
    return data;
  }, [availableBooksIds, localizedBookIdsAndShortNames]);

  // #endregion

  // #region Safe wrappers for findPdp calls to avoid concurrency issues

  const activeJobIdRef = useRef(activeJobId);

  // Keep activeJobIdRef in sync with activeJobId state
  useEffect(() => {
    activeJobIdRef.current = activeJobId;
  }, [activeJobId]);

  const abandonFindJob = useCallback(async () => {
    try {
      return await findPdpMutex.runExclusive(async () => {
        if (!findPdp || !activeJobIdRef.current) return;
        const jobIdToAbandon = activeJobIdRef.current;
        activeJobIdRef.current = undefined;

        try {
          await findPdp.abandonFindJob(jobIdToAbandon);
          if (isMountedRef.current) setActiveJobId(undefined);
        } catch (error) {
          logger.error(`Error abandoning find job: ${getErrorMessage(error)}`);
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to abandon find job: ${getErrorMessage(error)}`);
    }
  }, [findPdp, setActiveJobId]);

  const beginFindJob = useCallback(
    async (findOptions: FindOptions) => {
      try {
        return await findPdpMutex.runExclusive(async () => {
          if (!findPdp) return;

          try {
            const jobId = await findPdp.beginFindJob(findOptions);
            if (isMountedRef.current) setActiveJobId(jobId);
            activeJobIdRef.current = jobId;
          } catch (error) {
            logger.error(`Error beginning find job: ${getErrorMessage(error)}`);
            if (isMountedRef.current) setActiveJobId(undefined);
            activeJobIdRef.current = undefined;
            throw error;
          }
        });
      } catch (error) {
        logger.error(`Error acquiring mutex to begin find job: ${getErrorMessage(error)}`);
      }
    },
    [findPdp, setActiveJobId],
  );

  const stopFindJob = useCallback(async () => {
    try {
      return await findPdpMutex.runExclusive(async () => {
        if (!findPdp || !activeJobIdRef.current) return false;

        try {
          return await findPdp.stopFindJob(activeJobIdRef.current);
        } catch (error) {
          logger.error(`Error stopping find job: ${getErrorMessage(error)}`);
          return false;
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to stop find job: ${getErrorMessage(error)}`);
      return false;
    }
  }, [findPdp]);

  const retrieveFindJobUpdate = useCallback(
    async (maxResultsToInclude: number): Promise<FindJobStatusReport | undefined> => {
      try {
        return findPdpMutex.runExclusive(async () => {
          if (!findPdp || !activeJobIdRef.current) return undefined;
          try {
            return await findPdp.retrieveFindJobUpdate(activeJobIdRef.current, maxResultsToInclude);
          } catch (error) {
            logger.error(`Error retrieving find job update: ${getErrorMessage(error)}`);
            return undefined;
          }
        });
      } catch (error) {
        logger.error(
          `Error acquiring mutex to retrieve find job update: ${getErrorMessage(error)}`,
        );
        return undefined;
      }
    },
    [findPdp],
  );

  // #endregion

  // #region Search related functions

  const isSearchQueryValid = useMemo(() => {
    if (searchTerm.trim() === '') return false;
    if (scope === 'selectedBooks' && selectedBookIds.length === 0) return false;
    return true;
  }, [scope, searchTerm, selectedBookIds]);

  const findScope = useMemo((): FindScope[] => {
    switch (scope) {
      case 'chapter':
        return [{ bookId: verseRefSetting.book, chapter: verseRefSetting.chapterNum }];
      case 'book':
        return [{ bookId: verseRefSetting.book }];
      case 'selectedBooks':
        return selectedBookIds.map((bookId) => ({ bookId }));
      default:
        throw new Error(`Unsupported scope: ${scope}`);
    }
  }, [scope, selectedBookIds, verseRefSetting]);

  /**
   * A stable string key capturing only the parts of scope/verseRef that affect the search query.
   * Used to trigger auto-search when the user changes scope or navigates to a different
   * book/chapter, without spuriously re-searching when clicking a result (which calls
   * setVerseRefSetting but stays within the already-searched book/chapter).
   */
  const relevantScopeKey = useMemo(() => {
    if (scope === 'selectedBooks') return `selectedBooks:${selectedBookIds.join(',')}`;
    if (scope === 'book') return `book:${verseRefSetting.book}`;
    return `chapter:${verseRefSetting.book}:${verseRefSetting.chapterNum}`;
  }, [scope, selectedBookIds, verseRefSetting.book, verseRefSetting.chapterNum]);

  const isStartingSearchRef = useRef(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Skip auto-search on the initial render so that restoring a non-empty searchTerm from
  // useWebViewState doesn't trigger an unwanted search before the user has interacted.
  const isInitialAutoSearchRef = useRef(true);

  const handleStartSearch = useCallback(async () => {
    clearTimeout(searchDebounceRef.current);
    if (!isSearchQueryValid || !findPdp || isStartingSearchRef.current) return;

    // Set the flag to prevent concurrent calls
    // No mutex is needed here because we're fine throwing away concurrent calls instead of queuing
    // them to execute serially. Rapid button clicking or pressing Enter isn't a use case that needs
    // to be supported since no one could see the search results of all but the final search anyway.
    isStartingSearchRef.current = true;

    try {
      addRecentSearchItem(searchTerm);

      await abandonFindJob();
      if (!isMountedRef.current) return;

      await beginFindJob({
        scope: findScope,
        searchString: searchTerm,
        caseInsensitive: !shouldMatchCase,
        useRegex: isRegexAllowed,
        verseTextOnly: searchTextType === 'verseOnly',
        wordRestriction,
      });
      if (!isMountedRef.current) return;

      setSearchStatus('running');
      setSearchProgress(0);

      setMonitoredScope(scope);
      setMonitoredVerseRef(verseRefSetting);
      setMonitoredBookIds(selectedBookIds);

      setFocusedResultIndex(undefined);

      setResults([]);
      loadedResultsLengthRef.current = 0;
      setNumberOfHiddenResults(0);
    } catch (error) {
      logger.error('Error starting search:', error);

      setSearchStatus('errored');
      setSearchProgress(0);

      setMonitoredScope(undefined);
      setMonitoredVerseRef(undefined);
    } finally {
      // Clear the flag regardless of success or failure
      isStartingSearchRef.current = false;
    }
  }, [
    abandonFindJob,
    addRecentSearchItem,
    beginFindJob,
    findPdp,
    findScope,
    isRegexAllowed,
    isSearchQueryValid,
    scope,
    searchTerm,
    searchTextType,
    selectedBookIds,
    shouldMatchCase,
    verseRefSetting,
    wordRestriction,
  ]);

  const handleStopSearch = useCallback(
    async (shouldClearResults?: boolean) => {
      if (!isMountedRef.current) return;
      setSearchProgress(0);
      if (shouldClearResults) {
        setResults([]);
        loadedResultsLengthRef.current = 0;
        setNumberOfHiddenResults(0);
        await abandonFindJob();
      } else await stopFindJob();
    },
    [abandonFindJob, stopFindJob],
  );

  const loadMoreResults = useCallback(async () => {
    try {
      const update = await retrieveFindJobUpdate(RESULTS_BATCH_SIZE);
      if (!update || !isMountedRef.current) return;
      const newResults = update.nextResults || [];

      if (newResults.length > 0) {
        setResults((prev) => {
          const currentResults = prev || [];
          return [...currentResults, ...newResults];
        });
        loadedResultsLengthRef.current += newResults.length;
      }
    } catch (error) {
      logger.error('Error loading more results:', error);
    }
  }, [retrieveFindJobUpdate]);

  const handleResultsScroll = useCallback(
    async (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage > 0.9 && results.length < totalNumberOfResults) await loadMoreResults();
    },
    [loadMoreResults, results.length, totalNumberOfResults],
  );

  // Effect to poll for search job updates
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isEffectActive = true;

    const checkForUpdates = async () => {
      // Check if this effect is still active to avoid race conditions
      if (!isEffectActive) return;

      try {
        const update = await retrieveFindJobUpdate(0);
        if (!update || !isEffectActive) return;

        setSearchProgress(update.percentComplete);
        setTotalNumberOfResults(update.totalResultsCount);
        setSearchStatus(update.status);
        setSearchError(update.error);

        const loadedCount = loadedResultsLengthRef.current;
        if (loadedCount < RESULTS_BATCH_SIZE && update.totalResultsCount > loadedCount) {
          await loadMoreResults();
          if (!isEffectActive) return;
        }

        // Continue polling if the job is still running and this effect is still active
        if (update.status === 'running' && isEffectActive)
          timeoutId = setTimeout(checkForUpdates, 100);
      } catch (error) {
        if (isEffectActive) {
          logger.error(`Error checking search results: ${getErrorMessage(error)}`);
          setSearchStatus('errored');
        }
      }
    };

    // Only start polling if we have an active job
    if (activeJobId) checkForUpdates();

    return () => {
      isEffectActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeJobId, loadMoreResults, retrieveFindJobUpdate]);

  // #endregion

  // Cleanup function that runs when component unmounts
  useEffect(() => {
    return () => {
      abandonFindJob();
    };
  }, [abandonFindJob]);

  // #region External scripture change detection for Replace mode

  /**
   * Combined version counter string for all monitored books (bookId:version pairs joined by '|').
   * Updated by subscriptions below. Used to detect external edits while in Replace mode. Uses
   * version counters instead of raw USFM to avoid storing megabytes of scripture text in state.
   */
  const [scriptureDataForChangeDetection, setScriptureDataForChangeDetection] = useState<
    string | undefined
  >(undefined);

  // Determine which books to monitor: all selected books for 'selectedBooks' scope, or the single
  // submitted book for 'book'/'chapter' scope. Only populated after a search has been run.
  const booksToMonitor = useMemo((): string[] => {
    if (!monitoredScope) return [];
    if (monitoredScope === 'selectedBooks') return monitoredBookIds;
    const book = monitoredVerseRef?.book;
    return book ? [book] : [];
  }, [monitoredScope, monitoredBookIds, monitoredVerseRef?.book]);

  // Subscribe to USFM data for every monitored book in Replace mode. When any book's data
  // changes, increment that book's version counter and update `scriptureDataForChangeDetection`
  // so the detection effect below can react. Version counters avoid storing full USFM in state.
  useEffect(() => {
    if (activeMode !== 'replace' || !usfmBookPdp || booksToMonitor.length === 0) {
      setScriptureDataForChangeDetection(undefined);
      return undefined;
    }

    const bookVersionMap = new Map<string, number>();
    const unsubscribers: UnsubscriberAsync[] = [];
    let isEffectActive = true;

    const updateCombined = () => {
      if (!isEffectActive) return;
      const combined = booksToMonitor
        .map((bookId) => `${bookId}:${bookVersionMap.get(bookId) ?? 0}`)
        .join('|');
      setScriptureDataForChangeDetection(combined);
    };

    (async () => {
      await booksToMonitor.reduce(async (prevPromise, bookId) => {
        await prevPromise;
        if (!isEffectActive) return;
        const verseRef = { book: bookId, chapterNum: 1, verseNum: 0 };
        // eslint-disable-next-line no-await-in-loop
        const unsubscriber = await usfmBookPdp.subscribeBookUSFM(
          verseRef,
          (usfm) => {
            if (!isEffectActive) return;
            if (!isPlatformError(usfm))
              bookVersionMap.set(bookId, (bookVersionMap.get(bookId) ?? 0) + 1);
            updateCombined();
          },
          { retrieveDataImmediately: true },
        );
        if (!isEffectActive) {
          unsubscriber().catch((err) =>
            logger.warn(`Error unsubscribing book USFM: ${getErrorMessage(err)}`),
          );
          return;
        }
        unsubscribers.push(unsubscriber);
      }, Promise.resolve());
    })().catch((err) =>
      logger.error(`Error subscribing to book USFM for change detection: ${getErrorMessage(err)}`),
    );

    return () => {
      isEffectActive = false;
      unsubscribers.forEach((unsub) =>
        unsub().catch((err) =>
          logger.warn(`Error unsubscribing book USFM: ${getErrorMessage(err)}`),
        ),
      );
    };
  }, [activeMode, usfmBookPdp, booksToMonitor]);

  /**
   * Baseline scripture data recorded at the time of the last find. `undefined` means no baseline
   * has been set yet for the current Replace mode session. Compared against
   * `scriptureDataForChangeDetection` to detect external edits.
   */
  const scriptureDataBaselineRef = useRef<string | undefined>(undefined);

  // Track a baseline snapshot of the scripture data so we can detect external edits during Replace mode.
  // Reset to undefined when leaving Replace mode, captured on first load or whenever a new search runs.
  useEffect(() => {
    if (activeMode !== 'replace') {
      scriptureDataBaselineRef.current = undefined;
      return;
    }
    if (
      scriptureDataForChangeDetection !== undefined &&
      (scriptureDataBaselineRef.current === undefined || searchStatus === 'running')
    ) {
      scriptureDataBaselineRef.current = scriptureDataForChangeDetection;
    }
  }, [activeMode, searchStatus, scriptureDataForChangeDetection]);

  // Keep handleStartSearch in a ref so the detection effect never re-runs just because the
  // memoized callback identity changed (it has many dependencies).
  const handleStartSearchRef = useRef(handleStartSearch);
  handleStartSearchRef.current = handleStartSearch;

  // Auto-search with debounce when the search term or any filter changes
  useEffect(() => {
    if (isInitialAutoSearchRef.current) {
      isInitialAutoSearchRef.current = false;
      return undefined;
    }
    searchDebounceRef.current = setTimeout(() => {
      handleStartSearchRef.current();
    }, SEARCH_DEBOUNCE_DELAY_MS);
    return () => clearTimeout(searchDebounceRef.current);
  }, [
    searchTerm,
    shouldMatchCase,
    wordRestriction,
    isRegexAllowed,
    searchTextType,
    relevantScopeKey,
  ]);

  // When scripture changes externally in Replace mode, auto-re-run find so positions stay fresh.
  useEffect(() => {
    if (activeMode !== 'replace') return;
    if (scriptureDataBaselineRef.current === undefined) return; // No baseline yet
    if (isReplacing || searchStatus === 'running' || searchStatus === undefined) return;
    if (!monitoredScope) return; // No previous search to re-run
    if (scriptureDataForChangeDetection === undefined) return;
    if (scriptureDataForChangeDetection === scriptureDataBaselineRef.current) return;

    // External change detected — update baseline and re-run find to refresh positions
    scriptureDataBaselineRef.current = scriptureDataForChangeDetection;
    handleStartSearchRef.current();
  }, [scriptureDataForChangeDetection, activeMode, isReplacing, searchStatus, monitoredScope]);

  // #endregion

  // Auto-select first result when switching to Replace mode
  useEffect(() => {
    if (activeMode === 'replace' && results.length > 0 && focusedResultIndex === undefined) {
      const firstVisibleIndex = results.findIndex((r) => !r.isHidden);
      if (firstVisibleIndex >= 0) setFocusedResultIndex(firstVisibleIndex);
    }
  }, [activeMode, focusedResultIndex, results]);

  const handleFocusedResultChange = useCallback(
    (searchResult: HidableFindResult, index: number) => {
      setFocusedResultIndex(index);
      setVerseRefSetting(searchResult.start.verseRef);
      if (editorWebViewId && editorWebViewController) {
        // In Find mode, focus the editor so the user can read in context.
        // In Replace mode, keep focus in the Find webview so replace term stays editable.
        if (activeMode === 'find') {
          papi.window.setFocus({ focusType: 'webView', id: editorWebViewId });
        }
        editorWebViewController.selectRange({
          start: searchResult.start,
          end: searchResult.end,
        });
      }
    },
    [activeMode, editorWebViewController, editorWebViewId, setVerseRefSetting],
  );

  const handleHideResult = useCallback((index: number) => {
    setResults((prevResults) =>
      prevResults.map((prevResult, i) =>
        i === index ? { ...prevResult, isHidden: true } : prevResult,
      ),
    );
    setNumberOfHiddenResults((prevCount) => prevCount + 1);
    setFocusedResultIndex(undefined);
  }, []);

  const handleReplace = useCallback(
    async (resultIndex?: number) => {
      const indexToReplace = resultIndex ?? focusedResultIndex;
      if (indexToReplace === undefined || !replacePdp) return;

      const result = results[indexToReplace];
      if (!result || result.isHidden) return;

      const usfmToInsert = preserveCase
        ? applyPreserveCase(result.text ?? '', replaceTerm)
        : replaceTerm;

      setIsReplacing(true);
      try {
        await replacePdp.replace([{ start: result.start, end: result.end }], usfmToInsert);
        // Re-run find immediately after replace so positions are fresh before the user can
        // click replace again. isReplacing stays true until this completes, closing the gap
        // between replace() returning and searchStatus becoming 'running'.
        await handleStartSearch();
      } catch (error) {
        logger.error(`Error replacing result: ${getErrorMessage(error)}`);
      } finally {
        setIsReplacing(false);
      }
    },
    [focusedResultIndex, handleStartSearch, preserveCase, replacePdp, replaceTerm, results],
  );

  const handleReplaceAll = useCallback(async () => {
    if (!replacePdp) return;

    setIsReplacing(true);
    try {
      // Load all remaining results before replacing so we don't miss any.
      // Use a local `latestTotal` updated from each server response so that a stale
      // `totalNumberOfResults` snapshot (from when the button was clicked) cannot cause
      // the loop to exit before all results have arrived.
      let allResults = [...results];
      let latestTotal = totalNumberOfResults;
      while (allResults.length < latestTotal) {
        // eslint-disable-next-line no-await-in-loop
        const update = await retrieveFindJobUpdate(RESULTS_BATCH_SIZE);
        if (!update || !isMountedRef.current) break;
        latestTotal = update.totalResultsCount;
        const newBatch = update.nextResults || [];
        if (newBatch.length === 0) break;
        allResults = [...allResults, ...newBatch];
        loadedResultsLengthRef.current += newBatch.length;
      }
      // Sync any newly loaded results into state
      if (allResults.length > results.length) setResults(allResults);

      const visibleResultsList = allResults.filter((r) => !r.isHidden);
      if (visibleResultsList.length === 0) return;

      const rangesToReplace = visibleResultsList.map((r) => ({ start: r.start, end: r.end }));
      const usfmToInsert = preserveCase
        ? visibleResultsList.map((r) => applyPreserveCase(r.text ?? '', replaceTerm))
        : replaceTerm;

      await replacePdp.replace(rangesToReplace, usfmToInsert);
      await handleStartSearch();
    } catch (error) {
      logger.error(`Error replacing all results: ${getErrorMessage(error)}`);
    } finally {
      setIsReplacing(false);
    }
  }, [
    handleStartSearch,
    preserveCase,
    replacePdp,
    replaceTerm,
    results,
    retrieveFindJobUpdate,
    totalNumberOfResults,
  ]);

  const visibleResults = useMemo(
    () =>
      results
        .map((result, index) => ({ result, originalIndex: index }))
        .filter(({ result }) => !result.isHidden),
    [results],
  );

  const focusedVisibleIndex = useMemo(
    () =>
      focusedResultIndex !== undefined
        ? visibleResults.findIndex((vr) => vr.originalIndex === focusedResultIndex)
        : -1,
    [visibleResults, focusedResultIndex],
  );

  const handlePreviousResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedResultIndex === undefined) {
      const last = visibleResults[visibleResults.length - 1];
      handleFocusedResultChange(last.result, last.originalIndex);
      return;
    }
    if (focusedVisibleIndex > 0) {
      const prev = visibleResults[focusedVisibleIndex - 1];
      handleFocusedResultChange(prev.result, prev.originalIndex);
    }
  }, [focusedResultIndex, focusedVisibleIndex, visibleResults, handleFocusedResultChange]);

  const handleNextResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedResultIndex === undefined) {
      handleFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
      return;
    }
    if (focusedVisibleIndex < visibleResults.length - 1) {
      const next = visibleResults[focusedVisibleIndex + 1];
      handleFocusedResultChange(next.result, next.originalIndex);
    }
  }, [focusedResultIndex, focusedVisibleIndex, visibleResults, handleFocusedResultChange]);

  const findButtonText = isLocalizedStringsLoading
    ? ''
    : localizedStrings['%webView_find_findButton%'];

  const areFiltersActive =
    shouldMatchCase || wordRestriction !== 'none' || searchTextType !== 'all' || isRegexAllowed;

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
        const bookName =
          localizedBookData.get(verseRefSetting.book)?.localizedId ?? verseRefSetting.book;
        return `${bookName} ${verseRefSetting.chapterNum}`;
      }
      case 'book':
        return localizedBookData.get(verseRefSetting.book)?.localizedId ?? verseRefSetting.book;
      case 'selectedBooks':
        if (selectedBookIds.length === 0) return '…';
        return selectedBookIds.map((id) => localizedBookData.get(id)?.localizedId ?? id).join(', ');
      default:
        return '';
    }
  }, [scope, selectedBookIds, verseRefSetting, localizedBookData]);

  return (
    <div className="pr-twp tw-container tw-mx-auto tw-flex tw-flex-col tw-gap-4 tw-p-4 tw-min-w-[10rem] tw-max-h-screen">
      {/* Header with searchbar and filters */}
      <div className="tw-space-y-3">
        {/* Find/Replace mode toggle */}
        <ToggleGroup
          type="single"
          value={activeMode}
          onValueChange={(value) => {
            if (value === 'find' || value === 'replace') setActiveMode(value);
          }}
          className="tw-w-fit tw-rounded-lg tw-bg-muted tw-p-1"
        >
          <ToggleGroupItem
            value="find"
            className="data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
          >
            {localizedStrings['%webView_find_findTab%']}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="replace"
            className="data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
          >
            {localizedStrings['%webView_find_replaceTab%']}
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Find input row */}
        <div className="tw-flex tw-gap-2 tw-flex-wrap">
          <div className="tw-relative tw-flex-1">
            <TextSearch className="tw-pointer-events-none tw-absolute tw-left-2 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
            <Input
              id="search-term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleStartSearch();
                }
              }}
              placeholder={localizedStrings['%webView_find_searchPlaceholder%']}
              className={`tw-w-full tw-min-w-16 tw-text-ellipsis !tw-pl-8 scripture-font ${searchTerm ? '!tw-pe-8' : '!tw-pr-4'}`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  handleStopSearch(true);
                }}
                className="tw-absolute tw-end-2 tw-top-1/2 -tw-translate-y-1/2 tw-text-muted-foreground hover:tw-text-foreground tw-bg-transparent tw-border-0 tw-p-0 tw-cursor-pointer"
              >
                <X className="tw-h-4 tw-w-4" />
              </button>
            )}
          </div>
          <RecentSearches
            classNameForItems="scripture-font"
            recentSearches={recentSearches}
            onSearchItemSelect={setSearchTerm}
            ariaLabel={localizedStrings['%webView_find_showRecentSearches%']}
            groupHeading={localizedStrings['%webView_find_recent%']}
            buttonClassName="tw-h-10 tw-w-10"
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
            strings={{
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleStartSearch}
                  disabled={
                    !isSearchQueryValid || searchStatus === 'running' || findButtonText === ''
                  }
                >
                  {searchStatus === 'running' ? <Spinner /> : findButtonText}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw-font-light">
                  {formatReplacementString(localizedStrings['%webView_find_findInProject%'], {
                    projectName,
                  })}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Replace input row — shown in Replace mode */}
        {activeMode === 'replace' && (
          <>
            <div className="tw-relative tw-flex-1">
              <ArrowRight className="tw-pointer-events-none tw-absolute tw-left-2 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
              <Input
                id="replace-term"
                value={replaceTerm}
                onChange={(e) => setReplaceTerm(e.target.value)}
                placeholder={localizedStrings['%webView_find_replaceTerm_placeholder%']}
                className="tw-w-full tw-min-w-16 !tw-pl-8 !tw-pr-4 scripture-font"
              />
            </div>
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-flex-wrap">
              <div className="tw-flex tw-items-center tw-gap-2">
                <Checkbox
                  id="preserve-case"
                  checked={preserveCase}
                  onCheckedChange={(checked) => setPreserveCase(checked === true)}
                />
                <Label htmlFor="preserve-case" className="tw-cursor-pointer">
                  {localizedStrings['%webView_find_preserveCase%']}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground tw-cursor-default" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="tw-max-w-xs tw-whitespace-pre-line">
                        {localizedStrings['%webView_find_preserveCase_tooltip%']}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="tw-flex tw-gap-2">
                <Button
                  variant="outline"
                  onClick={handleReplaceAll}
                  disabled={
                    visibleResults.length === 0 || searchStatus === 'running' || isReplacing
                  }
                >
                  <ReplaceAll className="tw-h-4 tw-w-4" />
                  {localizedStrings['%webView_find_replaceAll%']}
                </Button>
                <Button
                  onClick={() => handleReplace()}
                  disabled={
                    focusedResultIndex === undefined || searchStatus === 'running' || isReplacing
                  }
                >
                  <Replace className="tw-h-4 tw-w-4" />
                  {localizedStrings['%webView_find_replace%']}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Scope selector row */}
        <div className="tw-flex tw-items-center tw-justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="tw-h-auto tw-gap-1 tw-px-2 tw-py-1 tw-font-normal"
              >
                <span className="tw-text-sm tw-text-muted-foreground">
                  {localizedStrings['%webView_find_showing%']}
                </span>
                <span className="tw-text-sm tw-font-medium">{scopeDisplayText}</span>
                <ChevronDown className="tw-h-3 tw-w-3 tw-text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="tw-w-auto tw-p-3">
              <ScopeSelector
                scope={scope}
                availableScopes={['chapter', 'book', 'selectedBooks']}
                onScopeChange={setScope}
                availableBookInfo={booksPresent}
                selectedBookIds={selectedBookIds}
                onSelectedBookIdsChange={setSelectedBookIds}
                localizedStrings={scopeSelectorLocalizedStrings}
                localizedBookNames={localizedBookData}
              />
            </PopoverContent>
          </Popover>
          {visibleResults.length > 0 && (
            <div className="tw-flex tw-items-center tw-gap-1">
              <span className="tw-text-sm tw-text-muted-foreground tw-tabular-nums">
                {formatReplacementString(localizedStrings['%webView_find_resultNavigation%'], {
                  current: focusedVisibleIndex >= 0 ? String(focusedVisibleIndex + 1) : '–',
                  total: String(visibleResults.length),
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-7 tw-w-7"
                disabled={focusedVisibleIndex === 0 || visibleResults.length === 0}
                onClick={handlePreviousResult}
                aria-label={localizedStrings['%webView_find_previousResult%']}
              >
                <ChevronUp className="tw-h-4 tw-w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-7 tw-w-7"
                disabled={focusedVisibleIndex >= visibleResults.length - 1}
                onClick={handleNextResult}
                aria-label={localizedStrings['%webView_find_nextResult%']}
              >
                <ChevronDown className="tw-h-4 tw-w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Placeholder */}
      {results && results.length === 0 && searchStatus === 'running' && (
        <div className="tw-space-y-2">
          {Array.from({ length: 5 }).map((_value, index) => (
            // As this is a placeholder, it is safe to use the index as a key
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index}>
              <CardContent className="tw-flex tw-items-center tw-space-x-4 tw-p-4">
                <div className="tw-space-y-2">
                  <Skeleton className="tw-h-4 tw-w-[250px]" />
                  <Skeleton className="tw-h-4 tw-w-[200px]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search Results */}
      <div
        className="tw-min-h-48 tw-flex-1 tw-space-y-2 tw-overflow-y-auto tw-pe-2"
        onScroll={handleResultsScroll}
      >
        {[...resultsByBook.entries()].map(([bookId, bookResults]) => {
          return (
            <SearchResultsInBook
              key={bookId}
              projectId={projectId}
              bookId={bookId}
              results={bookResults.map(({ result }) => result)}
              localizedBookData={localizedBookData}
              focusedResultIndex={bookResults.findIndex(
                ({ originalIndex }) => originalIndex === focusedResultIndex,
              )}
              onResultClick={(result, indexInBookResults) =>
                handleFocusedResultChange(result, bookResults[indexInBookResults].originalIndex)
              }
              onHideResult={(indexInBookResults) =>
                handleHideResult(bookResults[indexInBookResults].originalIndex)
              }
              onReplace={(indexInBookResults) =>
                handleReplace(bookResults[indexInBookResults].originalIndex)
              }
              localizedStrings={searchResultLocalizedStrings}
              isReplaceMode={activeMode === 'replace'}
              isReplacing={isReplacing}
            />
          );
        })}
      </div>

      {/* Status bar */}
      {searchStatus && (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-border-t tw-pt-4">
          {searchStatus === 'running' && (
            <div className="tw-flex tw-items-center tw-gap-4">
              <Progress value={searchProgress} className="tw-w-64" />
              <Button onClick={() => handleStopSearch(false)}>
                {localizedStrings['%webView_find_cancelSearch%']}
              </Button>
            </div>
          )}
          {(searchStatus === 'completed' ||
            searchStatus === 'stopped' ||
            searchStatus === 'exceeded') &&
            results && <p className="tw-font-light tw-text-center">{resultsMessage}</p>}
          {searchStatus === 'errored' && searchError && (
            <p className="tw-font-light tw-text-center">
              {formatReplacementString(localizedStrings['%webView_find_errorOccurred%'], {
                error: searchError,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
