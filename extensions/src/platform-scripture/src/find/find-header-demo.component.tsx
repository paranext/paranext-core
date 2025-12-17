import ScopeSelector from '@/components/advanced/scope-selector/scope-selector.component';
import ScrollGroupSelector from '@/components/advanced/scroll-group-selector.component';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import { Scope, Spinner, RecentSearches } from 'platform-bible-react';
import { FindJobStatus } from 'platform-scripture';
import { SetStateAction, useEffect, useMemo, useState } from 'react';

export function FindHeaderDemo() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // custom for demo
  const [verseRefSetting] = useState<SerializedVerseRef>({
    book: 'GEN',
    chapterNum: 1,
    verseNum: 1,
  });
  // custom for demo
  const [scrollGroupId, setScrollGroupId] = useState<number | undefined>();

  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string | undefined>(undefined);
  const [scope, setScope] = useState<Scope>('book');
  const [submittedScope, setSubmittedScope] = useState<Scope | undefined>();
  const [submittedScrollGroupId, setSubmittedScrollGroupId] = useState<number | undefined>();
  const [submittedVerseRef, setSubmittedVerseRef] = useState<SerializedVerseRef | undefined>(
    undefined,
  );

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const [areFiltersShown, setAreFiltersShown] = useState(false);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [submittedBookIds, setSubmittedBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [submittedShouldMatchCase, setSubmittedShouldMatchCase] = useState(false);
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);
  const [submittedIsRegexAllowed, setSubmittedIsRegexAllowed] = useState(false);

  // not used in demo component
  // const [activeJobId, setActiveJobId] = useState<string>();
  // const [searchProgress, setSearchProgress] = useState<number>(0);
  // const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);
  // const [searchError, setSearchError] = useState<string | undefined>();

  // const [results, setResults] = useState<HidableFindResult[]>([]);
  // const [numberOfHiddenResults, setNumberOfHiddenResults] = useState<number>(0);
  // const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);

  // const [editorWebViewId] = useState<string | undefined>(undefined);

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

  const canClearResults = useMemo(
    () => !searchQueryChanged && searchStatus && searchStatus !== 'running',
    [searchQueryChanged, searchStatus],
  );

  const isSearchQueryValid = useMemo(() => {
    if (searchTerm.trim() === '') return false;
    if (scope === 'selectedBooks' && selectedBookIds.length === 0) return false;
    return true;
  }, [searchTerm, scope, selectedBookIds]);

  // custom for demo
  const [findButtonText, setFindButtonText] = useState<string>('');
  useEffect(() => {
    setTimeout(() => setFindButtonText('Finden'), 1000);
  });

  // custom for demo
  const handleStartSearch = () => {
    setSearchStatus('running');
    setTimeout(() => {
      setSearchStatus('completed');
    }, 1000);

    if (!recentSearches.includes(searchTerm)) {
      recentSearches.push(searchTerm);
      setRecentSearches(recentSearches);
    }

    setSubmittedSearchTerm(searchTerm);
    setSubmittedScrollGroupId(scrollGroupId);
    setSubmittedScope(scope);
    setSubmittedVerseRef(verseRefSetting);
    setSubmittedBookIds(selectedBookIds);
    setSubmittedShouldMatchCase(shouldMatchCase);
    setSubmittedIsRegexAllowed(isRegexAllowed);
  };

  // custom for demo
  const clearSearchResults = () => {
    setSubmittedSearchTerm('');
  };

  // custom for demo
  const availableBookIds =
    '111111111111111111111111111111111111111111111111111111111111111111100001000000000000000000001100000000000000101000000000000';

  return (
    <Card>
      <CardContent className="tw-space-y-4 tw-p-6">
        <div className="tw-flex tw-gap-2 tw-flex-wrap">
          <div className="tw-relative tw-flex-1">
            <Input
              id="search-term"
              value={searchTerm}
              /* custom for demo: types added */
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setSearchTerm(e.target.value)
              }
              onKeyDown={(e: { key: string }) => {
                if (e.key === 'Enter') {
                  handleStartSearch();
                }
              }}
              placeholder="%webView_find_searchPlaceholder%"
              className={`tw-w-full tw-min-w-16 tw-text-ellipsis ${recentSearches.length > 0 ? '!tw-pr-10' : '!tw-pr-4'}`}
            />
            <RecentSearches recentSearches={recentSearches} onSearchItemSelect={setSearchTerm} />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAreFiltersShown(!areFiltersShown)}
                  aria-label={'%webView_find_toggleFilters%'}
                  className={areFiltersShown ? 'tw-bg-muted' : ''}
                >
                  <SlidersHorizontal className="tw-h-4 tw-w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>%webView_find_toggleFilters%</TooltipContent>
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
                  <p className="tw-font-light">%webView_find_clearSearchResults%</p>
                ) : (
                  <p className="tw-font-light">%webView_find_findInProject%</p>
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
              selectedBookIds={selectedBookIds}
              onSelectedBookIdsChange={setSelectedBookIds}
              localizedStrings={{}}
              availableBookInfo={availableBookIds}
            />
            {(scope === 'chapter' || scope === 'book') && (
              <div className="tw-flex tw-flex-col tw-items-start tw-gap-4">
                <Label>'%webView_find_scrollGroup%</Label>
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
                onCheckedChange={(checked: boolean) => setShouldMatchCase(checked === true)}
              />
              <Label htmlFor="match-case" className="tw-cursor-pointer">
                %webView_find_matchCase%
              </Label>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-2">
              <Checkbox
                id="show-context"
                checked={isRegexAllowed}
                onCheckedChange={(checked: boolean) => setIsRegexAllowed(checked === true)}
              />
              <Label htmlFor="show-context">%webView_find_allowRegex%</Label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
