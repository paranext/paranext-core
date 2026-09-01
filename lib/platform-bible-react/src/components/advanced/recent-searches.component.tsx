import { Clock } from 'lucide-react';
import { useState } from 'react';
import { Button, ButtonProps } from '@/components/shadcn-ui/button';
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
  /**
   * Accessible name for the trigger button, which is also rendered as the button's visible tooltip
   * text. Write it as user-visible microcopy (sentence case), not as a screen-reader-only phrase.
   *
   * Passing an empty string suppresses the tooltip AND leaves the icon-only button without an
   * accessible name, so prefer omitting the prop — which falls back to a sensible default — over
   * passing `''`.
   */
  ariaLabel?: string;
  /** Heading text for the recent searches group */
  groupHeading?: string;
  /** Optional ID for the dropdown menu content for accessibility */
  id?: string;
  /** Class name for styling the `DropdownMenuItem` for each recent search result */
  classNameForItems?: string;
  /**
   * Class name for the trigger button. Defaults to absolute positioning inside an input field. Pass
   * a custom value to render the button standalone (e.g. `"tw:h-9 tw:w-9"`)
   */
  buttonClassName?: string;
  /** Variant for the trigger button. Defaults to `"ghost"` */
  buttonVariant?: ButtonProps['variant'];
  /** Controlled open state of the dropdown menu. If provided, the component becomes controlled. */
  open?: boolean;
  /** Called when the open state changes. Required when `open` is provided. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Generic component that displays a button to show recent searches in a dropdown menu. Only renders
 * if there are recent searches available. Works with any data type T.
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
  open: openProp,
  onOpenChange,
}: RecentSearchesProps<T>) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : isOpenInternal;
  const setIsOpen = (value: boolean) => {
    if (!isControlled) setIsOpenInternal(value);
    onOpenChange?.(value);
  };

  if (recentSearches.length === 0) {
    return undefined;
  }

  const handleSearchItemSelect = (item: T) => {
    onSearchItemSelect(item);
    setIsOpen(false);
  };

  const button = (
    <Button variant={buttonVariant} size="icon" className={buttonClassName} aria-label={ariaLabel}>
      <Clock className="tw:h-4 tw:w-4" />
    </Button>
  );

  // `modal={false}` because Radix menus default to modal, which traps focus and sets
  // `pointer-events: none` on the body for as long as the list is open. This list opens beside a
  // search input the user is still working in — usually inside another popover — so the
  // surrounding controls have to stay clickable.
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      {/* This component is exported standalone and may be rendered anywhere, so it carries its
          own TooltipProvider rather than assuming a host tree already has one. */}
      <TooltipProvider>
        {ariaLabel ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>{ariaLabel}</TooltipContent>
          </Tooltip>
        ) : (
          <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
        )}
      </TooltipProvider>
      <DropdownMenuContent id={id} className="tw:w-[300px]" align="start">
        <DropdownMenuLabel>{groupHeading}</DropdownMenuLabel>
        {recentSearches.map((item) => (
          <DropdownMenuItem
            key={getItemKey(item)}
            onSelect={() => handleSearchItemSelect(item)}
            className={cn('tw:flex tw:items-center', classNameForItems)}
          >
            <Clock className="tw:me-2 tw:h-4 tw:w-4 tw:opacity-50" />
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
