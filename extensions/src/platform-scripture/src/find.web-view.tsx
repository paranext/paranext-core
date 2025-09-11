import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
  useWebViewController,
} from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
  Progress,
  RecentSearches,
  Scope,
  SCOPE_SELECTOR_STRING_KEYS,
  ScopeSelector,
  ScrollGroupSelector,
  Skeleton,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useRecentSearches,
} from 'platform-bible-react';
import {
  formatReplacementString,
  formatReplacementStringToArray,
  getErrorMessage,
  groupBy,
  isPlatformError,
  LocalizeKey,
  Mutex,
} from 'platform-bible-utils';
import { FindJobStatus, FindJobStatusReport, FindOptions, FindScope } from 'platform-scripture';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './find/search-result.component';
import { SearchResultsInBook } from './find/search-results-in-book.component';

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_find_allowRegex%',
  '%webView_find_cancelSearch%',
  '%webView_find_clearSearchResults%',
  '%webView_find_errorOccurred%',
  '%webView_find_findButton%',
  '%webView_find_findInProject%',
  '%webView_find_matchCase%',
  '%webView_find_noResultsFound%',
  '%webView_find_scopeSummary_format%',
  '%webView_find_showRecentSearches%',
  '%webView_find_recent%',
  '%webView_find_scopeUndetermined%',
  '%webView_find_scrollGroup%',
  '%webView_find_searchPlaceholder%',
  '%webView_find_result%',
  '%webView_find_showingResults%',
  '%webView_find_showingResultsOfMore%',
  '%webView_find_toggleFilters%',
  '%webView_find_showRecentSearches%',
  '%webView_find_recent%',
];

const defaultBooksPresent: string = '';
const defaultProjectName = '';
const findPdpMutex = new Mutex();
const RESULTS_BATCH_SIZE = 100;

global.webViewComponent = function FindWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [searchTerm, setSearchTerm] = useWebViewState<string>('findSearchTerm', '');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string | undefined>(undefined);
  const [scope, setScope] = useWebViewState<Scope>('findScope', 'book');
  const [submittedScope, setSubmittedScope] = useState<Scope | undefined>();
  const [submittedScrollGroupId, setSubmittedScrollGroupId] = useState<number | undefined>();
  const [submittedVerseRef, setSubmittedVerseRef] = useState<SerializedVerseRef | undefined>(
    undefined,
  );

  const [recentSearches, setRecentSearches] = useWebViewState<string[]>('findRecentSearches', []);

  const addRecentSearchItem = useRecentSearches(recentSearches, setRecentSearches);

  const [areFiltersShown, setAreFiltersShown] = useState(false);
  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
    'findSelectedBookIds',
    [],
  );
  const [submittedBookIds, setSubmittedBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [submittedShouldMatchCase, setSubmittedShouldMatchCase] = useState(false);
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);
  const [submittedIsRegexAllowed, setSubmittedIsRegexAllowed] = useState(false);

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

  const [verseRefSetting, setVerseRefSetting, scrollGroupId, setScrollGroupId] =
    useWebViewScrollGroupScrRef();

  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );

  const findPdp = useProjectDataProvider('platformScripture.findInScripture', projectId);

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
    const data = new Map<string, { localizedId: string; localizedName: string }>();
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

  const isStartingSearchRef = useRef(false);

  const handleStartSearch = useCallback(async () => {
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
      });
      if (!isMountedRef.current) return;

      setSearchStatus('running');
      setSearchProgress(0);

      setSubmittedSearchTerm(searchTerm);
      setSubmittedScope(scope);
      setSubmittedScrollGroupId(scrollGroupId);
      setSubmittedVerseRef(verseRefSetting);
      setSubmittedBookIds(selectedBookIds);
      setSubmittedShouldMatchCase(shouldMatchCase);
      setSubmittedIsRegexAllowed(isRegexAllowed);
      setFocusedResultIndex(undefined);

      setResults([]);
      loadedResultsLengthRef.current = 0;
      setNumberOfHiddenResults(0);
    } catch (error) {
      logger.error('Error starting search:', error);

      setSearchStatus('errored');
      setSearchProgress(0);

      setSubmittedSearchTerm('');
      setSubmittedScope(undefined);
      setSubmittedScrollGroupId(undefined);
      setSubmittedVerseRef(undefined);
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
    scrollGroupId,
    searchTerm,
    selectedBookIds,
    shouldMatchCase,
    verseRefSetting,
  ]);

  const clearSearchResults = useCallback(async () => {
    await abandonFindJob();
    if (!isMountedRef.current) return;

    setResults([]);
    loadedResultsLengthRef.current = 0;
    setNumberOfHiddenResults(0);

    setSearchStatus(undefined);
    setSearchProgress(0);
    setSearchError(undefined);

    setSubmittedSearchTerm(undefined);
    setSubmittedScope(undefined);
    setSubmittedScrollGroupId(undefined);
    setSubmittedVerseRef(undefined);
    setSubmittedBookIds([]);
    setSubmittedShouldMatchCase(false);
    setSubmittedIsRegexAllowed(false);

    setFocusedResultIndex(undefined);
  }, [abandonFindJob]);

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

  const searchQueryChanged = useMemo(() => {
    return (
      searchTerm.trim() !== submittedSearchTerm ||
      scrollGroupId !== submittedScrollGroupId ||
      scope !== submittedScope ||
      (scope === 'chapter' &&
        (verseRefSetting.book !== submittedVerseRef?.book ||
          verseRefSetting.chapterNum !== submittedVerseRef?.chapterNum)) ||
      (scope === 'book' && verseRefSetting.book !== submittedVerseRef?.book) ||
      (scope === 'selectedBooks' &&
        selectedBookIds.sort().join(',') !== submittedBookIds.sort().join(',')) ||
      shouldMatchCase !== submittedShouldMatchCase ||
      isRegexAllowed !== submittedIsRegexAllowed
    );
  }, [
    searchTerm,
    submittedSearchTerm,
    verseRefSetting,
    submittedVerseRef,
    scope,
    submittedScope,
    scrollGroupId,
    submittedScrollGroupId,
    selectedBookIds,
    submittedBookIds,
    shouldMatchCase,
    submittedShouldMatchCase,
    isRegexAllowed,
    submittedIsRegexAllowed,
  ]);

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

  const scopeSummaryText = useMemo(() => {
    if (!submittedScope || !submittedVerseRef)
      return localizedStrings['%webView_find_scopeUndetermined%'];

    const localizedBookName =
      localizedBookData.get(submittedVerseRef.book)?.localizedId ?? submittedVerseRef.book;

    switch (submittedScope) {
      case 'selectedText':
        return scopeSelectorLocalizedStrings['%webView_scope_selector_selected_text%'];
      case 'verse':
        return `${localizedBookName} ${submittedVerseRef.chapterNum}:${submittedVerseRef.verseNum}`;
      case 'chapter':
        return `${localizedBookName} ${submittedVerseRef.chapterNum}`;
      case 'book':
        return localizedBookName;
      case 'selectedBooks':
        return submittedBookIds
          .map((bookId) => localizedBookData.get(bookId)?.localizedId)
          .join(' ');
      default:
        return localizedStrings['%webView_find_scopeUndetermined%'];
    }
  }, [
    localizedBookData,
    localizedStrings,
    scopeSelectorLocalizedStrings,
    submittedBookIds,
    submittedScope,
    submittedVerseRef,
  ]);

  const handleFocusedResultChange = useCallback(
    (searchResult: HidableFindResult, index: number) => {
      setFocusedResultIndex(index);
      setVerseRefSetting(searchResult.start.verseRef);
      if (editorWebViewId && editorWebViewController) {
        papi.window.setFocus({ focusType: 'webView', id: editorWebViewId });
        editorWebViewController.selectRange(searchResult);
      }
    },
    [editorWebViewController, editorWebViewId, setVerseRefSetting],
  );

  const handleHideResult = useCallback(
    (index: number) => {
      setResults((prevResults) =>
        prevResults.map((prevResult, i) =>
          i === index ? { ...prevResult, isHidden: true } : prevResult,
        ),
      );
      setNumberOfHiddenResults((prevCount) => prevCount + 1);
      setFocusedResultIndex(undefined);
    },
    [setFocusedResultIndex, setNumberOfHiddenResults, setResults],
  );

  const canClearResults = useMemo(
    () => !searchQueryChanged && searchStatus && searchStatus !== 'running',
    [searchQueryChanged, searchStatus],
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

  const findButtonText = isLocalizedStringsLoading
    ? ''
    : localizedStrings['%webView_find_findButton%'];

  return (
    <div className="pr-twp tw-container tw-mx-auto tw-flex tw-flex-col tw-gap-4 tw-p-4 tw-min-w-[10rem] tw-max-h-screen">
      {/* Header with searchbar and filters */}
      <Card>
        <CardContent className="tw-space-y-4 tw-p-6">
          <div className="tw-flex tw-gap-2 tw-flex-wrap">
            <div className="tw-relative tw-flex-1">
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
                className={`tw-w-full tw-min-w-16 tw-text-ellipsis ${recentSearches.length > 0 ? '!tw-pr-10' : '!tw-pr-4'} scripture-font`}
              />
              <RecentSearches
                classNameForItems="scripture-font"
                recentSearches={recentSearches}
                onSearchItemSelect={setSearchTerm}
                ariaLabel={localizedStrings['%webView_find_showRecentSearches%']}
                groupHeading={localizedStrings['%webView_find_recent%']}
              />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAreFiltersShown(!areFiltersShown)}
                    aria-label={localizedStrings['%webView_find_toggleFilters%']}
                    className={areFiltersShown ? 'tw-bg-muted' : ''}
                  >
                    <SlidersHorizontal className="tw-h-4 tw-w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{localizedStrings['%webView_find_toggleFilters%']}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  {canClearResults ? (
                    <Button onClick={() => clearSearchResults()}>
                      <SearchX />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStartSearch}
                      disabled={
                        !isSearchQueryValid || searchStatus === 'running' || findButtonText === ''
                      }
                    >
                      {searchStatus === 'running' ? <Spinner /> : findButtonText}
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {canClearResults ? (
                    <p className="tw-font-light">
                      {localizedStrings['%webView_find_clearSearchResults%']}
                    </p>
                  ) : (
                    <p className="tw-font-light">
                      {formatReplacementString(localizedStrings['%webView_find_findInProject%'], {
                        projectName,
                      })}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {areFiltersShown && (
            <div className="tw-space-y-4 tw-border-t tw-pt-4">
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
              {(scope === 'chapter' || scope === 'book') && (
                <div className="tw-flex tw-flex-col tw-gap-4 tw-items-start">
                  <Label>{localizedStrings['%webView_find_scrollGroup%']}</Label>
                  <ScrollGroupSelector
                    // This is kinda hacky, but the real scrollgroup keys are also defined like this
                    // in the `availableScrollGroupIds` variable in
                    // `src\renderer\services\scroll-group.service-host.ts`
                    // Both there and here they are a placeholder to be replaced as part of
                    // https://paratextstudio.atlassian.net/browse/PT-1514
                    availableScrollGroupIds={[undefined, ...Array(5).keys()]}
                    onChangeScrollGroupId={setScrollGroupId}
                    scrollGroupId={scrollGroupId}
                  />
                </div>
              )}

              <div className="tw-flex tw-items-center tw-space-x-2">
                <Checkbox
                  id="match-case"
                  checked={shouldMatchCase}
                  onCheckedChange={(checked) => setShouldMatchCase(checked === true)}
                />
                <Label htmlFor="match-case" className="tw-cursor-pointer">
                  {localizedStrings['%webView_find_matchCase%']}
                </Label>
              </div>

              <div className="tw-flex tw-items-center tw-space-x-2">
                <Checkbox
                  id="show-context"
                  checked={isRegexAllowed}
                  onCheckedChange={(checked) => setIsRegexAllowed(checked === true)}
                />
                <Label htmlFor="show-context">
                  {localizedStrings['%webView_find_allowRegex%']}
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Query Summary */}
      <div className="tw-text-sm tw-font-medium tw-text-muted-foreground">
        {submittedScope && submittedSearchTerm ? (
          <>
            {formatReplacementStringToArray(
              localizedStrings['%webView_find_scopeSummary_format%'],
              {
                projectName,
                scope: scopeSummaryText,
                searchTerm: <span className="scripture-font">{submittedSearchTerm}</span>,
              },
            )}
          </>
        ) : (
          formatReplacementString(localizedStrings['%webView_find_findInProject%'], {
            projectName,
          })
        )}
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
              localizedStrings={searchResultLocalizedStrings}
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
            results && <p className="tw-font-light">{resultsMessage}</p>}
          {searchStatus === 'errored' && searchError && (
            <p className="tw-font-light">
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
