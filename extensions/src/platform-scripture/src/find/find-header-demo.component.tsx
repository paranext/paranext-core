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
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RecentSearches,
  Scope,
  ScopeSelector,
  Spinner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useRecentSearches,
} from 'platform-bible-react';
import { FindJobStatus, WordRestriction } from 'platform-scripture';
import { formatReplacementString } from 'platform-bible-utils';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { FindFilters } from './find-filters.component';
import { SearchTextType } from './find-types';

export function FindHeaderDemo() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // custom for demo
  const [verseRefSetting] = useState<SerializedVerseRef>({
    book: 'GEN',
    chapterNum: 1,
    verseNum: 1,
  });

  const [scope, setScope] = useState<Scope>('book');

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const addRecentSearchItem = useRecentSearches(recentSearches, setRecentSearches);

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [searchTextType, setSearchTextType] = useState<SearchTextType>('all');
  const [wordRestriction, setWordRestriction] = useState<WordRestriction>('none');
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);

  const [activeMode, setActiveMode] = useState<'find' | 'replace'>('find');
  const [replaceTerm, setReplaceTerm] = useState<string>('');
  const [preserveCase, setPreserveCase] = useState(false);

  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);

  // custom for demo
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);
  const demoTotalResults = searchStatus === 'completed' ? 5 : 0;

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
  }, []);

  // custom for demo
  const handleStartSearch = () => {
    setSearchStatus('running');
    setTimeout(() => {
      setSearchStatus('completed');
    }, 1000);

    addRecentSearchItem(searchTerm);
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
          if (value === 'find' || value === 'replace') setActiveMode(value);
        }}
        className="tw-w-fit tw-rounded-lg tw-bg-muted tw-p-1"
      >
        <ToggleGroupItem
          value="find"
          className="data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
        >
          %webView_find_findTab%
        </ToggleGroupItem>
        <ToggleGroupItem
          value="replace"
          className="data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
        >
          %webView_find_replaceTab%
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
            className={`tw-w-full tw-min-w-16 tw-text-ellipsis !tw-pl-8 ${searchTerm ? '!tw-pe-8' : '!tw-pr-4'}`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="tw-absolute tw-end-2 tw-top-1/2 -tw-translate-y-1/2 tw-text-muted-foreground hover:tw-text-foreground tw-bg-transparent tw-border-0 tw-p-0 tw-cursor-pointer"
            >
              <X className="tw-h-4 tw-w-4" />
            </button>
          )}
        </div>
        <RecentSearches
          recentSearches={recentSearches}
          onSearchItemSelect={setSearchTerm}
          ariaLabel="%webView_find_showRecentSearches%"
          groupHeading="%webView_find_recent%"
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
            toggleFilters: '%webView_find_toggleFilters%',
            matchContentIn: '%webView_find_matchContentIn%',
            allText: '%webView_find_allText%',
            allTextTooltip: '%webView_find_allText_tooltip%',
            verseTextOnly: '%webView_find_verseTextOnly%',
            restrictions: '%webView_find_restrictions%',
            restrictionNone: '%webView_find_restrictions_none%',
            restrictionWholeWord: '%webView_find_restrictions_wholeWord%',
            restrictionStartOfWord: '%webView_find_restrictions_startOfWord%',
            restrictionEndOfWord: '%webView_find_restrictions_endOfWord%',
            capitalization: '%webView_find_capitalization%',
            matchCase: '%webView_find_matchCase%',
            pattern: '%webView_find_pattern%',
            allowRegex: '%webView_find_allowRegex%',
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
              <p className="tw-font-light">%webView_find_findInProject%</p>
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
                      %webView_find_preserveCase_tooltip%
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="tw-flex tw-gap-2">
              <Button variant="outline" onClick={() => {}}>
                <ReplaceAll className="tw-h-4 tw-w-4" />
                %webView_find_replaceAll%
              </Button>
              <Button onClick={() => {}}>
                <Replace className="tw-h-4 tw-w-4" />
                %webView_find_replace%
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
              <span className="tw-text-sm tw-text-muted-foreground">%webView_find_showing%</span>
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
              aria-label="%webView_find_previousResult%"
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
              aria-label="%webView_find_nextResult%"
            >
              <ChevronDown className="tw-h-4 tw-w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
