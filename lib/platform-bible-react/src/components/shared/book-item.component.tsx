import { CommandItem } from '@/components/shadcn-ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { getLocalizedBookId, getLocalizedBookName } from '@/components/shared/book.utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { Canon } from '@sillsdev/scripture';
import { Check } from 'lucide-react';
import { Section } from 'platform-bible-utils';
import { MouseEvent, Ref, useMemo, useRef } from 'react';

type BookItemProps = {
  /** Forwarded to the underlying CommandItem (a `<div>` rendered by cmdk). */
  ref?: Ref<HTMLDivElement>;
  /** The book ID (e.g., 'GEN', 'EXO') */
  bookId: string;
  /** Whether this book is currently selected */
  isSelected?: boolean;
  /** Callback function to handle book selection/deselection */
  onSelect?: (bookId: string) => void;
  /** Optional custom mouse down handler */
  onMouseDown?: (e: MouseEvent) => void;
  /** The section this book belongs to */
  section: Section;
  /** Additional CSS classes for the wrapper CommandItem */
  className?: string;
  /** Whether to show the check icon (for multiselect mode) */
  showCheck?: boolean;
  /**
   * Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
   * value contains localized versions of the ID and full book name
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
  /** Value to use for Command component matching */
  commandValue?: string;
  /** When true, renders the item as disabled: suppresses onSelect and dims the visuals. */
  disabled?: boolean;
  /**
   * Localized explanation of why this item is greyed (e.g. "not in this project"). Passing a value
   * renders the item greyed but fully selectable — the state for an item that is reachable yet
   * outside the current context, such as a book present in an open resource but not in the active
   * project.
   *
   * Distinct from `disabled`, which also suppresses selection; `disabled` takes precedence and a
   * disabled item is never additionally dimmed. The reason is appended to the item's accessible
   * name and shown in a tooltip, so the greying is never a colour-only signal for either kind of
   * reader — the state and its explanation are one prop precisely so they cannot drift apart.
   *
   * An empty string counts as no reason, so the item renders undimmed. Callers resolving this from
   * a localized string should fall back with `||` rather than `??`, since `??` passes an empty
   * translation through and would silently drop the dimming.
   */
  dimmedReason?: string;
};

/**
 * A reusable component that represents a single book item in book selectors. The component shows
 * the book's localized name, its ID, and visually indicates its testament (OT/NT/DC/Extra) through
 * color coding.
 *
 * For simple selection, use the `onSelect` prop. For complex interactions (like shift-click range
 * selection), implement custom `onSelect` and `onMouseDown` handlers that manage the logic
 * externally.
 */
export function BookItem({
  ref,
  bookId,
  isSelected,
  onSelect,
  onMouseDown,
  section,
  className,
  showCheck = false,
  localizedBookNames,
  commandValue,
  disabled = false,
  dimmedReason,
}: BookItemProps) {
  const isMouseClick = useRef(false);

  const handleSelect = () => {
    if (disabled) return;
    if (!isMouseClick.current) {
      onSelect?.(bookId);
    }
    // Reset the mouse flag after a short delay
    setTimeout(() => {
      isMouseClick.current = false;
    }, 100);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    isMouseClick.current = true;

    if (onMouseDown) {
      onMouseDown(e);
    } else {
      // If no custom mouse handler, fall back to calling onSelect
      onSelect?.(bookId);
    }
  };

  const bookDisplayName = useMemo(
    () => getLocalizedBookName(bookId, localizedBookNames),
    [bookId, localizedBookNames],
  );

  const bookDisplayId = useMemo(
    () => getLocalizedBookId(bookId, localizedBookNames),
    [bookId, localizedBookNames],
  );

  const isDimmed = !!dimmedReason && !disabled;
  // Built from the same localized values the row renders, not from the English canon name: the
  // dimmed reason appended below arrives already localized, so an English base would announce a
  // half-translated name — "Genesis (GEN), no está en este proyecto". Both fall back to English
  // when the caller passes no localized names, so the undimmed case is unchanged.
  const baseAriaLabel = `${bookDisplayName} (${bookDisplayId})`;

  const commandItem = (
    <CommandItem
      ref={ref}
      value={commandValue || `${bookId} ${Canon.bookIdToEnglishName(bookId)}`}
      onSelect={handleSelect}
      onMouseDown={handleMouseDown}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      aria-label={isDimmed ? `${baseAriaLabel}, ${dimmedReason}` : baseAriaLabel}
      disabled={disabled}
      className={cn(
        className,
        disabled && 'tw:cursor-not-allowed tw:opacity-50',
        // Mirrors NumberedItemGrid's dimmed-vs-disabled split: dimmed is presentation only, so it
        // never sets aria-disabled or blocks onSelect, and it yields to disabled.
        //
        // Opacity on the whole item rather than a lower-contrast text colour, for two reasons: the
        // book id below carries its own muted colour, so tinting only the name would leave the row
        // half-dimmed; and a dimmed item is still selectable, so it must not end up harder to read
        // than a genuinely disabled one. Cleared while highlighted, so the row the user is actually
        // on reads at full contrast like any other book.
        isDimmed && 'tw:opacity-70 tw:data-selected:opacity-100',
      )}
    >
      {showCheck && (
        <Check
          className={cn(
            'tw:me-2 tw:h-4 tw:w-4 tw:shrink-0',
            isSelected ? 'tw:opacity-100' : 'tw:opacity-0',
          )}
        />
      )}
      <span className="tw:min-w-0 tw:flex-1">{bookDisplayName}</span>
      <span className="tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground">
        {bookDisplayId}
      </span>
    </CommandItem>
  );

  const item = (
    <div
      className={cn(
        'tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid',
        {
          'tw:border-s-red-200': section === Section.OT,
          'tw:border-s-purple-200': section === Section.NT,
          'tw:border-s-indigo-200': section === Section.DC,
          'tw:border-s-amber-200': section === Section.Extra,
        },
      )}
    >
      {commandItem}
    </div>
  );

  if (!isDimmed) return item;

  // Without the tooltip the greying is a colour-only signal for a sighted user: the reason reaches
  // assistive tech through the accessible name, and this is where everyone else reads it. Delayed
  // rather than instant because these items sit in a list the pointer sweeps across.
  //
  // The trigger wraps the section-border div rather than the CommandItem itself because cmdk's Item
  // assigns its own onPointerMove after spreading incoming props, which would drop the handler the
  // tooltip needs to open. Neither TooltipProvider nor Tooltip renders an element, and the trigger
  // renders the wrapper it is given, so the list's DOM shape is unchanged.
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>{item}</TooltipTrigger>
        <TooltipContent>{dimmedReason}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
