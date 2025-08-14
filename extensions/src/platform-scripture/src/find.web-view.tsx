import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import {
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
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
} from 'platform-bible-react';
import {
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import { FindJobStatus, FindResult, FindScope } from 'platform-scripture';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import RecentSearches, { useRecentSearches } from './find/recent-searches.component';
import SearchResult from './find/search-result.component';

type HidableFindResult = FindResult & { isHidden?: boolean };

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_find_allowRegex%',
  '%webView_find_cancelSearch%',
  '%webView_find_clearSearchResults%',
  '%webView_find_errorOccurred%',
  '%webView_find_findButton%',
  '%webView_find_findInProject%',
  '%webView_find_matchCase%',
  '%webView_find_maxResultsExceeded%',
  '%webView_find_noResultsFound%',
  '%webView_find_scopeUndetermined%',
  '%webView_find_scrollGroup%',
  '%webView_find_searchPlaceholder%',
  '%webView_find_showingResults%',
  '%webView_find_toggleFilters%',
];

const defaultBooksPresent: string = '';
const defaultProjectName = '';

global.webViewComponent = function FindWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [searchTerm, setSearchTerm] = useWebViewState<string>('findSearchTerm ', '');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string | undefined>(undefined);
  const [scope, setScope] = useWebViewState<Scope>('findScope', 'book');
  const [submittedScope, setSubmittedScope] = useState<Scope | undefined>();
  const [submittedScrollGroupId, setSubmittedScrollGroupId] = useState<number | undefined>();
  const [submittedVerseRef, setSubmittedVerseRef] = useState<SerializedVerseRef | undefined>(
    undefined,
  );

  const { recentSearches, addRecentSearchTerm } = useRecentSearches(useWebViewState);

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
  const [numberOfHiddenResults, setNumberOfHiddenResults] = useState<number>(0);
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);

  const [verseRefSetting, setVerseRefSetting, scrollGroupId, setScrollGroupId] =
    useWebViewScrollGroupScrRef();

  const findPdp = useProjectDataProvider('platformScripture.findInScripture', projectId);

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  const [scopeSelectorLocalizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(SCOPE_SELECTOR_STRING_KEYS);
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

  // #region Search related functions

  const isSearchQueryValid = useMemo(() => {
    if (searchTerm.trim() === '') return false;
    if (scope === 'selectedBooks' && selectedBookIds.length === 0) return false;
    return true;
  }, [searchTerm, scope, selectedBookIds]);

  const handleStartSearch = async () => {
    if (!isSearchQueryValid || !findPdp) return;

    addRecentSearchTerm(searchTerm);

    const findScope = (): FindScope[] => {
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
    };

    try {
      if (activeJobId) {
        try {
          await findPdp.abandonFindJob(activeJobId);
          setActiveJobId(undefined);
        } catch (error) {
          logger.error('Error abandoning previous search job:', error);
        }
      }

      try {
        const jobId = await findPdp.beginFindJob({
          scope: findScope(),
          searchString: searchTerm,
          caseInsensitive: !shouldMatchCase,
          useRegex: isRegexAllowed,
        });
        setActiveJobId(jobId);
      } catch (error) {
        logger.error('Error starting search job:', error);
      }

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
      setNumberOfHiddenResults(0);
    } catch (error) {
      logger.error('Error starting search:', error);
      setActiveJobId(undefined);

      setSearchStatus('errored');
      setSearchProgress(0);

      setSubmittedSearchTerm('');
      setSubmittedScope(undefined);
      setSubmittedScrollGroupId(undefined);
      setSubmittedVerseRef(undefined);
    }
  };

  const clearSearchResults = async () => {
    setActiveJobId(undefined);
    setResults([]);
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

    if (activeJobId && findPdp) {
      try {
        await findPdp.cleanUpFindJob(activeJobId);
      } catch (error) {
        logger.error('Error cleaning up search job:', error);
      }
    }
  };

  const handleStopSearch = async (shouldClearResults?: boolean) => {
    setSearchProgress(0);
    if (activeJobId && findPdp) {
      if (shouldClearResults) {
        setResults([]);
        setNumberOfHiddenResults(0);
        try {
          await findPdp.abandonFindJob(activeJobId);
        } catch (error) {
          logger.error('Error stopping search job:', error);
        }
      } else
        try {
          const isStoppedSuccessfully = await findPdp.stopFindJob(activeJobId);
          if (!isStoppedSuccessfully) logger.error('Error stopping search job.');
        } catch (error) {
          logger.error('Error stopping search job:', error);
        }
    }
  };

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
    if (!activeJobId || !findPdp) return;

    try {
      const update = await findPdp.retrieveFindJobUpdate(activeJobId, 100);
      const newResults = update.nextResults || [];

      if (newResults.length > 0) {
        setResults((prev) => {
          const currentResults = prev || [];
          return [...currentResults, ...newResults];
        });
      }
    } catch (error) {
      logger.error('Error loading more results:', error);
    }
  }, [activeJobId, findPdp]);

  const handleResultsScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage > 0.9 && activeJobId && results.length < totalNumberOfResults) {
      loadMoreResults();
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkForUpdates = async () => {
      if (!activeJobId || !findPdp) return;

      try {
        const update = await findPdp.retrieveFindJobUpdate(activeJobId, 0);

        setSearchProgress(update.percentComplete);
        setTotalNumberOfResults(update.totalResultsCount);
        setSearchStatus(update.status);
        setSearchError(update.error);

        if (Array.isArray(update.nextResults) && results.length < 100) loadMoreResults();

        if (searchStatus === 'running') {
          timeoutId = setTimeout(checkForUpdates, 100);
        }
      } catch (error) {
        logger.error('Error checking search results:', error);
        setSearchStatus('errored');
      }
    };

    checkForUpdates();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeJobId, findPdp, results.length, loadMoreResults, searchStatus]);

  // #endregion

  // Cleanup function that runs when component unmounts
  useEffect(() => {
    return () => {
      if (activeJobId && findPdp) {
        // We can't use async/await in the cleanup function, so we'll use .catch
        findPdp.abandonFindJob(activeJobId).catch((error) => {
          logger.error('Error abandoning search job during cleanup:', error);
        });
      }
    };
    // We only want this useEffect to run on unmounting the component, so dependencies are empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getScopeSummaryText = () => {
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
  };

  const handleFocusedResultChange = (verseRef: SerializedVerseRef, index: number) => {
    setFocusedResultIndex(index);
    setVerseRefSetting(verseRef);
  };

  const handleHideResult = (index: number) => {
    setResults((prevResults) =>
      prevResults.map((prevResult, i) =>
        i === index ? { ...prevResult, isHidden: true } : prevResult,
      ),
    );
    setNumberOfHiddenResults((prevCount) => prevCount + 1);
    setFocusedResultIndex(undefined);
  };

  const getOccurrenceInVerseIndex = (currentIndex: number): number => {
    const currentResult = results[currentIndex];
    let occurrenceIndex = 0;

    for (let i = currentIndex - 1; i >= 0; i--) {
      const prevResult = results[i];

      if (
        prevResult.verseRef.book !== currentResult.verseRef.book ||
        prevResult.verseRef.chapterNum !== currentResult.verseRef.chapterNum ||
        prevResult.verseRef.verseNum !== currentResult.verseRef.verseNum
      ) {
        break;
      }

      occurrenceIndex += 1;
    }

    return occurrenceIndex;
  };

  const canClearResults = useMemo(
    () => !searchQueryChanged && searchStatus && searchStatus !== 'running',
    [searchQueryChanged, searchStatus],
  );

  return (
    <div className="tw-container tw-mx-auto tw-flex tw-max-h-screen tw-flex-col tw-gap-6 tw-p-4">
      {/* Header with searchbar and filters */}
      <Card>
        <CardContent className="tw-space-y-4 tw-p-6">
          <div className="tw-flex tw-gap-2">
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
                className={`tw-text-ellipsis tw-w-full ${recentSearches.length > 0 ? '!tw-pr-10' : '!tw-pr-4'}`}
              />
              <RecentSearches recentSearches={recentSearches} onSearchTermSelect={setSearchTerm} />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAreFiltersShown(!areFiltersShown)}
              aria-label={localizedStrings['%webView_find_toggleFilters%']}
              className={areFiltersShown ? 'tw-bg-muted' : ''}
            >
              <SlidersHorizontal className="tw-h-4 tw-w-4" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {canClearResults ? (
                    <Button onClick={() => clearSearchResults()}>
                      <SearchX />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStartSearch}
                      disabled={!isSearchQueryValid || searchStatus === 'running'}
                    >
                      {searchStatus === 'running' ? (
                        <Spinner />
                      ) : (
                        localizedStrings['%webView_find_findButton%']
                      )}
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
                    // https://github.com/paranext/paranext-core/issues/788
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
        {submittedScope && submittedSearchTerm
          ? `${projectName} · ${getScopeSummaryText()} · Find: ${submittedSearchTerm}`
          : formatReplacementString(localizedStrings['%webView_find_findInProject%'], {
              projectName,
            })}
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
        className="tw-min-h-48 tw-flex-1 tw-space-y-2 tw-overflow-y-auto"
        onScroll={handleResultsScroll}
      >
        {results &&
          results.map((result, index) => {
            const occurrenceInVerseIndex = getOccurrenceInVerseIndex(index);
            return (
              <SearchResult
                key={`${result.verseRef.book + result.verseRef.chapterNum}:${result.verseRef.verseNum}${result.text}${occurrenceInVerseIndex}`}
                searchResult={result}
                globalResultsIndex={index}
                isSelected={index === focusedResultIndex}
                projectId={projectId}
                localizedBookData={localizedBookData}
                occurrenceInVerseIndex={occurrenceInVerseIndex}
                onResultClick={handleFocusedResultChange}
                onHideResult={handleHideResult}
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
            results && (
              <p className="tw-font-light">
                {results.length > 0
                  ? formatReplacementString(localizedStrings['%webView_find_showingResults%'], {
                      visibleNumber: (results.length - numberOfHiddenResults).toString(),
                      totalNumber: totalNumberOfResults.toString(),
                    })
                  : localizedStrings['%webView_find_noResultsFound%']}
              </p>
            )}
          {searchStatus === 'exceeded' && (
            <p className="tw-font-light">{localizedStrings['%webView_find_maxResultsExceeded%']}</p>
          )}
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
