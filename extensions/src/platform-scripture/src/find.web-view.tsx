import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import {
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
} from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { Clock, Copy, MoreVertical, SearchX, SlidersHorizontal, X } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Scope,
  SCOPE_SELECTOR_STRING_KEYS,
  ScopeSelector,
  Skeleton,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { FindJobStatus, FindResult, FindScope } from 'platform-scripture';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const defaultBooksPresent: string = '';
const defaultProjectName = '';
const defaultFocusedResultVerseRef: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
};

const getScopeText = (
  scope: Scope | undefined,
  verseRef: SerializedVerseRef,
  selectedTextText: string,
  selectedBookIds: string[],
) => {
  switch (scope) {
    case 'selectedText':
      return selectedTextText;
    case 'verse':
      return `${verseRef.book} ${verseRef.chapterNum}:${verseRef.verseNum}`;
    case 'chapter':
      return `${verseRef.book} ${verseRef.chapterNum}`;
    case 'book':
      return verseRef.book;
    case 'selectedBooks':
      return selectedBookIds.join(' ');
    default:
      return 'scope undetermined'; // todo
  }
};

global.webViewComponent = function FindWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string | undefined>(undefined);
  const [scope, setScope] = useWebViewState<Scope>('findScope', 'book');
  const [submittedScope, setSubmittedScope] = useState<Scope | undefined>();

  const [recentSearches, setRecentSearches] = useWebViewState<string[]>('findRecentSearches', []);
  const [isRecentSearchesPopoverOpen, setIsRecentSearchesPopoverOpen] = useState(false);

  const [areFiltersShown, setAreFiltersShown] = useState(false);
  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
    'findSelectedBookIds',
    [],
  );
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);

  const [activeJobId, setActiveJobId] = useState<string>();
  const [searchProgress, setSearchProgress] = useState<number>(0);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);
  const [searchError, setSearchError] = useState<string | undefined>();

  const [results, setResults] = useState<FindResult[]>([]);
  const [numberOfDismissedResults, setNumberOfDismissedResults] = useState<number>(0);
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);
  const [focusedResultVerseRef, setFocusedResultVerseRef] = useState<SerializedVerseRef>(
    defaultFocusedResultVerseRef,
  );

  const [verseRefSetting, setVerseRefSetting] = useWebViewScrollGroupScrRef();

  const findPdp = useProjectDataProvider('platformScripture.findInScripture', projectId);

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

  const handleStartSearch = async () => {
    if (!searchTerm.trim() || !findPdp) return;

    // Add the current search term to recent searches, moving it to the top if it already exists
    const recentSearchesWithoutCurrent = recentSearches.filter((term) => term !== searchTerm);
    const updatedRecentSearches = [searchTerm, ...recentSearchesWithoutCurrent.slice(0, 14)];
    setRecentSearches(updatedRecentSearches);

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

      setResults([]);
      setNumberOfDismissedResults(0);
    } catch (error) {
      logger.error('Error starting search:', error);
      setActiveJobId(undefined);

      setSearchStatus('errored');
      setSearchProgress(0);

      setSubmittedSearchTerm('');
      setSubmittedScope(undefined);
    }
  };

  const clearSearchResults = async () => {
    setActiveJobId(undefined);
    setResults([]);
    setNumberOfDismissedResults(0);

    setSearchStatus(undefined);
    setSearchProgress(0);
    setSearchError(undefined);

    setSubmittedSearchTerm(undefined);
    setSubmittedScope(undefined);

    setFocusedResultIndex(0);
    setFocusedResultVerseRef(defaultFocusedResultVerseRef);

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

  // Handle scroll event for infinite scrolling
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Load more results when user scrolls to 80% of the container
    if (
      scrollPercentage > 0.8 &&
      activeJobId &&
      results.length + numberOfDismissedResults < totalNumberOfResults
    ) {
      loadMoreResults();
    }
  };

  // periodically update search progress
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkForUpdates = async () => {
      if (!activeJobId || !findPdp) return;

      try {
        const update = await findPdp.retrieveFindJobUpdate(activeJobId, 0);

        // Update progress
        setSearchProgress(update.percentComplete);
        setTotalNumberOfResults(update.totalResultsCount);
        setSearchStatus(update.status);
        setSearchError(update.error);

        if (Array.isArray(update.nextResults) && results.length === 0) loadMoreResults();

        // Schedule next check
        timeoutId = setTimeout(checkForUpdates, 500);
      } catch (error) {
        logger.error('Error checking search results:', error);
        setSearchStatus('errored');
      }
    };

    if (searchStatus === 'running') {
      checkForUpdates();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeJobId, findPdp, results.length, loadMoreResults, searchStatus]);

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
    // We only want this useEffect to run on unmounting the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // #endregion

  const [currentProjectVersePossiblyError, , isFocusedVerseTextLoading] = useProjectData(
    'platformScripture.PlainText_Verse',
    projectId ?? undefined,
  ).VersePlainText(focusedResultVerseRef, 'loading verse text...');

  const focusedVerseText = useMemo(() => {
    if (isPlatformError(currentProjectVersePossiblyError)) {
      return getErrorMessage(currentProjectVersePossiblyError);
    }
    return currentProjectVersePossiblyError;
  }, [currentProjectVersePossiblyError]);

  const getFocusedVerseText = (resultText: string) => {
    if (!focusedVerseText || !resultText) return focusedVerseText;

    const searchIndex = focusedVerseText.toLowerCase().indexOf(resultText.toLowerCase());

    if (searchIndex === -1) return focusedVerseText;

    const beforeText = focusedVerseText.substring(0, searchIndex);
    const matchText = focusedVerseText.substring(searchIndex, searchIndex + resultText.length);
    const afterText = focusedVerseText.substring(searchIndex + resultText.length);

    return (
      <>
        {beforeText}
        <strong>{matchText}</strong>
        {afterText}
      </>
    );
  };

  const handleFocusedResultChange = (verseRef: SerializedVerseRef, index: number) => {
    setFocusedResultIndex(index);
    setFocusedResultVerseRef(verseRef);
    setVerseRefSetting(verseRef);
  };

  return (
    <div className="tw-container tw-mx-auto tw-flex tw-max-h-screen tw-flex-col tw-gap-6 tw-p-4">
      <Card>
        <CardContent className="tw-space-y-4 tw-p-6">
          <div className="tw-flex tw-gap-2">
            <div className="tw-relative tw-flex-1">
              <Input
                id="search-term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search text..."
                className="tw-w-full tw-pr-10"
              />
              {recentSearches.length > 0 && (
                <Popover
                  open={isRecentSearchesPopoverOpen}
                  onOpenChange={setIsRecentSearchesPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2"
                      aria-label="Show recent searches"
                    >
                      <Clock className="tw-h-4 tw-w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup heading="Recent">
                          {recentSearches.map((term) => (
                            <CommandItem
                              key={term}
                              onSelect={() => {
                                setSearchTerm(term);
                                setIsRecentSearchesPopoverOpen(false);
                              }}
                              className="tw-flex tw-items-center"
                            >
                              <Clock className="tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" />
                              <span>{term}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAreFiltersShown(!areFiltersShown)}
              aria-label="Toggle options"
              className={areFiltersShown ? 'tw-bg-muted' : ''}
            >
              <SlidersHorizontal className="tw-h-4 tw-w-4" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {searchStatus && searchStatus !== 'running' ? (
                    <Button onClick={() => clearSearchResults()}>
                      <SearchX />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStartSearch}
                      disabled={searchStatus === 'running' || !searchTerm.trim()}
                    >
                      {searchStatus === 'running' ? <Spinner /> : 'Find'}
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {searchStatus && searchStatus !== 'running' ? (
                    <p className="tw-font-light">Clear search results</p>
                  ) : (
                    <p className="tw-font-light">{`Find in Project ${projectName}`}</p>
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

              <div className="tw-flex tw-items-center tw-space-x-2">
                <Checkbox
                  id="match-case"
                  checked={shouldMatchCase}
                  onCheckedChange={(checked) => setShouldMatchCase(checked === true)}
                />
                <Label htmlFor="match-case" className="tw-cursor-pointer">
                  Match case
                </Label>
              </div>

              <div className="tw-flex tw-items-center tw-space-x-2">
                <Checkbox
                  id="show-context"
                  checked={isRegexAllowed}
                  onCheckedChange={(checked) => setIsRegexAllowed(checked === true)}
                />
                <Label htmlFor="show-context">Allow regex</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Query Summary */}
      {submittedScope && submittedSearchTerm && (
        <div className="tw-text-sm tw-font-medium tw-text-muted-foreground">
          {projectName} ·{' '}
          {getScopeText(
            submittedScope,
            verseRefSetting,
            scopeSelectorLocalizedStrings['%webView_scope_selector_selected_text%'],
            selectedBookIds,
          )}{' '}
          · Find: {submittedSearchTerm}
        </div>
      )}

      {/* Search Results Placeholder */}
      {results && results.length === 0 && searchStatus === 'running' && (
        <div className="tw-space-y-2">
          {Array.from({ length: 5 }).map(() => (
            <Card key={crypto.randomUUID()}>
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
      <div className="tw-min-h-0 tw-flex-1 tw-space-y-2 tw-overflow-y-auto" onScroll={handleScroll}>
        {results &&
          results.map((result, index) => (
            <Card
              key={
                // eslint-disable-next-line react/no-array-index-key
                result.verseRef.book +
                result.verseRef.chapterNum +
                result.verseRef.verseNum +
                result.text +
                index
              }
              className={`tw-cursor-pointer ${index === focusedResultIndex ? 'tw-bg-primary-foreground' : 'tw-bg-primary-foreground/10'}`}
              onClick={() => handleFocusedResultChange(result.verseRef, index)}
            >
              <CardContent className="tw-p-4">
                <div className="tw-flex tw-items-start tw-justify-between">
                  <div className="tw-font-medium">
                    {result.verseRef.book} {result.verseRef.chapterNum}:{result.verseRef.verseNum}{' '}
                    {submittedSearchTerm}
                  </div>
                  {index === focusedResultIndex && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8">
                          <MoreVertical className="tw-h-4 tw-w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          className="tw-flex tw-flex-row"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(
                              `${result.verseRef.book} ${result.verseRef.chapterNum}:${result.verseRef.verseNum}`,
                            );
                          }}
                        >
                          <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                          <span>Copy reference</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="tw-flex tw-flex-row"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (focusedVerseText) navigator.clipboard.writeText(focusedVerseText);
                          }}
                        >
                          <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                          <span>Copy verse text</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="tw-flex tw-flex-row"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(
                              `${result.verseRef.book} ${result.verseRef.chapterNum}:${result.verseRef.verseNum} - ${focusedVerseText ?? 'No verse text available'}`,
                            );
                          }}
                        >
                          <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                          <span>Copy reference and verse text</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="tw-flex tw-flex-row"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResults((prevResults) => prevResults.filter((_, i) => i !== index));
                            setFocusedResultIndex(undefined);
                            setNumberOfDismissedResults((prev) => (prev ?? 0) + 1);
                          }}
                        >
                          <X className="tw-mr-2 tw-h-4 tw-w-4" />
                          <span>Dismiss</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                {index === focusedResultIndex && !isFocusedVerseTextLoading && (
                  <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
                    {getFocusedVerseText(result.text)}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {searchStatus && (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-border-t tw-pt-4">
          {searchStatus === 'running' && (
            <div className="tw-flex tw-items-center tw-gap-4">
              <Progress value={searchProgress} className="tw-w-64" />
              <Button onClick={() => handleStopSearch(false)}>Abort search</Button>
            </div>
          )}
          {(searchStatus === 'completed' ||
            searchStatus === 'stopped' ||
            searchStatus === 'exceeded') &&
            results && (
              <p className="tw-font-light">
                {results.length > 0
                  ? `Showing ${results.length} of ${totalNumberOfResults} results`
                  : 'No results found'}
              </p>
            )}
          {searchStatus === 'exceeded' && (
            <p className="tw-font-light">
              The maximum number of results was exceeded for this query
            </p>
          )}
          {searchStatus === 'errored' && searchError && (
            <p className="tw-font-light">{`An error occured: ${searchError}`}</p>
          )}
        </div>
      )}
    </div>
  );
};
