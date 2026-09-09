import { Info, SlidersHorizontal } from 'lucide-react';
import {
  Button,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { WordRestriction } from 'platform-scripture';
import { SearchTextType } from './find-types';

export type FindFiltersStrings = {
  toggleFilters: string;
  matchContentIn: string;
  allText: string;
  allTextTooltip: string;
  verseTextOnly: string;
  restrictions: string;
  restrictionNone: string;
  restrictionWholeWord: string;
  restrictionStartOfWord: string;
  restrictionEndOfWord: string;
  capitalization: string;
  matchCase: string;
  flexibility: string;
  ignoreWhitespaceDifferences: string;
  ignoreWhitespaceDifferencesTooltip: string;
  ignoreDiacritics: string;
  pattern: string;
  allowRegex: string;
};

type FindFiltersProps = {
  areFiltersActive: boolean;
  searchTextType: SearchTextType;
  setSearchTextType: (value: SearchTextType) => void;
  wordRestriction: WordRestriction;
  setWordRestriction: (value: WordRestriction) => void;
  shouldMatchCase: boolean;
  setShouldMatchCase: (value: boolean) => void;
  ignoreWhitespaceDifferences: boolean;
  setIgnoreWhitespaceDifferences: (value: boolean) => void;
  ignoreDiacritics: boolean;
  setIgnoreDiacritics: (value: boolean) => void;
  isRegexAllowed: boolean;
  setIsRegexAllowed: (value: boolean) => void;
  localizedStrings: FindFiltersStrings;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function FindFilters({
  areFiltersActive,
  searchTextType,
  setSearchTextType,
  wordRestriction,
  setWordRestriction,
  shouldMatchCase,
  setShouldMatchCase,
  ignoreWhitespaceDifferences,
  setIgnoreWhitespaceDifferences,
  ignoreDiacritics,
  setIgnoreDiacritics,
  isRegexAllowed,
  setIsRegexAllowed,
  localizedStrings,
  open,
  onOpenChange,
}: FindFiltersProps) {
  // These filters are a form of grouped settings, not a menu of commands. A menu container would
  // give them `role="menu"`, whose keyboard model only navigates registered menu items and calls
  // preventDefault on Tab — leaving these plain form controls unreachable by keyboard. A popover
  // is an inert container, so the controls keep their native keyboard behavior: Tab moves between
  // groups and arrow keys move within a radio group.
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={localizedStrings.toggleFilters}
                className={areFiltersActive ? 'tw:bg-muted' : ''}
              >
                <SlidersHorizontal className="tw:h-4 tw:w-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>{localizedStrings.toggleFilters}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* The height cap and internal scrolling are load-bearing, and PopoverContent — unlike
          DropdownMenuContent — does not supply them. Without them this panel outgrows a short web
          view, so moving focus down it scrolls the document instead, and the popper repositions on
          every keypress. Scrolling inside the panel keeps it anchored. */}
      <PopoverContent
        align="end"
        className="tw:max-h-(--radix-popover-content-available-height) tw:w-72 tw:overflow-x-hidden tw:overflow-y-auto tw:p-3"
      >
        {/* 1. Match content in */}
        <fieldset className="tw:mb-3">
          <legend className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold">
            {localizedStrings.matchContentIn}
          </legend>
          <RadioGroup
            value={searchTextType}
            // RadioGroup onValueChange provides a plain string, but we know it will always be one
            // of the SearchTextType values since only the RadioGroupItem children use those values
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onValueChange={(value) => setSearchTextType(value as SearchTextType)}
            className="tw:gap-1"
          >
            {(
              [
                ['all', localizedStrings.allText],
                ['verseOnly', localizedStrings.verseTextOnly],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="tw:flex tw:min-h-9 tw:items-center tw:gap-2">
                <RadioGroupItem value={value} id={`searchTextType-${value}`} />
                <Label
                  htmlFor={`searchTextType-${value}`}
                  className="tw:cursor-pointer tw:text-sm tw:font-normal"
                >
                  {label}
                </Label>
                {value === 'all' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="tw:h-3.5 tw:w-3.5 tw:text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="tw:max-w-xs">{localizedStrings.allTextTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </RadioGroup>
        </fieldset>

        {/* 2. Match boundaries */}
        <fieldset className="tw:mb-3">
          <legend className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold">
            {localizedStrings.restrictions}
          </legend>
          <RadioGroup
            value={wordRestriction}
            // RadioGroup onValueChange provides a plain string, but we know it will always be one
            // of the SearchTextType values since only the RadioGroupItem children use those values
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onValueChange={(value) => setWordRestriction(value as WordRestriction)}
            className="tw:gap-1"
          >
            {(
              [
                ['none', localizedStrings.restrictionNone],
                ['wholeWord', localizedStrings.restrictionWholeWord],
                ['startOfWord', localizedStrings.restrictionStartOfWord],
                ['endOfWord', localizedStrings.restrictionEndOfWord],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="tw:flex tw:min-h-9 tw:items-center tw:gap-2">
                <RadioGroupItem value={value} id={`wordRestriction-${value}`} />
                <Label
                  htmlFor={`wordRestriction-${value}`}
                  className="tw:cursor-pointer tw:text-sm tw:font-normal"
                >
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>

        {/* 3. Capitalization */}
        <fieldset className="tw:mb-3">
          <legend className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold">
            {localizedStrings.capitalization}
          </legend>
          <div className="tw:flex tw:min-h-9 tw:items-center tw:gap-2">
            <Checkbox
              id="matchCase"
              checked={shouldMatchCase}
              onCheckedChange={(checked) => setShouldMatchCase(checked === true)}
            />
            <Label htmlFor="matchCase" className="tw:cursor-pointer tw:text-sm tw:font-normal">
              {localizedStrings.matchCase}
            </Label>
          </div>
        </fieldset>

        {/* 4. Match flexibility. Both options relax how the query is matched against the text;
            neither alters the query itself, so an exact search stays reachable by leaving them
            off. buildSearchRegex ignores both in regex mode. */}
        <fieldset className="tw:mb-3">
          <legend className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold">
            {localizedStrings.flexibility}
          </legend>
          <div className="tw:flex tw:min-h-9 tw:items-center tw:gap-2">
            <Checkbox
              id="ignoreWhitespaceDifferences"
              checked={ignoreWhitespaceDifferences}
              onCheckedChange={(checked) => setIgnoreWhitespaceDifferences(checked === true)}
            />
            <Label
              htmlFor="ignoreWhitespaceDifferences"
              className="tw:cursor-pointer tw:text-sm tw:font-normal"
            >
              {localizedStrings.ignoreWhitespaceDifferences}
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="tw:h-3.5 tw:w-3.5 tw:text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="tw:max-w-xs">
                    {localizedStrings.ignoreWhitespaceDifferencesTooltip}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="tw:flex tw:min-h-9 tw:items-center tw:gap-2">
            <Checkbox
              id="ignoreDiacritics"
              checked={ignoreDiacritics}
              onCheckedChange={(checked) => setIgnoreDiacritics(checked === true)}
            />
            <Label
              htmlFor="ignoreDiacritics"
              className="tw:cursor-pointer tw:text-sm tw:font-normal"
            >
              {localizedStrings.ignoreDiacritics}
            </Label>
          </div>
        </fieldset>

        {/* 5. Pattern */}
        <fieldset>
          <legend className="tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold">
            {localizedStrings.pattern}
          </legend>
          <div className="tw:flex tw:min-h-9 tw:items-center tw:gap-2">
            <Checkbox
              id="allowRegex"
              checked={isRegexAllowed}
              onCheckedChange={(checked) => setIsRegexAllowed(checked === true)}
            />
            <Label htmlFor="allowRegex" className="tw:cursor-pointer tw:text-sm tw:font-normal">
              {localizedStrings.allowRegex}
            </Label>
          </div>
        </fieldset>
      </PopoverContent>
    </Popover>
  );
}
