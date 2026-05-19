import { Clock } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import { Button } from '@/components/shadcn-ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { KeyboardEvent, useRef, useState } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';

/** Interface defining the properties for the RecentSearches component */
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
  /** Class name for styling the `CommandItem` for each recent search result */
  classNameForItems?: string;
  /**
   * Class name for the trigger button. Defaults to absolute positioning inside an input field. Pass
   * a custom value to render the button standalone (e.g. `"tw:h-9 tw:w-9"`)
   */
  buttonClassName?: string;
  /** Variant for the trigger button. Defaults to `"ghost"` */
  buttonVariant?: 'ghost' | 'outline' | 'default' | 'destructive' | 'secondary' | 'link';
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
  classNameForItems,
  buttonClassName = 'tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2',
  buttonVariant = 'ghost',
}: RecentSearchesProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  // The non-null assertion lets us keep the ref typed as HTMLInputElement (not undefined) for
  // ergonomic call sites. The ref is always set by React before any handler that uses it runs.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const inputRef = useRef<HTMLInputElement>(undefined!);

  if (recentSearches.length === 0) {
    return undefined;
  }

  const handleSearchItemSelect = (item: T) => {
    onSearchItemSelect(item);
    setIsOpen(false);
  };

  const handleContentKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Keep navigation/selection keys inside the popover so they don't trigger handlers
    // on parent components (e.g. the surrounding book/chapter Command).
    if (['ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape', 'Home', 'End', 'Tab'].includes(e.key)) {
      e.stopPropagation();
    }
    // Swallow Tab so focus stays inside the popover and Radix doesn't auto-close on focus-out.
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    // Space is not a select key in cmdk, so synthesize it by clicking the highlighted item.
    if (e.key === ' ') {
      e.preventDefault();
      const selected = e.currentTarget.querySelector<HTMLElement>(
        '[cmdk-item][data-selected="true"]',
      );
      selected?.click();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant={buttonVariant}
                size="icon"
                className={buttonClassName}
                aria-label={ariaLabel}
              >
                <Clock className="tw:h-4 tw:w-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent
        id={id}
        className="tw:w-[300px] tw:p-0"
        align="start"
        onKeyDown={handleContentKeyDown}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <Command shouldFilter={false}>
          {/* Hidden input that owns focus so cmdk handles arrow/Enter keys natively */}
          <CommandPrimitive.Input
            ref={inputRef}
            value=""
            onValueChange={() => {}}
            className="tw:sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />
          <CommandList>
            <CommandGroup heading={groupHeading}>
              {recentSearches.map((item) => (
                <CommandItem
                  key={getItemKey(item)}
                  onSelect={() => handleSearchItemSelect(item)}
                  className={cn('tw:flex tw:items-center', classNameForItems)}
                >
                  <Clock className="tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" />
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
