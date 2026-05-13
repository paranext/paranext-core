import { Info, SlidersHorizontal } from 'lucide-react';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Label,
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
  isRegexAllowed: boolean;
  setIsRegexAllowed: (value: boolean) => void;
  localizedStrings: FindFiltersStrings;
};

export function FindFilters({
  areFiltersActive,
  searchTextType,
  setSearchTextType,
  wordRestriction,
  setWordRestriction,
  shouldMatchCase,
  setShouldMatchCase,
  isRegexAllowed,
  setIsRegexAllowed,
  localizedStrings,
}: FindFiltersProps) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={localizedStrings.toggleFilters}
                className={areFiltersActive ? 'tw:bg-muted' : ''}
              >
                <SlidersHorizontal className="tw:h-4 tw:w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{localizedStrings.toggleFilters}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="tw:w-72 tw:p-3">
        {/* 1. Match content in */}
        <div className="tw:mb-3">
          <p className="tw:mb-1.5 tw:text-sm tw:font-semibold">{localizedStrings.matchContentIn}</p>
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
        </div>

        {/* 2. Match boundaries */}
        <div className="tw:mb-3">
          <p className="tw:mb-1.5 tw:text-sm tw:font-semibold">{localizedStrings.restrictions}</p>
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
        </div>

        {/* 3. Capitalization */}
        <div className="tw:mb-3">
          <p className="tw:mb-1.5 tw:text-sm tw:font-semibold">{localizedStrings.capitalization}</p>
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
        </div>

        {/* 4. Pattern */}
        <div>
          <p className="tw:mb-1.5 tw:text-sm tw:font-semibold">{localizedStrings.pattern}</p>
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
