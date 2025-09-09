import { Clock } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { useState } from 'react';

export interface RecentSearchesProps<T> {
  /** Array of recent search items */
  recentSearches: T[];
  /** Callback when a recent search item is selected */
  onSearchItemSelect: (item: T) => void;
  /** Function to render each search item as a string for display */
  renderItem?: (item: T) => string;
  /** Function to create a unique key for each item */
  getItemKey?: (item: T) => string;
  /** Aria label for the recent searches button */
  ariaLabel?: string;
  /** Heading text for the recent searches group */
  groupHeading?: string;
  /** Optional ID for the popover content for accessibility */
  id?: string;
}

/**
 * Generic component that displays a button to show recent searches in a popover. Only renders if
 * there are recent searches available. Works with any data type T.
 */
export default function RecentSearches<T>({
  recentSearches,
  onSearchItemSelect,
  renderItem = (item) => String(item),
  getItemKey = (item) => String(item),
  ariaLabel = 'Show recent searches',
  groupHeading = 'Recent',
  id,
}: RecentSearchesProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  if (recentSearches.length === 0) {
    return undefined;
  }

  const handleSearchItemSelect = (item: T) => {
    onSearchItemSelect(item);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2"
          aria-label={ariaLabel}
        >
          <Clock className="tw-h-4 tw-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent id={id} className="tw-w-[300px] tw-p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup heading={groupHeading}>
              {recentSearches.map((item) => (
                <CommandItem
                  key={getItemKey(item)}
                  onSelect={() => handleSearchItemSelect(item)}
                  className="tw-flex tw-items-center"
                >
                  <Clock className="tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" />
                  <span>{renderItem(item)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/** Generic hook for managing recent searches state and operations. */
export function useRecentSearches<T>(
  recentSearches: T[],
  setRecentSearches: (items: T[]) => void,
  areItemsEqual: (a: T, b: T) => boolean = (a, b) => a === b,
  maxItems: number = 15,
) {
  return (item: T) => {
    // Add the current item to recent searches, moving it to the top if it already exists
    const recentSearchesWithoutCurrent = recentSearches.filter(
      (existingItem) => !areItemsEqual(existingItem, item),
    );
    const updatedRecentSearches = [item, ...recentSearchesWithoutCurrent.slice(0, maxItems - 1)];
    setRecentSearches(updatedRecentSearches);
  };
}
