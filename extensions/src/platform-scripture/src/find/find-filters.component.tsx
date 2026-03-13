import { Info, SlidersHorizontal } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { WordRestriction } from 'platform-scripture';

export type SearchTextType = 'all' | 'verseOnly';

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
          <div className="tw-flex tw-flex-col tw-gap-1">
            {(
              [
                ['all', strings.allText],
                ['verseOnly', strings.verseTextOnly],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSearchTextType(value)}
                className="tw-flex tw-min-h-9 tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
              >
                <span className="tw-w-8 tw-shrink-0 tw-text-center tw-text-4xl tw-leading-none">
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
                        <p className="tw-max-w-xs">{strings.allTextTooltip}</p>
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
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.restrictions}</p>
          <div className="tw-flex tw-flex-col tw-gap-1">
            {(
              [
                ['none', strings.restrictionNone],
                ['wholeWord', strings.restrictionWholeWord],
                ['startOfWord', strings.restrictionStartOfWord],
                ['endOfWord', strings.restrictionEndOfWord],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setWordRestriction(value)}
                className="tw-flex tw-min-h-9 tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
              >
                <span className="tw-w-8 tw-shrink-0 tw-text-center tw-text-4xl tw-leading-none">
                  {wordRestriction === value ? '•' : ''}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Capitalization */}
        <div className="tw-mb-3">
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.capitalization}</p>
          <button
            type="button"
            onClick={() => setShouldMatchCase(!shouldMatchCase)}
            className="tw-flex tw-min-h-9 tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
          >
            <span className="tw-w-8 tw-shrink-0 tw-text-center tw-text-4xl tw-leading-none">
              {shouldMatchCase ? '•' : ''}
            </span>
            <span>{strings.matchCase}</span>
          </button>
        </div>

        {/* 4. Pattern */}
        <div>
          <p className="tw-mb-1.5 tw-text-sm tw-font-semibold">{strings.pattern}</p>
          <button
            type="button"
            onClick={() => setIsRegexAllowed(!isRegexAllowed)}
            className="tw-flex tw-min-h-9 tw-cursor-pointer tw-items-center tw-gap-1 tw-text-left tw-text-sm tw-font-normal tw-bg-transparent tw-border-0 tw-p-0 tw-text-foreground hover:tw-text-foreground"
          >
            <span className="tw-w-8 tw-shrink-0 tw-text-center tw-text-4xl tw-leading-none">
              {isRegexAllowed ? '•' : ''}
            </span>
            <span>{strings.allowRegex}</span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
