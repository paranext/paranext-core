import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ArrowLeftRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  TextSearch,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Scope,
  ScopeSelector,
  ScrollGroupSelector,
  Spinner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { FindJobStatus, WordRestriction } from 'platform-scripture';
import { formatReplacementString } from 'platform-bible-utils';
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

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [submittedBookIds, setSubmittedBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [submittedShouldMatchCase, setSubmittedShouldMatchCase] = useState(false);
  const [searchTextType, setSearchTextType] = useState<'all' | 'verseOnly'>('all');
  const [wordRestriction, setWordRestriction] = useState<WordRestriction>('none');
  const [submittedWordRestriction, setSubmittedWordRestriction] = useState<WordRestriction>('none');
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);
  const [submittedIsRegexAllowed, setSubmittedIsRegexAllowed] = useState(false);

  const [activeMode, setActiveMode] = useState<'find' | 'replace'>('find');
  const [replaceTerm, setReplaceTerm] = useState<string>('');
  const [preserveCase, setPreserveCase] = useState(false);

  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);

  // custom for demo
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);
  const demoTotalResults = searchStatus === 'completed' ? 5 : 0;

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
      wordRestriction !== submittedWordRestriction ||
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
    wordRestriction,
    submittedWordRestriction,
    isRegexAllowed,
    submittedIsRegexAllowed,
  ]);

  const canClearResults = useMemo(
    () => !searchQueryChanged && searchStatus && searchStatus !== 'running',
    [searchQueryChanged, searchStatus],
  );

  const areFiltersActive =
    shouldMatchCase || wordRestriction !== 'none' || searchTextType !== 'all' || isRegexAllowed;

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
    setSubmittedWordRestriction(wordRestriction);
    setSubmittedIsRegexAllowed(isRegexAllowed);
  };

  // custom for demo
  const clearSearchResults = () => {
    setSubmittedSearchTerm('');
  };

  // custom for demo
  const availableBookIds =
    '111111111111111111111111111111111111111111111111111111111111111111100001000000000000000000001100000000000000101000000000000';

  // custom for demo: simplified scope display text
  const scopeDisplayText = useMemo(() => {
    switch (scope) {
      case 'chapter':
        return `${verseRefSetting.book} ${verseRefSetting.chapterNum}`;
      case 'book':
        return verseRefSetting.book;
      case 'selectedBooks':
        return selectedBookIds.length > 0 ? selectedBookIds.join(', ') : '…';
      default:
        return '';
    }
  }, [scope, selectedBookIds, verseRefSetting]);

  return (
    <div className="tw-space-y-3">
      {/* Find/Replace mode toggle */}
      <ToggleGroup
        type="single"
        value={activeMode}
        onValueChange={(value) => {
          if (value) setActiveMode(value as 'find' | 'replace');
        }}
        className="tw-w-fit tw-rounded-lg tw-bg-muted tw-p-1"
      >
        <ToggleGroupItem
          value="find"
          className="tw-gap-1 data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
        >
          <Search className="tw-h-4 tw-w-4" />
          Find
        </ToggleGroupItem>
        <ToggleGroupItem
          value="replace"
          className="tw-gap-1 data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
        >
          <ArrowLeftRight className="tw-h-4 tw-w-4" />
          Replace
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Find input row */}
      <div className="tw-flex tw-gap-2 tw-flex-wrap">
        <div className="tw-relative tw-flex-1">
          <TextSearch className="tw-pointer-events-none tw-absolute tw-left-2 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
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
            className="tw-w-full tw-min-w-16 tw-text-ellipsis !tw-pl-8 !tw-pr-4"
          />
        </div>
        {recentSearches.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Show recent searches">
                <Clock className="tw-h-4 tw-w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
              <div className="tw-py-1">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSearchTerm(item)}
                    className="tw-flex tw-w-full tw-cursor-pointer tw-items-center tw-gap-2 tw-px-3 tw-py-1.5 tw-text-sm hover:tw-bg-accent"
                  >
                    <Clock className="tw-h-4 tw-w-4 tw-opacity-50" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="%webView_find_toggleFilters%"
                    className={areFiltersActive ? 'tw-bg-muted' : ''}
                  >
                    <SlidersHorizontal className="tw-h-4 tw-w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>%webView_find_toggleFilters%</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="tw-w-72 tw-p-3">
            {/* 1. Match content in */}
            <div className="tw-mb-3">
              <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">%webView_find_matchContentIn%</p>
              <div className="tw-flex tw-flex-col tw-gap-1">
                {(
                  [
                    ['all', '%webView_find_allText%'],
                    ['verseOnly', '%webView_find_verseTextOnly%'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSearchTextType(value)}
                    className="tw-flex tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
                  >
                    <span className="tw-w-4 tw-shrink-0 tw-text-center">
                      {searchTextType === value ? '•' : ''}
                    </span>
                    <span>{label}</span>
                    {value === 'all' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="tw-max-w-xs">%webView_find_allText_tooltip%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Match boundaries */}
            <div className="tw-mb-3">
              <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">%webView_find_restrictions%</p>
              <div className="tw-flex tw-flex-col tw-gap-1">
                {(
                  [
                    ['none', '%webView_find_restrictions_none%'],
                    ['wholeWord', '%webView_find_restrictions_wholeWord%'],
                    ['startOfWord', '%webView_find_restrictions_startOfWord%'],
                    ['endOfWord', '%webView_find_restrictions_endOfWord%'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWordRestriction(value)}
                    className="tw-flex tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
                  >
                    <span className="tw-w-4 tw-shrink-0 tw-text-center">
                      {wordRestriction === value ? '•' : ''}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Capitalization */}
            <div className="tw-mb-3">
              <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">%webView_find_capitalization%</p>
              <button
                type="button"
                onClick={() => setShouldMatchCase(!shouldMatchCase)}
                className="tw-flex tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
              >
                <span className="tw-w-4 tw-shrink-0 tw-text-center">
                  {shouldMatchCase ? '•' : ''}
                </span>
                <span>%webView_find_matchCase%</span>
              </button>
            </div>

            {/* 4. Pattern */}
            <div>
              <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">%webView_find_pattern%</p>
              <button
                type="button"
                onClick={() => setIsRegexAllowed(!isRegexAllowed)}
                className="tw-flex tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
              >
                <span className="tw-w-4 tw-shrink-0 tw-text-center">
                  {isRegexAllowed ? '•' : ''}
                </span>
                <span>%webView_find_allowRegex%</span>
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {canClearResults ? (
                <Button onClick={() => clearSearchResults()}>
                  %webView_find_clearSearchResults%
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

      {/* Scope selector row */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="tw-h-auto tw-gap-1 tw-px-2 tw-py-1 tw-font-normal"
            >
              <span className="tw-text-sm tw-text-muted-foreground">Showing</span>
              <span className="tw-text-sm tw-font-medium">{scopeDisplayText}</span>
              <ChevronDown className="tw-h-3 tw-w-3 tw-text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="tw-w-auto tw-p-3">
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
              <div className="tw-mt-3 tw-flex tw-flex-col tw-items-start tw-gap-2">
                <Label>%webView_find_scrollGroup%</Label>
                <ScrollGroupSelector
                  availableScrollGroupIds={[undefined, ...Array(5).keys()]}
                  onChangeScrollGroupId={setScrollGroupId}
                  scrollGroupId={scrollGroupId}
                />
              </div>
            )}
          </PopoverContent>
        </Popover>
        {demoTotalResults > 0 && (
          <div className="tw-flex tw-items-center tw-gap-1">
            <span className="tw-text-sm tw-text-muted-foreground tw-tabular-nums">
              {formatReplacementString('{current} of {total}', {
                current: focusedResultIndex !== undefined ? String(focusedResultIndex + 1) : '–',
                total: String(demoTotalResults),
              })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="tw-h-7 tw-w-7"
              disabled={focusedResultIndex === undefined || focusedResultIndex === 0}
              onClick={() =>
                setFocusedResultIndex((prev) => (prev !== undefined && prev > 0 ? prev - 1 : prev))
              }
              aria-label="Previous result"
            >
              <ChevronUp className="tw-h-4 tw-w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="tw-h-7 tw-w-7"
              disabled={focusedResultIndex === demoTotalResults - 1}
              onClick={() =>
                setFocusedResultIndex((prev) =>
                  prev === undefined ? 0 : Math.min(prev + 1, demoTotalResults - 1),
                )
              }
              aria-label="Next result"
            >
              <ChevronDown className="tw-h-4 tw-w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Replace input row — shown in Replace mode */}
      {activeMode === 'replace' && (
        <>
          <div className="tw-relative tw-flex-1">
            <ArrowRight className="tw-pointer-events-none tw-absolute tw-left-2 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
            <Input
              id="replace-term"
              value={replaceTerm}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setReplaceTerm(e.target.value)
              }
              placeholder="%webView_find_replaceTerm_placeholder%"
              className="tw-w-full tw-min-w-16 !tw-pl-8 !tw-pr-4"
            />
          </div>
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-flex-wrap">
            <div className="tw-flex tw-items-center tw-gap-2">
              <Checkbox
                id="preserve-case"
                checked={preserveCase}
                onCheckedChange={(checked: boolean) => setPreserveCase(checked === true)}
              />
              <Label htmlFor="preserve-case" className="tw-cursor-pointer">
                %webView_find_preserveCase%
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground tw-cursor-default" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="tw-max-w-xs tw-whitespace-pre-line">
                      {
                        'Adapts replacement to match original casing:\ngod → lord\nGOD → LORD\nGod → Lord'
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="tw-flex tw-gap-2">
              <Button variant="outline" onClick={() => {}}>
                %webView_find_replaceAll%
              </Button>
              <Button onClick={() => {}}>%webView_find_replace%</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
