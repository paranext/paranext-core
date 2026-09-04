import { Clock } from 'lucide-react';
import { useId, useRef, useState } from 'react';
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
import { resolveLocalizedString } from '@/utils/localization.util';
import { cn } from '@/utils/shadcn-ui/utils';

const DEFAULT_ARIA_LABEL = 'Show recent searches';
const DEFAULT_GROUP_HEADING = 'Recent';

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
   *
   * A value that is still a raw `%localization_key%` is treated as not-yet-localized and falls back
   * to the default, so a key can never reach the screen as tooltip text.
   */
  ariaLabel?: string;
  /**
   * Heading for the recent searches list. Rendered as the list's visible heading and used as its
   * accessible name, so a screen reader announces what the list is rather than a bare "menu". Falls
   * back to the default when omitted or still a raw `%localization_key%`.
   */
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
  ariaLabel,
  groupHeading,
  id,
  classNameForItems,
  buttonClassName = 'tw:absolute tw:end-0 tw:top-0 tw:h-full tw:px-3 tw:py-2',
  buttonVariant = 'ghost',
  open: openProp,
  onOpenChange,
}: RecentSearchesProps<T>) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const headingId = useId();
  // Set while the list is closing, so the focus Radix restores to the trigger is not mistaken for
  // the user pointing at it. Read and cleared once, by the very next open request.
  const isRestoringFocusFromListRef = useRef(false);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : isOpenInternal;
  // An empty string is a deliberate "no label" (documented on the prop), so only `undefined` and a
  // raw localization key fall back.
  const resolvedAriaLabel =
    ariaLabel === '' ? '' : resolveLocalizedString(ariaLabel, DEFAULT_ARIA_LABEL);
  const resolvedGroupHeading = resolveLocalizedString(groupHeading, DEFAULT_GROUP_HEADING);

  const setIsOpen = (value: boolean) => {
    if (!value) {
      // Radix hands focus back to this trigger as the list closes, and `TooltipTrigger` reads any
      // focus as a reason to open. The pointer is wherever the user clicked — a row of the list, or
      // outside it — and never on the button, so no `pointerleave` would ever arrive to close that
      // tooltip again: it would sit over the search input beside it until the button happened to
      // blur. Mark the close so the restore is ignored, and shut any tooltip that is already up.
      isRestoringFocusFromListRef.current = true;
      setIsTooltipOpen(false);
    }
    if (!isControlled) setIsOpenInternal(value);
    onOpenChange?.(value);
  };

  const handleTooltipOpenChange = (value: boolean) => {
    if (value && isRestoringFocusFromListRef.current) {
      // One-shot: a later hover or Tab is a real request and opens normally.
      isRestoringFocusFromListRef.current = false;
      return;
    }
    setIsTooltipOpen(value);
  };

  if (recentSearches.length === 0) {
    return undefined;
  }

  // Radix closes the list itself when an item is selected, which already routes through `setIsOpen`
  // and reports the close once. Closing it again here would report it twice per selection.
  const handleSearchItemSelect = (item: T) => {
    onSearchItemSelect(item);
  };

  const button = (
    <Button
      variant={buttonVariant}
      size="icon"
      className={buttonClassName}
      aria-label={resolvedAriaLabel}
    >
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
        {resolvedAriaLabel ? (
          <Tooltip open={isTooltipOpen} onOpenChange={handleTooltipOpenChange}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>{resolvedAriaLabel}</TooltipContent>
          </Tooltip>
        ) : (
          <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
        )}
      </TooltipProvider>
      {/* `aria-labelledby` rather than a bare heading: Radix's menu label is a plain `div` that
          nothing references, so without this the list announces as an unnamed menu of N items and
          a screen-reader user is never told these are recent searches. */}
      <DropdownMenuContent
        id={id}
        aria-labelledby={headingId}
        className="tw:w-[300px]"
        align="start"
        // While this list is open it owns the keyboard. Radix portals it to `body`, but React still
        // bubbles its keystrokes up through the tree it was DECLARED in — usually a search input
        // inside a `Command` or a popover, both of which bind Enter and the arrow keys. Without
        // this, Enter on the list also submits the host's current selection and arrow keys drive
        // the host's list instead of this one. Radix's own handlers sit on the content below this
        // point and have already run by the time this fires.
        onKeyDown={(event) => event.stopPropagation()}
      >
        <DropdownMenuLabel id={headingId}>{resolvedGroupHeading}</DropdownMenuLabel>
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
