import { Clock } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Z_INDEX_OVERLAY } from '@/components/z-index';
import { useState } from 'react';

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
  /** Optional ID for the dropdown menu content for accessibility */
  id?: string;
  /** Class name for styling the menu item for each recent search result */
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
 * Generic component that displays a button to show recent searches in a dropdown menu. Only renders
 * if there are recent searches available. Works with any data type T.
 *
 * Built on shadcn's `DropdownMenu`, which provides accessible menu semantics and native keyboard
 * handling (arrow navigation, Enter/Space to select, Escape to close, type-ahead, and focus return
 * to the trigger) out of the box.
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
  buttonClassName = 'tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2',
  buttonVariant = 'ghost',
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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={buttonVariant}
                size="icon"
                className={buttonClassName}
                aria-label={ariaLabel}
              >
                <Clock className="tw:h-4 tw:w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* Float above other overlay popovers. The default DropdownMenu z-index (z-50) renders behind
          host popovers that use the shared Z_INDEX_ABOVE_DOCK (e.g. the BookChapterControl popover
          this menu opens inside of), so use the overlay/context-menu tier to stay on top. */}
      <DropdownMenuContent id={id} align="start" style={{ zIndex: Z_INDEX_OVERLAY }}>
        <DropdownMenuLabel>{groupHeading}</DropdownMenuLabel>
        {recentSearches.map((item) => (
          <DropdownMenuItem
            key={getItemKey(item)}
            className={classNameForItems}
            onSelect={() => handleSearchItemSelect(item)}
          >
            <Clock className="tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" />
            <span>{renderItem(item)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
