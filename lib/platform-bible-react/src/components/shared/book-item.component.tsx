import { CommandItem } from '@/components/shadcn-ui/command';
import {
  getLocalizedBookId,
  getLocalizedBookName,
  LIST_ITEM_KEYBOARD_FOCUS_RING,
} from '@/components/shared/book.utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { Canon } from '@sillsdev/scripture';
import { Check } from 'lucide-react';
import { Section } from 'platform-bible-utils';
import { forwardRef, MouseEvent, useMemo, useRef } from 'react';

type BookItemProps = {
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
  /**
   * Whether to render the focus ring on the currently active (data-selected) item. Defaults to
   * true. Set to false when another element owns the visible focus indicator (e.g. the input or a
   * button outside the list) so two rings aren't shown at once.
   */
  showActiveRing?: boolean;
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
export const BookItem = forwardRef<HTMLDivElement, BookItemProps>(
  (
    {
      bookId,
      isSelected,
      onSelect,
      onMouseDown,
      section,
      className,
      showCheck = false,
      localizedBookNames,
      commandValue,
      showActiveRing = true,
    },
    ref,
  ) => {
    const isMouseClick = useRef(false);

    const handleSelect = () => {
      if (!isMouseClick.current) {
        onSelect?.(bookId);
      }
      // Reset the mouse flag after a short delay
      setTimeout(() => {
        isMouseClick.current = false;
      }, 100);
    };

    const handleMouseDown = (e: MouseEvent) => {
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

    return (
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
        <CommandItem
          ref={ref}
          value={commandValue || `${bookId} ${Canon.bookIdToEnglishName(bookId)}`}
          onSelect={handleSelect}
          onMouseDown={handleMouseDown}
          role="option"
          aria-selected={isSelected}
          aria-label={`${Canon.bookIdToEnglishName(bookId)} (${bookId.toLocaleUpperCase()})`}
          className={cn(
            // Hide the CommandItem's built-in trailing check icon (we render our own leading
            // <Check/> for multiselect via showCheck).
            'tw:[&>svg:last-child]:hidden',
            // Suppress shadcn CommandItem's default data-selected:bg-muted / text-foreground —
            // DOM focus is the source of truth for the visible focus indicator; hover is the
            // pointer-feedback channel.
            'tw:data-selected:bg-transparent tw:data-selected:text-inherit',
            // Hover indication (pointer feedback) — kept distinct from the focus ring.
            'tw:hover:bg-muted',
            // Keyboard focus ring on the data-selected item. cmdk's pointer selection is
            // disabled on the parent Command, so data-selected only reflects keyboard nav.
            // Suppressed when another element owns the focus indicator (e.g. the input). Uses the
            // shared LIST_ITEM_KEYBOARD_FOCUS_RING (shadcn's standard ring tokens).
            showActiveRing && LIST_ITEM_KEYBOARD_FOCUS_RING,
            className,
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
      </div>
    );
  },
);
