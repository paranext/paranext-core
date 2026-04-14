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
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import { WordRestriction } from 'platform-scripture';
import { useState } from 'react';
import { FindFilters, FindFiltersStrings } from './find-filters.component';
import { LocalizedBookData, SearchTextType } from './find-types';
import {
  ReplacePreviewOptions,
  ReplacePreviewOptionsStrings,
} from './replace-preview-options.component';
import { PreviewOptions } from './replace-preview-types';

export type FindHeaderLocalizedStrings = {
  findTab?: string;
  replaceTab?: string;
  searchPlaceholder?: string;
  showRecentSearches?: string;
  recent?: string;
  replacePlaceholder?: string;
  preserveCase?: string;
  preserveCaseTooltip?: string;
  replaceAll?: string;
  replace?: string;
  showing?: string;
  /** Format string for the result counter, e.g. "{count} of {total}" */
  countOfTotal?: string;
  previousResult?: string;
  nextResult?: string;
  clearSearch?: string;
};

export type FindHeaderReplaceProps = {
  replaceTerm: string;
  onReplaceTermChange: (value: string) => void;
  preserveCase: boolean;
  onPreserveCaseChange: (value: boolean) => void;
  onReplace: () => void;
  onReplaceAll: () => void;
  isReplacing: boolean;
  /** Whether the Replace button should be enabled */
  replaceEnabled: boolean;
  /** Whether the Replace All button should be enabled */
  replaceAllEnabled: boolean;
  /** Preview options shown only in replace mode */
  previewOptions: PreviewOptions;
  onPreviewOptionsChange: (value: PreviewOptions) => void;
  previewOptionsStrings: ReplacePreviewOptionsStrings;
};

export type FindHeaderScopeProps = {
  scope: Scope;
  onScopeChange: (value: Scope) => void;
  selectedBookIds: string[];
  onSelectedBookIdsChange: (value: string[]) => void;
  scopeDisplayText: string;
  availableBookInfo: string;
  localizedBookNames?: Map<string, Pick<LocalizedBookData, 'localizedId' | 'localizedName'>>;
  scopeSelectorStrings: LanguageStrings;
};

export interface FindHeaderProps {
  // Find input
  searchTerm: string;
  /** Called with the new value when the search input changes */
  onSearchTermChange: (value: string) => void;
  /**
   * Called when the current search term should be committed to history (on blur, on clear, before
   * an explicit search). The caller is responsible for not calling this when searchTerm is empty.
   */
  onAddToHistory: () => void;
  /** Called when the user explicitly requests a search (Enter key) */
  onSearchSubmit: () => void;
  /** Called when the user clears the search (X button) */
  onSearchClear: () => void;
  recentSearches: string[];
  onRecentSearchSelect: (value: string) => void;

  // Filters
  areFiltersActive: boolean;
  searchTextType: SearchTextType;
  onSearchTextTypeChange: (value: SearchTextType) => void;
  wordRestriction: WordRestriction;
  onWordRestrictionChange: (value: WordRestriction) => void;
  shouldMatchCase: boolean;
  onShouldMatchCaseChange: (value: boolean) => void;
  isRegexAllowed: boolean;
  onIsRegexAllowedChange: (value: boolean) => void;
  filterStrings: FindFiltersStrings;

  // Mode toggle
  activeMode: 'find' | 'replace';
  onActiveModeChange: (value: 'find' | 'replace') => void;

  // Replace (all replace-related props and preview options grouped together)
  replaceProps: FindHeaderReplaceProps;

  // Scope
  scopeProps: FindHeaderScopeProps;

  // Result navigation
  /** Total number of visible (non-hidden) results */
  visibleResultsCount: number;
  /** 0-based index of the currently focused result among visible results; -1 if none */
  focusedVisibleIndex: number;
  onPreviousResult: () => void;
  onNextResult: () => void;

  localizedStrings: FindHeaderLocalizedStrings;
}

/**
 * Presentational header component for the Find/Replace feature. Contains the mode toggle, search
 * and replace inputs, filters, scope selector, preview options, and result navigation controls. All
 * state and event handling are provided by the parent via props.
 */
export function FindHeader({
  searchTerm,
  onSearchTermChange,
  onAddToHistory,
  onSearchSubmit,
  onSearchClear,
  recentSearches,
  onRecentSearchSelect,
  areFiltersActive,
  searchTextType,
  onSearchTextTypeChange,
  wordRestriction,
  onWordRestrictionChange,
  shouldMatchCase,
  onShouldMatchCaseChange,
  isRegexAllowed,
  onIsRegexAllowedChange,
  filterStrings,
  activeMode,
  onActiveModeChange,
  replaceProps: {
    replaceTerm,
    onReplaceTermChange,
    preserveCase,
    onPreserveCaseChange,
    onReplace,
    onReplaceAll,
    isReplacing,
    replaceEnabled,
    replaceAllEnabled,
    previewOptions,
    onPreviewOptionsChange,
    previewOptionsStrings,
  },
  scopeProps: {
    scope,
    onScopeChange,
    selectedBookIds,
    onSelectedBookIdsChange,
    scopeDisplayText,
    availableBookInfo,
    localizedBookNames,
    scopeSelectorStrings,
  },
  visibleResultsCount,
  focusedVisibleIndex,
  onPreviousResult,
  onNextResult,
  localizedStrings,
}: FindHeaderProps) {
  const [isScopeSelectorOpen, setIsScopeSelectorOpen] = useState(false);
  const [isPreviewOptionsOpen, setIsPreviewOptionsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const isAnyMenuOpen =
    isScopeSelectorOpen || isPreviewOptionsOpen || isFiltersOpen || isHistoryOpen;

  return (
    <div className="tw-space-y-3">
      {/* Find/Replace mode toggle */}
      <ToggleGroup
        type="single"
        value={activeMode}
        onValueChange={(value) => {
          if (value === 'find' || value === 'replace') onActiveModeChange(value);
          // Prevent deselection: keep current value when toggling an already-selected item
          else if (value === '') onActiveModeChange(activeMode);
        }}
        className="tw-w-fit tw-rounded-lg tw-bg-muted tw-p-1"
      >
        <ToggleGroupItem
          value="find"
          className="data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
        >
          {localizedStrings.findTab}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="replace"
          className="data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
        >
          {localizedStrings.replaceTab}
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Find input row */}
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <div className="tw-relative tw-flex-1">
          <TextSearch className="tw-pointer-events-none tw-absolute tw-left-2 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
          <Input
            id="search-term"
            value={searchTerm}
            onChange={(e) => {
              onSearchTermChange(e.target.value);
            }}
            onBlur={() => {
              if (searchTerm) onAddToHistory();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchTerm) onAddToHistory();
                onSearchSubmit();
              }
            }}
            placeholder={localizedStrings.searchPlaceholder}
            className={`scripture-font tw-w-full tw-min-w-16 tw-text-ellipsis !tw-pl-8 ${searchTerm ? '!tw-pe-8' : '!tw-pr-4'}`}
          />
          {searchTerm && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={localizedStrings.clearSearch}
                    onClick={() => {
                      if (searchTerm) onAddToHistory();
                      onSearchTermChange('');
                      onSearchClear();
                    }}
                    className="tw-absolute tw-end-2 tw-top-1/2 -tw-translate-y-1/2 tw-cursor-pointer tw-border-0 tw-bg-transparent tw-p-0 tw-text-muted-foreground hover:tw-text-foreground"
                  >
                    <X className="tw-h-4 tw-w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{localizedStrings.clearSearch}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <RecentSearches
          classNameForItems="scripture-font"
          recentSearches={recentSearches}
          onSearchItemSelect={onRecentSearchSelect}
          ariaLabel={localizedStrings.showRecentSearches}
          groupHeading={localizedStrings.recent}
          buttonClassName="tw-h-10 tw-w-10"
          buttonVariant="outline"
          open={isHistoryOpen}
          onOpenChange={setIsHistoryOpen}
        />
        <FindFilters
          areFiltersActive={areFiltersActive}
          searchTextType={searchTextType}
          setSearchTextType={onSearchTextTypeChange}
          wordRestriction={wordRestriction}
          setWordRestriction={onWordRestrictionChange}
          shouldMatchCase={shouldMatchCase}
          setShouldMatchCase={onShouldMatchCaseChange}
          isRegexAllowed={isRegexAllowed}
          setIsRegexAllowed={onIsRegexAllowedChange}
          localizedStrings={filterStrings}
          open={isFiltersOpen}
          onOpenChange={setIsFiltersOpen}
        />
      </div>

      {/* Replace input row — shown in replace mode */}
      {activeMode === 'replace' && (
        <>
          <div className="tw-relative tw-flex-1">
            <ArrowRight className="tw-pointer-events-none tw-absolute tw-left-2 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
            <Input
              id="replace-term"
              value={replaceTerm}
              onChange={(e) => onReplaceTermChange(e.target.value)}
              placeholder={localizedStrings.replacePlaceholder}
              className="scripture-font tw-w-full tw-min-w-16 !tw-pl-8 !tw-pr-4"
            />
          </div>
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
            <div className="tw-flex tw-items-center tw-gap-2">
              <Checkbox
                id="preserve-case"
                checked={preserveCase}
                onCheckedChange={(checked) => onPreserveCaseChange(checked === true)}
              />
              <Label htmlFor="preserve-case" className="tw-cursor-pointer">
                {localizedStrings.preserveCase}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="tw-h-3.5 tw-w-3.5 tw-cursor-default tw-text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="tw-max-w-xs tw-whitespace-pre-line">
                      {localizedStrings.preserveCaseTooltip}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="tw-flex tw-gap-2">
              <Button
                variant="outline"
                onClick={onReplaceAll}
                disabled={!replaceAllEnabled || isReplacing || isAnyMenuOpen}
              >
                <ReplaceAll className="tw-h-4 tw-w-4" />
                {localizedStrings.replaceAll}
              </Button>
              <Button
                onClick={onReplace}
                disabled={!replaceEnabled || isReplacing || isAnyMenuOpen}
              >
                <Replace className="tw-h-4 tw-w-4" />
                {localizedStrings.replace}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Scope selector row */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-min-w-0 tw-items-center tw-gap-1 tw-overflow-hidden">
          <div className="tw-min-w-0 tw-overflow-hidden">
            <Popover open={isScopeSelectorOpen} onOpenChange={setIsScopeSelectorOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="tw-h-auto tw-max-w-full tw-gap-1 tw-overflow-hidden tw-px-2 tw-py-1 tw-font-normal"
                >
                  <span className="tw-shrink-0 tw-text-sm tw-text-muted-foreground">
                    {localizedStrings.showing}
                  </span>
                  <span className="tw-min-w-0 tw-truncate tw-text-sm tw-font-medium">
                    {scopeDisplayText}
                  </span>
                  <ChevronDown className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="tw-w-auto tw-p-3">
                <ScopeSelector
                  scope={scope}
                  availableScopes={['chapter', 'book', 'selectedBooks']}
                  onScopeChange={onScopeChange}
                  availableBookInfo={availableBookInfo}
                  selectedBookIds={selectedBookIds}
                  onSelectedBookIdsChange={onSelectedBookIdsChange}
                  localizedStrings={scopeSelectorStrings}
                  localizedBookNames={localizedBookNames}
                />
              </PopoverContent>
            </Popover>
          </div>
          {activeMode === 'replace' && (
            <ReplacePreviewOptions
              previewOptions={previewOptions}
              setPreviewOptions={onPreviewOptionsChange}
              localizedStrings={previewOptionsStrings}
              open={isPreviewOptionsOpen}
              onOpenChange={setIsPreviewOptionsOpen}
            />
          )}
        </div>
        {visibleResultsCount > 0 && (
          <div className="tw-flex tw-items-center tw-gap-1">
            <span className="tw-tabular-nums tw-text-sm tw-text-muted-foreground">
              {formatReplacementString(localizedStrings.countOfTotal ?? '{count} of {total}', {
                count: focusedVisibleIndex >= 0 ? String(focusedVisibleIndex + 1) : '–',
                total: String(visibleResultsCount),
              })}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="tw-h-7 tw-w-7"
                    disabled={visibleResultsCount === 0}
                    onClick={onPreviousResult}
                    aria-label={localizedStrings.previousResult}
                  >
                    <ChevronUp className="tw-h-4 tw-w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{localizedStrings.previousResult}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="tw-h-7 tw-w-7"
                    disabled={visibleResultsCount === 0}
                    onClick={onNextResult}
                    aria-label={localizedStrings.nextResult}
                  >
                    <ChevronDown className="tw-h-4 tw-w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{localizedStrings.nextResult}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}
