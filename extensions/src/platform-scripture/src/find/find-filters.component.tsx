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
  strings: FindFiltersStrings;
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
  strings,
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
                aria-label={strings.toggleFilters}
                className={areFiltersActive ? 'tw-bg-muted' : ''}
              >
                <SlidersHorizontal className="tw-h-4 tw-w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{strings.toggleFilters}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="tw-w-72 tw-p-3">
        {/* 1. Match content in */}
        <div className="tw-mb-3">
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.matchContentIn}</p>
          <RadioGroup
            value={searchTextType}
            onValueChange={(value) => setSearchTextType(value as SearchTextType)}
            className="tw-gap-1"
          >
            {(
              [
                ['all', strings.allText],
                ['verseOnly', strings.verseTextOnly],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="tw-flex tw-min-h-9 tw-items-center tw-gap-2">
                <RadioGroupItem value={value} id={`searchTextType-${value}`} />
                <Label
                  htmlFor={`searchTextType-${value}`}
                  className="tw-cursor-pointer tw-text-sm tw-font-normal"
                >
                  {label}
                </Label>
                {value === 'all' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="tw-max-w-xs">{strings.allTextTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 2. Match boundaries */}
        <div className="tw-mb-3">
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.restrictions}</p>
          <RadioGroup
            value={wordRestriction}
            onValueChange={(value) => setWordRestriction(value as WordRestriction)}
            className="tw-gap-1"
          >
            {(
              [
                ['none', strings.restrictionNone],
                ['wholeWord', strings.restrictionWholeWord],
                ['startOfWord', strings.restrictionStartOfWord],
                ['endOfWord', strings.restrictionEndOfWord],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="tw-flex tw-min-h-9 tw-items-center tw-gap-2">
                <RadioGroupItem value={value} id={`wordRestriction-${value}`} />
                <Label
                  htmlFor={`wordRestriction-${value}`}
                  className="tw-cursor-pointer tw-text-sm tw-font-normal"
                >
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 3. Capitalization */}
        <div className="tw-mb-3">
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.capitalization}</p>
          <div className="tw-flex tw-min-h-9 tw-items-center tw-gap-2">
            <Checkbox
              id="matchCase"
              checked={shouldMatchCase}
              onCheckedChange={(checked) => setShouldMatchCase(checked === true)}
            />
            <Label htmlFor="matchCase" className="tw-cursor-pointer tw-text-sm tw-font-normal">
              {strings.matchCase}
            </Label>
          </div>
        </div>

        {/* 4. Pattern */}
        <div>
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.pattern}</p>
          <div className="tw-flex tw-min-h-9 tw-items-center tw-gap-2">
            <Checkbox
              id="allowRegex"
              checked={isRegexAllowed}
              onCheckedChange={(checked) => setIsRegexAllowed(checked === true)}
            />
            <Label htmlFor="allowRegex" className="tw-cursor-pointer tw-text-sm tw-font-normal">
              {strings.allowRegex}
            </Label>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
