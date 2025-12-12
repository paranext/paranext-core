import { Clock } from 'lucide-react';
import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useState } from 'react';

export interface RecentSearchesProps {
  /** Array of recent search terms */
  recentSearches: string[];
  /** Callback when a recent search term is selected */
  onSearchTermSelect: (term: string) => void;
  /** Localized strings ['%webView_find_showRecentSearches%', '%webView_find_recent%'] */
  localizedStrings?: LanguageStrings;
}

/**
 * Component that displays a button to show recent searches in a popover. Only renders if there are
 * recent searches available.
 */
export default function RecentSearches({
  recentSearches,
  onSearchTermSelect,
  localizedStrings,
}: RecentSearchesProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (recentSearches.length === 0) {
    return undefined;
  }

  const handleSearchTermSelect = (term: string) => {
    onSearchTermSelect(term);
    setIsOpen(false);
  };

  const localizedString = (key: LocalizeKey) => {
    if (!localizedStrings) return key;
    return localizedStrings[key];
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2"
          aria-label={localizedString('%webView_find_showRecentSearches%')}
        >
          <Clock className="tw-h-4 tw-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup heading={localizedString('%webView_find_recent%')}>
              {recentSearches.map((term, index) => (
                <CommandItem
                  key={`${term}${index}`}
                  onSelect={() => handleSearchTermSelect(term)}
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
  );
}

/** Custom hook for managing recent searches state and operations. */
export function useRecentSearches(
  useWebViewState: <T>(key: string, defaultValue: T) => [T, (value: T) => void, () => void],
) {
  const [recentSearches, setRecentSearches] = useWebViewState<string[]>('findRecentSearches', []);
  const [isRecentSearchesPopoverOpen, setIsRecentSearchesPopoverOpen] = useState(false);

  const addRecentSearchTerm = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    // Add the current search term to recent searches, moving it to the top if it already exists
    const recentSearchesWithoutCurrent = recentSearches.filter((term) => term !== searchTerm);
    const updatedRecentSearches = [searchTerm, ...recentSearchesWithoutCurrent.slice(0, 14)];
    setRecentSearches(updatedRecentSearches);
  };

  return {
    recentSearches,
    isRecentSearchesPopoverOpen,
    setIsRecentSearchesPopoverOpen,
    addRecentSearchTerm,
  };
}
