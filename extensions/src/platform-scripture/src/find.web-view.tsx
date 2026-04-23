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
  Sonner,
  sonner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useRecentSearches,
} from 'platform-bible-react';
import {
  debounce,
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
  '%general_countOfTotal%',
  '%versionHistoryCommit_beforeReplace%',
  '%versionHistoryCommit_beforeReplace_failureMessage%',
  '%versionHistoryCommit_afterReplace%',
  '%webView_find_allText%',
  '%webView_find_allText_tooltip%',
  '%webView_find_allowRegex%',
  '%webView_find_cancelSearch%',
  '%webView_find_capitalization%',
  '%webView_find_errorOccurred%',
  '%webView_find_findInProject%',
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
  '%webView_find_replacedOneOccurrence%',
  '%webView_find_replacedNOccurrences%',
  '%webView_find_replacementReverted%',
  '%webView_find_replaceTab%',
  '%webView_find_replaceTerm_placeholder%',
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
];

const defaultBooksPresent: string = '';
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
  const firstChar = matchedText[0];
  if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
    return replacementText[0].toUpperCase() + replacementText.slice(1);
  }
  return replacementText;
}

/**
 * Returns a promise that resolves after `ms` milliseconds. The cancel function stored in
 * `cancelRef` resolves the promise early; the resolved value is `true` when cancelled, `false` when
 * the timeout elapsed naturally. Callers must clear `cancelRef.current` after awaiting.
 */
function cancellableDelay(
  ms: number,
  cancelRef: { current: { cancel: () => void } | undefined },
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const timeoutId = setTimeout(() => resolve(false), ms);
    // We must write to cancelRef.current to expose the cancel function to the caller, which is the
    // intended API of this function. The ref object itself is not reassigned.
    // eslint-disable-next-line no-param-reassign
    cancelRef.current = {
      cancel: () => {
        clearTimeout(timeoutId);
        resolve(true);
      },
    };
  });
}

async function revertBookSnapshots(
  snapshots: Map<string, string>,
  pdp: { setBookUSFM: (verseRef: SerializedVerseRef, usfm: string) => Promise<unknown> },
): Promise<boolean> {
  let allRevertedSuccessfully = true;
  await Promise.all(
    [...snapshots].map(async ([bookId, snapshot]) => {
      try {
        await pdp.setBookUSFM({ book: bookId, chapterNum: 1, verseNum: 0 }, snapshot);
      } catch (revertError) {
        allRevertedSuccessfully = false;
        logger.error(`Error reverting replace for book ${bookId}: ${getErrorMessage(revertError)}`);
      }
    }),
  );
  return allRevertedSuccessfully;
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
  /**
   * True when the current search was automatically triggered after a replace operation. Used to
   * suppress the progress bar in replace mode — after replacing, a re-search is mandatory to
   * refresh result positions, but showing a progress indicator for that invisible housekeeping
   * search would be confusing to the user, but want the progress bar to appear on searches after
   * that one.
   */
  const [isPostReplaceSearch, setIsPostReplaceSearch] = useState(false);
  const isPostReplaceSearchRef = useRef(false);
  const [activeJobId, setActiveJobId] = useState<string>();
  const [searchProgress, setSearchProgress] = useState<number>(0);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);
  const [searchError, setSearchError] = useState<string | undefined>();

  const [results, setResults] = useState<HidableFindResult[]>([]);
  const resultsRef = useRef<HidableFindResult[]>([]);
  resultsRef.current = results;
  const loadedResultsLengthRef = useRef(0);
  // useRef requires null as the initial value when used with a DOM element ref
  // eslint-disable-next-line no-null/no-null
  const resultsContainerRef = useRef<HTMLDivElement>(null);
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

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

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

  // Stores a cancel function for a pending replace/replace-all operation (the 1-second window
  // before the re-search fires). Calling it stops the timer and triggers a revert.
  const pendingReplaceRevertRef = useRef<{ cancel: () => void } | undefined>(undefined);

  const isStartingSearchRef = useRef(false);
  // Set when the user explicitly starts a search (Enter/Find button) so the debounce timer that
  // may still be pending from the same keystroke skips its redundant restart.
  const explicitSearchPendingRef = useRef(false);
  // Tracks the index of the result that was just replaced so the auto-select effect can advance
  // focus to the next result instead of jumping back to the first.
  const pendingAdvanceIndexRef = useRef<number | undefined>(undefined);
  // On the initial render, skip the debounce-triggered auto-search only when searchTerm is empty.
  // When searchTerm is non-empty (restored from state), let the search run so results appear on
  // startup. A separate effect handles the case where findPdp isn't ready within the debounce
  // window.
  const isInitialAutoSearchRef = useRef(true);
  // Tracks whether the startup search (for a pre-filled search term) has already been triggered,
  // so the findPdp-readiness effect below only fires once. Intentionally never reset: the fallback
  // effect is a one-shot safety net for mount-time races and should not re-fire on project switch.
  const initialSearchTriggeredRef = useRef(false);

  const handleStartSearch = useCallback(
    async (isExplicitSearch = false) => {
      if (!isSearchQueryValid || !findPdp || isStartingSearchRef.current) return;

      const isPostReplace = isPostReplaceSearchRef.current;
      isPostReplaceSearchRef.current = false;

      if (isExplicitSearch) explicitSearchPendingRef.current = true;

      // Set the flag to prevent concurrent calls
      // No mutex is needed here because we're fine throwing away concurrent calls instead of queuing
      // them to execute serially. Rapid button clicking or pressing Enter isn't a use case that needs
      // to be supported since no one could see the search results of all but the final search anyway.
      isStartingSearchRef.current = true;

      try {
        if (isExplicitSearch) addRecentSearchItem(searchTerm);

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
        setIsPostReplaceSearch(isPostReplace);
        setSearchError(undefined);
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
    },
    [
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
    ],
  );

  const handleStopSearch = useCallback(
    async (shouldClearResults?: boolean) => {
      if (!isMountedRef.current) return;
      setSearchProgress(0);
      if (shouldClearResults) {
        setResults([]);
        loadedResultsLengthRef.current = 0;
        setNumberOfHiddenResults(0);
        setSearchStatus(undefined);
        setSearchError(undefined);
        setFocusedResultIndex(undefined);
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
      pendingReplaceRevertRef.current?.cancel();
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
        // Subscriptions must be created sequentially so that `isEffectActive` is checked between
        // each one, allowing cleanup to abort early if the effect has been torn down mid-loop.
        // eslint-disable-line no-await-in-loop
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
  const debouncedHandleStartSearch = useRef(
    debounce(() => {
      if (explicitSearchPendingRef.current) {
        explicitSearchPendingRef.current = false;
        return;
      }
      handleStartSearchRef.current();
    }, SEARCH_DEBOUNCE_DELAY_MS),
  );

  // Auto-search with debounce when the search term or any filter changes
  useEffect(() => {
    if (isInitialAutoSearchRef.current) {
      isInitialAutoSearchRef.current = false;
      // Only skip the initial auto-search when the field is empty. When searchTerm is non-empty
      // (e.g. restored from state), fall through so results appear immediately on startup.
      if (searchTerm.trim() === '') return undefined;
      initialSearchTriggeredRef.current = true;
    }
    debouncedHandleStartSearch.current();
  }, [
    searchTerm,
    shouldMatchCase,
    wordRestriction,
    isRegexAllowed,
    searchTextType,
    relevantScopeKey,
  ]);

  // Fallback for startup search: if findPdp wasn't ready when the debounce fired on mount,
  // run the search as soon as findPdp becomes available (fires at most once).
  // Set explicitSearchPendingRef so the debounce timer (still pending when findPdp was already
  // available at mount) skips its redundant second call.
  useEffect(() => {
    if (
      !findPdp ||
      !initialSearchTriggeredRef.current ||
      searchStatus !== undefined ||
      searchTerm.trim() === ''
    )
      return;
    explicitSearchPendingRef.current = true;
    handleStartSearchRef.current();
  }, [findPdp, searchStatus, searchTerm]);

  // Reset isPostReplaceSearch once the search finishes so a subsequent search in replace mode
  // (e.g. triggered by an external change) is not mistakenly treated as a post-replace search.
  useEffect(() => {
    if (searchStatus !== 'running') setIsPostReplaceSearch(false);
  }, [searchStatus]);

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

  // Auto-select first result when switching to Replace mode, or advance to the next result
  // after a replace operation instead of jumping back to the first.
  useEffect(() => {
    if (activeMode === 'replace' && results.length > 0 && focusedResultIndex === undefined) {
      if (pendingAdvanceIndexRef.current === undefined) {
        const firstVisibleIndex = results.findIndex((r) => !r.isHidden);
        if (firstVisibleIndex >= 0) setFocusedResultIndex(firstVisibleIndex);
      } else {
        // Wait until the search finishes so all results are available before picking the target.
        if (searchStatus === 'running') return;
        const targetIndex = pendingAdvanceIndexRef.current;
        pendingAdvanceIndexRef.current = undefined;
        // Find the first visible result at or after the replaced position (the replaced result
        // is gone, so this naturally advances to what was previously the next result).
        const nextIndex = results.findIndex((r, i) => i >= targetIndex && !r.isHidden);
        const indexToFocus = nextIndex >= 0 ? nextIndex : results.findIndex((r) => !r.isHidden);
        if (indexToFocus >= 0) setFocusedResultIndex(indexToFocus);
      }
    }
  }, [activeMode, focusedResultIndex, results, searchStatus]);

  const handleFocusedResultChange = useCallback(
    (searchResult: HidableFindResult, index: number) => {
      setFocusedResultIndex(index);
      setVerseRefSetting(searchResult.start.verseRef);
      if (editorWebViewId && editorWebViewController) {
        // In Find mode, focus the editor so the user can read in context.
        // In Replace mode, keep focus in the Find WebView so replace term stays editable.
        if (activeMode === 'find') {
          papi.window.setFocus({ focusType: 'webView', id: editorWebViewId });
        }
        editorWebViewController
          .selectRange({
            start: searchResult.start,
            end: searchResult.end,
          })
          .catch((e) => logger.warn(`Find: selectRange failed: ${getErrorMessage(e)}`));
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
      if (isReplacing) return;
      const indexToReplace = resultIndex ?? focusedResultIndex;
      if (indexToReplace === undefined || !replacePdp) return;

      const result = results[indexToReplace];
      if (!result || result.isHidden) return;

      const usfmToInsert = preserveCase
        ? applyPreserveCase(result.text ?? '', replaceTerm)
        : replaceTerm;

      const bookVerseRef = { book: result.start.verseRef.book, chapterNum: 1, verseNum: 0 };
      setIsReplacing(true);
      try {
        // Snapshot the book before replacing so revert can restore USFM exactly
        const bookSnapshot = await usfmBookPdp?.getBookUSFM(bookVerseRef);
        // Also commits changes to the version history
        let isCommitSuccess = false;
        try {
          if (projectId)
            isCommitSuccess = await papi.commands.sendCommand(
              'paratextBibleSendReceive.commitChanges',
              projectId,
              formatReplacementString(localizedStrings['%versionHistoryCommit_beforeReplace%'], {
                replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
              }),
              true,
            );
        } catch (err: unknown) {
          const errMessage = getErrorMessage(err);
          if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
            // Shouldn't stop the replace if the commit commands are only unimplemented in the
            // current version of the application.
            isCommitSuccess = true;
            logger.info(errMessage);
          } else {
            logger.error(
              `Error committing changes to version history before replacing: ${getErrorMessage(err)}`,
            );
          }
        }
        // If the commit fails, aborts the replace operation
        if (!isCommitSuccess) {
          setIsReplacing(false);
          papi.notifications.send({
            message: localizedStrings['%versionHistoryCommit_beforeReplace_failureMessage%'],
            severity: 'error',
          });
          return;
        }

        await replacePdp.replace([{ start: result.start, end: result.end }], usfmToInsert);

        // Commits resulting changes from the replace to the version history
        try {
          if (projectId)
            await papi.commands.sendCommand(
              'paratextBibleSendReceive.commitChanges',
              projectId,
              formatReplacementString(localizedStrings['%versionHistoryCommit_afterReplace%'], {
                replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
              }),
              false,
            );
        } catch (err: unknown) {
          const errMessage = getErrorMessage(err);
          if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
            logger.info(errMessage);
          } else {
            logger.error(
              `Error committing changes to version history after replacing: ${getErrorMessage(err)}`,
            );
          }
        }

        // Mark the replaced result with visual feedback before re-running the search
        setResults((prev) =>
          prev.map((r, i) => (i === indexToReplace ? { ...r, isReplaced: true } : r)),
        );
        const replacedToastId = sonner(localizedStrings['%webView_find_replacedOneOccurrence%']);

        // Cancellable 1-second wait before re-search
        const isCancelled = await cancellableDelay(1000, pendingReplaceRevertRef);
        pendingReplaceRevertRef.current = undefined;

        let revertSucceeded = false;
        if (isCancelled) {
          if (!isMountedRef.current) return; // Unmount — keep the replacement, don't revert
          try {
            if (bookSnapshot !== undefined && usfmBookPdp) {
              revertSucceeded = await revertBookSnapshots(
                new Map([[bookVerseRef.book, bookSnapshot]]),
                usfmBookPdp,
              );
            } else {
              logger.error('Error reverting replace: book snapshot unavailable');
            }
            sonner.dismiss(replacedToastId);
            if (revertSucceeded) {
              sonner(localizedStrings['%webView_find_replacementReverted%']);
              if (isMountedRef.current)
                setResults((prev) =>
                  prev.map((r, i) => (i === indexToReplace ? { ...r, isReplaced: false } : r)),
                );
            }
          } catch (revertError) {
            logger.error(`Error reverting replace: ${getErrorMessage(revertError)}`);
          }
        } else {
          // Store the replaced index so the auto-select effect can advance to the next result
          // rather than jumping back to the first after the re-search completes.
          pendingAdvanceIndexRef.current = indexToReplace;
        }
        if (!isMountedRef.current) return;
        // Skip re-search when the revert succeeded — the book is restored to its pre-replace
        // state so the existing results are still valid, and re-searching would cause a flicker.
        if (!(isCancelled && revertSucceeded)) {
          isPostReplaceSearchRef.current = true;
          await handleStartSearchRef.current();
        }
      } catch (error) {
        logger.error(`Error replacing result: ${getErrorMessage(error)}`);
      } finally {
        setIsReplacing(false);
      }
    },
    [
      focusedResultIndex,
      isReplacing,
      localizedStrings,
      preserveCase,
      replacePdp,
      replaceTerm,
      results,
      usfmBookPdp,
      searchTerm,
      projectId,
    ],
  );

  const handleReplaceAll = useCallback(async () => {
    if (isReplacing || !replacePdp) return;

    setIsReplacing(true);
    try {
      // Load all remaining results before replacing so we don't miss any.
      // Use a local `latestTotal` updated from each server response so that a stale
      // `totalNumberOfResults` snapshot (from when the button was clicked) cannot cause
      // the loop to exit before all results have arrived.
      // Use the ref so we always start from the latest results, even if state updates
      // (e.g. user scrolled to load more) happened after the callback was created.
      let allResults = [...resultsRef.current];
      let latestTotal = totalNumberOfResults;
      while (allResults.length < latestTotal) {
        // Sequential awaiting is intentional: each call fetches the next batch and its result
        // determines whether another fetch is needed. Promise.all cannot be used here.
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
      if (allResults.length > resultsRef.current.length) setResults(allResults);

      const visibleResultsList = allResults.filter((r) => !r.isHidden);
      if (visibleResultsList.length === 0) return;

      let isCommitSuccess = false;
      // Also commits changes to the version history
      try {
        if (projectId)
          isCommitSuccess = await papi.commands.sendCommand(
            'paratextBibleSendReceive.commitChanges',
            projectId,
            formatReplacementString(localizedStrings['%versionHistoryCommit_beforeReplace%'], {
              replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
            }),
            true,
          );
      } catch (err: unknown) {
        const errMessage = getErrorMessage(err);
        if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
          // If the commit commands are simply not implemented in this version of the application,
          // shouldn't skip the replace.
          isCommitSuccess = true;
          logger.info(errMessage);
        } else {
          logger.error(
            `Error committing changes to version history before replacing: ${getErrorMessage(err)}`,
          );
        }
      }
      // If the initial commit failed, aborts replace operation
      if (!isCommitSuccess) {
        setIsReplacing(false);
        papi.notifications.send({
          message: localizedStrings['%versionHistoryCommit_beforeReplace_failureMessage%'],
          severity: 'error',
        });
        return;
      }

      const usfmToInsert = preserveCase
        ? visibleResultsList.map((r) => applyPreserveCase(r.text ?? '', replaceTerm))
        : replaceTerm;

      // Snapshot all affected books' USFM before replacing so cancel/revert can restore them
      // exactly, avoiding stale-position errors from the post-replacement document state.
      const uniqueBookIds = [...new Set(visibleResultsList.map((r) => r.start.verseRef.book))];
      const bookSnapshots = new Map<string, string>();
      await Promise.all(
        uniqueBookIds.map(async (bookId) => {
          const verseRef = { book: bookId, chapterNum: 1, verseNum: 0 };
          const snapshot = await usfmBookPdp?.getBookUSFM(verseRef);
          if (snapshot !== undefined) bookSnapshots.set(bookId, snapshot);
        }),
      );

      // Group results by book and call replace() once per book (API requires all ranges in same book).
      const bookGroupMap = new Map<
        string,
        {
          ranges: { start: HidableFindResult['start']; end: HidableFindResult['end'] }[];
          insertions: string[];
        }
      >();
      visibleResultsList.forEach((r, i) => {
        const bookId = r.start.verseRef.book;
        if (!bookGroupMap.has(bookId)) bookGroupMap.set(bookId, { ranges: [], insertions: [] });
        // TypeScript doesn't know that bookId is guaranteed to be in bookGroupMap here, but the
        // preceding `if` ensures it was just inserted if missing, so the `!` assertion is safe.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const group = bookGroupMap.get(bookId)!;
        group.ranges.push({ start: r.start, end: r.end });
        group.insertions.push(Array.isArray(usfmToInsert) ? usfmToInsert[i] : usfmToInsert);
      });
      await Promise.all(
        [...bookGroupMap.values()].map(({ ranges, insertions }) =>
          replacePdp.replace(ranges, preserveCase ? insertions : insertions[0]),
        ),
      );
      const count = visibleResultsList.length;
      const replacedAllToastId = sonner(
        count === 1
          ? localizedStrings['%webView_find_replacedOneOccurrence%']
          : formatReplacementString(localizedStrings['%webView_find_replacedNOccurrences%'], {
              count: count.toString(),
            }),
      );

      // Commits resulting changes from the replace to the version history
      try {
        if (projectId)
          await papi.commands.sendCommand(
            'paratextBibleSendReceive.commitChanges',
            projectId,
            formatReplacementString(localizedStrings['%versionHistoryCommit_afterReplace%'], {
              replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
            }),
            false,
          );
      } catch (err: unknown) {
        const errMessage = getErrorMessage(err);
        if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
          logger.info(errMessage);
        } else {
          logger.error(
            `Error committing changes to version history after replacing: ${getErrorMessage(err)}`,
          );
        }
      }

      // Mark all visible results as replaced for visual feedback (red background + progress bar)
      setResults(allResults.map((r) => (r.isHidden ? r : { ...r, isReplaced: true })));

      // Cancellable 1-second wait before re-search
      const isCancelled = await cancellableDelay(1000, pendingReplaceRevertRef);
      pendingReplaceRevertRef.current = undefined;

      let revertSucceeded = false;
      if (isCancelled) {
        if (!isMountedRef.current) return; // Unmount — keep the replacement, don't revert
        if (bookSnapshots.size > 0 && usfmBookPdp) {
          revertSucceeded = await revertBookSnapshots(bookSnapshots, usfmBookPdp);
        } else {
          logger.error('Error reverting replace all: book snapshots unavailable');
        }
        sonner.dismiss(replacedAllToastId);
        if (revertSucceeded) {
          sonner(localizedStrings['%webView_find_replacementReverted%']);
          if (isMountedRef.current)
            setResults((prev) => prev.map((r) => ({ ...r, isReplaced: false })));
        }
      }
      if (!isMountedRef.current) return;
      // Skip re-search when the revert succeeded — the book is restored to its pre-replace
      // state so the existing results are still valid, and re-searching would cause a flicker.
      if (!(isCancelled && revertSucceeded)) {
        isPostReplaceSearchRef.current = true;
        await handleStartSearchRef.current();
      }
    } catch (error) {
      logger.error(`Error replacing all results: ${getErrorMessage(error)}`);
    } finally {
      setIsReplacing(false);
    }
  }, [
    isReplacing,
    localizedStrings,
    preserveCase,
    replacePdp,
    replaceTerm,
    retrieveFindJobUpdate,
    totalNumberOfResults,
    usfmBookPdp,
    searchTerm,
    projectId,
  ]);

  const handleCancelReplace = useCallback(() => {
    pendingReplaceRevertRef.current?.cancel();
  }, []);

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
      handleFocusedResultChange(last.result, last.originalIndex);
      return;
    }
    const prev = visibleResults[focusedVisibleIndex - 1];
    handleFocusedResultChange(prev.result, prev.originalIndex);
  }, [focusedVisibleIndex, visibleResults, handleFocusedResultChange]);

  const handleNextResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedVisibleIndex >= visibleResults.length - 1) {
      // Already at last result → wrap to first
      handleFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
      return;
    }
    const next = visibleResults[focusedVisibleIndex + 1];
    handleFocusedResultChange(next.result, next.originalIndex);
  }, [focusedVisibleIndex, visibleResults, handleFocusedResultChange]);

  const handleFirstResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    handleFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
  }, [visibleResults, handleFocusedResultChange]);

  const handleLastResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    // `at(-1)` returns `undefined` only on an empty array; the early return above guarantees
    // that the array is non-empty
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const last = visibleResults.at(-1)!;
    handleFocusedResultChange(last.result, last.originalIndex);
  }, [visibleResults, handleFocusedResultChange]);

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
    handleFocusedResultChange(target.result, target.originalIndex);
  }, [focusedVisibleIndex, visibleResults, handleFocusedResultChange, getPageSize]);

  const handlePageDownResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    const pageSize = getPageSize();
    const currentIndex = Math.max(0, focusedVisibleIndex);
    const newIndex = Math.min(visibleResults.length - 1, currentIndex + pageSize);
    const target = visibleResults[newIndex];
    handleFocusedResultChange(target.result, target.originalIndex);
  }, [focusedVisibleIndex, visibleResults, handleFocusedResultChange, getPageSize]);

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
                  handleStartSearch(true);
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
                {formatReplacementString(localizedStrings['%general_countOfTotal%'], {
                  count: focusedVisibleIndex >= 0 ? String(focusedVisibleIndex + 1) : '–',
                  total: String(visibleResults.length),
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-7 tw-w-7"
                disabled={visibleResults.length === 0}
                onClick={handlePreviousResult}
                aria-label={localizedStrings['%webView_find_previousResult%']}
              >
                <ChevronUp className="tw-h-4 tw-w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-7 tw-w-7"
                disabled={visibleResults.length === 0}
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
      {/* This div is a scroll container that handles keyboard navigation (arrow keys) between search
          results. It needs onKeyDown for result navigation and onScroll for progressive loading, but
          it has no single semantic ARIA role (it's not a listbox, grid, etc.) that would satisfy the
          rule without being misleading. The child result rows are the interactive elements. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={resultsContainerRef}
        className="tw-min-h-48 tw-flex-1 tw-space-y-2 tw-overflow-y-auto tw-pe-2"
        // This div is a keyboard-navigable scroll container; tabIndex is required to receive focus for arrow-key navigation between results
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onScroll={handleResultsScroll}
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
              !cancelHandlerAssigned && bookHasReplaced ? handleCancelReplace : undefined;
            if (cancelReplace) cancelHandlerAssigned = true;
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
                onCancelReplace={cancelReplace}
                localizedStrings={searchResultLocalizedStrings}
                isReplaceMode={activeMode === 'replace'}
                isReplacing={isReplacing}
              />
            );
          });
        })()}
      </div>

      {/* Status bar */}
      {searchStatus && (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-border-t tw-pt-4">
          {searchStatus === 'running' && (activeMode !== 'replace' || !isPostReplaceSearch) && (
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
      <Sonner />
    </div>
  );
};
